'use client'

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import Link from "next/link"
import { Leaf, TrendingUp, Users, ShieldCheck, ArrowRight, Sprout, MessageCircle } from "lucide-react"
import { useLanguage } from "@/app/language-provider"
import { translations } from "@/lib/translations"
import { formatCurrencyAmount } from '@/lib/format'
import { useState, useEffect } from "react"

export default function Home() {
  const { language } = useLanguage()
  const t = translations[language]
  const [dbProducts, setDbProducts] = useState<any[]>([])

  useEffect(() => {
    fetch('/api/products')
      .then((r) => r.json())
      .then((data) => setDbProducts(data))
      .catch(() => setDbProducts([]))
  }, [])

  function formatPrice(raw?: any){
    if (!raw) return language === 'id' ? 'Hubungi untuk harga' : 'Contact for price'
    const formatted = formatCurrencyAmount(raw, language)
    return formatted ?? String(raw)
  }

  return (
    <main>
      <Navigation />

      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-accent/20 rounded-full blur-3xl -z-10" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl -z-10" />

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="fade-in">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6 border border-primary/20">
                <Sprout className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">{t.hero.badge}</span>
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight text-pretty">
                {language === 'id' ? (
                  <>
                    Transparansi{" "}
                    <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Harga</span>,
                    Kesejahteraan Petani
                  </>
                ) : (
                  <>
                    Price <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Transparency</span>, Farmer Prosperity
                  </>
                )}
              </h1>

              <p className="text-lg text-muted-foreground mb-8 leading-relaxed max-w-lg">
                {t.hero.description}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="https://wa.me/6281554877596"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3 bg-gradient-to-r from-primary to-accent text-white rounded-lg hover:shadow-xl transition-all duration-500 ease-out font-semibold group"
                >
                  {t.hero.joinButton}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
                <Link
                  href="/about"
                  className="inline-flex items-center justify-center px-7 py-3 border-2 border-primary text-primary rounded-lg hover:bg-primary/5 transition-all duration-500 ease-out font-semibold"
                >
                  {t.hero.learnMore}
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mt-12">
                {[
                  { number: "5K+", label: t.hero.stats.farmers },
                  { number: "2K+", label: t.hero.stats.distributors },
                  { number: "100k+", label: t.hero.stats.transactions },
                ].map((stat) => (
                  <div key={stat.label} className="fade-in">
                    <div className="text-2xl sm:text-3xl font-bold text-primary">{stat.number}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right - Visual */}
              <div className="relative hidden lg:flex items-center justify-center slide-in-left">
              <div className="relative w-full h-64 md:h-80 lg:h-96 rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/farmers-market-with-fresh-vegetables-and-farmers-s.jpg"
                  alt="Farmers at market"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 border-y border-border">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-8 bg-white rounded-2xl p-8 shadow-lg border border-green-100">
            <div className="flex-shrink-0">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                <MessageCircle className="w-10 h-10 text-white" />
              </div>
            </div>

            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">{t.whatsapp.title}</h3>
              <p className="text-muted-foreground text-lg mb-4">
                {t.whatsapp.description}
              </p>
              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                <span className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                  <TrendingUp className="w-4 h-4" />
                  {t.whatsapp.fullCatalog}
                </span>
                <span className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                  <ShieldCheck className="w-4 h-4" />
                  {t.whatsapp.free}
                </span>
              </div>
            </div>

            <div className="flex-shrink-0">
              <a
                href="https://whatsapp.com/channel/0029VbC5p426xCSQoaTibA2k"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:shadow-xl hover:scale-105 transition-all duration-300 font-semibold group whitespace-nowrap"
              >
                <MessageCircle className="w-5 h-5" />
                {t.whatsapp.joinChannel}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">{t.features.title}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t.features.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.features.items.map((feature, index) => {
              const icons = [TrendingUp, Leaf, ShieldCheck, Users]
              const Icon = icons[index]
              return (
                <div key={index} className="group p-8 bg-white border border-border rounded-2xl hover-lift shadow-sm">
                  <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl flex items-center justify-center mb-6 group-hover:shadow-lg transition-all duration-500 ease-out">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg text-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              {language === 'id' ? 'Produk Unggulan' : 'Featured Products'}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {language === 'id'
                ? 'Jelajahi produk-produk pilihan dari petani terbaik Indonesia dengan kualitas premium'
                : 'Explore selected products from Indonesia\'s best farmers with premium quality'}
            </p>
          </div>

          {/* Products Carousel */}
          <Carousel opts={{ align: 'start', loop: true }} className="mb-12">
            <CarouselContent className="-ml-4">
                {(dbProducts.slice(0, 6) || []).map((product) => (
                  <CarouselItem key={product.id} className="pl-4 basis-full sm:basis-1/2 lg:basis-1/4">
                    <ProductCard
                      name={product.name}
                      image={product.image ?? (product.images?.[0] ?? '/placeholder.svg')}
                      price={formatPrice(product.price)}
                      region={product.region ?? '-'}
                      onViewDetail={() => { window.location.href = '/prices' }}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
            <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12" />
            <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12" />
          </Carousel>

          {/* View All Products Link */}
          <div className="text-center">
            <Link
              href="/prices"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-300 font-semibold group"
            >
              {language === 'id' ? 'Lihat Semua Produk' : 'View All Products'}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Latest from Admin (DB)
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-2">{t.latest.title}</h2>
            <p className="text-muted-foreground">{t.latest.description}</p>
              </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {dbProducts.length === 0 ? (
              <div className="text-muted">{t.latest.noProducts}</div>
            ) : (
              dbProducts.map((p: any) => (
                <ProductCard
                  key={p.id}
                  name={p.name}
                  image={p.image ?? (p.images?.[0] ?? '/placeholder.svg')}
                  price={formatPrice(p.price)}
                  region={p.region ?? '-'}
                  onViewDetail={() => { window.location.href = '/prices' }}
                />
              ))
            )}
          </div>
        </div>
      </section> */}

      <Footer />
    </main>
  )
}
