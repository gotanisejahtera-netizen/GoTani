'use client'

import Image from 'next/image'
import { Eye, MapPin, DollarSign } from 'lucide-react'
import { useLanguage } from '@/app/language-provider'

interface ProductCardProps {
  name: string
  image: string
  price: string
  region: string
  onViewDetail: () => void
}

export function ProductCard({ name, image, price, region, onViewDetail }: ProductCardProps) {
  const { language } = useLanguage()
  return (
    <div className="group bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300">
      {/* Product Image */}
      <div className="relative h-40 md:h-48 lg:h-56 bg-muted overflow-hidden">
        <img
          src={image || "/placeholder.svg"}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="font-bold text-base text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors">
          {name}
        </h3>

        {/* Details */}
        <div className="space-y-2 mb-4 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span>{region}</span>
          </div>
          <div className="text-primary font-semibold">
            <span>{price}</span>
          </div>
        </div>

        {/* Detail Button */}
        <button
          onClick={onViewDetail}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium text-sm"
        >
          <Eye className="w-4 h-4" />
          <span>{language === 'id' ? 'Lihat Detail' : 'View Details'}</span>
        </button>
      </div>
    </div>
  )
}
