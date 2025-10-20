"use client";

import { Card, CardContent } from "@ui/components/card";
import { Badge } from "@ui/components/badge";
import { Button } from "@ui/components/button";
import { 
  ShoppingBag, 
  Users, 
  Award, 
  Heart,
  Truck,
  Shield,
  Star,
  Globe,
  ArrowRight,
  MapPin,
  Mail,
  Phone
} from "lucide-react";
import Link from "next/link";

const stats = [
  {
    icon: <Users className="h-8 w-8" />,
    value: "50K+",
    label: "Happy Customers",
    description: "Customers trust us worldwide"
  },
  {
    icon: <ShoppingBag className="h-8 w-8" />,
    value: "100K+",
    label: "Products Sold",
    description: "Products delivered successfully"
  },
  {
    icon: <Globe className="h-8 w-8" />,
    value: "25+",
    label: "Countries",
    description: "Countries we ship to"
  },
  {
    icon: <Award className="h-8 w-8" />,
    value: "4.9",
    label: "Rating",
    description: "Average customer rating"
  }
];

const values = [
  {
    icon: <Heart className="h-12 w-12 text-red-600" />,
    title: "Customer First",
    description: "We prioritize our customers' needs and satisfaction above everything else. Your happiness is our success."
  },
  {
    icon: <Shield className="h-12 w-12 text-blue-600" />,
    title: "Quality Assurance",
    description: "Every product is carefully selected and tested to ensure it meets our high standards of quality and durability."
  },
  {
    icon: <Truck className="h-12 w-12 text-green-600" />,
    title: "Fast Delivery",
    description: "We ensure quick and reliable delivery to get your products to you as soon as possible, anywhere in the world."
  },
  {
    icon: <Star className="h-12 w-12 text-yellow-600" />,
    title: "Excellence",
    description: "We strive for excellence in everything we do, from product curation to customer service and beyond."
  }
];

const team = [
  {
    name: "Sarah Johnson",
    role: "Founder & CEO",
    image: "/api/placeholder/300/300",
    bio: "Sarah founded EcomStore with a vision to make quality products accessible to everyone."
  },
  {
    name: "Michael Chen",
    role: "Head of Product",
    image: "/api/placeholder/300/300",
    bio: "Michael ensures every product meets our strict quality standards and customer expectations."
  },
  {
    name: "Emily Rodriguez",
    role: "Customer Experience",
    image: "/api/placeholder/300/300",
    bio: "Emily leads our customer service team to ensure every interaction exceeds expectations."
  },
  {
    name: "David Kim",
    role: "Technology Director",
    image: "/api/placeholder/300/300",
    bio: "David oversees our technology infrastructure to provide seamless shopping experiences."
  }
];

const milestones = [
  {
    year: "2020",
    title: "Company Founded",
    description: "Started with a simple mission to provide quality products at affordable prices."
  },
  {
    year: "2021",
    title: "First 1K Customers",
    description: "Reached our first thousand happy customers and expanded our product range."
  },
  {
    year: "2022",
    title: "International Shipping",
    description: "Launched international shipping to serve customers worldwide."
  },
  {
    year: "2023",
    title: "50K Milestone",
    description: "Celebrated serving over 50,000 satisfied customers across 25 countries."
  },
  {
    year: "2024",
    title: "Sustainability Initiative",
    description: "Launched our eco-friendly packaging and carbon-neutral shipping program."
  },
  {
    year: "2025",
    title: "Innovation Hub",
    description: "Opened our innovation center to develop the next generation of products."
  }
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              About EcomStore
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              We're passionate about bringing you the best products at unbeatable prices. 
              Founded in 2020, EcomStore has grown from a small startup to a trusted global marketplace 
              serving customers in over 25 countries.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/store">
                  Shop Now
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/contact">
                  Get in Touch
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4 text-blue-200">
                  {stat.icon}
                </div>
                <div className="text-3xl md:text-4xl font-bold mb-2">
                  {stat.value}
                </div>
                <div className="text-lg font-semibold mb-1">
                  {stat.label}
                </div>
                <div className="text-sm text-blue-100">
                  {stat.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Our Mission
                </h2>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  At EcomStore, we believe everyone deserves access to quality products that enhance their daily lives. 
                  Our mission is to bridge the gap between exceptional products and everyday consumers by offering 
                  carefully curated items at prices that won't break the bank.
                </p>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  We work directly with manufacturers and trusted suppliers to ensure authenticity, quality, 
                  and fair pricing. Every product in our catalog is handpicked by our team of experts who 
                  understand what modern consumers need and want.
                </p>
                <Button asChild>
                  <Link href="/categories">
                    Explore Our Categories
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </div>
              <div className="relative">
                <img
                  src="/api/placeholder/500/400"
                  alt="Our mission"
                  className="w-full h-auto rounded-lg shadow-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-lg" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              These values guide everything we do and shape the experience we create for our customers.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-center mb-4">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Journey
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From humble beginnings to serving customers worldwide, here's how we've grown.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-4 md:left-1/2 md:transform md:-translate-x-px h-full w-0.5 bg-gray-300" />
              
              {milestones.map((milestone, index) => (
                <div key={index} className={`relative flex items-center mb-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  {/* Timeline Dot */}
                  <div className="absolute left-4 md:left-1/2 md:transform md:-translate-x-1/2 w-3 h-3 bg-blue-600 rounded-full border-4 border-white shadow-lg z-10" />
                  
                  {/* Content */}
                  <div className={`ml-12 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}>
                    <Card className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <Badge className="mb-3 bg-blue-100 text-blue-800">
                          {milestone.year}
                        </Badge>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          {milestone.title}
                        </h3>
                        <p className="text-gray-600">
                          {milestone.description}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The passionate people behind EcomStore who work tirelessly to bring you the best shopping experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="relative mb-4">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-24 h-24 rounded-full mx-auto object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-blue-600 font-medium mb-3">
                    {member.role}
                  </p>
                  <p className="text-gray-600 text-sm">
                    {member.bio}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Start Shopping?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers and discover amazing products at unbeatable prices.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/store">
                Browse Products
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-blue-600"
              asChild
            >
              <Link href="/deals">
                View Deals
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Contact Info */}
      <div className="py-12 bg-white border-t">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <MapPin className="h-8 w-8 text-blue-600 mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Visit Us</h3>
              <p className="text-gray-600">
                123 Commerce Street<br />
                New York, NY 10001
              </p>
            </div>
            <div className="flex flex-col items-center">
              <Mail className="h-8 w-8 text-blue-600 mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Email Us</h3>
              <p className="text-gray-600">
                support@ecomstore.com<br />
                hello@ecomstore.com
              </p>
            </div>
            <div className="flex flex-col items-center">
              <Phone className="h-8 w-8 text-blue-600 mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Call Us</h3>
              <p className="text-gray-600">
                +1 (555) 123-4567<br />
                Monday - Friday, 9AM - 6PM EST
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}