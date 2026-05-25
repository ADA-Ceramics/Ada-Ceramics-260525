import { createClient } from './server'
import type { Product } from './types'
import { CATEGORY_INFO } from './types'

// 获取所有产品 关联分类表拿到slug
export async function getAllProducts(): Promise<(Product & { category_slug: string })[]> {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      product_categories!products_category_fkey(slug)
    `)
    .eq('is_active', true)
    .order('sort_order', { ascending: true })
  
  if (error) {
    console.error('Error fetching products:', error)
    return []
  }
  
  // 把分类slug挂到产品上
  return (data || []).map(item => ({
    ...item,
    category_slug: item.product_categories?.slug || ''
  }))
}

// 获取指定分类的产品
export async function getProductsByCategory(categorySlug: string) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      product_categories!products_category_fkey(slug)
    `)
    .eq('is_active', true)
    .eq('product_categories.slug', categorySlug)
    .order('sort_order', { ascending: true })
  
  if (error) {
    console.error('Error fetching products by category:', error)
    return []
  }
  
  return data || []
}

// 获取单个产品 修复404问题 ✅ 已修复
export async function getProductBySlug(slug: string): Promise<Product | null> {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      product_categories!products_category_fkey(slug)
    `)
    .eq('slug', slug)
    .eq('is_active', true)
    .single() // 👈 关键修复：获取单条数据

  if (error || !data) {
    return null
  }

  return {
    ...data,
    category_slug: data.product_categories?.slug || ''
  }
}

// 获取分类下的产品数量
export async function getProductCountByCategory(categorySlug: string): Promise<number>
{
  const supabase = await createClient()
  
  const { count, error } = await supabase
    .from('products')
    .select('*, product_categories!products_category_fkey(slug)', { count: 'exact', head: true })
    .eq('is_active', true)
    .eq('product_categories.slug', categorySlug)
  
  if (error) {
    console.error('Error fetching product count:', error)
    return 0
  }
  
  return count || 0
}

// 从数据库获取所有分类
export async function getCategories() {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('product_categories')
    .select('slug, name, description')
    .order('name')
  
  if (error) {
    console.error('Error fetching categories:', error)
    return []
  }
  
  return data || []
}
