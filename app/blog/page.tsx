"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { Calendar, User, Clock, Search, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/app/language-provider"
import React, { useEffect, useState } from 'react'

type Post = {
  id: string
  slug: string
  title: string
  excerpt?: string
  date?: string
  author?: string
  category?: string
  readTime?: string
  image?: string
}

export default function BlogPage() {
  const { language } = useLanguage()
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    setLoading(true)
    fetch('/api/blogs').then((r) => r.json()).then((data) => {
      if (!mounted) return
      setPosts(data)
    }).catch(()=> setPosts([])).finally(()=> { if(mounted) setLoading(false) })
    return ()=> { mounted = false }
  }, [])

  const featuredPost = posts.find(p => (p as any).featured) ?? posts[0]

  const content = {
    id: {
      title: 'Blog GoTani',
      subtitle: 'Artikel, tips, dan wawasan terbaru tentang pertanian berkelanjutan, analisis pasar komoditas, dan teknologi pertanian modern.',
      searchPlaceholder: 'Cari artikel...',
      categories: [
        { name: "Semua", count: (posts?.length ?? 0) + (featuredPost ? 1 : 0) },
        { name: "Tips & Panduan", count: 4 },
        { name: "Analisis Pasar", count: 1 },
        { name: "Kisah Sukses", count: 1 },
        { name: "Sustainability", count: 1 },
        { name: "Teknologi", count: 1 },
        { name: "Bisnis", count: 1 },
      ],
      readMore: 'Baca Selengkapnya',
      author: 'Oleh',
      relatedPosts: 'Artikel Terkait',
    },
    en: {
      title: 'GoTani Blog',
      subtitle: 'Latest articles, tips, and insights about sustainable agriculture, commodity market analysis, and modern agricultural technology.',
      searchPlaceholder: 'Search articles...',
      categories: [
        { name: "All", count: (posts?.length ?? 0) + (featuredPost ? 1 : 0) },
        { name: "Tips & Guides", count: 4 },
        { name: "Market Analysis", count: 1 },
        { name: "Success Stories", count: 1 },
        { name: "Sustainability", count: 1 },
        { name: "Technology", count: 1 },
        { name: "Business", count: 1 },
      ],
      readMore: 'Read More',
      author: 'By',
      relatedPosts: 'Related Articles',
    },
  }

  const t = content[language]
  const categories = t.categories

  return (
    <main>
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-primary/10 via-primary/5 to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4">{t.title}</h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
              {t.subtitle}
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <input
                type="text"
                placeholder={t.searchPlaceholder}
                className="w-full pl-12 pr-4 py-4 rounded-lg border border-border bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 border-b border-border bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category.name}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  (language === 'id' && category.name === "Semua") || (language === 'en' && category.name === "All")
                    ? "bg-primary text-white"
                    : "bg-muted text-foreground hover:bg-primary/10"
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-muted/20">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-5 h-5 text-primary" />
            <h2 className="text-2xl font-bold text-foreground">{language === 'id' ? 'Artikel Unggulan' : 'Featured Article'}</h2>
          </div>

          {featuredPost && (
            <Link href={`/blog/${featuredPost.slug}`}>
              <article className="grid md:grid-cols-2 gap-8 bg-white border border-border rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-500 group">
                <div className="relative h-64 md:h-auto overflow-hidden">
                  <img
                    src={featuredPost.image || "/placeholder.svg"}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-4 py-1 bg-primary text-white text-xs font-semibold rounded-full">FEATURED</span>
                  </div>
                </div>

                <div className="p-8 flex flex-col justify-center">
                  <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full mb-4 w-fit">
                    {featuredPost.category}
                  </span>

                  <h3 className="text-3xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                    {featuredPost.title}
                  </h3>

                  <p className="text-muted-foreground mb-6 leading-relaxed">{featuredPost.excerpt}</p>

                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      {featuredPost.author}
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {featuredPost.date ? new Date(featuredPost.date).toLocaleDateString(language === 'id' ? "id-ID" : "en-US", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      }) : ''}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {featuredPost.readTime}
                    </div>
                  </div>

                  <Button className="mt-6 w-fit">{language === 'id' ? 'Baca Artikel' : 'Read Article'} →</Button>
                </div>
              </article>
            </Link>
          )}
        </div>
      </section>

      {/* All Posts */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-foreground mb-8">{language === 'id' ? 'Artikel Terbaru' : 'Latest Articles'}</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link href={`/blog/${post.slug}`} key={post.id}>
                <article className="bg-white border border-border rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group h-full flex flex-col">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <span className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-sm text-primary text-xs font-semibold rounded-full">
                      {post.category}
                    </span>
                  </div>

                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex gap-4 text-xs text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {post.date ? new Date(post.date).toLocaleDateString(language === 'id' ? "id-ID" : "en-US", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        }) : ''}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </div>
                    </div>

                    <h3 className="font-bold text-lg text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3 flex-1">{post.excerpt}</p>

                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <User className="w-3 h-3" />
                        {post.author}
                      </div>
                      <span className="text-primary font-medium text-sm group-hover:gap-2 flex items-center gap-1 transition-all">
                        Baca <span className="group-hover:translate-x-1 transition-transform">→</span>
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>

          {/* Load More Button */}
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Muat Lebih Banyak Artikel
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary via-primary/90 to-secondary">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Dapatkan Update Terbaru</h2>
          <p className="text-white/90 mb-8 text-lg">
            Berlangganan newsletter kami untuk mendapatkan artikel terbaru, tips pertanian, dan analisis pasar langsung
            ke email Anda.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Email Anda"
              className="flex-1 px-6 py-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
            />
            <Button className="bg-white text-primary hover:bg-white/90 px-8 py-4 font-semibold">Berlangganan</Button>
          </div>

          <p className="text-white/70 text-sm mt-4">Gratis. Berhenti berlangganan kapan saja.</p>
        </div>
      </section>

      <Footer />
    </main>
  )
}
