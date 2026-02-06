"use client"

import React, { useState } from 'react'
import { toast } from '@/hooks/use-toast'
import { useLanguage } from '@/app/language-provider'
import { translations } from '@/lib/translations'

type Blog = {
  id?: string
  title: string
  slug: string
  excerpt?: string | null
  content?: string | null
  image?: string | null
  images?: string[] | null
  category?: string | null
  author?: string | null
  authorBio?: string | null
  date?: string | null
  readTime?: string | null
  featured?: boolean
}

export default function EditBlogModal({ blog, onClose, onSaved }:{ blog: Blog, onClose: ()=>void, onSaved: (b: Blog)=>void }){
  const { language } = useLanguage()
  const t = translations[language]
  const [title, setTitle] = useState(blog.title)
  const [excerpt, setExcerpt] = useState(blog.excerpt ?? '')
  const [content, setContent] = useState(blog.content ?? '')
  const [image, setImage] = useState(blog.image ?? '')
  const [images, setImages] = useState<string[]>(blog.images ?? (blog.image ? [blog.image] : []))
  const [category, setCategory] = useState(blog.category ?? '')
  const [author, setAuthor] = useState(blog.author ?? '')
  const [date, setDate] = useState(blog.date ?? '')
  const [readTime, setReadTime] = useState(blog.readTime ?? '')
  const [featured, setFeatured] = useState(!!blog.featured)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  async function save(){
    if (!title) { toast({ title: 'Missing title', description: 'Please enter a title', variant: 'destructive' }); return }
    setSaving(true)
    try{
      const payload: any = { id: blog.id, title, excerpt: excerpt || null, content: content || null, image: image || null, images: images.length ? images : null, category: category || null, author: author || null, authorBio: undefined, date: date || null, readTime: readTime || null, featured }

      if (!blog.id) {
        const slug = title.toLowerCase().replace(/\s+/g,'-')
        payload.slug = slug
        const res = await fetch('/api/admin/blogs', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
        if (!res.ok) throw new Error('Save failed')
        const created = await res.json()
        onSaved(created)
        onClose()
      } else {
        const res = await fetch('/api/admin/blogs', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
        if (!res.ok) throw new Error('Save failed')
        const updated = await res.json()
        onSaved(updated)
        onClose()
      }
    }catch(e){
      toast({ title: 'Save failed', description: 'Failed to save blog post', variant: 'destructive' })
    }finally{ setSaving(false) }
  }

  function addImageByUrl(url: string){ if (!url) return; setImages(prev=>[...prev, url]) }

  async function onFileChange(e: React.ChangeEvent<HTMLInputElement>){
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try{
      const maxDim = 1600
      let bitmap: ImageBitmap | null = null
      try { bitmap = await createImageBitmap(file) } catch { bitmap = null }

      let blobToUpload: Blob
      if (bitmap) {
        const { width, height } = bitmap
        let targetWidth = width
        let targetHeight = height
        if (width > maxDim || height > maxDim) {
          if (width >= height) {
            targetWidth = maxDim
            targetHeight = Math.round((height * maxDim) / width)
          } else {
            targetHeight = maxDim
            targetWidth = Math.round((width * maxDim) / height)
          }
        }
        const canvas = document.createElement('canvas')
        canvas.width = targetWidth
        canvas.height = targetHeight
        const ctx = canvas.getContext('2d')!
        ctx.drawImage(bitmap, 0, 0, targetWidth, targetHeight)
        blobToUpload = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/jpeg', 0.8)) as Blob
      } else {
        blobToUpload = file
      }

      const base64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => {
          const result = reader.result as string
          const parts = result.split(',')
          resolve(parts[1] ?? '')
        }
        reader.onerror = (err) => reject(err)
        reader.readAsDataURL(blobToUpload)
      })

      const filename = `${Date.now()}-${file.name.replace(/\.[^/.]+$/, '.jpg')}`
      const res = await fetch('/api/admin/upload', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ filename, data: base64 }) })
      if (!res.ok) throw new Error('Upload failed')
      const json = await res.json()
      if (json.url) {
        setImages(prev=>{
          const next = [...prev, json.url]
          return next
        })
        if (!image) setImage(json.url)
      }
    }catch(err){
      toast({ title: 'Upload failed', description: 'Failed to upload image', variant: 'destructive' })
    }finally{
      setUploading(false)
      setUploadProgress(0)
    }
  }

  function removeImage(idx: number){ setImages(prev=> prev.filter((_,i)=> i !== idx)) }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6 overflow-auto max-h-[90vh]">
        <h3 className="text-lg font-medium mb-4">{blog.id ? 'Edit' : 'New'} Blog Post</h3>
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input className="w-full border rounded px-3 py-2" value={title} onChange={(e)=>setTitle(e.target.value)} />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Excerpt</label>
            <textarea className="w-full border rounded px-3 py-2" rows={2} value={excerpt} onChange={(e)=>setExcerpt(e.target.value)} />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Content (HTML)</label>
            <textarea className="w-full border rounded px-3 py-2" rows={8} value={content} onChange={(e)=>setContent(e.target.value)} />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <input className="w-full border rounded px-3 py-2" value={category} onChange={(e)=>setCategory(e.target.value)} />
          </div>

          <div className="flex gap-2">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Author</label>
              <input className="w-full border rounded px-3 py-2" value={author} onChange={(e)=>setAuthor(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Date</label>
              <input type="date" className="border rounded px-3 py-2" value={date?.split('T')?.[0] ?? date} onChange={(e)=>setDate(e.target.value)} />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Read time (e.g. 8 menit)</label>
            <input className="w-full border rounded px-3 py-2" value={readTime} onChange={(e)=>setReadTime(e.target.value)} />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Images (add URL)</label>
            <div className="mb-2 flex gap-2 flex-wrap">
              {images.map((src, idx) => (
                <div key={idx} className="relative w-28 h-28 bg-muted rounded overflow-hidden border">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={src} alt={`img-${idx}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            <div className="flex gap-2 mb-2">
              <input id="image-url-input" placeholder="Add image URL" className="flex-1 border rounded px-3 py-2" />
              <button type="button" onClick={() => { const el = document.getElementById('image-url-input') as HTMLInputElement | null; if (!el) return; addImageByUrl(el.value); el.value = '' }} className="px-3 py-2 bg-primary text-white rounded">Add</button>
            </div>

            <label className="inline-block mb-2">
              <span className="sr-only">Upload image</span>
              <input type="file" accept="image/*" onChange={onFileChange} className="hidden" id="blog-image-upload" />
              <label htmlFor="blog-image-upload" className="inline-block px-3 py-2 bg-secondary text-white rounded cursor-pointer">Upload file…</label>
            </label>
            {uploading && (
              <div className="w-full">
                <div className="text-sm text-muted mb-1">Uploading…</div>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <input id="featured-check" type="checkbox" checked={featured} onChange={(e)=>setFeatured(e.target.checked)} />
            <label htmlFor="featured-check" className="text-sm">Featured</label>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <button onClick={onClose} className="px-3 py-2 bg-muted rounded">Cancel</button>
          <button onClick={save} disabled={saving} className="px-3 py-2 bg-primary text-white rounded">{saving ? 'Saving...' : 'Save'}</button>
        </div>
      </div>
    </div>
  )
}
