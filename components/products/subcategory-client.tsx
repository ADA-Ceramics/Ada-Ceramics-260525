"use client"

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

interface SubcategoryClientProps {
  primaryCategory: string;
  subcategory: string;
}

export function SubcategoryClient({ primaryCategory, subcategory }: SubcategoryClientProps) {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          
          {/* Two Column Layout */}
          <div style={{ display: "flex", gap: "32px" }}>
            
            {/* Left Sidebar - Fixed 250px */}
            <aside style={{ width: "250px", flexShrink: 0 }}>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h2 className="font-semibold text-gray-900 mb-4 text-base">Categories</h2>
                
                {/* Wholesale Plates */}
                <div className="mb-4">
                  <div className="font-bold text-gray-900 text-sm mb-2">Wholesale Plates</div>
                  <ul className="ml-3 border-l-2 border-gray-300 pl-3 space-y-1">
                    <li><span className={`block py-1 px-2 text-sm rounded ${primaryCategory === "plates" && subcategory === "dinner-plates" ? "bg-[#8b7355] text-white" : "text-gray-600"}`}>Dinner Plates</span></li>
                    <li><span className={`block py-1 px-2 text-sm rounded ${primaryCategory === "plates" && subcategory === "dessert-side-plates" ? "bg-[#8b7355] text-white" : "text-gray-600"}`}>Dessert & Side Plates</span></li>
                    <li><span className={`block py-1 px-2 text-sm rounded ${primaryCategory === "plates" && subcategory === "soup-plates" ? "bg-[#8b7355] text-white" : "text-gray-600"}`}>Soup Plates</span></li>
                    <li><span className={`block py-1 px-2 text-sm rounded ${primaryCategory === "plates" && subcategory === "oval-serving-plates" ? "bg-[#8b7355] text-white" : "text-gray-600"}`}>Oval & Serving Plates</span></li>
                  </ul>
                </div>

                {/* Wholesale Bowls */}
                <div className="mb-4">
                  <div className="font-bold text-gray-900 text-sm mb-2">Wholesale Bowls</div>
                  <ul className="ml-3 border-l-2 border-gray-300 pl-3 space-y-1">
                    <li><span className={`block py-1 px-2 text-sm rounded ${primaryCategory === "bowls" && subcategory === "soup-bowls" ? "bg-[#8b7355] text-white" : "text-gray-600"}`}>Soup Bowls</span></li>
                    <li><span className={`block py-1 px-2 text-sm rounded ${primaryCategory === "bowls" && subcategory === "salad-bowls" ? "bg-[#8b7355] text-white" : "text-gray-600"}`}>Salad Bowls</span></li>
                    <li><span className={`block py-1 px-2 text-sm rounded ${primaryCategory === "bowls" && subcategory === "ramen-bowls" ? "bg-[#8b7355] text-white" : "text-gray-600"}`}>Ramen Bowls</span></li>
                    <li><span className={`block py-1 px-2 text-sm rounded ${primaryCategory === "bowls" && subcategory === "snack-bowls" ? "bg-[#8b7355] text-white" : "text-gray-600"}`}>Snack Bowls</span></li>
                  </ul>
                </div>

                {/* Wholesale Dinnerware Sets */}
                <div className="mb-4">
                  <div className="font-bold text-gray-900 text-sm mb-2">Wholesale Dinnerware Sets</div>
                  <ul className="ml-3 border-l-2 border-gray-300 pl-3 space-y-1">
                    <li><span className={`block py-1 px-2 text-sm rounded ${primaryCategory === "dinnerware-sets" && subcategory === "daily-tableware-sets" ? "bg-[#8b7355] text-white" : "text-gray-600"}`}>Daily Tableware Sets</span></li>
                    <li><span className={`block py-1 px-2 text-sm rounded ${primaryCategory === "dinnerware-sets" && subcategory === "restaurant-catering-sets" ? "bg-[#8b7355] text-white" : "text-gray-600"}`}>Restaurant & Catering Sets</span></li>
                  </ul>
                </div>

                {/* Wholesale Cups & Mugs */}
                <div className="mb-4">
                  <div className="font-bold text-gray-900 text-sm mb-2">Wholesale Cups & Mugs</div>
                  <ul className="ml-3 border-l-2 border-gray-300 pl-3 space-y-1">
                    <li><span className={`block py-1 px-2 text-sm rounded ${primaryCategory === "cups-mugs" && subcategory === "ceramic-mugs" ? "bg-[#8b7355] text-white" : "text-gray-600"}`}>Ceramic Mugs</span></li>
                    <li><span className={`block py-1 px-2 text-sm rounded ${primaryCategory === "cups-mugs" && subcategory === "coffee-cups-saucers" ? "bg-[#8b7355] text-white" : "text-gray-600"}`}>Coffee Cups & Saucers</span></li>
                    <li><span className={`block py-1 px-2 text-sm rounded ${primaryCategory === "cups-mugs" && subcategory === "water-cups" ? "bg-[#8b7355] text-white" : "text-gray-600"}`}>Water Cups</span></li>
                  </ul>
                </div>

                {/* Wholesale Bakeware */}
                <div className="mb-4">
                  <div className="font-bold text-gray-900 text-sm mb-2">Wholesale Bakeware</div>
                  <ul className="ml-3 border-l-2 border-gray-300 pl-3 space-y-1">
                    <li><span className={`block py-1 px-2 text-sm rounded ${primaryCategory === "bakeware" && subcategory === "baking-dishes" ? "bg-[#8b7355] text-white" : "text-gray-600"}`}>Baking Dishes</span></li>
                    <li><span className={`block py-1 px-2 text-sm rounded ${primaryCategory === "bakeware" && subcategory === "ramekins" ? "bg-[#8b7355] text-white" : "text-gray-600"}`}>Ramekins</span></li>
                    <li><span className={`block py-1 px-2 text-sm rounded ${primaryCategory === "bakeware" && subcategory === "pie-pizza-plates" ? "bg-[#8b7355] text-white" : "text-gray-600"}`}>Pie & Pizza Plates</span></li>
                  </ul>
                </div>
              </div>
            </aside>

            {/* Right Product Area - Flexible */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <h1 className="text-2xl font-semibold text-gray-900 mb-6">
                {subcategory.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}
              </h1>
              
              {/* Static Product Grid - No Links */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="border border-gray-200 rounded-lg bg-white overflow-hidden">
                    <div className="aspect-square bg-gray-100"></div>
                    <div className="p-4">
                      <div className="h-4 bg-gray-200 rounded mb-3 w-3/4"></div>
                      <div className="h-10 bg-[#8b7355] rounded"></div>
                    </div>
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
