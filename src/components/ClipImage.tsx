import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { clipReveal, viewportOnce } from '../lib/motion'
import type { Photo } from '../data/photos'

/** Фото с проявлением через clip-path и лёгким внутренним параллаксом. */
export function ClipImage({ photo, className = '', sizes = '100vw' }: { photo: Photo; className?: string; sizes?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-5%', '5%'])
  return (
    <figure className={className}>
      <motion.div
        ref={ref}
        className="relative overflow-clip bg-graphite-2"
        style={{ aspectRatio: `${photo.width} / ${photo.height}` }}
        variants={clipReveal}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
      >
        <motion.img
          src={photo.src}
          alt={photo.alt}
          width={photo.width}
          height={photo.height}
          sizes={sizes}
          loading="lazy"
          decoding="async"
          className="absolute inset-x-0 top-[-6%] h-[112%] w-full object-cover"
          style={{ y }}
        />
      </motion.div>
      <figcaption className="mt-3 text-sm text-steel">{photo.caption}</figcaption>
    </figure>
  )
}
