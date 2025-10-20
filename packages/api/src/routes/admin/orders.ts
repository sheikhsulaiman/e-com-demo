import { db } from "@repo/database";
import { Hono } from "hono";
import { describeRoute } from "hono-openapi";
import { validator } from "hono-openapi/zod";
import { z } from "zod";
import { adminMiddleware } from "../../middleware/admin";

const orderQuerySchema = z.object({
  page: z.string().optional().default("1").transform(Number),
  limit: z.string().optional().default("10").transform(Number),
  status: z.enum(["PENDING", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED", "REFUNDED"]).optional(),
  search: z.string().optional(),
});

const updateOrderSchema = z.object({
  status: z.enum(["PENDING", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED", "REFUNDED"]).optional(),
  trackingNumber: z.string().optional(),
});

export const orderRouter = new Hono()
  .basePath("/orders")
  .use(adminMiddleware)
  
  // Get all orders
  .get("/", 
    validator("query", orderQuerySchema),
    describeRoute({
      summary: "Get all orders",
      tags: ["Orders"],
    }),
    async (c) => {
    const { page, limit, status, search } = c.req.valid("query");
    const skip = (page - 1) * limit;

    const where: any = {};
    
    if (status) where.status = status;
    if (search) {
      where.OR = [
        { orderNumber: { contains: search, mode: "insensitive" } },
        { customerEmail: { contains: search, mode: "insensitive" } },
        { billingName: { contains: search, mode: "insensitive" } },
      ];
    }

    const [orders, total] = await db.$transaction([
      db.order.findMany({
        where,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          items: {
            include: {
              product: {
                select: {
                  id: true,
                  name: true,
                  slug: true,
                  images: true,
                  sku: true,
                },
              },
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      db.order.count({ where }),
    ]);

    return c.json({
      orders,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  })

  // Get single order
  .get("/:id", 
    describeRoute({
      summary: "Get order by ID",
      tags: ["Orders"],
    }),
    async (c) => {
      const id = c.req.param("id");

      const order = await db.order.findUnique({
        where: { id },
        include: {
          user: { select: { id: true, name: true, email: true } },
          items: { include: { product: true } },
        },
      });

      if (!order) {
        return c.json({ error: "Order not found" }, 404);
      }

      return c.json(order);
    }
  )

  // Update order
  .put("/:id",
    validator("json", updateOrderSchema),
    describeRoute({
      summary: "Update order",
      tags: ["Orders"],
    }),
    async (c) => {
      const id = c.req.param("id");
      const data = c.req.valid("json");

      try {
        const order = await db.order.update({
          where: { id },
          data,
          include: {
            user: { select: { id: true, name: true, email: true } },
            items: { include: { product: true } },
          },
        });

        return c.json(order);
      } catch (error) {
        return c.json({ error: "Failed to update order" }, 500);
      }
    }
  )

  // Get recent orders
  .get("/recent",
    describeRoute({
      summary: "Get recent orders",
      tags: ["Orders"],
    }),
    async (c) => {
      const orders = await db.order.findMany({
        take: 10,
        orderBy: { createdAt: 'desc' },
        include: {
          user: { select: { id: true, name: true, email: true } },
          items: { include: { product: { select: { id: true, name: true, images: true } } } },
        },
      });

      return c.json(orders);
    }
  );