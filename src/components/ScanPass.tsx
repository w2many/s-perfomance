import { useAnimate, useReducedMotion } from 'motion/react'
import { useEffect, type ReactNode } from 'react'
import { EASE_IN_OUT } from '../lib/motion'

interface Props {
  children: ReactNode
  /** Каждое изменение запускает проход сканера заново. 0 = без прохода. */
  trigger: number
  className?: string
}

/**
 * Фирменный приём «Проход сканера»: тонкая красная линия идёт сверху вниз,
 * содержимое проявляется следом за ней через clip-path, затем линия гаснет.
 */
export function ScanPass({ children, trigger, className = '' }: Props) {
  const [scope, animate] = useAnimate<HTMLDivElement>()
  const reduce = useReducedMotion()

  useEffect(() => {
    if (!trigger || reduce || !scope.current) return
    const D = 0.9
    animate('[data-scan-track]', { y: ['0%', '100%'], opacity: [1, 1] }, { duration: D, ease: EASE_IN_OUT })
    animate(
      '[data-scan-body]',
      { clipPath: ['inset(0 0 100% 0)', 'inset(0 0 0% 0)'] },
      { duration: D, ease: EASE_IN_OUT, delay: 0.08 },
    )
    animate('[data-scan-track]', { opacity: 0 }, { duration: 0.35, delay: D })
  }, [trigger, reduce, animate, scope])

  return (
    <div ref={scope} className={`relative ${className}`}>
      <div data-scan-body style={trigger && !reduce ? { clipPath: 'inset(0 0 100% 0)' } : undefined}>
        {children}
      </div>
      {reduce ? (
        trigger > 0 && <span aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5 bg-red" />
      ) : (
        <span aria-hidden data-scan-track className="pointer-events-none absolute inset-0 opacity-0">
          <span className="absolute inset-x-0 top-0 h-0.5 bg-red" />
        </span>
      )}
    </div>
  )
}
