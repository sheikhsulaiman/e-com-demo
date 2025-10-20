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
const mockCategories = [
	{
		id: "1",
		name: "Electronics",
		slug: "electronics",
		description: "Electronic devices and accessories",
		productCount: 24,
		isActive: true,
		parent: null,
	},
	{
		id: "2",
		name: "Smartphones",
		slug: "smartphones",
		description: "Mobile phones and accessories",
		productCount: 12,
		isActive: true,
		parent: "Electronics",
	},
	{
		id: "3",
		name: "Lifestyle",
		slug: "lifestyle",
		description: "Lifestyle and wellness products",
		productCount: 18,
		isActive: true,
		parent: null,
	},
	{
		id: "4",
		name: "Clothing",
		slug: "clothing",
		description: "Apparel and fashion items",
		productCount: 45,
		isActive: true,
		parent: null,
	},
	{
		id: "5",
		name: "Books",
		slug: "books",
		description: "Books and educational materials",
		productCount: 8,
		isActive: false,
		parent: null,
	},
];

export default function CategoriesPage() {
	const [searchTerm, setSearchTerm] = useState("");
	const [categories] = useState(mockCategories);

	const filteredCategories = categories.filter(
		(category) =>
			category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			category.description
				?.toLowerCase()
				.includes(searchTerm.toLowerCase()),
	);

	return (
		<div className="space-y-6">
			{/* Header */}
			<div className="flex justify-between items-center">
				<div>
					<h1 className="text-3xl font-semibold">Categories</h1>
					<p className="text-muted-foreground">
						Organize your products into categories
					</p>
				</div>
				<Button asChild>
					<Link href="/app/admin/categories/new">
						<Plus className="w-4 h-4 mr-2" />
						Add Category
					</Link>
				</Button>
			</div>

			{/* Stats Cards */}
			<div className="grid gap-4 md:grid-cols-4">
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Total Categories
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{categories.length}
						</div>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Active Categories
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{categories.filter((c) => c.isActive).length}
						</div>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Parent Categories
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{categories.filter((c) => !c.parent).length}
						</div>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Subcategories
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{categories.filter((c) => c.parent).length}
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
							placeholder="Search categories..."
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className="pl-10"
						/>
					</div>
				</CardHeader>
				<CardContent>
					{/* Categories Table */}
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Category Name</TableHead>
								<TableHead>Parent Category</TableHead>
								<TableHead>Description</TableHead>
								<TableHead>Products</TableHead>
								<TableHead>Status</TableHead>
								<TableHead className="w-12" />
							</TableRow>
						</TableHeader>
						<TableBody>
							{filteredCategories.map((category) => (
								<TableRow key={category.id}>
									<TableCell>
										<div>
											<div className="font-medium">
												{category.name}
											</div>
											<div className="text-sm text-muted-foreground font-mono">
												/{category.slug}
											</div>
										</div>
									</TableCell>
									<TableCell>
										{category.parent ? (
											<Badge status="info">
												{category.parent}
											</Badge>
										) : (
											<span className="text-muted-foreground">
												Root category
											</span>
										)}
									</TableCell>
									<TableCell className="max-w-xs">
										<p className="truncate">
											{category.description}
										</p>
									</TableCell>
									<TableCell>
										<span className="font-medium">
											{category.productCount}
										</span>
										<span className="text-muted-foreground">
											{" "}
											products
										</span>
									</TableCell>
									<TableCell>
										<Badge
											status={
												category.isActive
													? "success"
													: "error"
											}
										>
											{category.isActive
												? "Active"
												: "Inactive"}
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
														href={`/app/admin/categories/${category.id}`}
													>
														View Details
													</Link>
												</DropdownMenuItem>
												<DropdownMenuItem asChild>
													<Link
														href={`/app/admin/categories/${category.id}/edit`}
													>
														Edit Category
													</Link>
												</DropdownMenuItem>
												<DropdownMenuItem className="text-red-600">
													Delete Category
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
