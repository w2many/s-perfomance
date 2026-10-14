import { MessageCircle, Phone } from 'lucide-react'
import { buildWhatsAppLink, company, PRIMARY_PHONE } from '../data/company'

/** Нижний бар на телефоне: WhatsApp и звонок в один тап. */
export function MobileBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid h-[var(--bar-h)] grid-cols-2 gap-2 border-t border-line bg-black px-3 py-2 pb-[max(8px,env(safe-area-inset-bottom))] lg:hidden">
      {company.channels.whatsapp.enabled && (
        <a href={buildWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="btn btn-primary min-h-12 px-3">
          <MessageCircle size={20} aria-hidden />
          WhatsApp
        </a>
      )}
      <a href={PRIMARY_PHONE.href} className="btn btn-outline min-h-12 px-3">
        <Phone size={19} aria-hidden />
        Позвонить
      </a>
    </div>
  )
}
