"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Package } from "lucide-react";
import { Header } from "@/components/layout/header";

// Category structure - fully expanded tree
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

// Mock products
const productsBySubcategory: Record<string, { id: string; name: string; slug: string }[]> = {
  "dinner-plates": [
    { id: "dp-1", name: "Classic White Dinner Plate 10.5\"", slug: "classic-white-dinner-plate" },
    { id: "dp-2", name: "Rimmed Dinner Plate 11\"", slug: "rimmed-dinner-plate" },
    { id: "dp-3", name: "Coupe Dinner Plate 10\"", slug: "coupe-dinner-plate" },
    { id: "dp-4", name: "Square Dinner Plate 10\"", slug: "square-dinner-plate" },
  ],
  "dessert-side-plates": [
    { id: "dsp-1", name: "White Dessert Plate 7\"", slug: "white-dessert-plate" },
    { id: "dsp-2", name: "Bread & Butter Plate 6\"", slug: "bread-butter-plate" },
  ],
  "soup-plates": [
    { id: "sp-1", name: "Deep Soup Plate 9\"", slug: "deep-soup-plate" },
    { id: "sp-2", name: "Pasta Plate 10\"", slug: "pasta-plate" },
  ],
  "oval-serving-plates": [
    { id: "osp-1", name: "Oval Platter 14\"", slug: "oval-platter-14" },
    { id: "osp-2", name: "Fish Plate 16\"", slug: "fish-plate-16" },
  ],
  "soup-bowls": [
    { id: "sb-1", name: "Classic Soup Bowl 6\"", slug: "classic-soup-bowl" },
    { id: "sb-2", name: "Deep Soup Bowl 7\"", slug: "deep-soup-bowl" },
  ],
  "salad-bowls": [
    { id: "slb-1", name: "Individual Salad Bowl 7\"", slug: "individual-salad-bowl" },
    { id: "slb-2", name: "Large Salad Bowl 10\"", slug: "large-salad-bowl" },
  ],
  "ramen-bowls": [
    { id: "rb-1", name: "Large Ramen Bowl 8\"", slug: "large-ramen-bowl" },
    { id: "rb-2", name: "Pho Noodle Bowl 9\"", slug: "pho-noodle-bowl" },
  ],
  "snack-bowls": [
    { id: "snb-1", name: "Small Dip Bowl 4\"", slug: "small-dip-bowl" },
    { id: "snb-2", name: "Sauce Bowl 3\"", slug: "sauce-bowl" },
  ],
  "daily-tableware-sets": [
    { id: "dts-1", name: "16-Piece Dinnerware Set", slug: "16-piece-dinnerware-set" },
    { id: "dts-2", name: "12-Piece Starter Set", slug: "12-piece-starter-set" },
  ],
  "restaurant-catering-sets": [
    { id: "rcs-1", name: "Restaurant Starter Pack 50pcs", slug: "restaurant-starter-pack" },
    { id: "rcs-2", name: "Hotel Banquet Set 100pcs", slug: "hotel-banquet-set" },
  ],
  "ceramic-mugs": [
    { id: "cm-1", name: "Classic Coffee Mug 12oz", slug: "classic-coffee-mug" },
    { id: "cm-2", name: "Large Latte Mug 16oz", slug: "large-latte-mug" },
  ],
  "coffee-cups-saucers": [
    { id: "ccs-1", name: "Espresso Cup & Saucer Set", slug: "espresso-cup-saucer-set" },
    { id: "ccs-2", name: "Cappuccino Cup & Saucer", slug: "cappuccino-cup-saucer" },
  ],
  "water-cups": [
    { id: "wc-1", name: "Water Tumbler 8oz", slug: "water-tumbler" },
    { id: "wc-2", name: "Juice Cup 6oz", slug: "juice-cup" },
  ],
  "baking-dishes": [
    { id: "bd-1", name: "Rectangular Baking Dish 9x13\"", slug: "rectangular-baking-dish" },
    { id: "bd-2", name: "Square Casserole Dish 8\"", slug: "square-casserole-dish" },
  ],
  "ramekins": [
    { id: "rm-1", name: "Classic Ramekin 4oz", slug: "classic-ramekin-4oz" },
    { id: "rm-2", name: "Large Ramekin 8oz", slug: "large-ramekin-8oz" },
  ],
  "pie-pizza-plates": [
    { id: "ppp-1", name: "Pie Dish 9\"", slug: "pie-dish-9" },
    { id: "ppp-2", name: "Pizza Stone 12\"", slug: "pizza-stone-12" },
  ],
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
  const products = productsBySubcategory[subcategory] || [];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Breadcrumb */}
      <section className="pt-28 pb-4 bg-[#f5f3ef]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
            <Link href={`/${locale}`} className="hover:text-gray-900">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href={`/${locale}/products`} className="hover:text-gray-900">Products</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900">{currentSubcategoryName}</span>
          </nav>
        </div>
      </section>

      {/* Two-Column Layout */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div style={{ display: "flex", gap: "32px" }}>

            {/* LEFT SIDEBAR - Fixed 250px */}
            <aside style={{ width: "250px", flexShrink: 0 }}>
              <div className="border border-gray-200 rounded-lg p-4 bg-white sticky top-24">
                <h2 className="text-base font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                  Categories
                </h2>
                <nav className="space-y-4">
                  {Object.entries(categoryStructure).map(([catKey, cat]) => (
                    <div key={catKey}>
                      <div className="text-sm font-bold text-gray-900 mb-2">
                        {cat.name}
                      </div>
                      <ul className="ml-3 pl-3 border-l-2 border-gray-200 space-y-1">
                        {cat.subcategories.map((sub) => {
                          const isActive = catKey === primaryCategory && sub.slug === subcategory;
                          return (
                            <li key={sub.slug}>
                              <Link
                                href={`/${locale}/products/${catKey}/${sub.slug}`}
                                className={`block py-1.5 px-2 text-sm rounded ${
                                  isActive
                                    ? "bg-[#8b7355] text-white"
                                    : "text-gray-600 hover:bg-gray-100"
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
                </nav>
              </div>
            </aside>

            {/* RIGHT PRODUCT AREA - Flexible */}
            <main style={{ flex: 1, minWidth: 0 }}>
              <h1 className="text-2xl font-semibold text-gray-900 mb-6">
                {currentSubcategoryName}
              </h1>
              
              {products.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 bg-gray-50 rounded-lg">
                  <Package className="w-12 h-12 text-gray-300 mb-4" />
                  <p className="text-gray-500">No products found.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((product) => (
                    <div
                      key={product.id}
                      className="border border-gray-200 rounded-lg overflow-hidden bg-white hover:shadow-md transition-shadow"
                    >
                      <div className="aspect-square bg-gray-100 flex items-center justify-center">
                        <Package className="w-12 h-12 text-gray-300" />
                      </div>
                      <div className="p-4">
                        <h3 className="text-sm font-medium text-gray-900 mb-3">
                          {product.name}
                        </h3>
                        <Link
                          href={`/${locale}/products/${primaryCategory}/${subcategory}/${product.slug}`}
                          className="inline-block px-4 py-2 text-sm text-white bg-[#8b7355] rounded hover:bg-[#6d5a43] transition-colors"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </main>

          </div>
        </div>
      </section>
    </div>
  );
}
