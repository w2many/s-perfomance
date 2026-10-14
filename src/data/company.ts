/**
 * Единственный источник фактов о компании.
 * В интерфейсе показываются только факты со status: 'confirmed'.
 * Всё, что помечено 'verify', живёт только в коде и ждёт подтверждения владельцем.
 */

export type FactStatus = 'confirmed' | 'verify'

export interface Fact<T> {
  value: T
  source: string
  status: FactStatus
}

const YANDEX = 'Яндекс Карты'
export const YANDEX_MAPS_URL = 'https://yandex.ru/maps/org/s_performance/40920141656/'

// TODO(owner): подставить боевой домен сайта (нужен для og:image, canonical, sitemap.xml и robots.txt).
export const SITE_URL = 'https://s-performance.example'

/** Единственный источник номера телефона во всём коде. */
export const PRIMARY_PHONE = {
  href: 'tel:+79785318698',
  display: '+7 (978) 531-86-98',
  digits: '79785318698',
} as const

/**
 * Логотип владельца (готовый растровый файл, не перерисовывается).
 * TODO(owner): подтвердить права на использование логотипа. Если права не подтверждены,
 * выставить false: во всех местах вместо файла появится текстовый знак S-PERFORMANCE.
 */
export const LOGO_RIGHTS_CONFIRMED = true

export const logo = {
  src: '/brand/logo.png',
  width: 582,
  height: 186,
  alt: 'S-Performance',
}

export function buildWhatsAppLink(text?: string): string {
  const base = `https://wa.me/${PRIMARY_PHONE.digits}`
  return text ? `${base}?text=${encodeURIComponent(text)}` : base
}

export const company = {
  name: { value: 'S-Performance', source: YANDEX, status: 'confirmed' } as Fact<string>,
  categories: {
    value: ['Автосервис', 'Ремонт автомобилей', 'Автодиагностика', 'Ремонт электрооборудования'],
    source: `${YANDEX}, рубрики карточки`,
    status: 'confirmed',
  } as Fact<string[]>,
  city: { value: 'Севастополь', source: YANDEX, status: 'confirmed' } as Fact<string>,
  ownerVerified: { value: true, source: `${YANDEX}, отметка «Информация подтверждена владельцем»`, status: 'confirmed' } as Fact<boolean>,

  address: {
    value: { street: 'Фиолентовское шоссе, 7', city: 'Севастополь', country: 'RU' },
    source: YANDEX,
    status: 'confirmed',
  } as Fact<{ street: string; city: string; country: string }>,

  // TODO(owner): проверить точку на карте. Пока статус verify, geo в JSON-LD не выводится.
  // Карта на «Контактах» показывает организацию по yandexOrgId, точка из координат там только центр карты.
  coordinates: {
    value: { lat: 44.57749, lon: 33.474425 },
    source: `${YANDEX}, параметр ссылки карточки`,
    status: 'verify',
  } as Fact<{ lat: number; lon: number }>,

  yandexOrgId: '40920141656',

  phone: { value: PRIMARY_PHONE.display, source: YANDEX, status: 'confirmed' } as Fact<string>,

  channels: {
    whatsapp: { enabled: true, url: buildWhatsAppLink(), source: YANDEX, status: 'confirmed' as FactStatus },
    telegram: { enabled: true, url: 'https://t.me/sPerformance', source: YANDEX, status: 'confirmed' as FactStatus },
    // У компании нет страниц ВКонтакте и Instagram. Ссылки карточки на vk.com/yandex.maps и t.me/mapsyandex принадлежат Яндексу.
    // Карточка 2ГИС есть (отзывы переданы владельцем). TODO(owner): прислать ссылку на карточку, чтобы добавить кнопку.
    twoGis: { enabled: false, url: null as string | null, source: 'Владелец', status: 'verify' as FactStatus },
    vk: { enabled: false, url: null, source: '', status: 'verify' as FactStatus },
    instagram: { enabled: false, url: null, source: '', status: 'verify' as FactStatus },
  },

  // График передан владельцем, совпадает с карточкой Яндекса («открыто до 18:00»).
  schedule: {
    value: [
      { days: 'Пн — сб', schemaDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], hours: '9:00–18:00', opens: '09:00', closes: '18:00' },
      { days: 'Вс', schemaDays: ['Sunday'], hours: 'Выходной', opens: null, closes: null },
    ],
    label: 'Пн — сб 9:00–18:00, вс выходной',
    source: 'Владелец',
    status: 'confirmed',
  },

  // TODO(owner/заказчик): сверить цифры с живой карточкой перед запуском.
  // Если на карточке нет отзывов, выставить enabled: false: рейтинг исчезнет из hero, блока цифр, страницы «О компании» и JSON-LD.
  rating: {
    enabled: true,
    value: { score: '5.0', ratingCount: 29, reviewCount: 28 },
    source: YANDEX,
    sourceUrl: YANDEX_MAPS_URL,
    status: 'verify' as FactStatus,
  },

  // TODO(owner): подтвердить награду «Хорошее место 2026», затем включить.
  award: { enabled: false, value: 'Хорошее место 2026', source: YANDEX, status: 'verify' as FactStatus },

  brands: { value: ['BMW', 'Mercedes-Benz', 'MINI'], source: `${YANDEX}, карточка`, status: 'confirmed' } as Fact<string[]>,

  payment: {
    value: ['карта', 'СБП', 'перевод', 'наличные'],
    label: 'Оплата: карта, СБП, перевод или наличные',
    source: YANDEX,
    status: 'confirmed',
  },

  amenities: {
    value: ['Запись заранее', 'Парковка', 'Wi-Fi'],
    source: YANDEX,
    status: 'confirmed',
  } as Fact<string[]>,

  // Цен в карточке нет. Не выводить цифры и формулировки про стоимость.
  // TODO(owner): если владелец готов показывать цены, добавить сюда.
  prices: [] as { title: string; value: string }[],
  priceNote: 'Стоимость уточняйте по телефону или в WhatsApp',

  // TODO(owner): история, люди, год основания, опыт, оборудование. Пока null, блок не рендерится.
  story: { value: null, source: '', status: 'verify' } as Fact<string | null>,

  // Ответы собраны из подтверждённых фактов выше. TODO(owner): проверить формулировки.
  faq: [
    {
      q: 'С какими автомобилями вы работаете?',
      a: 'BMW, Mercedes-Benz и MINI: эти марки указаны в карточке сервиса на Яндекс Картах. Если у вас другая марка, уточните по телефону или в WhatsApp.',
    },
    {
      q: 'Нужно ли записываться заранее?',
      a: 'Да, работаем по записи. Напишите в WhatsApp или Telegram либо позвоните, чтобы выбрать удобный день.',
    },
    {
      q: 'Сколько стоит ремонт или диагностика?',
      a: 'Стоимость уточняйте по телефону или в WhatsApp. Чтобы разговор был предметным, сразу укажите марку, модель и год автомобиля и опишите, что происходит.',
    },
    {
      q: 'Какой у вас график?',
      a: 'С понедельника по субботу с 9:00 до 18:00. Воскресенье выходной.',
    },
    {
      q: 'Как можно оплатить?',
      a: 'Картой, через СБП, переводом или наличными.',
    },
    {
      q: 'Где вы находитесь и есть ли парковка?',
      a: 'Севастополь, Фиолентовское шоссе, 7. Парковка есть. Маршрут удобно построить в Яндекс Картах, ссылка на странице «Контакты».',
    },
    {
      q: 'Можно ли заказать запчасти через вас?',
      a: 'Да, заказ запчастей есть в списке услуг. Напишите марку, модель и год автомобиля, а лучше сразу VIN-номер, и какие детали нужны.',
    },
    {
      q: 'Вы делаете чип-тюнинг?',
      a: 'Да, чип-тюнинг есть в списке услуг. Что можно сделать на вашем автомобиле, уточняйте по телефону или в WhatsApp.',
    },
  ] as { q: string; a: string }[],

  // TODO(owner): ФИО/наименование, ИНН, ОГРН. В подвал не выводятся, пока не подтверждены.
  legal: { value: null, source: '', status: 'verify' } as Fact<string | null>,

  website: { value: null, source: YANDEX, status: 'confirmed' } as Fact<string | null>,
}

export const isConfirmed = <T,>(f: Fact<T>) => f.status === 'confirmed'

export const ADDRESS_LINE = `${company.address.value.city}, ${company.address.value.street}`
export const TELEGRAM_URL = company.channels.telegram.url
