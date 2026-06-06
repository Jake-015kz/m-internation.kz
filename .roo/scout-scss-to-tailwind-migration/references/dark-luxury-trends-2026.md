# Dark Luxury / Premium Wellness — Design Trend Reference

> Источники: Behance (10K+ projects), Awwwards (480 luxury + 10K+ winning), health/wellness nominees.
> Обновлено: Июнь 2026.

## Тренды 2025-2026 для wellness/health/luxury сайтов

### 1. Dark Luxury — тёмная тема как premium standard

**Паттерн:** Тёмный фон (#0A0A0A → #111111), золотой/изумрудный акцент, огромные шрифты, минимум контента на экране.

```scss
// Глубокий радиальный градиент вместо однотонного фона
body {
  background: radial-gradient(
    ellipse 80% 50% at 50% -20%,
    oklch(0.15 0.03 135),
    oklch(0.06 0.01 265)
  );
}
```

### 2. Editorial Typography — типографика как главный элемент

**Паттерн:** Огромные заголовки (clamp(3rem, 10vw, 12rem)), минимальный контраст между заголовком и подзаголовком.

```scss
.heroTitle {
  font-weight: 700;
  font-size: clamp(3.5rem, 9vw, 8rem);
  line-height: 0.95;
  letter-spacing: -0.03em;
  
  &.gradient {
    background: linear-gradient(135deg, oklch(0.82 0.22 135), oklch(0.9 0.15 135));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}
```

### 3. Glassmorphism 2.0 — многослойное стекло

**Паттерн (Explora Journeys, MomoAmo, Parallel Universe):**

```scss
.glassCard {
  background: oklch(1 0 0 / 0.03);
  backdrop-filter: blur(40px) saturate(150%);
  border: 1px solid oklch(1 0 0 / 0.08);
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, oklch(1 0 0 / 0.12) 0%, transparent 50%);
    pointer-events: none;
  }
  
  &:hover {
    background: oklch(1 0 0 / 0.06);
    border-color: oklch(1 0 0 / 0.15);
    transform: translateY(-2px);
    box-shadow: 0 20px 60px oklch(0 0 0 / 0.4);
  }
}
```

### 4. Product as Hero — продукт вместо текста

**Паттерн:** На главном экране — 3D-фото продукта с параллаксом, текст минимальный поверх.

### 5. Snap-scroll Storytelling (Tesla-style)

**Паттерн:** Каждая секция = полный экран, скролл перелистывает.

```scss
.pageWrapper {
  scroll-snap-type: y mandatory;
  overflow-y: scroll;
  height: 100vh;
}

.section {
  scroll-snap-align: start;
  min-height: 100vh;
}
```

### 6. Animated Number Counters

**Паттерн:** Анимированные счётчики при попадании в viewport. Критично для MLM/corporate.

### 7. Bento Grid Layouts

**Тренд #1 на Behance 2025:** Асимметричные bento-сетки для каталогов.

### 8. Letter-by-Letter Text Reveal

**Тренд с Awwwards SOTD:** Пословное появление текста при скролле.

### 9. Split Screen CTA

**Паттерн:** Финальное предложение — два столбца (текст + изображение).

### 10. Magnetic Buttons + Cursor Glow

**Паттерн:** Кнопки притягиваются к курсору, мягкое свечение за курсором (desktop only).

## Цветовые тренды 2025-2026

| Тренд | Где видел | Применение |
|-------|-----------|------------|
| Deep forest + gold | Explora Journeys, Venetian Nail Spa | `oklch(0.65 0.15 145)` |
| Warm white backgrounds | MomoAmo, Iris K | Кремовый `#F5F0EB` для light theme |
| Iridescent gradients | Cartier 2026, Rabanne | Linear gradient для CTA |
| Bento grid layouts | Awwwards Nominees | Асимметричная сетка каталога |
