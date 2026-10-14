import { GALLERY_MIN, type Photo } from '../data/photos'
import { ClipImage } from './ClipImage'

/**
 * Асимметричная галерея без карточек. На телефоне две колонки, на десктопе 12.
 * layout задаёт классы для каждой фотографии по порядку. Меньше трёх фото — блок не рендерится.
 */
export function Gallery({ photos, layout, title = 'Работа в боксе' }: { photos: Photo[]; layout: string[]; title?: string }) {
  if (photos.length < GALLERY_MIN) return null
  return (
    <section className="bg-black py-20 lg:py-32">
      <div className="wrap">
        <h2 className="font-head text-[clamp(32px,5vw,72px)] font-extrabold leading-[1.02] text-silver">{title}</h2>
        <div className="mt-10 grid grid-cols-2 items-start gap-x-4 gap-y-8 md:mt-16 md:grid-cols-12 md:gap-x-8 md:gap-y-14">
          {photos.map((p, i) => (
            <ClipImage
              key={p.src}
              photo={p}
              className={layout[i] ?? 'col-span-2 md:col-span-6'}
              sizes="(min-width: 768px) 42vw, (min-width: 1440px) 600px, 100vw"
            />
          ))}
        </div>
      </div>
    </section>
  )
}
