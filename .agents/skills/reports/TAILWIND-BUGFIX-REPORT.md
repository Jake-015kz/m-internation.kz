# 🔴 Отчёт о диагностике: Стили Tailwind не применяются

**Дата:** 2026-06-06
**Репозиторий:** https://github.com/Jake-015kz/m-internation.kz
**Коммит:** `60d5b97` (HEAD)

---

## Краткий диагноз

**Tailwind CSS v4 работает КОРРЕКТНО.** Стили генерируются, CSS файл (109KB) содержит все utility-类сы. PostCSS конфигурация правильная. `@source` директив сканирует правильные пути.

**Реальная причина «пустой страницы»** — `BAILOUT_TO_CLIENT_SIDE_RENDERING: next/dynamic`. Всё дерево layout рендерится только на клиенте, SSR HTML пустой.

---

## Что проверено ✅

| Проверка | Результат |
|---|---|
| `postcss.config.mjs` — `@tailwindcss/postcss` plugin | ✅ Правильно |
| `tailwind.config.ts` — отсутствует (v4 не требует) | ✅ Правильно |
| `@import "tailwindcss"` в `src/styles/tailwind.css` | ✅ Есть |
| `@source "../**/*.{ts,tsx,js,jsx}"` путь | ✅ Сканирует `/src/**/*.{ts,tsx,js,jsx}` |
| `@theme { ... }` с кастомными токенами | ✅ Все токены объявлены |
| `@import "@/styles/tailwind.css"` в `src/app/layout.tsx` | ✅ Есть (строка 1) |
| CSS генерируется (production билд) | ✅ 109KB, все utility-классы на месте |
| CSS отдаётся браузеру (HTTP 200) | ✅ `/_next/static/chunks/*.css` |
| TypeScript path aliases (`@/*`, `@shared/*`, `@ui/*`) | ✅ Совпадают с реальной структурой |
| `package.json` — `tailwindcss: ^4.3.0`, `@tailwindcss/postcss: ^4.3.0` | ✅ Версии совпадают |

---

## 🔴 Найденные проблемы (3 штуки)

### 1. КРИТИЧНО: `dynamic()` с `ssr: false` ломает SSR всего layout

**Файл:** `src/components/shared/LenisProvider/LenisDynamic.tsx`

```tsx
// ⛔ ПРОБЛЕМА: Next.js 16 при dynamic()+ssr:false внутри layout.tsx 
// вынуждает BailoutToCSR для ВСЕГО children
const LenisProvider = dynamic(
  () => import("./LenisProviderClient").then((mod) => mod.LenisProviderClient),
  { ssr: false }  // ← это убивает SSR
);
```

**В `layout.tsx`:**
```tsx
// LenisProvider оборачивает ВСЁ — Header, main, Footer
<LenisProvider>  ← dynamic здесь = bailout всего дерева
  <NoiseOverlay />
  <ClickSpark />
  <div className="relative z-10 flex min-h-screen flex-col">
    <Header />
    <main style={{ flex: "1 1 auto" }}>{children}</main>
    <Footer />
  </div>
</LenisProvider>
```

**Симптом в HTML:**
```html
<div hidden=""><!--$--><!--/$--></div>
<!--$!--><template data-dgst="BAILOUT_TO_CLIENT_SIDE_RENDERING" ...>
```

**Результат:** SSR HTML содержит 0 контентных элементов. Без JS = пустая страница. SEO = 0.

### 2. СРЕДНЕ: `ClickSpark` вызывает тот же bailout на production

**Файл:** `src/components/shared/ClickSpark/ClickSpark.tsx`

Содержит `useEffect` + `useRef` + canvas — работает только на клиенте, но НЕ обёрнут в `dynamic()`. На production это вызовет ошибку гидрации или тихо сломает SSR.

### 3. МЕЛКО: middleware deprecation warning

```
⚠ The "middleware" file convention is deprecated. Please use "proxy" instead.
```
Файл `src/middleware.ts` нужно переименовать в `src/proxy.ts` и обновить экспорт.

---

## Исправления

### Исправление 1: LenisProvider — убрать dynamic, сделать клиентским напрямую

**Файл:** `src/components/shared/LenisProvider/LenisDynamic.tsx`

Заменить содержимое на:

```tsx
"use client";

export { LenisProviderClient as LenisProvider } from "./LenisProviderClient";
```

Или ещё лучше — импортировать напрямую:

**Файл:** `src/components/shared/LenisProvider/index.ts`

```tsx
// Раньше:
// export { LenisProviderClient } from "./LenisProviderClient";
// export { LenisProvider } from "./LenisDynamic";

// Теперь — напрямую, без dynamic():
export { LenisProviderClient as LenisProvider } from "./LenisProviderClient";
```

**Файл:** `src/app/layout.tsx` — обновить импорт:

```tsx
// Было:
import { LenisProvider } from "@shared/LenisProvider/LenisDynamic";

// Стало:
import { LenisProvider } from "@shared/LenisProvider/LenisProviderClient";
```

А ЛУЧШЕ ВСЕГО — обновить `index.ts` и импортировать оттуда:

```tsx
// Оставляем как есть (после фикса index.ts):
import { LenisProvider } from "@shared/LenisProvider";
```

И удалить файл `LenisDynamic.tsx` совсем.

### Исправление 2: ClickSpark — обернуть в dynamic или добавить проверку

**Вариант A (рекомендуется):** В `layout.tsx` обернуть в dynamic:

```tsx
// src/app/layout.tsx
import dynamic from "next/dynamic";

// NoiseOverlay и ClickSpark — чисто клиентские эффекты, без SSR
const NoiseOverlay = dynamic(
  () => import("@shared/NoiseOverlay").then(m => m.NoiseOverlay),
  { ssr: false }
);
const ClickSpark = dynamic(
  () => import("@shared/ClickSpark").then(m => m.ClickSpark),
  { ssr: false }
);
```

**Вариант B:** Сделать `ClickSpark` безопасным для SSR:

```tsx
// В ClickSpark.tsx добавить в начало компонента:
if (typeof window === "undefined") return null;
```

### Исправление 3: middleware → proxy (Next.js 16)

```bash
mv src/middleware.ts src/proxy.ts
```

В `src/proxy.ts` заменить `export const config` на:
```ts
export const config = {
  matcher: ["/", "/(ru|en|kk)/:path*"],
};
```
(Экспорт тот же, просто файл переименован.)

---

## One-shot промт для ИИ-кодера

```
КРИТИЧЕСКИЙ БАГ: SSR не работает из-за dynamic() с ssr:false в layout.tsx.
Страница рендерится только на клиенте, без JS = пустая.

ШАГ 1: Удалить src/components/shared/LenisProvider/LenisDynamic.tsx

ШАГ 2: Заменить содержимое src/components/shared/LenisProvider/index.ts на:
export { LenisProviderClient as LenisProvider } from "./LenisProviderClient";

ШАГ 3: В src/app/layout.tsx заменить импорт:
Было: import { LenisProvider } from "@shared/LenisProvider/LenisDynamic";
Стало: import { LenisProvider } from "@shared/LenisProvider";

ШАГ 4: В src/app/layout.tsx обернуть NoiseOverlay и ClickSpark в dynamic():
Добавить в начало файла (после остальных imports):
const NoiseOverlay = dynamic(() => import("@shared/NoiseOverlay").then(m => m.NoiseOverlay), { ssr: false });
const ClickSpark = dynamic(() => import("@shared/ClickSpark").then(m => m.ClickSpark), { ssr: false });
Убрать старые статические импорты NoiseOverlay и ClickSpark.

ШАГ 5: Переименовать src/middleware.ts → src/proxy.ts

ШАГ 6: Запустить npx next build и убедиться что BAILOUT_TO_CLIENT_SIDE_RENDERING больше не появляется в HTML.
```

---

## Верификация после исправления

```bash
# 1. Билд
npx next build

# 2. Запуск production
npx next start -p 3000

# 3. Проверка — в HTML НЕ должно быть BAILOUT
curl -s http://localhost:3000/ru | grep -c 'BAILOUT'
# Ожидаемый результат: 0

# 4. Проверка — в HTML должны быть классы компонентов
curl -s http://localhost:3000/ru | grep -oP 'class="[^"]*"' | wc -l
# Ожидаемый результат: > 50 (было 2)

# 5. Проверка — CSS отдаётся
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/_next/static/chunks/*.css
# Ожидаемый результат: 200
```

---

## Итог

Tailwind CSS конфигурация **не требует изменений** — всё настроено правильно.
Проблема в архитектуре SSR: `dynamic()` с `ssr: false` в layout-компоненте
вызывает bailout всего дерева рендеринга. Исправление — убрать `dynamic()`
для LenisProvider (использовать прямой импорт) и обернуть чисто клиентские
эффекты (NoiseOverlay, ClickSpark) в `dynamic()` отдельно.
