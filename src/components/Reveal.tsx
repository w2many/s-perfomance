import { motion, type Variants } from 'motion/react'
import type { ReactNode } from 'react'
import { plainFade, viewportOnce } from '../lib/motion'

interface Props {
  children: ReactNode
  className?: string
  index?: number
  variants?: Variants
  as?: 'div' | 'li' | 'section' | 'p'
}

export function Reveal({ children, className, index = 0, variants = plainFade, as = 'div' }: Props) {
  const Tag = motion[as]
  return (
    <Tag className={className} variants={variants} custom={index} initial="hidden" whileInView="show" viewport={viewportOnce}>
      {children}
    </Tag>
  )
}
