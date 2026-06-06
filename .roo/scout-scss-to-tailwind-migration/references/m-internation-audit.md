# Глубокий аудит проекта m-internation.kz

> **Дата аудита:** 2026-06-06  
> **Репозиторий:** https://github.com/Jake-015kz/m-internation.kz  
> **Стек:** Next.js 16.2.7, React 19.2.4, TypeScript 5, Tailwind CSS 4.3.0, SCSS (devDep — мигрирован), next-intl 4.13.0, Framer Motion 12, GSAP 15, Lenis 1.3.23  
> **Статус миграции SCSS → Tailwind:** ✅ Завершена (SCSS файлов нет, только `sass` в devDependencies)

---

## 1. АРХИТЕКТУРА ПРОЕКТА

### 1.1 Текущая структура папок

```
m-internation.kz/
├── src/
│   ├── app/                          ← Next.js App Router ✅
│   │   ├── layout.tsx                ← Root layout (НО: нет импорта CSS!)
│   │   ├── [locale]/                 ← Интернационализация (ru/en/kk) ✅
│   │   │   ├── layout.tsx            ← Locale layout (прокидывает children)
│   │   │   ├── page.tsx              ← Главная страница
│   │   │   ├── about/page.tsx        ← О компании
│   │   │   ├── business/page.tsx     ← Бизнес
│   │   │   ├── catalog/
│   │   │   │   ├── page.tsx          ← Каталог список
│   │   │   │   └── [slug]/page.tsx   ← Карточка товара
│   │   │   └── contacts/page.tsx     ← Контакты
│   │   ├── robots.ts                 ← SEO robots.txt ✅
│   │   └── sitemap.ts                ← SEO sitemap.xml ✅
│   ├── components/
│   │   ├── layout/                   ← Header, Footer, LanguageSwitcher, ThemeSwitcher ✅
│   │   ├── shared/                   ← HeroSection, ProductCard, ProductGrid, etc. ✅
│   │   └── ui/                       ← Button, Card, Badge, Accordion, SocialIcon ✅
│   ├── hooks/                        ← useScroll, useMediaQuery, useNavLinks, useSubscription ✅
│   ├── lib/                          ← utils (cn), fonts, animations, constants ✅
│   ├── data/                         ← products.ts (13 продуктов) ✅
│   ├── i18n/                         ← config, request, routing ✅
│   ├── styles/
│   │   └── tailwind.css              ← ⚠️ НЕ ИМПОРТИРУЕТСЯ НИГДЕ!
│   └── types/                        ← index.ts ✅
├── messages/                         ← ru.json, en.json, kk.json ✅
├── output_data/                      ← JSON данные + изображения продуктов
├── plans/                            ← MD файлы с планами редизайна
├── public/                           ← SVG иконки
├── .agents/skills/                   ← Кастомные навыки для ИИ-агентов
├── .kilo/skills/                     ← Kilo навыки
├── .roo/                             ← Roo конфигурация
├── tailwind.config.ts                ← ⚠️ Минимальный, без content для v4
├── postcss.config.mjs                ← ✅ Корректный (@tailwindcss/postcss)
├── next.config.ts                    ← ✅ С next-intl плагином
├── tsconfig.json                     ← ✅ С path aliases (@/*, @ui/*, @shared/*)
├── package.json                      ← ✅ Tailwind 4.3.0, @tailwindcss/postcss 4.3.0
└── vercel.json                       ← ✅ framework: nextjs
```

### 1.2 Оценка архитектуры

| Аспект | Статус | Комментарий |
|--------|--------|-------------|
| **App Router** | ✅ Корректно | Используется `[locale]` для i18n — стандартный паттерн |
| **Path aliases** | ✅ Корректно | `@/*`, `@ui/*`, `@shared/*` — удобно для ИИ-кодера |
| **Barrel exports** | ✅ Корректно | Каждая папка компонентов имеет `index.ts` |
| **i18n** | ✅ Корректно | next-intl с `localePrefix: 'always'` |
| **SEO** | ✅ Корректно | robots.ts, sitemap.ts, Schema.org JSON-LD в layout |
| **Тёмная тема** | ✅ Корректно | `data-theme` атрибут + CSS custom properties |
| **CSS импорт** | ❌ **КРИТИЧНО** | `tailwind.css` не импортируется в layout |
| **Tailwind config** | ⚠️ Устарел | `tailwind.config.ts` с `content` — не нужен в v4 |
| **SCSS остатки** | ⚠️ Мелочь | `sass` в devDependencies, но файлов `.scss` нет |

### 1.3 Рекомендации по улучшению архитектуры

**Для ИИ-кодера — ключевые правила:**

1. **Структура компонентов** — текущая структура хорошая, но нужно добавить:
   - `src/components/sections/` — для секций страниц (уже есть `shared/`, но путаница)
   - `src/components/forms/` — для форм (сейчас Footer содержит форму подписки inline)

2. **Разделение ответственности:**
   - `shared/` — переиспользуемые UI-блоки (Hero, ProductCard, etc.)
   - `ui/` — атомарные компоненты (Button, Badge, Card)
   - `layout/` — Header, Footer, Navigation
   - ❌ Проблема: `shared/` содержит и layout-провайдеры (LenisProvider, NoiseOverlay), и секции, и продуктовые компоненты

3. **Предлагаемая реструктуризация:**
   ```
   src/components/
   ├── layout/           ← Header, Footer, LanguageSwitcher, ThemeSwitcher
   ├── ui/               ← Button, Card, Badge, Accordion, SocialIcon (атомы)
   ├── sections/         ← HeroSection, AboutSection, BusinessSection, CertificatesSection
   ├── products/         ← ProductCard, ProductGrid, ProductShowcase, FloatingProduct
   ├── effects/          ← ClickSpark, NoiseOverlay, LenisProvider
   └── forms/            ← NewsletterForm, ContactForm
   ```

---

## 2. КРИТИЧЕСКИЙ АУДИТ TAILWIND CSS

### 2.1 КРИТИЧЕСКАЯ ПРОБЛЕМА: CSS не импортируется

**Корневая причина, почему стили не применяются:**

Файл `src/styles/tailwind.css` (677 строк) **НИГДЕ не импортируется**. Ни в `src/app/layout.tsx`, ни в `src/app/[locale]/layout.tsx`, ни в любом другом файле.

```bash
# Результат поиска:
$ grep -rn 'import.*tailwind\|import.*styles\|import.*\.css' src/app/ --include='*.tsx'
# → ПУСТО! Нет ни одного импорта CSS.
```

**Это значит:**
- Tailwind CSS вообще не загружается в браузер
- Все 228 использований Tailwind-классов в компонентах — **не работают**
- Всё, что рендерится — это голый HTML без стилей
- Единственные работающие стили — inline `style={{}}` и CSS custom properties через `var(--...)`

### 2.2 Анализ конфигурационных файлов

#### `postcss.config.mjs` — ✅ Корректен

```js
export default {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
```

Для Tailwind v4 это правильная конфигурация. Плагин `@tailwindcss/postcss` обрабатывает `@import "tailwindcss"` в CSS-файле.

#### `tailwind.config.ts` — ⚠️ Устарел для v4

```ts
import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
};
export default config;
```

**Проблема:** В Tailwind v4 конфигурация через `tailwind.config.ts` **устарела**. Вся конфигурация теперь в CSS через `@theme`. Файл `tailwind.config.ts` игнорируется v4 (или вызывает предупреждение).

**Решение:** Удалить `tailwind.config.ts` — вся конфигурация уже в `src/styles/tailwind.css` через `@theme`.

#### `src/styles/tailwind.css` — ✅ Хорош, но не подключен

Файл содержит:
- `@import "tailwindcss"` — ✅ правильный синтаксис v4
- `@source "../**/*.{ts,tsx,js,jsx}"` — ✅ сканирует все исходники
- `@theme { ... }` — ✅ кастомные токены (цвета, шрифты, spacing, etc.)
- CSS custom properties в `:root` и `[data-theme="light"]` — ✅ тёмная/светлая тема
- `@keyframes` — ✅ анимации
- Кастомные CSS-классы (`.liquid-glass`, `.text-gradient-lime`, etc.) — ✅

**Всё отлично, но файл не импортируется!**

### 2.3 Проверка content/source путей

В `tailwind.config.ts` указано:
```
content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"]
```

В `tailwind.css` указано:
```
@source "../**/*.{ts,tsx,js,jsx}"
```

**Анализ:**
- `content` в `tailwind.config.ts` — для v3, в v4 игнорируется
- `@source` в `tailwind.css` — правильный способ для v4
- Путь `"../**/*.{ts,tsx,js,jsx}"` от `src/styles/` → сканирует всё от `src/` и выше — ✅ покрывает все компоненты

### 2.4 Проверка импорта глобальных стилей

**В `src/app/layout.tsx` (root layout):**
```tsx
// ❌ НЕТ импорта CSS!
import { onest, manrope, jetbrainsMono } from "@/lib/fonts";
import { SITE_CONFIG } from "@/lib/constants";
// ... нет import для tailwind.css
```

**В `src/app/[locale]/layout.tsx`:**
```tsx
// ❌ Тоже нет импорта CSS!
import { routing } from "@/i18n/routing";
```

### 2.5 Итоговая диагностика

| Проверка | Статус | Детали |
|----------|--------|--------|
| `tailwind.css` существует | ✅ | 677 строк, полная конфигурация |
| `tailwind.css` импортируется | ❌ | Нигде не импортируется |
| `postcss.config.mjs` корректен | ✅ | `@tailwindcss/postcss` |
| `tailwind.config.ts` нужен | ❌ | Устарел для v4, конфликтует |
| `@source` пути корректны | ✅ | Покрывает все исходники |
| `@theme` токены определены | ✅ | Цвета, шрифты, spacing, etc. |
| CSS custom properties | ✅ | `:root` + `[data-theme="light"]` |
| `@keyframes` определены | ✅ | 12 анимаций |
| Кастомные CSS-классы | ✅ | `.liquid-glass`, `.text-gradient-lime`, etc. |

---

## 3. ПЛАН ДЕЙСТВИЙ ДЛЯ ИИ-КОДЕРА

### МИКРО-ПРОМТ 1: Подключить CSS (КРИТИЧНО)

**Задача:** Импортировать `tailwind.css` в корневой layout.

**Файл:** `src/app/layout.tsx`

**Действие:** Добавить строку импорта в начало файла:

```tsx
import "@/styles/tailwind.css";
```

**Полный исправленный файл `src/app/layout.tsx`:**

```tsx
import "@/styles/tailwind.css";  // ← ДОБАВИТЬ ЭТУ СТРОКУ
import type { Metadata } from "next";
import Script from "next/script";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { onest, manrope, jetbrainsMono } from "@/lib/fonts";
import { SITE_CONFIG } from "@/lib/constants";
import { Header, Footer } from "@/components/layout";
import { NoiseOverlay } from "@shared/NoiseOverlay";
import { ClickSpark } from "@shared/ClickSpark";
import { LenisProvider } from "@shared/LenisProvider/LenisDynamic";

// ... остальной код без изменений
```

**Верификация:**
```bash
npm run build 2>&1 | tail -20
# Должно собраться без ошибок
```

---

### МИКРО-ПРОМТ 2: Удалить устаревший tailwind.config.ts

**Задача:** Удалить `tailwind.config.ts`, т.к. Tailwind v4 использует CSS-first конфигурацию.

**Действие:**
```bash
rm tailwind.config.ts
```

**Верификация:**
```bash
npm run build 2>&1 | grep -i "tailwind\|config"
# Не должно быть ошибок или предупреждений о tailwind.config
```

---

### МИКРО-ПРОМТ 3: Убрать sass из devDependencies

**Задача:** Удалить неиспользуемый пакет `sass`.

**Действие:**
```bash
npm uninstall sass
```

**Верификация:**
```bash
cat package.json | grep -i sass
# Не должно быть упоминаний sass
```

---

### МИКРО-ПРОМТ 4: Проверить работу сборки

**Задача:** Убедиться, что Tailwind работает после исправлений.

**Действие:**
```bash
npm run build 2>&1 | tail -30
```

**Ожидаемый результат:**
- Сборка проходит без ошибок
- Tailwind генерирует CSS с использованными классами
- Нет предупреждений о неиспользуемых конфигурациях

---

### МИКРО-ПРОМТ 5: Визуальная проверка

**Задача:** Запустить dev-сервер и проверить, что стили применяются.

**Действие:**
```bash
npm run dev
# Открыть http://localhost:3000/ru
```

**Чек-визуальной проверки:**
- [ ] Header имеет полупрозрачный фон с blur-эффектом
- [ ] Hero-секция имеет градиентный фон
- [ ] Кнопки имеют зелёный цвет (`--accent-primary`)
- [ ] Текст использует шрифт Manrope/Onest
- [ ] Тёмная тема работает по умолчанию
- [ ] Переключение темы работает (ThemeSwitcher)
- [ ] Анимации работают (float, fade-up, etc.)
- [ ] Мобильное меню открывается/закрывается

---

### МИКРО-ПРОМТ 6: Реструктуризация components (опционально)

**Задача:** Улучшить архитектуру для ИИ-кодера.

**Действия:**

1. Создать новые папки:
```bash
mkdir -p src/components/sections
mkdir -p src/components/products
mkdir -p src/components/effects
mkdir -p src/components/forms
```

2. Переместить компоненты:
```bash
# Секции
mv src/components/shared/HeroSection src/components/sections/
mv src/components/shared/AboutSection src/components/sections/
mv src/components/shared/BusinessSection src/components/sections/
mv src/components/shared/CertificatesSection src/components/sections/

# Продукты
mv src/components/shared/ProductCard src/components/products/
mv src/components/shared/ProductGrid src/components/products/
mv src/components/shared/ProductShowcase src/components/products/
mv src/components/shared/FloatingProduct src/components/products/

# Эффекты
mv src/components/shared/ClickSpark src/components/effects/
mv src/components/shared/NoiseOverlay src/components/effects/
mv src/components/shared/LenisProvider src/components/effects/
```

3. Обновить barrel exports и импорты (массовая замена):
```bash
# Обновить все импорты
find src/ -name "*.tsx" -o -name "*.ts" | xargs sed -i \
  -e 's|@shared/HeroSection|@/components/sections/HeroSection|g' \
  -e 's|@shared/AboutSection|@/components/sections/AboutSection|g' \
  -e 's|@shared/BusinessSection|@/components/sections/BusinessSection|g' \
  -e 's|@shared/CertificatesSection|@/components/sections/CertificatesSection|g' \
  -e 's|@shared/ProductCard|@/components/products/ProductCard|g' \
  -e 's|@shared/ProductGrid|@/components/products/ProductGrid|g' \
  -e 's|@shared/ProductShowcase|@/components/products/ProductShowcase|g' \
  -e 's|@shared/FloatingProduct|@/components/products/FloatingProduct|g' \
  -e 's|@shared/ClickSpark|@/components/effects/ClickSpark|g' \
  -e 's|@shared/NoiseOverlay|@/components/effects/NoiseOverlay|g' \
  -e 's|@shared/LenisProvider|@/components/effects/LenisProvider|g'
```

4. Обновить `tsconfig.json` path aliases:
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"],
      "@ui/*": ["./src/components/ui/*"],
      "@shared/*": ["./src/components/shared/*"],
      "@sections/*": ["./src/components/sections/*"],
      "@products/*": ["./src/components/products/*"],
      "@effects/*": ["./src/components/effects/*"],
      "@forms/*": ["./src/components/forms/*"]
    }
  }
}
```

---

## 4. СВОДНАЯ ТАБЛИЦА ПРОБЛЕМ

| # | Проблема | Критичность | Файл | Решение |
|---|----------|-------------|------|---------|
| 1 | CSS не импортируется | 🔴 КРИТ | `src/app/layout.tsx` | Добавить `import "@/styles/tailwind.css"` |
| 2 | Устаревший tailwind.config.ts | 🟡 Средняя | `tailwind.config.ts` | Удалить файл |
| 3 | sass в devDependencies | 🟢 Низкая | `package.json` | `npm uninstall sass` |
| 4 | Путаница в shared/ components | 🟡 Средняя | `src/components/shared/` | Реструктуризация |
| 5 | page.tsx полностью 'use client' | 🟡 Средняя | `src/app/[locale]/page.tsx` | Вынести клиентскую логику в компоненты |
| 6 | Нет next/image оптимизации | 🟡 Средняя | Все страницы | Заменить `<img>` на `<Image>` |
| 7 | robots.ts/sitemap.ts — неверный домен | 🟡 Средняя | `src/app/robots.ts`, `src/app/sitemap.ts` | `m-international.com` → `m-internation.kz` |

---

## 5. ИСПРАВЛЕННЫЕ ФАЙЛЫ (готовые к применению)

### 5.1 `src/app/layout.tsx` — исправленная версия

```tsx
import "@/styles/tailwind.css";
import type { Metadata } from "next";
import Script from "next/script";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { onest, manrope, jetbrainsMono } from "@/lib/fonts";
import { SITE_CONFIG } from "@/lib/constants";
import { Header, Footer } from "@/components/layout";
import { NoiseOverlay } from "@shared/NoiseOverlay";
import { ClickSpark } from "@shared/ClickSpark";
import { LenisProvider } from "@shared/LenisProvider/LenisDynamic";

function getThemeScript() {
  return `
    (function() {
      try {
        var saved = localStorage.getItem('theme');
        if (saved === 'light' || saved === 'dark') {
          document.documentElement.setAttribute('data-theme', saved);
        } else {
          var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
          document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
        }
      } catch (e) {
        document.documentElement.setAttribute('data-theme', 'dark');
      }
    })();
  `;
}

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "M-International",
  url: SITE_CONFIG.url,
  description: "Международная компания по производству БАДов и оздоровительной продукции",
  foundingDate: "2010",
  address: {
    "@type": "PostalAddress",
    addressCountry: "KZ",
  },
  sameAs: [
    "https://www.instagram.com/m.international",
    "https://www.facebook.com/m.international",
    "https://www.youtube.com/@m.international",
  ],
  knowsAbout: ["Russian", "English", "Kazakh"],
};

export const metadata: Metadata = {
  title: {
    default: SITE_CONFIG.name,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: "M-International — международная компания по производству БАДов и оздоровительной продукции. Инновационные натуральные продукты для вашего здоровья и долголетия.",
  keywords: ["БАДы", "здоровье", "M-International", "MLM", "биодобавки", "велнес", "GreenMAX", "BluMAX", "Ye-Katerina"],
  authors: [{ name: SITE_CONFIG.name }],
  openGraph: {
    type: "website",
    locale: "ru_KZ",
    siteName: SITE_CONFIG.name,
    description: "Инновационные натуральные продукты для вашего здоровья и долголетия от M-International",
  },
  alternates: {
    canonical: "/",
    languages: { ru: "/ru", en: "/en", kk: "/kk" },
  },
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const locale = await getLocale();
  const messages = await getMessages();
  const themeScript = getThemeScript();

  return (
    <html lang={locale} className={`${onest.variable} ${manrope.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <head>
        <Script id="theme-script" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: themeScript }} />
        <Script id="organization-schema" strategy="afterInteractive" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      </head>
      <body className={`${onest.className} antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <LenisProvider>
            <NoiseOverlay />
            <ClickSpark />
            <div className="relative z-10 flex min-h-screen flex-col">
              <Header />
              <main style={{ flex: "1 1 auto" }}>{children}</main>
              <Footer />
            </div>
          </LenisProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
```

### 5.2 `src/app/robots.ts` — исправлен домен

```ts
import { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";

const baseUrl = "https://m-internation.kz";  // ← ИСПРАВЛЕНО: было m-international.com

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/_next/"],
    },
    sitemap: routing.locales.flatMap((locale) => [
      `${baseUrl}/${locale}/sitemap.xml`,
    ]),
  };
}
```

### 5.3 `src/app/sitemap.ts` — исправлен домен

```ts
import { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";

const baseUrl = "https://m-internation.kz";  // ← ИСПРАВЛЕНО: было m-international.com

const pages = ["", "/about", "/business", "/catalog", "/contacts"];

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date();
  return routing.locales.flatMap((locale) =>
    pages.map((page) => ({
      url: `${baseUrl}/${locale}${page}`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: page === "" ? 1 : 0.8,
    })),
  );
}
```

---

## 6. ПОРЯДОК ВЫПОЛНЕНИЯ (для ИИ-кодера)

```
ШАГ 1: Добавить import CSS в layout.tsx        ← КРИТИЧНО
ШАГ 2: Удалить tailwind.config.ts               ← ОЧИСТКА
ШАГ 3: npm uninstall sass                       ← ОЧИСТКА
ШАГ 4: Исправить домен в robots.ts и sitemap.ts ← SEO
ШАГ 5: npm run build                           ← ВЕРИФИКАЦИЯ
ШАГ 6: npm run dev + визуальная проверка       ← ВЕРИФИКАЦИЯ
ШАГ 7: (Опционально) Реструктуризация components
ШАГ 8: (Опционально) Замена <img> на <Image>
```

---

*Аудит выполнен OWL (Nous Research) 2026-06-06. Все файлы проверены напрямую из репозитория.*
