import { Metadata } from "next"
import Link from "next/link"
import { ChevronRight, Package, Layers, Gift, Settings, Zap, Clock, Award, Truck } from "lucide-react"
import { getAllProducts } from "@/lib/supabase/products"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { QuoteForm } from "@/components/shared/quote-form"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

// ============================================================
// SEO Metadata
// ============================================================
export const metadata: Metadata = {
  title: "Wholesale Ceramic Tableware | Factory Direct Manufacturing | ADA Ceramics",
  description: "Professional ceramic factory supplying wholesale plates, bowls, mugs and bakeware. FDA/LFGB certified, low MOQ, custom OEM/ODM available. Factory direct pricing for global wholesalers.",
  keywords: "wholesale ceramic, bulk tableware, ceramic plates, ceramic bowls, ceramic mugs, restaurant supplies, hotel dinnerware, OEM ceramic, FDA certified",
  openGraph: {
    title: "Wholesale Ceramic Tableware | ADA Ceramics",
    description: "Factory direct ceramic tableware for restaurants, hotels and catering businesses.",
    type: "website",
  },
}

// ============================================================
// 静态数据
// ============================================================

// Selling points
const sellingPoints = [
  { icon: Layers, title: "Low MOQ" },
  { icon: Gift, title: "Free Samples" },
  { icon: Settings, title: "Custom OEM/ODM" },
  { icon: Zap, title: "Fast Delivery" },
]

// Category tabs 和产品数据
const categoryTabs = [
  { id: "all", name: "All Products" },
  { id: "plates", name: "Wholesale Plates" },
  { id: "bowls", name: "Wholesale Bowls" },
  { id: "sets", name: "Wholesale Dinnerware Sets" },
  { id: "cups", name: "Wholesale Cups & Mugs" },
  { id: "bakeware", name: "Wholesale Bakeware" },
]

// 静态分类产品（用于展示分类卡片，跳转到二级列表页）
const categoryProducts: Record<string, { name: string; slug: string; image: string }[]> = {
  all: [
    { name: "Dinner Plates", slug: "dinner-plates", image: "/images/categories/dinner-plates.jpg" },
    { name: "Dessert & Side Plates", slug: "dessert-side-plates", image: "/images/categories/dessert-plates.jpg" },
    { name: "Soup Plates", slug: "soup-plates", image: "/images/categories/soup-plates.jpg" },
    { name: "Oval & Serving Plates", slug: "oval-serving-plates", image: "/images/categories/oval-plates.jpg" },
    { name: "Soup Bowls", slug: "soup-bowls", image: "/images/categories/soup-bowls.jpg" },
    { name: "Salad Bowls", slug: "salad-bowls", image: "/images/categories/salad-bowls.jpg" },
    { name: "Ramen Bowls", slug: "ramen-bowls", image: "/images/categories/ramen-bowls.jpg" },
    { name: "Snack Bowls", slug: "snack-bowls", image: "/images/categories/snack-bowls.jpg" },
    { name: "Daily Tableware Sets", slug: "daily-tableware-sets", image: "/images/categories/daily-sets.jpg" },
    { name: "Restaurant & Catering Sets", slug: "restaurant-catering-sets", image: "/images/categories/restaurant-sets.jpg" },
    { name: "Ceramic Mugs", slug: "ceramic-mugs", image: "/images/categories/ceramic-mugs.jpg" },
    { name: "Coffee Cups & Saucers", slug: "coffee-cups-saucers", image: "/images/categories/coffee-cups.jpg" },
    { name: "Water Cups", slug: "water-cups", image: "/images/categories/water-cups.jpg" },
    { name: "Baking Dishes", slug: "baking-dishes", image: "/images/categories/baking-dishes.jpg" },
    { name: "Ramekins", slug: "ramekins", image: "/images/categories/ramekins.jpg" },
    { name: "Pie & Pizza Plates", slug: "pie-pizza-plates", image: "/images/categories/pie-plates.jpg" },
  ],
  plates: [
    { name: "Dinner Plates", slug: "dinner-plates", image: "/images/categories/dinner-plates.jpg" },
    { name: "Dessert & Side Plates", slug: "dessert-side-plates", image: "/images/categories/dessert-plates.jpg" },
    { name: "Soup Plates", slug: "soup-plates", image: "/images/categories/soup-plates.jpg" },
    { name: "Oval & Serving Plates", slug: "oval-serving-plates", image: "/images/categories/oval-plates.jpg" },
  ],
  bowls: [
    { name: "Soup Bowls", slug: "soup-bowls", image: "/images/categories/soup-bowls.jpg" },
    { name: "Salad Bowls", slug: "salad-bowls", image: "/images/categories/salad-bowls.jpg" },
    { name: "Ramen Bowls", slug: "ramen-bowls", image: "/images/categories/ramen-bowls.jpg" },
    { name: "Snack Bowls", slug: "snack-bowls", image: "/images/categories/snack-bowls.jpg" },
  ],
  sets: [
    { name: "Daily Tableware Sets", slug: "daily-tableware-sets", image: "/images/categories/daily-sets.jpg" },
    { name: "Restaurant & Catering Sets", slug: "restaurant-catering-sets", image: "/images/categories/restaurant-sets.jpg" },
  ],
  cups: [
    { name: "Ceramic Mugs", slug: "ceramic-mugs", image: "/images/categories/ceramic-mugs.jpg" },
    { name: "Coffee Cups & Saucers", slug: "coffee-cups-saucers", image: "/images/categories/coffee-cups.jpg" },
    { name: "Water Cups", slug: "water-cups", image: "/images/categories/water-cups.jpg" },
  ],
  bakeware: [
    { name: "Baking Dishes", slug: "baking-dishes", image: "/images/categories/baking-dishes.jpg" },
    { name: "Ramekins", slug: "ramekins", image: "/images/categories/ramekins.jpg" },
    { name: "Pie & Pizza Plates", slug: "pie-pizza-plates", image: "/images/categories/pie-plates.jpg" },
  ],
}

// Business solutions
const businessSolutions = [
  { title: "Hotel & Restaurant Bulk Supplies", href: "/en/products", image: "/images/solutions/hotel-restaurant.jpg" },
  { title: "Amazon & Retail Packaging", href: "/en/products", image: "/images/solutions/amazon-retail.jpg" },
  { title: "Wedding & Event Catering", href: "/en/products", image: "/images/solutions/wedding-event.jpg" },
  { title: "Custom Corporate Gifting", href: "/en/custom-oem-odm", image: "/images/solutions/corporate-gifting.jpg" },
]

// Why choose us
const whyChooseUs = [
  { icon: Clock, title: "20+ Years Export to EU/US", href: "/about-us" },
  { icon: Award, title: "FDA/LFGB Certified", href: "/en/products" },
  { icon: Package, title: "Flexible MOQ & Fast Samples", href: "/en/custom-oem-odm" },
  { icon: Truck, title: "45-50Day On-Time Delivery", href: "/en/products" },
]

// FAQ
const faqItems = [
  {
    question: "Do your products meet FDA (US) and LFGB (EU) food contact safety standards?",
    answer: "Yes. All our ceramics pass FDA & LFGB lead/cadmium migration tests, with SGS/Intertek reports available.",
  },
  {
    question: "Are your ceramics microwave & dishwasher safe?",
    answer: "Most items are microwave & dishwasher safe; gold trim items are handwash only.",
  },
  {
    question: "What is your sample lead time and mass production delivery time?",
    answer: "Sample: Normally 10–15 days; Mass production: 45–55 days after sample approval.",
  },
  {
    question: "Can you do custom designs/logo? What's the MOQ?",
    answer: "Yes, OEM/ODM available. MOQ: 500–1000 pcs (depends on item).",
  },
  {
    question: "What's your packaging? Can you provide COC/DoC and test reports?",
    answer: "Safe export packaging (brown box/color box). We can provide SGS test reports as requested.",
  },
]

// ============================================================
// 客户端交互组件（分类标签切换）
// ============================================================
import { ProductCategoryTabs } from "./ProductCategoryTabs"

// ============================================================
// 页面组件
// ============================================================
interface PageProps {
  params: Promise<{ locale: string }>
}

export default async function ProductsPage({ params }: PageProps) {
  const { locale } = await params

  // 获取所有产品（用于统计，未来可展示真实数据）
  const products = await getAllProducts()

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-12 bg-[#f5f3ef]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link href={`/${locale}`} className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground">Products</span>
          </nav>

          <h1 className="text-3xl sm:text-4xl font-serif font-normal text-foreground mb-4">
            Wholesale Ceramic Tableware | Factory Direct Manufacturing
          </h1>
          <p className="text-muted-foreground mb-8 max-w-4xl">
            We are a professional ceramic factory supplying a full range of wholesale tableware. Our products include plates, bowls, coffee cup set & mugs and bakeware, all made with food-safe materials and durable glaze. We offer bulk orders, custom designs, low MOQ and fast delivery for global wholesalers.
          </p>

          {/* Selling Points */}
          <div className="flex flex-wrap justify-center gap-8 sm:gap-12 lg:gap-16">
            {sellingPoints.map((point) => {
              const IconComponent = point.icon
              return (
                <div key={point.title} className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full border-2 border-[#8b7355] flex items-center justify-center mb-3">
                    <IconComponent className="w-7 h-7 text-[#8b7355]" strokeWidth={1.5} />
                  </div>
                  <span className="text-sm font-medium text-[#1a1a1a]">{point.title}</span>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Category Tabs and Product Cards - 客户端交互组件 */}
      <ProductCategoryTabs
        locale={locale}
        categoryTabs={categoryTabs}
        categoryProducts={categoryProducts}
      />

      {/* Solutions For Your Business */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[#8b7355] text-xs font-medium mb-3 tracking-widest uppercase">
              BUSINESS SOLUTIONS
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-normal text-[#1a1a1a]">
              Solutions For Your Business
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {businessSolutions.map((solution) => (
              <Link
                key={solution.title}
                href={solution.href}
                className="group border border-[#e5e7eb] rounded-lg overflow-hidden bg-white hover:shadow-lg transition-all"
              >
                <div className="aspect-[4/3] relative bg-[#f5f3ef]">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Package className="w-16 h-16 text-[#8b7355] opacity-30" />
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-base font-medium text-[#1a1a1a] group-hover:text-[#8b7355] transition-colors">
                    {solution.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* One-Stop Ceramic Tableware Sourcing */}
      <section className="py-16 bg-[#f5f3ef]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-[#1a1a1a] text-center mb-16">
            One-Stop Ceramic Tableware Sourcing
          </h2>

          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 mb-16">
            <div className="w-full md:w-1/2">
              <div className="aspect-[4/3] bg-[#e5e1db] rounded-xl flex items-center justify-center">
                <Package className="w-20 h-20 text-[#8b7355] opacity-30" />
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <p className="text-[#4b5563] leading-relaxed text-base">
                We supply a full range of daily-use ceramic tableware, including plates, bowls, mugs and bakeware to fully cover your product sourcing needs. Equipped with an in-house R&D team, we provide professional 3D design and 3D printing services to turn your original ideas and concepts into accurate visual drafts and real samples.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row-reverse items-center gap-8 md:gap-12 mb-16">
            <div className="w-full md:w-1/2">
              <div className="aspect-[4/3] bg-[#e5e1db] rounded-xl flex items-center justify-center">
                <Package className="w-20 h-20 text-[#8b7355] opacity-30" />
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <p className="text-[#4b5563] leading-relaxed text-base">
                We master complete ceramic decoration technologies such as underglaze color, in-glaze color, overglaze decal, digital inkjet printing and pad printing.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="w-full md:w-1/2">
              <div className="aspect-[4/3] bg-[#e5e1db] rounded-xl flex items-center justify-center">
                <Package className="w-20 h-20 text-[#8b7355] opacity-30" />
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <p className="text-[#4b5563] leading-relaxed text-base">
                We support full customization of colors, patterns, logos, packaging and private labels. Every procedure from design development, sample making to mass production is strictly controlled in our own factory. We accept both small trial orders and large bulk orders, and provide reliable door-to-door delivery services to simplify your entire purchasing process.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[#8b7355] text-xs font-medium mb-3 tracking-widest uppercase">
              OUR ADVANTAGES
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-normal text-[#1a1a1a]">
              Why Choose Us
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseUs.map((item) => {
              const IconComponent = item.icon
              return (
                <Link
                  key={item.title}
                  href={item.href}
                  className="group flex flex-col items-center text-center p-6 border border-[#e5e7eb] rounded-lg bg-white hover:shadow-md hover:border-[#8b7355]/30 transition-all"
                >
                  <div className="w-14 h-14 bg-[#f5f3ef] rounded-full flex items-center justify-center mb-4 group-hover:bg-[#8b7355]/10 transition-colors">
                    <IconComponent className="w-7 h-7 text-[#8b7355]" />
                  </div>
                  <h3 className="text-base font-medium text-[#1a1a1a] group-hover:text-[#8b7355] transition-colors">
                    {item.title}
                  </h3>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-[#f9fafb]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[#8b7355] text-xs font-medium mb-3 tracking-widest uppercase">
              FAQ
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-normal text-[#1a1a1a]">
              Frequently Asked Questions
            </h2>
          </div>
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b border-[#e5e7eb]">
                <AccordionTrigger className="text-left text-[#1a1a1a] font-medium py-5 hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-[#6b7280] pb-5">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Quote Form */}
      <QuoteForm />

      <Footer />
    </div>
  )
}
