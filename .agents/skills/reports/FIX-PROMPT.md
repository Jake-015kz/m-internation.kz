# Микро-промт для ИИ-кодера: Исправление SSR bailout

## Контекст
Вёрстка сайта m-internation.kz полностью ломается — стили Tailwind не применяются.
Репозиторий уже склонирован, зависимости установлены.

## Корневая причина
Tailwind v4 работает корректно, НО `dynamic()` с `ssr: false` в layout.tsx вызывает
`BAILOUT_TO_CLIENT_SIDE_RENDERING` — весь HTML рендерится только на клиенте.
SSR HTML пустой (0 div, 0 section). Без JS = пустая страница.

## Задача — 3 файла, 5 минут

### 1. `src/components/shared/LenisProvider/index.ts`
Заменить всё содержимое на:
```ts
export { LenisProviderClient as LenisProvider } from "./LenisProviderClient";
```

### 2. Удалить файл `src/components/shared/LenisProvider/LenisDynamic.tsx`

### 3. `src/app/layout.tsx`
Заменить:
```ts
// СТАРЫЕ ИМПОРТЫ (убрать):
import { NoiseOverlay } from "@shared/NoiseOverlay";
import { ClickSpark } from "@shared/ClickSpark";
import { LenisProvider } from "@shared/LenisProvider/LenisDynamic";

// НОВЫЕ ИМПОРТЫ (добавить):
import dynamic from "next/dynamic";
import { LenisProvider } from "@shared/LenisProvider";

const NoiseOverlay = dynamic(
  () => import("@shared/NoiseOverlay").then((m) => m.NoiseOverlay),
  { ssr: false }
);
const ClickSpark = dynamic(
  () => import("@shared/ClickSpark").then((m) => m.ClickSpark),
  { ssr: false }
);
```

### 4. Переименовать `src/middleware.ts` → `src/proxy.ts`

## Верификация
```bash
cd <project-root>
npx next build 2>&1 | tail -5
npx next start -p 3000 &
sleep 5
curl -s http://localhost:3000/ru | grep -c 'BAILOUT'
# Должно вернуть: 0
curl -s http://localhost:3000/ru | grep -oP 'class="[^"]*"' | wc -l
# Должно вернуть: число > 50 (было 2)
```

## Чего НЕ трогать
- `tailwind.css` — конфигурация правильная
- `postcss.config.mjs` — правильный
- `package.json` — зависимости правильные
- Компоненты в `src/components/` — Tailwind классы в них корректные
