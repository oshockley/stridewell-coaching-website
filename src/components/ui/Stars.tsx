import { Star } from 'lucide-react'

export function Stars({ rating, className = '' }: { rating: number; className?: string }) {
  return (
    <span className={`inline-flex gap-0.5 ${className}`} role="img" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          aria-hidden="true"
          className={`size-4 ${i < Math.round(rating) ? 'fill-star text-star' : 'fill-line text-line'}`}
        />
      ))}
    </span>
  )
}
