"use client"

import React, { useEffect, useState } from "react"
import { useLanguage } from "@/app/language-provider"
import EditProductModal from "@/components/admin/EditProductModal"
import { translations } from "@/lib/translations"

type Product = {
  id: string
  slug: string
  name: string
  sku?: string
  image?: string | null
  images?: string[] | null
  price?: string | null
  region?: string | null
  shortDesc?: string | null
  specifications?: any
  contact?: string | null
}

export default function AdminProductsPage() {
  const { language } = useLanguage()
  const t = translations[language]

  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<Product | null>(null)
  const [creating, setCreating] = useState(false)

  async function load() {
    setLoading(true)
    try {
      const res = await fetch(`/api/admin/products?page=1&perPage=100`)
      const json = await res.json()
      setProducts(json.items ?? json)
    } catch {
      setProducts([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  function openEdit(p: Product) {
    setEditing(p)
  }

  function openCreate() {
    setCreating(true)
    setEditing({
      id: "",
      slug: "",
      name: "",
      sku: "",
      image: "",
      images: [],
      price: "",
      region: "",
      shortDesc: "",
      specifications: [],
      contact: "",
    })
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this product?")) return
    await fetch(`/api/admin/products?id=${encodeURIComponent(id)}`, {
      method: "DELETE",
    })
    setProducts((p) => p.filter((x) => x.id !== id))
  }

  function handleSaved(updated: Product) {
    setProducts((list) => {
      const found = list.find((it) => it.id === updated.id)
      if (found)
        return list.map((it) =>
          it.id === updated.id ? updated : it
        )
      return [updated, ...list]
    })
  }

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
        <h1 className="text-2xl font-semibold">{t.admin.products}</h1>
        <div className="flex gap-2">
          <button
            onClick={openCreate}
            className="px-3 py-2 bg-primary text-white rounded"
          >
            {t.admin.newProduct}
          </button>
          <button
            onClick={load}
            className="px-3 py-2 bg-muted rounded"
          >
            Refresh
          </button>
        </div>
      </div>

      <section className="bg-card rounded-lg shadow-sm p-4 sm:p-6">
        {loading ? (
          <div>Loading…</div>
        ) : products.length === 0 ? (
          <div className="text-muted">No products found</div>
        ) : (
          <>
            {/* ================= MOBILE CARD VIEW ================= */}
            <div className="space-y-4 md:hidden">
              {products.map((p) => {
                const img =
                  (p.images && p.images[0]) || p.image

                return (
                  <div
                    key={p.id}
                    className="border rounded-lg p-4 space-y-3"
                  >
                    <div className="flex gap-3">
                      {img ? (
                        <img
                          src={img}
                          alt={p.name}
                          className="w-20 h-14 object-cover rounded"
                        />
                      ) : (
                        <div className="w-20 h-14 bg-muted rounded" />
                      )}
                      <div className="flex-1">
                        <div className="font-semibold">
                          {p.name}
                        </div>
                        <div className="text-sm text-muted">
                          {p.region ?? "-"} • {p.sku ?? "-"}
                        </div>
                        <div className="text-sm font-semibold text-primary">
                          {p.price ?? "-"}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <button
                        onClick={() => openEdit(p)}
                        className="px-3 py-1 text-sm bg-primary/10 text-primary rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(p.id)}
                        className="px-3 py-1 text-sm bg-destructive/10 text-destructive rounded"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* ================= DESKTOP TABLE ================= */}
            <div className="hidden md:block overflow-x-auto">
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
                  {products.map((p) => {
                    const img =
                      (p.images && p.images[0]) || p.image

                    return (
                      <tr
                        key={p.id}
                        className="border-b odd:bg-background/50"
                      >
                        <td className="py-3">
                          {img ? (
                            <img
                              src={img}
                              alt={p.name}
                              className="w-20 h-14 object-cover rounded"
                            />
                          ) : (
                            <div className="w-20 h-14 bg-muted rounded" />
                          )}
                        </td>
                        <td className="py-3">{p.name}</td>
                        <td className="py-3">
                          {p.region ?? "-"}
                        </td>
                        <td className="py-3 font-semibold text-primary">
                          {p.price ?? "-"}
                        </td>
                        <td className="py-3">{p.sku ?? "-"}</td>
                        <td className="py-3">
                          <div className="flex gap-2">
                            <button
                              onClick={() => openEdit(p)}
                              className="px-3 py-1 bg-primary/10 text-primary rounded"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() =>
                                handleDelete(p.id)
                              }
                              className="px-3 py-1 bg-destructive/10 text-destructive rounded"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </>
        )}
      </section>

      {editing && (
        <EditProductModal
          product={editing}
          onClose={() => {
            setEditing(null)
            setCreating(false)
          }}
          onSaved={(p) => {
            handleSaved(p)
            setEditing(null)
            setCreating(false)
          }}
        />
      )}
    </div>
  )
}
