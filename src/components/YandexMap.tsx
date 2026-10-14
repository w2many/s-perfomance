import { MapPin } from 'lucide-react'
import { company, YANDEX_MAPS_URL } from '../data/company'

/**
 * Виджет Яндекс Карт с карточкой организации (oid): метку ставит сам Яндекс.
 * Под iframe лежит ссылка на карточку: её видно, пока виджет грузится или если он заблокирован.
 */
export function YandexMap({ className = '' }: { className?: string }) {
  const { lat, lon } = company.coordinates.value
  const src = `https://yandex.ru/map-widget/v1/?ll=${lon}%2C${lat}&z=16&oid=${company.yandexOrgId}&ol=biz`
  return (
    <div className={`relative overflow-clip bg-graphite-2 ${className}`}>
      <a
        href={YANDEX_MAPS_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute inset-0 flex flex-col items-center justify-center gap-2 border border-line text-silver hover:text-white"
      >
        <MapPin size={24} aria-hidden className="text-red-ink" />
        <span>Открыть S-Performance в Яндекс Картах</span>
      </a>
      <iframe
        title="S-Performance на Яндекс Картах"
        src={src}
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        className="absolute inset-0 h-full w-full border-0"
      />
    </div>
  )
}
