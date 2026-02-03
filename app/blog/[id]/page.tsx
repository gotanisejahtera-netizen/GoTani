import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { Calendar, User, Clock, ArrowLeft, Share2, Facebook, Twitter, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function BlogPostPage({ params }: { params: { id: string } }) {
  // This would normally fetch from a database
  const post = {
    id: params.id,
    title: "Tips Mengurangi Food Loss dalam Pertanian Modern",
    excerpt:
      "Pelajari strategi efektif untuk mengurangi pemborosan makanan di setiap tahap rantai pasokan pertanian Anda.",
    date: "2025-01-15",
    author: "Dr. Ahmad Hidayat",
    authorBio: "Pakar Pertanian Berkelanjutan dengan pengalaman 15 tahun di bidang food supply chain management.",
    category: "Tips & Panduan",
    readTime: "8 menit",
    image: "/agricultural-tips.jpg",
    content: `
      <h2>Mengapa Food Loss Menjadi Masalah Serius?</h2>
      <p>Food loss atau kehilangan pangan merupakan salah satu tantangan terbesar dalam industri pertanian modern. Di Indonesia, diperkirakan 30-40% hasil panen terbuang sia-sia sebelum sampai ke konsumen akhir. Ini bukan hanya merugikan petani secara ekonomi, tetapi juga berdampak negatif pada lingkungan dan ketahanan pangan nasional.</p>
      
      <p>Kehilangan ini terjadi di berbagai tahap: saat panen, penanganan pasca panen, penyimpanan, transportasi, hingga distribusi. Dengan strategi yang tepat, kerugian ini dapat diminimalkan secara signifikan.</p>

      <h2>Strategi Utama Mengurangi Food Loss</h2>
      
      <h3>1. Timing Panen yang Tepat</h3>
      <p>Salah satu faktor terpenting adalah menentukan waktu panen yang optimal. Panen terlalu cepat atau terlalu lambat dapat menyebabkan kualitas produk menurun drastis. Gunakan indikator kematangan yang tepat untuk setiap jenis komoditas.</p>
      
      <ul>
        <li>Gunakan teknologi sensor untuk mengukur tingkat kematangan</li>
        <li>Perhatikan kondisi cuaca sebelum panen</li>
        <li>Koordinasikan dengan buyer untuk memastikan distribusi cepat</li>
      </ul>

      <h3>2. Penanganan Pasca Panen yang Baik</h3>
      <p>Periode pasca panen adalah fase kritis dimana produk sangat rentan terhadap kerusakan. Beberapa praktik terbaik meliputi:</p>
      
      <ul>
        <li><strong>Sortasi dan Grading:</strong> Pisahkan produk berdasarkan kualitas untuk memaksimalkan nilai jual</li>
        <li><strong>Pembersihan:</strong> Bersihkan produk dari kotoran dan kontaminan</li>
        <li><strong>Pre-cooling:</strong> Turunkan suhu produk dengan cepat untuk memperlambat respirasi</li>
        <li><strong>Pengemasan:</strong> Gunakan kemasan yang sesuai untuk melindungi produk</li>
      </ul>

      <h3>3. Sistem Penyimpanan yang Optimal</h3>
      <p>Investasi dalam fasilitas penyimpanan yang tepat sangat penting. Cold storage dan controlled atmosphere storage dapat memperpanjang masa simpan produk hingga beberapa minggu atau bulan.</p>
      
      <blockquote>
        "Dengan cold storage yang baik, kami berhasil mengurangi food loss dari 35% menjadi hanya 8%. Ini adalah game changer untuk bisnis kami." - Bapak Budi, Petani Sayuran Yogyakarta
      </blockquote>

      <h3>4. Manajemen Rantai Pasokan yang Efisien</h3>
      <p>Koordinasi yang baik antara petani, transporter, dan distributor sangat penting. Platform seperti GoTani membantu menciptakan transparansi dan efisiensi dalam rantai pasokan.</p>

      <h2>Teknologi Pendukung</h2>
      <p>Teknologi modern telah membuat pengelolaan food loss jauh lebih mudah:</p>
      
      <ul>
        <li><strong>IoT Sensors:</strong> Monitor suhu dan kelembaban secara real-time</li>
        <li><strong>Blockchain:</strong> Traceability penuh dari farm to table</li>
        <li><strong>AI Prediction:</strong> Prediksi demand untuk mengurangi overproduction</li>
        <li><strong>Mobile Apps:</strong> Koordinasi real-time dengan buyer</li>
      </ul>

      <h2>Implementasi dengan GoTani</h2>
      <p>GoTani menyediakan berbagai tools untuk membantu petani mengurangi food loss:</p>
      
      <ul>
        <li>Dashboard untuk tracking kondisi penyimpanan</li>
        <li>Koneksi langsung dengan distributor untuk distribusi cepat</li>
        <li>Prediksi harga untuk timing panen optimal</li>
        <li>Network cold storage partners di berbagai lokasi</li>
      </ul>

      <h2>Kesimpulan</h2>
      <p>Mengurangi food loss bukan hanya tentang meningkatkan profit, tetapi juga berkontribusi pada sustainability dan ketahanan pangan. Dengan kombinasi praktik yang baik, teknologi modern, dan platform seperti GoTani, petani Indonesia dapat mengurangi kerugian secara signifikan.</p>
      
      <p>Mulai langkah kecil hari ini, dan lihat dampak besarnya dalam jangka panjang. Bergabunglah dengan ribuan petani lain yang telah merasakan manfaatnya.</p>
    `,
  }

  const relatedPosts = [
    {
      id: 5,
      title: "Panduan Lengkap Menggunakan Platform GoTani",
      image: "/platform-guide.png",
      category: "Tips & Panduan",
    },
    {
      id: 8,
      title: "Manajemen Kualitas Pasca Panen",
      image: "/post-harvest.jpg",
      category: "Tips & Panduan",
    },
    {
      id: 6,
      title: "Teknologi AI dalam Prediksi Harga Pertanian",
      image: "/ai-technology.png",
      category: "Teknologi",
    },
  ]

  return (
    <main>
      <Navigation />

      <article className="pt-32 pb-16">
        {/* Back Button */}
        <div className="px-4 sm:px-6 lg:px-8 mb-8">
          <div className="max-w-4xl mx-auto">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Kembali ke Blog
            </Link>
          </div>
        </div>

        {/* Hero Image */}
        <div className="px-4 sm:px-6 lg:px-8 mb-12">
          <div className="max-w-5xl mx-auto">
            <img
              src={post.image || "/placeholder.svg"}
              alt={post.title}
              className="w-full h-96 object-cover rounded-2xl shadow-2xl"
            />
          </div>
        </div>

        {/* Article Header */}
        <div className="px-4 sm:px-6 lg:px-8 mb-8">
          <div className="max-w-4xl mx-auto">
            <span className="inline-block px-4 py-1 bg-primary/10 text-primary text-sm font-semibold rounded-full mb-6">
              {post.category}
            </span>

            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6 leading-tight">{post.title}</h1>

            <p className="text-xl text-muted-foreground mb-8">{post.excerpt}</p>

            <div className="flex flex-wrap items-center gap-6 pb-8 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">{post.author}</p>
                  <p className="text-sm text-muted-foreground">{post.authorBio}</p>
                </div>
              </div>

              <div className="flex gap-4 text-sm text-muted-foreground ml-auto">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {new Date(post.date).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {post.readTime}
                </div>
              </div>
            </div>

            {/* Share Buttons */}
            <div className="flex items-center gap-3 py-6">
              <span className="text-sm font-medium text-muted-foreground">Bagikan:</span>
              <button className="p-2 rounded-full hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="w-5 h-5" />
              </button>
              <button className="p-2 rounded-full hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="w-5 h-5" />
              </button>
              <button className="p-2 rounded-full hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="w-5 h-5" />
              </button>
              <button className="p-2 rounded-full hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <div className="px-4 sm:px-6 lg:px-8 mb-16">
          <div className="max-w-4xl mx-auto prose prose-lg max-w-none">
            <div className="article-content" dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>
        </div>

        {/* CTA Section */}
        <div className="px-4 sm:px-6 lg:px-8 mb-16">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-primary via-primary/90 to-secondary rounded-2xl p-8 sm:p-12 text-center text-white">
              <h3 className="text-2xl sm:text-3xl font-bold mb-4">Siap Mengurangi Food Loss di Pertanian Anda?</h3>
              <p className="text-white/90 mb-6 text-lg">
                Bergabung dengan GoTani dan dapatkan akses ke tools dan network yang membantu ribuan petani meningkatkan
                efisiensi mereka.
              </p>
              <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 font-semibold">
                <Link href="https://wa.me/6281554877596" target="_blank">
                  Mulai Sekarang
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Related Posts */}
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-foreground mb-8">Artikel Terkait</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost) => (
                <Link href={`/blog/${relatedPost.id}`} key={relatedPost.id}>
                  <article className="bg-white border border-border rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={relatedPost.image || "/placeholder.svg"}
                        alt={relatedPost.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <span className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-sm text-primary text-xs font-semibold rounded-full">
                        {relatedPost.category}
                      </span>
                    </div>

                    <div className="p-6">
                      <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors line-clamp-2">
                        {relatedPost.title}
                      </h3>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  )
}
