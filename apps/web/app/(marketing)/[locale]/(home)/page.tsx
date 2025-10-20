import { ECommerceHero } from "@marketing/home/components/ECommerceHero";
import { FeaturedProducts } from "@marketing/home/components/FeaturedProducts";
import { CategoryShowcase } from "@marketing/home/components/CategoryShowcase";
import { TrendingDeals } from "@marketing/home/components/TrendingDeals";
import { WhyChooseUs } from "@marketing/home/components/WhyChooseUs";
import { Newsletter } from "@marketing/home/components/Newsletter";
import { setRequestLocale } from "next-intl/server";

export default async function Home({
	params,
}: {
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;
	setRequestLocale(locale);

	return (
		<>
			<ECommerceHero />
			<CategoryShowcase />
			<FeaturedProducts />
			<TrendingDeals />
			<WhyChooseUs />
			<Newsletter />
		</>
	);
}
