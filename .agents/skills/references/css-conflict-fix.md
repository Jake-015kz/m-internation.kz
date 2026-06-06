# CSS Conflict Fix — m-internation.kz

**Дата:** Июнь 2026  
**Проблема:** После миграции SCSS → Tailwind CSS v4 пропали паддинги в карточках, секции "вывалились" из глобального контейнера.

---

## 🔍 Диагноз: 3 найденных конфликта

### КОНФЛИКТ 1: `.container` — прямое столкновение с Tailwind v4 (КРИТИЧНЫЙ)

**Файл:** `src/styles/tailwind.css`, строки 566–585

```css
/* ❌ ПРОБЛЕМА: голый .container {} конфликтует с Tailwind v4 */
.container {
  width: 100%;
  max-width: 80rem;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1rem;
  padding-right: 1rem;
}
@media (min-width: 768px) {
  .container {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
}
@media (min-width: 1024px) {
  .container {
    padding-left: 2rem;
    padding-right: 2rem;
  }
}
```

**Почему это плохо:**
- Tailwind v4 генерирует свой собственный класс `.container` с `max-width` по breakpoint'ам
- Кастомный `.container` в CSS перебивает (или конфликтует с) Tailwind-версией
- Результат: контейнер не центрируется правильно, паддинги слетают

**Где используется:**
- `src/components/layout/Header.tsx:45` — `className="container mx-auto max-w-[80rem] px-4 ..."`

**Исправление — ВАРИАНТ A (рекомендуется): Убрать `.container` из CSS, использовать только Tailwind-утилиты**

Удалить из `tailwind.css` блок `.container {}` (строки 566–585) полностью.

В компоненте Header заменить:
```tsx
// ❌ БЫЛО: голый "container" + Tailwind-утилиты (конфликт!)
<div className="container mx-auto max-w-[80rem] px-4 md:px-6 lg:px-8 ...">

// ✅ СТАЛО: только Tailwind-утилиты
<div className="mx-auto max-w-[80rem] px-4 md:px-6 lg:px-8 ...">
```

**Исправление — ВАРИАНТ B: Если нужен кастомный container через @theme**

В Tailwind v4 правильный способ — задать container через `@theme`:

```css
/* В tailwind.css, внутри @theme { ... } добавить: */
@theme {
  /* ...существующие токены... */
  
  /* Container settings — Tailwind v4 НЕ генерирует .container автоматически,
     но можно задать center и padding через @theme */
}
```

> **Примечание:** Tailwind v4 НЕ генерирует `.container` по умолчанию (в отличие от v3). Поэтому кастомный `.container` в CSS — это нормально, НО он не должен дублироваться с Tailwind-утилитами в одном className.

---

### КОНФЛИКТ 2: `.section` — дублирование padding (СРЕДНИЙ)

**Файл:** `src/styles/tailwind.css`, строки 587–596

```css
/* ❌ ПРОБЛЕМА: .section секции с padding, который может конфликтовать */
.section {
  padding-top: 5rem;
  padding-bottom: 5rem;
}
@media (min-width: 768px) {
  .section {
    padding-top: 8rem;
    padding-bottom: 8rem;
  }
}
```

**Почему это плохо:**
- Ни один компонент НЕ использует класс `section` (проверено по всему коду)
- Все секции используют `py-24 md:py-32` (что = `py-24` = 6rem, `md:py-32` = 8rem)
- CSS-класс `.section` с `padding-top: 5rem` отличается от `py-24` (= 6rem)
- Если кто-то добавит `className="section"` — получит НЕПРАВИЛЬНЫЙ padding

**Исправление:** Удалить `.section` из `tailwind.css` (строки 587–596). Все секции уже используют Tailwind-утилиты `py-24 md:py-32`.

---

### КОНФЛИКТ 3: `box-sizing: border-box` на `*` — конфликт с Preflight (НИЗКИЙ, но есть)

**Файл:** `src/styles/tailwind.css`, строки 185–191

```css
/* ⚠️ ПОТЕНЦИАЛЬНАЯ ПРОБЛЕМА */
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
```

**Почему это плохо:**
- Tailwind v4 Preflight (встроенный reset) уже включает `box-sizing: border-box` на всех элементах
- Дублирование не ломает напрямую, но `margin: 0; padding: 0` на `*` — более агрессивный reset, чем Preflight
- Preflight использует `margin: 0` на `body`, а не на `*` — разница в специфичности

**Исправление:** Заменить на более мягкий вариант:

```css
/* ✅ СТАЛО: убрать margin/padding reset с *, оставить только box-sizing 
   (который и так есть в Preflight — можно вообще убрать весь блок) */
*,
*::before,
*::after {
  box-sizing: border-box;
}
```

Или вообще удалить блок целиком — Preflight и так ставит `border-box`.

---

## 📋 Чеклист исправлений

### Шаг 1: Удалить `.container` из tailwind.css

```bash
# Файл: src/styles/tailwind.css
# Удалить строки 566-585 (весь блок .container {})
```

### Шаг 2: Удалить `.section` из tailwind.css

```bash
# Файл: src/styles/tailwind.css
# Удалить строки 587-596 (весь блок .section {})
```

### Шаг 3: Исправить Header.tsx

```tsx
// Файл: src/components/layout/Header.tsx, строка 45
// ❌ БЫЛО:
<div className="container mx-auto max-w-[80rem] px-4 md:px-6 lg:px-8 h-16 md:h-[4.5rem] flex items-center justify-between">

// ✅ СТАЛО:
<div className="mx-auto max-w-[80rem] px-4 md:px-6 lg:px-8 h-16 md:h-[4.5rem] flex items-center justify-between">
```

### Шаг 4: (Опционально) Упростить box-sizing reset

```css
/* Файл: src/styles/tailwind.css, строки 185-191 */
/* ❌ БЫЛО: */
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

/* ✅ СТАЛО: можно полностью удалить — Preflight делает это сам */
/* Или оставить только: */
*, *::before, *::after {
  box-sizing: border-box;
}
```

---

## 🔧 Полный исправленный блок base styles в tailwind.css

```css
/* ============================================
 * BASE STYLES (reset)
 * ============================================ */
/* УДАЛИТЬ — Preflight уже содержит box-sizing: border-box */
/* *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; } */

html {
  scroll-behavior: smooth;
  -webkit-text-size-adjust: 100%;
  font-size: 16px;
  background-color: var(--bg-base);
  color-scheme: dark;
  transition:
    background-color 650ms cubic-bezier(0.34, 1.56, 0.64, 1),
    color-scheme 0s;
}

/* ... остальные стили без изменений ... */

/* УДАЛИТЬ весь блок .container {} (строки 566-585) */
/* УДАЛИТЬ весь блок .section {} (строки 587-596) */
```

---

## ✅ Верификация после исправления

```bash
# 1. Собрать проект
npm run build

# 2. Запустить
npm run dev

# 3. Проверить визуально:
# - Header: контейнер центрирован, паддинги 16px/24px/32px по breakpoint'ам
# - BusinessSection карточки: p-8 padding присутствует
# - Секции: вертикальные отступы 96px/128px по breakpoint'ам
# - Нет горизонтального скролла

# 4. Проверить в DevTools:
# - .container класс НЕ должен быть в стилях (или должен быть только Tailwind-версия)
# - box-sizing: border-box применяется от Preflight
```

---

## 📊 Сводка найденных проблем

| # | Проблема | Файл | Строки | Критичность | Статус |
|---|----------|------|--------|-------------|--------|
| 1 | `.container` конфликтует с Tailwind v4 | `tailwind.css` | 566–585 | 🔴 Высокая | Требует исправления |
| 2 | `.section` — неиспользуемый дубликат padding | `tailwind.css` | 587–596 | 🟡 Средняя | Требует удаления |
| 3 | `box-sizing` дублирует Preflight | `tailwind.css` | 185–191 | 🟢 Низкая | Опционально |
| 4 | Header.tsx использует `container` + Tailwind | `Header.tsx` | 45 | 🔴 Высокая | Требует исправления |
