"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@ui/components/card";
import { Badge } from "@ui/components/badge";
import { Button } from "@ui/components/button";
import { Input } from "@ui/components/input";
import { Search, ShoppingBag, ArrowRight } from "lucide-react";
import Link from "next/link";

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  productCount: number;
  featured: boolean;
}

const mockCategories: Category[] = [
  {
    id: "electronics",
    name: "Electronics",
    slug: "electronics",
    description: "Latest electronic devices and gadgets",
    image: "/api/placeholder/300/200",
    productCount: 2,
    featured: true,
  },
  {
    id: "fashion",
    name: "Fashion",
    slug: "fashion", 
    description: "Trendy clothing and accessories",
    image: "/api/placeholder/300/200",
    productCount: 1,
    featured: true,
  },
  {
    id: "home-garden",
    name: "Home & Garden",
    slug: "home-garden",
    description: "Everything for your home and garden",
    image: "/api/placeholder/300/200",
    productCount: 1,
    featured: false,
  },
  {
    id: "sports-fitness",
    name: "Sports & Fitness",
    slug: "sports-fitness",
    description: "Sports equipment and fitness gear",
    image: "/api/placeholder/300/200",
    productCount: 1,
    featured: false,
  },
  {
    id: "books-media",
    name: "Books & Media",
    slug: "books-media",
    description: "Books, movies, and digital media",
    image: "/api/placeholder/300/200",
    productCount: 0,
    featured: false,
  },
  {
    id: "toys-games",
    name: "Toys & Games",
    slug: "toys-games",
    description: "Fun toys and engaging games for all ages",
    image: "/api/placeholder/300/200",
    productCount: 0,
    featured: false,
  },
];

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>(mockCategories);
  const [filteredCategories, setFilteredCategories] = useState<Category[]>(mockCategories);
  const [searchTerm, setSearchTerm] = useState("");

  // Filter categories based on search
  useEffect(() => {
    let filtered = [...categories];

    if (searchTerm) {
      filtered = filtered.filter(
        (category) =>
          category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          category.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredCategories(filtered);
  }, [categories, searchTerm]);

  const featuredCategories = filteredCategories.filter(cat => cat.featured);
  const regularCategories = filteredCategories.filter(cat => !cat.featured);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Shop by Category
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Discover products organized by category to find exactly what you're looking for
            </p>
            
            {/* Search */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 py-3 text-lg"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Featured Categories */}
        {featuredCategories.length > 0 && (
          <section className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900">
                Featured Categories
              </h2>
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                Popular
              </Badge>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredCategories.map((category) => (
                <Link key={category.id} href={`/store?category=${category.slug}`}>
                  <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                    <CardContent className="p-0">
                      {/* Category Image */}
                      <div className="relative aspect-[3/2] overflow-hidden rounded-t-lg">
                        <img
                          src={category.image}
                          alt={category.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
                        <Badge className="absolute top-3 left-3 bg-white text-gray-900">
                          Featured
                        </Badge>
                        <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <ArrowRight className="h-4 w-4 text-gray-900" />
                        </div>
                      </div>
                      
                      {/* Category Info */}
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                            {category.name}
                          </h3>
                          <div className="flex items-center text-sm text-gray-500">
                            <ShoppingBag className="h-4 w-4 mr-1" />
                            {category.productCount} item{category.productCount !== 1 ? 's' : ''}
                          </div>
                        </div>
                        
                        <p className="text-gray-600 mb-4 line-clamp-2">
                          {category.description}
                        </p>
                        
                        <Button variant="outline" className="w-full group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-colors">
                          Browse {category.name}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* All Categories */}
        {regularCategories.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900">
                All Categories
              </h2>
              <p className="text-gray-600">
                {filteredCategories.length} categor{filteredCategories.length !== 1 ? 'ies' : 'y'} available
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {regularCategories.map((category) => (
                <Link key={category.id} href={`/store?category=${category.slug}`}>
                  <Card className="group hover:shadow-lg transition-all duration-200">
                    <CardContent className="p-0">
                      {/* Category Image */}
                      <div className="relative aspect-[4/3] overflow-hidden rounded-t-lg">
                        <img
                          src={category.image}
                          alt={category.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                        />
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
                      </div>
                      
                      {/* Category Info */}
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                            {category.name}
                          </h3>
                          <span className="text-sm text-gray-500">
                            {category.productCount}
                          </span>
                        </div>
                        
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {category.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* No Results */}
        {filteredCategories.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <Search className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No categories found
            </h3>
            <p className="text-gray-600 mb-6">
              We couldn't find any categories matching "{searchTerm}"
            </p>
            <Button onClick={() => setSearchTerm("")} variant="outline">
              Clear Search
            </Button>
          </div>
        )}

        {/* Browse All Products CTA */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Can't find what you're looking for?
            </h3>
            <p className="text-blue-100 mb-6 max-w-md mx-auto">
              Browse our complete product catalog or use our advanced search filters
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg" asChild>
                <Link href="/store">
                  Browse All Products
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600">
                Advanced Search
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}