import { ArrowUpRight } from 'lucide-react'
import { ADDRESS_LINE, buildWhatsAppLink, company, PRIMARY_PHONE, TELEGRAM_URL, YANDEX_MAPS_URL } from '../data/company'
import { buildHref, PAGES, useNav } from '../lib/nav'
import { BrandMark } from './BrandMark'

const YEAR = new Date().getFullYear()
const ext = { target: '_blank', rel: 'noopener noreferrer' } as const
const linkCls = 'inline-flex min-h-10 items-center gap-1.5 text-silver transition-colors hover:text-white'

function Col({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-3 font-semibold text-white">{title}</p>
      {children}
    </div>
  )
}

export function Footer() {
  const { navigateTo } = useNav()
  return (
    <footer className="border-t border-line bg-black pb-[calc(var(--bar-h)+48px)] pt-16 lg:pb-12 lg:pt-20">
      <div className="wrap">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <a
            href={buildHref('home')}
            onClick={(e) => {
              e.preventDefault()
              navigateTo('home')
            }}
            aria-label="S-Performance, на главную"
            className="w-fit"
          >
            <BrandMark variant="footer" />
          </a>
          <a
            href={PRIMARY_PHONE.href}
            className="w-fit whitespace-nowrap font-head text-[clamp(28px,4vw,48px)] font-extrabold leading-none tabular-nums text-white transition-colors hover:text-red-ink"
          >
            {PRIMARY_PHONE.display}
          </a>
        </div>

        <div className="mt-14 grid gap-10 border-t border-line pt-10 sm:grid-cols-2 lg:grid-cols-4">
          <Col title="Адрес">
            <p className="text-silver">{ADDRESS_LINE}</p>
            <ul className="mt-2">
              <li>
                <a href={YANDEX_MAPS_URL} {...ext} className={linkCls}>
                  Яндекс Карты <ArrowUpRight size={15} aria-hidden />
                </a>
              </li>
              {company.channels.twoGis.enabled && company.channels.twoGis.url && (
                <li>
                  <a href={company.channels.twoGis.url} {...ext} className={linkCls}>
                    2ГИС <ArrowUpRight size={15} aria-hidden />
                  </a>
                </li>
              )}
            </ul>
          </Col>

          <Col title="Связь">
            <ul>
              <li>
                <a href={PRIMARY_PHONE.href} className={linkCls}>
                  {PRIMARY_PHONE.display}
                </a>
              </li>
              {company.channels.whatsapp.enabled && (
                <li>
                  <a href={buildWhatsAppLink()} {...ext} className={linkCls}>
                    WhatsApp <ArrowUpRight size={15} aria-hidden />
                  </a>
                </li>
              )}
              {company.channels.telegram.enabled && (
                <li>
                  <a href={TELEGRAM_URL} {...ext} className={linkCls}>
                    Telegram <ArrowUpRight size={15} aria-hidden />
                  </a>
                </li>
              )}
            </ul>
          </Col>

          <nav aria-label="Разделы сайта">
            <p className="mb-3 font-semibold text-white">Разделы</p>
            <ul>
              {PAGES.map((p) => (
                <li key={p.id}>
                  <a
                    href={buildHref(p.id)}
                    onClick={(e) => {
                      e.preventDefault()
                      navigateTo(p.id)
                    }}
                    className={linkCls}
                  >
                    {p.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <Col title="График">
            <dl className="grid max-w-xs gap-2">
              {company.schedule.value.map((d) => (
                <div key={d.days} className="flex justify-between gap-6">
                  <dt className="text-silver">{d.days}</dt>
                  <dd className="font-head font-bold tabular-nums text-white">{d.hours}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-6 text-sm text-steel">Названия марок принадлежат их владельцам.</p>
          </Col>
        </div>

        <p className="mt-14 border-t border-line pt-6 text-sm text-steel">
          © {YEAR} {company.name.value}. Автосервис в Севастополе.
        </p>
      </div>
    </footer>
  )
}
