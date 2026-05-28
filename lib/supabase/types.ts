export interface Product {
  id: string
  name: string
  slug: string
  category: string
  category_slug?: string
  description: string | null
  price: number | null
  main_image: string | null
  features: string[] | null
  specifications: Record<string, string> | null
  is_active: boolean
  sort_order: number
  created_at: string
  updated_at: string
}

// 保留旧类型别名以兼容
export type CeramicProduct = Product

// 产品分类信息
export interface ProductCategory {
  slug: string
  name: string
  description: string
}

// 分类信息（5个一级产品分类）
export const CATEGORY_INFO: Record<string, { name: string; description: string }> = {
  'plates': {
    name: 'Wholesale Plates',
    description: 'Premium ceramic plates for restaurants, hotels and retail. Dinner plates, dessert plates, soup plates and serving plates.',
  },
  'bowls': {
    name: 'Wholesale Bowls',
    description: 'High-quality ceramic bowls in various sizes. Soup bowls, salad bowls, ramen bowls and snack bowls.',
  },
  'dinnerware-sets': {
    name: 'Wholesale Dinnerware Sets',
    description: 'Complete ceramic dinnerware sets for daily use and restaurant catering. Customizable combinations available.',
  },
  'cups-mugs': {
    name: 'Wholesale Cups & Mugs',
    description: 'Ceramic mugs, coffee cups and saucers, water cups. Perfect for cafes, hotels and promotional gifts.',
  },
  'bakeware': {
    name: 'Wholesale Bakeware',
    description: 'Oven-safe ceramic bakeware including baking dishes, ramekins, pie plates and pizza plates.',
  },
}
