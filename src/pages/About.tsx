import { ArrowRight, ArrowUpRight } from 'lucide-react'
import type { ReactNode } from 'react'
import { Gallery } from '../components/Gallery'
import { PageHead } from '../components/PageHead'
import { YandexReviewsButton } from '../components/RatingLink'
import { Reveal } from '../components/Reveal'
import { ADDRESS_LINE, company, YANDEX_MAPS_URL } from '../data/company'
import { reviews } from '../data/reviews'
import { useNav } from '../lib/nav'

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
          WhatsApp, Telegram или телефон. Запись заранее. Оплата картой, СБП, переводом или наличными.
        </p>
      ),
    },
  ]
  if (rating.enabled) {
    theses.push({
      title: 'Что пишут на картах',
      body: (
        <>
          <p>
            <span className="font-display text-[clamp(28px,3vw,40px)] font-extrabold text-red-ink">{rating.value.score}</span>
            <span className="ml-3">
              на Яндекс Картах · {rating.value.ratingCount} оценок · {rating.value.reviewCount} отзывов
            </span>
          </p>
          {reviews.slice(0, 3).map((r) => (
            <blockquote key={r.author + r.date} className="mt-6 border-l-2 border-red pl-5 text-silver">
              «{r.text}»
              <footer className="mt-2 text-sm text-steel">
                {r.author} · {r.source}
              </footer>
            </blockquote>
          ))}
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

      <Gallery title="Работа в боксе" />

      {company.story.status === 'confirmed' && company.story.value && (
        <section className="bg-graphite py-20 lg:py-28">
          <div className="wrap max-w-4xl">
            <h2 className="font-head text-[clamp(30px,4.4vw,60px)] font-extrabold text-silver">История и люди</h2>
            <p className="mt-8 text-[clamp(18px,1.6vw,22px)] text-silver">{company.story.value}</p>
          </div>
        </section>
      )}

      {company.faq.length > 0 && (
        <section className="bg-black py-20 lg:py-28">
          <div className="wrap">
            <h2 className="font-head text-[clamp(30px,4.4vw,60px)] font-extrabold text-silver">Вопросы</h2>
            <dl className="mt-10 border-t border-line">
              {company.faq.map((f) => (
                <div key={f.q} className="grid gap-3 border-b border-line py-6 md:grid-cols-2">
                  <dt className="font-medium text-silver">{f.q}</dt>
                  <dd className="text-steel">{f.a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      )}

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
