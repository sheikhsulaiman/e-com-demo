"use client";

import { Card, CardContent } from "@ui/components/card";
import { 
  Truck, 
  Shield, 
  RotateCcw, 
  Headphones, 
  CreditCard, 
  Award 
} from "lucide-react";

export function WhyChooseUs() {
  const features = [
    {
      icon: Truck,
      title: "Free Shipping",
      description: "Free shipping on orders over $50. Fast and reliable delivery worldwide.",
      color: "text-green-600"
    },
    {
      icon: Shield,
      title: "Secure Payment",
      description: "Your payment information is always safe with our advanced security measures.",
      color: "text-blue-600"
    },
    {
      icon: RotateCcw,
      title: "Easy Returns",
      description: "30-day return policy. No questions asked if you're not completely satisfied.",
      color: "text-purple-600"
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      description: "Round-the-clock customer support to help you with any questions or concerns.",
      color: "text-red-600"
    },
    {
      icon: CreditCard,
      title: "Flexible Payment",
      description: "Multiple payment options including buy now, pay later services.",
      color: "text-orange-600"
    },
    {
      icon: Award,
      title: "Quality Guarantee",
      description: "All products are tested and verified to meet our high quality standards.",
      color: "text-yellow-600"
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Choose EcomStore?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We're committed to providing you with the best shopping experience possible
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-8 text-center">
                  <div className={"w-16 h-16 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center"}>
                    <IconComponent className={`h-8 w-8 ${feature.color}`} />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Stats Section */}
        <div className="mt-20 bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                500K+
              </div>
              <div className="text-gray-600">Happy Customers</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">
                10M+
              </div>
              <div className="text-gray-600">Orders Delivered</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-purple-600 mb-2">
                99.9%
              </div>
              <div className="text-gray-600">Uptime Guarantee</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-orange-600 mb-2">
                24/7
              </div>
              <div className="text-gray-600">Customer Support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}