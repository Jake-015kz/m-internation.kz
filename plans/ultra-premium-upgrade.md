# M-International — Ultra-Premium Upgrade Plan

## Текущее состояние проекта

**Стек:** Next.js 16.2.7 + React 19.2.4 + TypeScript 5 + Tailwind CSS 4.3 + SCSS + GSAP 3.15 + Framer Motion 12 + Lenis 1.3 + next-intl 4

**Структура:** 34 компонента, 14 SCSS-модулей, 5 страниц, 3 локали (ru/en/kk), 13 продуктов

---

## Критические проблемы

### 1. Двойная система стилей (SCSS + Tailwind)

- Tailwind CSS 4 установлен, но 95% стилей — SCSS
- Тройное дублирование цветов: SCSS vars → CSS custom properties → Tailwind @theme
- SCSS-модули не поддерживают tree-shaking

### 2. Неиспользуемые SCSS-файлы

- `Header.module.scss` — 353 строки мёртвого кода (компонент использует Tailwind inline)
- `LayoutContext.tsx` — создан, но ни один компонент его не использует

### 3. Производительность

- Нет `next/image` — везде `<img>` без оптимизации
- Нет dynamic import для ClickSpark и NoiseOverlay
- GSAP + Framer Motion одновременно (~80KB gzip)
- Дублирование данных продуктов в ProductShowcase.tsx

### 4. SEO

- Нет Product schema.org
- Нет hreflang в sitemap
- Нет generateMetadata для корневой страницы

---

## Фаза 1: Аудит и подготовка

### Шаг 1.1 — Удаление неиспользуемого SCSS

```bash
rm src/components/layout/Header.module.scss
```

### Шаг 1.2 — Удаление неиспользуемого контекста

```bash
rm src/contexts/LayoutContext.tsx
rm src/contexts/index.ts
```

### Шаг 1.3 — Маппинг SCSS → Tailwind

| SCSS миксин               | Tailwind эквивалент                                                                                                                                                                                      |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `@include container`      | `mx-auto max-w-[80rem] px-4 md:px-6 lg:px-8`                                                                                                                                                             |
| `@include heading-1`      | `font-heading text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-[0.95] tracking-[-0.04em]`                                                                                                            |
| `@include button-primary` | `inline-flex items-center justify-center bg-[var(--accent-primary)] text-[var(--bg-base)] font-semibold px-6 py-3 rounded-[0.375rem] hover:scale-[1.02] active:scale-[0.98] transition-all duration-250` |
| `@include liquid-glass`   | `bg-white/[0.08] backdrop-blur-[10px] border border-white/[0.1] shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_8px_32px_rgba(0,0,0,0.3)]`                                                                |
| `@include respond-to(md)` | `md:` префикс                                                                                                                                                                                            |

---

## Фаза 2: Миграция SCSS → Tailwind CSS 4

### Шаг 2.1 — Расширение Tailwind theme

Добавить в `src/styles/tailwind.css`:

```css
@theme {
  /* Fluid typography */
  --text-fluid-xs: clamp(0.65rem, 0.02vw + 0.64rem, 0.7rem);
  --text-fluid-sm: clamp(0.75rem, 0.05vw + 0.73rem, 0.8rem);
  --text-fluid-base: clamp(0.875rem, 0.1vw + 0.84rem, 1rem);
  --text-fluid-lg: clamp(1rem, 0.15vw + 0.94rem, 1.125rem);
  --text-fluid-xl: clamp(1.125rem, 0.2vw + 1.05rem, 1.25rem);
  --text-fluid-2xl: clamp(1.375rem, 0.35vw + 1.24rem, 1.625rem);
  --text-fluid-3xl: clamp(1.75rem, 0.55vw + 1.53rem, 2.25rem);
  --text-fluid-4xl: clamp(2.25rem, 0.85vw + 1.91rem, 3rem);
  --text-fluid-5xl: clamp(3rem, 1.3vw + 2.48rem, 4rem);
  --text-fluid-6xl: clamp(3.75rem, 1.9vw + 2.99rem, 5.25rem);
  --text-fluid-7xl: clamp(4.5rem, 2.5vw + 3.5rem, 6.5rem);
  --text-fluid-8xl: clamp(5.5rem, 3.2vw + 4.22rem, 8rem);

  /* Z-index */
  --z-base: 0;
  --z-dropdown: 100;
  --z-sticky: 200;
  --z-fixed: 300;
  --z-overlay: 400;
  --z-modal: 500;
  --z-tooltip: 600;

  /* Easing */
  --ease-expo: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);

  /* Durations */
  --duration-fast: 150ms;
  --duration-base: 250ms;
  --duration-slow: 400ms;
  --duration-slower: 800ms;
}
```

### Шаг 2.2 — Tailwind utilities для эффектов

Добавить в `src/styles/tailwind.css`:

```css
@utility liquid-glass {
  background: linear-gradient(
    135deg,
    oklch(1 0 0 / 0.08) 0%,
    oklch(1 0 0 / 0.02) 100%
  );
  border: 1px solid oklch(1 0 0 / 0.1);
  box-shadow:
    inset 0 1px 0 oklch(1 0 0 / 0.15),
    0 8px 32px oklch(0 0 0 / 0.3);
  backdrop-filter: blur(10px) saturate(150%);
  -webkit-backdrop-filter: blur(10px) saturate(150%);
  transition: all 250ms cubic-bezier(0.16, 1, 0.3, 1);
  &:hover {
    border-color: oklch(1 0 0 / 0.16);
    box-shadow:
      inset 0 1px 0 oklch(1 0 0 / 0.2),
      0 12px 40px oklch(0 0 0 / 0.35);
  }
  @media (max-width: 767px) {
    background: var(--bg-surface);
    -webkit-backdrop-filter: none;
    backdrop-filter: none;
  }
}

@utility liquid-glass-subtle {
  background: linear-gradient(
    135deg,
    oklch(1 0 0 / 0.05) 0%,
    oklch(1 0 0 / 0.01) 100%
  );
  border: 1px solid oklch(1 0 0 / 0.06);
  box-shadow:
    inset 0 1px 0 oklch(1 0 0 / 0.1),
    0 4px 16px oklch(0 0 0 / 0.2);
  backdrop-filter: blur(8px) saturate(130%);
  -webkit-backdrop-filter: blur(8px) saturate(130%);
}

@utility liquid-glass-strong {
  background: linear-gradient(
    135deg,
    oklch(1 0 0 / 0.12) 0%,
    oklch(1 0 0 / 0.04) 100%
  );
  border: 1px solid oklch(1 0 0 / 0.14);
  box-shadow:
    inset 0 1px 0 oklch(1 0 0 / 0.2),
    inset 0 -1px 0 oklch(0 0 0 / 0.1),
    0 16px 48px oklch(0 0 0 / 0.4);
  backdrop-filter: blur(12px) saturate(160%);
  -webkit-backdrop-filter: blur(12px) saturate(160%);
}

@utility text-gradient-lime {
  background: linear-gradient(
    135deg,
    var(--accent-primary) 0%,
    var(--accent-gold) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

@utility glow-lime {
  box-shadow:
    0 0 20px oklch(0.82 0.22 135 / 0.3),
    0 0 40px oklch(0.82 0.22 135 / 0.1);
}

@utility glow-lime-strong {
  box-shadow:
    0 0 30px oklch(0.82 0.22 135 / 0.5),
    0 0 60px oklch(0.82 0.22 135 / 0.2),
    0 0 90px oklch(0.82 0.22 135 / 0.1);
}

@utility text-glow-lime {
  text-shadow:
    0 0 20px oklch(0.82 0.22 135 / 0.5),
    0 0 40px oklch(0.82 0.22 135 / 0.2);
}

@utility animate-float {
  animation: float 6s ease-in-out infinite;
}

@utility animate-pulse-glow {
  animation: pulse-glow 2s ease-in-out infinite;
}

@utility animate-marquee {
  animation: marquee 24s linear infinite;
}

@utility section-spacing {
  padding-top: 5rem;
  padding-bottom: 5rem;
  @media (min-width: 768px) {
    padding-top: 8rem;
    padding-bottom: 8rem;
  }
}

@utility hover-lift {
  transition: transform 500ms cubic-bezier(0.34, 1.56, 0.64, 1);
  &:hover {
    transform: translateY(-4px) scale(1.02);
  }
}

@utility hover-glow {
  transition: box-shadow 250ms cubic-bezier(0.16, 1, 0.3, 1);
  &:hover {
    box-shadow:
      0 0 15px oklch(from var(--accent-primary) l c h / 0.2),
      0 0 30px oklch(from var(--accent-primary) l c h / 0.1);
  }
}

@utility press-scale {
  &:active {
    transform: scale(0.97);
    transition-duration: 100ms;
  }
}

@utility smooth-underline {
  position: relative;
  &::after {
    content: "";
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 2px;
    background: var(--accent-primary);
    transition: width 250ms cubic-bezier(0.16, 1, 0.3, 1);
  }
  &:hover::after {
    width: 100%;
  }
}

@utility focus-ring {
  &:focus-visible {
    outline: 2px solid var(--accent-primary);
    outline-offset: 2px;
  }
}

@utility reveal-up {
  animation: fade-up linear both;
  animation-timeline: view();
  animation-range: entry 0% cover 25%;
}

@utility reveal-scale {
  animation: scale-in linear both;
  animation-timeline: view();
  animation-range: entry 0% cover 30%;
}

@utility reveal-left {
  animation: slide-left linear both;
  animation-timeline: view();
  animation-range: entry 0% cover 30%;
}

@utility reveal-right {
  animation: slide-right linear both;
  animation-timeline: view();
  animation-range: entry 0% cover 30%;
}
```

### Шаг 2.3 — Порядок миграции компонентов

1. UI-компоненты (Badge, Button, Card, Accordion, SocialIcon)
2. Layout (Footer)
3. Секции (ProductCard, ProductGrid, CertificatesSection)
4. HeroSection + ProductShowcase + BusinessSection + AboutSection

### Шаг 2.4 — Пример миграции: Badge

```tsx
// src/components/ui/Badge/Badge.tsx
import { cn } from "@/lib/utils";

const variantStyles = {
  primary: "bg-[var(--fg-primary)] text-[var(--bg-base)]",
  outline:
    "bg-transparent border border-[var(--border)] text-[var(--fg-primary)]",
  lime: "bg-[oklch(0.82_0.22_135/0.1)] text-[var(--accent-primary)] border border-[oklch(0.82_0.22_135/0.2)]",
  default:
    "bg-transparent text-[var(--fg-muted)] border border-[var(--border-subtle)]",
} as const;

const sizeStyles = {
  xs: "text-[0.6rem] px-1.5 py-0.5",
  sm: "text-xs px-2 py-0.5",
  md: "text-sm px-3 py-1",
} as const;

interface BadgeProps {
  variant?: keyof typeof variantStyles;
  size?: keyof typeof sizeStyles;
  className?: string;
  children: React.ReactNode;
}

export function Badge({
  variant = "default",
  size = "sm",
  className,
  children,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center font-mono font-semibold rounded-[0.375rem] uppercase tracking-[0.12em] whitespace-nowrap",
        variantStyles[variant],
        sizeStyles[size],
        className,
      )}
    >
      {children}
    </span>
  );
}
```

### Шаг 2.5 — Удаление SCSS после полной миграции

```bash
rm -rf src/styles/utils/
rm -rf src/styles/base/
rm src/styles/globals.scss
```

---

## Фаза 3: Рефакторинг структуры папок

### Шаг 3.1 — Новая структура

```
src/
├── app/
│   ├── layout.tsx
│   ├── robots.ts
│   ├── sitemap.ts
│   └── [locale]/
│       ├── layout.tsx
│       ├── page.tsx
│       ├── about/page.tsx
│       ├── business/page.tsx
│       ├── catalog/
│       │   ├── page.tsx
│       │   └── [slug]/page.tsx
│       └── contacts/page.tsx
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── LanguageSwitcher.tsx
│   │   └── ThemeSwitcher.tsx
│   ├── sections/
│   │   ├── Hero/
│   │   │   ├── HeroSection.tsx
│   │   │   └── HeroSection.client.tsx
│   │   ├── Certificates/
│   │   ├── About/
│   │   ├── Business/
│   │   └── ProductShowcase/
│   ├── products/
│   │   ├── ProductCard.tsx
│   │   ├── ProductGrid.tsx
│   │   └── FloatingProduct.tsx
│   ├── ui/
│   │   ├── Button/
│   │   ├── Badge/
│   │   ├── Card/
│   │   ├── Accordion/
│   │   └── SocialIcon/
│   └── effects/
│       ├── ClickSpark.tsx
│       ├── NoiseOverlay.tsx
│       ├── CursorFollower.client.tsx
│       └── LenisProvider.tsx
├── lib/
│   ├── utils.ts
│   ├── fonts.ts
│   ├── animations.ts
│   └── constants/
├── hooks/
├── data/
│   └── products.ts
├── types/
│   └── index.ts
├── i18n/
├── messages/
└── styles/
    └── tailwind.css
```

### Шаг 3.2 — Разделение сервер/клиент

```tsx
// HeroSection.tsx — серверный
import { HeroAnimations } from "./HeroAnimations.client";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="mx-auto max-w-[80rem] px-4 md:px-6 lg:px-8 w-full">
        <HeroAnimations />
      </div>
    </section>
  );
}
```

### Шаг 3.3 — Path aliases в tsconfig.json

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"],
      "@/components/*": ["./src/components/*"],
      "@/lib/*": ["./src/lib/*"],
      "@/hooks/*": ["./src/hooks/*"],
      "@/data/*": ["./src/data/*"],
      "@/types/*": ["./src/types/*"]
    }
  }
}
```

---

## Фаза 4: Оптимизация производительности

### Шаг 4.1 — next/image

```diff
- <img src="/products/greenmax/main.png" alt="GreenMAX" loading="eager" />
+ <Image
+   src="/products/greenmax/main.png"
+   alt="GreenMAX — Main product of M-International"
+   width={450}
+   height={450}
+   priority
+   className="w-full h-auto object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.4)]"
+ />
```

### Шаг 4.2 — Dynamic imports

```tsx
// src/app/layout.tsx
import dynamic from "next/dynamic";

const ClickSpark = dynamic(() => import("@/components/effects/ClickSpark"), {
  ssr: false,
});
const NoiseOverlay = dynamic(
  () => import("@/components/effects/NoiseOverlay"),
  { ssr: false },
);
```

### Шаг 4.3 — next.config.ts

```ts
const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion", "@gsap/react"],
  },
};
```

### Шаг 4.4 — Убрать дублирование данных продуктов

Удалить локальный массив `products` из `ProductShowcase.tsx`, использовать `src/data/products.ts`.

---

## Фаза 5: Подготовка к ИИ-автоматизации

### Шаг 5.1 — Конвенции (добавить в CLAUDE.md)

```
## Конвенции для ИИ-автоматизации

### Структура компонента
Каждый компонент в своей папке:
  ComponentName/
  ├── ComponentName.tsx       # Основной компонент
  └── index.ts                # Re-export

### Именование
- Компоненты: PascalCase (ProductCard)
- Утилиты: camelCase (formatPrice)
- Константы: UPPER_SNAKE_CASE (API_BASE_URL)
- CSS-переменные: kebab-case (--accent-primary)

### Стилизация
- ТОЛЬКО Tailwind CSS утилити-классы
- Запрещены: inline styles, SCSS модули, CSS файлы
- Для сложных анимаций: GSAP в отдельном .client.tsx файле
- Для вариантов: объект variantStyles с Tailwind классами

### Импорты (порядок)
1. React/Next.js
2. Внешние библиотеки
3. Внутренние (@/components, @/lib, @/hooks)
4. Типы

### Типизация
- Все props через interface с extends
- JSDoc для публичных компонентов
- displayName для forwardRef компонентов
```

### Шаг 5.2 — ESLint-правило против SCSS

```js
// eslint.config.mjs
{
  rules: {
    'no-restricted-imports': ['error', {
      patterns: [{
        group: ['*.module.scss', '*.module.css'],
        message: 'SCSS modules are deprecated. Use Tailwind CSS.',
      }],
    }],
  },
}
```

### Шаг 5.3 — AGENTS.md

Создать файл `AGENTS.md` в корне проекта с контекстом для ИИ-агентов.

---

## Фаза 6: Ultra-Premium анимации и UX-паттерны 2026

### Шаг 6.1 — CSS scroll-driven animations

Заменить Framer Motion `whileInView` на нативные `reveal-up`, `reveal-scale` утилиты.

### Шаг 6.2 — Magnetic Button

```tsx
// src/components/effects/MagneticButton.client.tsx
"use client";
import { useRef } from "react";
import { gsap } from "gsap";

export function MagneticButton({ children, className, ...props }) {
  const ref = useRef<HTMLButtonElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(ref.current, {
      x: x * 0.3,
      y: y * 0.3,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(ref.current, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.3)",
    });
  };

  return (
    <button
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </button>
  );
}
```

### Шаг 6.3 — Cursor Follower

```tsx
// src/components/effects/CursorFollower.client.tsx
"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export function CursorFollower() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if ("ontouchstart" in window) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const moveX = gsap.quickTo(dot, "x", { duration: 0.1, ease: "power3" });
    const moveY = gsap.quickTo(dot, "y", { duration: 0.1, ease: "power3" });
    const moveRingX = gsap.quickTo(ring, "x", {
      duration: 0.3,
      ease: "power3",
    });
    const moveRingY = gsap.quickTo(ring, "y", {
      duration: 0.3,
      ease: "power3",
    });

    const handleMouseMove = (e: MouseEvent) => {
      moveX(e.clientX);
      moveY(e.clientY);
      moveRingX(e.clientX);
      moveRingY(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 bg-[var(--accent-primary)] rounded-full pointer-events-none z-[9999] mix-blend-difference -translate-x-1/2 -translate-y-1/2"
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-10 h-10 border border-[var(--accent-primary)] rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 opacity-50"
      />
    </>
  );
}
```

### Шаг 6.4 — GSAP ScrollTrigger параллакс

```tsx
// HeroParallax.client.tsx
"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function HeroParallax() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const section = sectionRef.current;
    if (!section) return;

    gsap.to(section.querySelector(".parallax-bg"), {
      yPercent: 30,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    gsap.to(section.querySelector(".parallax-content"), {
      yPercent: -15,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden">
      <div className="parallax-bg absolute inset-0" />
      <div className="parallax-content relative z-10">{/* content */}</div>
    </section>
  );
}
```

### Шаг 6.5 — SplitText анимация

```tsx
// src/components/effects/SplitText.client.tsx
"use client";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { SplitText as GSAPSplitText } from "gsap/SplitText";

gsap.registerPlugin(GSAPSplitText);

interface SplitTextProps {
  text: string;
  className?: string;
  animation?: "chars" | "words" | "lines";
}

export function SplitText({
  text,
  className,
  animation = "chars",
}: SplitTextProps) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const split = new GSAPSplitText(ref.current, { type: animation });
    gsap.from(split[animation], {
      y: 100,
      opacity: 0,
      duration: 0.8,
      stagger: 0.02,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ref.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });
    return () => split.revert();
  }, [text, animation]);

  return (
    <h2 ref={ref} className={className}>
      {text}
    </h2>
  );
}
```

### Шаг 6.6 — Bento Grid для сертификатов

```tsx
// CertificatesBento.tsx
export function CertificatesBento() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[120px]">
      <div className="col-span-2 row-span-2 liquid-glass rounded-2xl p-8 flex flex-col justify-center">
        <span className="text-6xl font-mono font-bold text-[var(--accent-primary)]">
          8+
        </span>
        <span className="text-sm uppercase tracking-widest text-[var(--fg-muted)] mt-2">
          Сертификатов
        </span>
      </div>
      {["GMP", "ISO", "HALAL", "FDA", "EAC", "MESTI"].map((cert) => (
        <div
          key={cert}
          className="liquid-glass rounded-xl flex items-center justify-center"
        >
          <span className="text-xs font-mono font-semibold uppercase tracking-widest text-[var(--fg-primary)]">
            {cert}
          </span>
        </div>
      ))}
    </div>
  );
}
```

---

## Фаза 7: Финальная полировка

### Core Web Vitals чеклист

| Метрика | Цель    | Как                                     |
| ------- | ------- | --------------------------------------- |
| LCP     | < 2.5s  | priority на hero-image, preload шрифтов |
| INP     | < 200ms | Debounce scroll, passive listeners      |
| CLS     | < 0.1   | width/height на всех изображениях       |
| FCP     | < 1.8s  | Tailwind JIT, убрать неиспользуемый CSS |

### Product schema.org

```ts
const productSchema: WithContext<Product> = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: product.name,
  description: product.description,
  image: product.images[0],
  brand: { "@type": "Brand", name: "M-International" },
  offers: { "@type": "Offer", availability: "https://schema.org/InStock" },
};
```

---

## Сводный чеклист

```
Фаза 1: Аудит
  ☐ Удалить Header.module.scss
  ☐ Удалить LayoutContext
  ☐ Маппинг SCSS → Tailwind

Фаза 2: SCSS → Tailwind
  ☐ Расширить @theme
  ☐ Создать @utility (liquid-glass, glow, gradient-text, reveal-*)
  ☐ Мигрировать UI-компоненты
  ☐ Мигрировать Layout
  ☐ Мигрировать секции
  ☐ Удалить все .module.scss и globals.scss

Фаза 3: Структура
  ☐ shared/ → sections/ + products/ + effects/
  ☐ Разделить сервер/клиент (.tsx + .client.tsx)
  ☐ Path aliases в tsconfig.json
  ☐ Заменить @shared/ импорты

Фаза 4: Производительность
  ☐ next/image везде
  ☐ Dynamic imports для эффектов
  ☐ next.config.ts оптимизация
  ☐ Убрать дублирование данных продуктов

Фаза 5: ИИ-автоматизация
  ☐ Обновить CLAUDE.md
  ☐ Создать AGENTS.md
  ☐ JSDoc для публичных компонентов
  ☐ ESLint-правило против SCSS

Фаза 6: Ultra-Premium
  ☐ CSS scroll-driven animations
  ☐ MagneticButton
  ☐ CursorFollower
  ☐ GSAP ScrollTrigger параллакс
  ☐ SplitText
  ☐ Bento Grid для сертификатов

Фаза 7: Полировка
  ☐ Core Web Vitals (Lighthouse)
  ☐ Product schema.org
  ☐ Accessibility (axe)
  ☐ Кроссбраузерность
```
