import { GALLERY_MIN, photos } from '../data/photos'
import { ClipImage } from './ClipImage'

/** Асимметричная галерея. Не рендерится, пока реальных фото меньше трёх. */
export function Gallery({ title = 'Фото' }: { title?: string }) {
  if (photos.length < GALLERY_MIN) return null
  const layout = ['md:col-span-7', 'md:col-span-5 md:mt-24', 'md:col-span-5', 'md:col-span-7 md:-mt-16']
  return (
    <section className="bg-black py-20 lg:py-32">
      <div className="wrap">
        <h2 className="font-head text-[clamp(30px,4.4vw,60px)] font-extrabold text-silver">{title}</h2>
        <div className="mt-12 grid gap-10 md:grid-cols-12 md:gap-8">
          {photos.slice(0, 6).map((p, i) => (
            <ClipImage key={p.src} photo={p} className={layout[i % layout.length]} sizes="(min-width: 768px) 58vw, 100vw" />
          ))}
        </div>
      </div>
    </section>
  )
}
