import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { ChevronRight } from "lucide-react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { getProductsByCategory } from "@/lib/supabase/products"
import { CATEGORY_INFO, type Product } from "@/lib/supabase/types"

interface PageProps {
  params: Promise<{ category: string }>
}

// SEO 元数据（优化版：符合谷歌 50-60字符 + 150字符标准）
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

export default async function CategoryProductsPage({ params }: PageProps) {
  const { category: categorySlug } = await params
  const products = await getProductsByCategory(categorySlug)
  const categoryInfo = CATEGORY_INFO[categorySlug]

  if (!categoryInfo) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <section className="pt-28 pb-4 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/products" className="hover:text-foreground transition-colors">Products</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground">{categoryInfo.name}</span>
          </nav>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
            {categoryInfo.name}
          </h1>

          {products.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground">No products found in this category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product: Product) => (
                <Link
                  key={product.id}
                  href={`/products/${categorySlug}/${product.slug}`}
                  className="group bg-card rounded-xl overflow-hidden border border-border hover:shadow-lg transition-all duration-300"
                >
                  <div className="aspect-square bg-gradient-to-br from-muted to-muted/50 relative overflow-hidden">
                    {product.main_image ? (
                      <Image
                        src={product.main_image}
                        alt={`${product.name} - Wholesale ceramic tableware & bulk supply`}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <div className="w-12 h-12 rounded-full bg-primary/20" />
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-2">
                      {product.name}
                    </h3>
                    {product.price && (
                      <p className="text-primary font-semibold">${product.price.toFixed(2)}</p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
