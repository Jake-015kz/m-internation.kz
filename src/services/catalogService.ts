// src/services/catalogService.ts
"use server";

import { products } from "@/data/products";
import type { Product } from "@/types";

export type CategoryKey = "all" | "supplements" | "personal" | "lifestyle";

interface CategoryConfig {
  key: CategoryKey;
  icon: string;
  slugs?: string[];
}

export const CATEGORIES: CategoryConfig[] = [
  { key: "all", icon: "⊕" },
  {
    key: "supplements",
    icon: "◆",
    slugs: [
      "micrystal", "greenmax", "mimax", "blumax", "nutrimax",
      "fleximax", "machoman", "mishroom", "lamor", "kordymax", "promax",
    ],
  },
  {
    key: "personal",
    icon: "◈",
    slugs: ["ye-katerina", "mi-mask", "mi-serum", "magicare", "mifresh"],
  },
  {
    key: "lifestyle",
    icon: "●",
    slugs: [
      "mitown", "essential-oil", "relax", "miwellness",
      "shaker", "ebooster", "chai-relax", "energy-card",
    ],
  },
];

export async function getCategorySlugs(key: CategoryKey): Promise<Set<string> | null> {
  if (key === "all") return null;
  const cat = CATEGORIES.find((c) => c.key === key);
  return cat?.slugs ? new Set(cat.slugs) : null;
}

export async function filterProductsByCategory(categoryKey: CategoryKey): Promise<Product[]> {
  const slugSet = await getCategorySlugs(categoryKey);
  if (!slugSet) return products;
  return products.filter((p) => slugSet.has(p.slug));
}

export async function getCategoryCount(categoryKey: CategoryKey): Promise<number> {
  return (await filterProductsByCategory(categoryKey)).length;
}

export const categoryLabels: Record<CategoryKey, string> = {
  all: "Все продукты",
  supplements: "БАДы",
  personal: "Уход",
  lifestyle: "Образ жизни",
};
