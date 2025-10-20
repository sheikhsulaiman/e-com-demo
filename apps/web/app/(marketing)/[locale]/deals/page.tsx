"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@ui/components/card";
import { Badge } from "@ui/components/badge";
import { Button } from "@ui/components/button";
import { 
  Clock, 
  Star, 
  Heart, 
  ShoppingCart, 
  Flame,
  Tag,
  ArrowRight,
  Timer
} from "lucide-react";
import Link from "next/link";
import { useCart } from "../../../../modules/saas/cart/CartContext";

interface Deal {
  id: string;
  name: string;
  slug: string;
  originalPrice: number;
  salePrice: number;
  discount: number;
  images: string[];
  category: string;
  rating: number;
  reviewCount: number;
  endsAt: string;
  featured: boolean;
  limitedStock: boolean;
  stockRemaining?: number;
  dealType: "flash" | "daily" | "weekly" | "clearance";
}

const mockDeals: Deal[] = [
  {
    id: "1",
    name: "Premium Wireless Headphones",
    slug: "premium-wireless-headphones",
    originalPrice: 399.99,
    salePrice: 299.99,
    discount: 25,
    images: ["/api/placeholder/400/400"],
    category: "Electronics",
    rating: 4.8,
    reviewCount: 156,
    endsAt: "2025-10-25T23:59:59",
    featured: true,
    limitedStock: true,
    stockRemaining: 12,
    dealType: "flash",
  },
  {
    id: "2",
    name: "Smart Fitness Tracker",
    slug: "smart-fitness-tracker",
    originalPrice: 249.99,
    salePrice: 199.99,
    discount: 20,
    images: ["/api/placeholder/400/400"],
    category: "Electronics",
    rating: 4.5,
    reviewCount: 89,
    endsAt: "2025-10-26T23:59:59",
    featured: false,
    limitedStock: false,
    dealType: "daily",
  },
  {
    id: "3",
    name: "Ergonomic Office Chair",
    slug: "ergonomic-office-chair",
    originalPrice: 599.99,
    salePrice: 459.99,
    discount: 23,
    images: ["/api/placeholder/400/400"],
    category: "Home & Garden",
    rating: 4.7,
    reviewCount: 234,
    endsAt: "2025-10-30T23:59:59",
    featured: true,
    limitedStock: true,
    stockRemaining: 5,
    dealType: "weekly",
  },
  {
    id: "4",
    name: "Organic Cotton T-Shirt",
    slug: "organic-cotton-t-shirt",
    originalPrice: 39.99,
    salePrice: 29.99,
    discount: 25,
    images: ["/api/placeholder/400/400"],
    category: "Fashion",
    rating: 4.3,
    reviewCount: 67,
    endsAt: "2025-11-01T23:59:59",
    featured: false,
    limitedStock: false,
    dealType: "clearance",
  },
];

export default function DealsPage() {
  const [deals, setDeals] = useState<Deal[]>(mockDeals);
  const [timeRemaining, setTimeRemaining] = useState<Record<string, string>>({});
  const { addToCart } = useCart();

  // Calculate time remaining for each deal
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const times: Record<string, string> = {};

      deals.forEach((deal) => {
        const endTime = new Date(deal.endsAt).getTime();
        const difference = endTime - now;

        if (difference > 0) {
          const days = Math.floor(difference / (1000 * 60 * 60 * 24));
          const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((difference % (1000 * 60)) / 1000);

          if (days > 0) {
            times[deal.id] = `${days}d ${hours}h ${minutes}m`;
          } else {
            times[deal.id] = `${hours}h ${minutes}m ${seconds}s`;
          }
        } else {
          times[deal.id] = "Expired";
        }
      });

      setTimeRemaining(times);
    }, 1000);

    return () => clearInterval(interval);
  }, [deals]);

  const handleAddToCart = async (deal: Deal) => {
    try {
      await addToCart(deal.id, 1);
    } catch (error) {
      console.error("Failed to add deal to cart:", error);
    }
  };

  const getDealTypeIcon = (type: string) => {
    switch (type) {
      case "flash":
        return <Flame className="h-4 w-4" />;
      case "daily":
        return <Timer className="h-4 w-4" />;
      default:
        return <Tag className="h-4 w-4" />;
    }
  };

  const getDealTypeBadge = (type: string) => {
    switch (type) {
      case "flash":
        return "Flash Sale";
      case "daily":
        return "Daily Deal";
      case "weekly":
        return "Weekly Deal";
      case "clearance":
        return "Clearance";
      default:
        return "Special Offer";
    }
  };

  const featuredDeals = deals.filter(deal => deal.featured);
  const regularDeals = deals.filter(deal => !deal.featured);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Flame className="h-8 w-8 text-yellow-300" />
              <h1 className="text-4xl md:text-5xl font-bold">
                Hot Deals & Offers
              </h1>
              <Flame className="h-8 w-8 text-yellow-300" />
            </div>
            <p className="text-xl text-red-100 mb-8">
              Limited time offers on your favorite products. Don't miss out!
            </p>
            <div className="flex items-center justify-center gap-6 text-red-100">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">25-75%</div>
                <div className="text-sm">Off</div>
              </div>
              <div className="h-8 w-px bg-red-300" />
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{deals.length}</div>
                <div className="text-sm">Active Deals</div>
              </div>
              <div className="h-8 w-px bg-red-300" />
              <div className="text-center">
                <div className="text-2xl font-bold text-white">24hrs</div>
                <div className="text-sm">Left</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Featured Deals */}
        {featuredDeals.length > 0 && (
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <Flame className="h-6 w-6 text-red-600" />
              <h2 className="text-3xl font-bold text-gray-900">
                Featured Flash Sales
              </h2>
              <Badge status="error" className="animate-pulse">
                Limited Time
              </Badge>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredDeals.map((deal) => (
                <Card key={deal.id} className="group hover:shadow-xl transition-all duration-300 border-red-200 bg-gradient-to-br from-white to-red-50">
                  <CardContent className="p-0">
                    <div className="flex flex-col md:flex-row">
                      {/* Deal Image */}
                      <div className="relative md:w-1/2 aspect-square md:aspect-auto">
                        <img
                          src={deal.images[0]}
                          alt={deal.name}
                          className="w-full h-full object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none"
                        />
                        <div className="absolute top-3 left-3 flex flex-col gap-2">
                          <Badge status="error" className="flex items-center gap-1">
                            {getDealTypeIcon(deal.dealType)}
                            {getDealTypeBadge(deal.dealType)}
                          </Badge>
                          <Badge className="bg-green-600 text-white">
                            {deal.discount}% OFF
                          </Badge>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-3 right-3 bg-white/80 hover:bg-white"
                        >
                          <Heart className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      {/* Deal Info */}
                      <div className="md:w-1/2 p-6 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-sm text-gray-600">{deal.category}</span>
                            {deal.limitedStock && (
                              <Badge className="text-orange-600 border-orange-300 bg-orange-50">
                                Only {deal.stockRemaining} left!
                              </Badge>
                            )}
                          </div>
                          
                          <Link
                            href={`/store/${deal.slug}`}
                            className="text-xl font-bold text-gray-900 hover:text-red-600 transition-colors line-clamp-2 mb-3"
                          >
                            {deal.name}
                          </Link>
                          
                          {/* Rating */}
                          <div className="flex items-center gap-2 mb-4">
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < Math.floor(deal.rating)
                                      ? "fill-yellow-400 text-yellow-400"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-gray-600">
                              {deal.rating} ({deal.reviewCount} reviews)
                            </span>
                          </div>
                          
                          {/* Price */}
                          <div className="flex items-center gap-3 mb-4">
                            <span className="text-2xl font-bold text-red-600">
                              ${deal.salePrice.toFixed(2)}
                            </span>
                            <span className="text-lg text-gray-500 line-through">
                              ${deal.originalPrice.toFixed(2)}
                            </span>
                          </div>
                          
                          {/* Countdown */}
                          <div className="flex items-center gap-2 mb-4">
                            <Clock className="h-4 w-4 text-red-600" />
                            <span className="text-sm font-medium text-red-600">
                              Ends in: {timeRemaining[deal.id] || "Loading..."}
                            </span>
                          </div>
                        </div>
                        
                        <Button
                          onClick={() => handleAddToCart(deal)}
                          className="w-full bg-red-600 hover:bg-red-700"
                          size="lg"
                        >
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Regular Deals */}
        {regularDeals.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              More Great Deals
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularDeals.map((deal) => (
                <Card key={deal.id} className="group hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    {/* Deal Image */}
                    <div className="relative aspect-square">
                      <img
                        src={deal.images[0]}
                        alt={deal.name}
                        className="w-full h-full object-cover rounded-t-lg group-hover:scale-105 transition-transform"
                      />
                      <div className="absolute top-3 left-3 flex flex-col gap-2">
                        <Badge status="error" className="flex items-center gap-1">
                          {getDealTypeIcon(deal.dealType)}
                          {deal.discount}% OFF
                        </Badge>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 hover:bg-white"
                      >
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    {/* Deal Info */}
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">{deal.category}</span>
                        <Badge className="text-xs bg-gray-100 text-gray-700">
                          {getDealTypeBadge(deal.dealType)}
                        </Badge>
                      </div>
                      
                      <Link
                        href={`/store/${deal.slug}`}
                        className="font-semibold text-gray-900 hover:text-red-600 transition-colors line-clamp-2 mb-2"
                      >
                        {deal.name}
                      </Link>
                      
                      {/* Rating */}
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${
                                i < Math.floor(deal.rating)
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-gray-600">
                          ({deal.reviewCount})
                        </span>
                      </div>
                      
                      {/* Price */}
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-lg font-bold text-red-600">
                          ${deal.salePrice.toFixed(2)}
                        </span>
                        <span className="text-sm text-gray-500 line-through">
                          ${deal.originalPrice.toFixed(2)}
                        </span>
                      </div>
                      
                      {/* Countdown */}
                      <div className="flex items-center gap-1 mb-4 text-xs text-red-600">
                        <Clock className="h-3 w-3" />
                        <span>{timeRemaining[deal.id] || "Loading..."}</span>
                      </div>
                      
                      <Button
                        onClick={() => handleAddToCart(deal)}
                        className="w-full"
                        variant="outline"
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Add to Cart
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Newsletter Signup */}
        <div className="mt-16">
          <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">
                Never Miss a Deal Again!
              </h3>
              <p className="text-blue-100 mb-6 max-w-md mx-auto">
                Subscribe to our newsletter and be the first to know about flash sales, exclusive discounts, and new arrivals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 rounded-lg text-gray-900"
                />
                <Button variant="secondary" size="lg">
                  Subscribe
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}