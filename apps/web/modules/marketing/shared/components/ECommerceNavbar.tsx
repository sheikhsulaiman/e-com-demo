"use client";

import { Badge } from "@ui/components/badge";
import { Button } from "@ui/components/button";
import { Input } from "@ui/components/input";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@ui/components/sheet";
import { cn } from "@ui/lib";
import { Heart, MenuIcon, Search, ShoppingCart, User } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useCart } from "../../../saas/cart/CartContext";
import { CartDrawer } from "../../../saas/cart/CartDrawer";

export function ECommerceNavbar() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isTop, setIsTop] = useState(true);
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();

  useEffect(() => {
    const handleScroll = () => {
      setIsTop(window.scrollY <= 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/store", label: "Shop" },
    { href: "/categories", label: "Categories" },
    { href: "/deals", label: "Deals" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      window.location.href = `/store?search=${encodeURIComponent(searchTerm)}`;
    }
  };

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 z-50 w-full transition-all duration-200",
          !isTop
            ? "bg-white/95 shadow-md backdrop-blur-lg"
            : "bg-white shadow-sm"
        )}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="h-10 w-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">E</span>
              </div>
              <div className="hidden sm:block">
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  EcomStore
                </span>
              </div>
            </Link>

            {/* Search Bar - Hidden on mobile */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <form onSubmit={handleSearch} className="w-full">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 w-full"
                  />
                </div>
              </form>
            </div>

            {/* Navigation Links - Hidden on mobile */}
            <div className="hidden lg:flex items-center space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-3">
              {/* Search Icon for Mobile */}
              <Button variant="ghost" size="icon" className="md:hidden">
                <Search className="h-5 w-5" />
              </Button>

              {/* Wishlist Button */}
              <Button variant="ghost" size="icon" className="hidden sm:flex">
                <Heart className="h-5 w-5" />
              </Button>

              {/* Cart Button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsCartOpen(true)}
                className="relative"
              >
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <Badge
                    className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center text-xs p-0 min-w-0 bg-red-500 text-white"
                  >
                    {totalItems > 99 ? "99+" : totalItems}
                  </Badge>
                )}
              </Button>

              {/* User Account Button */}
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>

              {/* Mobile Menu Button */}
              <Sheet
                open={mobileMenuOpen}
                onOpenChange={(open) => setMobileMenuOpen(open)}
              >
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="lg:hidden">
                    <MenuIcon className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-[280px]" side="right">
                  <SheetTitle>Menu</SheetTitle>
                  <div className="flex flex-col space-y-4 mt-8">
                    {/* Mobile Search */}
                    <form onSubmit={handleSearch} className="md:hidden">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          type="text"
                          placeholder="Search products..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10 pr-4 w-full"
                        />
                      </div>
                    </form>

                    {/* Navigation Links */}
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-gray-700 hover:text-blue-600 font-medium py-2"
                      >
                        {link.label}
                      </Link>
                    ))}

                    {/* Account Links */}
                    <div className="border-t pt-4 space-y-2">
                      <Link
                        href="/auth/login"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block text-gray-700 hover:text-blue-600 font-medium py-2"
                      >
                        Sign In
                      </Link>
                      <Link
                        href="/auth/signup"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block text-gray-700 hover:text-blue-600 font-medium py-2"
                      >
                        Sign Up
                      </Link>
                      <Link
                        href="/app/admin"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block text-gray-700 hover:text-blue-600 font-medium py-2"
                      >
                        Admin Dashboard
                      </Link>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>

      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}