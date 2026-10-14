import { Plus } from 'lucide-react'
import { useId } from 'react'
import { company } from '../data/company'
import type { ServiceGroup } from '../data/services'
import { useNav } from '../lib/nav'
import { plural, POSITIONS } from '../lib/plural'
import { WhatsAppButton } from './ContactButtons'

interface Props {
  group: ServiceGroup
  index: number
  open: boolean
  onToggle: () => void
  /** На странице «Услуги» добавляется кнопка «Записаться». */
  withBooking?: boolean
}

export function ServiceRow({ group, index, open, onToggle, withBooking = false }: Props) {
  const id = useId()
  const { navigateTo } = useNav()
  const num = String(index + 1).padStart(2, '0')
  const single = group.items.length === 1 && group.items[0].title === group.title

  return (
    <li className="border-b border-line">
      <h3>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={id}
          onClick={onToggle}
          className="group grid w-full grid-cols-[auto_1fr_auto] items-center gap-x-4 py-6 text-left transition-transform duration-300 ease-out hover:-translate-y-0.5 motion-reduce:transform-none md:gap-x-8 md:py-8"
        >
          <span
            aria-hidden
            className={`w-[2.25em] font-display text-[clamp(40px,6vw,84px)] font-extrabold leading-none tabular-nums transition-colors duration-300 ${
              open ? 'text-red' : 'num-outline group-hover:text-silver'
            }`}
          >
            {num}
          </span>
          <span className="min-w-0">
            <span className="block font-head text-[clamp(20px,2.4vw,34px)] font-bold leading-tight text-silver">{group.title}</span>
            <span className="mt-1.5 block text-sm text-steel">
              {single ? 'Отдельная работа' : `${group.items.length} ${plural(group.items.length, POSITIONS)}`}
            </span>
          </span>
          <span
            aria-hidden
            className={`grid size-11 place-items-center rounded-full border transition-[transform,background-color,border-color] duration-300 ${
              open ? 'rotate-45 border-red bg-red text-white' : 'border-line text-silver group-hover:border-silver'
            }`}
          >
            <Plus size={20} />
          </span>
        </button>
      </h3>
      <div id={id} className="acc" data-open={open} role="region" aria-label={group.title}>
        <div>
          <div className="grid gap-6 pb-8 md:grid-cols-[minmax(0,1fr)_minmax(0,280px)] md:gap-10 md:pl-[calc(clamp(40px,6vw,84px)*2.25+2rem)]">
            <ul className="grid gap-x-8 sm:grid-cols-2">
              {group.items.map((item) => (
                <li key={item.title} className="flex items-baseline gap-3 border-t border-line py-3 text-silver">
                  <span aria-hidden className="h-0.5 w-3 shrink-0 -translate-y-1 bg-red" />
                  {item.title}
                </li>
              ))}
            </ul>
            <div className="flex flex-col gap-3">
              <p className="text-sm text-steel">{company.priceNote}</p>
              {withBooking && (
                <button type="button" onClick={() => navigateTo('contacts', { service: group.id })} className="btn btn-outline w-full">
                  Записаться
                </button>
              )}
              <WhatsAppButton
                label="Спросить в WhatsApp"
                text={`Здравствуйте! Интересует: ${group.title}. Автомобиль: …`}
                className="w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </li>
  )
}

