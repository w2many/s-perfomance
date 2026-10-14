import { Check, Copy, MapPin, Navigation } from 'lucide-react'
import { useState } from 'react'
import { Amenities } from '../components/Amenities'
import { TelegramButton, WhatsAppButton } from '../components/ContactButtons'
import { ContactForm } from '../components/ContactForm'
import { CtaBand } from '../components/CtaBand'
import { PageHead } from '../components/PageHead'
import { Reveal } from '../components/Reveal'
import { ADDRESS_LINE, company, PRIMARY_PHONE, YANDEX_MAPS_URL } from '../data/company'
import { useNav } from '../lib/nav'

export function Contacts() {
  const { params } = useNav()
  const [copied, setCopied] = useState(false)

  async function copyPhone() {
    try {
      await navigator.clipboard.writeText(PRIMARY_PHONE.display)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2500)
    } catch {
      setCopied(false)
    }
  }

  return (
    <>
      <PageHead title="Контакты" />

      <section className="bg-black pb-16 pt-10 lg:pb-24 lg:pt-14">
        <div className="wrap">
          <a
            href={PRIMARY_PHONE.href}
            className="block w-fit whitespace-nowrap font-head text-[clamp(34px,8.4vw,128px)] font-extrabold leading-none tabular-nums text-silver transition-colors hover:text-white"
          >
            {PRIMARY_PHONE.display}
          </a>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <button type="button" onClick={copyPhone} className="btn btn-outline" aria-live="polite">
              {copied ? <Check size={19} aria-hidden /> : <Copy size={19} aria-hidden />}
              {copied ? 'Скопировано' : 'Скопировать номер'}
            </button>
            <WhatsAppButton label="Чат в WhatsApp" />
            <TelegramButton label="Чат в Telegram" />
          </div>
        </div>
      </section>

      <section className="bg-graphite py-16 lg:py-24">
        <div className="wrap grid gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <h2 className="font-head text-[clamp(26px,3vw,40px)] font-extrabold text-silver">Адрес</h2>
            <p className="mt-5 flex gap-3 font-head text-[clamp(26px,3.4vw,48px)] font-bold leading-tight text-silver">
              <MapPin aria-hidden className="mt-[0.2em] size-[0.8em] shrink-0 text-red-ink" />
              {ADDRESS_LINE}
            </p>
            <h3 className="mt-12 font-head text-[clamp(22px,2.2vw,30px)] font-bold text-silver">Как найти</h3>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <a href={YANDEX_MAPS_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                <Navigation size={18} aria-hidden />
                Построить маршрут
              </a>
            </div>
            <MapEmbed />
          </Reveal>
          <Reveal index={1} className="lg:pt-2">
            <h2 className="sr-only">Условия</h2>
            <Amenities />
          </Reveal>
        </div>
      </section>

      <section className="bg-black py-20 lg:py-32">
        <div className="wrap">
          <ContactForm service={params.service} />
        </div>
      </section>

      <CtaBand />
    </>
  )
}

/** Карта по клику. Пока координаты не подтверждены владельцем, вместо карты только кнопка маршрута. */
function MapEmbed() {
  const [shown, setShown] = useState(false)
  const { coordinates } = company
  if (coordinates.status !== 'confirmed') return null
  const { lat, lon } = coordinates.value
  return shown ? (
    <iframe
      title="Карта: S-Performance"
      src={`https://yandex.ru/map-widget/v1/?ll=${lon}%2C${lat}&z=16&pt=${lon}%2C${lat}%2Cpm2rdm`}
      className="mt-6 aspect-[4/3] w-full border-0 bg-graphite-2"
      loading="lazy"
    />
  ) : (
    <button type="button" onClick={() => setShown(true)} className="btn btn-outline mt-3">
      Показать карту
    </button>
  )
}
