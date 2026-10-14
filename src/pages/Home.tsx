import { motion, useMotionValueEvent, useScroll } from 'motion/react'
import { ArrowRight, MapPin } from 'lucide-react'
import { useRef, useState } from 'react'
import { Amenities } from '../components/Amenities'
import { BrandMark } from '../components/BrandMark'
import { CallButton, WhatsAppButton } from '../components/ContactButtons'
import { ContactForm } from '../components/ContactForm'
import { CountUp } from '../components/CountUp'
import { CtaBand } from '../components/CtaBand'
import { Gallery } from '../components/Gallery'
import { Marquee } from '../components/Marquee'
import { SCAN_EVENT } from '../components/Header'
import { YandexReviewsButton } from '../components/RatingLink'
import { Reveal } from '../components/Reveal'
import { ScanLine } from '../components/ScanLine'
import { ScanPass } from '../components/ScanPass'
import { ServiceList } from '../components/ServiceList'
import { ADDRESS_LINE, company, PRIMARY_PHONE, YANDEX_MAPS_URL } from '../data/company'
import { reviews } from '../data/reviews'
import { EASE_OUT, plainFade, slideX } from '../lib/motion'
import { useNav } from '../lib/nav'

const { rating } = company

/** Пункты бегущей строки: только подтверждённые факты из карточки. */
const MARQUEE = [
  ...company.brands.value,
  'Компьютерная диагностика',
  'Чип-тюнинг',
  'Эндоскопия двигателя',
  'Ремонт деталей АКПП',
  'Ремонт электрооборудования',
  'Запись заранее',
]

export function Home() {
  const { scrollYProgress } = useScroll()
  const fired = useRef(false)
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    if (!fired.current && v > 0.5) {
      fired.current = true
      window.dispatchEvent(new Event(SCAN_EVENT))
    }
  })

  return (
    <>
      <Hero />
      <Marquee items={MARQUEE} />
      <WhatWeDo />
      <HowTo />
      <Brands />
      <Gallery title="Работа в боксе" />
      <ScanLine />
      <Numbers />
      <section className="bg-black py-20 lg:py-32">
        <div className="wrap">
          <ContactForm />
        </div>
      </section>
      <Final />
    </>
  )
}

function Hero() {
  const [logoScan, setLogoScan] = useState(0)

  return (
    <section className="relative flex min-h-[max(560px,calc(100svh-var(--header-h)-var(--bar-h)))] flex-col bg-black">
      <div className="wrap flex flex-1 flex-col">
        <div className="grid flex-1 items-center gap-10 py-5 lg:grid-cols-[1.1fr_.9fr] lg:gap-12 lg:py-10">
          <div className="min-w-0 @container">
            <motion.p
              className="flex items-center gap-2 text-base text-steel"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <MapPin size={17} aria-hidden className="shrink-0 text-red-ink" />
              {ADDRESS_LINE}
            </motion.p>

            <h1 className="mt-3 lg:mt-6">
              <ScanPass trigger={1}>
                <span className="block whitespace-nowrap font-display text-[min(88px,9.3cqi)] font-extrabold leading-[1.02] text-silver">
                  S-PERFORMANCE
                </span>
              </ScanPass>
              <motion.span
                className="mt-3 block font-head text-[clamp(17px,2vw,28px)] font-bold uppercase tracking-[0.04em] text-red-ink"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.75, ease: EASE_OUT }}
              >
                Автосервис в Севастополе
              </motion.span>
            </h1>

            <motion.div initial="hidden" animate="show" className="mt-5 lg:mt-8">
              <motion.p variants={plainFade} custom={9} className="max-w-[30ch] text-[clamp(20px,1.7vw,24px)] leading-snug text-silver [text-wrap:balance]">
                Ремонт, диагностика и чип-тюнинг BMW, Mercedes-Benz и MINI.
              </motion.p>
              <motion.div variants={plainFade} custom={11} className="mt-6 flex flex-col gap-3 sm:flex-row lg:mt-9">
                <WhatsAppButton shimmer className="min-h-14" />
                <CallButton label={`Позвонить ${PRIMARY_PHONE.display}`} className="min-h-14" />
              </motion.div>
              {rating.enabled && (
                <motion.a
                  variants={plainFade}
                  custom={13}
                  href={YANDEX_MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-baseline gap-2.5 lg:mt-8"
                >
                  <span className="font-display text-[clamp(24px,2vw,28px)] font-extrabold text-silver">{rating.value.score}</span>
                  <span className="text-[15px] text-steel lg:text-base">
                    на Яндекс Картах · {rating.value.ratingCount} оценок
                  </span>
                </motion.a>
              )}
            </motion.div>
          </div>

          <motion.div
            className="hidden justify-self-end lg:block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div aria-hidden className="flex items-end justify-between gap-1 border-b border-line pb-0">
              {Array.from({ length: 21 }, (_, i) => (
                <span key={i} className={`w-px bg-line ${i % 5 === 0 ? 'h-3' : 'h-1.5'}`} />
              ))}
            </div>
            <button
              type="button"
              onClick={() => setLogoScan((n) => n + 1)}
              aria-label="S-Performance"
              className="block py-10"
            >
              <ScanPass trigger={logoScan}>
                <BrandMark variant="hero" />
              </ScanPass>
            </button>
            <div aria-hidden className="flex items-start justify-between gap-1 border-t border-line">
              {Array.from({ length: 21 }, (_, i) => (
                <span key={i} className={`w-px bg-line ${i % 5 === 0 ? 'h-3' : 'h-1.5'}`} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function SectionHead({ title, children }: { title: string; children?: React.ReactNode }) {
  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_minmax(0,420px)] lg:items-end">
      <Reveal>
        <h2 className="font-head text-[clamp(32px,5vw,72px)] font-extrabold leading-[1.02] text-silver">{title}</h2>
      </Reveal>
      {children && (
        <Reveal index={1} className="text-steel lg:pb-2">
          {children}
        </Reveal>
      )}
    </div>
  )
}

function WhatWeDo() {
  const { navigateTo } = useNav()
  return (
    <section className="bg-black pb-20 pt-16 lg:pb-32 lg:pt-28">
      <div className="wrap">
        <SectionHead title="Что делаем">
          <p>Работы из карточки сервиса на Яндекс Картах, собраны в шесть групп. {company.priceNote}.</p>
        </SectionHead>
        <div className="mt-10 lg:mt-16">
          <ServiceList />
        </div>
        <button type="button" onClick={() => navigateTo('services')} className="btn btn-outline mt-10">
          Все услуги
          <ArrowRight size={18} aria-hidden />
        </button>
      </div>
    </section>
  )
}

function HowTo() {
  const steps = ['Напишите или позвоните', 'Назовите марку, модель и год автомобиля, опишите, что происходит', 'Запишитесь заранее']
  return (
    <section className="bg-red text-white">
      <div className="wrap py-20 lg:py-28">
        <h2 className="font-head text-[clamp(32px,5vw,72px)] font-extrabold leading-[1.02]">Как обратиться</h2>
        <ol className="mt-12 grid gap-0 lg:mt-16 lg:grid-cols-3 lg:gap-10">
          {steps.map((s, i) => (
            <Reveal as="li" key={s} index={i} className="grid grid-cols-[auto_1fr] items-start gap-5 border-t border-white/40 py-6 lg:block lg:py-8">
              <span aria-hidden className="block w-[0.95em] font-display text-[clamp(56px,7vw,112px)] font-extrabold leading-[0.9] tabular-nums">
                {i + 1}
              </span>
              <p className="pt-1 text-[clamp(19px,1.8vw,24px)] font-medium leading-snug lg:mt-6 lg:pt-0">{s}</p>
            </Reveal>
          ))}
        </ol>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <WhatsAppButton tone="red" />
          <CallButton tone="red" />
        </div>
      </div>
    </section>
  )
}

function Brands() {
  return (
    <section className="bg-graphite py-20 lg:py-32">
      <div className="wrap">
        <h2 className="sr-only">Марки автомобилей</h2>
        <ul className="border-t border-line @container">
          {company.brands.value.map((b, i) => (
            <motion.li
              key={b}
              variants={slideX}
              custom={i}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '0px 0px -10% 0px' }}
              className="flex items-baseline gap-5 border-b border-line py-5 lg:py-8"
            >
              <span aria-hidden className="w-7 shrink-0 font-display text-sm font-bold tabular-nums text-steel">0{i + 1}</span>
              <span className="whitespace-nowrap font-display text-[min(136px,8cqi)] font-extrabold leading-none text-silver">{b}</span>
            </motion.li>
          ))}
        </ul>
        <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-steel">Марки из карточки сервиса на Яндекс Картах.</p>
          <WhatsAppButton label="Написать про свой автомобиль" text="Здравствуйте! Автомобиль: …" />
        </div>
      </div>
    </section>
  )
}

function Numbers() {
  return (
    <section className="bg-graphite py-20 lg:py-32">
      <div className={`wrap grid gap-12 ${rating.enabled ? 'lg:grid-cols-[1fr_1fr] lg:gap-20' : ''}`}>
        {rating.enabled ? (
          <div>
            <h2 className="font-head text-[clamp(22px,2.4vw,32px)] font-bold text-silver">Оценка на Яндекс Картах</h2>
            <CountUp value={rating.value.score} className="mt-4 block font-display text-[clamp(120px,19vw,260px)] font-extrabold leading-[0.9] text-red tabular-nums" />
            <p className="mt-5 text-steel">
              Яндекс Карты · {rating.value.ratingCount} оценок · {rating.value.reviewCount} отзывов
            </p>
          </div>
        ) : (
          <h2 className="font-head text-[clamp(32px,5vw,72px)] font-extrabold text-silver">Удобства</h2>
        )}
        <div className="lg:self-end">
          {rating.enabled && <h3 className="sr-only">Удобства</h3>}
          <Amenities />
        </div>
      </div>
    </section>
  )
}

function Final() {
  return (
    <section className="bg-black">
      <ScanLine tone="red" />
      {reviews.length > 0 ? (
        <div className="wrap py-20 lg:py-28">
          <h2 className="font-head text-[clamp(32px,5vw,72px)] font-extrabold text-silver">Отзывы</h2>
          <div className="mt-12 grid gap-14">
            {reviews.slice(0, 3).map((r) => (
              <Reveal key={r.author + r.date}>
                <blockquote className="max-w-4xl text-[clamp(22px,2.6vw,36px)] leading-snug text-silver">«{r.text}»</blockquote>
                <p className="mt-4 text-steel">
                  {r.author} · {r.source} · {new Date(r.date).toLocaleDateString('ru-RU', { month: 'long', year: 'numeric' })}
                </p>
              </Reveal>
            ))}
          </div>
          <YandexReviewsButton className="mt-12" />
        </div>
      ) : (
        <div className="wrap flex flex-col gap-6 py-14 sm:flex-row sm:items-center sm:justify-between lg:py-16">
          <h2 className="font-head text-[clamp(24px,2.8vw,36px)] font-bold text-silver">
            Отзывы
            {rating.enabled && <span className="block text-base font-normal text-steel [font-family:var(--font-sans)]">{rating.value.reviewCount} отзывов на Яндекс Картах</span>}
          </h2>
          <YandexReviewsButton />
        </div>
      )}
      <div className="wrap">
        <div className="h-px bg-line" />
      </div>
      <CtaBand tone="dark" />
    </section>
  )
}
