// src/components/shared/ProductGrid/CatalogFilter.tsx
// Server Component — receives all products + current category as props
// Category switching via <Link> (full page navigation, no JS needed)

import Link from "next/link";
import { Suspense } from "react";
import type { Product } from "@/types";
import { CATEGORIES, type CategoryKey } from "@/config/categories";
import { categoryLabels } from "@/config/categories";
import { ProductGrid } from "./ProductGrid";

interface CatalogFilterProps {
  products: Product[];
  locale: string;
  currentCategory?: string;
}

export function CatalogFilter({ products, locale, currentCategory = "all" }: CatalogFilterProps) {
  const activeCategory: CategoryKey = (
    CATEGORIES.some((c) => c.key === currentCategory)
      ? (currentCategory as CategoryKey)
      : "all"
  );

  // Filter synchronously — no async, no server calls
  const filtered = (() => {
    if (activeCategory === "all") return products;
    const cat = CATEGORIES.find((c) => c.key === activeCategory);
    if (!cat?.slugs) return products;
    const slugSet = new Set(cat.slugs);
    return products.filter((p) => slugSet.has(p.slug));
  })();

  // Static labels — categoryLabels are pre-translated in config
  const labels: Record<CategoryKey, string> = {
    all: categoryLabels.all,
    supplements: categoryLabels.supplements,
    personal: categoryLabels.personal,
    lifestyle: categoryLabels.lifestyle,
  };

  const getCount = (key: CategoryKey) => {
    if (key === "all") return products.length;
    const cat = CATEGORIES.find((c) => c.key === key);
    if (!cat?.slugs) return 0;
    return cat.slugs.length;
  };

  const categoryHref = (key: CategoryKey) => {
    const base = `/${locale}/catalog`;
    if (key === "all") return base;
    return `${base}?category=${key}`;
  };

  return (
    <div>
      {/* Filter tabs */}
      <div className="mb-8 md:mb-10">
        <div className="flex flex-wrap gap-2 md:gap-3">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.key;
            return (
              <Link
                key={cat.key}
                href={categoryHref(cat.key)}
                scroll={false}
                className={`
                  inline-flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-2 md:py-2.5 rounded-full
                  font-body text-xs md:text-sm font-medium
                  transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]
                  border no-underline
                  ${
                    isActive
                      ? "bg-[var(--accent-primary)] text-white border-[var(--accent-primary)] shadow-[0_0_16px_oklch(0.78_0.22_135/0.2)]"
                      : "bg-[var(--bg-surface)] text-[var(--fg-secondary)] border-[var(--border)] hover:border-[var(--accent-primary)] hover:text-[var(--fg-primary)]"
                  }
                `}
              >
                <span className="text-[10px] md:text-xs opacity-60">{cat.icon}</span>
                <span>{labels[cat.key]}</span>
                <span className={`text-[10px] ml-0.5 ${isActive ? "text-white/60" : "text-[var(--fg-dim)]"}`}>
                  ({getCount(cat.key)})
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Results count */}
      <div className="flex items-center gap-2 mb-6">
        <span className="font-mono text-[10px] md:text-xs text-[var(--fg-dim)] uppercase tracking-[0.08em]">
          {filtered.length} {filtered.length === 1 ? "product" : "products"}
        </span>
        <div className="flex-1 h-px bg-[var(--border-subtle)]" />
      </div>

      {/* Product grid */}
      {filtered.length > 0 ? (
        <Suspense fallback={<GridSkeleton />}>
          <ProductGrid products={filtered} />
        </Suspense>
      ) : (
        <div className="text-center py-20">
          <p className="font-body text-sm text-[var(--fg-muted)]">
            No products in this category
          </p>
        </div>
      )}
    </div>
  );
}

function GridSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="rounded-2xl bg-[var(--bg-surface)] border border-[var(--border)] animate-pulse"
          style={{ aspectRatio: "0.85" }}
        />
      ))}
    </div>
  );
}
