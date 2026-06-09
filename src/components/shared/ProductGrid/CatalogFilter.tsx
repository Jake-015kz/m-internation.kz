"use client";

import { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import { products } from "@/data/products";
import { ProductGrid } from "./ProductGrid";

const CATEGORIES = [
  { key: "all", icon: "⊕" },
  { key: "supplements", icon: "◆", slugs: ["micrystal","greenmax","mimax","blumax","nutrimax","fleximax","machoman","mishroom","lamor","kordymax","promax"] },
  { key: "personal", icon: "◈", slugs: ["ye-katerina","mi-mask","mi-serum","magicare","mifresh"] },
  { key: "lifestyle", icon: "●", slugs: ["mitown","essential-oil","relax","miwellness","shaker","ebooster","chai-relax","energy-card"] },
];

function getCategoryFilter(key: string) {
  const cat = CATEGORIES.find(c => c.key === key);
  if (!cat || key === "all") return () => true;
  const slugSet = new Set(cat.slugs || []);
  return (p: typeof products[0]) => slugSet.has(p.slug);
}

export function CatalogFilter() {
  const [activeCategory, setActiveCategory] = useState("all");
  const t = useTranslations("footer");

  const filtered = useMemo(
    () => products.filter(getCategoryFilter(activeCategory)),
    [activeCategory]
  );

  const categoryLabels: Record<string, string> = {
    all: t("allProducts"),
    supplements: "БАДы",
    personal: "Уход",
    lifestyle: "Образ жизни",
  };

  return (
    <div>
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
              <span>{categoryLabels[cat.key]}</span>
              <span className={`text-[10px] ml-0.5 ${activeCategory === cat.key ? "text-white/60" : "text-[var(--fg-dim)]"}`}>
                ({cat.key === "all" ? products.length : products.filter(getCategoryFilter(cat.key)).length})
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
