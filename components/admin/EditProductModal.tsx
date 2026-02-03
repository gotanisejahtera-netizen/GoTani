"use client"

import React, { useState } from 'react'
import { useLanguage } from '@/app/language-provider'
import { formatCurrencyAmount } from '@/lib/format'
import { translations } from '@/lib/translations'

type Product = {
  id: string
  name: string
  slug: string
  sku?: string | null
  image?: string | null
  images?: string[] | null
  price?: string | null
  region?: string | null
}

export default function EditProductModal({ product, onClose, onSaved }:{ product: Product, onClose: ()=>void, onSaved: (p: Product)=>void }){
  const { language } = useLanguage()
  const t = translations[language]
  const [name, setName] = useState(product.name)
  const [sku, setSku] = useState(product.sku ?? '')
  const [image, setImage] = useState(product.image ?? '')
  const [images, setImages] = useState<string[]>(product.images ?? (product.image ? [product.image] : []))
  const [price, setPrice] = useState(product.price ?? '')
  const [priceFocused, setPriceFocused] = useState(false)
  const [region, setRegion] = useState(product.region ?? '')
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [errors, setErrors] = useState<{price?:string, region?:string}>({})
  const [urlInput, setUrlInput] = useState('')

  async function save(){
    // validate client-side
    const validationErrors: any = {}
    if (!price || Number(price) <= 0) validationErrors.price = 'Price must be greater than 0'
    if (!region) validationErrors.region = 'Please select a region'
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length > 0) return

    setSaving(true)
    try{
      const payload: any = { id: product.id, name, sku: sku || null, image: image || null, images: images.length ? images : null, price: price || null, region: region || null }
      let res

      if (!product.id) {
        // create
        const slug = name.toLowerCase().replace(/\s+/g,'-')
        res = await fetch('/api/admin/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, slug, sku: sku || null, image: image || null, images: images.length ? images : null, price: price || null, region: region || null })
        })
      } else {
        // update
        res = await fetch('/api/admin/products', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        })
      }
      if (!res.ok) throw new Error('Save failed')
      const updated = await res.json()
      onSaved(updated)
      onClose()
    }catch(e){
      alert('Failed to save')
    }finally{
      setSaving(false)
    }
  }

  async function onFileChange(e: React.ChangeEvent<HTMLInputElement>){
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try{
      // Browser-friendly conversion to base64 (avoid Node Buffer in client)
      const base64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => {
          const result = reader.result as string
          // result is data:[<mediatype>][;base64],<data>
          const parts = result.split(',')
          resolve(parts[1] ?? '')
        }
        reader.onerror = (err) => reject(err)
        reader.readAsDataURL(file)
      })
      const filename = `${Date.now()}-${file.name}`
      const res = await fetch('/api/admin/upload', { method: 'POST', headers: { 'Content-Type':'application/json' }, body: JSON.stringify({ filename, data: base64 }) })
      const json = await res.json()
      if (json.url) setImages((prev)=>[...prev, json.url])
    }catch(err){
      alert('Upload failed')
    }finally{
      setUploading(false)
    }
  }

  function removeImage(idx: number){
    setImages((prev)=> prev.filter((_,i)=> i !== idx))
  }

  function moveImage(idx: number, dir: -1 | 1){
    setImages(prev => {
      const arr = [...prev]
      const to = idx + dir
      if (to < 0 || to >= arr.length) return arr
      const tmp = arr[to]
      arr[to] = arr[idx]
      arr[idx] = tmp
      return arr
    })
  }

  async function addImageByUrl(url: string){
    if (!url) return
    setImages(prev=>[...prev, url])
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6">
        <h3 className="text-lg font-medium mb-4">{t.admin.edit} Product</h3>

          <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input className="w-full border rounded px-3 py-2" value={name} onChange={(e)=>setName(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Price</label>
            <div className="flex items-center gap-2">
              <span className="inline-block px-3 py-2 bg-gray-100 rounded-l border border-r-0">Rp</span>
              <input
                className="w-full border rounded-r px-3 py-2"
                value={priceFocused ? price : (price ? (formatCurrencyAmount(price, language) ?? String(price)) : '')}
                onFocus={()=>setPriceFocused(true)}
                onBlur={()=>{ setPriceFocused(false); /* keep raw numeric value in state */ }}
                onChange={(e)=>{
                  // allow only digits
                  const v = e.target.value.replace(/[^0-9]/g, '')
                  setPrice(v)
                  if (errors.price) setErrors(prev=>({ ...prev, price: undefined }))
                }}
                inputMode="numeric"
                placeholder="0"
              />
            </div>
            {errors.price && <div className="text-sm text-red-600 mt-1">{errors.price}</div>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Region</label>
            <select className="w-full border rounded px-3 py-2" value={region} onChange={(e)=>{ setRegion(e.target.value); if (errors.region) setErrors(prev=>({ ...prev, region: undefined })) }}>
              <option value="">Select region</option>
              <option value="Jawa">Jawa</option>
              <option value="Sumatra">Sumatra</option>
              <option value="Kalimantan">Kalimantan</option>
              <option value="Sulawesi">Sulawesi</option>
              <option value="Bali & Nusa Tenggara">Bali & Nusa Tenggara</option>
              <option value="Maluku & Papua">Maluku & Papua</option>
              <option value="Other">Other</option>
            </select>
            {errors.region && <div className="text-sm text-red-600 mt-1">{errors.region}</div>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">SKU</label>
            <input className="w-full border rounded px-3 py-2" value={sku} onChange={(e)=>setSku(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Images (upload multiple or add URL)</label>
            <div className="mb-2 flex gap-2 flex-wrap">
              {images.length === 0 && (
                <div className="text-sm text-muted">No images added yet.</div>
              )}
              {images.map((src, idx) => (
                <div key={idx} className="relative w-28 h-28 bg-muted rounded overflow-hidden border">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={src} alt={`img-${idx}`} className="w-full h-full object-cover" />
                  <div className="absolute top-1 left-1 flex gap-1">
                    <button aria-label="move left" onClick={()=>moveImage(idx, -1)} className="bg-black/40 text-white rounded p-1 text-xs">◀</button>
                    <button aria-label="move right" onClick={()=>moveImage(idx, 1)} className="bg-black/40 text-white rounded p-1 text-xs">▶</button>
                  </div>
                  <button aria-label="remove image" onClick={()=>removeImage(idx)} className="absolute top-1 right-1 bg-black/40 text-white rounded-full p-1 text-xs">×</button>
                </div>
              ))}
            </div>

            <div className="flex gap-2 mb-2">
              <input value={urlInput} onChange={e=>setUrlInput(e.target.value)} placeholder="Add image URL" className="flex-1 border rounded px-3 py-2" />
              <button type="button" onClick={()=>{ if(urlInput) { addImageByUrl(urlInput); setUrlInput('') } }} className="px-3 py-2 bg-primary text-white rounded">Add</button>
            </div>

            <label className="inline-block mb-2">
              <span className="sr-only">Upload image</span>
              <input type="file" accept="image/*" onChange={onFileChange} className="hidden" id="product-image-upload" />
              <label htmlFor="product-image-upload" className="inline-block px-3 py-2 bg-secondary text-white rounded cursor-pointer">Upload file…</label>
            </label>
            {uploading && <div className="text-sm text-muted">Uploading…</div>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Image URL</label>
            {/* left for backwards compatibility; main upload handled above */}
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <button onClick={onClose} className="px-3 py-2 bg-muted rounded">{t.admin.cancel}</button>
          <button onClick={save} disabled={saving} className="px-3 py-2 bg-primary text-white rounded">{saving ? t.admin.save + '...' : t.admin.save}</button>
        </div>
      </div>
    </div>
  )
}
