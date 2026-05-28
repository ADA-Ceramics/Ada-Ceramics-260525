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
    name: "Wholesale Plates",
    description: "Premium ceramic plates for restaurants, hotels and retail.",
    image: "/alice.webp",
    alt: "wholesale ceramic plates dinner plates dessert plates",
    slug: "plates",
  },
  {
    name: "Wholesale Bowls",
    description: "High-quality ceramic bowls in various sizes and styles.",
    image: "/color-glaze.webp",
    alt: "wholesale ceramic bowls soup bowls salad bowls",
    slug: "bowls",
  },
  {
    name: "Wholesale Dinnerware Sets",
    description: "Complete ceramic dinnerware sets for daily use and catering.",
    image: "/kiln-transformation.webp",
    alt: "wholesale dinnerware sets ceramic tableware sets",
    slug: "dinnerware-sets",
  },
  {
    name: "Wholesale Cups & Mugs",
    description: "Ceramic mugs, coffee cups and saucers for cafes and hotels.",
    image: "/alice.webp",
    alt: "wholesale ceramic mugs coffee cups saucers",
    slug: "cups-mugs",
  },
  {
    name: "Wholesale Bakeware",
    description: "Oven-safe ceramic bakeware including dishes and ramekins.",
    image: "/color-glaze.webp",
    alt: "wholesale ceramic bakeware baking dishes ramekins",
    slug: "bakeware",
  },
];

export default function HomePage() {
  return <HomeClient categories={fixedCategories} />;
}
