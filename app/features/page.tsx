'use client'

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { BarChart3, Shield, Zap, Globe, TrendingUp, Users, Clock, Lock, ShieldCheck } from "lucide-react"
import { useLanguage } from "@/app/language-provider"

export default function FeaturesPage() {
  const { language } = useLanguage()

  const content = {
    id: {
      hero: {
        title: 'Apa yang Bisa Kami Lakukan untuk Anda?',
        subtitle: 'GoTani menyediakan solusi lengkap untuk menghubungkan petani dengan distributor, pembeli, dan sistem pasar yang lebih adil.',
      },
      mainFeatures: {
        title: 'Fitur Unggulan',
        subtitle: 'Semua yang Anda butuhkan untuk mengelola bisnis pertanian dengan lebih efisien',
        feature1: {
          title: 'Marketingkan Produk Anda ke Distributor',
          desc: 'Kami menghubungkan petani langsung dengan distributor potensial. Jual hasil tani Anda dengan harga lebih tinggi tanpa melalui perantara berbelit-belit.',
          items: ['Hubungan langsung dengan pembeli', 'Harga yang lebih kompetitif', 'Jangkauan pasar lebih luas'],
        },
        feature2: {
          title: 'Gratis Daftar - Tidak Ada Biaya Tersembunyi',
          desc: 'Bergabunglah dengan GoTani tanpa biaya pendaftaran apapun. Kami percaya pertanian harus terjangkau dan menguntungkan bagi semua.',
          items: ['Pendaftaran 100% gratis', 'Tidak ada biaya tersembunyi', 'Transparansi penuh'],
        },
        feature3: {
          title: 'Data & Analitik Real-Time',
          desc: 'Akses data pasar terkini, harga komoditas, dan analisis tren untuk membuat keputusan bisnis yang lebih baik dan lebih cepat.',
          items: ['Harga pasar real-time', 'Analisis tren produk', 'Prediksi permintaan akurat'],
        },
      },
    },
    en: {
      hero: {
        title: 'What Can We Do For You?',
        subtitle: 'GoTani provides complete solutions to connect farmers with distributors, buyers, and a fairer market system.',
      },
      mainFeatures: {
        title: 'Main Features',
        subtitle: 'Everything you need to manage your agricultural business more efficiently',
        feature1: {
          title: 'Market Your Products to Distributors',
          desc: 'We connect farmers directly with potential distributors. Sell your harvest at higher prices without going through complicated intermediaries.',
          items: ['Direct relationship with buyers', 'More competitive prices', 'Broader market reach'],
        },
        feature2: {
          title: 'Free Registration - No Hidden Fees',
          desc: 'Join GoTani without any registration fees. We believe agriculture should be affordable and profitable for everyone.',
          items: ['100% free registration', 'No hidden fees', 'Complete transparency'],
        },
        feature3: {
          title: 'Real-Time Data & Analytics',
          desc: 'Access current market data, commodity prices, and trend analysis to make better and faster business decisions.',
          items: ['Real-time market prices', 'Product trend analysis', 'Accurate demand forecasting'],
        },
      },
    },
  }

  const t = content[language]

  return (
    <main>
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-primary/5 to-transparent">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
            {t.hero.title}
          </h1>
          <p className="text-lg text-muted-foreground text-balance">
            {t.hero.subtitle}
          </p>
        </div>
      </section>

      {/* Main Features */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">{t.mainFeatures.title}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t.mainFeatures.subtitle}
            </p>
          </div>

          <div className="space-y-12">
            {/* Feature 1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">{t.mainFeatures.feature1.title}</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {t.mainFeatures.feature1.desc}
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {t.mainFeatures.feature1.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-primary mt-1">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg h-64 flex items-center justify-center">
                <Users className="w-24 h-24 text-primary/40" />
              </div>
            </div>

            {/* Feature 2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center md:grid-flow-dense">
              <div className="bg-gradient-to-br from-secondary/10 to-primary/10 rounded-lg h-64 flex items-center justify-center">
                <ShieldCheck className="w-24 h-24 text-secondary/40" />
              </div>
              <div>
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                  <ShieldCheck className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">{t.mainFeatures.feature2.title}</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {t.mainFeatures.feature2.desc}
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {t.mainFeatures.feature2.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-secondary mt-1">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                  <li className="flex items-start gap-2">
                    <span className="text-secondary mt-1">✓</span>
                    <span>Akses semua fitur dasar</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary mt-1">✓</span>
                    <span>Tidak ada komisi tersembunyi</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Feature 3 - Untuk Distributor */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">Untuk Distributor: Cari Supplier Sayuran/Buah</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Butuh sayuran atau buah jenis tertentu? GoTani membantu Anda menemukan petani terbaik dengan kualitas dan harga yang sesuai kebutuhan bisnis Anda.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span>Cari supplier yang terverifikasi</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span>Harga grosir yang kompetitif</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span>Jaminan kualitas dan konsistensi</span>
                  </li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg h-64 flex items-center justify-center">
                <TrendingUp className="w-24 h-24 text-primary/40" />
              </div>
            </div>

            {/* Feature 4 - Untuk Pembeli */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center md:grid-flow-dense">
              <div className="bg-gradient-to-br from-accent/10 to-primary/10 rounded-lg h-64 flex items-center justify-center">
                <Globe className="w-24 h-24 text-accent/40" />
              </div>
              <div>
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <Globe className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">Untuk Pembeli: Cari Buah/Sayuran yang Anda Inginkan</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Cari produk segar langsung dari petani pilihan. Dapatkan harga terbaik dengan kualitas yang terjamin dan pengiriman langsung ke tempat Anda.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">✓</span>
                    <span>Produk segar dari petani pilihan</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">✓</span>
                    <span>Harga lebih murah dari pasar</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">✓</span>
                    <span>Pengiriman cepat dan aman</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

          {/* Additional Features Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-12 text-center">Fitur Tambahan</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: BarChart3,
                title: "Transparansi Harga untuk Petani",
                description: "Lihat harga pasar yang sebenarnya agar petani tidak ditipu dan mendapat harga yang fair",
              },
              {
                icon: Shield,
                title: "Keamanan Tingkat Enterprise",
                description: "Enkripsi end-to-end dan perlindungan data tingkat bank untuk semua transaksi",
              },
              {
                icon: Clock,
                title: "Dukungan 24/7",
                description: "Tim support siap membantu Anda kapan saja dengan respons cepat",
              },
              {
                icon: Globe,
                title: "Jangkauan Nasional",
                description: "Terhubung dengan mitra di seluruh Indonesia untuk kesempatan tak terbatas",
              },
              {
                icon: Lock,
                title: "Verifikasi Terverifikasi",
                description: "Semua petani dan distributor melewati proses verifikasi ketat",
              },
              {
                icon: Zap,
                title: "Platform Mobile",
                description: "Aplikasi mobile yang user-friendly untuk akses di mana saja, kapan saja",
              },
              {
                icon: TrendingUp,
                title: "Analytics Dashboard",
                description: "Dashboard analitik komprehensif untuk melacak performa bisnis Anda",
              },
              {
                icon: Users,
                title: "Komunitas Aktif",
                description: "Bergabung dengan ribuan petani dan distributor untuk berbagi tips",
              },
            ].map((feature, index) => {
              const Icon = feature.icon
              return (
                <div key={index} className="bg-card border border-border rounded-lg p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Siap Mengalami Fitur-Fitur Ini?</h2>
          <p className="text-lg opacity-90 mb-8">
            Bergabunglah dengan ribuan petani dan distributor yang sudah merasakan manfaat GoTani
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
