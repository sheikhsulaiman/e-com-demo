import { ContactForm } from "@marketing/home/components/ContactForm";
import { config } from "@repo/config";
import { Badge } from "@ui/components/badge";
import { Card, CardContent } from "@ui/components/card";
import {
	Clock,
	CreditCard,
	Headphones,
	Mail,
	MapPin,
	MessageCircle,
	Phone,
	ShoppingBag,
	Truck,
} from "lucide-react";
import { getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";

export async function generateMetadata() {
	const t = await getTranslations();
	return {
		title: t("contact.title"),
	};
}

const contactMethods = [
	{
		icon: <Headphones className="h-8 w-8 text-blue-600" />,
		title: "Customer Support",
		description: "Get help with orders, products, and general inquiries",
		contact: "support@ecomstore.com",
		hours: "24/7 Support Available",
	},
	{
		icon: <ShoppingBag className="h-8 w-8 text-green-600" />,
		title: "Sales Team",
		description: "Questions about products, bulk orders, or partnerships",
		contact: "sales@ecomstore.com",
		hours: "Mon-Fri, 9AM-6PM EST",
	},
	{
		icon: <CreditCard className="h-8 w-8 text-purple-600" />,
		title: "Billing & Payments",
		description: "Issues with payments, refunds, or billing questions",
		contact: "billing@ecomstore.com",
		hours: "Mon-Fri, 9AM-5PM EST",
	},
	{
		icon: <Truck className="h-8 w-8 text-orange-600" />,
		title: "Shipping & Orders",
		description: "Track orders, shipping questions, or delivery issues",
		contact: "shipping@ecomstore.com",
		hours: "Mon-Sat, 8AM-8PM EST",
	},
];

const faqCategories = [
	{
		title: "Orders & Shipping",
		questions: [
			"How can I track my order?",
			"What are your shipping options?",
			"Can I change my delivery address?",
			"International shipping rates",
		],
	},
	{
		title: "Returns & Refunds",
		questions: [
			"How do I return an item?",
			"When will I receive my refund?",
			"Return policy details",
			"Exchange process",
		],
	},
	{
		title: "Products & Stock",
		questions: [
			"Product availability",
			"Size and color options",
			"Product specifications",
			"Restock notifications",
		],
	},
	{
		title: "Account & Payment",
		questions: [
			"Create an account",
			"Payment methods accepted",
			"Security and privacy",
			"Account management",
		],
	},
];

export default async function ContactPage() {
	if (!config.contactForm.enabled) {
		redirect("/");
	}

	const t = await getTranslations();
	return (
		<div className="min-h-screen bg-gray-50">
			{/* Hero Section */}
			<div className="bg-white border-b">
				<div className="container mx-auto px-4 py-16">
					<div className="text-center max-w-3xl mx-auto">
						<h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
							{t("contact.title")}
						</h1>
						<p className="text-xl text-gray-600 mb-8">
							{t("contact.description")} We're here to help with
							any questions about your orders, products, or
							shopping experience.
						</p>
						<Badge className="bg-green-100 text-green-800 px-4 py-2">
							<Clock className="h-4 w-4 mr-2" />
							Average response time: 2 hours
						</Badge>
					</div>
				</div>
			</div>

			<div className="container mx-auto px-4 py-12">
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
					{/* Contact Methods */}
					<div className="lg:col-span-1">
						<h2 className="text-2xl font-bold text-gray-900 mb-6">
							Get in Touch
						</h2>

						<div className="space-y-6">
							{contactMethods.map((method, index) => (
								<Card
									key={index}
									className="hover:shadow-md transition-shadow"
								>
									<CardContent className="p-6">
										<div className="flex items-start gap-4">
											<div className="flex-shrink-0">
												{method.icon}
											</div>
											<div className="flex-1">
												<h3 className="font-semibold text-gray-900 mb-2">
													{method.title}
												</h3>
												<p className="text-gray-600 text-sm mb-3">
													{method.description}
												</p>
												<div className="space-y-1">
													<p className="text-blue-600 font-medium">
														{method.contact}
													</p>
													<p className="text-gray-500 text-sm">
														{method.hours}
													</p>
												</div>
											</div>
										</div>
									</CardContent>
								</Card>
							))}
						</div>

						{/* Contact Info */}
						<Card className="mt-6">
							<CardContent className="p-6">
								<h3 className="font-semibold text-gray-900 mb-4">
									Visit Our Store
								</h3>
								<div className="space-y-4">
									<div className="flex items-start gap-3">
										<MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
										<div>
											<p className="text-gray-900 font-medium">
												EcomStore HQ
											</p>
											<p className="text-gray-600 text-sm">
												123 Commerce Street
												<br />
												New York, NY 10001
											</p>
										</div>
									</div>
									<div className="flex items-start gap-3">
										<Phone className="h-5 w-5 text-gray-400 mt-0.5" />
										<div>
											<p className="text-gray-900 font-medium">
												+1 (555) 123-4567
											</p>
											<p className="text-gray-600 text-sm">
												Mon-Fri, 9AM-6PM EST
											</p>
										</div>
									</div>
									<div className="flex items-start gap-3">
										<Mail className="h-5 w-5 text-gray-400 mt-0.5" />
										<div>
											<p className="text-gray-900 font-medium">
												hello@ecomstore.com
											</p>
											<p className="text-gray-600 text-sm">
												General inquiries
											</p>
										</div>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>

					{/* Contact Form */}
					<div className="lg:col-span-2">
						<div className="bg-white rounded-lg shadow-sm border p-8">
							<div className="mb-8">
								<h2 className="text-2xl font-bold text-gray-900 mb-2">
									Send us a message
								</h2>
								<p className="text-gray-600">
									Fill out the form below and we'll get back
									to you as soon as possible.
								</p>
							</div>
							<ContactForm />
						</div>

						{/* FAQ Section */}
						<div className="mt-12">
							<h2 className="text-2xl font-bold text-gray-900 mb-6">
								Frequently Asked Questions
							</h2>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								{faqCategories.map((category, index) => (
									<Card
										key={index}
										className="hover:shadow-md transition-shadow"
									>
										<CardContent className="p-6">
											<h3 className="font-semibold text-gray-900 mb-4">
												{category.title}
											</h3>
											<ul className="space-y-2">
												{category.questions.map(
													(question, qIndex) => (
														<li
															key={qIndex}
															className="text-gray-600 text-sm hover:text-blue-600 cursor-pointer transition-colors"
														>
															• {question}
														</li>
													),
												)}
											</ul>
										</CardContent>
									</Card>
								))}
							</div>
						</div>

						{/* Live Chat CTA */}
						<Card className="mt-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">
							<CardContent className="p-6 text-center">
								<MessageCircle className="h-12 w-12 mx-auto mb-4 text-blue-200" />
								<h3 className="text-xl font-bold mb-2">
									Need Immediate Help?
								</h3>
								<p className="text-blue-100 mb-4">
									Start a live chat with our support team for
									instant assistance with your orders and
									questions.
								</p>
								<button
									type="button"
									className="bg-white text-blue-600 px-6 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors"
								>
									Start Live Chat
								</button>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</div>
	);
}
