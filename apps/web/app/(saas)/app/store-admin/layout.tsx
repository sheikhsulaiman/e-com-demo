"use client";

import { Button } from "@ui/components/button";
import { cn } from "@ui/lib";
import {
	FolderTree,
	Home,
	Menu,
	Package,
	ShoppingCart,
	Warehouse,
	X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navigation = [
	{ name: "Dashboard", href: "/app/store-admin", icon: Home },
	{ name: "Products", href: "/app/store-admin/products", icon: Package },
	{ name: "Inventory", href: "/app/store-admin/inventory", icon: Warehouse },
	{ name: "Orders", href: "/app/store-admin/orders", icon: ShoppingCart },
	{
		name: "Categories",
		href: "/app/store-admin/categories",
		icon: FolderTree,
	},
];

export default function AdminLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const pathname = usePathname();

	return (
		<div className="flex h-screen bg-gray-50">
			{/* Mobile sidebar overlay */}
			{sidebarOpen && (
				<div
					className="fixed inset-0 z-40 bg-black bg-opacity-25 lg:hidden"
					onClick={() => setSidebarOpen(false)}
					onKeyDown={(e) => {
						if (e.key === "Enter" || e.key === " ") {
							setSidebarOpen(false);
						}
					}}
					role="button"
					tabIndex={0}
					aria-label="Close sidebar"
				/>
			)}

			{/* Sidebar */}
			<div
				className={cn(
					"fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0",
					sidebarOpen ? "translate-x-0" : "-translate-x-full",
				)}
			>
				<div className="flex items-center justify-between px-4 py-4 border-b">
					<h2 className="text-lg font-semibold text-gray-900">
						Admin Panel
					</h2>
					<Button
						variant="ghost"
						size="sm"
						className="lg:hidden"
						onClick={() => setSidebarOpen(false)}
					>
						<X className="h-5 w-5" />
					</Button>
				</div>

				<nav className="mt-8">
					<div className="px-4 space-y-2">
						{navigation.map((item) => {
							const isActive = pathname === item.href;
							return (
								<Link
									key={item.name}
									href={item.href}
									className={cn(
										"flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
										isActive
											? "bg-primary text-primary-foreground"
											: "text-gray-700 hover:text-gray-900 hover:bg-gray-100",
									)}
									onClick={() => setSidebarOpen(false)}
								>
									<item.icon className="mr-3 h-5 w-5" />
									{item.name}
								</Link>
							);
						})}
					</div>
				</nav>
			</div>

			{/* Main content */}
			<div className="flex flex-col flex-1 overflow-hidden">
				{/* Top navigation */}
				<header className="bg-white shadow-sm border-b">
					<div className="px-4 sm:px-6 lg:px-8">
						<div className="flex justify-between h-16">
							<div className="flex items-center">
								<Button
									variant="ghost"
									size="sm"
									className="lg:hidden"
									onClick={() => setSidebarOpen(true)}
								>
									<Menu className="h-5 w-5" />
								</Button>
								<div className="ml-4 lg:ml-0">
									<h1 className="text-xl font-semibold text-gray-900">
										E-Commerce Admin
									</h1>
								</div>
							</div>

							<div className="flex items-center space-x-4">
								<Link
									href="/app"
									className="text-sm text-gray-600 hover:text-gray-900"
								>
									Back to App
								</Link>
							</div>
						</div>
					</div>
				</header>

				{/* Page content */}
				<main className="flex-1 overflow-y-auto">
					<div className="p-6">{children}</div>
				</main>
			</div>
		</div>
	);
}
