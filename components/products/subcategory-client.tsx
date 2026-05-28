"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Package, Layers, Gift, Settings, Zap } from "lucide-react";
import { Header } from "@/components/layout/header";
import { QuoteForm } from "@/components/shared/quote-form";

// Selling points data
const sellingPoints = [
  { icon: Layers, title: "Low MOQ" },
  { icon: Gift, title: "Free Samples" },
  { icon: Settings, title: "Custom OEM/ODM" },
  { icon: Zap, title: "Fast Delivery" },
];

// Complete category structure - always fully expanded, never collapsed
const categoryStructure = {
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

// H1 titles and descriptions for each subcategory
const subcategoryMeta: Record<string, { h1: string; description: string }> = {
  "dinner-plates": {
    h1: "Ceramic Plates Wholesale For Restaurants, Hotels",
    description: "Explore our ceramic plates wholesale collection and find premium dinnerware for your catering business. We offer a variety of styles and sizes of ceramic plates wholesale, including dinner plates, salad plates and dessert plates, to suit different dining needs.",
  },
  "dessert-side-plates": {
    h1: "Wholesale Dessert & Side Plates | Ceramic Factory",
    description: "Browse our dessert and side plates collection, perfect for appetizers, desserts, and bread service. Quality ceramic plates available in bulk for restaurants and retailers.",
  },
  "soup-plates": {
    h1: "Wholesale Ceramic Soup Plates | Deep Rim Design",
    description: "Discover our ceramic soup plates with deep rim design, ideal for soups, pasta, and risotto. Premium quality wholesale soup plates for hotels and restaurants.",
  },
  "oval-serving-plates": {
    h1: "Wholesale Oval & Serving Plates | Ceramic Platters",
    description: "Shop our oval and serving plates collection for elegant food presentation. Ceramic platters and serving dishes available for wholesale buyers.",
  },
  "soup-bowls": {
    h1: "Wholesale Ceramic Soup Bowls | Factory Direct",
    description: "Premium ceramic soup bowls for restaurants and hotels. Deep bowls perfect for soups, stews, and chili. Bulk orders with custom options available.",
  },
  "salad-bowls": {
    h1: "Wholesale Ceramic Salad Bowls | All Sizes",
    description: "Ceramic salad bowls in various sizes for restaurants and catering. Wide shallow bowls ideal for salads, poke bowls, and grain bowls.",
  },
  "ramen-bowls": {
    h1: "Wholesale Ramen & Noodle Bowls | Large Deep Bowls",
    description: "Large ceramic ramen bowls and noodle bowls for Asian restaurants. Deep design perfect for ramen, pho, and noodle soups.",
  },
  "snack-bowls": {
    h1: "Wholesale Snack Bowls & Dip Bowls | Small Ceramic",
    description: "Small ceramic snack bowls and dip bowls for appetizers and condiments. Perfect for restaurants, bars, and catering services.",
  },
  "daily-tableware-sets": {
    h1: "Wholesale Daily Tableware Sets | Complete Dinnerware",
    description: "Complete daily tableware sets for home and restaurant use. Ceramic dinnerware sets including plates, bowls, and mugs at wholesale prices.",
  },
  "restaurant-catering-sets": {
    h1: "Restaurant & Catering Tableware Sets | Bulk Orders",
    description: "Professional tableware sets designed for restaurants and catering businesses. Durable ceramic sets with consistent quality for commercial use.",
  },
  "ceramic-mugs": {
    h1: "Wholesale Ceramic Mugs | Custom Coffee Mugs",
    description: "Classic ceramic coffee mugs for cafes, restaurants, and promotional use. Custom printing and OEM services available for bulk orders.",
  },
  "coffee-cups-saucers": {
    h1: "Wholesale Coffee Cups & Saucers | Espresso Sets",
    description: "Elegant coffee cups with matching saucers for cafes and hotels. Espresso cups, cappuccino cups, and tea cup sets at factory prices.",
  },
  "water-cups": {
    h1: "Wholesale Ceramic Water Cups | Simple & Elegant",
    description: "Simple ceramic water cups and juice cups for restaurants and events. Handleless design cups available in various sizes.",
  },
  "baking-dishes": {
    h1: "Wholesale Ceramic Baking Dishes | Oven Safe",
    description: "Oven-safe ceramic baking dishes for casseroles, lasagna, and roasting. Professional bakeware for restaurants and home use.",
  },
  "ramekins": {
    h1: "Wholesale Ceramic Ramekins | Souffle Dishes",
    description: "Small ceramic ramekins for individual portions. Perfect for creme brulee, souffle, and desserts. Available in 4oz and 8oz sizes.",
  },
  "pie-pizza-plates": {
    h1: "Wholesale Pie & Pizza Plates | Ceramic Bakeware",
    description: "Ceramic pie dishes and pizza plates for bakeries and restaurants. Round baking plates with various depths and sizes.",
  },
};

// Mock product data for each subcategory
const productsBySubcategory: Record<string, { id: string; name: string; slug: string; image: string }[]> = {
  "dinner-plates": [
    { id: "dp-1", name: "Classic White Dinner Plate 10.5\"", slug: "classic-white-dinner-plate", image: "" },
    { id: "dp-2", name: "Rimmed Dinner Plate 11\"", slug: "rimmed-dinner-plate", image: "" },
    { id: "dp-3", name: "Coupe Dinner Plate 10\"", slug: "coupe-dinner-plate", image: "" },
    { id: "dp-4", name: "Square Dinner Plate 10\"", slug: "square-dinner-plate", image: "" },
    { id: "dp-5", name: "Reactive Glaze Dinner Plate", slug: "reactive-glaze-dinner-plate", image: "" },
    { id: "dp-6", name: "Embossed Rim Dinner Plate", slug: "embossed-rim-dinner-plate", image: "" },
  ],
  "dessert-side-plates": [
    { id: "dsp-1", name: "White Dessert Plate 7\"", slug: "white-dessert-plate", image: "" },
    { id: "dsp-2", name: "Bread & Butter Plate 6\"", slug: "bread-butter-plate", image: "" },
    { id: "dsp-3", name: "Appetizer Plate 8\"", slug: "appetizer-plate", image: "" },
    { id: "dsp-4", name: "Gold Rim Side Plate", slug: "gold-rim-side-plate", image: "" },
  ],
  "soup-plates": [
    { id: "sp-1", name: "Deep Soup Plate 9\"", slug: "deep-soup-plate", image: "" },
    { id: "sp-2", name: "Rimmed Soup Bowl 8\"", slug: "rimmed-soup-bowl", image: "" },
    { id: "sp-3", name: "Pasta Plate 10\"", slug: "pasta-plate", image: "" },
    { id: "sp-4", name: "Wide Rim Soup Plate", slug: "wide-rim-soup-plate", image: "" },
  ],
  "oval-serving-plates": [
    { id: "osp-1", name: "Oval Platter 14\"", slug: "oval-platter-14", image: "" },
    { id: "osp-2", name: "Fish Plate 16\"", slug: "fish-plate-16", image: "" },
    { id: "osp-3", name: "Serving Platter 12\"", slug: "serving-platter-12", image: "" },
    { id: "osp-4", name: "Rectangular Serving Plate", slug: "rectangular-serving-plate", image: "" },
  ],
  "soup-bowls": [
    { id: "sb-1", name: "Classic Soup Bowl 6\"", slug: "classic-soup-bowl", image: "" },
    { id: "sb-2", name: "Deep Soup Bowl 7\"", slug: "deep-soup-bowl", image: "" },
    { id: "sb-3", name: "Handled Soup Bowl", slug: "handled-soup-bowl", image: "" },
    { id: "sb-4", name: "French Onion Soup Bowl", slug: "french-onion-soup-bowl", image: "" },
  ],
  "salad-bowls": [
    { id: "slb-1", name: "Individual Salad Bowl 7\"", slug: "individual-salad-bowl", image: "" },
    { id: "slb-2", name: "Large Salad Serving Bowl 10\"", slug: "large-salad-serving-bowl", image: "" },
    { id: "slb-3", name: "Shallow Salad Bowl", slug: "shallow-salad-bowl", image: "" },
  ],
  "ramen-bowls": [
    { id: "rb-1", name: "Large Ramen Bowl 8\"", slug: "large-ramen-bowl", image: "" },
    { id: "rb-2", name: "Pho Noodle Bowl 9\"", slug: "pho-noodle-bowl", image: "" },
    { id: "rb-3", name: "Japanese Style Ramen Bowl", slug: "japanese-style-ramen-bowl", image: "" },
    { id: "rb-4", name: "Double Handle Noodle Bowl", slug: "double-handle-noodle-bowl", image: "" },
  ],
  "snack-bowls": [
    { id: "snb-1", name: "Small Dip Bowl 4\"", slug: "small-dip-bowl", image: "" },
    { id: "snb-2", name: "Snack Bowl Set", slug: "snack-bowl-set", image: "" },
    { id: "snb-3", name: "Sauce Bowl 3\"", slug: "sauce-bowl", image: "" },
  ],
  "daily-tableware-sets": [
    { id: "dts-1", name: "16-Piece Dinnerware Set", slug: "16-piece-dinnerware-set", image: "" },
    { id: "dts-2", name: "12-Piece Starter Set", slug: "12-piece-starter-set", image: "" },
    { id: "dts-3", name: "20-Piece Family Set", slug: "20-piece-family-set", image: "" },
    { id: "dts-4", name: "4-Piece Place Setting", slug: "4-piece-place-setting", image: "" },
  ],
  "restaurant-catering-sets": [
    { id: "rcs-1", name: "Restaurant Starter Pack 50pcs", slug: "restaurant-starter-pack", image: "" },
    { id: "rcs-2", name: "Hotel Banquet Set 100pcs", slug: "hotel-banquet-set", image: "" },
    { id: "rcs-3", name: "Catering Service Set", slug: "catering-service-set", image: "" },
  ],
  "ceramic-mugs": [
    { id: "cm-1", name: "Classic Coffee Mug 12oz", slug: "classic-coffee-mug", image: "" },
    { id: "cm-2", name: "Large Latte Mug 16oz", slug: "large-latte-mug", image: "" },
    { id: "cm-3", name: "Stackable Mug 10oz", slug: "stackable-mug", image: "" },
    { id: "cm-4", name: "Custom Print Mug", slug: "custom-print-mug", image: "" },
    { id: "cm-5", name: "Reactive Glaze Mug", slug: "reactive-glaze-mug", image: "" },
  ],
  "coffee-cups-saucers": [
    { id: "ccs-1", name: "Espresso Cup & Saucer Set", slug: "espresso-cup-saucer-set", image: "" },
    { id: "ccs-2", name: "Cappuccino Cup & Saucer", slug: "cappuccino-cup-saucer", image: "" },
    { id: "ccs-3", name: "Tea Cup & Saucer Set", slug: "tea-cup-saucer-set", image: "" },
    { id: "ccs-4", name: "Demitasse Cup Set", slug: "demitasse-cup-set", image: "" },
  ],
  "water-cups": [
    { id: "wc-1", name: "Water Tumbler 8oz", slug: "water-tumbler", image: "" },
    { id: "wc-2", name: "Juice Cup 6oz", slug: "juice-cup", image: "" },
    { id: "wc-3", name: "Handleless Cup", slug: "handleless-cup", image: "" },
  ],
  "baking-dishes": [
    { id: "bd-1", name: "Rectangular Baking Dish 9x13\"", slug: "rectangular-baking-dish", image: "" },
    { id: "bd-2", name: "Square Casserole Dish 8\"", slug: "square-casserole-dish", image: "" },
    { id: "bd-3", name: "Oval Baking Dish 12\"", slug: "oval-baking-dish", image: "" },
    { id: "bd-4", name: "Deep Lasagna Pan", slug: "deep-lasagna-pan", image: "" },
  ],
  "ramekins": [
    { id: "rm-1", name: "Classic Ramekin 4oz", slug: "classic-ramekin-4oz", image: "" },
    { id: "rm-2", name: "Large Ramekin 8oz", slug: "large-ramekin-8oz", image: "" },
    { id: "rm-3", name: "Souffle Ramekin Set", slug: "souffle-ramekin-set", image: "" },
    { id: "rm-4", name: "Creme Brulee Dish", slug: "creme-brulee-dish", image: "" },
  ],
  "pie-pizza-plates": [
    { id: "ppp-1", name: "Pie Dish 9\"", slug: "pie-dish-9", image: "" },
    { id: "ppp-2", name: "Deep Dish Pie Plate 10\"", slug: "deep-dish-pie-plate", image: "" },
    { id: "ppp-3", name: "Pizza Stone 12\"", slug: "pizza-stone-12", image: "" },
    { id: "ppp-4", name: "Tart Pan 11\"", slug: "tart-pan-11", image: "" },
  ],
};

interface SubcategoryClientProps {
  primaryCategory: string;
  subcategory: string;
}

export function SubcategoryClient({ primaryCategory, subcategory }: SubcategoryClientProps) {
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'en';

  // Get products for current subcategory
  const products = productsBySubcategory[subcategory] || [];
  
  // Get current category info
  const currentCategory = categoryStructure[primaryCategory as keyof typeof categoryStructure];
  const currentSubcategoryName = currentCategory?.subcategories.find(sub => sub.slug === subcategory)?.name || subcategory;
  
  // Get H1 and description
  const meta = subcategoryMeta[subcategory] || {
    h1: currentSubcategoryName,
    description: "Browse our collection of premium ceramic products.",
  };

  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section - H1 Title, Description, Selling Points */}
      <section className="pt-32 pb-10 bg-[#f5f3ef]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6 flex-wrap">
            <Link href={`/${locale}`} className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4 flex-shrink-0" />
            <Link href={`/${locale}/products`} className="hover:text-foreground transition-colors">Products</Link>
            <ChevronRight className="w-4 h-4 flex-shrink-0" />
            <Link href={`/${locale}/products`} className="hover:text-foreground transition-colors">{currentCategory?.name}</Link>
            <ChevronRight className="w-4 h-4 flex-shrink-0" />
            <span className="text-foreground">{currentSubcategoryName}</span>
          </nav>

          {/* H1 Title */}
          <h1 className="text-3xl sm:text-4xl font-serif font-normal text-foreground mb-4">
            {meta.h1}
          </h1>
          
          {/* Description */}
          <p className="text-muted-foreground mb-10 max-w-4xl leading-relaxed">
            {meta.description}
          </p>

          {/* Selling Points - Same as main products page */}
          <div className="flex flex-wrap justify-center gap-8 sm:gap-12 lg:gap-16">
            {sellingPoints.map((point) => {
              const IconComponent = point.icon;
              return (
                <div key={point.title} className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full border-2 border-[#8b7355] flex items-center justify-center mb-3">
                    <IconComponent className="w-7 h-7 text-[#8b7355]" strokeWidth={1.5} />
                  </div>
                  <span className="text-sm font-medium text-[#1a1a1a]">{point.title}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Two-Column Layout: Sidebar + Product Grid */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Left Sidebar - Fixed Width, Tree Structure */}
            <aside className="w-full lg:w-64 flex-shrink-0">
              <div className="bg-white border border-[#e5e7eb] rounded-lg p-5 lg:sticky lg:top-28">
                <h2 className="text-lg font-semibold text-[#1a1a1a] mb-5 pb-3 border-b border-[#e5e7eb]">
                  Product Categories
                </h2>
                
                {/* Tree Structure - Always Fully Expanded */}
                <nav className="space-y-5">
                  {Object.entries(categoryStructure).map(([catId, category]) => (
                    <div key={catId}>
                      {/* Primary Category - Bold Dark Text */}
                      <div className="text-[15px] font-semibold text-[#1a1a1a] mb-2">
                        {category.name}
                      </div>
                      
                      {/* Subcategories - Indented, Lighter Color */}
                      <ul className="ml-3 space-y-1 border-l-2 border-[#e5e7eb] pl-3">
                        {category.subcategories.map((sub) => {
                          const isActive = catId === primaryCategory && sub.slug === subcategory;
                          return (
                            <li key={sub.slug}>
                              <Link
                                href={`/${locale}/products/${catId}/${sub.slug}`}
                                className={`block px-3 py-2 text-sm rounded transition-colors ${
                                  isActive
                                    ? "bg-[#8b7355] text-white font-medium"
                                    : "text-[#6b7280] hover:text-[#1a1a1a] hover:bg-[#f5f3ef]"
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

            {/* Right Content - Product Cards Grid */}
            <div className="flex-1 min-w-0">
              {products.length === 0 ? (
                <div className="text-center py-16 bg-[#f9fafb] rounded-lg">
                  <Package className="w-16 h-16 text-[#9ca3af] mx-auto mb-4 opacity-50" />
                  <p className="text-[#6b7280]">No products found in this category.</p>
                  <p className="text-sm text-[#9ca3af] mt-2">Check back soon for new arrivals.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {products.map((product) => (
                    <div
                      key={product.id}
                      className="group border border-[#e5e7eb] rounded-lg overflow-hidden bg-white hover:shadow-lg transition-all duration-200"
                    >
                      {/* Product Image */}
                      <div className="aspect-square relative bg-[#f9fafb]">
                        {product.image ? (
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Package className="w-16 h-16 text-[#9ca3af] opacity-30" />
                          </div>
                        )}
                      </div>
                      
                      {/* Product Info */}
                      <div className="p-5">
                        <h3 className="text-base font-medium text-[#1a1a1a] mb-4 line-clamp-2">
                          {product.name}
                        </h3>
                        <Link
                          href={`/${locale}/products/${primaryCategory}/${subcategory}/${product.slug}`}
                          className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-[#8b7355] rounded-md hover:bg-[#6d5a43] transition-colors"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Get in Touch Form */}
      <QuoteForm />
    </main>
  );
}
