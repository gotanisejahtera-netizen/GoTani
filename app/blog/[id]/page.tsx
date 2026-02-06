import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { Calendar, User, Clock, ArrowLeft, Share2, Facebook, Twitter, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"

export default async function BlogPostPage({ params }: { params: Promise<{ id: string }> | { id: string } }) {
  const resolvedParams = await params as { id: string }
  const slug = resolvedParams.id
  // Build a stable absolute URL for the internal API (fallback to localhost for dev)
  const base = process.env.NEXT_PUBLIC_APP_URL || `http://localhost:${process.env.PORT || 3000}`
  const apiUrl = new URL('/api/blogs', base).toString()
  const res = await fetch(apiUrl, { cache: 'no-store' }).catch(() => null)
  const allPosts = res && res.ok ? await res.json() : []
  const post = allPosts.find((p: any) => p.slug === slug)
  if (!post) {
    return (
      <main>
        <Navigation />
        <div className="pt-32 px-4">Post not found</div>
        <Footer />
      </main>
    )
  }

  const relatedPosts = (allPosts || []).filter((p: any) => p.id !== post.id).slice(0, 3)

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
                  {post.date ? new Date(post.date).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  }) : ''}
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
            <div className="article-content" dangerouslySetInnerHTML={{ __html: post.content ?? '' }} />
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
              {relatedPosts.map((relatedPost: any) => (
                <Link href={`/blog/${relatedPost.slug}`} key={relatedPost.id}>
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
