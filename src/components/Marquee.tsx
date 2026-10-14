import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  wrap,
} from 'motion/react'
import { useRef } from 'react'

const LATIN_ONLY = /^[\x20-\x7E]+$/

/**
 * Бегущая строка: постоянная скорость, при прокрутке страницы ускоряется
 * и меняет направление вслед за ней. При reduced-motion стоит на месте.
 */
export function Marquee({ items, speed = 2 }: { items: string[]; speed?: number }) {
  const reduce = useReducedMotion()
  const baseX = useMotionValue(0)
  const { scrollY } = useScroll()
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 })
  const boost = useTransform(velocity, [-1500, 0, 1500], [-4, 0, 4], { clamp: false })
  const x = useTransform(baseX, (v) => `${wrap(-25, 0, v)}%`)
  const dir = useRef(1)

  useAnimationFrame((_, delta) => {
    if (reduce) return
    const b = boost.get()
    if (b < 0) dir.current = -1
    else if (b > 0) dir.current = 1
    let move = -dir.current * speed * (delta / 1000)
    move += move * Math.abs(b) * 0.6
    baseX.set(baseX.get() + move)
  })

  const line = (
    <span className="flex shrink-0 items-center">
      {items.map((w) => (
        <span key={w} className="flex items-center">
          {/* Orbitron без кириллицы: латинские пункты им, остальные Exo 2 */}
          <span className={`px-[0.6em] ${LATIN_ONLY.test(w) ? 'font-display' : 'font-head'}`}>{w}</span>
          <span aria-hidden className="h-[3px] w-[0.55em] bg-red" />
        </span>
      ))}
    </span>
  )

  return (
    <div className="overflow-clip border-y border-line py-3.5 lg:py-5">
      <p className="sr-only">{items.join(', ')}</p>
      <motion.div
        aria-hidden
        className="flex w-max whitespace-nowrap text-[clamp(22px,3.2vw,44px)] font-extrabold uppercase leading-none text-silver"
        style={{ x: reduce ? 0 : x }}
      >
        {line}
        {line}
        {line}
        {line}
      </motion.div>
    </div>
  )
}
