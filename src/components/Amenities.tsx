import { company } from '../data/company'

/** Строки удобств и условий: только подтверждённые факты. */
export function Amenities({ className = '' }: { className?: string }) {
  const rows = [...company.amenities.value, company.scheduleFallback, company.payment.label]
  return (
    <ul className={`border-t border-line ${className}`}>
      {rows.map((r) => (
        <li key={r} className="flex items-center gap-4 border-b border-line py-4 text-[clamp(17px,1.4vw,20px)] text-silver">
          <span aria-hidden className="h-0.5 w-4 shrink-0 bg-red" />
          {r}
        </li>
      ))}
    </ul>
  )
}
