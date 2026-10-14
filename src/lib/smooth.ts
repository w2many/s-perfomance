import Lenis from 'lenis'

let lenis: Lenis | null = null

export function initSmoothScroll(): () => void {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduce) return () => {}
  lenis = new Lenis({ duration: 1.05, smoothWheel: true })
  let raf = 0
  const loop = (t: number) => {
    lenis?.raf(t)
    raf = requestAnimationFrame(loop)
  }
  raf = requestAnimationFrame(loop)
  return () => {
    cancelAnimationFrame(raf)
    lenis?.destroy()
    lenis = null
  }
}

export function scrollToTop() {
  if (lenis) lenis.scrollTo(0, { immediate: true, force: true })
  window.scrollTo(0, 0)
}

export function setScrollLocked(locked: boolean) {
  if (lenis) {
    if (locked) lenis.stop()
    else lenis.start()
  }
  document.documentElement.style.overflow = locked ? 'hidden' : ''
}
