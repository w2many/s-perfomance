import { Check, Copy, MessageCircle, Phone } from 'lucide-react'
import { useId, useState } from 'react'
import { buildWhatsAppLink, company, PRIMARY_PHONE, TELEGRAM_URL } from '../data/company'
import { formTopics, serviceGroups, type FormTopic } from '../data/services'

interface Props {
  /** id группы услуг из адреса (?service=...). */
  service?: string
  headingLevel?: 'h2' | 'h3'
}

export function ContactForm({ service, headingLevel = 'h2' }: Props) {
  const uid = useId()
  const group = serviceGroups.find((g) => g.id === service)
  const [topic, setTopic] = useState<FormTopic>(group?.topic ?? 'diagnostics')
  const [car, setCar] = useState('')
  const [issue, setIssue] = useState('')
  const [phone, setPhone] = useState('')
  const [copied, setCopied] = useState(false)
  const Heading = headingLevel

  const topicLabel = formTopics.find((t) => t.id === topic)?.label ?? ''
  const message = [
    'Здравствуйте!',
    `Нужно: ${topicLabel}${group && group.topic === topic && group.title !== topicLabel ? ` (${group.title})` : ''}.`,
    car.trim() ? `Автомобиль: ${car.trim()}.` : 'Автомобиль: …',
    issue.trim() && `Что происходит: ${issue.trim()}.`,
    phone.trim() && `Телефон для связи: ${phone.trim()}.`,
  ]
    .filter(Boolean)
    .join('\n')

  async function copyAndOpenTelegram() {
    try {
      await navigator.clipboard.writeText(message)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 4000)
    } catch {
      setCopied(false)
    }
    window.open(TELEGRAM_URL, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,.8fr)_minmax(0,1.2fr)] lg:gap-20">
      <div>
        <Heading className="font-head text-[clamp(30px,4.4vw,60px)] font-extrabold leading-[1.05] text-silver">
          Расскажите, что нужно
        </Heading>
        <p className="mt-5 max-w-md text-steel">Напишите марку, модель, год автомобиля и что вас беспокоит.</p>
        <p className="mt-3 max-w-md text-steel">Сообщение соберётся само: останется отправить его в WhatsApp или Telegram.</p>
      </div>

      <form className="grid gap-6" onSubmit={(e) => e.preventDefault()} aria-describedby={`${uid}-hint`}>
        <fieldset>
          <legend className="mb-3 text-sm font-medium text-silver">Что нужно</legend>
          <div className="flex flex-wrap gap-2">
            {formTopics.map((t) => (
              <label key={t.id} className="cursor-pointer">
                <input
                  type="radio"
                  name={`${uid}-topic`}
                  value={t.id}
                  checked={topic === t.id}
                  onChange={() => setTopic(t.id)}
                  className="peer sr-only"
                />
                <span className="inline-flex min-h-11 items-center border border-line px-4 text-[15px] text-silver transition-colors peer-checked:border-red peer-checked:bg-red peer-checked:text-white peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-red-ink hover:border-silver">
                  {t.label}
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="grid gap-2">
          <label htmlFor={`${uid}-car`} className="text-sm font-medium text-silver">
            Марка, модель и год автомобиля
          </label>
          <input id={`${uid}-car`} className="field" value={car} onChange={(e) => setCar(e.target.value)} placeholder="Например, BMW X5, 2015" autoComplete="off" />
        </div>

        <div className="grid gap-2">
          <label htmlFor={`${uid}-issue`} className="text-sm font-medium text-silver">
            Что происходит (коротко)
          </label>
          <textarea
            id={`${uid}-issue`}
            className="field min-h-28 resize-y"
            value={issue}
            onChange={(e) => setIssue(e.target.value)}
            rows={3}
          />
        </div>

        <div className="grid gap-2">
          <label htmlFor={`${uid}-phone`} className="text-sm font-medium text-silver">
            Телефон <span className="font-normal text-steel">(по желанию)</span>
          </label>
          <input id={`${uid}-phone`} className="field" type="tel" inputMode="tel" autoComplete="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>

        <p id={`${uid}-hint`} className="sr-only">
          Форма ничего не отправляет на сервер: текст передаётся в выбранный мессенджер.
        </p>

        <div className="grid gap-3 sm:grid-cols-2">
          {company.channels.whatsapp.enabled && (
            <a href={buildWhatsAppLink(message)} target="_blank" rel="noopener noreferrer" className="btn btn-primary sm:col-span-2">
              <MessageCircle size={20} aria-hidden />
              Написать в WhatsApp
            </a>
          )}
          {company.channels.telegram.enabled && (
            <button type="button" onClick={copyAndOpenTelegram} className="btn btn-outline whitespace-normal py-3 text-center">
              {copied ? <Check size={19} aria-hidden /> : <Copy size={19} aria-hidden />}
              {copied ? 'Скопировано, вставьте в чат' : 'Скопировать сообщение и открыть Telegram'}
            </button>
          )}
          <a href={PRIMARY_PHONE.href} className="btn btn-outline">
            <Phone size={19} aria-hidden />
            Позвонить
          </a>
        </div>
        <p className="sr-only" aria-live="polite">
          {copied ? 'Сообщение скопировано' : ''}
        </p>
      </form>
    </div>
  )
}
