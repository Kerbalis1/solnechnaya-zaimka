# Публикация этого репозитория

Репозиторий: https://github.com/Kerbalis1/solnechnaya-zaimka

Сайт использует Next.js и экспортируется автоматически. Не выбирайте публикацию из корня ветки: там лежат исходники, а не готовый HTML.

## Первый запуск

1. Откройте https://github.com/Kerbalis1/solnechnaya-zaimka/settings/pages
2. В **Build and deployment → Source** выберите **GitHub Actions**.
3. Объедините pull request с веткой `main`.
4. В **Actions → Publish to GitHub Pages** дождитесь зелёных `build` и `deploy`.
5. После успешного запуска GitHub выдаст адрес сайта: https://kerbalis1.github.io/solnechnaya-zaimka/

Указанный адрес — ожидаемый адрес публикации. Работу конкретной публикации подтверждает успешный job `deploy`; до этого сайт может показывать прежнюю версию.

Повторные изменения в `main` публикуются автоматически. Ручной запуск: **Actions → Publish to GitHub Pages → Run workflow → main**. Перед запуском заполните список владельца и подключите доставку заявок, если она нужна.

## Проверка изменений

Workflow `Check website` запускается для pull request и веток разработки. Он выполняет чистую установку `npm ci`, проверку TypeScript, 7 тестов правил запроса и production-экспорт с путями GitHub Pages. Готовый результат сохраняется в артефакте `website-static-<commit>` на 7 дней. Этот workflow не публикует сайт и не требует настроенного Pages.

## Важные параметры

- `NEXT_PUBLIC_BASE_PATH` и `NEXT_PUBLIC_SITE_URL` для публикации автоматически получает официальный `configure-pages`. Для этого репозитория путь — `/solnechnaya-zaimka`.
- **Actions → Variables → SITE_INDEXABLE = true** включает индексацию после заполнения реальных данных. По умолчанию включён `noindex`; он не ограничивает доступ к публичному сайту.
- **Actions → Variables → BOOKING_ENDPOINT** подключает HTTPS-сервис отправки согласно `FORM-INTEGRATION.md`. Пока значение отсутствует, форма честно сообщает, что не отправляет данные.
- Для собственного домена сначала настройте его в Settings → Pages; workflow возьмёт актуальный базовый URL и префикс при следующей сборке.

Фото, тарифы и контакты изменяются в `src/data/site.ts`. Запуск для редактирования: `npm ci`, затем `npm run dev`.
