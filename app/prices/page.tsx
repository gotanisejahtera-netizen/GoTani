"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { ProductCarousel } from "@/components/product-carousel"
import { ProductSpecifications } from "@/components/product-specifications"
import { MessageCircle, ArrowRight, X } from "lucide-react"
import { useLanguage } from "@/app/language-provider"
import { formatCurrencyAmount } from '@/lib/format'
import { useEffect, useState } from "react"

type Spec = { attribute: string; value: string }
type Product = {
  id: string
  name: string
  image?: string | null
  images?: string[]
  price?: string | null
  region?: string | null
  shortDesc?: string | null
  specifications?: Spec[]
}

function formatPriceForDisplay(raw?: string | null, language: 'id'|'en' = 'id'){
  if (!raw) return '-'
  const formatted = formatCurrencyAmount(raw, language)
  return (formatted ? `${formatted} per kg` : String(raw))
}

export default function PricesPage() {
  const { language } = useLanguage()
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    async function load(){
      setLoading(true)
      try{
        const res = await fetch('/api/products')
        const json = await res.json()
        if (!mounted) return
        // normalize items so UI expecting images/specifications won't blow up
        const normalized: Product[] = (json || []).map((p: any) => ({
          id: String(p.id),
          name: p.name,
          image: p.image ?? null,
          images: p.images ?? (p.image ? [p.image] : ['/placeholder.svg']),
          price: p.price ?? null,
          region: p.region ?? null,
          shortDesc: p.shortDesc ?? '',
          specifications: p.specifications ?? []
        }))
        setProducts(normalized)
      }catch(err){
        setProducts([])
      }finally{
        setLoading(false)
      }
    }
    load()
    return ()=>{ mounted = false }
  }, [])

  const regions = language === 'id'
    ? ["Semua Wilayah", "Jakarta", "Surabaya", "Bandung", "Medan"]
    : ["All Regions", "Jakarta", "Surabaya", "Bandung", "Medan"]

  return (
    <main>
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-primary/5 to-transparent">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
            {language === 'id' ? 'Katalog Produk GoTani' : 'GoTani Product Catalog'}
          </h1>
          <p className="text-lg text-muted-foreground text-balance">
            {language === 'id'
              ? 'Jelajahi katalog lengkap produk segar dengan spesifikasi detail, foto produk, dan informasi lengkap dari berbagai wilayah'
              : 'Explore our complete catalog of fresh products with detailed specifications, product photos, and information from various regions'}
          </p>
        </div>
      </section>

      {/* WhatsApp Channel banner */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-green-500 to-emerald-600">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-white">
            <div className="flex items-center gap-3">
              <MessageCircle className="w-8 h-8 flex-shrink-0" />
              <div>
                <p className="font-bold text-lg">
                  {language === 'id' ? 'Lihat Katalog GoTani di WhatsApp' : 'View GoTani Catalog on WhatsApp'}
                </p>
                <p className="text-sm opacity-90">
                  {language === 'id'
                    ? 'Akses katalog produk segar dengan foto dan detail lengkap'
                    : 'Access fresh product catalog with complete photos and details'}
                </p>
              </div>
            </div>
            <a
              href="https://whatsapp.com/channel/0029VbC5p426xCSQoaTibA2k"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-green-600 rounded-lg hover:bg-green-50 transition-all duration-300 font-semibold group whitespace-nowrap shadow-lg"
            >
              {language === 'id' ? 'Lihat Katalog' : 'View Catalog'}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </section>

      {/* Products Grid Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-12">
            {language === 'id' ? 'Produk Unggulan' : 'Featured Products'}
          </h2>

          {/* Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {loading ? (
              <div>Loading…</div>
            ) : products.length === 0 ? (
              <div className="text-muted">No products found</div>
            ) : (
                  products.map((product) => (
                <ProductCard
                  key={product.id}
                  name={product.name}
                  image={product.images?.[0] ?? product.image ?? '/placeholder.svg'}
                      price={formatPriceForDisplay(product.price, language)}
                  region={product.region ?? '-'}
                  onViewDetail={() => setSelectedProduct(product)}
                />
              ))
            )}
          </div>
        </div>
      </section>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full shadow-2xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-4 border-b border-border sticky top-0 bg-white">
              <h2 className="text-xl font-bold text-foreground truncate">{selectedProduct.name}</h2>
              <button
                onClick={() => setSelectedProduct(null)}
                className="p-2 hover:bg-muted rounded-lg transition-colors flex-shrink-0"
              >
                <X className="w-5 h-5 text-foreground" />
              </button>
            </div>

            {/* Modal Content - Simplified */}
            <div className="p-4 space-y-4">
              {/* Carousel */}
              <div className="max-h-60 flex items-center justify-center bg-muted/20 rounded-lg overflow-hidden">
                <ProductCarousel images={selectedProduct.images ?? [selectedProduct.image ?? '/placeholder.svg']} productName={selectedProduct.name} />
              </div>

              {/* Product Info */}
              <div>
                <p className="text-sm text-muted-foreground mb-3">{selectedProduct.shortDesc}</p>
                
                <div className="bg-primary/5 p-4 rounded-lg space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{language === 'id' ? 'Harga:' : 'Price:'}</span>
                    <span className="font-bold text-primary">{formatPriceForDisplay(selectedProduct.price)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{language === 'id' ? 'Asal:' : 'Origin:'}</span>
                    <span className="font-semibold text-foreground">{selectedProduct.region ?? '-'}</span>
                  </div>
                </div>

                {/* Contact Button */}
                <a
                  href="https://wa.me/6281554877596"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-semibold text-sm w-full"
                >
                  {language === 'id' ? 'Hubungi Kami' : 'Contact Us'}
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>

              {/* Quick Specifications */}
              <div className="border-t border-border pt-4">
                <h3 className="text-sm font-bold text-foreground mb-3">
                  {language === 'id' ? 'Spesifikasi' : 'Specifications'}
                </h3>
                <div className="space-y-2 text-sm">
                  {(selectedProduct.specifications ?? []).slice(0, 4).map((spec, idx) => (
                    <div key={idx} className="flex justify-between text-xs md:text-sm">
                      <span className="text-muted-foreground">{spec.attribute}:</span>
                      <span className="font-medium text-foreground text-right">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* About Catalog */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-8 text-center">
            {language === 'id' ? 'Tentang Katalog GoTani' : 'About GoTani Catalog'}
          </h2>

          <div className="space-y-6">
            {(language === 'id'
              ? [
                  {
                    step: "1",
                    title: "Informasi Lengkap Produk",
                    description:
                      "Setiap produk dilengkapi dengan foto, spesifikasi detail, dan informasi lengkap untuk memastikan Anda mendapatkan produk berkualitas terbaik.",
                  },
                  {
                    step: "2",
                    title: "Lokasi Panen Transparan",
                    description:
                      "Ketahui persis dari mana produk berasal dan siapa petani penghasilnya. Transparansi penuh untuk kepercayaan dan kualitas.",
                  },
                  {
                    step: "3",
                    title: "Harga yang Fair",
                    description:
                      "Lihat harga pasar yang sebenarnya tanpa markup perantara. Petani mendapat harga yang adil, pembeli hemat biaya.",
                  },
                ]
              : [
                  {
                    step: "1",
                    title: "Complete Product Information",
                    description:
                      "Each product comes with photos, detailed specifications, and complete information to ensure you get the best quality products.",
                  },
                  {
                    step: "2",
                    title: "Transparent Harvest Location",
                    description:
                      "Know exactly where products come from and who the farmers are. Complete transparency for trust and quality.",
                  },
                  {
                    step: "3",
                    title: "Fair Pricing",
                    description:
                      "See real market prices without intermediary markups. Farmers get fair prices, buyers save costs.",
                  },
                ]
            ).map((item, index) => (
              <div key={index} className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold">
                    {item.step}
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            {language === 'id' ? 'Jelajahi Katalog Lengkap GoTani' : 'Explore GoTani Complete Catalog'}
          </h2>
          <p className="text-lg opacity-90 mb-8">
            {language === 'id'
              ? 'Hubungi kami untuk akses penuh ke katalog produk dan bergabung dengan jaringan petani-distributor kami'
              : 'Contact us for full access to our product catalog and join our network of farmers and distributors'}
          </p>
          <a
            href="https://wa.me/6281554877596"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-6 py-3 bg-primary-foreground text-primary rounded-lg hover:bg-primary-foreground/90 transition-colors font-semibold"
          >
            {language === 'id' ? 'Hubungi Kami' : 'Contact Us'}
          </a>
        </div>
      </section>

      <Footer />
    </main>
  )
}
