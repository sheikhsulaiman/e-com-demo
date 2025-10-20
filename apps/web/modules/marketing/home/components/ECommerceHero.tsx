"use client";

import { Button } from "@ui/components/button";
import { Badge } from "@ui/components/badge";
import { ArrowRight, ShoppingBag, Star, Truck } from "lucide-react";
import Link from "next/link";

export function ECommerceHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-20">
      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Content */}
          <div className="space-y-8">
            {/* Badge */}
            <Badge className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2">
              <Star className="h-4 w-4" />
              #1 E-commerce Platform
            </Badge>

            {/* Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Discover Amazing
                <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Products Online
                </span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                Shop from thousands of premium products with fast delivery, 
                secure payments, and unbeatable prices. Your shopping journey starts here.
              </p>
            </div>

            {/* Statistics */}
            <div className="flex flex-wrap gap-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">10K+</div>
                <div className="text-sm text-gray-600">Products</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">50K+</div>
                <div className="text-sm text-gray-600">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">99%</div>
                <div className="text-sm text-gray-600">Satisfaction Rate</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <Link href="/store" className="inline-flex items-center gap-2">
                  <ShoppingBag className="h-5 w-5" />
                  Start Shopping
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/categories" className="inline-flex items-center gap-2">
                  Browse Categories
                </Link>
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap items-center gap-6 pt-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Truck className="h-4 w-4 text-green-600" />
                Free shipping over $50
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Star className="h-4 w-4 text-yellow-500" />
                4.9/5 customer rating
              </div>
            </div>
          </div>

          {/* Right side - Hero Image */}
          <div className="relative">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-3xl transform rotate-6"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-3xl transform -rotate-6"></div>
            
            {/* Main image container */}
            <div className="relative bg-white rounded-3xl shadow-2xl p-8">
              <div className="grid grid-cols-2 gap-4">
                {/* Product showcase */}
                <div className="space-y-4">
                  <div className="bg-gray-100 rounded-xl aspect-square flex items-center justify-center">
                    <ShoppingBag className="h-12 w-12 text-gray-400" />
                  </div>
                  <div className="space-y-2">
                    <div className="h-3 bg-gray-200 rounded"></div>
                    <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-blue-200 rounded w-1/2"></div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-gray-100 rounded-xl aspect-square flex items-center justify-center">
                    <Star className="h-12 w-12 text-gray-400" />
                  </div>
                  <div className="space-y-2">
                    <div className="h-3 bg-gray-200 rounded"></div>
                    <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-purple-200 rounded w-1/2"></div>
                  </div>
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                Best Seller
              </div>
              <div className="absolute -bottom-4 -left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                50% Off
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}