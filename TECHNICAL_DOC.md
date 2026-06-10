# M-Internation.kz — Техническая документация для кодера

**Дата:** 2026-06-10
**Коммит:** `5f12e4f` (main)
**Стек:** Next.js 15.5 + React 19 + TypeScript + Tailwind CSS 4 + next-intl

---

## 1. СТРУКТУРА ПРОЕКТА

```
src/
├── app/
│   ├── layout.tsx          # Root layout (Header, Footer, MobileMenu, Theme)
│   ├── ClientProviders.tsx # Client-side effects (NoiseOverlay, ClickSpark)
│   ├── globals.css         # НЕ ИСПОЛЬЗУЕТСЯ (стили в tailwind.css)
│   └── [locale]/
│       ├── page.tsx        # Главная (Hero + HomeSections)
│       ├── HomeSections.tsx
│       ├── about/page.tsx
│       ├── business/page.tsx
│       ├── catalog/page.tsx
│       ├── catalog/[slug]/page.tsx
│       └── contacts/page.tsx
├── components/
│   ├── layout/             # Header, Footer, MobileMenu, Forms
│   ├── shared/             # Секции и UI-эффекты
│   │   ├── HeroSection/    # HeroSectionA.tsx (основной)
│   │   ├── CertificatesSection/
│   │   ├── ProductShowcase/
│   │   ├── AboutSection/
│   │   ├── BusinessSection/
│   │   ├── ProductCard/
│   │   └── ui/             # Button, Badge, Card, Accordion
│   └── ui/                 # Базовые UI-компоненты
├── data/
│   └── products.ts         # Массив продуктов
├── lib/
│   ├── constants/          # CERTIFICATES, TIMELINE_ITEMS, BUSINESS_STEPS
│   └── fonts.ts            # Manrope + Onest
├── styles/
│   └── tailwind.css        # Все стили (CSS variables + @theme + utilities)
└── i18n/
    └── config.ts           # next-intl конфигурация
```

---

## 2. CSS ARCHITECTURE

### Глобальные переменные
Все цвета в `src/styles/tailwind.css`, строки 10-86:
- `--bg-base`, `--bg-elevated`, `--bg-surface` — фоны
- `--fg-primary`, `--fg-secondary`, `--fg-muted` — текст
- `--accent-primary`, `--accent-gold` — акценты
- `--border`, `--border-subtle` — бордеры
- `--shadow-*`, `--shadow-glow*` — тени

Тёмная тема — default (`:root`), светлая — `[data-theme="light"]`.

### Tailwind @theme
Кастомные токены в `@theme` (строки 163-238):
- Шрифты: `--font-manrope`, `--font-onest`, `--font-jetbrains-mono`
- Цвета: `--color-bg-*`, `--color-fg-*`, `--color-accent-*`
- Радиусы: `--radius-*`
- `ease-expo: cubic-bezier(0.16, 1, 0.3, 1)` — основная easing-функция

### CSS-утилиты
Кастомные `@utility` классы (строки 391-639):
- `.glass` — glassmorphism
- `.glass-card` — карточка для hero-продукта
- `.card-premium` — hover-shine эффект для карточек

---

## 3. СЕКЦИИ (порядок на главной)

1. **HeroSectionA** — hero с продуктом, CTA, stats
2. **CertificatesSection** — бегущая строка сертификатов (marquee)
3. **ProductShowcase** — сетка продуктов (3 колонки)
4. **AboutSection** — таймлайн компании
5. **BusinessSection** — 3 шага бизнеса (регистрация, обучение, доход)
6. **CTA Section** — inline в HomeSections.tsx

---

## 4. МУЛЬТИЗОЧНОСТЬ (next-intl)

Переводы в `messages/{ru,en,kk}.json`.

Использование в компонентах:
```tsx
const t = useTranslations("hero");  // секция hero
const t = useTranslations("products");  // продукты
const t = useTranslations("about");  // о компании
const t = useTranslations("business");  // бизнес
```

Ссылки включают locale: `href={`/${locale}/catalog`}`

---

## 5. ИЗОБРАЖЕНИЯ (Next.js Image)

**Продукты:**
- `/products/greenmax/main.png` — для hero
- `/products/{slug}/1.png` — для карточек

**Сертификаты:**
- `/certificates/certificate-halal-*.png` — сертификаты HALAL
- `/certificates/ajl-license-2025-2030.png` — AJL лицензия

Использовать только `<Image>` из `next/image` с `width`, `height`, `alt`.

---

## 6. ИКОНКИ (lucide-react)

Используемые иконки:
- `Shield`, `Award`, `Leaf`, `BadgeCheck` — CertificatesSection
- `UserPlus`, `GraduationCap`, `TrendingUp`, `ArrowRight` — BusinessSection
- `Droplets`, `Heart`, `Zap`, `Apple` — ProductShowcase
- `Sparkles`, `ArrowRight` — AboutSection

```tsx
import { Shield } from "lucide-react";
<Shield className="w-4 h-4" />
```

---

## 7. ЧТО УЖЕ СДЕЛАНО

- ✅ GSAP и Lenis полностью удалены из кода и package.json
- ✅ HeroSection переработан (компактный, с lead-строкой)
- ✅ CertificatesSection с marquee и fade-эффектами
- ✅ ProductShowcase — сетка вместо горизонтального скролла
- ✅ BusinessSection — 3 колонки с иконками
- ✅ AboutSection — улучшенный таймлайн
- ✅ Все секции используют единый badge-header с lucide-иконками

---

## 8. ЧТО МОЖНО УЛУЧШИТЬ (BACKLOG)

### Приоритет: Высокий
1. **Установить свежие node_modules** после удаления GSAP/Lenis:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   npm run build
   ```

2. **Проверить Vercel деплой** — убедиться что билд проходит

### Приоритет: Средний
3. **Добавить видео-фон в Hero** — вместо статичного градиента
4. **Добавить отзывы клиентов** — новая секция с каруселью
5. **Добавить FAQ секцию** — аккордеон с частыми вопросами
6. **SEO оптимизация** — meta-теги, Open Graph, Schema.org

### Приоритет: Низкий
7. **Анимация при скролле** — через IntersectionObserver (уже есть в секциях)
8. **Lazy loading для изображений** — кроме hero (уже есть `priority`)
9. **PWA поддержка** — manifest, service worker

---

## 9. БИЛД И ДЕПЛОЙ

```bash
# Локальная разработка
npm run dev

# Продакшн билд
npm run build

# Запуск продакшн-сервера
npm start

# Линтинг
npm run lint
```

**Vercel:** Автоматический деплой при push в `main`.
**Node:** >=20.0.0 (указано в engines)

---

## 10. КОНВЕНЦИИ КОДА

- **Стиль:** функциональные компоненты + TypeScript
- **Стилизация:** Tailwind CSS + CSS-переменные (НЕ inline styles где можно избежать)
- **Анимации:** CSS-only (keyframes + transition), НЕ GSAP
- **Изображения:** только через `next/image`
- **Иконки:** только через `lucide-react`
- **i18n:** `useTranslations()` из `next-intl`
- **Доступность:** `aria-labelledby`, `aria-hidden`, `sr-only` где нужно
