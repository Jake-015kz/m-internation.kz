// src/components/shared/ProductGrid/CatalogFilter.tsx
"use client";

import { useState, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import { ProductGrid } from "./ProductGrid";
import {
  filterProductsByCategory,
  type CategoryKey,
} from "@/services/catalogService";
import { CATEGORIES, categoryLabels } from "@/services/catalogService";
import type { Product } from "@/types";

export function CatalogFilter() {
  const [activeCategory, setActiveCategory] = useState<CategoryKey>("all");
  const [filtered, setFiltered] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const t = useTranslations("footer");

  const loadProducts = useCallback(async (category: CategoryKey) => {
    setLoading(true);
    setError(null);
    try {
      const result = await filterProductsByCategory(category);
      if (!result || !Array.isArray(result)) {
        setError("No products found — result is not an array");
        setFiltered([]);
      } else {
        setFiltered(result);
      }
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : JSON.stringify(e);
      console.error("[CatalogFilter] loadProducts error:", msg);
      setError(msg);
      setFiltered([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProducts(activeCategory);
  }, [activeCategory, loadProducts]);

  const handleCategoryChange = useCallback((key: CategoryKey) => {
    setActiveCategory(key);
  }, []);

  // Synchronous count for all categories (use static data)
  const getCount = (key: CategoryKey) => {
    if (key === "all") return filtered.length;
    const cat = CATEGORIES.find(c => c.key === key);
    if (!cat?.slugs) return 0;
    return cat.slugs.length;
  };

  const labels: Record<CategoryKey, string> = {
    all: t("allProducts"),
    supplements: categoryLabels.supplements,
    personal: categoryLabels.personal,
    lifestyle: categoryLabels.lifestyle,
  };

  return (
    <div>
      {/* Error banner */}
      {error && (
        <div className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-left">
          <p className="font-mono text-xs text-red-400 font-semibold mb-1">DEBUG ERROR:</p>
          <p className="font-mono text-sm text-red-300 break-all">{error}</p>
        </div>
      )}

      {/* Filter tabs */}
      <div className="mb-8 md:mb-10">
        <div className="flex flex-wrap gap-2 md:gap-3">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`
                inline-flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-2 md:py-2.5 rounded-full
                font-body text-xs md:text-sm font-medium
                transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]
                border
                ${
                  activeCategory === cat.key
                    ? "bg-[var(--accent-primary)] text-white border-[var(--accent-primary)] shadow-[0_0_16px_oklch(0.78_0.22_135/0.2)]"
                    : "bg-[var(--bg-surface)] text-[var(--fg-secondary)] border-[var(--border)] hover:border-[var(--accent-primary)] hover:text-[var(--fg-primary)]"
                }
              `}
            >
              <span className="text-[10px] md:text-xs opacity-60">{cat.icon}</span>
              <span>{labels[cat.key]}</span>
              <span className={`text-[10px] ml-0.5 ${activeCategory === cat.key ? "text-white/60" : "text-[var(--fg-dim)]"}`}>
              ({getCount(cat.key)})
              </span>
            </button>
          ))}
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
        <ProductGrid products={filtered} />
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
