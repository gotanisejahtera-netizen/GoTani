"use client"

import React, { useEffect, useState } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

type Props = {
  images: string[]
  initialIndex?: number
  onClose: () => void
}

export default function GalleryLightbox({ images, initialIndex = 0, onClose }: Props) {
  const [index, setIndex] = useState(initialIndex)

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') setIndex((i) => (i === 0 ? images.length - 1 : i - 1))
      if (e.key === 'ArrowRight') setIndex((i) => (i === images.length - 1 ? 0 : i + 1))
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [images.length, onClose])

  if (!images || images.length === 0) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      <div className="relative max-w-5xl w-full mx-4">
        <button onClick={onClose} className="absolute top-3 right-3 z-20 bg-black/40 text-white p-2 rounded-full">
          <X />
        </button>

        <div className="relative bg-black">
          <img src={images[index]} alt={`image-${index}`} className="w-full h-[60vh] object-contain mx-auto" />

          <button
            onClick={() => setIndex((i) => (i === 0 ? images.length - 1 : i - 1))}
            className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full"
          >
            <ChevronLeft />
          </button>
          <button
            onClick={() => setIndex((i) => (i === images.length - 1 ? 0 : i + 1))}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full"
          >
            <ChevronRight />
          </button>
        </div>

        <div className="mt-4 flex items-center justify-center gap-2 overflow-auto px-2">
          {images.map((src, i) => (
            <button key={i} onClick={() => setIndex(i)} className={`w-20 h-20 rounded overflow-hidden border ${i === index ? 'ring-2 ring-primary' : ''}`}>
              <img src={src} alt={`thumb-${i}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
