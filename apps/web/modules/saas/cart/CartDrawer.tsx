"use client";

import { Button } from "@ui/components/button";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@ui/components/sheet";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "./CartContext";
import { CartItemComponent, CartSummary } from "./CartItem";

interface CartDrawerProps {
	trigger?: React.ReactNode;
	isOpen?: boolean;
	onClose?: () => void;
}

export function CartDrawer({
	trigger,
	isOpen: externalIsOpen,
	onClose,
}: CartDrawerProps) {
	const [internalIsOpen, setInternalIsOpen] = useState(false);
	const isOpen =
		externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;

	const handleOpenChange = (open: boolean) => {
		if (externalIsOpen !== undefined && onClose) {
			if (!open) {
				onClose();
			}
		} else {
			setInternalIsOpen(open);
		}
	};
	const {
		cart,
		isLoading,
		updateCartItem,
		removeFromCart,
		clearCart,
		getTotalItems,
	} = useCart();

	const handleUpdateQuantity = async (itemId: string, quantity: number) => {
		await updateCartItem(itemId, quantity);
	};

	const handleRemoveItem = async (itemId: string) => {
		await removeFromCart(itemId);
	};

	const handleClearCart = async () => {
		await clearCart();
	};

	const cartItemsCount = getTotalItems();

	const defaultTrigger = (
		<Button variant="outline" size="sm" className="relative">
			<ShoppingCart className="h-4 w-4" />
			{cartItemsCount > 0 && (
				<span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
					{cartItemsCount > 99 ? "99+" : cartItemsCount}
				</span>
			)}
		</Button>
	);

	return (
		<Sheet open={isOpen} onOpenChange={handleOpenChange}>
			<SheetTrigger asChild>{trigger || defaultTrigger}</SheetTrigger>
			<SheetContent className="w-full sm:max-w-lg">
				<SheetHeader>
					<SheetTitle>Shopping Cart ({cartItemsCount})</SheetTitle>
				</SheetHeader>

				<div className="flex flex-col h-full">
					{isLoading ? (
						<div className="flex items-center justify-center flex-1">
							<div className="text-center">
								<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto" />
								<p className="mt-2 text-sm text-gray-500">
									Loading cart...
								</p>
							</div>
						</div>
					) : !cart || cart.items.length === 0 ? (
						<div className="flex items-center justify-center flex-1">
							<div className="text-center">
								<ShoppingCart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
								<h3 className="text-lg font-medium text-gray-900 mb-2">
									Your cart is empty
								</h3>
								<p className="text-gray-500 mb-4">
									Add some products to get started!
								</p>
								<Button
									asChild
									onClick={() => handleOpenChange(false)}
								>
									<Link href="/store">Continue Shopping</Link>
								</Button>
							</div>
						</div>
					) : (
						<>
							{/* Cart Items */}
							<div className="flex-1 overflow-y-auto py-4">
								<div className="space-y-2">
									{cart.items.map((item) => (
										<CartItemComponent
											key={item.id}
											item={item}
											onUpdateQuantity={
												handleUpdateQuantity
											}
											onRemove={handleRemoveItem}
										/>
									))}
								</div>
							</div>

							{/* Cart Summary */}
							<div className="border-t pt-4 space-y-4">
								<CartSummary />

								<div className="space-y-2">
									<Button
										className="w-full"
										size="lg"
										asChild
										onClick={() => handleOpenChange(false)}
									>
										<Link href="/checkout">
											Proceed to Checkout
										</Link>
									</Button>

									<Button
										variant="outline"
										className="w-full"
										asChild
										onClick={() => handleOpenChange(false)}
									>
										<Link href="/store">
											Continue Shopping
										</Link>
									</Button>

									<Button
										variant="ghost"
										className="w-full text-red-600 hover:text-red-700"
										onClick={handleClearCart}
									>
										Clear Cart
									</Button>
								</div>
							</div>
						</>
					)}
				</div>
			</SheetContent>
		</Sheet>
	);
}

// Cart badge for showing item count
export function CartBadge() {
	const { getTotalItems } = useCart();
	const itemCount = getTotalItems();

	return (
		<CartDrawer
			trigger={
				<Button variant="outline" size="sm" className="relative">
					<ShoppingCart className="h-4 w-4" />
					<span className="ml-2">Cart</span>
					{itemCount > 0 && (
						<span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
							{itemCount > 99 ? "99+" : itemCount}
						</span>
					)}
				</Button>
			}
		/>
	);
}
