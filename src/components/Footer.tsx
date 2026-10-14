import { ArrowUpRight } from 'lucide-react'
import { ADDRESS_LINE, buildWhatsAppLink, company, PRIMARY_PHONE, TELEGRAM_URL, YANDEX_MAPS_URL } from '../data/company'
import { buildHref, PAGES, useNav } from '../lib/nav'
import { BrandMark } from './BrandMark'

const ext = { target: '_blank', rel: 'noopener noreferrer' } as const

const YEAR = new Date().getFullYear()

export function Footer() {
  const { navigateTo } = useNav()
  return (
    <footer className="bg-graphite pb-[calc(var(--bar-h)+8px)]">
      <div className="wrap grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr] lg:py-20">
        <div className="grid content-start gap-5">
          <div className="w-fit bg-black p-3">
            <BrandMark variant="footer" />
          </div>
          <p className="max-w-xs text-steel">Автосервис в Севастополе. BMW, Mercedes-Benz, MINI.</p>
        </div>

        <div className="grid content-start gap-3">
          <p className="text-silver">{ADDRESS_LINE}</p>
          <a href={PRIMARY_PHONE.href} className="font-head text-xl font-bold text-silver hover:text-white">
            {PRIMARY_PHONE.display}
          </a>
          <ul className="mt-2 grid gap-2 text-steel">
            {company.channels.whatsapp.enabled && (
              <li>
                <a href={buildWhatsAppLink()} {...ext} className="inline-flex items-center gap-1.5 hover:text-silver">
                  WhatsApp <ArrowUpRight size={15} aria-hidden />
                </a>
              </li>
            )}
            {company.channels.telegram.enabled && (
              <li>
                <a href={TELEGRAM_URL} {...ext} className="inline-flex items-center gap-1.5 hover:text-silver">
                  Telegram <ArrowUpRight size={15} aria-hidden />
                </a>
              </li>
            )}
            <li>
              <a href={YANDEX_MAPS_URL} {...ext} className="inline-flex items-center gap-1.5 hover:text-silver">
                Яндекс Карты <ArrowUpRight size={15} aria-hidden />
              </a>
            </li>
          </ul>
        </div>

        <nav aria-label="Разделы сайта">
          <ul className="grid gap-3">
            {PAGES.map((p) => (
              <li key={p.id}>
                <a
                  href={buildHref(p.id)}
                  onClick={(e) => {
                    e.preventDefault()
                    navigateTo(p.id)
                  }}
                  className="text-silver hover:text-white"
                >
                  {p.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="wrap">
        <div className="flex flex-wrap justify-between gap-3 border-t border-line py-6 text-sm text-steel">
          <span>
            © {YEAR} {company.name.value}
          </span>
          <span>{ADDRESS_LINE}</span>
        </div>
      </div>
    </footer>
  )
}
