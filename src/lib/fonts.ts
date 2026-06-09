import { Manrope, Onest, JetBrains_Mono } from "next/font/google";

// Heading font — Manrope (geometric, bold, modern, excellent cyrillic)
export const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-manrope",
  weight: ["400", "500", "600", "700", "800"],
});

// Body font — Onest (clean, warm, great cyrillic, not overused like Inter)
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
