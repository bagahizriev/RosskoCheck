# 💰 ROSSKO Balance PWA

Progressive Web App для отображения баланса на платформе ROSSKO.

## 🚀 Быстрый старт

### 1. Установка зависимостей

```bash
npm install
```

### 2. Настройка Cloudflare Worker

#### Шаг 1: Создайте аккаунт на Cloudflare

1. Перейдите на https://dash.cloudflare.com/sign-up
2. Зарегистрируйтесь (бесплатно)

#### Шаг 2: Установите Wrangler CLI

```bash
npm install -g wrangler
```

#### Шаг 3: Авторизуйтесь в Cloudflare

```bash
wrangler login
```

#### Шаг 4: Деплой Worker

```bash
cd cloudflare-worker
wrangler deploy
```

После деплоя вы получите URL вида:
`https://rossko-proxy.YOUR-SUBDOMAIN.workers.dev`

#### Шаг 5: Обновите URL в коде

Откройте файл `src/api.js` и замените:

```javascript
const PROXY_URL = "https://YOUR-WORKER.YOUR-SUBDOMAIN.workers.dev";
```

на ваш реальный URL Worker.

### 3. Деплой на GitHub Pages

#### Шаг 1: Создайте репозиторий на GitHub

#### Шаг 2: Включите GitHub Pages

1. Перейдите в Settings → Pages
2. Source: выберите "GitHub Actions"

#### Шаг 3: Запушьте код

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
git push -u origin main
```

Workflow автоматически соберет и задеплоит приложение.
Ваше приложение будет доступно по адресу:
`https://YOUR-USERNAME.github.io/YOUR-REPO/`

## 📱 Использование

1. Откройте приложение в браузере
2. При первом запуске введите ваши KEY1 и KEY2 от ROSSKO API
3. Ключи сохранятся локально в IndexedDB вашего браузера
4. Приложение отобразит ваш баланс
5. Нажмите "Обновить" для получения актуальных данных

## 🔒 Безопасность

- Ключи API хранятся только локально на вашем устройстве
- Данные не передаются третьим лицам
- Cloudflare Worker используется только как CORS прокси
- Worker не логирует и не сохраняет ваши ключи

## 🛠 Разработка

```bash
npm run dev
```

Приложение откроется на http://localhost:5173

## 📦 Сборка

```bash
npm run build
```

Собранные файлы будут в папке `dist/`

## 🎨 Иконки

Замените placeholder файлы на реальные иконки:

- `public/icon-192.png` (192x192)
- `public/icon-512.png` (512x512)
- `public/favicon.ico`

## 📝 Лицензия

MIT
