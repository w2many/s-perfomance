import { company, PRIMARY_PHONE, SITE_URL, TELEGRAM_URL, YANDEX_MAPS_URL } from '../data/company'
import { getServiceGroups } from '../data/services'
import { buildHref, type Page } from './nav'

export interface PageSeo {
  title: string
  description: string
  jsonLd: Record<string, unknown>
}

const BUSINESS_ID = `${SITE_URL}/#business`
const abs = (page: Page) => `${SITE_URL}${buildHref(page)}`

function business(): Record<string, unknown> {
  const { street, city, country } = company.address.value
  const node: Record<string, unknown> = {
    '@type': 'AutoRepair',
    '@id': BUSINESS_ID,
    name: company.name.value,
    url: `${SITE_URL}/`,
    image: `${SITE_URL}/og-image.jpg`,
    telephone: PRIMARY_PHONE.href.replace('tel:', ''),
    address: {
      '@type': 'PostalAddress',
      streetAddress: street,
      addressLocality: city,
      addressCountry: country,
    },
    sameAs: [YANDEX_MAPS_URL, TELEGRAM_URL],
    paymentAccepted: 'Cash, Credit Card',
    knowsAbout: company.brands.value,
  }
  // geo не добавляется, пока координаты в статусе verify.
  if (company.rating.enabled) {
    node.aggregateRating = {
      '@type': 'AggregateRating',
      name: 'Рейтинг на Яндекс Картах',
      url: company.rating.sourceUrl,
      ratingValue: company.rating.value.score,
      bestRating: '5',
      ratingCount: company.rating.value.ratingCount,
      reviewCount: company.rating.value.reviewCount,
    }
  }
  return node
}

function graph(page: Page, type: string, name: string, extra: Record<string, unknown> = {}) {
  return {
    '@context': 'https://schema.org',
    '@graph': [business(), { '@type': type, '@id': `${abs(page)}#page`, url: abs(page), name, inLanguage: 'ru', about: { '@id': BUSINESS_ID }, ...extra }],
  }
}

export function getSeo(page: Page): PageSeo {
  switch (page) {
    case 'about':
      return {
        title: 'О сервисе S-Performance в Севастополе',
        description:
          'S-Performance — автосервис в Севастополе, Фиолентовское шоссе, 7. Ремонт и диагностика BMW, Mercedes-Benz и MINI, запись заранее, парковка, оплата картой и СБП.',
        jsonLd: graph('about', 'AboutPage', 'О сервисе S-Performance'),
      }
    case 'services':
      return {
        title: 'Услуги — S-Performance, автосервис в Севастополе',
        description:
          'Услуги S-Performance в Севастополе: компьютерная диагностика, электрооборудование, АКПП, ГБЦ, ремень ГРМ, тормоза и чип-тюнинг BMW, Mercedes-Benz и MINI.',
        jsonLd: graph('services', 'WebPage', 'Услуги S-Performance', {
          mainEntity: {
            '@type': 'OfferCatalog',
            name: 'Услуги S-Performance',
            itemListElement: getServiceGroups().map((g) => ({
              '@type': 'OfferCatalog',
              name: g.title,
              itemListElement: g.items.map((i) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: i.title } })),
            })),
          },
        }),
      }
    case 'contacts':
      return {
        title: 'Контакты и как проехать — S-Performance, Севастополь',
        description: `Контакты S-Performance: Севастополь, Фиолентовское шоссе, 7, телефон ${PRIMARY_PHONE.display}, WhatsApp и Telegram. Запись заранее, маршрут в Яндекс Картах.`,
        jsonLd: graph('contacts', 'ContactPage', 'Контакты S-Performance'),
      }
    default:
      return {
        title: 'S-Performance — автосервис в Севастополе | Фиолентовское шоссе, 7',
        description:
          'S-Performance — автосервис в Севастополе, Фиолентовское шоссе, 7. Ремонт, диагностика и чип-тюнинг BMW, Mercedes-Benz и MINI. Запись по телефону и в WhatsApp.',
        jsonLd: graph('home', 'WebPage', 'S-Performance — автосервис в Севастополе'),
      }
  }
}

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.content = content
}

export function applySeo(page: Page) {
  const seo = getSeo(page)
  document.title = seo.title
  setMeta('name', 'description', seo.description)
  setMeta('property', 'og:title', seo.title)
  setMeta('property', 'og:description', seo.description)
  setMeta('property', 'og:url', abs(page))
  setMeta('name', 'twitter:title', seo.title)
  setMeta('name', 'twitter:description', seo.description)
  let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!canonical) {
    canonical = document.createElement('link')
    canonical.rel = 'canonical'
    document.head.appendChild(canonical)
  }
  canonical.href = abs(page)
  let ld = document.getElementById('ld-json')
  if (!ld) {
    ld = document.createElement('script')
    ld.id = 'ld-json'
    ld.setAttribute('type', 'application/ld+json')
    document.head.appendChild(ld)
  }
  ld.textContent = JSON.stringify(seo.jsonLd)
}
