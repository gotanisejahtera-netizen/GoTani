"use client"

import React from "react"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ChevronDown } from "lucide-react"

export default function FAQPage() {
  const faqs = [
    {
      category: "Umum",
      questions: [
        {
          q: "Apa itu GoTani?",
          a: "GoTani adalah platform digital yang menghubungkan petani langsung dengan distributor untuk memberikan transparansi harga pasar real-time dan mengurangi pemborosan pangan dalam sistem pangan berkelanjutan.",
        },
        {
          q: "Siapa saja yang bisa menggunakan GoTani?",
          a: "GoTani dirancang untuk petani, distributor, pedagang, dan siapa saja yang terlibat dalam supply chain pertanian di Indonesia. Cukup daftar dan verifikasi akun Anda untuk mulai menggunakan platform.",
        },
        {
          q: "Apakah GoTani tersedia di semua wilayah Indonesia?",
          a: "GoTani saat ini telah hadir di 25+ provinsi di Indonesia. Kami terus memperluas jangkauan kami ke daerah-daerah lainnya. Cek area layanan kami untuk mengetahui ketersediaan di wilayah Anda.",
        },
      ],
    },
    {
      category: "Pendaftaran & Akun",
      questions: [
        {
          q: "Bagaimana cara mendaftar di GoTani?",
          a: "Klik tombol 'Daftar' di halaman utama, isi data pribadi Anda, dan ikuti proses verifikasi. Verifikasi biasanya selesai dalam 1-2 hari kerja.",
        },
        {
          q: "Apakah pendaftaran gratis?",
          a: "Ya, pendaftaran di GoTani sepenuhnya gratis. Anda hanya perlu verifikasi identitas untuk memastikan keamanan platform.",
        },
        {
          q: "Bagaimana jika saya lupa password?",
          a: "Klik 'Lupa Password' di halaman login, masukkan email Anda, dan kami akan mengirimkan link reset password ke email Anda dalam beberapa menit.",
        },
      ],
    },
    {
      category: "Fitur & Penggunaan",
      questions: [
        {
          q: "Bagaimana cara melihat harga pasar real-time?",
          a: "Masuk ke akun Anda, buka menu 'Harga Pasar', pilih komoditas dan wilayah yang ingin Anda lihat. Data harga diupdate setiap jam dari berbagai sumber terpercaya.",
        },
        {
          q: "Bagaimana cara menemukan petani atau distributor?",
          a: "Gunakan fitur 'Temukan Mitra' di platform kami. Anda bisa filter berdasarkan komoditas, lokasi, dan rating. Semua mitra telah terverifikasi dan terpercaya.",
        },
        {
          q: "Apakah ada biaya transaksi?",
          a: "GoTani mengenakan biaya komisi yang kompetitif untuk setiap transaksi yang berhasil. Besarnya komisi tergantung pada jenis dan volume transaksi. Lihat halaman Pricing untuk detail lengkap.",
        },
      ],
    },
    {
      category: "Keamanan & Privasi",
      questions: [
        {
          q: "Apakah data saya aman di GoTani?",
          a: "Kami menggunakan enkripsi tingkat bank dan protokol keamanan enterprise untuk melindungi data Anda. Semua transaksi dienkripsi end-to-end dan disimpan di server yang aman.",
        },
        {
          q: "Bagaimana GoTani menjaga privasi data saya?",
          a: "Kami mematuhi standar privasi data internasional dan tidak akan pernah membagikan data pribadi Anda kepada pihak ketiga tanpa persetujuan Anda.",
        },
        {
          q: "Bagaimana jika terjadi masalah dengan transaksi?",
          a: "Hubungi tim support kami melalui email atau live chat. Kami memiliki sistem dispute resolution yang adil untuk menyelesaikan masalah transaksi dalam 5 hari kerja.",
        },
      ],
    },
    {
      category: "Support & Bantuan",
      questions: [
        {
          q: "Bagaimana cara menghubungi customer support?",
          a: "Anda dapat menghubungi kami melalui Email (support@gotani.com), Live Chat di platform, atau telepon ke +62-21-xxxx-xxxx pada jam kerja.",
        },
        {
          q: "Berapa lama waktu response support?",
          a: "Tim support kami merespons: Email dalam 2 jam, Live Chat dalam 5 menit, dan Telepon langsung. Kami tersedia Senin-Jumat pukul 09:00-17:00 WIB.",
        },
        {
          q: "Apakah ada tutorial atau panduan penggunaan?",
          a: "Ya, tersedia tutorial video, panduan tertulis, dan webinar gratis di pusat pembelajaran kami. Akses semuanya melalui menu 'Belajar' di dashboard Anda.",
        },
      ],
    },
  ]

  const [openIndex, setOpenIndex] = React.useState<string | null>(null)

  return (
    <main>
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-primary/5 to-transparent">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
            Pertanyaan yang Sering Diajukan
          </h1>
          <p className="text-lg text-muted-foreground text-balance">
            Temukan jawaban atas pertanyaan umum tentang GoTani, fitur-fitur kami, dan cara menggunakan platform.
          </p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-12">
            {faqs.map((section, sectionIndex) => (
              <div key={sectionIndex}>
                <h2 className="text-2xl font-bold text-foreground mb-6 pb-4 border-b-2 border-primary">
                  {section.category}
                </h2>

                <div className="space-y-4">
                  {section.questions.map((item, qIndex) => {
                    const id = `${sectionIndex}-${qIndex}`
                    const isOpen = openIndex === id

                    return (
                      <div key={qIndex} className="border border-border rounded-lg overflow-hidden transition-all">
                        <button
                          onClick={() => setOpenIndex(isOpen ? null : id)}
                          className="w-full px-6 py-4 flex items-start justify-between gap-4 hover:bg-muted/50 transition-colors text-left"
                        >
                          <span className="font-semibold text-foreground pr-4">{item.q}</span>
                          <ChevronDown
                            className={`w-5 h-5 text-primary flex-shrink-0 transition-transform ${
                              isOpen ? "rotate-180" : ""
                            }`}
                          />
                        </button>

                        {isOpen && (
                          <div className="px-6 py-4 bg-muted/30 border-t border-border">
                            <p className="text-muted-foreground leading-relaxed">{item.a}</p>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Still Have Questions */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Masih Ada Pertanyaan?</h2>
          <p className="text-lg opacity-90 mb-8">
            Tim support kami siap membantu Anda. Hubungi kami melalui berbagai channel yang tersedia.
          </p>
          <a
            href="https://wa.me/6281554877596"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-6 py-3 bg-primary-foreground text-primary rounded-lg hover:bg-primary-foreground/90 transition-colors font-semibold"
          >
            Hubungi Kami di WhatsApp
          </a>
        </div>
      </section>

      <Footer />
    </main>
  )
}
