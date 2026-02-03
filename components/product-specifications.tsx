'use client';

interface Specification {
  attribute: string
  value: string
}

interface ProductSpecificationsProps {
  specifications: Specification[]
  onOrderClick?: () => void
}

export function ProductSpecifications({ specifications, onOrderClick }: ProductSpecificationsProps) {
  return (
    <div className="w-full">
      <h3 className="text-2xl font-bold text-foreground mb-6">Spesifikasi</h3>
      
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b-2 border-border">
              <th className="text-left px-6 py-4 font-semibold text-foreground bg-muted/50">
                Attribute
              </th>
              <th className="text-left px-6 py-4 font-semibold text-foreground bg-muted/50">
                Specification
              </th>
            </tr>
          </thead>
          <tbody>
            {specifications.map((spec, index) => (
              <tr
                key={index}
                className={`border-b border-border hover:bg-muted/30 transition-colors ${
                  index % 2 === 0 ? 'bg-muted/20' : ''
                }`}
              >
                <td className="px-6 py-4 text-foreground font-medium">{spec.attribute}</td>
                <td className="px-6 py-4 text-foreground">{spec.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {onOrderClick && (
        <button
          onClick={onOrderClick}
          className="mt-8 px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-semibold"
        >
          Order Now
        </button>
      )}
    </div>
  )
}
