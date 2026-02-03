'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import GalleryLightbox from './GalleryLightbox'

interface ProductCarouselProps {
  images: string[]
  productName: string
}

export function ProductCarousel({ images, productName }: ProductCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [openLightbox, setOpenLightbox] = useState(false)

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    )
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    )
  }

  return (
    <>
      <div className="relative w-full bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl overflow-hidden group">
        {/* Main Image - clickable to open lightbox */}
        <div className="relative w-full h-64 sm:h-80 lg:h-96 bg-muted flex items-center justify-center overflow-hidden">
          <img
            src={images[currentIndex] || '/placeholder.svg'}
            alt={`${productName} - ${currentIndex + 1}`}
            className="w-full h-full object-cover transition-transform duration-500 cursor-zoom-in"
            onClick={() => setOpenLightbox(true)}
          />
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100"
        >
          <ChevronLeft size={24} />
        </button>

        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100"
        >
          <ChevronRight size={24} />
        </button>

        {/* Dot Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-white w-8'
                  : 'bg-white/50 hover:bg-white/75'
              }`}
            />
          ))}
        </div>

        {/* Counter */}
        <div className="absolute top-4 right-4 z-10 bg-black/40 text-white px-3 py-1 rounded-full text-sm font-medium">
          {currentIndex + 1} / {images.length}
        </div>
      </div>

      {openLightbox && (
        <GalleryLightbox images={images} initialIndex={currentIndex} onClose={() => setOpenLightbox(false)} />
      )}
    </>
  )
}
