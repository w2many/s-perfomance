import { motion, useReducedMotion } from 'motion/react'

/** Разделитель секций: тонкая линия, по которой один раз пробегает красный отрезок. */
export function ScanLine({ className = '', tone = 'line' }: { className?: string; tone?: 'line' | 'red' }) {
  const reduce = useReducedMotion()
  return (
    <div aria-hidden className={`relative h-px overflow-clip ${tone === 'red' ? 'bg-red' : 'bg-line'} ${className}`}>
      {!reduce && (
        <motion.span
          className="absolute inset-0"
          initial={{ x: '-12%', opacity: 1 }}
          whileInView={{ x: '100%', opacity: [1, 1, 0] }}
          viewport={{ once: true, margin: '0px 0px -10% 0px' }}
          transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
        >
          <span className={`absolute left-0 top-0 h-px w-[12%] ${tone === 'red' ? 'bg-white' : 'bg-red'}`} />
        </motion.span>
      )}
    </div>
  )
}
