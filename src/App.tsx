import { AnimatePresence, motion, MotionConfig } from 'motion/react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { MobileBar } from './components/MobileBar'
import { ScrollProgress } from './components/ScrollProgress'
import { pageTransition } from './lib/motion'
import { buildHref, NavContext, readLocation, type NavParams, type Page } from './lib/nav'
import { applySeo } from './lib/seo'
import { initSmoothScroll, scrollToTop } from './lib/smooth'
import { About } from './pages/About'
import { Contacts } from './pages/Contacts'
import { Home } from './pages/Home'
import { Services } from './pages/Services'

const VIEWS: Record<Page, () => React.JSX.Element> = { home: Home, about: About, services: Services, contacts: Contacts }

export default function App() {
  const [{ page: currentPage, params }, setState] = useState(readLocation)

  useEffect(() => initSmoothScroll(), [])

  useEffect(() => {
    try {
      history.scrollRestoration = 'manual'
    } catch {
      // нет доступа к history
    }
    applySeo(readLocation().page)
    const onPop = () => {
      const next = readLocation()
      setState(next)
      applySeo(next.page)
      scrollToTop()
    }
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  const navigateTo = useCallback((page: Page, nextParams: NavParams = {}) => {
    const href = buildHref(page, nextParams)
    if (href === window.location.pathname + window.location.search) {
      scrollToTop()
      return
    }
    try {
      window.history.pushState({ page }, '', href)
    } catch {
      // В песочнице (предпросмотр) история может быть недоступна: страница всё равно переключится.
    }
    setState({ page, params: nextParams })
    applySeo(page)
  }, [])

  const nav = useMemo(() => ({ page: currentPage, params, navigateTo }), [currentPage, params, navigateTo])
  const View = VIEWS[currentPage]

  return (
    <MotionConfig reducedMotion="user">
      <NavContext.Provider value={nav}>
        <a href="#main" className="sr-only z-[70] bg-red px-4 py-3 text-white focus:not-sr-only focus:fixed focus:left-3 focus:top-3">
          К содержимому
        </a>
        <ScrollProgress />
        <Header />
        <AnimatePresence mode="wait" onExitComplete={scrollToTop}>
          <motion.main id="main" key={currentPage + (params.service ?? '')} {...pageTransition} className="overflow-x-clip">
            <View />
          </motion.main>
        </AnimatePresence>
        <Footer />
        <MobileBar />
      </NavContext.Provider>
    </MotionConfig>
  )
}
