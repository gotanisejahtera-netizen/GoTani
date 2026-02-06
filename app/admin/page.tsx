"use client"

import React, { useEffect, useState } from "react"
import { useLanguage } from "@/app/language-provider"
import { translations } from "@/lib/translations"

type Product = {
  id: string
  slug: string
  name: string
  image?: string | null
  images?: string[] | null
  price?: string | null
  region?: string | null
}

export default function AdminPageClient() {
  const { language } = useLanguage()
  const t = translations[language]

  const [products, setProducts] = useState<Product[]>([])
  const [prodPage, setProdPage] = useState(1)
  const [prodPerPage] = useState(8)
  const [prodTotal, setProdTotal] = useState(0)
  const [prodLoading, setProdLoading] = useState(true)

  const [blogs, setBlogs] = useState<any[]>([])
  const [blogPage, setBlogPage] = useState(1)
  const [blogPerPage] = useState(5)
  const [blogTotal, setBlogTotal] = useState(0)
  const [blogLoading, setBlogLoading] = useState(true)

  async function loadProducts(page = prodPage) {
    setProdLoading(true)
    try {
      const res = await fetch(
        `/api/admin/products?page=${page}&perPage=${prodPerPage}`
      )
      const json = await res.json()
      setProducts(json.items ?? [])
      setProdTotal(json.total ?? 0)
    } catch {
      setProducts([])
      setProdTotal(0)
    } finally {
      setProdLoading(false)
    }
  }

  async function loadBlogs(page = blogPage) {
    setBlogLoading(true)
    try {
      const res = await fetch(
        `/api/admin/blogs?page=${page}&perPage=${blogPerPage}`
      )
      const json = await res.json()
      setBlogs(json.items ?? [])
      setBlogTotal(json.total ?? 0)
    } catch {
      setBlogs([])
      setBlogTotal(0)
    } finally {
      setBlogLoading(false)
    }
  }

  useEffect(() => {
    loadProducts(1)
    loadBlogs(1)
  }, [])

  const prodTotalPages = Math.max(
    1,
    Math.ceil(prodTotal / prodPerPage)
  )
  const blogTotalPages = Math.max(
    1,
    Math.ceil(blogTotal / blogPerPage)
  )

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-semibold mb-6">
        {t.admin.title}
      </h1>

      {/* ================= PRODUCTS OVERVIEW ================= */}
      <section className="bg-card rounded-lg shadow-sm p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium">
            {t.admin.products} — Overview
          </h2>
          <div className="text-sm text-muted">
            Total: {prodTotal}
          </div>
        </div>

        {prodLoading ? (
          <div>Loading…</div>
        ) : products.length === 0 ? (
          <div className="text-muted">No products found</div>
        ) : (
          <>
            {/* MOBILE CARDS */}
            <div className="space-y-4 md:hidden">
              {products.map((p) => {
                const img =
                  (p.images && p.images[0]) || p.image

                return (
                  <div
                    key={p.id}
                    className="border rounded-lg p-4 flex gap-3"
                  >
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
                        {p.region ?? "-"}
                      </div>
                      <div className="text-sm font-semibold text-primary">
                        {p.price ?? "-"}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* DESKTOP TABLE */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full table-auto border-collapse">
                <thead>
                  <tr className="text-left text-sm text-muted border-b">
                    <th className="py-2">Image</th>
                    <th className="py-2">Name</th>
                    <th className="py-2">Region</th>
                    <th className="py-2">Price</th>
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
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="mt-3 flex items-center gap-2">
              <button
                disabled={prodPage <= 1}
                onClick={() => {
                  const p = prodPage - 1
                  setProdPage(p)
                  loadProducts(p)
                }}
                className="px-3 py-1 bg-muted rounded disabled:opacity-50"
              >
                Previous
              </button>
              <div className="text-sm">
                Page {prodPage} / {prodTotalPages}
              </div>
              <button
                disabled={prodPage >= prodTotalPages}
                onClick={() => {
                  const p = prodPage + 1
                  setProdPage(p)
                  loadProducts(p)
                }}
                className="px-3 py-1 bg-muted rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </>
        )}
      </section>

      {/* ================= BLOGS OVERVIEW ================= */}
      <section className="bg-card rounded-lg shadow-sm p-4 sm:p-6 mt-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium">
            Blogs — Overview
          </h2>
          <div className="text-sm text-muted">
            Total: {blogTotal}
          </div>
        </div>

        {blogLoading ? (
          <div>Loading…</div>
        ) : blogs.length === 0 ? (
          <div className="text-muted">No blog posts found</div>
        ) : (
          <>
            {/* MOBILE CARDS */}
            <div className="space-y-4 md:hidden">
              {blogs.map((b) => (
                <div
                  key={b.id}
                  className="border rounded-lg p-4 space-y-1"
                >
                  <div className="font-semibold">
                    {b.title}
                  </div>
                  <div className="text-sm text-muted">
                    {b.category ?? "-"} • {b.author ?? "-"}
                  </div>
                  <div className="text-xs text-muted">
                    {b.date
                      ? new Date(b.date).toLocaleDateString()
                      : "-"}
                  </div>
                </div>
              ))}
            </div>

            {/* DESKTOP TABLE */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full table-auto border-collapse">
                <thead>
                  <tr className="text-left text-sm text-muted border-b">
                    <th className="py-2">Title</th>
                    <th className="py-2">Category</th>
                    <th className="py-2">Author</th>
                    <th className="py-2">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {blogs.map((b) => (
                    <tr
                      key={b.id}
                      className="border-b odd:bg-background/50"
                    >
                      <td className="py-3">{b.title}</td>
                      <td className="py-3">
                        {b.category ?? "-"}
                      </td>
                      <td className="py-3">
                        {b.author ?? "-"}
                      </td>
                      <td className="py-3">
                        {b.date
                          ? new Date(
                              b.date
                            ).toLocaleDateString()
                          : "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="mt-3 flex items-center gap-2">
              <button
                disabled={blogPage <= 1}
                onClick={() => {
                  const p = blogPage - 1
                  setBlogPage(p)
                  loadBlogs(p)
                }}
                className="px-3 py-1 bg-muted rounded disabled:opacity-50"
              >
                Previous
              </button>
              <div className="text-sm">
                Page {blogPage} / {blogTotalPages}
              </div>
              <button
                disabled={blogPage >= blogTotalPages}
                onClick={() => {
                  const p = blogPage + 1
                  setBlogPage(p)
                  loadBlogs(p)
                }}
                className="px-3 py-1 bg-muted rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </>
        )}
      </section>
    </div>
  )
}
