"use client";

import Link from "next/link";
import Image from "next/image";
import { useLocale } from "next-intl";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const locale = useLocale();

  return (
    <Link
      href={`/${locale}/catalog/${product.slug}`}
      className="group card-clean flex flex-col p-6 rounded-[var(--radius-lg)] no-underline text-inherit transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer hover:-translate-y-1"
    >
      {/* Product Image */}
      <div className="aspect-square mb-4 bg-[var(--bg-surface)] rounded-[var(--radius-md)] overflow-hidden flex items-center justify-center">
        {product.images?.[0] ? (
          <Image
            src={product.images[0]}
            alt={product.name}
            width={200}
            height={200}
            className="w-full h-full object-contain"
          />
        ) : (
          <span className="font-heading font-bold text-4xl text-[var(--border)]">
            {product.name.charAt(0)}
          </span>
        )}
      </div>

      <div className="flex items-baseline justify-between gap-4 mb-3">
        <h3 className="font-heading font-semibold text-lg text-[var(--fg-primary)] leading-[1.1] tracking-[-0.01em]">
          {product.name}
        </h3>
        <span className="font-mono text-[0.65rem] font-medium uppercase tracking-[0.12em] text-[var(--fg-muted)] flex-shrink-0">
          {product.category}
        </span>
      </div>

      <p className="font-body text-sm leading-[1.5] text-[var(--fg-muted)] mb-4 flex-1 line-clamp-2">
        {product.description}
      </p>

      <div className="flex items-center justify-between pt-4 border-t border-[var(--border-subtle)]">
        <div className="flex gap-2 flex-wrap">
          {product.certificates.slice(0, 2).map((cert) => (
            <span
              key={cert}
              className="font-mono font-medium text-[0.6rem] text-[var(--accent-primary)] uppercase tracking-[0.1em] px-2 py-0.5 border border-[oklch(0.52_0.14_145/0.15)] rounded-[var(--radius-xs)] bg-[oklch(0.52_0.14_145/0.06)]"
            >
              {cert}
            </span>
          ))}
        </div>
        <span className="text-sm text-[var(--fg-muted)] flex-shrink-0 transition-all duration-250 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1 group-hover:text-[var(--accent-primary)]">
          →
        </span>
      </div>
    </Link>
  );
}
