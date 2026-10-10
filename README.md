# Солнечная Заимка

Готовый адаптивный сайт на Next.js 16, React 19, TypeScript и Tailwind CSS 4. Статический экспорт: сервер приложения и база данных не требуются. Все тексты на русском; шрифты Cormorant Garamond и Manrope с кириллицей загружаются локально, без запросов к Google Fonts.

## Запуск

Node.js 22 или 24 и npm. В корне распакованного проекта:

```sh
npm ci
npm run dev
```

Откройте http://localhost:3000. Проверка и production-сборка:

```sh
npm run typecheck
npm test
npm run build
npm start
```

`npm run build` экспортирует сайт в `out/` и добавляет `.nojekyll`. `npm start` запускает локальную проверку **уже собранного** статического сайта на http://localhost:3000. Ctrl+C останавливает сервер. Для другого порта: `PORT=3001 npm start` (bash).

## Содержимое проекта

- `src/data/site.ts` — единый источник цен, описаний, фотографий, FAQ и подтверждённых контактов.
- `src/app/page.tsx` — все разделы сайта.
- `src/app/layout.tsx` — русский язык, локальные шрифты, SEO и Open Graph.
- `src/app/globals.css` — дизайн, Tailwind, адаптивность, фокус и reduced motion.
- `src/components/Header.tsx` — sticky-шапка и мобильное меню.
- `src/components/Media.tsx`, `Artwork.tsx` — фотографии и подписанные эскизы; fallback при ошибке загрузки.
- `src/components/Gallery.tsx` — модальная галерея: стрелки, Home/End, Escape, свайпы, возврат фокуса.
- `src/components/BookingForm.tsx`, `RequestButton.tsx` — форма и выбор объекта из карточки.
- `src/lib/booking.ts` — валидация и подготовка запроса, исключение неприменимых полей.
- `src/components/ArrowIcon.tsx` и `public/icon.svg` — независимые от шрифта иконки и favicon.
- `src/components/Reveal.tsx` — лёгкие появления. Без JavaScript весь контент виден.
- `public/images/` — оптимизированные WebP-фотографии из прежнего сайта; использование подтверждено пользователем.
- `tests/booking.test.ts` — проверки правил бронирования.
- `.github/workflows/deploy-pages.yml` — сборка и публикация GitHub Pages.
- `.github/workflows/ci.yml` — проверка типов, тесты и сборка веток и pull request.
- `scripts/serve.mjs`, `scripts/postbuild.mjs` — просмотр экспорта и `.nojekyll`.
- `next.config.ts`, `tsconfig.json`, `postcss.config.mjs`, `package.json`, `package-lock.json` — конфигурация и зафиксированные зависимости.
- `docs/` — инструкция для фотографий, список вопросов владельцу, подключение формы и отчёт проверок.

## Публикация на GitHub Pages

Для подключённого репозитория используйте [короткую пошаговую инструкцию](docs/GITHUB-PAGES.md). Изменения проверяет workflow `Check website`, публикацию из `main` выполняет `Publish to GitHub Pages`.

1. Создайте репозиторий и загрузите **исходники из этого архива**, включая скрытые `.github`, `.gitignore` и `.env.example`. Не загружайте `node_modules`, `.next` или локальные `.env`.
2. Основная ветка должна называться `main`. Для другой ветки измените `branches` в workflow.
3. В репозитории откройте **Settings → Pages → Build and deployment → Source → GitHub Actions**.
4. Сделайте push в `main` либо запустите **Actions → Publish to GitHub Pages → Run workflow**.
5. После успешной сборки ссылка появится в Settings → Pages и в job `deploy`.

Workflow получает `base_path` и `base_url` через официальный `configure-pages`. Поэтому пути к изображениям, JS, CSS и локальным шрифтам работают и в `/имя-репозитория/`, и в корне домена. Перед первым запуском заполните список владельца. Пока `SITE_INDEXABLE` не равен `true`, метаданные содержат `noindex, nofollow`. Это рекомендация поисковым роботам, **не защита доступа**. GitHub Pages обычно публичен.

Для включения индексации после заполнения данных задайте **Settings → Secrets and variables → Actions → Variables → SITE_INDEXABLE = true**. При ручной сборке для подпапки (bash):

```sh
NEXT_PUBLIC_BASE_PATH=/solnechnaya-zaimka \
NEXT_PUBLIC_SITE_URL=https://USERNAME.github.io/solnechnaya-zaimka \
npm run build
NEXT_PUBLIC_BASE_PATH=/solnechnaya-zaimka npm start
```

Откройте http://localhost:3000/solnechnaya-zaimka/. При публикации на собственном домене укажите пустой `NEXT_PUBLIC_BASE_PATH` и абсолютный `NEXT_PUBLIC_SITE_URL`. Любое изменение этих переменных требует новой сборки. `NEXT_PUBLIC_*` публичны — никогда не помещайте туда секреты.

## Фотографии, контакты и форма

См. [инструкцию фотографий](docs/PHOTOS.md), [список владельцу](docs/OWNER-CHECKLIST.md) и [подключение формы](docs/FORM-INTEGRATION.md).

Сейчас форма **не отправляет данные**. После валидации она создаёт текст запроса для копирования и сообщает, что он не отправлен. Данные не записываются в localStorage и не уходят в сеть. Для реальной отправки нужен внешней HTTPS-сервис: GitHub Pages не исполняет серверный код.

Контакты из прежнего сайта автоматически не переносились: актуальность не подтверждена. Карта, телефон и мессенджеры появятся после заполнения `site.ts`. Для недостающих снимков используются **подписанные графические места для замены**, а не вымышленные фотографии. Неподтверждённые правила не опубликованы.

## Проверки

См. [отчёт](docs/QA.md). Встроенные тесты покрывают даты, телефоны, гостей, длительность, обе категории проживания и отсутствие почасовой логики для чана. Все даты валидации используют часовой пояс Тулуна (UTC+8).

## Архив готовой сборки

`solnechnaya-zaimka-static.zip` содержит готовый экспорт для **корня домена**. Для GitHub Pages в подпапке используйте workflow из архива исходников: он пересоберёт сайт с правильным префиксом. Открывайте сайт через HTTP-сервер, а не двойным щелчком по `index.html`.

Полный перечень файлов: [docs/FILES.md](docs/FILES.md).
