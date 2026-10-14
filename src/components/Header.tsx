import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { Menu, MessageCircle, Phone, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { buildWhatsAppLink, PRIMARY_PHONE } from '../data/company'
import { EASE_OUT } from '../lib/motion'
import { buildHref, PAGES, useNav, type Page } from '../lib/nav'
import { setScrollLocked } from '../lib/smooth'
import { BrandMark } from './BrandMark'
import { ScanPass } from './ScanPass'

export const SCAN_EVENT = 'sp:scan'

export function Header() {
  const { page, navigateTo } = useNav()
  const { scrollY } = useScroll()
  const [compact, setCompact] = useState(false)
  const [open, setOpen] = useState(false)
  const [scan, setScan] = useState(0)

  useMotionValueEvent(scrollY, 'change', (v) => setCompact(v > 24))

  useEffect(() => {
    const onScan = () => setScan((n) => n + 1)
    window.addEventListener(SCAN_EVENT, onScan)
    return () => window.removeEventListener(SCAN_EVENT, onScan)
  }, [])

  useEffect(() => {
    setScrollLocked(open)
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const go = (p: Page) => (e: React.MouseEvent) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey) return
    e.preventDefault()
    setOpen(false)
    navigateTo(p)
  }

  return (
    <header className="sticky top-0 z-50 bg-black">
      <div className="wrap flex h-[var(--header-h)] items-center justify-between gap-6">
        <a
          href={buildHref('home')}
          onClick={(e) => {
            setScan((n) => n + 1)
            go('home')(e)
          }}
          aria-label="S-Performance, на главную"
          className={`origin-left transition-transform duration-300 ease-out ${compact ? 'scale-[0.86]' : ''}`}
        >
          <ScanPass trigger={scan}>
            <BrandMark variant="header" />
          </ScanPass>
        </a>

        <nav aria-label="Основное меню" className="hidden lg:block">
          <ul className="flex items-center gap-9">
            {PAGES.map((p) => (
              <li key={p.id}>
                <a
                  href={buildHref(p.id)}
                  onClick={go(p.id)}
                  aria-current={page === p.id ? 'page' : undefined}
                  className={`relative block py-2 text-[15px] font-medium transition-colors ${page === p.id ? 'text-silver' : 'text-steel hover:text-silver'}`}
                >
                  {p.label}
                  {page === p.id && (
                    <motion.span layoutId="nav-underline" className="absolute inset-x-0 -bottom-0.5 h-[3px] bg-red" transition={{ duration: 0.45, ease: EASE_OUT }} />
                  )}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a href={buildWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="btn btn-primary hidden min-h-11 px-5 text-[15px] lg:inline-flex">
            <MessageCircle size={18} aria-hidden />
            WhatsApp
          </a>
          <button
            type="button"
            className="grid size-12 place-items-center text-silver lg:hidden"
            aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>
      <motion.div aria-hidden className="h-px bg-line" initial={false} animate={{ opacity: compact || open ? 1 : 0 }} />

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-x-0 bottom-0 top-[var(--header-h)] z-40 overflow-y-auto bg-black lg:hidden"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.45, ease: EASE_OUT }}
          >
            <nav aria-label="Меню" className="wrap flex min-h-full flex-col pb-10 pt-6">
              <ul>
                {PAGES.map((p, i) => (
                  <motion.li
                    key={p.id}
                    className="border-b border-line"
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.06, duration: 0.45, ease: EASE_OUT }}
                  >
                    <a
                      href={buildHref(p.id)}
                      onClick={go(p.id)}
                      aria-current={page === p.id ? 'page' : undefined}
                      className="flex items-baseline gap-4 py-5 font-head text-[30px] font-bold text-silver"
                    >
                      <span className={`text-sm tabular-nums ${page === p.id ? 'text-red-ink' : 'text-steel'}`}>0{i + 1}</span>
                      {p.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
              <motion.div
                className="mt-auto grid gap-3 pt-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.4 }}
              >
                <a href={PRIMARY_PHONE.href} className="font-head text-2xl font-bold text-silver">
                  {PRIMARY_PHONE.display}
                </a>
                <div className="grid grid-cols-2 gap-3">
                  <a href={buildWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="btn btn-primary px-3">
                    <MessageCircle size={19} aria-hidden />
                    WhatsApp
                  </a>
                  <a href={PRIMARY_PHONE.href} className="btn btn-outline px-3">
                    <Phone size={19} aria-hidden />
                    Позвонить
                  </a>
                </div>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
