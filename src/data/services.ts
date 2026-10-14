import type { FactStatus } from './company'

export type FormTopic = 'diagnostics' | 'engine' | 'transmission' | 'electrics' | 'chip' | 'maintenance' | 'other'

export interface ServiceItem {
  title: string
  status: FactStatus
}

export interface ServiceGroup {
  id: string
  title: string
  /** Тема для формы «Расскажите, что нужно». */
  topic: FormTopic
  items: ServiceItem[]
}

const c = (title: string): ServiceItem => ({ title, status: 'confirmed' })

/** Позиции из карточки Яндекс Карт, сгруппированные для сайта. */
export const serviceGroups: ServiceGroup[] = [
  {
    id: 'diagnostics',
    title: 'Диагностика и электрика',
    topic: 'diagnostics',
    items: [c('Компьютерная диагностика'), c('Эндоскопия двигателя'), c('Ремонт электрооборудования'), c('Ремонт генератора')],
  },
  {
    id: 'engine',
    title: 'Двигатель',
    topic: 'engine',
    items: [c('Раскоксовка'), c('Ремонт ГБЦ'), c('Замена ремня ГРМ'), c('Замена масла в легковом автомобиле')],
  },
  {
    id: 'transmission',
    title: 'Трансмиссия и ходовая',
    topic: 'transmission',
    items: [c('Ремонт деталей АКПП'), c('Ремонт рулевой рейки'), c('Ремонт ГУР'), c('Ремонт тормозной системы')],
  },
  {
    id: 'systems',
    title: 'Системы автомобиля',
    topic: 'other',
    items: [c('Ремонт системы охлаждения'), c('Ремонт топливной системы'), c('Заправка кондиционера')],
  },
  {
    id: 'chip',
    title: 'Чип-тюнинг',
    topic: 'chip',
    items: [c('Чип-тюнинг')],
  },
  {
    id: 'maintenance',
    title: 'Техобслуживание и запчасти',
    topic: 'maintenance',
    items: [c('Базовое техническое обслуживание'), c('Мочевина'), c('Заказ запчастей')],
  },
]

/**
 * Позиции, которые требуют подтверждения владельцем.
 * TODO(owner): «Выездная диагностика автомобиля» указана в карточке как «On-site diagnostics»,
 * условия и районы выезда неизвестны. После подтверждения выставить show: true.
 */
export const extraServices: (ServiceItem & { groupId: string; show: boolean })[] = [
  { title: 'Выездная диагностика автомобиля', groupId: 'diagnostics', status: 'verify', show: false },
]

/** Группы с подтверждёнными позициями и включёнными дополнительными. */
export function getServiceGroups(): ServiceGroup[] {
  return serviceGroups.map((g) => ({
    ...g,
    items: [
      ...g.items.filter((i) => i.status === 'confirmed'),
      ...extraServices.filter((e) => e.show && e.groupId === g.id).map(({ title }) => ({ title, status: 'confirmed' as const })),
    ],
  }))
}

export const formTopics: { id: FormTopic; label: string }[] = [
  { id: 'diagnostics', label: 'Диагностика' },
  { id: 'engine', label: 'Двигатель' },
  { id: 'transmission', label: 'Трансмиссия' },
  { id: 'electrics', label: 'Электрика' },
  { id: 'chip', label: 'Чип-тюнинг' },
  { id: 'maintenance', label: 'ТО' },
  { id: 'other', label: 'Другое' },
]
