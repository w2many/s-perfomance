import { company, PRIMARY_PHONE } from '../data/company'
import { CallButton, TelegramButton, WhatsAppButton } from './ContactButtons'
import { MaskText } from './MaskText'

/** Финальная полоса с кнопками связи. На внутренних страницах это единственная красная секция. */
export function CtaBand({ title = 'Напишите — запишем на визит', tone = 'red' }: { title?: string; tone?: 'red' | 'dark' }) {
  const red = tone === 'red'
  return (
    <section className={red ? 'bg-red text-white' : 'bg-black'}>
      <div className="wrap py-20 lg:py-28">
        <MaskText text={title} className={`font-head text-[clamp(30px,5.4vw,76px)] font-extrabold uppercase leading-[1.02] ${red ? 'text-white' : 'text-silver'}`} />
        <a
          href={PRIMARY_PHONE.href}
          className={`mt-8 block w-fit whitespace-nowrap font-head text-[clamp(34px,7.4vw,112px)] font-extrabold leading-none tabular-nums ${red ? 'text-white' : 'text-silver hover:text-white'}`}
        >
          {PRIMARY_PHONE.display}
        </a>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <WhatsAppButton tone={red ? 'red' : 'dark'} />
          {company.channels.telegram.enabled && <TelegramButton tone={red ? 'red' : 'dark'} />}
          <CallButton tone={red ? 'red' : 'dark'} />
        </div>
      </div>
    </section>
  )
}
