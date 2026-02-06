"use client"

import React, { useEffect, useState } from "react"
import { useLanguage } from "@/app/language-provider"
import EditBlogModal from "@/components/admin/EditBlogModal"
import { translations } from "@/lib/translations"

export default function AdminBlogsPage() {
  const { language } = useLanguage()
  const t = translations[language]

  const [blogs, setBlogs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [editingBlog, setEditingBlog] = useState<any | null>(null)

  async function load() {
    setLoading(true)
    try {
      const res = await fetch(`/api/admin/blogs?page=1&perPage=100`)
      const json = await res.json()
      setBlogs(json.items ?? json)
    } catch {
      setBlogs([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  function openCreateBlog() {
    setEditingBlog({
      id: "",
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      images: [],
      category: "",
      author: "",
      date: "",
      readTime: "",
      featured: false,
    })
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this post?")) return
    await fetch(`/api/admin/blogs?id=${encodeURIComponent(id)}`, {
      method: "DELETE",
    })
    setBlogs((s) => s.filter((x) => x.id !== id))
  }

  function handleBlogSaved(updated: any) {
    setBlogs((list) => {
      const found = list.find((it) => it.id === updated.id)
      if (found)
        return list.map((it) => (it.id === updated.id ? updated : it))
      return [updated, ...list]
    })
  }

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
        <h1 className="text-2xl font-semibold">Blogs</h1>
        <div className="flex gap-2">
          <button
            onClick={openCreateBlog}
            className="px-3 py-2 bg-primary text-white rounded"
          >
            New Post
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
        ) : blogs.length === 0 ? (
          <div className="text-muted">No blog posts found</div>
        ) : (
          <>
            {/* ================= MOBILE CARD VIEW ================= */}
            <div className="space-y-4 md:hidden">
              {blogs.map((b) => (
                <div
                  key={b.id}
                  className="border rounded-lg p-4 space-y-2"
                >
                  <div className="font-semibold">{b.title}</div>
                  <div className="text-sm text-muted">
                    {b.category ?? "-"} • {b.author ?? "-"}
                  </div>
                  <div className="text-xs text-muted">
                    {b.date
                      ? new Date(b.date).toLocaleDateString()
                      : "-"}
                  </div>
                  <div className="flex gap-2 pt-2">
                    <button
                      onClick={() => setEditingBlog(b)}
                      className="px-3 py-1 text-sm bg-primary/10 text-primary rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(b.id)}
                      className="px-3 py-1 text-sm bg-destructive/10 text-destructive rounded"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* ================= DESKTOP TABLE ================= */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full table-auto border-collapse">
                <thead>
                  <tr className="text-left text-sm text-muted border-b">
                    <th className="py-2">Title</th>
                    <th className="py-2">Category</th>
                    <th className="py-2">Author</th>
                    <th className="py-2">Date</th>
                    <th className="py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {blogs.map((b) => (
                    <tr
                      key={b.id}
                      className="border-b odd:bg-background/50"
                    >
                      <td className="py-3">{b.title}</td>
                      <td className="py-3">{b.category ?? "-"}</td>
                      <td className="py-3">{b.author ?? "-"}</td>
                      <td className="py-3">
                        {b.date
                          ? new Date(b.date).toLocaleDateString()
                          : "-"}
                      </td>
                      <td className="py-3">
                        <div className="flex gap-2">
                          <button
                            onClick={() => setEditingBlog(b)}
                            className="px-3 py-1 bg-primary/10 text-primary rounded"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(b.id)}
                            className="px-3 py-1 bg-destructive/10 text-destructive rounded"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </section>

      {editingBlog && (
        <EditBlogModal
          blog={editingBlog}
          onClose={() => setEditingBlog(null)}
          onSaved={(b) => {
            handleBlogSaved(b)
            setEditingBlog(null)
          }}
        />
      )}
    </div>
  )
}
