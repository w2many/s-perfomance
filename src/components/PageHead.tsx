import { motion } from 'motion/react'
import type { ReactNode } from 'react'
import { EASE_OUT } from '../lib/motion'
import { MaskText } from './MaskText'
import { ScanLine } from './ScanLine'

/** Шапка внутренней страницы: огромный заголовок выезжает из-под маски. */
export function PageHead({ title, children, size = 'text-[clamp(44px,9vw,148px)]' }: { title: string; children?: ReactNode; size?: string }) {
  return (
    <section className="bg-black">
      <div className="wrap pb-12 pt-14 lg:pb-16 lg:pt-24">
        <MaskText
          as="h1"
          immediate
          text={title}
          className={`font-head ${size} font-extrabold uppercase leading-[0.95] text-silver`}
        />
        {children && (
          <motion.div
            className="mt-6 max-w-2xl text-[clamp(18px,1.6vw,22px)] text-steel lg:mt-8"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45, ease: EASE_OUT }}
          >
            {children}
          </motion.div>
        )}
      </div>
      <div className="wrap">
        <ScanLine />
      </div>
    </section>
  )
}
