import { Star } from 'lucide-react'
import { reviews, type Review } from '../data/reviews'

const fmtDate = (d: string) => new Date(d).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })

export function Stars({ value }: { value: number }) {
  return (
    <span className="flex gap-1 text-red" aria-label={`Оценка ${value} из 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} size={16} aria-hidden fill={i < value ? 'currentColor' : 'none'} strokeWidth={1.5} />
      ))}
    </span>
  )
}

export function ReviewQuote({ review, size = 'lg' }: { review: Review; size?: 'lg' | 'sm' }) {
  return (
    <figure className="flex h-full flex-col">
      <Stars value={review.rating} />
      <blockquote
        className={`mt-5 whitespace-pre-line text-silver ${size === 'lg' ? 'text-[clamp(18px,1.45vw,21px)] leading-relaxed' : 'text-[17px] leading-relaxed'}`}
      >
        «{review.text}»
      </blockquote>
      <figcaption className="mt-auto pt-6 text-sm text-steel">
        <span className="font-medium text-silver">{review.author}</span> · {review.source} · {fmtDate(review.date)}
      </figcaption>
    </figure>
  )
}

/** Дословные отзывы. Пустой список — блок не рендерится. */
export function ReviewList({ limit = 3 }: { limit?: number }) {
  if (reviews.length === 0) return null
  return (
    <ul className="grid gap-12 lg:grid-cols-3 lg:gap-10">
      {reviews.slice(0, limit).map((r) => (
        <li key={r.author + r.date} className="border-t border-line pt-6">
          <ReviewQuote review={r} />
        </li>
      ))}
    </ul>
  )
}
