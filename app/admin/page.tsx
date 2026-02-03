"use client"


import React, { useEffect, useState } from "react"
import { useLanguage } from '@/app/language-provider'
import { formatCurrencyAmount } from '@/lib/format'
import EditProductModal from "@/components/admin/EditProductModal"
import { translations } from '@/lib/translations'

type Product = {
  id: string
  slug: string
  name: string
  sku?: string
  image?: string | null
  images?: string[] | null
  price?: string | null
  region?: string | null
}

export default function AdminPageClient() {
  const { language } = useLanguage()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  async function load() {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/products')
      const json = await res.json()
      setProducts(json)
    } catch (e) {
      setProducts([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  async function handleDelete(id: string) {
    if (!confirm('Delete this product?')) return
    await fetch(`/api/admin/products?id=${encodeURIComponent(id)}`, { method: 'DELETE' })
    setProducts((p) => p.filter((x) => x.id !== id))
  }

  const [editing, setEditing] = useState<Product | null>(null)
  const [creating, setCreating] = useState(false)

  function openEdit(p: Product){
    setEditing(p)
  }

  function openCreate(){
    setCreating(true)
    setEditing({ id: '', slug: '', name: '', sku: '', image: '', images: [], price: '', region: '' })
  }

  function handleSaved(updated: Product){
    setProducts((list)=> {
      const found = list.find((it)=> it.id === updated.id)
      if (found) return list.map((it)=> it.id === updated.id ? updated : it)
      return [updated, ...list]
    })
  }

  const t = translations[language]

  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-semibold mb-6">{t.admin.title}</h1>

      <section className="bg-card rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium">{t.admin.products}</h2>
          <button onClick={openCreate} className="px-3 py-2 bg-primary text-white rounded">{t.admin.newProduct}</button>
        </div>

        {loading ? (
          <div>Loading…</div>
        ) : products.length === 0 ? (
          <div className="text-muted">No products found</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className="text-left text-sm text-muted border-b">
                  <th className="py-2">Image</th>
                  <th className="py-2">Name</th>
                  <th className="py-2">Region</th>
                  <th className="py-2">Price</th>
                  <th className="py-2">SKU</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.id} className="border-b odd:bg-background/50">
                    <td className="py-3">
                        { (p.images && p.images.length > 0) || p.image ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={(p.images && p.images[0]) ?? p.image} alt={p.name} className="w-20 h-14 object-cover rounded" />
                        ) : (
                          <div className="w-20 h-14 bg-muted rounded" />
                        )}
                    </td>
                    <td className="py-3">{p.name}</td>
                    <td className="py-3">{p.region ?? '-'}</td>
                    <td className="py-3 font-semibold text-primary">{p.price ? formatCurrencyAmount(p.price, language) : '-'}</td>
                    <td className="py-3">{p.sku ?? '-'}</td>
                    <td className="py-3">
                      <div className="flex gap-2">
                        <button onClick={() => openEdit(p)} className="px-3 py-1 bg-primary/10 text-primary rounded">Edit</button>
                        <button onClick={() => handleDelete(p.id)} className="px-3 py-1 bg-destructive/10 text-destructive rounded">Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
      {editing && (
        <EditProductModal product={editing} onClose={()=>{ setEditing(null); setCreating(false) }} onSaved={(p)=>{ handleSaved(p); setCreating(false); setEditing(null) }} />
      )}
    </div>
  )
}
