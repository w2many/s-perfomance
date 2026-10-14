export interface Photo {
  src: string
  width: number
  height: number
  alt: string
  caption: string
  /** Показывать в галерее на главной (там три фото). */
  home?: boolean
}

// Фото владельца. Пережаты в WebP (качество 78, длинная сторона до 1600 px), дубли проверены md5sum.
// Номер на bmw-f30-rear-bay размыт. TODO(owner): если номер нужно показать, заменить файл исходником.
export const photos: Photo[] = [
  {
    src: '/photos/bmw-f30-rear-bay.webp',
    width: 960,
    height: 1280,
    alt: 'Белый BMW 3 серии в боксе между стойками подъёмника',
    caption: 'Бокс S-Performance',
    home: true,
  },
  {
    src: '/photos/bmw-m5-engine.webp',
    width: 1024,
    height: 1024,
    alt: 'Чёрный BMW M5 с открытым капотом в боксе',
    caption: 'Под капотом',
    home: true,
  },
  {
    src: '/photos/bmw-g20-front-bay.webp',
    width: 720,
    height: 1280,
    alt: 'Белый BMW 3 серии в боксе под шестигранными светильниками',
    caption: 'В боксе',
    home: true,
  },
  {
    src: '/photos/bmw-g30-engine-bay.webp',
    width: 1168,
    height: 1280,
    alt: 'Белый BMW 5 серии с открытым капотом на подъёмнике',
    caption: 'Под капотом',
  },
  {
    src: '/photos/bmw-f30-workshop.webp',
    width: 720,
    height: 1280,
    alt: 'Белый BMW 328i в боксе, за ним второй автомобиль у подъёмника',
    caption: 'В боксе',
  },
]

export const GALLERY_MIN = 3
