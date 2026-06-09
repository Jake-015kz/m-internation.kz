"use client";

import Link from "next/link";
import Image from "next/image";
import { useLocale } from "next-intl";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
}

const CARD_COLORS: Record<string, string> = {
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
};

function getCardAccent(slug: string) {
  return CARD_COLORS[slug] || "var(--accent-primary)";
}

export function ProductCard({ product }: ProductCardProps) {
  const locale = useLocale();
  const accent = getCardAccent(product.slug);

  return (
    <Link
      href={`/${locale}/catalog/${product.slug}`}
      className="group card-clean flex flex-col p-4 md:p-6 rounded-[var(--radius-lg)] no-underline text-inherit transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer hover:-translate-y-1 relative overflow-hidden"
    >
      {/* Subtle accent glow on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 80% 60% at 50% 0%, ${accent}06 0%, transparent 70%)`,
        }}
      />

      {/* Product Image */}
      <div
        className="aspect-square mb-3 md:mb-4 rounded-[var(--radius-md)] overflow-hidden flex items-center justify-center relative"
        style={{
          background: `linear-gradient(135deg, ${accent}06 0%, var(--bg-surface) 100%)`,
        }}
      >
        {product.images?.[0] ? (
          <Image
            src={product.images[0]}
            alt={product.name}
            width={200}
            height={200}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
          />
        ) : (
          <span
            className="font-heading font-bold text-4xl"
            style={{ color: `${accent}30` }}
          >
            {product.name.charAt(0)}
          </span>
        )}
      </div>

      <div className="flex items-baseline justify-between gap-3 mb-2 relative z-10">
        <h3 className="font-heading font-semibold text-base md:text-lg text-[var(--fg-primary)] leading-[1.1] tracking-[-0.01em]">
          {product.name}
        </h3>
        <span
          className="font-mono text-[0.6rem] font-medium uppercase tracking-[0.04em] flex-shrink-0 px-1.5 py-0.5 rounded-full"
          style={{
            color: accent,
            backgroundColor: `${accent}08`,
          }}
        >
          {product.category}
        </span>
      </div>

      <p className="font-body text-xs md:text-sm leading-[1.5] text-[var(--fg-muted)] mb-3 flex-1 line-clamp-2 relative z-10">
        {product.description}
      </p>

      <div className="flex items-center justify-between pt-3 border-t border-[var(--border-subtle)] relative z-10">
        <div className="flex gap-1.5 flex-wrap">
          {product.certificates.slice(0, 2).map((cert) => (
            <span
              key={cert}
              className="font-mono font-medium text-[0.55rem] uppercase tracking-[0.08em] px-1.5 py-0.5 rounded-full"
              style={{
                color: accent,
                border: `1px solid ${accent}20`,
                backgroundColor: `${accent}08`,
              }}
            >
              {cert}
            </span>
          ))}
        </div>
        <span
          className="text-sm flex-shrink-0 transition-all duration-250 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1"
          style={{ color: accent }}
        >
          →
        </span>
      </div>
    </Link>
  );
}
