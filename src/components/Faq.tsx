import { Plus } from 'lucide-react'
import { useId, useState } from 'react'
import { company } from '../data/company'

/** Вопросы и ответы. Пустой список — блок не рендерится. */
export function Faq() {
  const [open, setOpen] = useState<number | null>(0)
  const uid = useId()
  if (company.faq.length === 0) return null
  return (
    <section className="bg-graphite py-20 lg:py-32">
      <div className="wrap grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
        <h2 className="font-head text-[clamp(32px,5vw,72px)] font-extrabold leading-[1.02] text-silver lg:sticky lg:top-[calc(var(--header-h)+32px)] lg:self-start">
          Вопросы и ответы
        </h2>
        <ul className="border-t border-line">
          {company.faq.map((f, i) => {
            const isOpen = open === i
            const id = `${uid}-${i}`
            return (
              <li key={f.q} className="border-b border-line">
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={id}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="group flex w-full items-center justify-between gap-6 py-5 text-left lg:py-6"
                  >
                    <span className="text-[clamp(18px,1.6vw,22px)] font-medium text-silver">{f.q}</span>
                    <span
                      aria-hidden
                      className={`grid size-10 shrink-0 place-items-center rounded-full border transition-[transform,background-color,border-color] duration-300 ${
                        isOpen ? 'rotate-45 border-red bg-red text-white' : 'border-line text-silver group-hover:border-silver'
                      }`}
                    >
                      <Plus size={18} />
                    </span>
                  </button>
                </h3>
                <div id={id} role="region" aria-label={f.q} className="acc" data-open={isOpen}>
                  <div>
                    <p className="max-w-[60ch] pb-6 pr-14 text-steel">{f.a}</p>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
