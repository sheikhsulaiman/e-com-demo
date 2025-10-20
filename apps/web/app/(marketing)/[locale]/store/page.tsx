"use client";

import { useState, useEffect } from "react";
import { Input } from "@ui/components/input";
import { Button } from "@ui/components/button";
import { Badge } from "@ui/components/badge";
import { Card, CardContent } from "@ui/components/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@ui/components/select";
import { Label } from "@ui/components/label";
import {
  Filter,
  Grid3X3,
  List,
  Search,
  Star,
  Heart,
  ShoppingCart,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";
import { useCart } from "../../../../modules/saas/cart/CartContext";

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  comparePrice?: number;
  images: string[];
  categoryId: string;
  category: {
    name: string;
    slug: string;
  };
  featured: boolean;
  quantity: number;
}

const mockProducts: Product[] = [
  {
    id: "1",
    name: "Premium Wireless Headphones",
    slug: "premium-wireless-headphones",
    price: 299.99,
    comparePrice: 399.99,
    images: ["/api/placeholder/400/400"],
    categoryId: "electronics",
    category: { name: "Electronics", slug: "electronics" },
    featured: true,
    quantity: 50,
  },
  {
    id: "2",
    name: "Smart Fitness Tracker",
    slug: "smart-fitness-tracker",
    price: 199.99,
    comparePrice: 249.99,
    images: ["/api/placeholder/400/400"],
    categoryId: "electronics",
    category: { name: "Electronics", slug: "electronics" },
    featured: false,
    quantity: 30,
  },
  {
    id: "3",
    name: "Ergonomic Office Chair",
    slug: "ergonomic-office-chair",
    price: 459.99,
    comparePrice: 599.99,
    images: ["/api/placeholder/400/400"],
    categoryId: "home-garden",
    category: { name: "Home & Garden", slug: "home-garden" },
    featured: true,
    quantity: 15,
  },
  {
    id: "4",
    name: "Organic Cotton T-Shirt",
    slug: "organic-cotton-t-shirt",
    price: 29.99,
    comparePrice: 39.99,
    images: ["/api/placeholder/400/400"],
    categoryId: "fashion",
    category: { name: "Fashion", slug: "fashion" },
    featured: false,
    quantity: 100,
  },
  {
    id: "5",
    name: "Premium Yoga Mat",
    slug: "yoga-mat-premium",
    price: 79.99,
    comparePrice: 99.99,
    images: ["/api/placeholder/400/400"],
    categoryId: "sports-fitness",
    category: { name: "Sports & Fitness", slug: "sports-fitness" },
    featured: false,
    quantity: 45,
  },
];

const categories = [
  { id: "electronics", name: "Electronics", count: 2 },
  { id: "fashion", name: "Fashion", count: 1 },
  { id: "home-garden", name: "Home & Garden", count: 1 },
  { id: "sports-fitness", name: "Sports & Fitness", count: 1 },
];

export default function StorePage() {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(mockProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [sortBy, setSortBy] = useState("featured");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const { addToCart } = useCart();

  // Filter and sort products
  useEffect(() => {
    let filtered = [...products];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.category.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((product) =>
        selectedCategories.includes(product.categoryId)
      );
    }

    // Price filter
    filtered = filtered.filter(
      (product) =>
        product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Sort products
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "featured":
      default:
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }

    setFilteredProducts(filtered);
  }, [products, searchTerm, selectedCategories, priceRange, sortBy]);

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, categoryId]);
    } else {
      setSelectedCategories(selectedCategories.filter((id) => id !== categoryId));
    }
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setPriceRange([0, 1000]);
    setSearchTerm("");
    setSortBy("featured");
  };

  const handleAddToCart = async (product: Product) => {
    try {
      await addToCart(product.id, 1);
    } catch (error) {
      console.error("Failed to add product to cart:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Shop</h1>
              <p className="text-gray-600 mt-2">
                Discover our complete collection of products
              </p>
            </div>
            
            {/* Search and View Controls */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === "grid" ? "primary" : "outline"}
                  size="icon"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "primary" : "outline"}
                  size="icon"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-64 space-y-6">
            {/* Mobile Filter Toggle */}
            <div className="lg:hidden">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="w-full justify-between"
              >
                <span className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  Filters
                </span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${
                    showFilters ? "rotate-180" : ""
                  }`}
                />
              </Button>
            </div>

            {/* Filters */}
            <div className={`space-y-6 ${showFilters ? "block" : "hidden lg:block"}`}>
              {/* Categories */}
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-4">Categories</h3>
                  <div className="space-y-3">
                    {categories.map((category) => (
                      <div key={category.id} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={category.id}
                          checked={selectedCategories.includes(category.id)}
                          onChange={(e) =>
                            handleCategoryChange(category.id, e.target.checked)
                          }
                          className="rounded border border-gray-300"
                        />
                        <Label
                          htmlFor={category.id}
                          className="flex-1 text-sm font-normal cursor-pointer"
                        >
                          {category.name}
                        </Label>
                        <span className="text-xs text-gray-500">
                          ({category.count})
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Price Range */}
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-4">Price Range</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <Input
                        type="number"
                        placeholder="Min"
                        value={priceRange[0]}
                        onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                        className="w-20"
                        min="0"
                        max="1000"
                      />
                      <span className="text-gray-500">to</span>
                      <Input
                        type="number"
                        placeholder="Max"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                        className="w-20"
                        min="0"
                        max="1000"
                      />
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Clear Filters */}
              <Button variant="outline" onClick={clearFilters} className="w-full">
                Clear All Filters
              </Button>
            </div>
          </div>

          {/* Products */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600">
                Showing {filteredProducts.length} of {products.length} products
              </p>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="name">Name A-Z</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Products Grid */}
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                  : "space-y-4"
              }
            >
              {filteredProducts.map((product) => (
                <Card
                  key={product.id}
                  className={`group hover:shadow-lg transition-shadow ${
                    viewMode === "list" ? "flex flex-row" : ""
                  }`}
                >
                  <CardContent className={`p-0 ${viewMode === "list" ? "flex w-full" : ""}`}>
                    {/* Product Image */}
                    <div className={`relative ${viewMode === "list" ? "w-48 h-48" : "aspect-square"}`}>
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover rounded-t-lg group-hover:scale-105 transition-transform"
                      />
                      {product.featured && (
                        <Badge className="absolute top-2 left-2 bg-blue-600">
                          Featured
                        </Badge>
                      )}
                      {product.comparePrice && (
                        <Badge className="absolute top-2 right-2 bg-red-600">
                          Sale
                        </Badge>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white hover:bg-gray-100"
                      >
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Product Info */}
                    <div className={`p-4 ${viewMode === "list" ? "flex-1 flex flex-col justify-between" : ""}`}>
                      <div>
                        <Link
                          href={`/store/${product.slug}`}
                          className="font-semibold text-gray-900 hover:text-blue-600 line-clamp-2"
                        >
                          {product.name}
                        </Link>
                        <p className="text-sm text-gray-600 mt-1">
                          {product.category.name}
                        </p>
                        
                        {/* Rating */}
                        <div className="flex items-center gap-1 mt-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < 4
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                          <span className="text-sm text-gray-600 ml-1">(4.0)</span>
                        </div>
                      </div>

                      {/* Price and Actions */}
                      <div className="mt-4">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-lg font-bold text-gray-900">
                            ${product.price.toFixed(2)}
                          </span>
                          {product.comparePrice && (
                            <span className="text-sm text-gray-500 line-through">
                              ${product.comparePrice.toFixed(2)}
                            </span>
                          )}
                        </div>
                        
                        <Button
                          onClick={() => handleAddToCart(product)}
                          className="w-full"
                          disabled={product.quantity === 0}
                        >
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          {product.quantity === 0 ? "Out of Stock" : "Add to Cart"}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* No Results */}
            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No products found
                </h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your filters or search terms
                </p>
                <Button onClick={clearFilters}>Clear Filters</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}