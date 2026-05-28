import { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ChevronRight, Layers, ShieldCheck, Settings, Zap, Check, Package, MessageCircle } from "lucide-react"
import { getProductBySlug } from "@/lib/supabase/products"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { QuoteForm } from "@/components/shared/quote-form"

// ============================================================
// SEO Metadata - 谷歌SEO友好
// ============================================================
interface PageProps {
  params: Promise<{ subcategory: string; slug: string; locale: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, locale } = await params
  const product = await getProductBySlug(slug)

  if (!product) {
    return {
      title: "Product Not Found | ADA Ceramics",
      description: "The requested product could not be found.",
    }
  }

  // SEO优化的标题格式：产品名 | 类型 | 品牌
  const seoTitle = `${product.name} | Wholesale Ceramic Tableware | ADA Ceramics`
  
  // SEO优化的描述：包含关键词、产品特性、行动号召
  const seoDescription = product.description 
    ? `${product.description.slice(0, 120)}... Factory direct pricing, low MOQ, FDA/LFGB certified. Request a quote today!`
    : `Wholesale ${product.name} from ADA Ceramics. Premium quality ceramic tableware for restaurants, hotels and catering. Factory direct with low MOQ and custom OEM/ODM available.`

  return {
    title: seoTitle,
    description: seoDescription,
    keywords: [
      product.name,
      "wholesale ceramic",
      "bulk tableware",
      "restaurant supplies",
      "hotel dinnerware",
      "ceramic manufacturer",
      "OEM ceramic",
      "FDA certified tableware",
    ].join(", "),
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      type: "website",
      locale: locale === "zh" ? "zh_CN" : "en_US",
      images: product.main_image ? [{ url: product.main_image, width: 800, height: 800, alt: product.name }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: seoTitle,
      description: seoDescription,
    },
    alternates: {
      canonical: `https://adaceramics.com/${locale}/products/${product.category_slug}/${product.slug}`,
    },
  }
}

// ============================================================
// 静态数据
// ============================================================

// 卖点图标（与分类页保持一致）
const sellingPoints = [
  { icon: Layers, title: "Low MOQ", description: "Minimum order from 100 pieces" },
  { icon: ShieldCheck, title: "FDA/LFGB Certified", description: "Food-safe quality guaranteed" },
  { icon: Settings, title: "Custom OEM/ODM", description: "Your logo & design welcome" },
  { icon: Zap, title: "Fast Delivery", description: "15-30 days production time" },
]

// 分类树（用于左侧导航）
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

// ============================================================
// 页面组件
// ============================================================
export default async function ProductDetailPage({ params }: PageProps) {
  const { subcategory, slug, locale } = await params
  const product = await getProductBySlug(slug)

  if (!product) {
    notFound()
  }

  // 查找当前分类信息
  const findCurrentCategory = () => {
    for (const parent of categoryTree) {
      if (parent.slug === subcategory) {
        return { parent, child: null }
      }
      const child = parent.children.find(c => c.slug === subcategory)
      if (child) {
        return { parent, child }
      }
    }
    return { parent: categoryTree[0], child: null }
  }

  const { parent: currentParent, child: currentChild } = findCurrentCategory()
  const categoryName = currentChild?.name || currentParent?.name || "Products"

  // 解析产品规格
  const specifications = product.specifications || {}
  const features = product.features || []

  // 结构化数据 (JSON-LD) - 谷歌SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description || `Wholesale ${product.name} from ADA Ceramics`,
    image: product.main_image || "",
    sku: product.id,
    brand: {
      "@type": "Brand",
      name: "ADA Ceramics",
    },
    manufacturer: {
      "@type": "Organization",
      name: "ADA Ceramics",
      url: "https://adaceramics.com",
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      price: product.price || "Contact for pricing",
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: "ADA Ceramics",
      },
    },
    category: categoryName,
  }

  return (
    <div className="min-h-screen bg-background">
      {/* JSON-LD 结构化数据 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Header />

      {/* Hero Section - 浅米色背景 */}
      <section className="pt-32 pb-6 bg-[#f5f3ef]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb - SEO友好 */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Link href={`/${locale}`} className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href={`/${locale}/products/category`} className="hover:text-foreground transition-colors">Products</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href={`/${locale}/products/${currentParent.slug}`} className="hover:text-foreground transition-colors">
              {currentParent.name}
            </Link>
            {currentChild && (
              <>
                <ChevronRight className="w-4 h-4" />
                <Link href={`/${locale}/products/${currentChild.slug}`} className="hover:text-foreground transition-colors">
                  {currentChild.name}
                </Link>
              </>
            )}
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground font-medium truncate max-w-[200px]">{product.name}</span>
          </nav>

          {/* Selling Points Bar */}
          <div className="flex flex-wrap justify-center gap-6 sm:gap-10 lg:gap-14 py-4">
            {sellingPoints.map((point) => {
              const IconComponent = point.icon
              return (
                <div key={point.title} className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full border-2 border-[#8b7355] flex items-center justify-center">
                    <IconComponent className="w-5 h-5 text-[#8b7355]" strokeWidth={1.5} />
                  </div>
                  <span className="text-sm font-medium text-[#1a1a1a]">{point.title}</span>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">

            {/* Left Sidebar - Category Navigation */}
            <aside className="w-full lg:w-64 flex-shrink-0 hidden lg:block">
              <div className="lg:sticky lg:top-28 bg-[#f9fafb] rounded-lg border border-[#e5e7eb] p-4">
                <h2 className="text-base font-semibold text-[#1a1a1a] mb-4 pb-3 border-b border-[#e5e7eb]">
                  Categories
                </h2>
                <nav className="space-y-1">
                  {categoryTree.map((category) => (
                    <div key={category.id}>
                      <Link
                        href={`/${locale}/products/${category.slug}`}
                        className={`block py-2 px-3 text-sm rounded transition-colors ${
                          currentParent?.id === category.id
                            ? "text-[#8b7355] bg-[#8b7355]/10 font-medium"
                            : "text-[#1a1a1a] hover:text-[#8b7355] hover:bg-[#f5f3ef]"
                        }`}
                      >
                        {category.name}
                      </Link>
                      {currentParent?.id === category.id && (
                        <div className="ml-3 mt-1 space-y-1">
                          {category.children.map((child) => (
                            <Link
                              key={child.id}
                              href={`/${locale}/products/${child.slug}`}
                              className={`block py-1.5 px-3 text-sm rounded transition-colors ${
                                currentChild?.id === child.id
                                  ? "text-[#8b7355] font-medium"
                                  : "text-[#6b7280] hover:text-[#8b7355]"
                              }`}
                            >
                              {child.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </nav>
              </div>
            </aside>

            {/* Right Content - Product Details */}
            <main className="flex-1">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

                {/* Product Image */}
                <div className="space-y-4">
                  <div className="aspect-square relative bg-[#f9fafb] rounded-lg overflow-hidden border border-[#e5e7eb]">
                    {product.main_image ? (
                      <Image
                        src={product.main_image}
                        alt={product.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Package className="w-24 h-24 text-[#d1d5db]" />
                      </div>
                    )}
                  </div>
                  {/* Thumbnail placeholders */}
                  <div className="flex gap-3">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="w-20 h-20 bg-[#f9fafb] rounded border border-[#e5e7eb] flex items-center justify-center"
                      >
                        <Package className="w-8 h-8 text-[#d1d5db]" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Product Info */}
                <div className="space-y-6">
                  {/* H1 Title - SEO关键 */}
                  <div>
                    <p className="text-sm text-[#8b7355] font-medium mb-2">{categoryName}</p>
                    <h1 className="text-2xl sm:text-3xl font-serif font-normal text-[#1a1a1a] mb-3">
                      {product.name}
                    </h1>
                    <p className="text-sm text-[#6b7280]">SKU: {product.id}</p>
                  </div>

                  {/* Description - SEO重要 */}
                  {product.description && (
                    <div>
                      <h2 className="text-lg font-semibold text-[#1a1a1a] mb-2">Product Description</h2>
                      <p className="text-[#4b5563] leading-relaxed">
                        {product.description}
                      </p>
                    </div>
                  )}

                  {/* Features */}
                  {features.length > 0 && (
                    <div>
                      <h2 className="text-lg font-semibold text-[#1a1a1a] mb-3">Key Features</h2>
                      <ul className="space-y-2">
                        {features.map((feature, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <Check className="w-5 h-5 text-[#8b7355] flex-shrink-0 mt-0.5" />
                            <span className="text-[#4b5563]">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Specifications */}
                  {Object.keys(specifications).length > 0 && (
                    <div>
                      <h2 className="text-lg font-semibold text-[#1a1a1a] mb-3">Specifications</h2>
                      <div className="bg-[#f9fafb] rounded-lg p-4">
                        <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                          {Object.entries(specifications).map(([key, value]) => (
                            <div key={key} className="contents">
                              <dt className="text-[#6b7280]">{key}</dt>
                              <dd className="text-[#1a1a1a] font-medium">{value}</dd>
                            </div>
                          ))}
                        </dl>
                      </div>
                    </div>
                  )}

                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <Link
                      href="#quote-form"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 text-base font-medium text-white bg-[#8b7355] rounded-md hover:bg-[#6d5a43] transition-colors"
                    >
                      <MessageCircle className="w-5 h-5" />
                      Request a Quote
                    </Link>
                    <Link
                      href={`/${locale}/products/${subcategory}`}
                      className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-[#8b7355] border border-[#8b7355] rounded-md hover:bg-[#8b7355] hover:text-white transition-colors"
                    >
                      View More Products
                    </Link>
                  </div>

                  {/* Trust Badges */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-[#e5e7eb]">
                    {sellingPoints.map((point) => {
                      const IconComponent = point.icon
                      return (
                        <div key={point.title} className="text-center">
                          <IconComponent className="w-6 h-6 text-[#8b7355] mx-auto mb-1" strokeWidth={1.5} />
                          <p className="text-xs font-medium text-[#1a1a1a]">{point.title}</p>
                          <p className="text-xs text-[#6b7280]">{point.description}</p>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>

              {/* Additional SEO Content Section */}
              <div className="mt-12 pt-8 border-t border-[#e5e7eb]">
                <h2 className="text-xl font-serif font-normal text-[#1a1a1a] mb-4">
                  Why Choose ADA Ceramics for Wholesale {categoryName}?
                </h2>
                <div className="prose prose-sm max-w-none text-[#4b5563]">
                  <p>
                    As a leading ceramic tableware manufacturer in China, ADA Ceramics specializes in producing 
                    high-quality {categoryName.toLowerCase()} for the global hospitality industry. Our products 
                    are trusted by restaurants, hotels, and catering businesses worldwide.
                  </p>
                  <p className="mt-3">
                    All our ceramic products are FDA and LFGB certified, ensuring they meet the highest food 
                    safety standards. We offer competitive factory-direct pricing with flexible MOQ options, 
                    making it easy for businesses of all sizes to source premium tableware.
                  </p>
                  <p className="mt-3">
                    Whether you need standard designs or custom OEM/ODM solutions with your logo and branding, 
                    our experienced team is ready to support your project from concept to delivery.
                  </p>
                </div>
              </div>
            </main>
          </div>
        </div>
      </section>

      {/* Quote Form Section */}
      <div id="quote-form">
        <QuoteForm />
      </div>

      <Footer />
    </div>
  )
}
