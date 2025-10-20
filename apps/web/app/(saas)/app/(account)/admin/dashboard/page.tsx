import { Badge } from "@ui/components/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@ui/components/card";
import {
	AlertTriangle,
	Building2,
	Clock,
	DollarSign,
	Eye,
	Package,
	ShoppingCart,
	TrendingDown,
	TrendingUp,
	Users,
	Warehouse,
} from "lucide-react";
import Link from "next/link";

// Mock data - in real app, this would come from your API
const mockStats = {
	totalUsers: 1247,
	activeUsers: 1189,
	newUsersThisMonth: 89,
	totalOrganizations: 89,
	totalProducts: 156,
	activeProducts: 142,
	lowStockProducts: 8,
	outOfStockProducts: 6,
	totalOrders: 342,
	pendingOrders: 12,
	completedOrders: 298,
	totalRevenue: 28750.5,
	monthlyRevenue: 4230.75,
	dailyRevenue: 156.5,
	conversionRate: 3.2,
	averageOrderValue: 84.06,
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
	{
		id: "4",
		orderNumber: "ORD-2024-004",
		customerName: "Alice Wilson",
		total: 199.5,
		status: "DELIVERED",
		createdAt: "2024-01-12T16:45:00Z",
	},
	{
		id: "5",
		orderNumber: "ORD-2024-005",
		customerName: "Mike Davis",
		total: 75.25,
		status: "PROCESSING",
		createdAt: "2024-01-11T11:20:00Z",
	},
];

const mockLowStockProducts = [
	{
		id: "1",
		name: "Eco-Friendly Water Bottle",
		sku: "EWB-002",
		quantity: 2,
		lowStockAlert: 5,
		category: "Lifestyle",
	},
	{
		id: "2",
		name: "Wireless Mouse",
		sku: "WM-004",
		quantity: 4,
		lowStockAlert: 10,
		category: "Electronics",
	},
	{
		id: "3",
		name: "Phone Case",
		sku: "PC-008",
		quantity: 1,
		lowStockAlert: 5,
		category: "Accessories",
	},
	{
		id: "4",
		name: "Laptop Stand",
		sku: "LS-012",
		quantity: 3,
		lowStockAlert: 8,
		category: "Office",
	},
];

const mockTopProducts = [
	{
		id: "1",
		name: "Premium Wireless Headphones",
		sales: 47,
		revenue: 7050.0,
		trend: "up",
	},
	{
		id: "2",
		name: "Smart Fitness Tracker",
		sales: 32,
		revenue: 2560.0,
		trend: "up",
	},
	{
		id: "3",
		name: "Organic Cotton T-Shirt",
		sales: 28,
		revenue: 420.0,
		trend: "down",
	},
	{
		id: "4",
		name: "Premium Yoga Mat",
		sales: 21,
		revenue: 525.0,
		trend: "up",
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
			hour: "2-digit",
			minute: "2-digit",
		});
	};

	const formatNumber = (num: number) => {
		return new Intl.NumberFormat("en-US").format(num);
	};

	return (
		<div className="space-y-6">
			{/* Header */}
			<div>
				<h1 className="text-3xl font-bold text-gray-900">
					Admin Dashboard
				</h1>
				<p className="text-gray-600 mt-2">
					Comprehensive overview of your platform and e-commerce
					operations
				</p>
			</div>

			{/* Key Performance Indicators */}
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Total Revenue
						</CardTitle>
						<DollarSign className="h-4 w-4 text-green-600" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{formatCurrency(mockStats.totalRevenue)}
						</div>
						<p className="text-xs text-green-600 flex items-center">
							<TrendingUp className="h-3 w-3 mr-1" />
							{formatCurrency(mockStats.monthlyRevenue)} this
							month
						</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Total Orders
						</CardTitle>
						<ShoppingCart className="h-4 w-4 text-blue-600" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{formatNumber(mockStats.totalOrders)}
						</div>
						<p className="text-xs text-gray-600">
							{mockStats.pendingOrders} pending •{" "}
							{mockStats.completedOrders} completed
						</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Active Users
						</CardTitle>
						<Users className="h-4 w-4 text-purple-600" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{formatNumber(mockStats.activeUsers)}
						</div>
						<p className="text-xs text-green-600 flex items-center">
							<TrendingUp className="h-3 w-3 mr-1" />+
							{mockStats.newUsersThisMonth} this month
						</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Conversion Rate
						</CardTitle>
						<Eye className="h-4 w-4 text-orange-600" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{mockStats.conversionRate}%
						</div>
						<p className="text-xs text-gray-600">
							Avg. order:{" "}
							{formatCurrency(mockStats.averageOrderValue)}
						</p>
					</CardContent>
				</Card>
			</div>

			{/* Secondary Stats */}
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Total Products
						</CardTitle>
						<Package className="h-4 w-4 text-gray-600" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{mockStats.totalProducts}
						</div>
						<p className="text-xs text-gray-600">
							{mockStats.activeProducts} active
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
						<p className="text-xs text-gray-600">
							{mockStats.outOfStockProducts} out of stock
						</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Organizations
						</CardTitle>
						<Building2 className="h-4 w-4 text-gray-600" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{mockStats.totalOrganizations}
						</div>
						<p className="text-xs text-gray-600">
							Active organizations
						</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Daily Revenue
						</CardTitle>
						<Clock className="h-4 w-4 text-gray-600" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{formatCurrency(mockStats.dailyRevenue)}
						</div>
						<p className="text-xs text-gray-600">
							Today's earnings
						</p>
					</CardContent>
				</Card>
			</div>

			<div className="grid gap-6 lg:grid-cols-2">
				{/* Recent Orders */}
				<Card>
					<CardHeader className="flex flex-row items-center justify-between">
						<CardTitle>Recent Orders</CardTitle>
						<Link
							href="/app/admin/orders"
							className="text-sm text-primary hover:underline"
						>
							View all orders
						</Link>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							{mockRecentOrders.map((order) => (
								<div
									key={order.id}
									className="flex items-center justify-between p-3 rounded-lg border"
								>
									<div className="space-y-1">
										<p className="text-sm font-medium">
											{order.orderNumber}
										</p>
										<p className="text-xs text-gray-600">
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

				{/* Top Performing Products */}
				<Card>
					<CardHeader className="flex flex-row items-center justify-between">
						<CardTitle>Top Performing Products</CardTitle>
						<Link
							href="/app/admin/products"
							className="text-sm text-primary hover:underline"
						>
							View all products
						</Link>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							{mockTopProducts.map((product, index) => (
								<div
									key={product.id}
									className="flex items-center justify-between p-3 rounded-lg border"
								>
									<div className="flex items-center space-x-3">
										<div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-medium">
											{index + 1}
										</div>
										<div className="space-y-1">
											<p className="text-sm font-medium">
												{product.name}
											</p>
											<p className="text-xs text-gray-600">
												{product.sales} sales
											</p>
										</div>
									</div>
									<div className="text-right space-y-1">
										<p className="text-sm font-medium">
											{formatCurrency(product.revenue)}
										</p>
										<div className="flex items-center text-xs">
											{product.trend === "up" ? (
												<TrendingUp className="h-3 w-3 text-green-600 mr-1" />
											) : (
												<TrendingDown className="h-3 w-3 text-red-600 mr-1" />
											)}
											<span
												className={
													product.trend === "up"
														? "text-green-600"
														: "text-red-600"
												}
											>
												{product.trend === "up"
													? "Growing"
													: "Declining"}
											</span>
										</div>
									</div>
								</div>
							))}
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Low Stock Products */}
			<Card>
				<CardHeader className="flex flex-row items-center justify-between">
					<CardTitle>Low Stock Products</CardTitle>
					<Link
						href="/app/admin/inventory"
						className="text-sm text-primary hover:underline"
					>
						Manage inventory
					</Link>
				</CardHeader>
				<CardContent>
					<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
						{mockLowStockProducts.map((product) => (
							<div
								key={product.id}
								className="p-4 rounded-lg border border-amber-200 bg-amber-50"
							>
								<div className="flex items-center justify-between mb-2">
									<Badge status="warning" className="text-xs">
										Low Stock
									</Badge>
									<AlertTriangle className="h-4 w-4 text-amber-500" />
								</div>
								<h4 className="font-medium text-sm mb-1">
									{product.name}
								</h4>
								<p className="text-xs text-gray-600 mb-2">
									{product.category}
								</p>
								<div className="flex justify-between text-xs">
									<span className="text-gray-600">
										SKU: {product.sku}
									</span>
									<span className="font-medium text-amber-700">
										{product.quantity} left
									</span>
								</div>
							</div>
						))}
					</div>
				</CardContent>
			</Card>

			{/* Quick Actions */}
			<Card>
				<CardHeader>
					<CardTitle>Quick Actions</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
						<Link
							href="/app/admin/users"
							className="flex items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary hover:bg-primary/5 transition-colors"
						>
							<div className="text-center space-y-2">
								<Users className="h-8 w-8 mx-auto text-gray-600" />
								<p className="font-medium">Manage Users</p>
								<p className="text-sm text-gray-600">
									View and manage user accounts
								</p>
							</div>
						</Link>

						<Link
							href="/app/admin/products"
							className="flex items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary hover:bg-primary/5 transition-colors"
						>
							<div className="text-center space-y-2">
								<Package className="h-8 w-8 mx-auto text-gray-600" />
								<p className="font-medium">Add Product</p>
								<p className="text-sm text-gray-600">
									Create new product listings
								</p>
							</div>
						</Link>

						<Link
							href="/app/admin/inventory"
							className="flex items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary hover:bg-primary/5 transition-colors"
						>
							<div className="text-center space-y-2">
								<Warehouse className="h-8 w-8 mx-auto text-gray-600" />
								<p className="font-medium">Stock Control</p>
								<p className="text-sm text-gray-600">
									Monitor inventory levels
								</p>
							</div>
						</Link>

						<Link
							href="/app/admin/orders"
							className="flex items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary hover:bg-primary/5 transition-colors"
						>
							<div className="text-center space-y-2">
								<ShoppingCart className="h-8 w-8 mx-auto text-gray-600" />
								<p className="font-medium">Process Orders</p>
								<p className="text-sm text-gray-600">
									Handle pending orders
								</p>
							</div>
						</Link>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
