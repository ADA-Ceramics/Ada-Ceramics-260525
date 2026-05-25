import { HomeClient } from "@/components/home/home-client";
import { Metadata } from "next";

// 👇 这就是你要的新 SEO 标题 + 描述
export const metadata: Metadata = {
  title: "ADA Ceramics | Wholesale Ceramic Mugs & Tableware",
  description:
    "Professional ceramic manufacturer & supplier. Wholesale high-quality ceramic mugs, dinnerware, teapots. Custom OEM/ODM available. Contact us!",
};

const fixedCategories = [
  {
    name: "High-Temperature White Porcelain",
    description: "Durable pure white porcelain for hotels & restaurants.",
    image: "/alice.webp",
    alt: "wholesale white porcelain tableware for hotel restaurant",
    slug: "high-temperature-white",
  },
  {
    name: "Color Glaze Ceramics",
    description: "Vibrant glazed finish, unique elegant tableware.",
    image: "/color-glaze.webp",
    alt: "custom printed ceramic mug wholesale bulk order",
    slug: "color-glaze-ceramic",
  },
  {
    name: "Kiln Change Ceramic",
    description: "Natural kiln variation, artistic premium tableware.",
    image: "/kiln-transformation.webp",
    alt: "kiln change artistic ceramic tableware supplier",
    slug: "kiln-change-ceramic",
  },
];

export default function HomePage() {
  return <HomeClient categories={fixedCategories} />;
}
