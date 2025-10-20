"use client";

import { Badge } from "@ui/components/badge";
import { Button } from "@ui/components/button";
import { Card, CardContent } from "@ui/components/card";
import { ArrowRight, Clock, Flame } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export function TrendingDeals() {
	const [timeLeft, setTimeLeft] = useState({
		hours: 23,
		minutes: 45,
		seconds: 30,
	});

	// Countdown timer effect
	useEffect(() => {
		const timer = setInterval(() => {
			setTimeLeft((prev) => {
				if (prev.seconds > 0) {
					return { ...prev, seconds: prev.seconds - 1 };
				}
				if (prev.minutes > 0) {
					return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
				}
				if (prev.hours > 0) {
					return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
				}
				return prev;
			});
		}, 1000);

		return () => clearInterval(timer);
	}, []);

	const deals = [
		{
			id: "deal1",
			title: "Gaming Laptop Pro",
			originalPrice: 149999,
			salePrice: 89999,
			discount: 40,
			image: "/api/placeholder/400/300",
			category: "Electronics",
		},
		{
			id: "deal2",
			title: "Designer Sneakers",
			originalPrice: 15999,
			salePrice: 7999,
			discount: 50,
			image: "/api/placeholder/400/300",
			category: "Fashion",
		},
		{
			id: "deal3",
			title: "Coffee Machine Deluxe",
			originalPrice: 29999,
			salePrice: 19999,
			discount: 33,
			image: "/api/placeholder/400/300",
			category: "Home",
		},
	];

	const formatPrice = (price: number) => {
		return new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "USD",
		}).format(price / 100);
	};

	return (
		<section className="py-20 bg-gradient-to-br from-red-50 to-orange-50">
			<div className="container mx-auto px-4">
				<div className="text-center mb-16">
					<div className="inline-flex items-center gap-2 bg-red-100 text-red-800 px-4 py-2 rounded-full mb-4">
						<Flame className="h-5 w-5" />
						<span className="font-medium">Limited Time Offers</span>
					</div>

					<h2 className="text-3xl md:text-4xl font-bold mb-4">
						Trending Deals
					</h2>
					<p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
						Don't miss out on these incredible deals. Limited time
						only!
					</p>

					{/* Countdown Timer */}
					<div className="flex items-center justify-center gap-4 mb-8">
						<div className="flex items-center gap-2 text-red-600">
							<Clock className="h-5 w-5" />
							<span className="font-medium">Deal ends in:</span>
						</div>

						<div className="flex items-center gap-2">
							<div className="bg-red-600 text-white px-3 py-2 rounded-lg min-w-[60px] text-center">
								<div className="text-xl font-bold">
									{timeLeft.hours.toString().padStart(2, "0")}
								</div>
								<div className="text-xs">Hours</div>
							</div>
							<div className="text-red-600 text-xl font-bold">
								:
							</div>
							<div className="bg-red-600 text-white px-3 py-2 rounded-lg min-w-[60px] text-center">
								<div className="text-xl font-bold">
									{timeLeft.minutes
										.toString()
										.padStart(2, "0")}
								</div>
								<div className="text-xs">Min</div>
							</div>
							<div className="text-red-600 text-xl font-bold">
								:
							</div>
							<div className="bg-red-600 text-white px-3 py-2 rounded-lg min-w-[60px] text-center">
								<div className="text-xl font-bold">
									{timeLeft.seconds
										.toString()
										.padStart(2, "0")}
								</div>
								<div className="text-xs">Sec</div>
							</div>
						</div>
					</div>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
					{deals.map((deal) => (
						<Card
							key={deal.id}
							className="group hover:shadow-xl transition-all duration-300 overflow-hidden"
						>
							<div className="relative">
								<div className="aspect-[4/3] bg-gray-100 flex items-center justify-center">
									<div className="text-gray-400 text-6xl font-light">
										{deal.category.charAt(0)}
									</div>
								</div>

								<Badge className="absolute top-4 left-4 bg-red-500 text-white text-lg px-3 py-1">
									-{deal.discount}% OFF
								</Badge>
							</div>

							<CardContent className="p-6">
								<h3 className="font-bold text-xl mb-4">
									{deal.title}
								</h3>

								<div className="space-y-2 mb-6">
									<div className="flex items-center gap-3">
										<span className="text-2xl font-bold text-red-600">
											{formatPrice(deal.salePrice)}
										</span>
										<span className="text-lg text-gray-500 line-through">
											{formatPrice(deal.originalPrice)}
										</span>
									</div>
									<div className="text-sm text-green-600 font-medium">
										You save{" "}
										{formatPrice(
											deal.originalPrice - deal.salePrice,
										)}
									</div>
								</div>

								<Button
									asChild
									className="w-full bg-red-600 hover:bg-red-700"
								>
									<Link href={`/store/${deal.id}`}>
										Claim Deal Now
									</Link>
								</Button>
							</CardContent>
						</Card>
					))}
				</div>

				<div className="text-center">
					<Button
						asChild
						variant="outline"
						size="lg"
						className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
					>
						<Link
							href="/deals"
							className="inline-flex items-center gap-2"
						>
							View All Deals
							<ArrowRight className="h-4 w-4" />
						</Link>
					</Button>
				</div>
			</div>
		</section>
	);
}
