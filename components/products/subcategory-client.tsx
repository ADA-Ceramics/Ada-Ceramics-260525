"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Package, Layers, Gift, Settings, Zap } from "lucide-react";
import { Header } from "@/components/layout/header";

// Selling points - reuse from main products page
const sellingPoints = [
  { icon: Layers, title: "Low MOQ" },
  { icon: Gift, title: "Free Samples" },
  { icon: Settings, title: "Custom OEM/ODM" },
  { icon: Zap, title: "Fast Delivery" },
];

// Category structure - fully expanded tree, no collapsing
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

// H1 and descriptions for SEO
const subcategoryMeta: Record<string, { h1: string; description: string }> = {
  "dinner-plates": {
    h1: "Ceramic Plates Wholesale For Restaurants, Hotels",
    description: "Explore our ceramic plates wholesale collection and find premium dinnerware for your catering business. We offer a variety of styles and sizes of ceramic plates wholesale, including dinner plates, salad plates and dessert plates, to suit different dining needs.",
  },
  "dessert-side-plates": {
    h1: "Wholesale Dessert & Side Plates | Ceramic Factory",
    description: "Browse our dessert and side plates collection, perfect for appetizers, desserts, and bread service.",
  },
  "soup-plates": {
    h1: "Wholesale Ceramic Soup Plates | Deep Rim Design",
    description: "Discover our ceramic soup plates with deep rim design, ideal for soups, pasta, and risotto.",
  },
  "oval-serving-plates": {
    h1: "Wholesale Oval & Serving Plates | Ceramic Platters",
    description: "Shop our oval and serving plates collection for elegant food presentation.",
  },
  "soup-bowls": {
    h1: "Wholesale Ceramic Soup Bowls | Factory Direct",
    description: "Premium ceramic soup bowls for restaurants and hotels.",
  },
  "salad-bowls": {
    h1: "Wholesale Ceramic Salad Bowls | All Sizes",
    description: "Ceramic salad bowls in various sizes for restaurants and catering.",
  },
  "ramen-bowls": {
    h1: "Wholesale Ramen & Noodle Bowls | Large Deep Bowls",
    description: "Large ceramic ramen bowls and noodle bowls for Asian restaurants.",
  },
  "snack-bowls": {
    h1: "Wholesale Snack Bowls & Dip Bowls | Small Ceramic",
    description: "Small ceramic snack bowls and dip bowls for appetizers.",
  },
  "daily-tableware-sets": {
    h1: "Wholesale Daily Tableware Sets | Complete Dinnerware",
    description: "Complete daily tableware sets for home and restaurant use.",
  },
  "restaurant-catering-sets": {
    h1: "Restaurant & Catering Tableware Sets | Bulk Orders",
    description: "Professional tableware sets designed for restaurants and catering.",
  },
  "ceramic-mugs": {
    h1: "Wholesale Ceramic Mugs | Custom Coffee Mugs",
    description: "Classic ceramic coffee mugs for cafes, restaurants, and promotional use.",
  },
  "coffee-cups-saucers": {
    h1: "Wholesale Coffee Cups & Saucers | Espresso Sets",
    description: "Elegant coffee cups with matching saucers for cafes and hotels.",
  },
  "water-cups": {
    h1: "Wholesale Ceramic Water Cups | Simple & Elegant",
    description: "Simple ceramic water cups and juice cups for restaurants.",
  },
  "baking-dishes": {
    h1: "Wholesale Ceramic Baking Dishes | Oven Safe",
    description: "Oven-safe ceramic baking dishes for casseroles and roasting.",
  },
  "ramekins": {
    h1: "Wholesale Ceramic Ramekins | Souffle Dishes",
    description: "Small ceramic ramekins for individual portions.",
  },
  "pie-pizza-plates": {
    h1: "Wholesale Pie & Pizza Plates | Ceramic Bakeware",
    description: "Ceramic pie dishes and pizza plates for bakeries and restaurants.",
  },
};

// Mock products per subcategory
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
  const meta = subcategoryMeta[subcategory] || { h1: currentSubcategoryName, description: "" };
  const products = productsBySubcategory[subcategory] || [];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero: Breadcrumb + H1 + Description + Selling Points */}
      <section className="pt-28 pb-8 bg-[#f5f3ef]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex flex-wrap items-center gap-2 text-sm text-gray-500 mb-6">
            <Link href={`/${locale}`} className="hover:text-gray-900">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href={`/${locale}/products`} className="hover:text-gray-900">Products</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href={`/${locale}/products`} className="hover:text-gray-900">{currentCategory?.name}</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900">{currentSubcategoryName}</span>
          </nav>

          {/* H1 */}
          <h1 className="text-3xl sm:text-4xl font-serif text-gray-900 mb-4">
            {meta.h1}
          </h1>

          {/* Description */}
          <p className="text-gray-600 mb-8 max-w-3xl leading-relaxed">
            {meta.description}
          </p>

          {/* Selling Points */}
          <div className="flex flex-wrap justify-center gap-8 sm:gap-12">
            {sellingPoints.map((point) => {
              const Icon = point.icon;
              return (
                <div key={point.title} className="flex flex-col items-center">
                  <div className="w-14 h-14 rounded-full border-2 border-[#8b7355] flex items-center justify-center mb-2">
                    <Icon className="w-6 h-6 text-[#8b7355]" strokeWidth={1.5} />
                  </div>
                  <span className="text-sm font-medium text-gray-900">{point.title}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main: Two-Column Layout */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">

            {/* LEFT: Sidebar - Fixed 240px width on desktop */}
            <aside className="w-full lg:w-60 shrink-0">
              <div className="border border-gray-200 rounded-lg p-4 bg-white lg:sticky lg:top-24">
                <h2 className="text-base font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                  Categories
                </h2>
                <nav className="space-y-4">
                  {Object.entries(categoryStructure).map(([catKey, cat]) => (
                    <div key={catKey}>
                      {/* Primary category - bold */}
                      <div className="text-sm font-semibold text-gray-900 mb-1">
                        {cat.name}
                      </div>
                      {/* Subcategories - indented with left border */}
                      <ul className="ml-2 pl-3 border-l-2 border-gray-200 space-y-1">
                        {cat.subcategories.map((sub) => {
                          const isActive = catKey === primaryCategory && sub.slug === subcategory;
                          return (
                            <li key={sub.slug}>
                              <Link
                                href={`/${locale}/products/${catKey}/${sub.slug}`}
                                className={`block py-1.5 px-2 text-sm rounded transition-colors ${
                                  isActive
                                    ? "bg-[#8b7355] text-white font-medium"
                                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
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

            {/* RIGHT: Product Grid - Flexible width */}
            <main className="flex-1 min-w-0">
              {products.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 bg-gray-50 rounded-lg">
                  <Package className="w-12 h-12 text-gray-300 mb-4" />
                  <p className="text-gray-500">No products found in this category.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {products.map((product) => (
                    <div
                      key={product.id}
                      className="border border-gray-200 rounded-lg overflow-hidden bg-white hover:shadow-md transition-shadow"
                    >
                      {/* Image placeholder */}
                      <div className="aspect-square bg-gray-100 flex items-center justify-center">
                        <Package className="w-12 h-12 text-gray-300" />
                      </div>
                      {/* Product info */}
                      <div className="p-4">
                        <h3 className="text-sm font-medium text-gray-900 mb-3 line-clamp-2">
                          {product.name}
                        </h3>
                        <Link
                          href={`/${locale}/products/${primaryCategory}/${subcategory}/${product.slug}`}
                          className="inline-block px-4 py-2 text-sm font-medium text-white bg-[#8b7355] rounded hover:bg-[#6d5a43] transition-colors"
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
