# CSS Audit Fix Plan — Полный аудит и исправление стилей

## Контекст

После удаления `.container {}`, `.section {}` и `* { margin:0; padding:0 }` из `tailwind.css` стили "слетели". Причина — удаление агрессивного `*` reset оставило элементы без сброса margin/padding, а Tailwind v4 Preflight не покрывает это полностью.

---

## Исправление 1: Мягкий element reset в tailwind.css (КРИТИЧНЫЙ)

**Файл:** `src/styles/tailwind.css`
**Строки:** ~185-186 (после комментария о Preflight)

**Проблема:** После удаления `* { margin:0; padding:0 }` браузерные user-agent стили вернулись к `h1`-`h6`, `p`, `ul`, `ol`, `blockquote`, `figure`, `pre` — появились нежелательные margin'ы.

**Решение:** Заменить комментарий на мягкий reset только для семантических элементов:

```css
/* Заменить комментарий на: */
h1,
h2,
h3,
h4,
h5,
h6,
p,
ul,
ol,
li,
blockquote,
figure,
pre,
dl,
dd {
  margin: 0;
  padding: 0;
}
```

---

## Исправление 2: Добавить недостающие токены шрифтов в @theme (КРИТИЧНЫЙ)

**Файл:** `src/styles/tailwind.css`
**Строки:** ~108-112 (внутри `@theme {}`)

**Проблема:** Компоненты используют классы `font-heading`, `font-body`, `font-mono`, но в `@theme` нет соответствующих `--font-heading`, `--font-body`, `--font-mono`. Есть только `--font-manrope`, `--font-onest`, `--font-jetbrains-mono`.

**Решение:** Добавить семантические алиасы в конец блока `@theme {}`:

```css
@theme {
  /* ... существующие токены ... */

  /* Semantic font aliases */
  --font-heading: var(--font-manrope);
  --font-body: var(--font-onest);
  --font-mono: var(--font-jetbrains-mono);
}
```

---

## Исправление 3: Header.tsx — невалидный cubic-bezier в cn() (СРЕДНИЙ)

**Файл:** `src/components/layout/Header.tsx`
**Строка:** 28

**Проблема:** `cn()` содержит строку `"transition-all duration-[250ms] cubic-bezier(0.4, 0, 0.2, 1)"` — это не валидный Tailwind-класс. `cubic-bezier(...)` не является утилитой Tailwind.

**Решение:** Заменить на валидную Tailwind-утилиту `ease-[cubic-bezier(0.4,0,0.2,1)]`:

```tsx
// Было:
"transition-all duration-[250ms] cubic-bezier(0.4, 0, 0.2, 1)",

// Стало:
"transition-all duration-[250ms] ease-[cubic-bezier(0.4,0,0.2,1)]",
```

---

## Исправление 4: ProductCard.tsx — отсутствует класс `group` (СРЕДНИЙ)

**Файл:** `src/components/shared/ProductCard/ProductCard.tsx`
**Строка:** 12

**Проблема:** На элементе `<Link>` используется `group-hover:translate-x-1` и `group-hover:text-[var(--accent-primary)]` (строка 38), но сам элемент не имеет класса `group`. Без него `group-hover:*` не работает.

**Решение:** Добавить `"group"` в className:

```tsx
// Было:
className =
  "glass-card flex flex-col p-6 rounded-2xl no-underline text-inherit transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer hover:-translate-y-1";

// Стало:
className =
  "group glass-card flex flex-col p-6 rounded-2xl no-underline text-inherit transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer hover:-translate-y-1";
```

---

## Порядок выполнения

1. Исправление 2 (шрифты в @theme) — сначала, чтобы шрифты заработали
2. Исправление 1 (element reset) — критично для корректных отступов
3. Исправление 3 (Header cubic-bezier) — валидность классов
4. Исправление 4 (ProductCard group) — hover-эффекты

---

## Верификация

После всех исправлений:

- Все секции должны иметь правильные отступы (без лишних margin от браузера)
- `font-heading` → Manrope, `font-body` → Onest, `font-mono` → JetBrains Mono
- Header transition работает корректно
- ProductCard hover-эффект со стрелкой → работает
