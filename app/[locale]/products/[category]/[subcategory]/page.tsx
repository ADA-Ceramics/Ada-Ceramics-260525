import { SubcategoryClient } from "@/components/products/subcategory-client";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

// 二级分类信息
const subcategoryInfo: Record<string, Record<string, { name: string; description: string }>> = {
  plates: {
    "dinner-plates": { name: "Dinner Plates", description: "Large ceramic dinner plates for main courses" },
    "dessert-side-plates": { name: "Dessert & Side Plates", description: "Smaller plates for desserts and sides" },
    "soup-plates": { name: "Soup Plates", description: "Deep rimmed plates for soups and pasta" },
    "oval-serving-plates": { name: "Oval & Serving Plates", description: "Oval platters for serving" },
  },
  bowls: {
    "soup-bowls": { name: "Soup Bowls", description: "Deep bowls for soups and stews" },
    "salad-bowls": { name: "Salad Bowls", description: "Wide shallow bowls for salads" },
    "ramen-bowls": { name: "Ramen Bowls", description: "Large deep bowls for noodles" },
    "snack-bowls": { name: "Snack Bowls", description: "Small bowls for snacks and dips" },
  },
  "dinnerware-sets": {
    "daily-tableware-sets": { name: "Daily Tableware Sets", description: "Complete sets for everyday use" },
    "restaurant-catering-sets": { name: "Restaurant & Catering Sets", description: "Durable sets for commercial use" },
  },
  "cups-mugs": {
    "ceramic-mugs": { name: "Ceramic Mugs", description: "Classic ceramic mugs for coffee and tea" },
    "coffee-cups-saucers": { name: "Coffee Cups & Saucers", description: "Elegant cups with matching saucers" },
    "water-cups": { name: "Water Cups", description: "Simple cups for water and beverages" },
  },
  bakeware: {
    "baking-dishes": { name: "Baking Dishes", description: "Oven-safe dishes for casseroles" },
    "ramekins": { name: "Ramekins", description: "Small individual baking dishes" },
    "pie-pizza-plates": { name: "Pie & Pizza Plates", description: "Round plates for pies and pizzas" },
  },
};

interface PageProps {
  params: Promise<{ locale: string; category: string; subcategory: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category, subcategory } = await params;
  const categoryData = subcategoryInfo[category];
  const subcategoryData = categoryData?.[subcategory];

  if (!subcategoryData) {
    return {
      title: "Category Not Found | ADA Ceramics",
    };
  }

  return {
    title: `Wholesale ${subcategoryData.name} | ADA Ceramics`,
    description: `${subcategoryData.description}. Factory direct wholesale ceramic ${subcategoryData.name.toLowerCase()}. OEM/ODM custom orders available. Bulk supply from China.`,
  };
}

export default async function SubcategoryPage({ params }: PageProps) {
  const { category, subcategory } = await params;
  
  // 验证分类是否存在
  const categoryData = subcategoryInfo[category];
  const subcategoryData = categoryData?.[subcategory];
  
  if (!subcategoryData) {
    notFound();
  }

  return (
    <SubcategoryClient 
      primaryCategory={category}
      subcategory={subcategory}
    />
  );
}
