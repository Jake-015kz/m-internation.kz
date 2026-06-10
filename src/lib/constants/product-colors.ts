// Shared product accent colors — single source of truth for product-specific colors
const PRODUCT_ACCENT_COLORS: Record<string, string> = {
  micrystal: "oklch(0.78 0.22 135)",
  greenmax: "oklch(0.55 0.16 155)",
  mimax: "oklch(0.55 0.2 25)",
  blumax: "oklch(0.55 0.16 250)",
  nutrimax: "oklch(0.55 0.14 140)",
  fleximax: "oklch(0.6 0.14 65)",
  machoman: "oklch(0.5 0.15 15)",
  mishroom: "oklch(0.55 0.12 90)",
  "ye-katerina": "oklch(0.6 0.18 340)",
  "mi-mask": "oklch(0.6 0.12 280)",
  "mi-serum": "oklch(0.6 0.12 280)",
  magicare: "oklch(0.55 0.15 200)",
  mifresh: "oklch(0.55 0.15 200)",
  mitown: "oklch(0.5 0.12 40)",
  "essential-oil": "oklch(0.6 0.16 280)",
  relax: "oklch(0.55 0.14 155)",
  miwellness: "oklch(0.55 0.15 135)",
  shaker: "oklch(0.5 0.05 265)",
  lamor: "oklch(0.55 0.14 140)",
  kordymax: "oklch(0.55 0.18 25)",
  promax: "oklch(0.55 0.16 135)",
  ebooster: "oklch(0.55 0.15 250)",
  "chai-relax": "oklch(0.55 0.14 155)",
  "energy-card": "oklch(0.55 0.15 250)",
} as const;

export function getProductAccent(slug: string): string {
  return PRODUCT_ACCENT_COLORS[slug] || "var(--accent-primary)";
}
