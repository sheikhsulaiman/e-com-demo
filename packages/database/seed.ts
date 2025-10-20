import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting to seed the database...");

  // Create categories
  const electronicsCategory = await prisma.category.upsert({
    where: { slug: "electronics" },
    update: {},
    create: {
      name: "Electronics",
      slug: "electronics",
      description: "Latest electronic devices and gadgets",
    },
  });

  const fashionCategory = await prisma.category.upsert({
    where: { slug: "fashion" },
    update: {},
    create: {
      name: "Fashion",
      slug: "fashion",
      description: "Trendy clothing and accessories",
    },
  });

  const homeCategory = await prisma.category.upsert({
    where: { slug: "home-garden" },
    update: {},
    create: {
      name: "Home & Garden",
      slug: "home-garden",
      description: "Everything for your home and garden",
    },
  });

  const sportsCategory = await prisma.category.upsert({
    where: { slug: "sports-fitness" },
    update: {},
    create: {
      name: "Sports & Fitness",
      slug: "sports-fitness",
      description: "Sports equipment and fitness gear",
    },
  });

  console.log("✅ Categories created");

  // Create products
  const products = [
    {
      name: "Premium Wireless Headphones",
      slug: "premium-wireless-headphones",
      description: "High-quality wireless headphones with active noise cancellation, 30-hour battery life, and premium comfort design.",
      price: 299.99,
      comparePrice: 399.99,
      categoryId: electronicsCategory.id,
      images: ["/api/placeholder/400/400"],
      status: "ACTIVE" as const,
      quantity: 50,
      sku: "WH-001",
      seoTitle: "Premium Wireless Headphones",
      seoDescription: "Experience premium sound quality with noise cancellation technology",
    },
    {
      name: "Smart Fitness Tracker",
      slug: "smart-fitness-tracker",
      description: "Advanced fitness tracker with heart rate monitoring, GPS tracking, sleep analysis, and 7-day battery life.",
      price: 199.99,
      comparePrice: 249.99,
      categoryId: electronicsCategory.id,
      images: ["/api/placeholder/400/400"],
      status: "ACTIVE" as const,
      quantity: 30,
      sku: "FT-002",
      seoTitle: "Smart Fitness Tracker",
      seoDescription: "Track your fitness goals with our advanced smart fitness tracker",
    },
    {
      name: "Ergonomic Office Chair",
      slug: "ergonomic-office-chair",
      description: "Comfortable ergonomic office chair with lumbar support, adjustable height, and breathable mesh back.",
      price: 459.99,
      comparePrice: 599.99,
      categoryId: homeCategory.id,
      images: ["/api/placeholder/400/400"],
      status: "ACTIVE" as const,
      quantity: 15,
      sku: "OC-003",
      seoTitle: "Ergonomic Office Chair",
      seoDescription: "Premium ergonomic office chair for comfortable work",
    },
    {
      name: "Organic Cotton T-Shirt",
      slug: "organic-cotton-t-shirt",
      description: "Soft, comfortable, and eco-friendly organic cotton t-shirt. Available in multiple colors and sizes.",
      price: 29.99,
      comparePrice: 39.99,
      categoryId: fashionCategory.id,
      images: ["/api/placeholder/400/400"],
      status: "ACTIVE" as const,
      quantity: 100,
      sku: "TS-004",
      seoTitle: "Organic Cotton T-Shirt",
      seoDescription: "Comfortable and sustainable organic cotton t-shirt",
    },
    {
      name: "Yoga Mat Premium",
      slug: "yoga-mat-premium",
      description: "Non-slip premium yoga mat with excellent cushioning and grip. Perfect for all types of yoga practice.",
      price: 79.99,
      comparePrice: 99.99,
      categoryId: sportsCategory.id,
      images: ["/api/placeholder/400/400"],
      status: "ACTIVE" as const,
      quantity: 45,
      sku: "YM-006",
      seoTitle: "Premium Yoga Mat",
      seoDescription: "High-quality yoga mat for comfortable practice",
    },
  ];

  for (const productData of products) {
    await prisma.product.upsert({
      where: { slug: productData.slug },
      update: {},
      create: productData,
    });
  }

  console.log("✅ Products created");
  console.log("🎉 Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });