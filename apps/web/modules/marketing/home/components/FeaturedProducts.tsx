"use client";

import { Button } from "@ui/components/button";
import { Badge } from "@ui/components/badge";
import { Card, CardContent, CardFooter } from "@ui/components/card";
import { Star, Heart, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function FeaturedProducts() {
  const [wishlist, setWishlist] = useState<string[]>([]);

  const featuredProducts = [
    {
      id: "1",
      name: "Premium Wireless Headphones",
      description: "High-quality wireless headphones with noise cancellation",
      price: 29999,
      originalPrice: 39999,
      rating: 4.8,
      reviewCount: 128,
      image: "/api/placeholder/300/300",
      badge: "Best Seller",
      category: "Electronics"
    },
    {
      id: "2",
      name: "Smart Fitness Watch",
      description: "Track your health and fitness with this advanced smartwatch",
      price: 19999,
      originalPrice: 24999,
      rating: 4.6,
      reviewCount: 89,
      image: "/api/placeholder/300/300",
      badge: "New",
      category: "Electronics"
    },
    {
      id: "3",
      name: "Ergonomic Office Chair",
      description: "Comfortable office chair designed for long work sessions",
      price: 45999,
      originalPrice: 59999,
      rating: 4.7,
      reviewCount: 156,
      image: "/api/placeholder/300/300",
      badge: "Hot Deal",
      category: "Furniture"
    },
    {
      id: "4",
      name: "Organic Cotton T-Shirt",
      description: "Eco-friendly and comfortable cotton t-shirt",
      price: 2999,
      originalPrice: 3999,
      rating: 4.5,
      reviewCount: 234,
      image: "/api/placeholder/300/300",
      badge: "Eco-Friendly",
      category: "Fashion"
    },
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price / 100);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating)
            ? "fill-yellow-400 text-yellow-400"
            : "text-gray-300"
        }`}
      />
    ));
  };

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Featured Products
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Handpicked products that our customers love the most
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {featuredProducts.map((product) => (
            <Card key={product.id} className="group hover:shadow-xl transition-all duration-300">
              <div className="relative overflow-hidden">
                <div className="aspect-square bg-gray-100 flex items-center justify-center">
                  <div className="text-gray-400 text-4xl font-light">
                    {product.category.charAt(0)}
                  </div>
                </div>
                
                {product.badge && (
                  <Badge 
                    className={`absolute top-3 left-3 ${
                      product.badge === 'Best Seller' ? 'bg-green-500' :
                      product.badge === 'New' ? 'bg-blue-500' :
                      product.badge === 'Hot Deal' ? 'bg-red-500' :
                      'bg-purple-500'
                    } text-white`}
                  >
                    {product.badge}
                  </Badge>
                )}
                
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 hover:bg-white"
                  onClick={() => toggleWishlist(product.id)}
                >
                  <Heart 
                    className={`h-4 w-4 ${
                      wishlist.includes(product.id) 
                        ? 'fill-red-500 text-red-500' 
                        : 'text-gray-600'
                    }`} 
                  />
                </Button>
              </div>

              <CardContent className="p-4">
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg leading-tight line-clamp-2">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {product.description}
                  </p>
                  
                  <div className="flex items-center gap-1">
                    {renderStars(product.rating)}
                    <span className="text-sm text-gray-500 ml-1">
                      ({product.reviewCount})
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-gray-900">
                      {formatPrice(product.price)}
                    </span>
                    {product.originalPrice > product.price && (
                      <span className="text-sm text-gray-500 line-through">
                        {formatPrice(product.originalPrice)}
                      </span>
                    )}
                  </div>
                </div>
              </CardContent>

              <CardFooter className="p-4 pt-0">
                <Button asChild className="w-full">
                  <Link href={`/store/${product.id}`}>
                    View Product
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button asChild variant="outline" size="lg">
            <Link href="/store" className="inline-flex items-center gap-2">
              View All Products
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}