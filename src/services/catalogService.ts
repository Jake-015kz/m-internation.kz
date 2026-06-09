// src/services/catalogService.ts
"use server";

import { products } from "@/data/products";
import { CATEGORIES } from "@/config/categories";
import type { Product } from "@/types";
import type { CategoryKey } from "@/config/categories";

export type { CategoryKey };

export async function getCategorySlugs(key: CategoryKey): Promise<Set<string> | null> {
  if (key === "all") return null;
  const cat = CATEGORIES.find((c) => c.key === key);
  return cat?.slugs ? new Set(cat.slugs) : null;
}

export async function filterProductsByCategory(categoryKey: CategoryKey): Promise<Product[]> {
  console.log("[catalogService] filterProductsByCategory called with:", categoryKey);
  console.log("[catalogService] products isArray:", Array.isArray(products), "length:", products?.length);

  try {
    if (!Array.isArray(products)) {
      console.error("[catalogService] CRITICAL: products is not an array!", typeof products);
      return [];
    }

    const slugSet = await getCategorySlugs(categoryKey);
    if (!slugSet) {
      console.log("[catalogService] returning all products, count:", products.length);
      return [...products];
    }

    const filtered = products.filter((p) => slugSet.has(p.slug));
    console.log("[catalogService] filtered count:", filtered.length);
    return filtered;
  } catch (e) {
    console.error("[catalogService] ERROR in filterProductsByCategory:", e);
    return [];
  }
}

export async function getCategoryCount(categoryKey: CategoryKey): Promise<number> {
  return (await filterProductsByCategory(categoryKey)).length;
}
