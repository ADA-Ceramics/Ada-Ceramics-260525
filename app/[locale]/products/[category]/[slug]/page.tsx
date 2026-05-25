import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { ChevronRight, Check, Shield, Truck, MessageCircle } from "lucide-react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { getProductBySlug, getProductsByCategory } from "@/lib/supabase/products"
import { CATEGORY_INFO, type Product } from "@/lib/supabase/types"

import ImageGallerySwitch from "./ImageGallerySwitch"

interface PageProps {
  params: Promise<{ category: string; slug: string; locale: string }>
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  
  if (!product) {
    return {
      title: "Product Not Found | ADA Ceramics",
    };
  }

  return {
    title: `${product.name} | ADA Ceramics`,
    description: product.description || `Wholesale ${product.name} - Premium food-grade ceramic tableware. OEM/ODM custom orders available. Bulk wholesale from China factory.`,
  };
}

export default async function Page({ params }: PageProps) {
  const { category, slug, locale } = await params
  const product = await getProductBySlug(slug)

  // ✅ 产品找不到才404（正常）
  if (!product) notFound()

  const realCategorySlug = product.category_slug || category
  const categoryInfo = CATEGORY_INFO[realCategorySlug]

  // ==============================
  // 🚨 【核心修复】这里不再强制404！
  // ==============================
  // if (!categoryInfo) notFound()

  const galleryImages = product.gallery_images ?? []
  const relatedProducts = (await getProductsByCategory(realCategorySlug))
    .filter((p) => p.id !== product.id)
    .slice(0, 4)

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <section className="pt-28 pb-4 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href={`/${locale}`} className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href={`/${locale}/products`} className="hover:text-foreground transition-colors">Products</Link>
            <ChevronRight className="w-4 h-4" />
            
            {/* 修复：分类不存在时不显示链接，避免崩溃 */}
            {categoryInfo ? (
              <>
                <Link href={`/${locale}/products/${realCategorySlug}`} className="hover:text-foreground transition-colors">
                  {categoryInfo.name}
                </Link>
                <ChevronRight className="w-4 h-4" />
              </>
            ) : null}
            
            <span className="text-foreground">{product.name}</span>
          </nav>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <ImageGallerySwitch
              mainImg={product.main_image || ""}
              galleryList={galleryImages}
              altName={product.name}
              tagList={product.features}
            />

            <div className="space-y-6">
              <div>
                {/* 安全判断 */}
                {categoryInfo && (
                  <Link href={`/${locale}/products/${realCategorySlug}`} className="text-sm text-primary">
                    {categoryInfo.name}
                  </Link>
                )}
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mt-2 notranslate" translate="no">{product.name}</h1>
              </div>

              {product.price && (
                <div className="text-3xl font-bold text-primary">
                  ${product.price.toFixed(2)} <span className="text-base text-muted-foreground font-normal">/ piece</span>
                </div>
              )}

              {product.description && (
                <p className="text-muted-foreground notranslate" translate="no">{product.description}</p>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground">Minimum Order</p>
                  <p className="font-semibold">500 pcs</p>
                </div>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground">Lead Time</p>
                  <p className="font-semibold">15-30 days</p>
                </div>
              </div>

              {product.features && product.features.length > 0 && (
                <div>
                  <h3 className="font-semibold text-lg mb-2">Key Features</h3>
                  <ul className="space-y-2">
                    {product.features.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-green-500 mt-0.5" />
                        <span className="notranslate" translate="no">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href={`/${locale}/contact`} className="flex-1 bg-primary text-white text-center py-3 rounded-xl">
                  Request Quote
                </Link>
                <a 
                 href="https://wa.me/8615919512131" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-1 bg-green-500 text-white text-center py-3 rounded-xl flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  WhatsApp
                </a>
              </div>

              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Food Safe Certified
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4" />
                  Worldwide Shipping
                </div>
              </div>
            </div>
          </div>

          {product.specifications && Object.keys(product.specifications).length > 0 && (
            <div className="mt-16 border rounded-xl p-6">
              <h2 className="text-xl font-bold mb-4">Specifications</h2>
              <table className="w-full text-left">
                <tbody>
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <tr key={key} className="border-b last:border-0">
                      <td className="py-3 font-medium w-1/3 notranslate" translate="no">{key.replace(/_/g, " ")}</td>
                      <td className="py-3 text-muted-foreground notranslate" translate="no">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {relatedProducts.length > 0 && (
            <div className="mt-16">
              <h2 className="text-xl font-bold mb-6">Related Products</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((item) => (
                  <Link
                    key={item.id}
                    href={`/${locale}/products/${realCategorySlug}/${item.slug}`}
                    className="group border rounded-xl overflow-hidden transition-shadow hover:shadow-lg"
                  >
                    {item.main_image && (
                      <div className="aspect-square relative">
                        <Image src={item.main_image} alt={item.name} fill className="object-cover" />
                      </div>
                    )}
                    <div className="p-4">
                      <h3 className="font-medium truncate notranslate" translate="no">{item.name}</h3>
                      {item.price && <p className="text-primary mt-1">${item.price.toFixed(2)}</p>}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
