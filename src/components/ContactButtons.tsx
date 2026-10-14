import { MessageCircle, Phone, Send } from 'lucide-react'
import { buildWhatsAppLink, company, PRIMARY_PHONE, TELEGRAM_URL } from '../data/company'

const ext = { target: '_blank', rel: 'noopener noreferrer' } as const

type Tone = 'dark' | 'red'

export function WhatsAppButton({
  label = 'Написать в WhatsApp',
  text,
  tone = 'dark',
  shimmer = false,
  className = '',
}: {
  label?: string
  text?: string
  tone?: Tone
  shimmer?: boolean
  className?: string
}) {
  if (!company.channels.whatsapp.enabled) return null
  const style = tone === 'red' ? 'btn-white' : `btn-primary ${shimmer ? 'shimmer' : ''}`
  return (
    <a href={buildWhatsAppLink(text)} {...ext} className={`btn ${style} ${className}`}>
      <MessageCircle size={20} aria-hidden />
      {label}
    </a>
  )
}

export function CallButton({ label = 'Позвонить', tone = 'dark', className = '' }: { label?: string; tone?: Tone; className?: string }) {
  return (
    <a href={PRIMARY_PHONE.href} className={`btn ${tone === 'red' ? 'btn-outline-white' : 'btn-outline'} ${className}`}>
      <Phone size={19} aria-hidden />
      {label}
    </a>
  )
}

export function TelegramButton({ label = 'Telegram', tone = 'dark', className = '' }: { label?: string; tone?: Tone; className?: string }) {
  if (!company.channels.telegram.enabled) return null
  return (
    <a href={TELEGRAM_URL} {...ext} className={`btn ${tone === 'red' ? 'btn-outline-white' : 'btn-outline'} ${className}`}>
      <Send size={19} aria-hidden />
      {label}
    </a>
  )
}
