import type { Transition, Variants } from 'motion/react'

export const EASE_OUT = [0.22, 1, 0.36, 1] as const
export const EASE_IN_OUT = [0.65, 0, 0.35, 1] as const

export const baseTransition: Transition = { duration: 0.8, ease: EASE_OUT }

/** Слово или строка выезжает снизу из-под маски. */
export const maskRise: Variants = {
  hidden: { y: '110%' },
  show: (i: number = 0) => ({ y: '0%', transition: { ...baseTransition, delay: i * 0.08 } }),
}

/** Фото или блок проявляется через clip-path. */
export const clipReveal: Variants = {
  hidden: { clipPath: 'inset(0 0 100% 0)' },
  show: { clipPath: 'inset(0 0 0% 0)', transition: { duration: 1, ease: EASE_IN_OUT } },
}

/** Сдвиг по горизонтали с проявлением. */
export const slideX: Variants = {
  hidden: { x: -32, opacity: 0 },
  show: (i: number = 0) => ({ x: 0, opacity: 1, transition: { ...baseTransition, delay: i * 0.1 } }),
}

/** Простое проявление снизу. */
export const plainFade: Variants = {
  hidden: { y: 18, opacity: 0 },
  show: (i: number = 0) => ({ y: 0, opacity: 1, transition: { duration: 0.7, ease: EASE_OUT, delay: i * 0.07 } }),
}

export const pageTransition = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE_OUT } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.35, ease: EASE_OUT } },
}

export const viewportOnce = { once: true, margin: '0px 0px -12% 0px' } as const
