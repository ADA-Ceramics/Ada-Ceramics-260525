"use client"

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { QuoteForm } from "@/components/shared/quote-form";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Clock, Award, Package, Truck } from "lucide-react";

interface Product {
  id: string;
  name: string;
  slug: string;
  main_image: string;
  category_slug: string;
}

interface ProductsClientProps {
  products: Product[];
  activeCat: string;
}

// Category data for the category cards section
const categoryGroups = [
  {
    title: "Plates",
    items: [
      { name: "Dinner Plates", slug: "dinner-plates", image: "/images/categories/dinner-plates.jpg" },
      { name: "Dessert & Side Plates", slug: "dessert-side-plates", image: "/images/categories/dessert-plates.jpg" },
      { name: "Soup Plates", slug: "soup-plates", image: "/images/categories/soup-plates.jpg" },
      { name: "Oval & Serving Plates", slug: "oval-serving-plates", image: "/images/categories/oval-plates.jpg" },
    ]
  },
  {
    title: "Bowls",
    items: [
      { name: "Soup Bowls", slug: "soup-bowls", image: "/images/categories/soup-bowls.jpg" },
      { name: "Salad Bowls", slug: "salad-bowls", image: "/images/categories/salad-bowls.jpg" },
      { name: "Ramen Bowls", slug: "ramen-bowls", image: "/images/categories/ramen-bowls.jpg" },
      { name: "Snack Bowls", slug: "snack-bowls", image: "/images/categories/snack-bowls.jpg" },
    ]
  },
  {
    title: "Sets",
    items: [
      { name: "Daily Tableware Sets", slug: "daily-tableware-sets", image: "/images/categories/daily-sets.jpg" },
      { name: "Restaurant & Catering Sets", slug: "restaurant-catering-sets", image: "/images/categories/restaurant-sets.jpg" },
    ]
  },
  {
    title: "Cups",
    items: [
      { name: "Ceramic Mugs", slug: "ceramic-mugs", image: "/images/categories/ceramic-mugs.jpg" },
      { name: "Coffee Cups & Saucers", slug: "coffee-cups-saucers", image: "/images/categories/coffee-cups.jpg" },
      { name: "Water Cups", slug: "water-cups", image: "/images/categories/water-cups.jpg" },
    ]
  },
  {
    title: "Bakeware",
    items: [
      { name: "Baking Dishes", slug: "baking-dishes", image: "/images/categories/baking-dishes.jpg" },
      { name: "Ramekins", slug: "ramekins", image: "/images/categories/ramekins.jpg" },
      { name: "Pie & Pizza Plates", slug: "pie-pizza-plates", image: "/images/categories/pie-plates.jpg" },
    ]
  },
];

// Business solutions data
const businessSolutions = [
  { title: "Hotel & Restaurant Bulk Supplies", href: "/en/products", image: "/images/solutions/hotel-restaurant.jpg" },
  { title: "Amazon & Retail Packaging", href: "/en/products", image: "/images/solutions/amazon-retail.jpg" },
  { title: "Wedding & Event Catering", href: "/en/products", image: "/images/solutions/wedding-event.jpg" },
  { title: "Custom Corporate Gifting", href: "/en/custom-oem-odm", image: "/images/solutions/corporate-gifting.jpg" },
];

// Why choose us data
const whyChooseUs = [
  { icon: Clock, title: "20+ Years Export to EU/US", href: "/about-us" },
  { icon: Award, title: "FDA/LFGB Certified", href: "/en/products" },
  { icon: Package, title: "Flexible MOQ & Fast Samples", href: "/en/custom-oem-odm" },
  { icon: Truck, title: "45-50Day On-Time Delivery", href: "/en/products" },
];

// FAQ data
const faqItems = [
  {
    question: "Do your products meet FDA (US) and LFGB (EU) food contact safety standards?",
    answer: (
      <>
        Yes. All our ceramics pass <Link href="/en/products" className="text-[#8b7355] hover:underline">FDA & LFGB</Link> lead/cadmium migration tests, with SGS/Intertek reports available.
      </>
    ),
  },
  {
    question: "Are your ceramics microwave & dishwasher safe?",
    answer: (
      <>
        Most items are <Link href="/en/products" className="text-[#8b7355] hover:underline">microwave & dishwasher safe</Link>; gold trim items are handwash only.
      </>
    ),
  },
  {
    question: "What is your sample lead time and mass production delivery time?",
    answer: (
      <>
        <Link href="/en/custom-oem-odm" className="text-[#8b7355] hover:underline">Sample</Link>: Normally 10–15 days; Mass production: 45–55 days after sample approval.
      </>
    ),
  },
  {
    question: "Can you do custom designs/logo? What's the MOQ?",
    answer: (
      <>
        Yes, <Link href="/en/custom-oem-odm" className="text-[#8b7355] hover:underline">OEM/ODM</Link> available. MOQ: 500–1000 pcs (depends on item).
      </>
    ),
  },
  {
    question: "What's your packaging? Can you provide COC/DoC and test reports?",
    answer: (
      <>
        Safe export <Link href="/en/products" className="text-[#8b7355] hover:underline">packaging</Link> (brown box/color box). We can provide SGS test reports as requested.
      </>
    ),
  },
];

export function ProductsClient({ products, activeCat }: ProductsClientProps) {
  const pathname = usePathname()
  const locale = pathname.split('/')[1] || 'en'

  const fixedCategories = [
    { slug: "all", name: "All Products" },
    { slug: "high-temperature-white-porcelain", name: "High Temp White Porcelain" },
    { slug: "color-glaze", name: "Color Glaze" },
    { slug: "kiln-change-ceramic", name: "Kiln Change Ceramic" },
  ];

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="pt-32 pb-12 bg-[#f5f3ef]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-serif font-normal text-foreground mb-4">
            Wholesale Ceramic Tableware | Factory Direct Manufacturing
          </h1>
          <p className="text-muted-foreground">
            We are a professional ceramic factory supplying a full range of wholesale tableware. Our products include plates, bowls, coffee cup set & mugs and bakeware, all made with food-safe materials and durable glaze. We offer bulk orders, custom designs, low MOQ and fast delivery for global wholesalers.
          </p>
        </div>
      </section>

      {/* Category Cards Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-serif font-normal text-[#1a1a1a] mb-8 text-center">
            Browse by Category
          </h2>
          <div className="space-y-8">
            {categoryGroups.map((group) => (
              <div key={group.title}>
                <h3 className="text-lg font-medium text-[#6b7280] mb-4">{group.title}</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
                  {group.items.map((item) => (
                    <div
                      key={item.slug}
                      className="group border border-[#e5e7eb] rounded-lg overflow-hidden bg-white hover:shadow-md transition-shadow"
                    >
                      <div className="aspect-[4/3] relative bg-[#f9fafb]">
                        <div className="absolute inset-0 flex items-center justify-center text-[#9ca3af]">
                          <Package className="w-12 h-12 opacity-30" />
                        </div>
                      </div>
                      <div className="p-4">
                        <h4 className="text-sm font-medium text-[#1a1a1a] mb-3 line-clamp-2">
                          {item.name}
                        </h4>
                        <Link
                          href={`/${locale}/products?cat=${item.slug}`}
                          className="inline-block text-xs font-medium text-[#8b7355] hover:text-[#6d5a43] transition-colors"
                        >
                          View Details →
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Products Content */}
      <section className="py-12 bg-[#f9fafb]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-8">
            <aside className="w-full md:w-64 flex-shrink-0">
              <h2 className="text-xl font-semibold mb-4">Categories</h2>
              <ul className="space-y-2">
                {fixedCategories.map((cat) => (
                  <li key={cat.slug}>
                    <Link
                      href={`/${locale}/products?cat=${cat.slug}`}
                      className={`block w-full text-left py-2 px-3 rounded hover:bg-gray-100 ${
                        activeCat === cat.slug ? "bg-gray-200 font-medium" : ""
                      }`}
                    >
                      {cat.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </aside>

            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.length === 0 ? (
                <div className="col-span-full text-center py-12 text-gray-500">No products found</div>
              ) : (
                products.map((product) => {
                  const categorySlug = product.category_slug || 'high-temperature-white-porcelain'
                  return (
                  <Link
                    key={product.id}
                    href={`/${locale}/products/${categorySlug}/${product.slug}`}
                    className="group border rounded-lg overflow-hidden hover:shadow-lg transition-shadow flex flex-col bg-white"
                  >
                    <div className="w-full p-2 bg-white relative aspect-square">
                      <Image
                        src={product.main_image}
                        alt={product.name}
                        fill
                        className="object-contain"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                    <div className="p-4 mt-auto">
                      <h3 className="text-lg font-semibold notranslate" translate="no">{product.name}</h3>
                    </div>
                  </Link>
                  )
                })
              )}
            </div>
          </div>
        </div>
      </section>

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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-[#8b7355] text-xs font-medium mb-3 tracking-widest uppercase">
              OUR SERVICES
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-normal text-[#1a1a1a]">
              One-Stop Ceramic Tableware Sourcing
            </h2>
          </div>
          <div className="prose prose-lg max-w-none text-[#4b5563] leading-relaxed space-y-6">
            <p>
              We supply a full range of daily-use{" "}
              <Link href="/en/products" className="text-[#8b7355] hover:underline">
                ceramic tableware
              </Link>
              , including{" "}
              <Link href="/en/products" className="text-[#8b7355] hover:underline">
                plates, bowls, mugs and bakeware
              </Link>{" "}
              to fully cover your product sourcing needs. Equipped with an in-house R&D team, we provide professional 3D design and 3D printing services to turn your original ideas and concepts into accurate visual drafts and real samples.
            </p>
            <p>
              We master complete ceramic decoration technologies such as underglaze color, in-glaze color, overglaze decal, digital inkjet printing and pad printing.
            </p>
            <p>
              We support full{" "}
              <Link href="/en/custom-oem-odm" className="text-[#8b7355] hover:underline">
                customization
              </Link>{" "}
              of colors, patterns, logos, packaging and private labels. Every procedure from design development, sample making to mass production is strictly controlled in our own factory.
            </p>
            <p>
              We accept both small trial orders and large bulk orders, and provide reliable door-to-door delivery services to simplify your entire purchasing process.
            </p>
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
              const IconComponent = item.icon;
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
              );
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

      {/* Get in Touch / Quote Form */}
      <QuoteForm />
    </main>
  );
}
