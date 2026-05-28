import Link from "next/link";
import { ChevronRight, Package } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

// 一级分类与二级分类的映射
const categoryData: Record<string, { name: string; subcategories: { name: string; slug: string }[] }> = {
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

interface PageProps {
  params: Promise<{ category: string; locale: string }>;
}

export default async function CategoryPage({ params }: PageProps) {
  const { category, locale } = await params;
  const data = categoryData[category];

  // 如果分类不存在，显示404
  if (!data) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-white pt-20">
          <div className="max-w-7xl mx-auto px-4 py-16 text-center">
            <h1 className="text-2xl font-semibold text-gray-900">Category Not Found</h1>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        {/* 面包屑导航 */}
        <section className="pt-24 pb-4 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center gap-2 text-sm text-gray-500">
              <Link href={`/${locale}`} className="hover:text-gray-900 transition-colors">
                Home
              </Link>
              <ChevronRight className="w-4 h-4" />
              <Link href={`/${locale}/products`} className="hover:text-gray-900 transition-colors">
                Products
              </Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-gray-900 font-medium">{data.name}</span>
            </nav>
          </div>
        </section>

        {/* 页面标题 */}
        <section className="py-8 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl sm:text-4xl font-serif font-normal text-gray-900">
              {data.name}
            </h1>
            <p className="mt-4 text-gray-600 max-w-3xl">
              Browse our complete collection of {data.name.toLowerCase()}. Factory direct wholesale with custom OEM/ODM services available.
            </p>
          </div>
        </section>

        {/* 子分类卡片网格 */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {data.subcategories.map((sub) => (
                <div
                  key={sub.slug}
                  className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                >
                  {/* 图片占位区 */}
                  <div className="aspect-square bg-gray-100 flex items-center justify-center">
                    <Package className="w-16 h-16 text-gray-300" />
                  </div>
                  {/* 内容区 */}
                  <div className="p-5">
                    <h3 className="text-base font-medium text-gray-900 mb-4">
                      {sub.name}
                    </h3>
                    <Link
                      href={`/${locale}/products/${category}/${sub.slug}`}
                      className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-[#8b7355] rounded-md hover:bg-[#6d5a43] transition-colors"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
