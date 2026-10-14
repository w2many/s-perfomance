import { LOGO_RIGHTS_CONFIRMED, logo } from '../data/company'

type Variant = 'header' | 'hero' | 'footer'

/**
 * Логотип: только готовый файл без эффектов и растягивания (не крупнее собственного размера).
 * Если права не подтверждены (LOGO_RIGHTS_CONFIRMED = false), везде текстовый знак.
 */
export function BrandMark({ variant }: { variant: Variant }) {
  if (LOGO_RIGHTS_CONFIRMED) {
    const sizing: Record<Variant, string> = {
      header: 'h-8 lg:h-10 w-auto',
      hero: 'h-auto w-[clamp(280px,34vw,520px)]',
      footer: 'h-auto w-full max-w-[225px]',
    }
    return (
      <img
        src={logo.src}
        alt={variant === 'header' ? logo.alt : ''}
        width={logo.width}
        height={logo.height}
        style={{ maxWidth: Math.min(logo.width, variant === 'footer' ? 225 : logo.width) }}
        className={`block select-none ${sizing[variant]}`}
        draggable={false}
        fetchPriority={variant === 'footer' ? 'low' : 'high'}
        decoding="async"
      />
    )
  }

  if (variant === 'hero') {
    return (
      <span className="block">
        <span className="block whitespace-nowrap font-display text-[clamp(30px,3.6vw,52px)] font-extrabold leading-none tracking-[0.02em] text-silver">
          S-PERFORMANCE
        </span>
        <span aria-hidden className="mt-4 block h-0.5 w-24 bg-red" />
      </span>
    )
  }
  return (
    <span
      className={`whitespace-nowrap font-display font-extrabold tracking-[0.04em] text-silver ${
        variant === 'header' ? 'text-[17px] lg:text-[19px]' : 'text-2xl'
      }`}
    >
      S-PERFORMANCE
    </span>
  )
}
