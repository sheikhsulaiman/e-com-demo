import { Badge } from "@ui/components/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@ui/components/card";
import {
	AlertTriangle,
	BarChart,
	DollarSign,
	Package,
	ShoppingCart,
} from "lucide-react";
import Link from "next/link";

// Mock data - in real app, this would come from your API
const mockStats = {
	totalProducts: 156,
	activeProducts: 142,
	lowStockProducts: 8,
	outOfStockProducts: 6,
	totalOrders: 342,
	pendingOrders: 12,
	totalRevenue: 28750.5,
	monthlyRevenue: 4230.75,
};

const mockRecentOrders = [
	{
		id: "1",
		orderNumber: "ORD-2024-001",
		customerName: "John Doe",
		total: 299.97,
		status: "PROCESSING",
		createdAt: "2024-01-15T10:30:00Z",
	},
	{
		id: "2",
		orderNumber: "ORD-2024-002",
		customerName: "Jane Smith",
		total: 149.99,
		status: "SHIPPED",
		createdAt: "2024-01-14T14:20:00Z",
	},
	{
		id: "3",
		orderNumber: "ORD-2024-003",
		customerName: "Bob Johnson",
		total: 89.99,
		status: "PENDING",
		createdAt: "2024-01-13T09:15:00Z",
	},
];

const mockLowStockProducts = [
	{
		id: "1",
		name: "Eco-Friendly Water Bottle",
		sku: "EWB-002",
		quantity: 2,
		lowStockAlert: 5,
	},
	{
		id: "2",
		name: "Wireless Mouse",
		sku: "WM-004",
		quantity: 4,
		lowStockAlert: 10,
	},
	{
		id: "3",
		name: "Phone Case",
		sku: "PC-008",
		quantity: 1,
		lowStockAlert: 5,
	},
];

const statusColors = {
	PENDING: "warning",
	PROCESSING: "info",
	SHIPPED: "info",
	DELIVERED: "success",
	CANCELLED: "error",
	REFUNDED: "error",
} as const;

export default function AdminDashboard() {
	const formatCurrency = (amount: number) => {
		return new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "USD",
		}).format(amount);
	};

	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString("en-US", {
			month: "short",
			day: "numeric",
		});
	};

	return (
		<div className="space-y-6">
			{/* Header */}
			<div>
				<h1 className="text-3xl font-semibold">Admin Dashboard</h1>
				<p className="text-muted-foreground">
					Welcome to your e-commerce admin panel
				</p>
			</div>

			{/* Key Stats Grid */}
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Total Products
						</CardTitle>
						<Package className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{mockStats.totalProducts}
						</div>
						<p className="text-xs text-muted-foreground">
							{mockStats.activeProducts} active
						</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Total Orders
						</CardTitle>
						<ShoppingCart className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{mockStats.totalOrders}
						</div>
						<p className="text-xs text-muted-foreground">
							{mockStats.pendingOrders} pending
						</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Total Revenue
						</CardTitle>
						<DollarSign className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{formatCurrency(mockStats.totalRevenue)}
						</div>
						<p className="text-xs text-muted-foreground">
							{formatCurrency(mockStats.monthlyRevenue)} this
							month
						</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Low Stock Alert
						</CardTitle>
						<AlertTriangle className="h-4 w-4 text-amber-500" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold text-amber-600">
							{mockStats.lowStockProducts}
						</div>
						<p className="text-xs text-muted-foreground">
							Products need restocking
						</p>
					</CardContent>
				</Card>
			</div>

			<div className="grid gap-6 md:grid-cols-2">
				{/* Recent Orders */}
				<Card>
					<CardHeader className="flex flex-row items-center justify-between">
						<CardTitle>Recent Orders</CardTitle>
						<Link
							href="/app/admin/orders"
							className="text-sm text-primary hover:underline"
						>
							View all
						</Link>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							{mockRecentOrders.map((order) => (
								<div
									key={order.id}
									className="flex items-center justify-between"
								>
									<div className="space-y-1">
										<p className="text-sm font-medium">
											{order.orderNumber}
										</p>
										<p className="text-xs text-muted-foreground">
											{order.customerName} •{" "}
											{formatDate(order.createdAt)}
										</p>
									</div>
									<div className="text-right space-y-1">
										<p className="text-sm font-medium">
											{formatCurrency(order.total)}
										</p>
										<Badge
											status={
												statusColors[
													order.status as keyof typeof statusColors
												]
											}
										>
											{order.status}
										</Badge>
									</div>
								</div>
							))}
						</div>
					</CardContent>
				</Card>

				{/* Low Stock Products */}
				<Card>
					<CardHeader className="flex flex-row items-center justify-between">
						<CardTitle>Low Stock Products</CardTitle>
						<Link
							href="/app/admin/products"
							className="text-sm text-primary hover:underline"
						>
							View all
						</Link>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							{mockLowStockProducts.map((product) => (
								<div
									key={product.id}
									className="flex items-center justify-between"
								>
									<div className="space-y-1">
										<p className="text-sm font-medium">
											{product.name}
										</p>
										<p className="text-xs text-muted-foreground font-mono">
											{product.sku}
										</p>
									</div>
									<div className="text-right">
										<p className="text-sm font-medium text-amber-600">
											{product.quantity} left
										</p>
										<p className="text-xs text-muted-foreground">
											Reorder at {product.lowStockAlert}
										</p>
									</div>
								</div>
							))}
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Quick Actions */}
			<Card>
				<CardHeader>
					<CardTitle>Quick Actions</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="grid gap-4 md:grid-cols-3">
						<Link
							href="/app/admin/products/new"
							className="flex items-center justify-center p-6 border-2 border-dashed border-muted-foreground/25 rounded-lg hover:border-primary hover:bg-primary/5 transition-colors"
						>
							<div className="text-center space-y-2">
								<Package className="h-8 w-8 mx-auto text-muted-foreground" />
								<p className="font-medium">Add New Product</p>
								<p className="text-sm text-muted-foreground">
									Create a new product listing
								</p>
							</div>
						</Link>

						<Link
							href="/app/admin/orders"
							className="flex items-center justify-center p-6 border-2 border-dashed border-muted-foreground/25 rounded-lg hover:border-primary hover:bg-primary/5 transition-colors"
						>
							<div className="text-center space-y-2">
								<ShoppingCart className="h-8 w-8 mx-auto text-muted-foreground" />
								<p className="font-medium">Manage Orders</p>
								<p className="text-sm text-muted-foreground">
									Process pending orders
								</p>
							</div>
						</Link>

						<Link
							href="/app/admin/categories"
							className="flex items-center justify-center p-6 border-2 border-dashed border-muted-foreground/25 rounded-lg hover:border-primary hover:bg-primary/5 transition-colors"
						>
							<div className="text-center space-y-2">
								<BarChart className="h-8 w-8 mx-auto text-muted-foreground" />
								<p className="font-medium">Manage Categories</p>
								<p className="text-sm text-muted-foreground">
									Organize product categories
								</p>
							</div>
						</Link>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
