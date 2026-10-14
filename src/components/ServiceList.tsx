import { useState } from 'react'
import { getServiceGroups } from '../data/services'
import { ServiceRow } from './ServiceRow'

export function ServiceList({ withBooking = false, initialOpen = 0 }: { withBooking?: boolean; initialOpen?: number }) {
  const groups = getServiceGroups()
  const [open, setOpen] = useState<number | null>(initialOpen)
  return (
    <ul className="border-t border-line">
      {groups.map((g, i) => (
        <ServiceRow
          key={g.id}
          group={g}
          index={i}
          open={open === i}
          onToggle={() => setOpen(open === i ? null : i)}
          withBooking={withBooking}
        />
      ))}
    </ul>
  )
}
