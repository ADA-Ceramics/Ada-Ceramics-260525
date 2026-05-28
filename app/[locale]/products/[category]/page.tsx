import Link from "next/link"
import { notFound } from "next/navigation"
import { ChevronRight, Package } from "lucide-react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { CATEGORY_INFO } from "@/lib/supabase/types"

// 一级分类下的二级分类结构
const subcategoriesByPrimary: Record<string, { name: string; slug: string; description: string }[]> = {
  plates: [
    { name: "Dinner Plates", slug: "dinner-plates", description: "Large ceramic dinner plates for main courses, 10-12 inch diameter" },
    { name: "Dessert & Side Plates", slug: "dessert-side-plates", description: "Smaller plates for desserts and sides, 6-8 inch" },
    { name: "Soup Plates", slug: "soup-plates", description: "Deep rimmed plates for soups and pasta" },
    { name: "Oval & Serving Plates", slug: "oval-serving-plates", description: "Oval platters and serving plates for sharing" },
  ],
  bowls: [
    { name: "Soup Bowls", slug: "soup-bowls", description: "Deep bowls for soups and stews" },
    { name: "Salad Bowls", slug: "salad-bowls", description: "Wide shallow bowls for salads" },
    { name: "Ramen Bowls", slug: "ramen-bowls", description: "Large deep bowls for noodles and ramen" },
    { name: "Snack Bowls", slug: "snack-bowls", description: "Small bowls for snacks and dips" },
  ],
  "dinnerware-sets": [
    { name: "Daily Tableware Sets", slug: "daily-tableware-sets", description: "Complete sets for everyday home use" },
    { name: "Restaurant & Catering Sets", slug: "restaurant-catering-sets", description: "Durable sets for commercial use" },
  ],
  "cups-mugs": [
    { name: "Ceramic Mugs", slug: "ceramic-mugs", description: "Classic ceramic mugs for coffee and tea" },
    { name: "Coffee Cups & Saucers", slug: "coffee-cups-saucers", description: "Elegant cups with matching saucers" },
    { name: "Water Cups", slug: "water-cups", description: "Simple cups for water and beverages" },
  ],
  bakeware: [
    { name: "Baking Dishes", slug: "baking-dishes", description: "Oven-safe dishes for casseroles and baking" },
    { name: "Ramekins", slug: "ramekins", description: "Small individual baking dishes" },
    { name: "Pie & Pizza Plates", slug: "pie-pizza-plates", description: "Round plates for pies and pizzas" },
  ],
};

interface PageProps {
  params: Promise<{ category: string; locale: string }>
}

// SEO 元数据
export async function generateMetadata({ params }: PageProps) {
  const { category } = await params
  const categoryInfo = CATEGORY_INFO[category]
  
  if (!categoryInfo) {
    return {
      title: "Category Not Found | ADA Ceramics",
    }
  }

  return {
    title: `${categoryInfo.name} | ADA Ceramics`,
    description: `Wholesale high-quality ${categoryInfo.name} ceramic tableware. Bulk orders & custom OEM/ODM available. Factory direct from China.`,
  }
}

export default async function PrimaryCategoryPage({ params }: PageProps) {
  const { category: categorySlug, locale } = await params
  const categoryInfo = CATEGORY_INFO[categorySlug]
  const subcategories = subcategoriesByPrimary[categorySlug]

  if (!categoryInfo || !subcategories) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Breadcrumb */}
      <section className="pt-28 pb-4 bg-[#f5f3ef]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href={`/${locale}`} className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href={`/${locale}/products`} className="hover:text-foreground transition-colors">Products</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground">{categoryInfo.name}</span>
          </nav>
        </div>
      </section>

      {/* Category Header */}
      <section className="py-12 bg-[#f5f3ef]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-serif font-semibold text-[#1a1a1a] mb-4">
            {categoryInfo.name}
          </h1>
          <p className="text-[#6b7280] max-w-3xl">
            {categoryInfo.description}
          </p>
        </div>
      </section>

      {/* Subcategories Grid */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {subcategories.map((subcategory) => (
              <Link
                key={subcategory.slug}
                href={`/${locale}/products/${categorySlug}/${subcategory.slug}`}
                className="group bg-white border border-[#e5e7eb] rounded-lg overflow-hidden hover:shadow-lg transition-all"
              >
                <div className="aspect-square relative bg-[#f9fafb]">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Package className="w-16 h-16 text-[#9ca3af] opacity-30" />
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-base font-medium text-[#1a1a1a] mb-2 group-hover:text-[#8b7355] transition-colors">
                    {subcategory.name}
                  </h3>
                  <p className="text-sm text-[#6b7280] line-clamp-2">
                    {subcategory.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
