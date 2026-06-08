# AUDIT REPORT — m-internation.kz
**Дата:** 2026-07-06  
**Стек:** Next.js 16.2.7, React 19.2.4, Tailwind CSS v4.3, Framer Motion 12, next-intl  
**Проект:** чистый, билд проходит успешно, 87 TS/TSX файлов, 1 CSS (tailwind.css)

---

## ХИРУРГИЯ (блокеры, красные 🔴)

### 🔴 1. inline style={{}} для статических значений — нарушает Tailwind-подход
**Файлы:**
- `src/app/layout.tsx:125` — `style={{ flex: "1 1 auto" }}` → `className="flex-[1_1_auto]"`
- `src/components/shared/ProductShowcase/ProductShowcase.tsx:89` — `style={{ marginBottom: "2.5rem" }}` → `className="mb-10"`
- `src/components/shared/CertificatesSection/CertificatesSection.tsx:84` — `style={{ color: "var(--fg-primary)" }}` → `className="text-[var(--fg-primary)]"`

### 🔴 2. SEO — Schema.org knowsAbout вместо availableLanguage
**Файл:** `src/app/layout.tsx:84`
```tsx
// ❌
knowsAbout: ["Russian", "English", "Kazakh"],

// ✅
availableLanguage: ["ru", "en", "kk"],
```

### 🔴 3. NoiseOverlay z-index: 9999 перекрывает всё
**Файл:** `src/components/shared/NoiseOverlay/NoiseOverlay.tsx:6`
```tsx
// ❌ z-[9999] — модалки, тултипы, дропдауны будут под шумом
className="... z-[9999] ..."

// ✅ z-[100] — достаточно для фонового эффекта (Header z-[300])
className="... z-[100] ..."
```

### 🔴 4. Snap-scroll CSS классы остались в tailwind.css (нельзя использовать для СНГ)
**Файл:** `src/styles/tailwind.css:753-761`
```css
/* ❌ Удалить полностью — Tesla-style snap scroll НЕ для СНГ аудитории */
.snap-container {
  scroll-snap-type: y mandatory;
  overflow-y: scroll;
  height: 100vh;
}
.snap-section {
  scroll-snap-align: start;
  min-height: 100vh;
}
```

### 🔴 5. split-cta CSS класс в tailwind.css (нельзя использовать для СНГ)
**Файл:** `src/styles/tailwind.css:880-888`
```css
/* ❌ Split-screen CTA — не подходит для СНГ */
.split-cta { ... }
```
**На странице `page.tsx:39` CTA implemented via inline grid — это OK, но `.split-cta` в CSS — мёртвый код.**

---

## ВАЖНОЕ (жёлтые 🟡)

### 🟡 6. letter-spacing negative на кириллице
**Проблема:** `-0.03em` / `-0.04em` на заголовках. Для кириллицы — наложение символов.

| Файло/строка                  | Было              | Стало               |
|-------------------------------|--------------------|---------------------|
| `tailwind.css:809` .editorial-title | `-0.03em`     | `normal`            |
| `tailwind.css:923` .display-l | `-0.04em`          | `normal`            |
| `HeroSectionA.tsx:39` h1       | `tracking-[-0.04em]` | `tracking-normal` |
| `HeroSectionB.tsx:44` h1       | `tracking-[-0.04em]` | `tracking-normal` |
| `HeroSectionC.tsx:41` span     | `tracking-[0.2em]`  | `tracking-[0.08em]` |
| `HeroSectionC.tsx:49` h1       | `tracking-[-0.04em]` | `tracking-normal` |
| `HeroSection.tsx:135` h1       | `tracking-[-0.03em]` | `tracking-normal` |
| `CertificatesSection.tsx:113` p| `tracking-[0.15em]` | `tracking-[0.08em]` |
| Все `tracking-[0.12em]` — uppercase бейджи | `tracking-[0.12em]` | `tracking-[0.05em]` |
| `page.tsx:45` h2              | `tracking-[-0.02em]` | `tracking-normal` |
| `page.tsx:63` p (uppercase)   | `tracking-[0.15em]` | `tracking-[0.06em]` |

**Правило:** На кириллице — `letter-spacing: normal` или максимум `0.02em`. Никогда negative.

### 🟡 7. line-height заголовков < 1.1 (плохо для кириллицы)
| Файл/строка                        | Было    | Стando |
|------------------------------------|---------|--------|
| `HeroSectionA.tsx:39` h1           | `1.05`  | `1.1`  |
| `HeroSectionB.tsx:44` h1           | `1.05`  | `1.1`  |
| `HeroSectionC.tsx:49` h1           | `1.05`  | `1.1`  |
| `HeroSection.tsx:135` (.display-l) | `1.05`  | `1.1`  |
| `tailwind.css:809` .editorial-title| `1.05`  | `1.15` |
| `tailwind.css:923` .display-l      | `1.05`  | `1.1`  |
| Страницы about/business/catalog/contacts `h1` | `0.95` | `1.1` |

**Правило:** Для кириллицы line-height заголовков ≥ `1.1`. `0.95` — символы накладываются.

### 🟡 8. Uppercase + wide tracking на кириллице
**Файлы:**
- `ProductCard.tsx:18` — `uppercase tracking-[0.12em]` → `uppercase tracking-[0.04em]`
- `ProductGrid.tsx:20` h2 — `tracking-[-0.02em]` → `tracking-normal`
- `Badge.tsx:44` — `uppercase tracking-[0.12em]` → `uppercase tracking-[0.05em]`

### 🟡 9. CTA Section — split screen на главной
**Файл:** `src/app/[locale]/page.tsx:38-68`
Сейчас: двухколоночный CTA (`grid-cols-1 lg:grid-cols-2 min-h-[60vh]`).  
**Для СНГ:** заменить на одноколоночный: один блок `py-16 md:py-24`, заголовок `text-2xl md:text-3xl`.
```tsx
// ❌ Было
<div className="grid grid-cols-1 lg:grid-cols-2 min-h-[60vh]">

// ✅ Стало
<section className="py-16 md:py-24 bg-[var(--accent-primary)]">
  <div className="mx-auto max-w-[80rem] px-4 md:px-6 lg:px-8 text-center">
    <h2 className="font-heading font-semibold text-2xl md:text-3xl text-white mb-5">
      {t("cta.title")}
    </h2>
    <p className="font-body text-base text-white/80 mb-8 max-w-[28rem] mx-auto">
      {t("cta.description")}
    </p>
    <Link href={`/${locale}/contacts`} className="...">
      {t("cta.contact")}
    </Link>
  </div>
</section>
```

### 🟡 10. ProductShowcase — GSAP horizontal scroll может ломаться при resize
**Файл:** `src/components/shared/ProductShowcase/ProductShowcase.tsx:42-63`
`invalidateOnRefresh: true` есть, но нет дебаунса при window resize. Добавить:
```ts
// После ScrollTrigger.create добавить:
const onResize = () => ScrollTrigger.refresh();
window.addEventListener("resize", onResize);
return () => window.removeEventListener("resize", onResize);
```

### 🟡 11. HeroSection — неиспользуемые варианты B и C
**Файлы:**
- `src/components/shared/HeroSection/HeroSectionB.tsx`
- `src/components/shared/HeroSection/HeroSectionC.tsx`

`index.ts` экспортирует A и default (`HeroSection.tsx`). B и C — неиспользуемые. Удалить файлы и убрать экспорты или оставить только если планируются.

---

## МЕЛОЧИ (зелёные 🟢)

### 🟢 12. editorial-title gradient — gradient text антипаттерн
**Файл:** `tailwind.css:804-814`
```css
/* ⚠️ Градиентный текст — антипаттерн по impeccable skill */
.editorial-title.gradient {
  background: linear-gradient(...);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
```
Не криминнально, но лучше заменить на сплошной цвет `var(--accent-primary)`.

### 🟢 13. glass-card hover — transform conflict
**Файл:** `tailwind.css` `.glass-card:hover` — `transform: translateY(-2px)` + `box-shadow`. OK, но проверить на слабых устройствах. Добавить `will-change: transform` только на десктопе.

### 🟢 14. Изображения next/image
В HeroSectionA: `priority` — OK для LCP изображения.
В CertificatesSection: `width={80} height={80}` — маленькие, OK.
В ProductShowcase: `width={400} height={400}` — большие, нет `priority`, OK.

### 🟢 15. LenisProvider — проверка устройства
`LenisProviderClient.tsx` — корректно отключается на touch/low-end/prefers-reduced-motion. OK.

### 🟢 16. robots.ts / sitemap.ts
robots.ts — корректно. sitemap.ts — корректно, один URL, alternates через Next.js. OK.

### 🟢 17. a11y-замечания
- `aria-label` на мобильной кнопке меню — OK ✅
- `aria-expanded` — OK ✅
- `aria-controls="mobile-menu"` — OK ✅
- `role="navigation"` + `aria-label="Main navigation"` в Header — OK ✅  
- `role="contentinfo"` в Footer — OK ✅
- `aria-labelledby` на секциях — OK ✅
- `aria-hidden="true"` на декоративных элементах — OK ✅
- HeroSectionA: `aria-labelledby="hero-title"` — OK ✅

**Нет skip-link:** Добавить в layout.tsx перед `<Header />`:
```tsx
<a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[10000] focus:bg-[var(--accent-primary)] focus:text-white focus:px-4 focus:py-2 focus:rounded">
  {locale === "ru" ? "Перейти к содержимому" : "Skip to content"}
</a>
```

---

## СВОДНАЯ ТАБЛИЦА

| #  | Severity | Проблема | Файлы |
|----|----------|----------|-------|
| 1  | 🔴 Высокая | inline styles вместо Tailwind | layout.tsx, ProductShowcase.tsx, CertificatesSection.tsx |
| 2  | 🔴 Высокая | Schema.org knowsAbout → availableLanguage | layout.tsx:84 |
| 3  | 🔴 Высокая | NoiseOverlay z-index: 9999 | NoiseOverlay.tsx:6 |
| 4  | 🔴 Высокая | Snap-scroll CSS (нельзя для СНГ) | tailwind.css:753 |
| 5  | 🔴 Высокая | Split-cta CSS мёртвый код | tailwind.css:880 |
| 6  | 🟡 Средняя | Negative letter-spacing на кириллице | 10+ файлов |
| 7  | 🟡 Средняя | line-height < 1.1 на заголовках | 7+ файлов |
| 8  | 🟡 Средняя | Uppercase + wide tracking на кириллице | ProductCard, Badge |
| 9  | 🟡 Средняя | Split-screen CTA (не для СНГ) | page.tsx:38 |
| 10 | 🟡 Средняя | GSAP resize дебаунс | ProductShowcase.tsx |
| 11 | 🟡 Средняя | HeroSectionB/C неиспользуемые | HeroSectionB.tsx, HeroSectionC.tsx |
| 12 | 🟢 Низкая | Gradient text антипаттерн | tailwind.css |
| 13 | 🟢 Низкая | glass-card will-change | tailwind.css |
| 14 | 🟢 Низкая | Нет skip-link для a11y | layout.tsx |
| 15 | ✅ OK    | LenisProvider device check | ✅ |
| 16 | ✅ OK    | robots.ts / sitemap.ts | ✅ |
| 17 | ✅ OK    | ARIA, aria-label, role в основном OK | ✅ |

---

## РЕКОМЕНДУЕМЫЙ ПОРЯДОК ИСПРАВЛЕНИЙ

**Фаза 1 — Блокеры (1-2 часа):**
1. Убрать snap-scroll и split-cta из tailwind.css
2. Исправить NoiseOverlay z-index → 100
3. Исправить Schema.org knowsAbout → availableLanguage
4. Заменить inline styles на Tailwind классы

**Фаза 2 — СНГ-адаптация (2-3 часа):**
5. Убрать negative letter-spacing везде (→ normal)
6. Поднять line-height заголовков до 1.1+
7. Сузить tracking на uppercase бейджах
8. Заменить split-screen CTA на одноколоночный

**Фаза 3 — Полировка (1 час):**
9. Добавить skip-link в layout.tsx
10. Добавить GSAP resize дебаунс
11. Удалить HeroSectionB/C если не используются
