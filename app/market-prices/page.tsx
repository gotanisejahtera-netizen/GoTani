"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { TrendingUp, TrendingDown } from "lucide-react"
import { useEffect, useState } from "react"
import { useLanguage } from '@/app/language-provider'
import { formatCurrencyAmount } from '@/lib/format'

function formatPrice(raw?: any, language: 'id'|'en' = 'id'){
  if (!raw) return '-'
  const formatted = formatCurrencyAmount(raw, language)
  return formatted ?? String(raw)
}

export default function MarketPricesPage(){
  const { language } = useLanguage()
  const [rows, setRows] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    let mounted = true
    async function load(){
      setLoading(true)
      try{
        const res = await fetch('/api/products')
        const json = await res.json()
        if (!mounted) return
        // derive rows: product name, price, region
        const mapped = (json || []).map((p: any) => ({
          product: p.name,
          price: p.price ?? null,
          region: p.region ?? '-',
        }))
        setRows(mapped)
      }catch(err){
        setRows([])
      }finally{
        setLoading(false)
      }
    }
    load()
    return ()=>{ mounted = false }
  }, [])

  // simple analysis: most expensive and least expensive products
  const numericRows = rows.map(r => ({ ...r, numericPrice: Number(String(r.price || '').replace(/[^0-9]/g,'')) || 0 }))
  const top = [...numericRows].sort((a,b)=> b.numericPrice - a.numericPrice).slice(0,3)
  const bottom = [...numericRows].sort((a,b)=> a.numericPrice - b.numericPrice).slice(0,3)

  return (
    <main>
      <Navigation />

      <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-primary/5 to-transparent">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">{language === 'id' ? 'Harga Pasar Terkini' : 'Market Prices'}</h1>
          <p className="text-lg text-muted-foreground">
            {language === 'id' ? 'Data harga komoditas pertanian real-time dari berbagai wilayah di Indonesia.' : 'Real-time commodity prices from various regions.'}
          </p>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-lg border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-muted/50 border-b">
                    <th className="px-6 py-4 text-left font-semibold text-foreground">Produk</th>
                    <th className="px-6 py-4 text-left font-semibold text-foreground">Harga (per kg)</th>
                    <th className="px-6 py-4 text-left font-semibold text-foreground">Wilayah</th>
                    <th className="px-6 py-4 text-left font-semibold text-foreground">Perubahan</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr><td className="p-6">Loading…</td></tr>
                  ) : rows.length === 0 ? (
                    <tr><td className="p-6">No data</td></tr>
                  ) : (
                    rows.map((row, index) => (
                      <tr key={index} className="border-b hover:bg-muted/30 transition-colors">
                        <td className="px-6 py-4 text-foreground font-medium">{row.product}</td>
                        <td className="px-6 py-4 text-foreground">{formatPrice(row.price, language)}</td>
                        <td className="px-6 py-4 text-muted-foreground text-sm">{row.region}</td>
                        <td className="px-6 py-4 text-muted-foreground text-sm">-</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">Analisis Pasar</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-white border border-border rounded-lg">
                <h3 className="font-semibold text-foreground mb-3">Komoditas Paling Mahal</h3>
                <ul className="space-y-2 text-sm">
                  {top.map((t, i) => (
                    <li key={i} className="flex justify-between">
                      <span>{t.product}</span>
                      <span className="text-green-600 font-medium">{formatPrice(t.price, language)}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-6 bg-white border border-border rounded-lg">
                <h3 className="font-semibold text-foreground mb-3">Komoditas Termurah</h3>
                <ul className="space-y-2 text-sm">
                  {bottom.map((b, i) => (
                    <li key={i} className="flex justify-between">
                      <span>{b.product}</span>
                      <span className="text-red-600 font-medium">{formatPrice(b.price, language)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
