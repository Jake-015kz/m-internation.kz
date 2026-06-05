# M-International Landing Page Refactor Plan

## Overview
Complete refactor of the landing page template for M-International premium wellness company with custom Tailwind v4 configuration, typography, and Russian content.

## Design System Changes

### 1. Color Palette (CSS Variables)
```css
:root {
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --card: oklch(0.98 0 0);
  --card-foreground: oklch(0.145 0 0);
  --primary: oklch(0.145 0 0);
  --primary-foreground: oklch(0.92 0.2 128);
  --accent: oklch(0.92 0.2 128);
  --accent-foreground: oklch(0.145 0 0);
  --border: oklch(0.9 0 0);
  --radius: 0.75rem;
  
  /* Custom M-International colors */
  --lime: oklch(0.92 0.2 128);      /* Neon lime accent */
  --charcoal: oklch(0.145 0 0);      /* Dark background */
  --pineapple: oklch(0.9 0.15 90);   /* Warm accent */
  --coconut: oklch(0.95 0.03 90);    /* Light accent */
}

.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  --card: oklch(0.145 0 0);
  --card-foreground: oklch(0.985 0 0);
  --primary: oklch(0.985 0 0);
  --primary-foreground: oklch(0.205 0 0);
  --border: oklch(0.269 0 0);
}
```

### 2. Typography
- **Headlines**: Oswald (Compressed Bold, font-weight: 700) - UPPERCASE, dense, aggressive
- **Body**: Inter (Regular)
- **Stats/Numbers**: JetBrains Mono (Monospace) - for 13+, 8+, 50+, 10K+

### 3. Effects
- Noise overlay animated grain texture
- Glassmorphism with backdrop-filter: blur
- Smooth vertical float animation for product images
- Pulse glow animation on hover for buttons

## Component Changes

### Header
- Brand logo: "M-International"
- Navigation: "Главная", "Продукция", "О компании", "Бизнес", "Контакты"
- Glassmorphism effect with backdrop-filter: blur

### Hero Section
- 2-column grid layout
- Left: Headline "ЗДОРОВЬЕ — ЭТО СТИЛЬ ЖИЗНИ" (Oswald, UPPERCASE)
  - "ЭТО СТИЛЬ ЖИЗНИ" highlighted with neon --lime gradient
- Subtitle: "Инновационные натуральные продукты для вашего здоровья и долголетия от M-International."
- Buttons: "Смотреть каталог" (filled --lime, pulse-glow hover) and "О компании" (outline)
- Right: GreenMAX product image with float animation

### Product Showcase Carousel
- Products: GreenMAX (Antioxidant & Detox), BluMAX (Immunity & Vitality), Ye-Katerina
- Background accent color transitions based on active product

### Certificates Bento Grid
- Title: "МЕЖДУНАРОДНЫЕ СЕРТИФИКАТЫ КАЧЕСТВА"
- 3D Bento Grid layout
- Certificates: GMP, ISO, HALAL, MESTI, FDA, EAC
- Monospace font for badges, thin borders, dark glassmorphic cards

### Business Activation Section
- Title: "НАЧНИТЕ СВОЙ БИЗНЕС С НАМИ"
- 3 steps with neon --lime numbers in Monospace:
  - "01 Регистрация"
  - "02 Обучение"
  - "03 Доход"

### Footer
- Massive background typography "READY TO START?"
- Russian subscription form
- 4-column grid for sitemap links with thin borders

## Animation Requirements
- Lenis smooth scrolling
- Framer Motion interactions
- Click spark effects
- Float animation for product images
- Pulse glow on button hover

## File Structure Changes

### Updated Files
1. `src/styles/utils/_variables.scss` - New color palette
2. `src/styles/utils/_mixins.scss` - New typography mixins
3. `src/styles/globals.scss` - Noise overlay, glassmorphism
4. `src/styles/base/_reset.scss` - Dark mode base
5. `src/styles/base/_typography.scss` - Font hierarchy
6. `src/lib/fonts.ts` - Oswald + JetBrains Mono
7. `src/app/layout.tsx` - Font loading
8. `src/components/layout/Header.tsx` + .module.scss
9. `src/components/shared/HeroSection.tsx` + .module.scss
10. `src/components/shared/CertificatesSection.tsx` + .module.scss
11. `src/components/layout/Footer.tsx` + .module.scss
12. `src/app/page.tsx` + page.module.scss

### New Files
1. `src/components/shared/ProductShowcase.tsx` + .module.scss
2. `src/components/shared/BusinessSection.tsx` + .module.scss
3. `src/components/shared/ClickSpark.tsx` - Click spark effects
4. `src/components/shared/NoiseOverlay.tsx` - Animated grain texture
5. `src/components/shared/FloatingProduct.tsx` - Float animation wrapper
