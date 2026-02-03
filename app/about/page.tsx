'use client'

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Users, Target, Leaf, Heart } from "lucide-react"
import { useLanguage } from "@/app/language-provider"

export default function AboutPage() {
  const { language } = useLanguage()
  
  const content = {
    id: {
      title: 'Tentang GoTani',
      subtitle: 'Kami adalah platform yang berkomitmen untuk mengubah sistem pertanian dan pangan di Indonesia melalui transparansi, efisiensi, dan keberlanjutan.',
      missionTitle: 'Misi Kami',
      missionText: 'Menghubungkan petani langsung dengan distributor melalui platform digital yang transparan, sehingga petani mendapatkan harga yang adil dan distributor dapat mengakses produk berkualitas dengan efisien.',
      visionTitle: 'Visi Kami',
      visionText: 'Membangun ekosistem pertanian berkelanjutan di Indonesia yang memberdayakan petani, mendukung distributor, dan mengurangi pemborosan pangan untuk ketahanan pangan nasional yang lebih baik.',
      valuesTitle: 'Nilai-Nilai Inti',
      valuesSubtitle: 'Prinsip yang memandu setiap keputusan dan tindakan kami di GoTani',
      values: [
        { title: 'Integritas', description: 'Transparansi penuh dalam setiap transaksi dan komunikasi', icon: Heart },
        { title: 'Pemberdayaan', description: 'Memberikan kontrol dan keuntungan kepada petani dan distributor', icon: Users },
        { title: 'Keberlanjutan', description: 'Mempromosikan praktik pertanian yang ramah lingkungan', icon: Leaf },
        { title: 'Inovasi', description: 'Terus berinovasi untuk solusi pertanian yang lebih baik', icon: Target },
      ],
      storyTitle: 'Kisah Kami',
      story: [
        'GoTani lahir dari pengamatan mendalam tentang tantangan yang dihadapi petani Indonesia. Kami melihat bagaimana petani sering kali menerima harga yang tidak adil karena berbagai perantara, sementara distributor kesulitan menemukan sumber produk berkualitas yang stabil dan terpercaya.',
        'Dengan latar belakang dalam teknologi dan pemahaman mendalam tentang sektor pertanian, tim kami memutuskan untuk membangun solusi yang mengubah dinamika ini. GoTani dirancang untuk menyederhanakan supply chain pertanian, memberikan transparansi harga real-time, dan mengurangi food loss yang merugikan semua pihak.',
        'Hari ini, GoTani telah berkembang menjadi platform terpercaya yang menghubungkan ribuan petani dan distributor di seluruh Indonesia. Kami terus berinovasi dan memperluas jangkauan kami untuk menciptakan dampak positif yang berkelanjutan dalam sistem pertanian nasional.',
      ],
      stats: [
        { number: '5K+', label: 'Petani Terdaftar' },
        { number: '2K+', label: 'Distributor' },
        { number: '25', label: 'Provinsi' },
        { number: '100k+', label: 'Transaksi' },
      ],
    },
    en: {
      title: 'About GoTani',
      subtitle: 'We are a platform committed to transforming Indonesia\'s agricultural and food system through transparency, efficiency, and sustainability.',
      missionTitle: 'Our Mission',
      missionText: 'Connect farmers directly with distributors through a transparent digital platform, so farmers receive fair prices and distributors can access quality products efficiently.',
      visionTitle: 'Our Vision',
      visionText: 'Build a sustainable agricultural ecosystem in Indonesia that empowers farmers, supports distributors, and reduces food waste for better national food security.',
      valuesTitle: 'Core Values',
      valuesSubtitle: 'Principles that guide every decision and action we take at GoTani',
      values: [
        { title: 'Integrity', description: 'Complete transparency in every transaction and communication', icon: Heart },
        { title: 'Empowerment', description: 'Providing control and benefits to farmers and distributors', icon: Users },
        { title: 'Sustainability', description: 'Promoting environmentally friendly agricultural practices', icon: Leaf },
        { title: 'Innovation', description: 'Continuously innovating for better agricultural solutions', icon: Target },
      ],
      storyTitle: 'Our Story',
      story: [
        'GoTani was born from deep observation of the challenges faced by Indonesian farmers. We witnessed how farmers often receive unfair prices due to various intermediaries, while distributors struggle to find reliable and trustworthy sources of quality products.',
        'With a background in technology and deep understanding of the agricultural sector, our team decided to build a solution that would change this dynamic. GoTani is designed to simplify agricultural supply chains, provide real-time price transparency, and reduce food loss that harms all parties.',
        'Today, GoTani has grown into a trusted platform connecting thousands of farmers and distributors throughout Indonesia. We continue to innovate and expand our reach to create lasting positive impact in the national agricultural system.',
      ],
      stats: [
        { number: '5K+', label: 'Registered Farmers' },
        { number: '2K+', label: 'Distributors' },
        { number: '8', label: 'Provinces' },
        { number: '100k+', label: 'Transactions' },
      ],
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
            {t.title}
          </h1>
          <p className="text-lg text-muted-foreground text-balance">
            {t.subtitle}
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Mission */}
            <div className="bg-card border border-border rounded-lg p-8">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-4">{t.missionTitle}</h2>
              <p className="text-muted-foreground leading-relaxed">
                {t.missionText}
              </p>
            </div>

            {/* Vision */}
            <div className="bg-card border border-border rounded-lg p-8">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Leaf className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-4">{t.visionTitle}</h2>
              <p className="text-muted-foreground leading-relaxed">
                {t.visionText}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">{t.valuesTitle}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t.valuesSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.values.map((value, index) => {
              const icons = [Heart, Users, Leaf, Target]
              const Icon = icons[index]
              return (
                <div key={index} className="bg-card border border-border rounded-lg p-6 text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 mx-auto">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-bold text-foreground mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-8 text-center">{t.storyTitle}</h2>
          <div className="space-y-6 text-muted-foreground leading-relaxed">
            {t.story.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-primary text-primary-foreground">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            {t.stats.map((stat, index) => (
              <div key={index}>
                <div className="text-4xl font-bold mb-2">{stat.number}</div>
                <p className="opacity-90">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
