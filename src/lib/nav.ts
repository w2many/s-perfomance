import { createContext, useContext } from 'react'

export type Page = 'home' | 'about' | 'services' | 'contacts'
export type NavParams = { service?: string }

export const PAGES: { id: Page; label: string }[] = [
  { id: 'home', label: 'Главная' },
  { id: 'about', label: 'О компании' },
  { id: 'services', label: 'Услуги' },
  { id: 'contacts', label: 'Контакты' },
]

const isPage = (v: string | null): v is Page => !!v && PAGES.some((p) => p.id === v)

export function readLocation(): { page: Page; params: NavParams } {
  const sp = new URLSearchParams(window.location.search)
  const page = sp.get('page')
  const service = sp.get('service') ?? undefined
  return { page: isPage(page) ? page : 'home', params: service ? { service } : {} }
}

/**
 * Адрес страницы. Сейчас вид /?page=services; для боевого запуска достаточно
 * поменять эту функцию и readLocation на реальные пути (/services/) и добавить по index.html на страницу.
 */
export function buildHref(page: Page, params: NavParams = {}): string {
  const sp = new URLSearchParams()
  if (page !== 'home') sp.set('page', page)
  if (params.service) sp.set('service', params.service)
  const q = sp.toString()
  return q ? `/?${q}` : '/'
}

export interface NavContextValue {
  page: Page
  params: NavParams
  navigateTo: (page: Page, params?: NavParams) => void
}

export const NavContext = createContext<NavContextValue | null>(null)

export function useNav(): NavContextValue {
  const ctx = useContext(NavContext)
  if (!ctx) throw new Error('useNav вне NavContext')
  return ctx
}
