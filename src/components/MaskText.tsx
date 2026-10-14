import { motion } from 'motion/react'
import { maskRise, viewportOnce } from '../lib/motion'

interface Props {
  text: string
  as?: 'h1' | 'h2' | 'h3' | 'p'
  className?: string
  /** Сразу при монтировании, а не при попадании в область видимости. */
  immediate?: boolean
}

/** Слова выезжают снизу из-под маски одно за другим. */
export function MaskText({ text, as = 'h2', className = '', immediate = false }: Props) {
  const Tag = motion[as]
  const words = text.split(' ')
  const trigger = immediate ? { animate: 'show' } : { whileInView: 'show', viewport: viewportOnce }
  return (
    <Tag className={className} initial="hidden" {...trigger} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} aria-hidden className="inline-block overflow-clip whitespace-nowrap pb-[0.06em] align-bottom">
          <motion.span className="inline-block" variants={maskRise} custom={i}>
            {w}
          </motion.span>
          {i < words.length - 1 && ' '}
        </span>
      ))}
    </Tag>
  )
}
