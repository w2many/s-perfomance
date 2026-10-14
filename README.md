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
- `src/data/reviews.ts` — дословные отзывы с 2ГИС.
- `src/data/photos.ts` — фото для галереи (`home: true` — три фото на главной, на «О компании» все пять).
- `src/lib/nav.ts` — адреса страниц (`/?page=...`). Для боевого запуска поменяйте `buildHref` и `readLocation` на реальные пути (`/services/`) и отдавайте `index.html` на каждый путь; остальной код менять не нужно.
- `src/lib/seo.ts` — title, description и JSON-LD для каждой страницы.

## Что нужно от владельца (TODO(owner))

- Права на логотип: `LOGO_RIGHTS_CONFIRMED` (если `false`, везде текстовый знак).
- Рейтинг 5.0 / 29 оценок / 28 отзывов сверить с живой карточкой; награда «Хорошее место 2026» (`award.enabled`).
- Координаты точки (для `geo` в JSON-LD), выездная диагностика, ссылка на карточку 2ГИС.
- Год у отзыва «15 июня» (принят 2026), формулировки FAQ.
- Цены (если готовы показывать), реквизиты (`legal`), история и люди (`story`).
- Домен: `SITE_URL`, `index.html`, `public/robots.txt`, `public/sitemap.xml`.

## Фото

JPG/WebP, длинная сторона до 1600 px, качество ~78. Перед сборкой проверьте дубли: `md5sum public/photos/* | sort | uniq -w32 -d`.
