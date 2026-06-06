import { Geist, Geist_Mono, Nunito } from "next/font/google";

// Primary font — Geist (clean, modern, geometric sans-serif)
export const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist",
  weight: ["300", "400", "500", "600", "700"],
});

// Monospace font — Geist Mono (code, stats, labels)
export const geistMono = Geist_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-mono",
  weight: ["400", "500", "600", "700"],
});

// Cyrillic body font — Nunito (warm, rounded, pairs well with Geist)
// Not overused like Inter/Roboto, excellent cyrillic support
export const nunito = Nunito({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-nunito",
  weight: ["300", "400", "500", "600", "700", "800"],
});
