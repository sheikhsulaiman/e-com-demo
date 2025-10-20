"use client";

import { Badge } from "@ui/components/badge";
import { Button } from "@ui/components/button";
import { Card, CardContent } from "@ui/components/card";
import { Input } from "@ui/components/input";

import { cn } from "@ui/lib";
import { Heart, Minus, Plus, Share2, Star, Truck } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { AddToCartButton } from "../../../../modules/saas/cart/AddToCartButton";

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
  features?: string[];
  specifications?: { [key: string]: string };
  createdAt: string;
  updatedAt: string;
}

interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export default function ProductPage() {
  const params = useParams();
  const productId = params.id as string;
  
  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [loading, setLoading] = useState(true);

  // Mock product data - replace with actual API call
  const mockProduct: Product = {
    id: productId,
    name: "Premium Wireless Headphones",
    description: "Experience premium sound quality with these wireless headphones featuring active noise cancellation, 30-hour battery life, and premium comfort design. Perfect for music, calls, and entertainment.",
    price: 29999, // $299.99 in cents
    images: [
      "/images/headphones-1.jpg",
      "/images/headphones-2.jpg",
      "/images/headphones-3.jpg",
      "/images/headphones-4.jpg"
    ],
    category: { id: "electronics", name: "Electronics" },
    status: "ACTIVE",
    stock: 15,
    rating: 4.5,
    reviewCount: 128,
    features: [
      "Active Noise Cancellation",
      "30-hour battery life",
      "Quick charge: 15 min = 3 hours",
      "Premium comfort design",
      "Hi-Res Audio certified",
      "Voice assistant support"
    ],
    specifications: {
      "Driver Size": "40mm dynamic drivers",
      "Frequency Response": "20Hz - 40kHz",
      "Battery Life": "30 hours (ANC on), 40 hours (ANC off)",
      "Charging Time": "3 hours (full charge)",
      "Weight": "250g",
      "Connectivity": "Bluetooth 5.2, 3.5mm jack",
      "Noise Cancellation": "Hybrid Active Noise Cancellation"
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const mockReviews: Review[] = [
    {
      id: "1",
      userId: "user1",
      userName: "John D.",
      rating: 5,
      comment: "Excellent sound quality and comfort. The noise cancellation is amazing!",
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "2",
      userId: "user2",
      userName: "Sarah M.",
      rating: 4,
      comment: "Great headphones, but could be a bit lighter. Sound quality is superb.",
      createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "3",
      userId: "user3",
      userName: "Mike R.",
      rating: 5,
      comment: "Worth every penny. The battery life is incredible and they're so comfortable.",
      createdAt: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ];

  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      setProduct(mockProduct);
      setReviews(mockReviews);
      setLoading(false);
    };

    if (productId) {
      loadProduct();
    }
  }, [productId]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price / 100);
  };

  const renderStars = (rating: number, size: "sm" | "md" = "sm") => {
    const starSize = size === "sm" ? "h-4 w-4" : "h-5 w-5";
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={cn(
          starSize,
          i < Math.floor(rating)
            ? "fill-yellow-400 text-yellow-400"
            : "text-gray-300"
        )}
      />
    ));
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= (product?.stock || 0)) {
      setQuantity(newQuantity);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="aspect-square bg-gray-200 rounded-lg"></div>
            <div className="space-y-4">
              <div className="h-8 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-12 bg-gray-200 rounded w-1/3"></div>
              <div className="h-32 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-8">The product you're looking for doesn't exist.</p>
          <Button asChild>
            <a href="/store">Back to Store</a>
          </Button>
        </div>
      </div>
    );
  }

  const isOutOfStock = product.stock === 0;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Product Info */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square relative rounded-lg overflow-hidden bg-gray-100">
            <Image
              src={product.images[selectedImage] || "/placeholder-product.jpg"}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
            {isOutOfStock && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <Badge status="error" className="text-white text-lg px-4 py-2">
                  Out of Stock
                </Badge>
              </div>
            )}
          </div>
          
          {/* Image Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={cn(
                    "flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2",
                    selectedImage === index
                      ? "border-blue-500"
                      : "border-gray-200 hover:border-gray-300"
                  )}
                >
                  <Image
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <Badge className="mb-2">{product.category.name}</Badge>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            
            {/* Rating */}
            {product.rating && (
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-1">
                  {renderStars(product.rating, "md")}
                </div>
                <span className="text-lg font-medium">{product.rating}</span>
                <span className="text-gray-500">
                  ({product.reviewCount} reviews)
                </span>
              </div>
            )}

            {/* Price */}
            <div className="text-4xl font-bold text-green-600 mb-4">
              {formatPrice(product.price)}
            </div>

            {/* Stock Status */}
            <div className="mb-6">
              {isOutOfStock ? (
                <Badge status="error">Out of Stock</Badge>
              ) : product.stock <= 5 ? (
                <Badge status="warning">Only {product.stock} left in stock</Badge>
              ) : (
                <Badge status="success">In Stock ({product.stock} available)</Badge>
              )}
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="font-semibold mb-2">Description</h3>
            <p className="text-gray-600 leading-relaxed">{product.description}</p>
          </div>

          {/* Features */}
          {product.features && (
            <div>
              <h3 className="font-semibold mb-2">Key Features</h3>
              <ul className="space-y-1">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-gray-600">
                    <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Quantity and Add to Cart */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <label className="font-medium">Quantity:</label>
              <div className="flex items-center border rounded-lg">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={quantity <= 1}
                  className="rounded-r-none"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <Input
                  type="number"
                  value={quantity}
                  onChange={(e) => handleQuantityChange(Number(e.target.value))}
                  className="w-20 text-center border-0 rounded-none focus-visible:ring-0"
                  min="1"
                  max={product.stock}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleQuantityChange(quantity + 1)}
                  disabled={quantity >= product.stock}
                  className="rounded-l-none"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex gap-3">
              <AddToCartButton
                productId={product.id}
                quantity={quantity}
                disabled={isOutOfStock}
                className="flex-1"
                size="lg"
              />
              
              <Button
                variant="outline"
                size="lg"
                onClick={() => setIsWishlisted(!isWishlisted)}
                className="px-3"
              >
                <Heart
                  className={cn(
                    "h-5 w-5",
                    isWishlisted && "fill-red-500 text-red-500"
                  )}
                />
              </Button>
              
              <Button variant="outline" size="lg" className="px-3">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Shipping Info */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Truck className="h-5 w-5 text-green-600" />
                <div className="text-sm">
                  <p className="font-medium">Free shipping</p>
                  <p className="text-gray-600">Estimated delivery: 3-5 business days</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="space-y-8">
        {/* Specifications */}
        {product.specifications && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Specifications</h2>
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-2 border-b border-gray-100 last:border-0">
                      <span className="font-medium text-gray-600">{key}:</span>
                      <span>{value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Reviews */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
          <div className="space-y-6">
            {reviews.map((review) => (
              <Card key={review.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">{review.userName}</span>
                        <div className="flex items-center gap-1">
                          {renderStars(review.rating)}
                        </div>
                      </div>
                      <p className="text-sm text-gray-500">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-700">{review.comment}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}