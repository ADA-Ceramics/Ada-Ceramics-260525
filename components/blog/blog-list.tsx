"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { AlertCircle } from "lucide-react"
import type { BlogPost } from "@/lib/notion"

interface BlogListProps {
  posts: BlogPost[]
  error?: string | null
}

export function BlogList({ posts, error }: BlogListProps) {
  const pathname = usePathname()
  const locale = pathname.split('/')[1] || 'en'

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="pt-32 pb-12 bg-[#f5f3ef]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-serif font-normal text-foreground mb-4">
            Ceramic Insights & Industry News
          </h1>
          <p className="text-muted-foreground">
            Latest trends, guides, and knowledge from professional ceramic manufacturer
          </p>
        </div>
      </section>

      {/* Blog List */}
      <section className="py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {error ? (
            /* Configuration Error State */
            <div className="py-12">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <AlertCircle className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-foreground mb-2">
                    Notion Configuration Required
                  </h3>
                  <p className="text-muted-foreground text-sm mb-6">
                    Please share your Notion database with your integration to display blog posts.
                  </p>
                  <div className="bg-muted/30 rounded-lg p-5 text-sm">
                    <h4 className="font-medium text-foreground mb-3">Setup Steps (Free - No upgrade needed):</h4>
                    <ol className="text-muted-foreground space-y-2 list-decimal list-inside">
                      <li>Open your Notion database page</li>
                      <li>Click the <code className="bg-white px-1.5 py-0.5 rounded border text-xs">...</code> menu</li>
                      <li>Select <code className="bg-white px-1.5 py-0.5 rounded border text-xs">Add connections</code></li>
                      <li>Search and select your integration</li>
                      <li>Refresh this page</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          ) : posts.length === 0 ? (
            <div className="py-16 text-center">
              <h3 className="text-lg font-medium text-foreground mb-2">
                No posts available yet
              </h3>
              <p className="text-muted-foreground text-sm">
                Check back soon for latest updates and articles
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-border/50">
              {posts.map((post) => (
                <li key={post.id}>
                  <Link
                    href={`/${locale}/blog/${post.slug}`}
                    className="block py-5 hover:bg-muted/30 -mx-4 px-4 transition-colors"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4">
                      <h2 className="text-foreground font-medium hover:text-primary transition-colors">
                        {post.title}
                      </h2>
                      <time className="text-sm text-muted-foreground whitespace-nowrap">
                        {formatDate(post.publishedAt)}
                      </time>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </main>
  )
}
