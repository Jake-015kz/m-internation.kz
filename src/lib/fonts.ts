import { Manrope, Onest, JetBrains_Mono, DM_Serif_Display, Inter } from "next/font/google";

// Display font — DM Serif Display (elegant serif for premium headings)
export const dmSerif = DM_Serif_Display({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-dm-serif",
  weight: ["400"],
});

// Heading font — Manrope (geometric, bold, modern, excellent cyrillic)
export const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-manrope",
  weight: ["400", "500", "600", "700", "800"],
});

// Body font — Onest (clean, warm, great cyrillic)
export const onest = Onest({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-onest",
  weight: ["300", "400", "500", "600", "700"],
});

// Monospace — JetBrains Mono (labels, stats, code)
export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-jetbrains-mono",
  weight: ["400", "500", "600", "700"],
});

// Inter — for premium body text alternative
export const inter = Inter({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
});
