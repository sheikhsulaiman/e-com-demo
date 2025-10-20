"use client";

import { Button } from "@ui/components/button";
import { cn } from "@ui/lib";
import { Check, Loader2, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { useCart } from "./CartContext";

interface AddToCartButtonProps {
	productId: string;
	quantity?: number;
	variant?: "primary" | "outline" | "ghost" | "secondary" | "error" | "link";
	size?: "sm" | "md" | "lg" | "icon";
	className?: string;
	disabled?: boolean;
	children?: React.ReactNode;
}

export function AddToCartButton({
	productId,
	quantity = 1,
	variant = "primary",
	size = "md",
	className,
	disabled = false,
	children,
}: AddToCartButtonProps) {
	const [isLoading, setIsLoading] = useState(false);
	const [isAdded, setIsAdded] = useState(false);
	const { addToCart } = useCart();

	const handleAddToCart = async () => {
		if (isLoading || disabled) {
			return;
		}

		setIsLoading(true);
		try {
			await addToCart(productId, quantity);
			setIsAdded(true);

			// Reset the "added" state after 2 seconds
			setTimeout(() => {
				setIsAdded(false);
			}, 2000);
		} catch (error) {
			console.error("Failed to add to cart:", error);
			// You could show a toast notification here
		} finally {
			setIsLoading(false);
		}
	};

	const getButtonContent = () => {
		if (isLoading) {
			return (
				<>
					<Loader2 className="h-4 w-4 mr-2 animate-spin" />
					Adding...
				</>
			);
		}

		if (isAdded) {
			return (
				<>
					<Check className="h-4 w-4 mr-2" />
					Added to Cart
				</>
			);
		}

		if (children) {
			return children;
		}

		return (
			<>
				<ShoppingCart className="h-4 w-4 mr-2" />
				Add to Cart
			</>
		);
	};

	return (
		<Button
			variant={isAdded ? "outline" : variant}
			size={size}
			className={cn(
				isAdded && "border-green-500 text-green-600",
				className,
			)}
			onClick={handleAddToCart}
			disabled={isLoading || disabled || isAdded}
		>
			{getButtonContent()}
		</Button>
	);
}

// Quick add button for product cards
export function QuickAddButton({
	productId,
	className,
}: {
	productId: string;
	className?: string;
}) {
	return (
		<AddToCartButton
			productId={productId}
			variant="outline"
			size="sm"
			className={cn("w-full", className)}
		>
			Quick Add
		</AddToCartButton>
	);
}
