"use client";

import { Button } from "@ui/components/button";
import { Card, CardContent } from "@ui/components/card";
import { 
  Laptop, 
  Shirt, 
  Home, 
  Dumbbell, 
  Book, 
  Camera,
  ArrowRight
} from "lucide-react";
import Link from "next/link";

export function CategoryShowcase() {
  const categories = [
    {
      id: "electronics",
      name: "Electronics",
      icon: Laptop,
      color: "from-blue-500 to-blue-600",
      productCount: 1250,
    },
    {
      id: "fashion",
      name: "Fashion",
      icon: Shirt,
      color: "from-pink-500 to-pink-600",
      productCount: 890,
    },
    {
      id: "home",
      name: "Home & Garden",
      icon: Home,
      color: "from-green-500 to-green-600",
      productCount: 654,
    },
    {
      id: "sports",
      name: "Sports & Fitness",
      icon: Dumbbell,
      color: "from-orange-500 to-orange-600",
      productCount: 432,
    },
    {
      id: "books",
      name: "Books & Media",
      icon: Book,
      color: "from-purple-500 to-purple-600",
      productCount: 321,
    },
    {
      id: "photography",
      name: "Photography",
      icon: Camera,
      color: "from-red-500 to-red-600",
      productCount: 198,
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Shop by Category
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover thousands of products across our most popular categories
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-12">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <Link
                key={category.id}
                href={`/store?category=${category.id}`}
                className="group"
              >
                <Card className="hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1">
                  <CardContent className="p-6 text-center">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${category.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {category.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {category.productCount.toLocaleString()} products
                    </p>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        <div className="text-center">
          <Button asChild variant="outline" size="lg">
            <Link href="/categories" className="inline-flex items-center gap-2">
              View All Categories
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}