import { Footer } from "@/components/layout/footer";
import { getAllProducts } from "@/lib/supabase/products";
import { ProductsClient } from "@/components/products/products-client";
import type { Metadata } from "next";

// 🔥 SEO 优化版（专业外贸B2B、谷歌标准长度）
export const metadata: Metadata = {
  title: "All Products | ADA Ceramics",
  description: "Browse our full range of premium ceramic tableware, mugs & dinnerware. Factory direct wholesale, OEM/ODM custom orders available worldwide.",
};

export default async function ProductsPage({ searchParams }: { searchParams: Promise<{ cat?: string }> }) {
  const params = await searchParams;
  const products = await getAllProducts();
  const activeCat = params?.cat || "all";
  
  const filteredProducts = activeCat === "all" 
    ? products 
    : products.filter(p => p.category_slug === activeCat);

  return (
    <>
      <ProductsClient 
        products={filteredProducts} 
      />
      <Footer />
    </>
  );
}
