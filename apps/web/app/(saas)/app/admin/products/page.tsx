"use client";

import { Badge } from "@ui/components/badge";
import { Button } from "@ui/components/button";
import { Card, CardContent, CardHeader, CardTitle } from "@ui/components/card";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@ui/components/dropdown-menu";
import { Input } from "@ui/components/input";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@ui/components/table";
import { MoreHorizontal, Plus, Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

// Mock data - in real app, this would come from your API
const mockProducts = [
	{
		id: "1",
		name: "Premium Wireless Headphones",
		sku: "PWH-001",
		price: 199.99,
		quantity: 45,
		status: "ACTIVE",
		category: "Electronics",
		images: ["/images/headphones.jpg"],
	},
	{
		id: "2",
		name: "Eco-Friendly Water Bottle",
		sku: "EWB-002",
		price: 24.99,
		quantity: 2,
		status: "OUT_OF_STOCK",
		category: "Lifestyle",
		images: ["/images/bottle.jpg"],
	},
	{
		id: "3",
		name: "Organic Cotton T-Shirt",
		sku: "OCT-003",
		price: 39.99,
		quantity: 128,
		status: "ACTIVE",
		category: "Clothing",
		images: ["/images/tshirt.jpg"],
	},
];

const statusColors = {
	ACTIVE: "bg-green-100 text-green-800",
	INACTIVE: "bg-gray-100 text-gray-800",
	DRAFT: "bg-yellow-100 text-yellow-800",
	OUT_OF_STOCK: "bg-red-100 text-red-800",
};

export default function ProductsPage() {
	const [searchTerm, setSearchTerm] = useState("");
	const [products] = useState(mockProducts);

	const filteredProducts = products.filter(
		(product) =>
			product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			product.sku.toLowerCase().includes(searchTerm.toLowerCase()),
	);

	return (
		<div className="space-y-6">
			{/* Header */}
			<div className="flex justify-between items-center">
				<div>
					<h1 className="text-3xl font-semibold">Products</h1>
					<p className="text-muted-foreground">
						Manage your product catalog and inventory
					</p>
				</div>
				<Button asChild>
					<Link href="/app/admin/products/new">
						<Plus className="w-4 h-4 mr-2" />
						Add Product
					</Link>
				</Button>
			</div>

			{/* Stats Cards */}
			<div className="grid gap-4 md:grid-cols-4">
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Total Products
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{products.length}
						</div>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Active Products
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{
								products.filter((p) => p.status === "ACTIVE")
									.length
							}
						</div>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Low Stock
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{products.filter((p) => p.quantity < 10).length}
						</div>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Out of Stock
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{
								products.filter(
									(p) => p.status === "OUT_OF_STOCK",
								).length
							}
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Search and Filters */}
			<Card>
				<CardHeader>
					<div className="relative">
						<Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
						<Input
							placeholder="Search products..."
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className="pl-10"
						/>
					</div>
				</CardHeader>
				<CardContent>
					{/* Products Table */}
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Product</TableHead>
								<TableHead>SKU</TableHead>
								<TableHead>Category</TableHead>
								<TableHead>Price</TableHead>
								<TableHead>Quantity</TableHead>
								<TableHead>Status</TableHead>
								<TableHead className="w-12" />
							</TableRow>
						</TableHeader>
						<TableBody>
							{filteredProducts.map((product) => (
								<TableRow key={product.id}>
									<TableCell>
										<div className="flex items-center space-x-3">
											<div className="w-10 h-10 bg-gray-100 rounded-md flex-shrink-0" />
											<div className="font-medium">
												{product.name}
											</div>
										</div>
									</TableCell>
									<TableCell className="font-mono text-sm">
										{product.sku}
									</TableCell>
									<TableCell>{product.category}</TableCell>
									<TableCell>${product.price}</TableCell>
									<TableCell>
										<span
											className={
												product.quantity < 10
													? "text-red-600 font-medium"
													: ""
											}
										>
											{product.quantity}
										</span>
									</TableCell>
									<TableCell>
										<Badge
											status="info"
											className={
												statusColors[
													product.status as keyof typeof statusColors
												]
											}
										>
											{product.status.replace("_", " ")}
										</Badge>
									</TableCell>
									<TableCell>
										<DropdownMenu>
											<DropdownMenuTrigger asChild>
												<Button
													variant="ghost"
													className="w-8 h-8 p-0"
												>
													<MoreHorizontal className="w-4 h-4" />
												</Button>
											</DropdownMenuTrigger>
											<DropdownMenuContent align="end">
												<DropdownMenuItem asChild>
													<Link
														href={`/app/admin/products/${product.id}`}
													>
														View Details
													</Link>
												</DropdownMenuItem>
												<DropdownMenuItem asChild>
													<Link
														href={`/app/admin/products/${product.id}/edit`}
													>
														Edit Product
													</Link>
												</DropdownMenuItem>
												<DropdownMenuItem className="text-red-600">
													Delete Product
												</DropdownMenuItem>
											</DropdownMenuContent>
										</DropdownMenu>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</CardContent>
			</Card>
		</div>
	);
}
