"use client";

import {
	type ReactNode,
	createContext,
	useContext,
	useEffect,
	useState,
} from "react";

export type CartItem = {
	id: string;
	productId: string;
	quantity: number;
	price: number;
	product: {
		id: string;
		name: string;
		slug: string;
		price: number;
		images: string[];
		status: string;
		quantity: number;
	};
};

export type Cart = {
	id: string;
	userId?: string;
	sessionId?: string;
	items: CartItem[];
	createdAt: string;
	updatedAt: string;
};

type CartContextType = {
	cart: Cart | null;
	isLoading: boolean;
	addToCart: (productId: string, quantity?: number) => Promise<void>;
	updateCartItem: (itemId: string, quantity: number) => Promise<void>;
	removeFromCart: (itemId: string) => Promise<void>;
	clearCart: () => Promise<void>;
	getTotalItems: () => number;
	getTotalPrice: () => number;
	refreshCart: () => Promise<void>;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function useCart() {
	const context = useContext(CartContext);
	if (context === undefined) {
		throw new Error("useCart must be used within a CartProvider");
	}
	return context;
}

export function CartProvider({ children }: { children: ReactNode }) {
	const [cart, setCart] = useState<Cart | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [sessionId, setSessionId] = useState<string>("");

	// Generate or get session ID for guest users
	useEffect(() => {
		let stored = localStorage.getItem("guest-session-id");
		if (!stored) {
			stored = `guest-${Date.now()}-${Math.random().toString(36).substring(2)}`;
			localStorage.setItem("guest-session-id", stored);
		}
		setSessionId(stored);
	}, []);

	// Fetch cart on mount and when sessionId changes
	useEffect(() => {
		if (sessionId) {
			refreshCart();
		}
	}, [sessionId]);

	const refreshCart = async () => {
		if (!sessionId) {
			return;
		}

		setIsLoading(true);
		try {
			// For now, using session-based cart for guests
			// In real app, you'd check if user is authenticated first
			const response = await fetch(`/api/cart/session/${sessionId}`, {
				headers: {
					"x-session-id": sessionId,
				},
			});

			if (response.ok) {
				const cartData = await response.json();
				setCart(cartData);
			}
		} catch (error) {
			console.error("Failed to fetch cart:", error);
		} finally {
			setIsLoading(false);
		}
	};

	const addToCart = async (productId: string, quantity = 1) => {
		try {
			const response = await fetch("/api/cart/add", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"x-session-id": sessionId,
				},
				body: JSON.stringify({ productId, quantity }),
			});

			if (response.ok) {
				await refreshCart();
			} else {
				const error = await response.json();
				throw new Error(error.error || "Failed to add item to cart");
			}
		} catch (error) {
			console.error("Failed to add to cart:", error);
			throw error;
		}
	};

	const updateCartItem = async (itemId: string, quantity: number) => {
		try {
			const response = await fetch(`/api/cart/item/${itemId}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ quantity }),
			});

			if (response.ok) {
				await refreshCart();
			} else {
				const error = await response.json();
				throw new Error(error.error || "Failed to update cart item");
			}
		} catch (error) {
			console.error("Failed to update cart item:", error);
			throw error;
		}
	};

	const removeFromCart = async (itemId: string) => {
		try {
			const response = await fetch(`/api/cart/item/${itemId}`, {
				method: "DELETE",
			});

			if (response.ok) {
				await refreshCart();
			} else {
				const error = await response.json();
				throw new Error(
					error.error || "Failed to remove item from cart",
				);
			}
		} catch (error) {
			console.error("Failed to remove from cart:", error);
			throw error;
		}
	};

	const clearCart = async () => {
		try {
			const response = await fetch("/api/cart/clear", {
				method: "DELETE",
				headers: {
					"x-session-id": sessionId,
				},
			});

			if (response.ok) {
				await refreshCart();
			} else {
				const error = await response.json();
				throw new Error(error.error || "Failed to clear cart");
			}
		} catch (error) {
			console.error("Failed to clear cart:", error);
			throw error;
		}
	};

	const getTotalItems = () => {
		if (!cart) {
			return 0;
		}
		return cart.items.reduce((total, item) => total + item.quantity, 0);
	};

	const getTotalPrice = () => {
		if (!cart) {
			return 0;
		}
		return cart.items.reduce(
			(total, item) => total + item.quantity * Number(item.price),
			0,
		);
	};

	const value: CartContextType = {
		cart,
		isLoading,
		addToCart,
		updateCartItem,
		removeFromCart,
		clearCart,
		getTotalItems,
		getTotalPrice,
		refreshCart,
	};

	return (
		<CartContext.Provider value={value}>{children}</CartContext.Provider>
	);
}
