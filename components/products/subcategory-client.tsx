"use client"

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, ChevronRight, Package } from "lucide-react";
import { Header } from "@/components/layout/header";
import { QuoteForm } from "@/components/shared/quote-form";

// 完整的分类结构数据
const categoryStructure = {
  plates: {
    name: "Wholesale Plates",
    subcategories: [
      { name: "Dinner Plates", slug: "dinner-plates", description: "Large plates for main courses, 10-12 inch diameter" },
      { name: "Dessert & Side Plates", slug: "dessert-side-plates", description: "Smaller plates for desserts and sides, 6-8 inch" },
      { name: "Soup Plates", slug: "soup-plates", description: "Deep rimmed plates for soups and pasta" },
      { name: "Oval & Serving Plates", slug: "oval-serving-plates", description: "Oval platters and serving plates for sharing" },
    ],
  },
  bowls: {
    name: "Wholesale Bowls",
    subcategories: [
      { name: "Soup Bowls", slug: "soup-bowls", description: "Deep bowls for soups and stews" },
      { name: "Salad Bowls", slug: "salad-bowls", description: "Wide shallow bowls for salads" },
      { name: "Ramen Bowls", slug: "ramen-bowls", description: "Large deep bowls for noodles and ramen" },
      { name: "Snack Bowls", slug: "snack-bowls", description: "Small bowls for snacks and dips" },
    ],
  },
  "dinnerware-sets": {
    name: "Wholesale Dinnerware Sets",
    subcategories: [
      { name: "Daily Tableware Sets", slug: "daily-tableware-sets", description: "Complete sets for everyday home use" },
      { name: "Restaurant & Catering Sets", slug: "restaurant-catering-sets", description: "Durable sets for commercial use" },
    ],
  },
  "cups-mugs": {
    name: "Wholesale Cups & Mugs",
    subcategories: [
      { name: "Ceramic Mugs", slug: "ceramic-mugs", description: "Classic ceramic mugs for coffee and tea" },
      { name: "Coffee Cups & Saucers", slug: "coffee-cups-saucers", description: "Elegant cups with matching saucers" },
      { name: "Water Cups", slug: "water-cups", description: "Simple cups for water and beverages" },
    ],
  },
  bakeware: {
    name: "Wholesale Bakeware",
    subcategories: [
      { name: "Baking Dishes", slug: "baking-dishes", description: "Oven-safe dishes for casseroles and baking" },
      { name: "Ramekins", slug: "ramekins", description: "Small individual baking dishes" },
      { name: "Pie & Pizza Plates", slug: "pie-pizza-plates", description: "Round plates for pies and pizzas" },
    ],
  },
};

// 模拟产品数据（每个二级分类下的产品）
const productsBySubcategory: Record<string, { id: string; name: string; slug: string; image: string; price?: number }[]> = {
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
  
  // 控制侧边栏的展开状态
  const [expandedCategories, setExpandedCategories] = useState<string[]>([primaryCategory]);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  // 获取当前二级分类的产品
  const products = productsBySubcategory[subcategory] || [];
  
  // 获取当前二级分类的信息
  const currentCategory = categoryStructure[primaryCategory as keyof typeof categoryStructure];
  const currentSubcategory = currentCategory?.subcategories.find(sub => sub.slug === subcategory);

  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      {/* Breadcrumb */}
      <section className="pt-28 pb-4 bg-[#f5f3ef]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href={`/${locale}`} className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href={`/${locale}/products`} className="hover:text-foreground transition-colors">Products</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href={`/${locale}/products`} className="hover:text-foreground transition-colors">{currentCategory?.name}</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground">{currentSubcategory?.name}</span>
          </nav>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Sidebar */}
            <aside className="w-full lg:w-72 flex-shrink-0">
              <div className="bg-white border border-[#e5e7eb] rounded-lg p-4 sticky top-28">
                <h2 className="text-lg font-semibold text-[#1a1a1a] mb-4">Product Categories</h2>
                
                <div className="space-y-1">
                  {Object.entries(categoryStructure).map(([catId, category]) => (
                    <div key={catId}>
                      {/* Primary Category Header */}
                      <button
                        onClick={() => toggleCategory(catId)}
                        className={`w-full flex items-center justify-between px-3 py-2.5 text-sm font-medium rounded-md transition-colors ${
                          catId === primaryCategory
                            ? "bg-[#8b7355]/10 text-[#8b7355]"
                            : "text-[#4b5563] hover:bg-[#f5f3ef]"
                        }`}
                      >
                        <span>{category.name}</span>
                        <ChevronDown 
                          className={`w-4 h-4 transition-transform ${
                            expandedCategories.includes(catId) ? "rotate-180" : ""
                          }`} 
                        />
                      </button>
                      
                      {/* Subcategories */}
                      {expandedCategories.includes(catId) && (
                        <div className="ml-3 mt-1 space-y-0.5 border-l border-[#e5e7eb] pl-3">
                          {category.subcategories.map((sub) => (
                            <Link
                              key={sub.slug}
                              href={`/${locale}/products/${catId}/${sub.slug}`}
                              className={`block px-3 py-2 text-sm rounded-md transition-colors ${
                                sub.slug === subcategory
                                  ? "bg-[#8b7355] text-white font-medium"
                                  : "text-[#6b7280] hover:text-[#1a1a1a] hover:bg-[#f5f3ef]"
                              }`}
                            >
                              {sub.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </aside>

            {/* Right Content - Product Grid */}
            <div className="flex-1">
              {/* Category Header */}
              <div className="mb-8">
                <h1 className="text-2xl md:text-3xl font-serif font-semibold text-[#1a1a1a] mb-2">
                  {currentSubcategory?.name}
                </h1>
                {currentSubcategory?.description && (
                  <p className="text-[#6b7280]">{currentSubcategory.description}</p>
                )}
              </div>

              {/* Product Grid */}
              {products.length === 0 ? (
                <div className="text-center py-16 bg-[#f9fafb] rounded-lg">
                  <Package className="w-16 h-16 text-[#9ca3af] mx-auto mb-4 opacity-50" />
                  <p className="text-[#6b7280]">No products found in this category.</p>
                  <p className="text-sm text-[#9ca3af] mt-2">Check back soon for new arrivals.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((product) => (
                    <Link
                      key={product.id}
                      href={`/${locale}/products/${primaryCategory}/${subcategory}/${product.slug}`}
                      className="group bg-white border border-[#e5e7eb] rounded-lg overflow-hidden hover:shadow-lg transition-all"
                    >
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
                      <div className="p-4">
                        <h3 className="text-base font-medium text-[#1a1a1a] group-hover:text-[#8b7355] transition-colors line-clamp-2">
                          {product.name}
                        </h3>
                        {product.price && (
                          <p className="text-[#8b7355] font-semibold mt-2">${product.price.toFixed(2)}</p>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Get in Touch */}
      <QuoteForm />
    </main>
  );
}
