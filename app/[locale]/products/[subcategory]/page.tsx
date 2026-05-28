"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { ChevronRight, ChevronDown, Package } from "lucide-react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

// ============================================================
// 【保留原 Supabase 数据调用结构 - 等布局确认后联调】
// ============================================================
// import { notFound } from "next/navigation"
// import { getProductsByCategory } from "@/lib/supabase/products"
// import { CATEGORY_INFO, type Product } from "@/lib/supabase/types"
//
// interface PageProps {
//   params: Promise<{ subcategory: string; locale: string }>
// }
//
// export async function generateMetadata({ params }: PageProps) {
//   const { subcategory } = await params
//   const categoryInfo = CATEGORY_INFO[subcategory]
//   
//   if (!categoryInfo) {
//     return { title: "Category Not Found | ADA Ceramics" }
//   }
//
//   return {
//     title: `${categoryInfo.name} | ADA Ceramics`,
//     description: `Wholesale high-quality ${categoryInfo.name} ceramic tableware. Bulk orders & custom OEM/ODM available.`,
//   }
// }
//
// export default async function SubcategoryPage({ params }: PageProps) {
//   const { subcategory: categorySlug, locale } = await params
//   const products = await getProductsByCategory(categorySlug)
//   const categoryInfo = CATEGORY_INFO[categorySlug]
//
//   if (!categoryInfo) {
//     notFound()
//   }
//   // ... 使用 products 数据渲染
// }
// ============================================================

// 树状分类数据结构
const categoryTree = [
  {
    id: "plates",
    name: "Wholesale Plates",
    slug: "plates",
    children: [
      { id: "dinner-plates", name: "Dinner Plates", slug: "dinner-plates" },
      { id: "dessert-side-plates", name: "Dessert & Side Plates", slug: "dessert-side-plates" },
      { id: "soup-plates", name: "Soup Plates", slug: "soup-plates" },
      { id: "oval-serving-plates", name: "Oval & Serving Plates", slug: "oval-serving-plates" },
    ],
  },
  {
    id: "bowls",
    name: "Wholesale Bowls",
    slug: "bowls",
    children: [
      { id: "soup-bowls", name: "Soup Bowls", slug: "soup-bowls" },
      { id: "salad-bowls", name: "Salad Bowls", slug: "salad-bowls" },
      { id: "ramen-bowls", name: "Ramen Bowls", slug: "ramen-bowls" },
      { id: "snack-bowls", name: "Snack Bowls", slug: "snack-bowls" },
    ],
  },
  {
    id: "dinnerware-sets",
    name: "Wholesale Dinnerware Sets",
    slug: "dinnerware-sets",
    children: [
      { id: "daily-tableware-sets", name: "Daily Tableware Sets", slug: "daily-tableware-sets" },
      { id: "restaurant-catering-sets", name: "Restaurant & Catering Sets", slug: "restaurant-catering-sets" },
    ],
  },
  {
    id: "cups-mugs",
    name: "Wholesale Cups & Mugs",
    slug: "cups-mugs",
    children: [
      { id: "ceramic-mugs", name: "Ceramic Mugs", slug: "ceramic-mugs" },
      { id: "coffee-cups-saucers", name: "Coffee Cups & Saucers", slug: "coffee-cups-saucers" },
      { id: "water-cups", name: "Water Cups", slug: "water-cups" },
    ],
  },
  {
    id: "bakeware",
    name: "Wholesale Bakeware",
    slug: "bakeware",
    children: [
      { id: "baking-dishes", name: "Baking Dishes", slug: "baking-dishes" },
      { id: "ramekins", name: "Ramekins", slug: "ramekins" },
      { id: "pie-pizza-plates", name: "Pie & Pizza Plates", slug: "pie-pizza-plates" },
    ],
  },
]

// 静态占位产品数据（联调时替换为 Supabase 数据）
const placeholderProducts = [
  { id: 1, name: "Classic Round Plate", sku: "CRP-001", slug: "classic-round-plate" },
  { id: 2, name: "Elegant Rim Plate", sku: "ERP-002", slug: "elegant-rim-plate" },
  { id: 3, name: "Coupe Style Plate", sku: "CSP-003", slug: "coupe-style-plate" },
  { id: 4, name: "Square Modern Plate", sku: "SMP-004", slug: "square-modern-plate" },
  { id: 5, name: "Oval Serving Platter", sku: "OSP-005", slug: "oval-serving-platter" },
  { id: 6, name: "Deep Soup Plate", sku: "DSP-006", slug: "deep-soup-plate" },
  { id: 7, name: "Dessert Side Plate", sku: "DSP-007", slug: "dessert-side-plate" },
  { id: 8, name: "Charger Plate Large", sku: "CPL-008", slug: "charger-plate-large" },
]

export default function SubcategoryPage() {
  const pathname = usePathname()
  const locale = pathname.split('/')[1] || 'en'
  const currentSubcategory = pathname.split('/')[3] || ''
  
  // 展开状态管理
  const [expandedCategories, setExpandedCategories] = useState<string[]>(
    categoryTree.map(cat => cat.id) // 默认全部展开
  )

  // 切换展开/折叠
  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    )
  }

  // 查找当前分类信息
  const findCurrentCategory = () => {
    for (const parent of categoryTree) {
      if (parent.slug === currentSubcategory) {
        return { parent, child: null }
      }
      const child = parent.children.find(c => c.slug === currentSubcategory)
      if (child) {
        return { parent, child }
      }
    }
    return { parent: categoryTree[0], child: null }
  }

  const { parent: currentParent, child: currentChild } = findCurrentCategory()
  const displayName = currentChild?.name || currentParent?.name || "All Products"

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Breadcrumb */}
      <section className="pt-28 pb-4 bg-[#f5f3ef]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href={`/${locale}`} className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href={`/${locale}/products/category`} className="hover:text-foreground transition-colors">Products</Link>
            <ChevronRight className="w-4 h-4" />
            {currentChild ? (
              <>
                <Link href={`/${locale}/products/${currentParent.slug}`} className="hover:text-foreground transition-colors">
                  {currentParent.name}
                </Link>
                <ChevronRight className="w-4 h-4" />
                <span className="text-foreground">{currentChild.name}</span>
              </>
            ) : (
              <span className="text-foreground">{displayName}</span>
            )}
          </nav>
        </div>
      </section>

      {/* Main Content: Two Column Layout */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Left Sidebar - Category Tree */}
            <aside className="w-full lg:w-72 flex-shrink-0">
              <div className="lg:sticky lg:top-28 bg-[#f9fafb] rounded-lg border border-[#e5e7eb] p-4">
                <h2 className="text-lg font-semibold text-[#1a1a1a] mb-4 pb-3 border-b border-[#e5e7eb]">
                  Product Categories
                </h2>
                <nav className="space-y-1">
                  {categoryTree.map((category) => {
                    const isExpanded = expandedCategories.includes(category.id)
                    const isParentActive = currentParent?.id === category.id
                    
                    return (
                      <div key={category.id}>
                        {/* Parent Category */}
                        <div className="flex items-center">
                          <button
                            onClick={() => toggleCategory(category.id)}
                            className="p-1 hover:bg-[#e5e1db] rounded transition-colors"
                          >
                            <ChevronDown
                              className={`w-4 h-4 text-[#6b7280] transition-transform ${
                                isExpanded ? "" : "-rotate-90"
                              }`}
                            />
                          </button>
                          <Link
                            href={`/${locale}/products/${category.slug}`}
                            className={`flex-1 py-2 px-2 text-sm font-medium rounded transition-colors ${
                              isParentActive && !currentChild
                                ? "text-[#8b7355] bg-[#8b7355]/10"
                                : "text-[#1a1a1a] hover:text-[#8b7355] hover:bg-[#f5f3ef]"
                            }`}
                          >
                            {category.name}
                          </Link>
                        </div>
                        
                        {/* Children */}
                        {isExpanded && (
                          <div className="ml-6 mt-1 space-y-1">
                            {category.children.map((child) => {
                              const isChildActive = currentChild?.id === child.id
                              return (
                                <Link
                                  key={child.id}
                                  href={`/${locale}/products/${child.slug}`}
                                  className={`block py-2 px-3 text-sm rounded transition-colors ${
                                    isChildActive
                                      ? "text-[#8b7355] bg-[#8b7355]/10 font-medium"
                                      : "text-[#6b7280] hover:text-[#8b7355] hover:bg-[#f5f3ef]"
                                  }`}
                                >
                                  {child.name}
                                </Link>
                              )
                            })}
                          </div>
                        )}
                      </div>
                    )
                  })}
                </nav>
              </div>
            </aside>

            {/* Right Content - Product Grid */}
            <main className="flex-1">
              {/* Category Header */}
              <div className="mb-8">
                <h1 className="text-2xl md:text-3xl font-serif font-normal text-[#1a1a1a] mb-2">
                  {displayName}
                </h1>
                <p className="text-[#6b7280]">
                  Showing {placeholderProducts.length} products
                </p>
              </div>

              {/* Product Grid - 联调时替换为动态数据 */}
              {/* {products.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-muted-foreground">No products found in this category.</p>
                </div>
              ) : ( */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {placeholderProducts.map((product) => (
                  <Link
                    key={product.id}
                    href={`/${locale}/products/${currentSubcategory || 'plates'}/${product.slug}`}
                    className="group border border-[#e5e7eb] rounded-lg overflow-hidden bg-white hover:shadow-lg transition-all"
                  >
                    {/* Product Image Placeholder */}
                    <div className="aspect-square relative bg-[#f9fafb]">
                      {/* 联调时替换为动态图片 */}
                      {/* {product.main_image ? (
                        <Image
                          src={product.main_image}
                          alt={`${product.name} - Wholesale ceramic tableware`}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : ( */}
                      <div className="absolute inset-0 flex items-center justify-center text-[#9ca3af]">
                        <Package className="w-16 h-16 opacity-30" />
                      </div>
                      {/* )} */}
                    </div>
                    
                    {/* Product Info */}
                    <div className="p-5">
                      <p className="text-xs text-[#9ca3af] mb-1">{product.sku}</p>
                      <h3 className="text-base font-medium text-[#1a1a1a] mb-4 group-hover:text-[#8b7355] transition-colors">
                        {product.name}
                      </h3>
                      <span className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-[#8b7355] rounded-md group-hover:bg-[#6d5a43] transition-colors">
                        View Details
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
              {/* )} */}

              {/* Load More (Placeholder) */}
              <div className="mt-10 text-center">
                <button className="px-6 py-3 text-sm font-medium text-[#8b7355] border border-[#8b7355] rounded-md hover:bg-[#8b7355] hover:text-white transition-colors">
                  Load More Products
                </button>
              </div>
            </main>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
