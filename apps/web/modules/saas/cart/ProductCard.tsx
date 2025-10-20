"use client";

import { Badge } from "@ui/components/badge";
import { Button } from "@ui/components/button";
import { Card, CardContent, CardFooter } from "@ui/components/card";
import { cn } from "@ui/lib";
import { Heart, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AddToCartButton } from "./AddToCartButton";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: {
    id: string;
    name: string;
  };
  status: "ACTIVE" | "INACTIVE" | "DRAFT";
  stock: number;
  rating?: number;
  reviewCount?: number;
  createdAt: string;
  updatedAt: string;
}

interface ProductCardProps {
  product: Product;
  className?: string;
  showQuickActions?: boolean;
  layout?: "grid" | "list";
}

export function ProductCard({ 
  product, 
  className,
  showQuickActions = true,
  layout = "grid"
}: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const isOutOfStock = product.stock === 0;
  const isInactive = product.status !== "ACTIVE";

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
        className={cn(
          "h-3 w-3",
          i < Math.floor(rating)
            ? "fill-yellow-400 text-yellow-400"
            : "text-gray-300"
        )}
      />
    ));
  };

  if (layout === "list") {
    return (
      <Card className={cn("overflow-hidden", className)}>
        <div className="flex">
          <div className="relative w-48 h-32 flex-shrink-0">
            <Image
              src={product.images[0] || "/placeholder-product.jpg"}
              alt={product.name}
              fill
              className="object-cover"
            />
            {isOutOfStock && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <Badge status="error" className="text-white">
                  Out of Stock
                </Badge>
              </div>
            )}
          </div>
          
          <CardContent className="flex-1 p-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <Badge className="mb-2">
                  {product.category.name}
                </Badge>
                <Link 
                  href={`/products/${product.id}`}
                  className="block hover:underline"
                >
                  <h3 className="font-semibold text-lg line-clamp-1">
                    {product.name}
                  </h3>
                </Link>
              </div>
              {showQuickActions && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className="flex-shrink-0"
                >
                  <Heart
                    className={cn(
                      "h-4 w-4",
                      isWishlisted && "fill-red-500 text-red-500"
                    )}
                  />
                </Button>
              )}
            </div>
            
            <p className="text-sm text-gray-600 line-clamp-2 mb-3">
              {product.description}
            </p>
            
            <div className="flex items-center gap-2 mb-3">
              {product.rating && (
                <>
                  <div className="flex items-center gap-1">
                    {renderStars(product.rating)}
                  </div>
                  <span className="text-sm text-gray-500">
                    ({product.reviewCount || 0})
                  </span>
                </>
              )}
            </div>
            
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">
                {formatPrice(product.price)}
              </div>
              <div className="text-sm text-gray-500">
                Stock: {product.stock}
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="p-4 pt-0 w-48 flex-shrink-0">
            <AddToCartButton
              productId={product.id}
              disabled={isOutOfStock || isInactive}
              className="w-full"
            />
          </CardFooter>
        </div>
      </Card>
    );
  }

  return (
    <Card className={cn("overflow-hidden group", className)}>
      <div className="relative aspect-square">
        <Image
          src={product.images[0] || "/placeholder-product.jpg"}
          alt={product.name}
          fill
          className="object-cover transition-transform group-hover:scale-105"
        />
        {isOutOfStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <Badge status="error" className="text-white">
              Out of Stock
            </Badge>
          </div>
        )}
        {showQuickActions && (
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              variant="secondary"
              size="icon"
              onClick={() => setIsWishlisted(!isWishlisted)}
              className="rounded-full shadow-lg"
            >
              <Heart
                className={cn(
                  "h-4 w-4",
                  isWishlisted && "fill-red-500 text-red-500"
                )}
              />
            </Button>
          </div>
        )}
      </div>
      
      <CardContent className="p-4">
        <Badge className="mb-2">
          {product.category.name}
        </Badge>
        
        <Link 
          href={`/products/${product.id}`}
          className="block hover:underline"
        >
          <h3 className="font-semibold line-clamp-2 mb-2">
            {product.name}
          </h3>
        </Link>
        
        <p className="text-sm text-gray-600 line-clamp-2 mb-3">
          {product.description}
        </p>
        
        {product.rating && (
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-1">
              {renderStars(product.rating)}
            </div>
            <span className="text-sm text-gray-500">
              ({product.reviewCount || 0})
            </span>
          </div>
        )}
        
        <div className="flex items-center justify-between mb-3">
          <div className="text-xl font-bold">
            {formatPrice(product.price)}
          </div>
          <div className="text-sm text-gray-500">
            Stock: {product.stock}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <AddToCartButton
          productId={product.id}
          disabled={isOutOfStock || isInactive}
          className="w-full"
        />
      </CardFooter>
    </Card>
  );
}

// Grid of product cards
export function ProductGrid({ 
  products, 
  className 
}: { 
  products: Product[]; 
  className?: string; 
}) {
  return (
    <div className={cn(
      "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6",
      className
    )}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

// List of product cards
export function ProductList({ 
  products, 
  className 
}: { 
  products: Product[]; 
  className?: string; 
}) {
  return (
    <div className={cn("space-y-4", className)}>
      {products.map((product) => (
        <ProductCard 
          key={product.id} 
          product={product} 
          layout="list"
        />
      ))}
    </div>
  );
}