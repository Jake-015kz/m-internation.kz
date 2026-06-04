import { Onest, Manrope, JetBrains_Mono } from 'next/font/google';

// Body text font — Onest (clean, modern, supports cyrillic)
export const onest = Onest({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  variable: '--font-onest',
  weight: ['300', '400', '500', '600', '700'],
});

// Heading font — Manrope (elegant, geometric, premium, supports cyrillic)
export const manrope = Manrope({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  variable: '--font-manrope',
  weight: ['400', '500', '600', '700', '800'],
});

// Monospace font — JetBrains Mono (code, stats, supports cyrillic)
export const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  variable: '--font-mono',
  weight: ['400', '500', '600', '700'],
});
