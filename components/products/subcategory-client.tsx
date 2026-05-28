"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";

// 一级分类对应的二级子分类
const categorySubcategories: Record<string, { slug: string; name: string }[]> = {
  plates: [
    { slug: "dinner-plates", name: "Dinner Plates" },
    { slug: "dessert-side-plates", name: "Dessert & Side Plates" },
    { slug: "soup-plates", name: "Soup Plates" },
    { slug: "oval-serving-plates", name: "Oval & Serving Plates" },
  ],
  bowls: [
    { slug: "soup-bowls", name: "Soup Bowls" },
    { slug: "salad-bowls", name: "Salad Bowls" },
    { slug: "ramen-bowls", name: "Ramen Bowls" },
    { slug: "snack-bowls", name: "Snack Bowls" },
  ],
  "dinnerware-sets": [
    { slug: "daily-tableware-sets", name: "Daily Tableware Sets" },
    { slug: "restaurant-catering-sets", name: "Restaurant & Catering Sets" },
  ],
  "cups-mugs": [
    { slug: "ceramic-mugs", name: "Ceramic Mugs" },
    { slug: "coffee-cups-saucers", name: "Coffee Cups & Saucers" },
    { slug: "water-cups", name: "Water Cups" },
  ],
  bakeware: [
    { slug: "baking-dishes", name: "Baking Dishes" },
    { slug: "ramekins", name: "Ramekins" },
    { slug: "pie-pizza-plates", name: "Pie & Pizza Plates" },
  ],
};

// 一级分类名称映射
const categoryNames: Record<string, string> = {
  plates: "Wholesale Plates",
  bowls: "Wholesale Bowls",
  "dinnerware-sets": "Wholesale Dinnerware Sets",
  "cups-mugs": "Wholesale Cups & Mugs",
  bakeware: "Wholesale Bakeware",
};

// 一级分类描述映射
const categoryDescriptions: Record<string, string> = {
  plates: "Premium ceramic plates for restaurants, hotels and retail. Dinner plates, dessert plates, soup plates and serving plates.",
  bowls: "High-quality ceramic bowls in various sizes. Soup bowls, salad bowls, ramen bowls and snack bowls.",
  "dinnerware-sets": "Complete ceramic dinnerware sets for daily home use, customizable combinations available.",
  "cups-mugs": "Ceramic mugs, coffee cups and saucers, water cups. Perfect for cafes, hotels and promotional gifts.",
  bakeware: "Oven-safe ceramic bakeware including baking dishes, ramekins, pie plates and pizza plates.",
};

interface SubcategoryClientProps {
  primaryCategory: string;
  subcategory: string;
}

export function SubcategoryClient({ primaryCategory, subcategory }: SubcategoryClientProps) {
  const pathname = usePathname();
  const locale = pathname.split("/")[1] || "en";
  
  // 获取当前一级分类的子分类列表
  const subcategories = categorySubcategories[primaryCategory] || [];
  const categoryName = categoryNames[primaryCategory] || "Products";
  const categoryDescription = categoryDescriptions[primaryCategory] || "";

  return (
    <section className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* H1 Title */}
        <h1 className="text-2xl sm:text-3xl font-serif font-normal text-[#1a1a1a] mb-3">
          {categoryName}
        </h1>
        
        {/* Description */}
        <p className="text-[#6b7280] text-base mb-8 max-w-3xl">
          {categoryDescription}
        </p>

        {/* Subcategory Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {subcategories.map((sub) => (
            <div 
              key={sub.slug} 
              className="border border-gray-200 rounded-lg bg-white overflow-hidden hover:shadow-md transition-shadow"
            >
              {/* Image Placeholder */}
              <div className="aspect-square bg-[#f5f3ef] flex items-center justify-center">
                <svg className="w-16 h-16 text-[#d1ccc4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              
              {/* Card Content */}
              <div className="p-5">
                <h3 className="text-base font-medium text-[#1a1a1a] mb-4">
                  {sub.name}
                </h3>
                <Link
                  href={`/${locale}/products/${primaryCategory}/${sub.slug}`}
                  className="inline-flex items-center justify-center w-full px-4 py-2.5 text-sm font-medium text-white bg-[#8b7355] rounded-md hover:bg-[#6d5a43] transition-colors"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
