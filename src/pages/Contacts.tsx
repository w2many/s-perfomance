import { Check, Copy, MapPin, Navigation } from 'lucide-react'
import { useState } from 'react'
import { Amenities } from '../components/Amenities'
import { TelegramButton, WhatsAppButton } from '../components/ContactButtons'
import { ContactForm } from '../components/ContactForm'
import { CtaBand } from '../components/CtaBand'
import { PageHead } from '../components/PageHead'
import { Reveal } from '../components/Reveal'
import { YandexMap } from '../components/YandexMap'
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
        <div className="wrap grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <Reveal className="grid content-start gap-12">
            <div>
              <h2 className="font-head text-[clamp(26px,3vw,40px)] font-extrabold text-silver">Адрес</h2>
              <p className="mt-5 flex gap-3 font-head text-[clamp(26px,3vw,44px)] font-bold leading-tight text-silver">
                <MapPin aria-hidden className="mt-[0.2em] size-[0.8em] shrink-0 text-red-ink" />
                {ADDRESS_LINE}
              </p>
              <a href={YANDEX_MAPS_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-6">
                <Navigation size={18} aria-hidden />
                Построить маршрут
              </a>
            </div>
            <div>
              <h2 className="font-head text-[clamp(22px,2.2vw,30px)] font-bold text-silver">График</h2>
              <dl className="mt-4 border-t border-line">
                {company.schedule.value.map((d) => (
                  <div key={d.days} className="flex justify-between gap-6 border-b border-line py-4 text-[clamp(17px,1.4vw,20px)]">
                    <dt className="text-silver">{d.days}</dt>
                    <dd className={`tabular-nums ${d.opens ? 'text-silver' : 'text-steel'}`}>{d.hours}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div>
              <h2 className="sr-only">Условия</h2>
              <Amenities withSchedule={false} />
            </div>
          </Reveal>
          <Reveal index={1}>
            <h2 className="sr-only">Как найти</h2>
            <YandexMap className="aspect-[4/5] w-full max-w-full sm:aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-[560px]" />
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
