# Cloudflare Worker для ROSSKO API

## Установка и деплой

### 1. Установите Wrangler CLI (если еще не установлен)

```bash
npm install -g wrangler
```

### 2. Авторизуйтесь в Cloudflare

```bash
wrangler login
```

Откроется браузер для авторизации.

### 3. Деплой Worker

```bash
cd cloudflare-worker
wrangler deploy
```

### 4. Получите URL

После деплоя вы увидите URL вида:

```
https://rossko-proxy.YOUR-SUBDOMAIN.workers.dev
```

### 5. Обновите код PWA

Скопируйте полученный URL и вставьте в файл `src/api.js`:

```javascript
const PROXY_URL = "https://rossko-proxy.YOUR-SUBDOMAIN.workers.dev";
```

## Что делает Worker?

- Принимает POST запросы с KEY1 и KEY2
- Формирует SOAP запрос к api.rossko.ru
- Парсит XML ответ
- Возвращает JSON с балансом и контрагентами
- Добавляет CORS headers для работы из браузера

## Бесплатный лимит Cloudflare Workers

- 100,000 запросов в день
- Более чем достаточно для личного использования
