"use client";

import Link from "next/link";
import Image from "next/image";
import { useLocale } from "next-intl";
import type { Product } from "@/types";
import { getProductAccent } from "@/lib/constants/product-colors";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const locale = useLocale();
  const accent = getProductAccent(product.slug);

  return (
    <Link
      href={`/${locale}/catalog/${product.slug}`}
      className="card-premium-v2 group flex flex-col h-full no-underline text-inherit cursor-pointer"
    >
      {/* Shine accent line */}
      <div className="accent-line" />

      {/* Glow effect on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"
        style={{
          background: `radial-gradient(circle at 50% 30%, ${accent}12 0%, transparent 70%)`,
        }}
        aria-hidden="true"
      />

      {/* Product Image */}
      <div
        className="aspect-square p-4 md:p-6 flex items-center justify-center relative overflow-hidden"
        style={{
          background: `linear-gradient(180deg, ${accent}08 0%, transparent 100%)`,
        }}
      >
        {/* Inner glow on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${accent}15 0%, transparent 70%)`,
          }}
        />

        {product.images?.[0] ? (
          <Image
            src={product.images[0]}
            alt={product.name}
            width={200}
            height={200}
            className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] relative z-10"
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

      <div className="flex flex-col flex-1 px-4 md:px-5 pb-4 md:pb-5 pt-1">
        {/* Category badge */}
        <div className="flex items-center justify-between gap-2 mb-2">
          <span
            className="font-mono font-medium text-[0.55rem] md:text-[0.6rem] uppercase tracking-[0.04em] px-2 py-0.5 rounded-full"
            style={{
              color: accent,
              backgroundColor: `${accent}08`,
              border: `1px solid ${accent}12`,
            }}
          >
            {product.category}
          </span>
        </div>

        <h3 className="font-heading font-semibold text-sm md:text-base text-[var(--fg-primary)] leading-[1.25] tracking-[-0.01em] mb-1.5">
          {product.name}
        </h3>

        <p className="font-body text-xs leading-[1.55] text-[var(--fg-secondary)] mb-3 line-clamp-2 flex-1">
          {product.description}
        </p>

        {/* Certificates + arrow */}
        <div className="flex items-center justify-between pt-3 border-t border-[var(--border-subtle)] mt-auto">
          <div className="flex gap-1.5 flex-wrap">
            {product.certificates.slice(0, 2).map((cert) => (
              <span
                key={cert}
                className="font-mono font-medium text-[0.5rem] md:text-[0.55rem] uppercase tracking-[0.04em] px-1.5 py-0.5 rounded-full"
                style={{
                  color: accent,
                  border: `1px solid ${accent}14`,
                  backgroundColor: `${accent}05`,
                }}
              >
                {cert}
              </span>
            ))}
          </div>
          <span
            className="text-sm flex-shrink-0 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1"
            style={{ color: accent }}
          >
            →
          </span>
        </div>
      </div>
    </Link>
  );
}
