import { db } from "@repo/database";
import { Hono } from "hono";
import { describeRoute } from "hono-openapi";
import { validator } from "hono-openapi/zod";
import { z } from "zod";
import { adminMiddleware } from "../../middleware/admin";

const productQuerySchema = z.object({
	page: z.string().optional().default("1").transform(Number),
	limit: z.string().optional().default("10").transform(Number),
	category: z.string().optional(),
	status: z.enum(["DRAFT", "ACTIVE", "INACTIVE", "OUT_OF_STOCK"]).optional(),
	search: z.string().optional(),
});

const createProductSchema = z.object({
	name: z.string().min(1),
	slug: z.string().min(1),
	description: z.string().optional(),
	price: z.number().positive(),
	comparePrice: z.number().positive().optional(),
	sku: z.string().optional(),
	quantity: z.number().int().min(0).default(0),
	status: z
		.enum(["DRAFT", "ACTIVE", "INACTIVE", "OUT_OF_STOCK"])
		.default("DRAFT"),
	featured: z.boolean().default(false),
	images: z.array(z.string()).default([]),
	categoryId: z.string().optional(),
});

export const productRouter = new Hono()
	.basePath("/products")
	.use(adminMiddleware)

	// Get all products
	.get(
		"/",
		validator("query", productQuerySchema),
		describeRoute({
			summary: "Get all products",
			tags: ["Products"],
		}),
		async (c) => {
			const { page, limit, category, status, search } =
				c.req.valid("query");
			const skip = (page - 1) * limit;

			const where: any = {};

			if (category) {
				where.categoryId = category;
			}
			if (status) {
				where.status = status;
			}
			if (search) {
				where.OR = [
					{ name: { contains: search, mode: "insensitive" } },
					{ description: { contains: search, mode: "insensitive" } },
					{ sku: { contains: search, mode: "insensitive" } },
				];
			}

			const [products, total] = await db.$transaction([
				db.product.findMany({
					where,
					include: { category: true },
					orderBy: { createdAt: "desc" },
					skip,
					take: limit,
				}),
				db.product.count({ where }),
			]);

			return c.json({
				products,
				pagination: {
					page,
					limit,
					total,
					totalPages: Math.ceil(total / limit),
				},
			});
		},
	)

	// Get single product
	.get(
		"/:id",
		describeRoute({
			summary: "Get product by ID",
			tags: ["Products"],
		}),
		async (c) => {
			const id = c.req.param("id");

			const product = await db.product.findUnique({
				where: { id },
				include: { category: true },
			});

			if (!product) {
				return c.json({ error: "Product not found" }, 404);
			}

			return c.json(product);
		},
	)

	// Create product
	.post(
		"/",
		validator("json", createProductSchema),
		describeRoute({
			summary: "Create new product",
			tags: ["Products"],
		}),
		async (c) => {
			const data = c.req.valid("json");

			try {
				const product = await db.product.create({
					data: {
						...data,
						price: data.price.toString(),
						comparePrice: data.comparePrice?.toString(),
					},
					include: { category: true },
				});

				return c.json(product, 201);
			} catch (error) {
				return c.json({ error: "Failed to create product" }, 500);
			}
		},
	)

	// Update product
	.put(
		"/:id",
		validator("json", createProductSchema.partial()),
		describeRoute({
			summary: "Update product",
			tags: ["Products"],
		}),
		async (c) => {
			const id = c.req.param("id");
			const data = c.req.valid("json");

			try {
				const product = await db.product.update({
					where: { id },
					data: {
						...data,
						price: data.price?.toString(),
						comparePrice: data.comparePrice?.toString(),
					},
					include: { category: true },
				});

				return c.json(product);
			} catch (error) {
				return c.json({ error: "Failed to update product" }, 500);
			}
		},
	)

	// Delete product
	.delete(
		"/:id",
		describeRoute({
			summary: "Delete product",
			tags: ["Products"],
		}),
		async (c) => {
			const id = c.req.param("id");

			try {
				await db.product.delete({ where: { id } });
				return c.json({ message: "Product deleted successfully" });
			} catch (error) {
				return c.json({ error: "Failed to delete product" }, 500);
			}
		},
	);
