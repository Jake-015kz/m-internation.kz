import { Manrope, Onest, DM_Serif_Display } from "next/font/google";

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
