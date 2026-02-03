'use client'

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Star, ArrowRight, Calendar } from "lucide-react"
import { useLanguage } from "@/app/language-provider"

export default function TestimonialsPage() {
  const { language } = useLanguage()

  const testimonials_id = [
    {
      name: "Budi Santoso",
      role: "Petani Beras",
      location: "Karawang, Jawa Barat",
      content:
        "GoTani benar-benar mengubah bisnis saya. Dengan akses ke harga pasar real-time, saya bisa menjual hasil panen dengan harga yang jauh lebih adil. Keuntungan saya meningkat 40% dalam 3 bulan pertama!",
      rating: 5,
      image: "👨‍🌾",
    },
    {
      name: "Siti Nurhaliza",
      role: "Distributor Sayuran",
      location: "Jakarta, DKI Jakarta",
      content:
        "Platform ini sangat memudahkan kami menemukan petani yang terpercaya dan berkualitas. Proses transaksi jadi lebih cepat dan transparan. Food loss kami berkurang signifikan sejak menggunakan GoTani.",
      rating: 5,
      image: "👩‍💼",
    },
    {
      name: "Ahmad Wijaya",
      role: "Petani Cabai",
      location: "Lombok, Nusa Tenggara Barat",
      content:
        "Yang saya suka adalah support team GoTani yang responsif dan membantu. Mereka memberikan tips bagus tentang manajemen stock dan prediksi pasar. Sangat berkontribusi pada kesuksesan bisnis saya.",
      rating: 5,
      image: "👨‍🌾",
    },
    {
      name: "Linda Kusuma",
      role: "Manajer Pasar Tradisional",
      location: "Surabaya, Jawa Timur",
      content:
        "Integrasi dengan GoTani membuat operasional pasar kami lebih efisien. Data harga real-time membantu kami memberikan informasi akurat kepada pengunjung dan supplier.",
      rating: 5,
      image: "👩‍💼",
    },
  ]

  const testimonials_en = [
    {
      name: "Budi Santoso",
      role: "Rice Farmer",
      location: "Karawang, West Java",
      content:
        "GoTani really transformed my business. With access to real-time market prices, I can sell my harvest at much fairer prices. My profits increased by 40% in the first 3 months!",
      rating: 5,
      image: "👨‍🌾",
    },
    {
      name: "Siti Nurhaliza",
      role: "Vegetable Distributor",
      location: "Jakarta, Special Capital Region",
      content:
        "This platform makes it very easy for us to find trustworthy and quality farmers. Transaction processes are faster and more transparent. Our food loss has decreased significantly since using GoTani.",
      rating: 5,
      image: "👩‍💼",
    },
    {
      name: "Ahmad Wijaya",
      role: "Chili Farmer",
      location: "Lombok, West Nusa Tenggara",
      content:
        "What I love is GoTani's responsive and helpful support team. They provide great tips on inventory management and market forecasting. This has greatly contributed to my business success.",
      rating: 5,
      image: "👨‍🌾",
    },
    {
      name: "Linda Kusuma",
      role: "Traditional Market Manager",
      location: "Surabaya, East Java",
      content:
        "Integration with GoTani made our market operations more efficient. Real-time price data helps us provide accurate information to visitors and suppliers.",
      rating: 5,
      image: "👩‍💼",
    },
  ]

  const blogPosts_id = [
    {
      id: 1,
      title: "5 Strategi Meningkatkan Penjualan Hasil Panen di Era Digital",
      excerpt:
        "Pelajari strategi-strategi efektif untuk meningkatkan penjualan hasil panen Anda melalui platform digital modern seperti GoTani.",
      date: "15 November 2024",
      author: "Tim GoTani",
      category: "Tips Bisnis",
      readTime: "5 min read",
    },
    {
      id: 2,
      title: "Mengurangi Food Loss: Panduan Lengkap untuk Distributor",
      excerpt:
        "Strategi praktis untuk mengurangi pemborosan pangan dan meningkatkan efisiensi logistik dalam bisnis distribusi Anda.",
      date: "10 November 2024",
      author: "Tim GoTani",
      category: "Tips Bisnis",
      readTime: "6 min read",
    },
  ]

  const blogPosts_en = [
    {
      id: 1,
      title: "5 Strategies to Increase Your Harvest Sales in the Digital Era",
      excerpt:
        "Learn effective strategies to increase your harvest sales through modern digital platforms like GoTani.",
      date: "15 November 2024",
      author: "GoTani Team",
      category: "Business Tips",
      readTime: "5 min read",
    },
    {
      id: 2,
      title: "Reducing Food Loss: Comprehensive Guide for Distributors",
      excerpt:
        "Practical strategies to reduce food waste and improve logistics efficiency in your distribution business.",
      date: "12 November 2024",
      author: "Dr. Santoso",
      category: "Education",
      readTime: "7 min read",
    },
    {
      id: 3,
      title: "Agricultural Commodities Price Trends Analysis: Q4 2024",
      excerpt:
        "Comprehensive report on agricultural commodities price trends for the fourth quarter of 2024 in various regions of Indonesia.",
      date: "10 November 2024",
      author: "Analytics Team",
      category: "Market Report",
      readTime: "6 min read",
    },
    {
      id: 4,
      title: "Organic Farming Success with GoTani's Transparent Pricing",
      excerpt:
        "Success story of an organic farmer who increased their income through access to transparent market prices.",
      date: "8 November 2024",
      author: "Mr. Bambang",
      category: "Success Story",
      readTime: "4 min read",
    },
  ]

  const heroText = {
    id: {
      title: 'Cerita Sukses Pengguna GoTani',
      subtitle: 'Dengarkan kisah nyata dari petani dan distributor yang telah merasakan manfaat GoTani dalam mengembangkan bisnis mereka.',
      cta: 'Bagikan Cerita Anda',
    },
    en: {
      title: 'GoTani User Success Stories',
      subtitle: 'Hear real stories from farmers and distributors who have benefited from GoTani in growing their businesses.',
      cta: 'Share Your Story',
    },
  }

  const t = heroText[language]

  const testimonials = language === 'id' ? testimonials_id : testimonials_en
  const blogPosts = language === 'id' ? blogPosts_id : blogPosts_en

  return (
    <main>
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-primary/5 to-transparent">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
            {t.title}
          </h1>
          <p className="text-lg text-muted-foreground text-balance">
            {t.subtitle}
          </p>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-lg p-8 hover:shadow-lg transition-shadow"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                <p className="text-muted-foreground leading-relaxed mb-6 italic">"{testimonial.content}"</p>

                <div className="flex items-center gap-4 pt-6 border-t border-border">
                  <div className="text-3xl">{testimonial.image}</div>
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Blog & Insights</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Artikel, tips, dan laporan pasar terbaru untuk membantu Anda sukses dalam bisnis pertanian
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {blogPosts.map((post) => (
              <article
                key={post.id}
                className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow flex flex-col"
              >
                {/* Featured Image Placeholder */}
                <div className="bg-gradient-to-br from-primary/10 to-secondary/10 h-48 flex items-center justify-center">
                  <div className="text-6xl opacity-20">📰</div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded">
                      {post.category}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-foreground mb-3 leading-tight">{post.title}</h3>

                  <p className="text-muted-foreground text-sm mb-4 flex-grow">{post.excerpt}</p>

                  <div className="flex items-center justify-between pt-4 border-t border-border mt-auto">
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {post.date}
                      </div>
                      <span>{post.readTime}</span>
                    </div>
                    <button className="text-primary font-semibold hover:text-primary/80 transition-colors flex items-center gap-1">
                      Read
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-semibold">
              Lihat Semua Artikel
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-12 text-center">Kepercayaan Komunitas</h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { number: "4.8/5", label: "Rating Kepuasan" },
              { number: "5,000+", label: "Testimoni Positif" },
              { number: "95%", label: "Tingkat Retensi" },
              { number: "2M+", label: "Transaksi Sukses" },
            ].map((stat, index) => (
              <div key={index} className="text-center p-6 bg-card border border-border rounded-lg">
                <div className="text-4xl font-bold text-primary mb-2">{stat.number}</div>
                <p className="text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Jadilah Bagian dari Komunitas GoTani</h2>
          <p className="text-lg opacity-90 mb-8">
            Bergabunglah dengan ribuan pengguna yang telah merasakan transformasi bisnis mereka melalui GoTani
          </p>
          <button className="inline-flex items-center justify-center px-6 py-3 bg-primary-foreground text-primary rounded-lg hover:bg-primary-foreground/90 transition-colors font-semibold">
            Mulai Sekarang
          </button>
        </div>
      </section>

      <Footer />
    </main>
  )
}
