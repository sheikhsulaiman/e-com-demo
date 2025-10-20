"use client";

import { useState } from "react";
import { Badge } from "@ui/components/badge";
import { Button } from "@ui/components/button";
import { Card, CardContent, CardHeader, CardTitle } from "@ui/components/card";
import { Input } from "@ui/components/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@ui/components/select";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@ui/components/table";
import {
	AlertTriangle,
	Plus,
	Minus,
	Package,
	TrendingUp,
	TrendingDown,
	Search,
	Download,
	RefreshCw,
} from "lucide-react";

// Mock data for demonstration
const mockInventoryData = [
	{
		id: "1",
		name: "Premium Wireless Headphones",
		sku: "WH-001",
		currentStock: 45,
		lowStockAlert: 10,
		reservedStock: 5,
		availableStock: 40,
		costPrice: 150.00,
		status: "In Stock",
		lastRestocked: "2025-10-15",
		category: "Electronics",
	},
	{
		id: "2",
		name: "Smart Fitness Tracker",
		sku: "FT-002",
		currentStock: 8,
		lowStockAlert: 10,
		reservedStock: 2,
		availableStock: 6,
		costPrice: 80.00,
		status: "Low Stock",
		lastRestocked: "2025-10-10",
		category: "Electronics",
	},
	{
		id: "3",
		name: "Ergonomic Office Chair",
		sku: "OC-003",
		currentStock: 0,
		lowStockAlert: 5,
		reservedStock: 0,
		availableStock: 0,
		costPrice: 200.00,
		status: "Out of Stock",
		lastRestocked: "2025-09-28",
		category: "Furniture",
	},
	{
		id: "4",
		name: "Organic Cotton T-Shirt",
		sku: "TS-004",
		currentStock: 95,
		lowStockAlert: 20,
		reservedStock: 10,
		availableStock: 85,
		costPrice: 15.00,
		status: "In Stock",
		lastRestocked: "2025-10-18",
		category: "Fashion",
	},
	{
		id: "5",
		name: "Premium Yoga Mat",
		sku: "YM-006",
		currentStock: 22,
		lowStockAlert: 15,
		reservedStock: 3,
		availableStock: 19,
		costPrice: 25.00,
		status: "In Stock",
		lastRestocked: "2025-10-12",
		category: "Sports",
	},
];

const mockStockMovements = [
	{
		id: "1",
		productName: "Premium Wireless Headphones",
		type: "IN",
		quantity: 50,
		reason: "Purchase Order #PO-001",
		date: "2025-10-15",
		reference: "PO-001",
	},
	{
		id: "2",
		productName: "Smart Fitness Tracker",
		type: "OUT",
		quantity: -12,
		reason: "Sale Order #SO-145",
		date: "2025-10-14",
		reference: "SO-145",
	},
	{
		id: "3",
		productName: "Organic Cotton T-Shirt",
		type: "IN",
		quantity: 100,
		reason: "Purchase Order #PO-002",
		date: "2025-10-18",
		reference: "PO-002",
	},
	{
		id: "4",
		productName: "Ergonomic Office Chair",
		type: "OUT",
		quantity: -15,
		reason: "Sale Order #SO-146",
		date: "2025-10-13",
		reference: "SO-146",
	},
	{
		id: "5",
		productName: "Premium Yoga Mat",
		type: "ADJUSTMENT",
		quantity: -3,
		reason: "Damaged inventory adjustment",
		date: "2025-10-12",
		reference: "ADJ-001",
	},
];

export default function InventoryPage() {
	const [searchTerm, setSearchTerm] = useState("");
	const [statusFilter, setStatusFilter] = useState("all");
	const [categoryFilter, setCategoryFilter] = useState("all");
	const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
	const [adjustmentQuantity, setAdjustmentQuantity] = useState("");
	const [adjustmentReason, setAdjustmentReason] = useState("");

	// Calculate summary stats
	const totalProducts = mockInventoryData.length;
	const lowStockItems = mockInventoryData.filter(item => 
		item.currentStock <= item.lowStockAlert && item.currentStock > 0
	).length;
	const outOfStockItems = mockInventoryData.filter(item => 
		item.currentStock === 0
	).length;
	const totalValue = mockInventoryData.reduce((sum, item) => 
		sum + (item.currentStock * item.costPrice), 0
	);

	// Filter data
	const filteredData = mockInventoryData.filter(item => {
		const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			item.sku.toLowerCase().includes(searchTerm.toLowerCase());
		const matchesStatus = statusFilter === "all" || item.status.toLowerCase().replace(" ", "") === statusFilter;
		const matchesCategory = categoryFilter === "all" || item.category === categoryFilter;
		
		return matchesSearch && matchesStatus && matchesCategory;
	});

	const getStatusBadge = (status: string) => {
		switch (status) {
			case "In Stock":
				return <Badge status="success">{status}</Badge>;
			case "Low Stock":
				return <Badge status="warning">{status}</Badge>;
			case "Out of Stock":
				return <Badge status="error">{status}</Badge>;
			default:
				return <Badge status="secondary">{status}</Badge>;
		}
	};

	const getMovementIcon = (type: string) => {
		switch (type) {
			case "IN":
				return <TrendingUp className="h-4 w-4 text-green-600" />;
			case "OUT":
				return <TrendingDown className="h-4 w-4 text-red-600" />;
			case "ADJUSTMENT":
				return <RefreshCw className="h-4 w-4 text-blue-600" />;
			default:
				return <Package className="h-4 w-4 text-gray-600" />;
		}
	};

	return (
		<div className="space-y-6">
			{/* Header */}
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-3xl font-bold text-gray-900">Inventory Management</h1>
					<p className="text-gray-600 mt-2">
						Track and manage your product inventory levels
					</p>
				</div>
				<div className="flex gap-3">
					<Button variant="outline">
						<Download className="h-4 w-4 mr-2" />
						Export
					</Button>
					<Button>
						<Plus className="h-4 w-4 mr-2" />
						Stock Adjustment
					</Button>
				</div>
			</div>

			{/* Summary Cards */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
				<Card>
					<CardContent className="p-6">
						<div className="flex items-center">
							<Package className="h-8 w-8 text-blue-600" />
							<div className="ml-4">
								<p className="text-sm font-medium text-gray-600">Total Products</p>
								<p className="text-2xl font-bold text-gray-900">{totalProducts}</p>
							</div>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardContent className="p-6">
						<div className="flex items-center">
							<AlertTriangle className="h-8 w-8 text-yellow-600" />
							<div className="ml-4">
								<p className="text-sm font-medium text-gray-600">Low Stock</p>
								<p className="text-2xl font-bold text-gray-900">{lowStockItems}</p>
							</div>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardContent className="p-6">
						<div className="flex items-center">
							<TrendingDown className="h-8 w-8 text-red-600" />
							<div className="ml-4">
								<p className="text-sm font-medium text-gray-600">Out of Stock</p>
								<p className="text-2xl font-bold text-gray-900">{outOfStockItems}</p>
							</div>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardContent className="p-6">
						<div className="flex items-center">
							<TrendingUp className="h-8 w-8 text-green-600" />
							<div className="ml-4">
								<p className="text-sm font-medium text-gray-600">Total Value</p>
								<p className="text-2xl font-bold text-gray-900">
									${totalValue.toLocaleString()}
								</p>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Filters */}
			<Card>
				<CardContent className="p-6">
					<div className="flex flex-col md:flex-row gap-4">
						<div className="flex-1">
							<div className="relative">
								<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
								<Input
									placeholder="Search products or SKU..."
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
									className="pl-10"
								/>
							</div>
						</div>
						<Select value={statusFilter} onValueChange={setStatusFilter}>
							<SelectTrigger className="w-48">
								<SelectValue placeholder="Filter by status" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="all">All Status</SelectItem>
								<SelectItem value="instock">In Stock</SelectItem>
								<SelectItem value="lowstock">Low Stock</SelectItem>
								<SelectItem value="outofstock">Out of Stock</SelectItem>
							</SelectContent>
						</Select>
						<Select value={categoryFilter} onValueChange={setCategoryFilter}>
							<SelectTrigger className="w-48">
								<SelectValue placeholder="Filter by category" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="all">All Categories</SelectItem>
								<SelectItem value="Electronics">Electronics</SelectItem>
								<SelectItem value="Fashion">Fashion</SelectItem>
								<SelectItem value="Furniture">Furniture</SelectItem>
								<SelectItem value="Sports">Sports</SelectItem>
							</SelectContent>
						</Select>
					</div>
				</CardContent>
			</Card>

			{/* Inventory Table */}
			<Card>
				<CardHeader>
					<CardTitle>Product Inventory</CardTitle>
				</CardHeader>
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Product</TableHead>
								<TableHead>SKU</TableHead>
								<TableHead>Current Stock</TableHead>
								<TableHead>Available</TableHead>
								<TableHead>Reserved</TableHead>
								<TableHead>Status</TableHead>
								<TableHead>Last Restocked</TableHead>
								<TableHead>Actions</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{filteredData.map((item) => (
								<TableRow key={item.id}>
									<TableCell>
										<div>
											<div className="font-medium">{item.name}</div>
											<div className="text-sm text-gray-500">{item.category}</div>
										</div>
									</TableCell>
									<TableCell className="font-mono text-sm">{item.sku}</TableCell>
									<TableCell>
										<div className="flex items-center gap-2">
											<span className="font-medium">{item.currentStock}</span>
											{item.currentStock <= item.lowStockAlert && item.currentStock > 0 && (
												<AlertTriangle className="h-4 w-4 text-yellow-500" />
											)}
										</div>
									</TableCell>
									<TableCell>{item.availableStock}</TableCell>
									<TableCell>{item.reservedStock}</TableCell>
									<TableCell>{getStatusBadge(item.status)}</TableCell>
									<TableCell>{item.lastRestocked}</TableCell>
									<TableCell>
										<div className="flex gap-2">
											<Button variant="outline" size="sm">
												<Plus className="h-3 w-3" />
											</Button>
											<Button variant="outline" size="sm">
												<Minus className="h-3 w-3" />
											</Button>
										</div>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</CardContent>
			</Card>

			{/* Recent Stock Movements */}
			<Card>
				<CardHeader>
					<CardTitle>Recent Stock Movements</CardTitle>
				</CardHeader>
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Product</TableHead>
								<TableHead>Type</TableHead>
								<TableHead>Quantity</TableHead>
								<TableHead>Reason</TableHead>
								<TableHead>Date</TableHead>
								<TableHead>Reference</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{mockStockMovements.map((movement) => (
								<TableRow key={movement.id}>
									<TableCell className="font-medium">{movement.productName}</TableCell>
									<TableCell>
										<div className="flex items-center gap-2">
											{getMovementIcon(movement.type)}
											<span className="text-sm">{movement.type}</span>
										</div>
									</TableCell>
									<TableCell>
										<span className={`font-medium ${
											movement.quantity > 0 ? 'text-green-600' : 'text-red-600'
										}`}>
											{movement.quantity > 0 ? '+' : ''}{movement.quantity}
										</span>
									</TableCell>
									<TableCell>{movement.reason}</TableCell>
									<TableCell>{movement.date}</TableCell>
									<TableCell className="font-mono text-sm">{movement.reference}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</CardContent>
			</Card>
		</div>
	);
}