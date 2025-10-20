"use client";

import { Button } from "@ui/components/button";
import { Minus, Plus, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { type CartItem, useCart } from "./CartContext";

interface CartItemComponentProps {
	item: CartItem;
	onUpdateQuantity: (itemId: string, quantity: number) => void;
	onRemove: (itemId: string) => void;
}

export function CartItemComponent({
	item,
	onUpdateQuantity,
	onRemove,
}: CartItemComponentProps) {
	const [isUpdating, setIsUpdating] = useState(false);

	const handleQuantityChange = async (newQuantity: number) => {
		if (newQuantity < 1) {
			return;
		}

		setIsUpdating(true);
		try {
			await onUpdateQuantity(item.id, newQuantity);
		} finally {
			setIsUpdating(false);
		}
	};

	const handleRemove = async () => {
		setIsUpdating(true);
		try {
			await onRemove(item.id);
		} finally {
			setIsUpdating(false);
		}
	};

	const formatPrice = (price: number) => {
		return new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "USD",
		}).format(price);
	};

	return (
		<div className="flex items-center space-x-4 py-4">
			{/* Product Image */}
			<div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md bg-gray-100">
				{item.product.images[0] ? (
					<Image
						src={item.product.images[0]}
						alt={item.product.name}
						fill
						className="object-cover"
					/>
				) : (
					<div className="flex h-full w-full items-center justify-center bg-gray-100">
						<span className="text-xs text-gray-400">No image</span>
					</div>
				)}
			</div>

			{/* Product Details */}
			<div className="flex-1 min-w-0">
				<h4 className="text-sm font-medium text-gray-900 truncate">
					{item.product.name}
				</h4>
				<p className="text-sm text-gray-500">
					{formatPrice(Number(item.price))} each
				</p>
			</div>

			{/* Quantity Controls */}
			<div className="flex items-center space-x-2">
				<Button
					variant="outline"
					size="sm"
					className="h-8 w-8 p-0"
					onClick={() => handleQuantityChange(item.quantity - 1)}
					disabled={isUpdating || item.quantity <= 1}
				>
					<Minus className="h-3 w-3" />
				</Button>

				<span className="w-8 text-center text-sm font-medium">
					{item.quantity}
				</span>

				<Button
					variant="outline"
					size="sm"
					className="h-8 w-8 p-0"
					onClick={() => handleQuantityChange(item.quantity + 1)}
					disabled={isUpdating}
				>
					<Plus className="h-3 w-3" />
				</Button>
			</div>

			{/* Total Price */}
			<div className="text-sm font-medium text-gray-900">
				{formatPrice(item.quantity * Number(item.price))}
			</div>

			{/* Remove Button */}
			<Button
				variant="ghost"
				size="sm"
				className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
				onClick={handleRemove}
				disabled={isUpdating}
			>
				<X className="h-4 w-4" />
			</Button>
		</div>
	);
}

export function CartSummary() {
	const { cart, getTotalItems, getTotalPrice } = useCart();

	if (!cart || cart.items.length === 0) {
		return null;
	}

	const formatPrice = (price: number) => {
		return new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "USD",
		}).format(price);
	};

	const subtotal = getTotalPrice();
	const shipping = subtotal > 50 ? 0 : 9.99; // Free shipping over $50
	const tax = subtotal * 0.08; // 8% tax
	const total = subtotal + shipping + tax;

	return (
		<div className="space-y-3">
			<div className="flex justify-between text-sm">
				<span>Subtotal ({getTotalItems()} items)</span>
				<span>{formatPrice(subtotal)}</span>
			</div>

			<div className="flex justify-between text-sm">
				<span>Shipping</span>
				<span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
			</div>

			<div className="flex justify-between text-sm">
				<span>Tax</span>
				<span>{formatPrice(tax)}</span>
			</div>

			<hr />

			<div className="flex justify-between font-medium">
				<span>Total</span>
				<span>{formatPrice(total)}</span>
			</div>
		</div>
	);
}
