import { ArrowUpRight } from 'lucide-react'
import { YANDEX_MAPS_URL } from '../data/company'

export function YandexReviewsButton({ className = '' }: { className?: string }) {
  return (
    <a href={YANDEX_MAPS_URL} target="_blank" rel="noopener noreferrer" className={`btn btn-outline ${className}`}>
      Читать отзывы на Яндекс Картах
      <ArrowUpRight size={18} aria-hidden />
    </a>
  )
}
