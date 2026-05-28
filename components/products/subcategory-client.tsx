"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

// Category structure
const categoryStructure: Record<string, { name: string; subcategories: { name: string; slug: string }[] }> = {
  plates: {
    name: "Wholesale Plates",
    subcategories: [
      { name: "Dinner Plates", slug: "dinner-plates" },
      { name: "Dessert & Side Plates", slug: "dessert-side-plates" },
      { name: "Soup Plates", slug: "soup-plates" },
      { name: "Oval & Serving Plates", slug: "oval-serving-plates" },
    ],
  },
  bowls: {
    name: "Wholesale Bowls",
    subcategories: [
      { name: "Soup Bowls", slug: "soup-bowls" },
      { name: "Salad Bowls", slug: "salad-bowls" },
      { name: "Ramen Bowls", slug: "ramen-bowls" },
      { name: "Snack Bowls", slug: "snack-bowls" },
    ],
  },
  "dinnerware-sets": {
    name: "Wholesale Dinnerware Sets",
    subcategories: [
      { name: "Daily Tableware Sets", slug: "daily-tableware-sets" },
      { name: "Restaurant & Catering Sets", slug: "restaurant-catering-sets" },
    ],
  },
  "cups-mugs": {
    name: "Wholesale Cups & Mugs",
    subcategories: [
      { name: "Ceramic Mugs", slug: "ceramic-mugs" },
      { name: "Coffee Cups & Saucers", slug: "coffee-cups-saucers" },
      { name: "Water Cups", slug: "water-cups" },
    ],
  },
  bakeware: {
    name: "Wholesale Bakeware",
    subcategories: [
      { name: "Baking Dishes", slug: "baking-dishes" },
      { name: "Ramekins", slug: "ramekins" },
      { name: "Pie & Pizza Plates", slug: "pie-pizza-plates" },
    ],
  },
};

interface SubcategoryClientProps {
  primaryCategory: string;
  subcategory: string;
}

export function SubcategoryClient({ primaryCategory, subcategory }: SubcategoryClientProps) {
  const pathname = usePathname();
  const locale = pathname.split("/")[1] || "en";

  const currentCategory = categoryStructure[primaryCategory];
  const currentSubcategoryName = currentCategory?.subcategories.find((s) => s.slug === subcategory)?.name || subcategory;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          
          {/* Flex Container: Left Sidebar + Right Products */}
          <div style={{ display: "flex", gap: "32px" }}>
            
            {/* Left Sidebar - Fixed 250px */}
            <div style={{ width: "250px", flexShrink: 0 }}>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h2 className="font-semibold text-gray-900 mb-4">Categories</h2>
                
                {Object.entries(categoryStructure).map(([catKey, cat]) => (
                  <div key={catKey} className="mb-4">
                    <div className="font-bold text-gray-900 text-sm mb-2">{cat.name}</div>
                    <ul className="ml-3 border-l-2 border-gray-300 pl-3 space-y-1">
                      {cat.subcategories.map((sub) => {
                        const isActive = catKey === primaryCategory && sub.slug === subcategory;
                        return (
                          <li key={sub.slug}>
                            <Link
                              href={`/${locale}/products/${catKey}/${sub.slug}`}
                              className={`block py-1 px-2 text-sm rounded ${
                                isActive
                                  ? "bg-[#8b7355] text-white"
                                  : "text-gray-600 hover:bg-gray-200"
                              }`}
                            >
                              {sub.name}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Product Area - Flexible */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <h1 className="text-2xl font-semibold text-gray-900 mb-6">{currentSubcategoryName}</h1>
              
              {/* Product Grid Placeholder */}
              <div className="grid grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="border border-gray-200 rounded-lg bg-white p-4">
                    <div className="aspect-square bg-gray-100 rounded mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-8 bg-[#8b7355] rounded"></div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
