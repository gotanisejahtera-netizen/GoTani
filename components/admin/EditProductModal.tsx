"use client"

import React, { useState, useEffect, useRef } from 'react'
import { toast } from '@/hooks/use-toast'
import { useLanguage } from '@/app/language-provider'
// price is handled as a free-form string (e.g. "30.000/kg")
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
  const firstInputRef = useRef<HTMLInputElement | null>(null)
  const [name, setName] = useState(product.name)
  const [sku, setSku] = useState(product.sku ?? '')
  const [image, setImage] = useState(product.image ?? '')
  const [images, setImages] = useState<string[]>(product.images ?? (product.image ? [product.image] : []))
  const [price, setPrice] = useState(product.price ?? '')
  const [priceFocused, setPriceFocused] = useState(false)
  const [shortDesc, setShortDesc] = useState((product as any).shortDesc ?? '')
  const [contact, setContact] = useState((product as any).contact ?? '')
  const [specifications, setSpecifications] = useState<{attribute:string;value:string}[]>((product as any).specifications ?? [])
  const [region, setRegion] = useState(product.region ?? '')
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [errors, setErrors] = useState<{price?:string, region?:string}>({})
  const [urlInput, setUrlInput] = useState('')

  // lock background scroll when modal open
  useEffect(()=>{
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return ()=>{ document.body.style.overflow = prev }
  },[])

  // focus first input and close on Escape
  useEffect(()=>{
    firstInputRef.current?.focus()
    function onKey(e: KeyboardEvent){ if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return ()=> window.removeEventListener('keydown', onKey)
  },[onClose])

  async function save(){
    // validate client-side
    const validationErrors: any = {}
    if (!price) validationErrors.price = 'Please enter a price (string allowed, e.g. 30.000/kg)'
    if (!region) validationErrors.region = 'Please enter a region'
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length > 0) return

    setSaving(true)
    try{
      const payload: any = { id: product.id, name, sku: sku || null, image: image || null, images: images.length ? images : null, price: price || null, region: region || null }
      payload.shortDesc = shortDesc || null
      payload.specifications = specifications.length ? specifications : null
      payload.contact = contact || null
      let res

      if (!product.id) {
        // create
        const slug = name.toLowerCase().replace(/\s+/g,'-')
        payload.slug = slug
        res = await fetch('/api/admin/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
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
        toast({ title: 'Save failed', description: 'Failed to save product', variant: 'destructive' })
    }finally{
      setSaving(false)
    }
  }

  async function uploadFile(file: File){
    setUploading(true)
    try{
      const maxDim = 1600
      let bitmap: ImageBitmap | null = null
      try { bitmap = await createImageBitmap(file) } catch (err) { bitmap = null }

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

      const responseText = await new Promise<string>((resolve, reject) => {
        const xhr = new XMLHttpRequest()
        xhr.open('POST', '/api/admin/upload')
        xhr.setRequestHeader('Content-Type', 'application/json')
        xhr.upload.onprogress = (e) => {
          if (e.lengthComputable) {
            setUploadProgress(Math.round((e.loaded / e.total) * 100))
          }
        }
        xhr.onload = () => {
          if (xhr.status === 413) return reject({ status: 413, body: xhr.responseText })
          if (xhr.status >= 200 && xhr.status < 300) return resolve(xhr.responseText)
          return reject({ status: xhr.status, body: xhr.responseText })
        }
        xhr.onerror = () => reject({ status: 0 })
        xhr.send(JSON.stringify({ filename, data: base64 }))
      })

      let json = null
      try { json = JSON.parse(responseText) } catch (err) { json = null }
      if (json && json.url) setImages((prev)=>[...prev, json.url])
    }catch(err: any){
      if (err && err.status === 413) {
          toast({ title: 'Upload failed', description: 'File terlalu besar setelah encoding. Coba turunkan resolusi atau kualitas gambar.', variant: 'destructive' })
      } else {
          toast({ title: 'Upload failed', description: 'Upload failed', variant: 'destructive' })
      }
    }finally{
      setUploading(false)
      setUploadProgress(0)
    }
  }

  async function onFileChange(e: React.ChangeEvent<HTMLInputElement>){
    const file = e.target.files?.[0]
    if (!file) return
    await uploadFile(file)
  }

  async function handleDrop(e: React.DragEvent){
    e.preventDefault()
    const file = e.dataTransfer.files?.[0]
    if (!file) return
    await uploadFile(file)
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div role="dialog" aria-modal="true" className="bg-white rounded-lg shadow-lg w-full max-w-3xl max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-medium">{t.admin.edit} Product</h3>
          <button aria-label="Close dialog" onClick={onClose} className="text-2xl leading-none px-2 py-1 hover:bg-muted rounded">×</button>
        </div>

        <div className="p-4 overflow-auto">
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
                value={price}
                onChange={(e)=>{ setPrice(e.target.value); if (errors.price) setErrors(prev=>({ ...prev, price: undefined })) }}
                placeholder="e.g. 30.000/kg"
              />
            </div>
            {errors.price && <div className="text-sm text-red-600 mt-1">{errors.price}</div>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Region</label>
            <input
              className="w-full border rounded px-3 py-2"
              value={region}
              onChange={(e) => { setRegion(e.target.value); if (errors.region) setErrors(prev=>({ ...prev, region: undefined })) }}
              placeholder="e.g. Jawa"
            />
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

            <div className="mb-2">
              <div onDrop={handleDrop} onDragOver={(e)=>e.preventDefault()} className="border-dashed border-2 border-muted rounded p-4 flex items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="text-sm text-muted">Drag & drop an image here, or</div>
                </div>
                <div>
                  <input type="file" accept="image/*" onChange={onFileChange} className="hidden" id="product-image-upload" />
                  <label htmlFor="product-image-upload" className="inline-block px-3 py-2 bg-secondary text-white rounded cursor-pointer">Choose file…</label>
                </div>
              </div>
            </div>
            {uploading && (
              <div className="w-full">
                <div className="text-sm text-muted mb-1">Uploading… {uploadProgress}%</div>
                <div className="w-full bg-muted h-2 rounded overflow-hidden">
                  <div className="h-2 bg-primary" style={{ width: `${uploadProgress}%` }} />
                </div>
              </div>
            )}
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium mb-1">Short description</label>
            <textarea value={shortDesc} onChange={(e)=>setShortDesc(e.target.value)} className="w-full border rounded px-3 py-2" rows={3} />
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium mb-1">Table (specifications)</label>
            <div className="space-y-2">
              {specifications.map((spec, idx) => (
                <div key={idx} className="flex gap-2">
                  <input className="flex-1 border rounded px-3 py-2" placeholder="Attribute" value={spec.attribute} onChange={(e)=>{
                    const v = e.target.value
                    setSpecifications(prev=> prev.map((s,i)=> i===idx ? { ...s, attribute: v } : s))
                  }} />
                  <input className="flex-1 border rounded px-3 py-2" placeholder="Value" value={spec.value} onChange={(e)=>{
                    const v = e.target.value
                    setSpecifications(prev=> prev.map((s,i)=> i===idx ? { ...s, value: v } : s))
                  }} />
                  <button onClick={()=> setSpecifications(prev=> prev.filter((_,i)=> i!==idx))} className="px-3 py-2 bg-destructive/10 text-destructive rounded">Remove</button>
                </div>
              ))}
              <div>
                <button type="button" onClick={()=> setSpecifications(prev=>[...prev, { attribute: '', value: '' }])} className="px-3 py-2 bg-primary text-white rounded">Add row</button>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium mb-1">Contact us</label>
            <input className="w-full border rounded px-3 py-2" value={contact} onChange={(e)=>setContact(e.target.value)} placeholder="Contact info or WhatsApp number" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Image URL</label>
            {/* left for backwards compatibility; main upload handled above */}
          </div>
        </div>

        </div>

        <div className="flex-shrink-0 p-4 border-t bg-white flex justify-end gap-2">
          <button onClick={onClose} className="px-3 py-2 bg-muted rounded">{t.admin.cancel}</button>
          <button onClick={save} disabled={saving} className="px-3 py-2 bg-primary text-white rounded">{saving ? t.admin.save + '...' : t.admin.save}</button>
        </div>
      </div>
    </div>
  )
}
