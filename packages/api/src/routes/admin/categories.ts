import { db } from "@repo/database";
import { Hono } from "hono";
import { describeRoute } from "hono-openapi";
import { validator } from "hono-openapi/zod";
import { z } from "zod";
import { adminMiddleware } from "../../middleware/admin";

const createCategorySchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().optional(),
  image: z.string().optional(),
  parentId: z.string().optional(),
  isActive: z.boolean().default(true),
  sortOrder: z.number().int().default(0),
});

export const categoryRouter = new Hono()
  .basePath("/categories")
  .use(adminMiddleware)
  
  // Get all categories
  .get("/", 
    describeRoute({
      summary: "Get all categories",
      tags: ["Categories"],
    }),
    async (c) => {
    const categories = await db.category.findMany({
      include: {
        parent: true,
        children: true,
        _count: {
          select: {
            products: true,
          },
        },
      },
      orderBy: [
        { sortOrder: 'asc' },
        { name: 'asc' },
      ],
    });

    return c.json(categories);
  })

  // Get single category
  .get("/:id", 
    describeRoute({
      summary: "Get category by ID",
      tags: ["Categories"],
    }),
    async (c) => {
      const id = c.req.param("id");

      const category = await db.category.findUnique({
        where: { id },
        include: {
          parent: true,
          children: true,
          _count: { select: { products: true } },
        },
      });

      if (!category) {
        return c.json({ error: "Category not found" }, 404);
      }

      return c.json(category);
    }
  )

  // Create category
  .post("/",
    validator("json", createCategorySchema),
    describeRoute({
      summary: "Create new category",
      tags: ["Categories"],
    }),
    async (c) => {
      const data = c.req.valid("json");

      try {
        const category = await db.category.create({
          data,
          include: {
            parent: true,
            children: true,
            _count: { select: { products: true } },
          },
        });

        return c.json(category, 201);
      } catch (error) {
        return c.json({ error: "Failed to create category" }, 500);
      }
    }
  )

  // Update category
  .put("/:id",
    validator("json", createCategorySchema.partial()),
    describeRoute({
      summary: "Update category",
      tags: ["Categories"],
    }),
    async (c) => {
      const id = c.req.param("id");
      const data = c.req.valid("json");

      try {
        const category = await db.category.update({
          where: { id },
          data,
          include: {
            parent: true,
            children: true,
            _count: { select: { products: true } },
          },
        });

        return c.json(category);
      } catch (error) {
        return c.json({ error: "Failed to update category" }, 500);
      }
    }
  )

  // Delete category
  .delete("/:id",
    describeRoute({
      summary: "Delete category",
      tags: ["Categories"],
    }),
    async (c) => {
      const id = c.req.param("id");

      try {
        await db.category.delete({ where: { id } });
        return c.json({ message: "Category deleted successfully" });
      } catch (error) {
        return c.json({ error: "Failed to delete category" }, 500);
      }
    }
  );