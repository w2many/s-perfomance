import { ArrowRight, ArrowUpRight } from 'lucide-react'
import type { ReactNode } from 'react'
import { Gallery } from '../components/Gallery'
import { PageHead } from '../components/PageHead'
import { YandexReviewsButton } from '../components/RatingLink'
import { ReviewQuote } from '../components/Reviews'
import { Faq } from '../components/Faq'
import { Reveal } from '../components/Reveal'
import { ADDRESS_LINE, company, YANDEX_MAPS_URL } from '../data/company'
import { photos } from '../data/photos'
import { reviews } from '../data/reviews'
import { useNav } from '../lib/nav'

/** Порядок и раскладка пяти фото: на телефоне пара, широкое, пара. */
const ABOUT_ORDER = ['f30-rear-bay', 'g20-front-bay', 'g30-engine-bay', 'm5-engine', 'f30-workshop']
const ABOUT_GALLERY = [
  'col-span-1 md:col-span-4',
  'col-span-1 md:col-span-3 md:mt-24',
  'col-span-2 md:col-span-5 md:mt-8',
  'col-span-1 md:col-span-5 md:col-start-2',
  'col-span-1 md:col-span-4 md:mt-16',
]

interface Thesis {
  title: string
  body: ReactNode
}

export function About() {
  const { navigateTo } = useNav()
  const { rating } = company
  const ext = { target: '_blank', rel: 'noopener noreferrer' } as const

  const theses: Thesis[] = [
    {
      title: 'Чем занимаемся',
      body: <p>Ремонт и диагностика автомобилей, ремонт электрооборудования, АКПП и двигателя, чип-тюнинг.</p>,
    },
    {
      title: 'С какими марками',
      body: <p className="font-display text-[clamp(20px,2.2vw,30px)] font-bold text-silver">{company.brands.value.join(' · ')}</p>,
    },
    {
      title: 'Где находимся',
      body: (
        <>
          <p>{ADDRESS_LINE}. Есть парковка.</p>
          <a href={YANDEX_MAPS_URL} {...ext} className="mt-3 inline-flex items-center gap-1.5 text-silver underline decoration-red underline-offset-4 hover:text-white">
            Маршрут в Яндекс Картах <ArrowUpRight size={16} aria-hidden />
          </a>
        </>
      ),
    },
    {
      title: 'Как связаться и оплатить',
      body: (
        <p>
          WhatsApp, Telegram или телефон. Запись заранее. График: {company.schedule.label.toLowerCase()}. Оплата картой, СБП, переводом или наличными.
        </p>
      ),
    },
  ]
  if (rating.enabled) {
    theses.push({
      title: 'Что пишут клиенты',
      body: (
        <>
          <p>
            <span className="font-display text-[clamp(28px,3vw,40px)] font-extrabold text-red-ink">{rating.value.score}</span>
            <span className="ml-3">
              на Яндекс Картах · {rating.value.ratingCount} оценок · {rating.value.reviewCount} отзывов
            </span>
          </p>
          {reviews.length > 0 && (
            <ul className="mt-8 grid gap-8">
              {reviews.slice(0, 2).map((r) => (
                <li key={r.author + r.date} className="border-l-2 border-red pl-5">
                  <ReviewQuote review={r} size="sm" />
                </li>
              ))}
            </ul>
          )}
          <YandexReviewsButton className="mt-6" />
        </>
      ),
    })
  }

  return (
    <>
      <PageHead title="О S-Performance" size="text-[clamp(30px,8.6vw,148px)]">
        <p>Автосервис в Севастополе. BMW, Mercedes-Benz, MINI.</p>
      </PageHead>

      <section className="bg-black pb-20 pt-6 lg:pb-32 lg:pt-10">
        <div className="wrap">
          <ol>
            {theses.map((t, i) => (
              <Reveal
                as="li"
                key={t.title}
                className="grid gap-4 border-b border-line py-10 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-10 lg:py-14"
              >
                <h2 className="flex items-baseline gap-5 font-head text-[clamp(26px,3.2vw,44px)] font-extrabold leading-tight text-silver">
                  <span aria-hidden className="num-outline w-[1.6em] shrink-0 font-display text-[clamp(40px,5vw,72px)] leading-none">
                    0{i + 1}
                  </span>
                  {t.title}
                </h2>
                <div className="text-[clamp(18px,1.6vw,22px)] text-steel md:pt-3">{t.body}</div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <Gallery photos={ABOUT_ORDER.map((src) => photos.find((p) => p.src.includes(src))!).filter(Boolean)} layout={ABOUT_GALLERY} />

      {company.story.status === 'confirmed' && company.story.value && (
        <section className="bg-graphite py-20 lg:py-28">
          <div className="wrap max-w-4xl">
            <h2 className="font-head text-[clamp(30px,4.4vw,60px)] font-extrabold text-silver">История и люди</h2>
            <p className="mt-8 text-[clamp(18px,1.6vw,22px)] text-silver">{company.story.value}</p>
          </div>
        </section>
      )}

      <Faq />

      <section className="bg-red text-white">
        <div className="wrap flex flex-col gap-6 py-14 sm:flex-row sm:items-center sm:justify-between lg:py-20">
          <h2 className="font-head text-[clamp(30px,4.4vw,60px)] font-extrabold uppercase leading-none">Написать</h2>
          <button type="button" onClick={() => navigateTo('contacts')} className="btn btn-white">
            Все способы связи
            <ArrowRight size={18} aria-hidden />
          </button>
        </div>
      </section>
    </>
  )
}
