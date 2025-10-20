import { db } from "@repo/database";
import { Hono } from "hono";
import { describeRoute } from "hono-openapi";
import { validator } from "hono-openapi/zod";
import { z } from "zod";

const addToCartSchema = z.object({
	productId: z.string(),
	quantity: z.number().int().positive().default(1),
});

const updateCartItemSchema = z.object({
	quantity: z.number().int().min(0),
});

export const cartRouter = new Hono()
	.basePath("/cart")

	// Get cart (for authenticated users)
	.get(
		"/",
		describeRoute({
			summary: "Get user cart",
			tags: ["Cart"],
		}),
		async (c) => {
			// In a real app, you'd get userId from auth middleware
			const userId = c.req.header("x-user-id"); // Placeholder for auth

			if (!userId) {
				return c.json({ error: "Authentication required" }, 401);
			}

			const cart = await db.cart.findUnique({
				where: { userId },
				include: {
					items: {
						include: {
							product: {
								select: {
									id: true,
									name: true,
									slug: true,
									price: true,
									images: true,
									status: true,
									quantity: true,
								},
							},
						},
					},
				},
			});

			if (!cart) {
				// Create empty cart if it doesn't exist
				const newCart = await db.cart.create({
					data: { userId },
					include: {
						items: {
							include: {
								product: {
									select: {
										id: true,
										name: true,
										slug: true,
										price: true,
										images: true,
										status: true,
										quantity: true,
									},
								},
							},
						},
					},
				});
				return c.json(newCart);
			}

			return c.json(cart);
		},
	)

	// Get cart by session (for guest users)
	.get(
		"/session/:sessionId",
		describeRoute({
			summary: "Get guest cart by session",
			tags: ["Cart"],
		}),
		async (c) => {
			const sessionId = c.req.param("sessionId");

			const cart = await db.cart.findUnique({
				where: { sessionId },
				include: {
					items: {
						include: {
							product: {
								select: {
									id: true,
									name: true,
									slug: true,
									price: true,
									images: true,
									status: true,
									quantity: true,
								},
							},
						},
					},
				},
			});

			if (!cart) {
				const newCart = await db.cart.create({
					data: { sessionId },
					include: {
						items: {
							include: {
								product: {
									select: {
										id: true,
										name: true,
										slug: true,
										price: true,
										images: true,
										status: true,
										quantity: true,
									},
								},
							},
						},
					},
				});
				return c.json(newCart);
			}

			return c.json(cart);
		},
	)

	// Add item to cart
	.post(
		"/add",
		validator("json", addToCartSchema),
		describeRoute({
			summary: "Add item to cart",
			tags: ["Cart"],
		}),
		async (c) => {
			const { productId, quantity } = c.req.valid("json");
			const userId = c.req.header("x-user-id");
			const sessionId = c.req.header("x-session-id");

			if (!userId && !sessionId) {
				return c.json({ error: "User ID or Session ID required" }, 400);
			}

			try {
				// Get or create cart
				let cart = await db.cart.findUnique({
					where: userId ? { userId } : { sessionId },
				});

				if (!cart) {
					cart = await db.cart.create({
						data: userId ? { userId } : { sessionId },
					});
				}

				// Check if product exists and is available
				const product = await db.product.findUnique({
					where: { id: productId },
				});

				if (!product) {
					return c.json({ error: "Product not found" }, 404);
				}

				if (
					product.status === "INACTIVE" ||
					product.status === "OUT_OF_STOCK"
				) {
					return c.json({ error: "Product is not available" }, 400);
				}

				// Check stock availability
				if (product.trackQuantity && product.quantity < quantity) {
					return c.json(
						{
							error: `Only ${product.quantity} items available in stock`,
						},
						400,
					);
				}

				// Check if item already exists in cart
				const existingCartItem = await db.cartItem.findUnique({
					where: {
						cartId_productId: {
							cartId: cart.id,
							productId,
						},
					},
				});

				// biome-ignore lint/suspicious/noImplicitAnyLet: <explanation>
				let cartItem;
				if (existingCartItem) {
					const newQuantity = existingCartItem.quantity + quantity;

					// Check stock for new total quantity
					if (
						product.trackQuantity &&
						product.quantity < newQuantity
					) {
						return c.json(
							{
								error: `Only ${product.quantity} items available in stock`,
							},
							400,
						);
					}

					cartItem = await db.cartItem.update({
						where: { id: existingCartItem.id },
						data: { quantity: newQuantity },
						include: { product: true },
					});
				} else {
					cartItem = await db.cartItem.create({
						data: {
							cartId: cart.id,
							productId,
							quantity,
							price: product.price,
						},
						include: { product: true },
					});
				}

				return c.json(cartItem, 201);
			} catch (error) {
				console.error("Error adding to cart:", error);
				return c.json({ error: "Failed to add item to cart" }, 500);
			}
		},
	)

	// Update cart item quantity
	.put(
		"/item/:itemId",
		validator("json", updateCartItemSchema),
		describeRoute({
			summary: "Update cart item quantity",
			tags: ["Cart"],
		}),
		async (c) => {
			const itemId = c.req.param("itemId");
			const { quantity } = c.req.valid("json");

			try {
				if (quantity === 0) {
					// Remove item if quantity is 0
					await db.cartItem.delete({ where: { id: itemId } });
					return c.json({ message: "Item removed from cart" });
				}

				// Check stock availability
				const cartItem = await db.cartItem.findUnique({
					where: { id: itemId },
					include: { product: true },
				});

				if (!cartItem) {
					return c.json({ error: "Cart item not found" }, 404);
				}

				if (
					cartItem.product.trackQuantity &&
					cartItem.product.quantity < quantity
				) {
					return c.json(
						{
							error: `Only ${cartItem.product.quantity} items available in stock`,
						},
						400,
					);
				}

				const updatedItem = await db.cartItem.update({
					where: { id: itemId },
					data: { quantity },
					include: { product: true },
				});

				return c.json(updatedItem);
			} catch (error) {
				console.error("Error updating cart item:", error);
				return c.json({ error: "Failed to update cart item" }, 500);
			}
		},
	)

	// Remove item from cart
	.delete(
		"/item/:itemId",
		describeRoute({
			summary: "Remove item from cart",
			tags: ["Cart"],
		}),
		async (c) => {
			const itemId = c.req.param("itemId");

			try {
				await db.cartItem.delete({ where: { id: itemId } });
				return c.json({ message: "Item removed from cart" });
			} catch (error) {
				console.error("Error removing cart item:", error);
				return c.json({ error: "Failed to remove cart item" }, 500);
			}
		},
	)

	// Clear cart
	.delete(
		"/clear",
		describeRoute({
			summary: "Clear cart",
			tags: ["Cart"],
		}),
		async (c) => {
			const userId = c.req.header("x-user-id");
			const sessionId = c.req.header("x-session-id");

			if (!userId && !sessionId) {
				return c.json({ error: "User ID or Session ID required" }, 400);
			}

			try {
				const cart = await db.cart.findUnique({
					where: userId ? { userId } : { sessionId },
				});

				if (cart) {
					await db.cartItem.deleteMany({
						where: { cartId: cart.id },
					});
				}

				return c.json({ message: "Cart cleared successfully" });
			} catch (error) {
				console.error("Error clearing cart:", error);
				return c.json({ error: "Failed to clear cart" }, 500);
			}
		},
	);
