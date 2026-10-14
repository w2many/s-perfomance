import { animate, useInView, useReducedMotion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'

/** Плавный счёт до значения. Итоговое число всегда равно исходному, без округления. */
export function CountUp({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -15% 0px' })
  const reduce = useReducedMotion()
  const decimals = value.includes('.') ? value.split('.')[1].length : 0
  const target = Number(value)
  const [shown, setShown] = useState(reduce ? value : (0).toFixed(decimals))

  useEffect(() => {
    if (!inView || reduce) return
    const c = animate(0, target, {
      duration: 1.2,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setShown(v.toFixed(decimals)),
      onComplete: () => setShown(value),
    })
    return () => c.stop()
  }, [inView, reduce, target, decimals, value])

  return (
    <span ref={ref} className={className} aria-label={value}>
      <span aria-hidden>{reduce ? value : shown}</span>
    </span>
  )
}
