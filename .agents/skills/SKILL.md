---
name: scss-to-tailwind-migration
description: "Пошаговое руководство по безопасной миграции с SCSS/Sass на Tailwind CSS (v3 и v4) без потери логики стилей, разметки и адаптивности. Включает маппинг SCSS→Tailwind, работу с динамическими классами в React/Next.js, чек-лист верификации."
category: software-development
tags:
  - tailwind-css
  - scss
  - sass
  - migration
  - refactoring
  - css
  - frontend
  - react
  - nextjs
  - audit
  - m-internation-kz
---

# Руководство по миграции с SCSS/Sass на Tailwind CSS

> **Цель:** Безопасно перенести веб-приложение с SCSS/Sass на Tailwind CSS (v3 или v4), сохраняя визуальную идентичность, логику стилей, разметку и адаптивность.
>
> **Актуально для:** Tailwind CSS v3.x и v4.x (последняя — v4.3+)

---

## 📋 Оглавление

1. [Подготовка и аудит](#1-подготовка-и-аудит)
2. [Выбор версии: Tailwind v3 vs v4](#2-выбор-версии-tailwind-v3-vs-v4)
3. [Стратегия безопасного рефакторинга](#3-стратегия-безопасного-рефакторинга)
4. [Маппинг SCSS-конструкций на Tailwind](#4-маппинг-scss-конструкций-на-tailwind)
5. [Конфигурация: tailwind.config.js (v3) и @theme (v4)](#5-конфигурация)
6. [Работа с динамическими классами: clsx, tailwind-merge, cva](#6-работа-с-динамическими-классами)
7. [Пошаговый план миграции](#7-пошаговый-план-миграции)
8. [Автоматизация миграции](#8-автоматизация-миграции)
9. [Чек-лист проверки после миграции](#9-чек-лист-проверки-после-миграции)
10. [Типичные проблемы и решения](#10-типичные-проблемы-и-решения)

---

## 1. Подготовка и аудит

### 1.1 Инвентаризация текущего кодбейза

```bash
# Найти все SCSS/SASS файлы
find . -name "*.scss" -o -name "*.sass" | head -50

# Подсчитать строк CSS-кода
find . -name "*.scss" -exec wc -l {} + | tail -1

# Найти все уникальные классы в SCSS
grep -rho '\.[a-zA-Z][a-zA-Z0-9_-]*' --include="*.scss" | sort -u > scss-classes.txt

# Найти все миксины
grep -rn "@mixin\|@include" --include="*.scss" > mixins-inventory.txt

# Найти все SCSS-переменные
grep -rn "\$[a-zA-Z_][a-zA-Z0-9_-]*:" --include="*.scss" > variables-inventory.txt

# Найти вложенные селекторы (глубже 2 уровней — подозрительно)
grep -rn "^\s*&" --include="*.scss" > nesting-inventory.txt

# Найти использование CSS-переменных в SCSS
grep -rn "var(--" --include="*.scss" > css-vars-in-scss.txt

# Найти все !important (потенциальные конфликты)
grep -rn "!important" --include="*.scss" > importants.txt

# Посчитать количество файлов по типу
echo "SCSS files: $(find . -name '*.scss' | wc -l), SASS files: $(find . -name '*.sass' | wc -l), CSS files: $(find . -name '*.css' | wc -l)"
```

### 1.2 Создание визуального реестра компонентов

**До** начала миграции создайте каталог всех UI-компонентов:

```bash
# Вариант A: Storybook (рекомендуется для крупных проектов)
npx storybook@latest init

# Вариант B: Chromatic для visual regression chromatic.com

# Вариант C: Playwright скриншоты всех страниц
npm install -D @playwright/test
npx playwright install
```

```ts
// playwright.config.ts — скриншоты ДО миграции
import { defineConfig } from '@playwright/test';

export default defineConfig({
  snapshotDir: './snapshots/before-migration',
  use: { viewport: { width: 1280, height: 720 } },
  projects: [
    { name: 'mobile', use: { viewport: { width: 375, height: 812 } } },
    { name: 'tablet', use: { viewport: { width: 768, height: 1024 } } },
    { name: 'desktop', use: { viewport: { width: 1440, height: 900 } } },
  ],
});
```

### 1.3 Настройка Git-стратегии

```bash
# Создать отдельную ветку
git checkout -b feat/tailwind-migration

# После каждого мигрированного компонента — коммит
# git add src/components/Button/
# git commit -m "migrate: Button component to Tailwind CSS"
```

---

## 2. Выбор версии: Tailwind v3 vs v4

| Критерий | Tailwind CSS v3 | Tailwind CSS v4 |
|----------|-----------------|-----------------|
| **Конфигурация** | `tailwind.config.js` | CSS-first: `@theme` в `.css` |
| **PostCSS** | Отдельный плагин | `@tailwindcss/postcss` |
| **Производительность** | Хорошая | ~10x быстрее сборка |
| **Новые фичи** | Стабильные | `OKLCH` цвета, container queries, `@property` |
| **Стабильность** | Production-ready | Stable (Jan 2025+) |
| **Совместимость** | Широкая | Некоторые плагины ещё обновляются |
| **@apply** | Рекомендуется | ⚠️ Не рекомендуется (официально) |
| **Нейминг** | `tailwind.config.js` | `tailwind.config.js` deprecated → CSS `@theme` |

> **Рекомендация:** Для новых проектов — v4. Для миграции крупных кодбейзов — если все используемые плагины поддерживают v4, выбирайте v4; иначе v3 (миграция на v4 возможна позже).

---

## 3. Стратегия безопасного рефакторинга

### 3.1 Принципы

| Принцип | Описание |
|---------|----------|
| **Постепенность** | Мигрируйте по одному компоненту/странице за раз |
| **Изоляция** | Компонентный подход: не трогайте пока не готовы |
| **Сравниваемость** | Всегда сравнивайте «до» и «после» визуально |
| **Откат** | Каждый компонент — отдельный commit, откат за 1 шаг |
| **No @apply овердоз** | Не злоупотребляйте `@apply` — это антипаттерн в Tailwind |

### 3.2 Порядок мигации (от простого к сложному)

```
┌─────────────────────────────────────────────────────────────────┐
│  STAGE 0: Подготовка (1-2 дня)                                  │
│  ├── Аудит кодбейза и инвентаризация                           │
│  ├── Скриншоты всех страниц (baseline)                         │
│  ├── Установка Tailwind + PostCSS                              │
│  ├── Настройка конфигурации (theme / tailwind.config.js)       │
│  ├── Установка clsx + tailwind-merge                           │
│  └── Настройка ESLint + Prettier плагинов для Tailwind         │
├─────────────────────────────────────────────────────────────────┤
│  STAGE 1: Design Tokens (1 день)                                │
│  ├── Цвета → @theme / theme.extend.colors                      │
│  ├── Типографика → fonts, fontSize, lineHeight                 │
│  ├── Spacing scale → ваш масштаб                               │
│  ├── Border radius, shadows, z-index                           │
│  └── Breakpoints                                                │
├─────────────────────────────────────────────────────────────────┤
│  STAGE 2: Базовые компоненты (2-3 дня)                          │
│  ├── Button, Input, Label, Select                              │
│  ├── Badge, Tag, Avatar                                        │
│  ├── Card, Modal, Dropdown                                     │
│  └── Для каждого: состояния (hover, focus, disabled, error)   │
├─────────────────────────────────────────────────────────────────┤
│  STAGE 3: Компоновка и Layout (2-3 дня)                         │
│  ├── Header, Footer, Sidebar                                   │
│  ├── Grid-система, Container                                   │
│  ├── Navigation, Breadcrumbs                                   │
│  └── Responsive layout на всех брейкпойнтах                    │
├─────────────────────────────────────────────────────────────────┤
│  STAGE 4: Сложные компоненты и страницы (1-2 недели)            │
│  ├── Forms, Tables, Data grids                                 │
│  ├── Страницы целиком                                          │
│  ├── Адаптивность: mobile, tablet, desktop                     │
│  └── Динамические классы: темы, вариации                       │
├─────────────────────────────────────────────────────────────────┤
│  STAGE 5: Верификация и очистка (1-2 дня)                       │
│  ├── Визуальное регрессионное сравнение                        │
│  ├── Чек-лист (см. раздел 9)                                   │
│  ├── Удаление старых SCSS файлов                               │
│  ├── Tree-shaking / проверка размера bundle                    │
│  └── Обновление документации                                   │
└─────────────────────────────────────────────────────────────────┘
```

### 3.3 Правило «Параллельного запуска»

**Никогда не удаляйте SCSS-класс, пока Tailwind-эквивалент не проверен визуально.**

```tsx
// ❌ ПЛОХО: сразу заменяете
<div className="btn-primary">Click</div>

// ✅ ХОРОШО: оба варианта работают параллельно во время миграции
// Tailwind переопределяет SCSS благодаря порядку загрузки
<div className="btn-primary bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
  Click
</div>

// После визуальной проверки — удаляете .btn-primary из SCSS
```

### 3.4 Стратегия «Feature Flags» для крупных проектов

```tsx
// tailwind-migration-feature-flag.ts
export const USE_TAILWIND = {
  Button: process.env.NEXT_PUBLIC_TW_BUTTON === 'true',
  Header: process.env.NEXT_PUBLIC_TW_HEADER === 'true',
  // ...
};

// Button.tsx
export function Button({ variant, children }) {
  if (USE_TAILWIND.Button) {
    return <button className={buttonVariants({ variant })}>{children}</button>;
  }
  // Старая SCSS-версия
  return <button className={`btn btn--${variant}`}>{children}</button>;
}
```

---

## 4. Маппинг SCSS-конструкций на Tailwind

### 4.1 Переменные (Variables) → Design Tokens

#### SCSS-переменные — Аудит

```scss
// Типичный файл _variables.scss
$primary-50: #eff6ff;
$primary-100: #dbeafe;
$primary-500: #3b82f6;
$primary-600: #2563eb;
$primary-700: #1d4ed8;

$gray-50: #f9fafb;
$gray-100: #f3f4f6;
$gray-900: #111827;

$spacing-xs: 0.25rem;
$spacing-sm: 0.5rem;
$spacing-md: 1rem;
$spacing-lg: 1.5rem;
$spacing-xl: 2rem;

$font-sans: 'Inter', system-ui, sans-serif;
$font-mono: 'JetBrains Mono', monospace;

$radius-sm: 0.25rem;
$radius-md: 0.375rem;
$radius-lg: 0.5rem;
$radius-xl: 0.75rem;

$shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
$shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
$shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);

$breakpoint-sm: 640px;
$breakpoint-md: 768px;
$breakpoint-lg: 1024px;
$breakpoint-xl: 1280px;
```

#### Tailwind v4 (globals.css) — Рекомендуемый подход

```css
@import "tailwindcss";

@theme {
  /* === Цвета === */
  --color-primary-50: oklch(0.97 0.014 254.6);
  --color-primary-100: oklch(0.93 0.032 255.59);
  --color-primary-500: oklch(0.62 0.194 259.81);
  --color-primary-600: oklch(0.55 0.213 262.05);
  --color-primary-700: oklch(0.49 0.22 263.07);

  --color-gray-50: oklch(0.98 0.003 264.54);
  --color-gray-100: oklch(0.95 0.006 264.53);
  --color-gray-900: oklch(0.21 0.006 285.89);

  /* === Spacing === */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;
  --spacing-2xl: 3rem;
  --spacing-3xl: 4rem;

  /* === Типографика === */
  --font-sans: "Inter", system-ui, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, monospace;

  --text-xs: 0.75rem;
  --text-sm: 0.875rem;
  --text-base: 1rem;
  --text-lg: 1.125rem;
  --text-xl: 1.25rem;
  --text-2xl: 1.5rem;
  --text-3xl: 1.875rem;

  --leading-tight: 1.25;
  --leading-normal: 1.5;
  --leading-relaxed: 1.625;

  /* === Border Radius === */
  --radius-sm: 0.25rem;
  --radius-md: 0.375rem;
  --radius-lg: 0.5rem;
  --radius-xl: 0.75rem;
  --radius-full: 9999px;

  /* === Shadows === */
  --shadow-sm: 0 1px 2px oklch(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px oklch(0 0 0 / 0.1), 0 2px 4px -2px oklch(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px oklch(0 0 0 / 0.1), 0 4px 6px -4px oklch(0 0 0 / 0.1);

  /* === Breakpoints === */
  --breakpoint-sm: 40rem;   /* 640px */
  --breakpoint-md: 48rem;   /* 768px */
  --breakpoint-lg: 64rem;   /* 1024px */
  --breakpoint-xl: 80rem;   /* 1280px */
  --breakpoint-2xl: 96rem;  /* 1536px */

  /* === Transitions === */
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
  --transition-fast: 150ms var(--ease-in-out);
  --transition-normal: 250ms var(--ease-in-out);
}

/* === Семантические алиасы (сокращения) === */
@theme {
  --color-primary: var(--color-primary-500);
  --color-primary-hover: var(--color-primary-600);
  --color-danger: oklch(0.6 0.22 25);
  --color-success: oklch(0.65 0.17 145);
  --color-warning: oklch(0.75 0.16 85);
}
```

#### Tailwind v3 (tailwind.config.js)

```js
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#eff6ff",
          100: "#dbeafe",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
        },
        gray: {
          50: "#f9fafb",
          100: "#f3f4f6",
          900: "#111827",
        },
      },
      spacing: {
        xs: "0.25rem",
        sm: "0.5rem",
        md: "1rem",
        lg: "1.5rem",
        xl: "2rem",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      borderRadius: {
        sm: "0.25rem",
        md: "0.375rem",
        lg: "0.5rem",
        xl: "0.75rem",
      },
      boxShadow: {
        sm: "0 1px 2px rgba(0,0,0,0.05)",
        md: "0 4px 6px -1px rgba(0,0,0,0.1)",
        lg: "0 10px 15px -3px rgba(0,0,0,0.1)",
      },
    },
  },
  plugins: [],
};
```

### 4.2 Миксины (Mixins) → Утилиты / @utility / Компоненты

#### Простые миксины → Нативные утилиты Tailwind

```scss
// SCSS — БЫЛО
@mixin flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

@mixin flex-between {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

@mixin text-truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

@mixin visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}
```

```tsx
// Tailwind — СТАЛО (просто используйте утилиты напрямую)
<div className="flex items-center justify-center">...</div>
<div className="flex items-center justify-between">...</div>
<div className="truncate">...</div>
<div className="sr-only">...</div>
```

#### Параметризованные миксины → React-компоненты

```scss
// SCSS — БЫЛО
@mixin button-variant($bg, $hover, $text: white) {
  background-color: $bg;
  color: $text;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-weight: 500;
  transition: all 0.2s;
  &:hover { background-color: $hover; }
  &:focus-visible { box-shadow: 0 0 0 3px rgba($bg, 0.4); }
  &:disabled { opacity: 0.5; cursor: not-allowed; }
}

.btn-primary { @include button-variant($primary, $primary-hover); }
.btn-danger { @include button-variant($danger, $danger-hover); }
.btn-outline {
  @include button-variant(transparent, $gray-100, $gray-900);
  border: 1px solid $gray-300;
}
```

**Вариант A: Через компонент с вариантами (РЕКОМЕНДУЕТСЯ)**

```tsx
// components/Button.tsx
import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";
import { type ButtonHTMLAttributes } from "react";

const buttonVariants = cva(
  // Базовые стили (аналог @mixin)
  "inline-flex items-center justify-center font-medium rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer select-none",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-white hover:bg-primary-700 focus-visible:ring-primary-500",
        secondary:
          "bg-gray-100 text-gray-900 hover:bg-gray-200 focus-visible:ring-gray-500",
        outline:
          "border border-gray-300 bg-transparent hover:bg-gray-50 focus-visible:ring-gray-500",
        ghost:
          "bg-transparent hover:bg-gray-100 focus-visible:ring-gray-500",
        danger:
          "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500",
      },
      size: {
        sm: "h-8 px-3 text-sm",
        md: "h-10 px-4 py-2",
        lg: "h-12 px-8 text-lg",
        icon: "h-10 w-10 p-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export function Button({
  variant,
  size,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={twMerge(buttonVariants({ variant, size }), className)}
      {...props}
    >
      {children}
    </button>
  );
}
```

**Вариант B: Кастомные утилиты через @utility (Tailwind v4)**

```css
/* globals.css */
@import "tailwindcss";

/* Кастомная утилита (НЕ ЗЛОУПОТРЕБЛЯЙТЕ!) */
@utility btn-base {
  @apply inline-flex items-center justify-center font-medium rounded-lg transition-colors;
  @apply focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2;
  @apply disabled:opacity-50 disabled:pointer-events-none cursor-pointer;
}

@utility btn-primary {
  @apply btn-base bg-primary text-white hover:bg-primary-700 focus-visible:ring-primary-500;
}

@utility btn-danger {
  @apply btn-base bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500;
}
```

> ⚠️ **Важно:** В Tailwind v4 официальная рекомендация — использовать компоненты React/Vue, а не `@utility` с `@apply`. `@utility` оправдан только для действительно переиспользуемых CSS-паттернов, не привязанных к фреймворку.

#### Сложные миксины с медиа-запросами

```scss
// SCSS — БЫЛО
@mixin responsive-grid($min: 250px) {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax($min, 1fr));
  gap: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }
}
```

```tsx
// Tailwind — СТАЛО
<div className="grid grid-cols-1 md:grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-2 md:gap-4">
  {items.map(item => <Card key={item.id} {...item} />)}
</div>
```

### 4.3 Вложенность (Nesting) → Варианты / Состояния

| SCSS Nesting | Tailwind Equivalent |
|---|---|
| `&:hover { }` | `hover:bg-blue-700` |
| `&:focus { }` | `focus:ring-2 focus:ring-blue-500` |
| `&:focus-visible { }` | `focus-visible:ring-2` |
| `&:active { }` | `active:bg-blue-800` |
| `&:disabled { }` | `disabled:opacity-50 disabled:pointer-events-none` |
| `&[aria-expanded="true"] { }` | `aria-expanded:bg-blue-100` |
| `&::before { }` | `before:content-[''] before:absolute before:inset-0` |
| `&::after { }` | `after:content-[''] after:block after:h-1` |
| `.parent:hover & { }` | `group-hover:text-blue-600` (на ребёнке) |
| `.dark & { }` | `dark:bg-gray-900` |
| `@media (min-width: 768px) { }` | `md:flex md:grid-cols-2` |
| `@container (min-width: 400px) { }` | `@md:grid-cols-2` (container queries, v4) |

**Псевдо-элементы — подробный маппинг:**

```scss
// SCSS
.tooltip {
  position: relative;
  &::before {
    content: attr(data-tip);
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    padding: 0.5rem;
    background: #1f2937;
    color: white;
    border-radius: 0.375rem;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.2s;
    white-space: nowrap;
  }
  &:hover::before { opacity: 1; }
}
```

```tsx
// Tailwind
<span
  data-tip="Tooltip text"
  className="relative before:content-[attr(data-tip)] before:absolute before:bottom-full before:left-1/2 before:-translate-x-1/2 before:px-2 before:py-1 before:bg-gray-800 before:text-white before:rounded-md before:opacity-0 before:pointer-events-none before:transition-opacity before:duration-200 before:whitespace-nowrap hover:before:opacity-100"
>
  Hover me
</span>

// Или, что чище — через отдельный компонент Tooltip
```

**Родительские селекторы (group / peer):**

```scss
// SCSS — Card при наведении меняет дочерние элементы
.card {
  .icon { color: #9ca3af; transition: color 0.2s; }
  .title { color: #111827; transition: color 0.2s; }
  &:hover {
    .icon { color: #3b82f6; }
    .title { color: #3b82f6; }
    background: #f9fafb;
  }
}
```

```tsx
// Tailwind — group на родителе, group-hover:* на детях
<div className="group p-6 rounded-xl border hover:bg-gray-50 transition-colors cursor-pointer">
  <Icon
    className="text-gray-400 group-hover:text-primary-500 transition-colors duration-200"
  />
  <h3 className="text-gray-900 group-hover:text-primary-500 transition-colors duration-200 font-semibold mt-2">
    Card Title
  </h3>
</div>
```

### 4.4 @extend / Placeholders → Композиция

```scss
// SCSS
%btn-base {
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-weight: 500;
  transition: all 0.2s;
  cursor: pointer;
  border: none;
  &:disabled { opacity: 0.5; cursor: not-allowed; }
}

%card-base {
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  padding: 1.5rem;
}

.btn-primary { @extend %btn-base; background: $primary; color: white; }
.btn-outline { @extend %btn-base; border: 1px solid $gray-300; }
.card { @extend %card-base; }
.card-interactive { @extend %card-base; &:hover { box-shadow: 0 4px 6px rgba(0,0,0,0.1); } }
```

```tsx
// Tailwind — компоненты (НЕ копипастите строки, создавайте абстракции)
import { cva } from "class-variance-authority";

// Через cva
const buttonBase = "px-4 py-2 rounded-md font-medium transition-all duration-200 cursor-pointer border-none disabled:opacity-50 disabled:cursor-not-allowed";
const btnPrimary = `${buttonBase} bg-primary-500 text-white hover:bg-primary-600`;

// Card через компонент
function Card({ interactive, className, children, ...props }) {
  return (
    <div
      className={twMerge(
        "bg-white rounded-lg shadow-sm p-6",
        interactive && "hover:shadow-md transition-shadow cursor-pointer",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
```

### 4.5 SCSS-функции → CSS-функции (calc, clamp, etc.)

```scss
// SCSS
@function fluid-size($min, $max, $min-vw: 320px, $max-vw: 1440px) {
  @return calc(#{$min} + (#{$max} - #{$min}) * ((100vw - #{$min-vw}) / (#{$max-vw} - #{$min-vw})));
}

.section-title {
  font-size: fluid-size(1.5rem, 3rem);
  margin-bottom: fluid-size(1rem, 2rem);
}
```

```css
/* Tailwind v4 — через CSS */
@theme {
  --text-fluid-lg: clamp(1.5rem, 1rem + 2.5vw, 3rem);
  --text-fluid-md: clamp(1.125rem, 0.875rem + 1.25vw, 1.5rem);
  --fluid-section-gap: clamp(1rem, 0.5rem + 2vw, 2rem);
}
```

```tsx
// Или прямо в JSX через arbitrary values
<h1 className="text-[clamp(1.5rem,1rem+2.5vw,3rem)]">
  Fluid heading
</h1>
```

### 4.6 Keyframes и анимации

```scss
// SCSS
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes slideInRight {
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.animate-fadeIn { animation: fadeIn 0.3s ease-out; }
.animate-slideIn { animation: slideInRight 0.4s ease-out; }
```

```css
/* Tailwind v4 — внутри globals.css */
@import "tailwindcss";

@theme {
  --animate-fadeIn: fadeIn 0.3s ease-out;
  --animate-slideIn: slideInRight 0.4s ease-out;
  --animate-pulse: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes slideInRight {
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
}
```

```tsx
// Использование
<div className="animate-fadeIn">Content</div>
<div className="animate-slideIn">Sidebar</div>
```

---

## 5. Конфигурация

### 5.1 Установка (Tailwind v4)

```bash
# Установка
npm install tailwindcss @tailwindcss/postcss postcss

# Для динамических классов
npm install clsx tailwind-merge

# Для вариантов компонентов (опционально, рекомендуется)
npm install class-variance-authority
```

```css
/* globals.css (или app/globals.css для Next.js) */
@import "tailwindcss";

@theme {
  /* Ваши кастомные переменные сюда */
}
```

```js
// postcss.config.js
module.exports = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
```

### 5.2 Установка (Tailwind v3)

```bash
npm install -D tailwindcss@3 postcss autoprefixer
npx tailwindcss init -p
```

```js
// tailwind.config.js — см. раздел 4.1
// postcss.config.js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

```css
/* globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 5.3 Критические настройки PostCSS

Порядок плагинов **важен**:

```js
// postcss.config.js
module.exports = {
  plugins: [
    // Tailwind ДО autoprefixer
    "@tailwindcss/postcss",  // или tailwindcss для v3
    "autoprefixer",
    // cssnano — только для production
    ...(process.env.NODE_ENV === "production"
      ? [["cssnano", { preset: "default" }]]
      : []),
  ],
};
```

---

## 6. Работа с динамическими классами

### 6.1 Базовые паттерны с clsx + tailwind-merge

```tsx
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Утилита-обёртка (один раз в проекте)
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

```tsx
// === Условные классы ===
<div className={cn(
  "px-4 py-2 rounded-lg font-medium transition-colors",
  isActive && "bg-primary text-white",
  isDisabled && "opacity-50 pointer-events-none"
)}>
  Button
</div>

// === Тернарные операторы (правильно!) ===
<div className={cn(
  "px-4 py-2 rounded-lg font-medium",
  variant === "primary" && "bg-primary text-white",
  variant === "secondary" && "bg-gray-100 text-gray-900",
  variant === "danger" && "bg-red-600 text-white",
)}>
  {label}
</div>

// === Переопределение извне (className prop) ===
function Card({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={cn("bg-white rounded-xl shadow-sm p-6", className)}>
      {children}
    </div>
  );
}

// Использование: className ДОБАВЛЯЕТСЯ, а не заменяет
<Card className="bg-blue-50 border border-blue-200">...</Card>

// === twMerge решает конфликты ===
// БЕЗ twMerge: "p-4 p-6" → оба применены, непредсказуемо
// С twMerge: "p-4 p-6" → только p-6 (последний побеждает для одного свойства)

// Пример: переопределение padding
cn("p-4", "p-6")          // → "p-6"         (переопределено)
cn("px-4 py-2", "py-3")     // → "px-4 py-3"   (корректный мерж)
```

### 6.2 class-variance-authority (cva) — для вариантов компонентов

```tsx
import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";
import { cn } from "@/lib/utils";

// Паттерн 1: Функциональная кнопка с вариантами
const badgeVariants = cva(
  "inline-flex items-center rounded-full font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-gray-100 text-gray-800",
        primary: "bg-primary-100 text-primary-700",
        success: "bg-green-100 text-green-700",
        warning: "bg-yellow-100 text-yellow-700",
        danger: "bg-red-100 text-red-700",
      },
      size: {
        sm: "px-2 py-0.5 text-xs",
        md: "px-2.5 py-1 text-sm",
        lg: "px-3 py-1 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

function Badge({
  variant,
  size,
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & VariantProps<typeof badgeVariants>) {
  return (
    <span
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    />
  );
}
```

### 6.3 Продвинутые паттерны

```tsx
// Паттерн 2: Композиция через Compound Variants
const buttonVariants = cva("inline-flex items-center justify-center font-medium transition-all", {
  variants: {
    variant: { /* ... */ },
    size: { /* ... */ },
    rounded: {
      true: "rounded-full",
      false: "rounded-lg",
    },
  },
  compoundVariants: [
    // Особые стили для комбинации variant + size
    {
      variant: "primary",
      size: "lg",
      class: "tracking-wide uppercase",
    },
  ],
  defaultValues: {
    variant: "primary",
    size: "md",
    rounded: false,
  },
});

// Паттерн 3: Slot-based компоненты (как Radix + Tailwind)
function Alert({ variant = "info", className, children }: AlertProps) {
  const alertVariants = cva("relative w-full rounded-lg border p-4", {
    variants: {
      variant: {
        info: "bg-blue-50 border-blue-200 text-blue-800",
        success: "bg-green-50 border-green-200 text-green-800",
        warning: "bg-yellow-50 border-yellow-200 text-yellow-800",
        danger: "bg-red-50 border-red-200 text-red-800",
      },
    },
    defaultValues: { variant: "info" },
  });

  return (
    <div role="alert" className={alertVariants({ variant })}>
      <AlertIcon variant={variant} className="absolute left-4 top-4" />
      <div className="pl-7">{children}</div>
    </div>
  );
}

// Паттерн 4: Tailwind Variants (TV) — продвинутая альтернатива cva
// npm install tailwind-variants
import { tv } from "tailwind-variants";

const button = tv({
  base: "inline-flex items-center justify-center font-medium rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50",
  variants: {
    variant: {
      primary: "bg-primary-500 text-white hover:bg-primary-600",
      secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200",
      ghost: "hover:bg-gray-100",
    },
    size: {
      sm: "h-8 px-3 text-xs",
      md: "h-10 px-4 text-sm",
      lg: "h-12 px-6 text-base",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});

// button({ variant: "primary", size: "lg" }) → строка классов
```

### 6.4 Конфигурация ESLint + Prettier

```bash
npm install -D eslint-plugin-tailwindcss prettier-plugin-tailwindcss
```

```js
// .eslintrc.js
module.exports = {
  extends: [
    "plugin:tailwindcss/recommended",
  ],
  rules: {
    "tailwindcss/classnames-order": "warn",  // сортировка классов
    "tailwindcss/no-custom-classname": "off", // разрешить кастом
    "tailwindcss/no-contradicting-classname": "error", // конфликты
  },
};
```

```js
// prettier.config.js
module.exports = {
  plugins: ["prettier-plugin-tailwindcss"],
  // tailwind-plugin автоматически сортирует классы
};
```

---

## 7. Пошаговый план миграции (для ИИ-агента)

### Шаг 0: Анализ

```bash
# 1. Подсчитать SCSS-файлы и их размер
find ./src -name "*.scss" | wc -l
find ./src -name "*.scss" -exec wc -l {} + | tail -1

# 2. Найти все миксины
grep -rn "@mixin" ./src --include="*.scss" | wc -l

# 3. Найти все переменные
grep -rn "^\$[a-zA-Z]" ./src --include="*.scss" | wc -l

# 4. Найти динамические классы в React (clsx, classnames, шаблонные строки)
grep -rn "className.*\`" ./src --include="*.tsx" --include="*.jsx" | head -20
grep -rn "classNames\|clsx" ./src --include="*.tsx" --include="*.jsx" | wc -l

# 5. Составить карту зависимостей SCSS
cat > scss-import-map.md << 'EOF'
# SCSS Import Map
EOF
for f in $(find ./src -name "*.scss"); do
  echo "## $f" >> scss-import-map.md
  grep "@import\|@use\|@forward" "$f" >> scss-import-map.md
done
```

### Шаг 1: Установка Tailwind

```bash
# Tailwind v4
npm install tailwindcss @tailwindcss/postcss postcss clsx tailwind-merge class-variance-authority
npm install -D prettier-plugin-tailwindcss eslint-plugin-tailwindcss

# Создать postcss.config.js и globals.css (см. раздел 5)
```

### Шаг 2: Миграция переменных → @theme / tailwind.config.js

```bash
# Для каждого найденного SCSS-файла переменных создать маппинг:
# _variables.scss → @theme в globals.css (v4) / theme.extend (v3)
```

### Шаг 3: Миграция по компонентам (цикл)

```
Для КАЖДОГО компонента:
  1. Прочитать .scss файл компонента
  2. Извлечь все классы и их стили
  3. Составить маппинг "старый класс → утилиты Tailwind"
  4. Переписать .tsx/.jsx файл с новыми классами
  5. Использовать cn() для условных классов
  6. Запустить dev-сервер и проверить визуально
  7. Закоммитить

  Порядок компонентов (от простого к сложному):
  Badge → Button → Input → Label → Card → Modal → Form → Table → Header → Footer → Layout → Pages
```

### Шаг 4: Удаление SCSS

```bash
# После миграции ВСЕХ компонентов:
find ./src -name "*.scss" -delete
find ./src -name "*.sass" -delete
# Удалить @import из JS/TS файлов, которые ссылались на .scss
grep -rl "\.scss'" ./src --include="*.ts" --include="*.tsx" | xargs sed -i "/import.*\.scss/d"
```

### Шаг 5: Финальная проверка

- Визуальное регрессионное тестирование (см. раздел 9)
- Проверка размера CSS-бандла
- Lighthouse audit

---

## 8. Автоматизация миграции

### 8.1 Полуавтоматические инструменты

| Инструмент | Описание | Примечание |
|---|---|---|
| **scss-to-tailwind** (CLI) | Конвертирует CSS в Tailwind классы | npm pkg: `scss-to-tailwind` |
| **Tailwind CSS IntelliSense** | VSCode расширение с автокомплитом | Обязательно установить |
| **Stylelint + tailwindcss** | Проверка порядка классов | — |
| **PostCSS** | Автоматический конвертер | Для простых случаев |

### 8.2 Скрипт для конвертации переменных

```javascript
// scripts/migrate-variables.js
// Конвертирует SCSS-переменные в CSS custom properties (@theme)

const fs = require("fs");
const path = require("path");

const scssVars = fs.readFileSync(
  path.join(__dirname, "../src/styles/_variables.scss"),
  "utf-8"
);

const lines = scssVars.split("\n");
const themeEntries = [];

for (const line of lines) {
  const match = line.match(/^\$([a-zA-Z0-9_-]+):\s*(.+?);?$/);
  if (match) {
    const [, name, value] = match;
    const cssName = name.replace(/_/g, "-");
    themeEntries.push(`  --${cssName}: ${value.replace("!default", "").trim()};`);
  }
}

const output = `@theme {\n${themeEntries.join("\n")}\n}\n`;
console.log(output);
// Записать: fs.writeFileSync("globals.css", output);
```

### 8.3 Регулярные выражения для базовой замены

```bash
# Замена простых классов (grep + sed)
# ВНИМАНИЕ: Только для механических замен, не заменяет осмысленный рефакторинг!

# SCSS variable reference в className (шаблон для поиска)
grep -rn "className=.*\$" ./src --include="*.tsx" --include="*.jsx"

# style={{}} → классы Tailwind (ручная работа)
grep -rn "style={{" ./src --include="*.tsx" --include="*.jsx" | head -20
```

---

## 9. Чек-лист проверки после миграции

### 9.1 Визуальная идентичность

```
□ Все компоненты выглядят идентично оригиналу
□ Цвета соответствуют дизайн-системе (проверить OKLCH → HEX конвертацию)
□ Типографика: шрифты, размеры, line-height, letter-spacing
□ Отступы (padding, margin) идентичны
□ Border-radius, box-shadow соответствуют
□ Z-index слои корректны (модалки поверх всего)
□ Градиенты, фоны, изображения на месте
□ Иконки не смещены и правильного размера
```

### 9.2 Состояния и интерактивность

```
□ Hover-состояния работают корректно для всех интерактивных элементов
□ Focus-состояния видимы (focus-visible, focus-ring)
□ Active/pressed состояния работают
□ Disabled состояния: opacity + pointer-events
□ Loading/spinner состояния
□ Error states (валидация форм)
□ Empty states
□ Анимации и transition: идентичная продолжительность и easing
□ CSS keyframe-анимации работают
□ Staggered animations (списки)
```

### 9.3 Адаптивность

```
□ Mobile (320px–375px): нет горизонтального скролла
□ Mobile (375px): layout не сломан
□ Tablet (768px): layout корректен
□ Desktop (1024px): layout корректен
□ Large Desktop (1440px+): layout не растянут чрезмерно
□ Breakpoints работают: sm, md, lg, xl, 2xl
□ Изображения: object-fit, responsive sizes
□ Табливы: overflow/scroll на мобильных
□ Navigation: hamburger menu на мобильных
□ Touch target size: минимум 44x44px на мобильных
□ Safe area insets (iPhone notch): env(safe-area-inset-*)
□ Container queries (Tailwind v4): если используются
```

### 9.4 Тёмная тема (если применимо)

```
□ Все компоненты корректны в тёмной теме (dark: варианты)
□ Переключение темы работает без мерцания
□ CSS custom properties обновляются корректно
□ bg, text, border цвета контрастны в обоих режимах
□ Контрастность соответствует WCAG AA (минимум 4.5:1)
□ Картинки/видео: яркость в тёмной теме
□ box-shadow адаптирован для тёмного фона
```

### 9.5 Доступность (a11y)

```
□ Focus ring видим и контрастирует
□ Skip-to-content link работает
□ ARIA-атрибуты на месте
□ Семантические теги: nav, main, aside, header, footer
□ alt-текст для изображений
□ role-атрибуты для кастомных компонентов
□ Screen reader: динамический контент объявляется
□ Keyboard navigation: Tab, Enter, Escape работают
□ Prefers-reduced-motion: анимации отключаются
□ Prefers-contrast: поддержка high contrast
```

### 9.6 Производительность

```
□ CSS bundle размер уменьшился (или не вырос критически)
□ Нет FOUC (Flash of Unstyled Content)
□ Нет неиспользуемого CSS (Tailwind purge работает)
□ First Contentful Paint не ухудшился
□ Нет layout shift (CLS) из-за переключения SCSS → Tailwind
□ Content-visibility для длинных списков (если применимо)
```

### 9.7 Код-качество

```
□ Все старые .scss/.sass файлы удалены
□ Нет импортов .scss в .ts/.tsx файлах
□ Нет упоминаний SCSS-переменных ($var) в JSX
□ ESLint не выдаёт ошибок tailwindcss/classnames-order
□ Prettier форматирует Tailwind-классы в правильном порядке
□ Нет конфликтующих классов (tailwind-merge работает)
□ cn() утилита подключена и используется
□ Кастомные компоненты используют cva() или tv()
□ Нет @apply без крайней необходимости (Tailwind v4)
```

### 9.8 Специфика Next.js (если применимо)

```
□ globals.css импортирован в layout.tsx (app router) или _app.tsx (pages router)
□ Нет ошибок "class not found" на серверной стороне
□ Tailwind работает в server components
□ dynamic() для клиентских компонентов с интерактивностью
□ suppressHydrationWarning при необходимости (dark mode)
□ PostCSS не конфликтует с Next.js CSS modules
```

---

## 10. Типичные проблемы и решения

### Проблема 1: Специфичность SCSS выше Tailwind

```scss
// SCSS с высокой специфичностью
.parent .child .grandchild { color: red; }
```

**Решение:**
```tsx
// Tailwind — используйте !important для переопределения
<div className="!text-red-500">
  Text
</div>

// Или лучше — удалите SCSS полностью перед проверкой
```

### Проблема 2: SCSS `:global()` внутри CSS Modules

```scss
/* Button.module.scss */
.button {
  :global(.icon) { margin-right: 0.5rem; }
}
```

**Решение:**
```tsx
// Tailwind — className напрямую
<Button>
  <Icon className="mr-2" />
  Click
</Button>
```

### Проблема 3: Динамические значения, не поддержанные Tailwind (JIT)

```tsx
// ❌ ТАК НЕЛЬЗЯ — не попадёт в сборку
<div className={`bg-${color}-500`}>

// ✅ ПРАВИЛЬНО — полные имена классов
const colorMap = {
  primary: "bg-primary-500",
  danger: "bg-red-500",
  success: "bg-green-500",
};
<div className={colorMap[color]}>

// ✅ ИЛИ — arbitrary values
<div className={`bg-[${hexColor}]`}>
```

### Проблема 4: Keyframes из анимационных библиотек (animate.css и т.п.)

**Решение:** Импортируйте CSS библиотеки напрямую, Tailwind не удаляет внешний CSS:

```css
@import "tailwindcss";
@import "animate.css"; /* или CDN-ссылка в HTML */

@theme {
  --animate-fadeIn: fadeIn 0.3s ease-out;
}
```

### Проблема 5: `overflow: hidden` на `body` или `html` из SCSS reset

**Tailwind Preflight** уже сбрасывает большинство стилей. Удаляйте ручные ресеты:

```css
/* Удалить вручную — Tailwind Preflight делает это */
/* * { margin: 0; padding: 0; box-sizing: border-box; } → НЕ НУЖНО */

/* Кастомизация Preflight (Tailwind v4) */
@layer base {
  body {
    @apply bg-gray-50 text-gray-900 antialiased;
    font-feature-settings: "rlig" 1, "calt" 1;
  }
}
```

### Проблема 6: `@layer components` в v3 → @utility в v4

```css
/* Tailwind v3 */
@layer components {
  .btn { @apply px-4 py-2 rounded-lg; }
}

/* Tailwind v4 — @utility */
@utility btn {
  @apply px-4 py-2 rounded-lg;
}
```

### Проблема 7: Конфликт версий PostCSS

```
// next.config.js или postcss.config.js
// Убедитесь, что НЕТ дублирования плагинов:
// ❌ postcss.config.js + tailwindcss в next.config.js
// ✅ Только одно место конфигурации PostCSS
```

### Проблема 8: Проект уже имеет Framer Motion / GSAP / Lenis, но animation libs не интегрированы со стилями

**Симптом:** В `package.json` есть `framer-motion`, `gsap`, `lenis`, но анимации применяются напрямую через `style={{}}` или inline `<script>`, а Tailwind добавляется поверх — визуальный хаос.

**Решение:** Перед миграцией стилей определить, какие анимации реализованы через:
- `style={{ transform, opacity }}` — заменить на Framer Motion `motion.div` + Tailwind-классы
- GSAP `to()/from()` — вынести в отдельные `animations.ts` файлы
- CSS `@keyframes` — перенести в Tailwind `@theme { --animate-*: ... }`

```tsx
// ❌ БЫЛО: inline style + Tailwind конфликт
<div
  className="bg-surface rounded-xl p-6"
  style={{ transform: `translateY(${scrollY}px)` }}
>

// ✅ СТАЛО: Framer Motion + Tailwind работают вместе
<motion.div
  className="bg-surface rounded-xl p-6"
  initial={{ opacity: 0, y: 32 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
>
```

**Порядок при миграции таких проектов:**
1. Сначала вынести все inline-анимации в Framer Motion / GSAP
2. Затем мигрировать SCSS стили в Tailwind
3. Наконец, добавить `prefers-reduced-motion` для всех анимаций

---

### Проблема 9: Шрифты не загружаются после миграции

```css
/* Убедитесь что @font-face остаётся */
@layer base {
  @font-face {
    font-family: "Inter";
    font-style: normal;
    font-weight: 100 900;
    font-display: swap;
    src: url("/fonts/Inter-Variable.woff2") format("woff2");
  }
}
```

---

## Приложение А: Быстрый справочник маппинга

| CSS Property | Tailwind Class |
|---|---|
| `display: flex` | `flex` |
| `display: grid` | `grid` |
| `display: none` | `hidden` |
| `flex-direction: column` | `flex-col` |
| `justify-content: center` | `justify-center` |
| `align-items: center` | `items-center` |
| `gap: 1rem` | `gap-4` |
| `flex-wrap: wrap` | `flex-wrap` |
| `grid-template-columns: repeat(3, 1fr)` | `grid-cols-3` |
| `position: absolute` | `absolute` |
| `position: relative` | `relative` |
| `z-index: 50` | `z-50` |
| `overflow: hidden` | `overflow-hidden` |
| `object-fit: cover` | `object-cover` |
| `text-align: center` | `text-center` |
| `text-transform: uppercase` | `uppercase` |
| `font-weight: 700` | `font-bold` |
| `text-decoration: underline` | `underline` |
| `list-style: none` | `list-none` |
| `cursor: pointer` | `cursor-pointer` |
| `user-select: none` | `select-none` |
| `pointer-events: none` | `pointer-events-none` |
| `opacity: 0.5` | `opacity-50` |
| `visibility: hidden` | `invisible` |
| `white-space: nowrap` | `whitespace-nowrap` |
| `word-break: break-word` | `break-words` |
| `text-overflow: ellipsis` | `truncate` |
| `vertical-align: middle` | `align-middle` |
| `transform: translate(-50%, -50%)` | `-translate-x-1/2 -translate-y-1/2` |

---

## Приложение Б: Шаблон тикетов для трекинга миграции

```markdown
## [MIGRATE] ComponentName

**SCSS file:** `src/components/ComponentName/ComponentName.module.scss`
**TSX file:** `src/components/ComponentName/ComponentName.tsx`

### Classes to migrate:
- [ ] `.component` → `bg-white rounded-xl shadow-sm p-6`
- [ ] `.component--active` → `ring-2 ring-primary-500`
- [ ] `.component__title` → `text-lg font-semibold text-gray-900`

### SCSS features used:
- [x] Variables
- [x] Nesting
- [x] Mixin: `@mixin card-shadow`
- [x] Dynamic classes in JSX

### Verification:
- [ ] Visual check on mobile (375px)
- [ ] Visual check on desktop (1440px)
- [ ] Dark mode verified
- [ ] Focus states verified
- [ ] No console errors
```

---

*Последнее обновление: Июнь 2026. Совместим с Tailwind CSS v3.x и v4.x (v4.3+).*
