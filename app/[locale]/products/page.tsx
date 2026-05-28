import { Footer } from "@/components/layout/footer";
import { ProductsClient } from "@/components/products/products-client";
import type { Metadata } from "next";

// 🔥 SEO 优化版（专业外贸B2B、谷歌标准长度）
export const metadata: Metadata = {
  title: "All Products | ADA Ceramics",
  description: "Browse our full range of premium ceramic tableware, mugs & dinnerware. Factory direct wholesale, OEM/ODM custom orders available worldwide.",
};

export default async function ProductsPage() {
  return (
    <>
      <ProductsClient />
      <Footer />
    </>
  );
}
