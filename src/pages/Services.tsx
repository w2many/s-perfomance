import { CtaBand } from '../components/CtaBand'
import { WhatsAppButton } from '../components/ContactButtons'
import { PageHead } from '../components/PageHead'
import { Reveal } from '../components/Reveal'
import { ServiceList } from '../components/ServiceList'
import { company } from '../data/company'
import { getServiceGroups } from '../data/services'
import { useNav } from '../lib/nav'
import { plural, POSITIONS } from '../lib/plural'

const MESSAGE_PARTS = ['Марка, модель и год автомобиля', 'Что происходит', 'Нужна ли запись на удобный день']

export function Services() {
  const { params } = useNav()
  const groups = getServiceGroups()
  const preset = groups.findIndex((g) => g.id === params.service)
  const total = groups.reduce((n, g) => n + g.items.length, 0)

  return (
    <>
      <PageHead title="Услуги">
        <p>По данным Яндекс Карт: {total} {plural(total, POSITIONS)} в шести группах. Работаем с BMW, Mercedes-Benz и MINI.</p>
      </PageHead>

      <section className="bg-black pb-20 pt-10 lg:pb-32 lg:pt-16">
        <div className="wrap">
          <h2 className="sr-only">Каталог услуг</h2>
          <ServiceList withBooking initialOpen={preset >= 0 ? preset : 0} />
          <p className="mt-8 text-steel">{company.priceNote}.</p>
        </div>
      </section>

      <section className="bg-graphite py-20 lg:py-28">
        <div className="wrap grid gap-10 lg:grid-cols-[minmax(0,.9fr)_minmax(0,1.1fr)] lg:gap-20">
          <Reveal>
            <h2 className="font-head text-[clamp(30px,4.4vw,60px)] font-extrabold leading-[1.05] text-silver">Что написать в сообщении</h2>
            <WhatsAppButton className="mt-8 hidden lg:inline-flex" text="Здравствуйте! Автомобиль: …" />
          </Reveal>
          <div>
            <ol className="border-t border-line">
              {MESSAGE_PARTS.map((m, i) => (
                <Reveal as="li" key={m} index={i} className="flex items-baseline gap-5 border-b border-line py-5 lg:py-6">
                  <span aria-hidden className="w-10 shrink-0 font-display text-2xl font-extrabold text-red-ink lg:w-14 lg:text-3xl">
                    {i + 1}
                  </span>
                  <span className="text-[clamp(19px,1.8vw,24px)] text-silver">{m}</span>
                </Reveal>
              ))}
            </ol>
            <WhatsAppButton className="mt-8 w-full sm:w-auto lg:hidden" text="Здравствуйте! Автомобиль: …" />
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
