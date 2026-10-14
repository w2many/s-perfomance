# S-Performance — сайт автосервиса

Севастополь, Фиолентовское шоссе, 7. React 19 + Vite + TypeScript + Tailwind CSS 4, motion, lenis, lucide-react.

```bash
npm install
npm run dev      # разработка
npm run lint     # oxlint + проверка типов
npm run build    # сборка в dist/
```

## Где что лежит

- `src/data/company.ts` — единственный источник фактов (`{ value, source, status }`), телефон `PRIMARY_PHONE`, `buildWhatsAppLink`, флаги `rating.enabled`, `award.enabled`, `LOGO_RIGHTS_CONFIRMED`, `SITE_URL`.
- `src/data/services.ts` — группы услуг из карточки Яндекс Карт, `extraServices` (выездная диагностика, `show: false`).
- `src/data/reviews.ts` — дословные отзывы (пусто).
- `src/data/photos.ts` — фото для галереи (пусто; галерея появится при трёх фото и больше).
- `src/lib/nav.ts` — адреса страниц (`/?page=...`). Для боевого запуска поменяйте `buildHref` и `readLocation` на реальные пути (`/services/`) и отдавайте `index.html` на каждый путь; остальной код менять не нужно.
- `src/lib/seo.ts` — title, description и JSON-LD для каждой страницы.

## Что нужно от владельца (TODO(owner))

- Права на логотип: `LOGO_RIGHTS_CONFIRMED` (если `false`, везде текстовый знак).
- Рейтинг 5.0 / 29 оценок / 28 отзывов сверить с живой карточкой; награда «Хорошее место 2026» (`award.enabled`).
- График работы по дням, координаты точки (карта и `geo` выключены), выездная диагностика.
- Цены (если готовы показывать), фото работ в `public/photos/`, дословные отзывы с разрешения авторов.
- Реквизиты (`legal`), история и люди (`story`), FAQ (`faq`).
- Домен: `SITE_URL`, `index.html`, `public/robots.txt`, `public/sitemap.xml`.

## Фото

JPG/WebP, длинная сторона до 1600 px, качество ~78. Перед сборкой проверьте дубли: `md5sum public/photos/* | sort | uniq -w32 -d`.
