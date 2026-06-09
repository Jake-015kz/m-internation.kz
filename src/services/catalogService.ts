// src/services/catalogService.ts
// Server-only — called from Server Components and Server Actions only

"use server";

import { products } from "@/data/products";
import { CATEGORIES } from "@/config/categories";
import type { Product } from "@/types";
import type { CategoryKey } from "@/config/categories";

export type { CategoryKey };

// Guard: ensure locale exists before filtering
function guardLocale(locale?: string | null): boolean {
  if (!locale) {
    console.warn("[catalogService] No locale provided, returning empty array");
    return false;
  }
  return true;
}

export async function getCategorySlugs(key: CategoryKey): Promise<Set<string> | null> {
  if (key === "all") return null;
  const cat = CATEGORIES.find((c) => c.key === key);
  return cat?.slugs ? new Set(cat.slugs) : null;
}

export async function filterProductsByCategory(
  categoryKey: CategoryKey,
  locale?: string
): Promise<Product[]> {
  guardLocale(locale);

  try {
    const slugSet = await getCategorySlugs(categoryKey);
    if (!slugSet) {
      // Return plain copies — no references
      return products.map((p) => ({ ...p }));
    }

    return products
      .filter((p) => slugSet.has(p.slug))
      .map((p) => ({ ...p }));
  } catch (e) {
    console.error("[catalogService] filterProductsByCategory error:", e instanceof Error ? e.message : String(e));
    return [];
  }
}

export async function getCategoryCount(categoryKey: CategoryKey, locale?: string): Promise<number> {
  guardLocale(locale);
  return (await filterProductsByCategory(categoryKey, locale)).length;
}

// All products as plain JSON — safe for serialization
export async function getAllProductsSafe(locale?: string): Promise<Product[]> {
  guardLocale(locale);
  return products.map((p) => ({ ...p }));
}

// Get products by slug — returns plain object
export async function getProductBySlugSafe(slug: string, locale?: string): Promise<Product | undefined> {
  guardLocale(locale);
  const product = products.find((p) => p.slug === slug);
  return product ? { ...product } : undefined;
}
