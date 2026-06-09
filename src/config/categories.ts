// src/config/categories.ts — shared category config (not a server file)

export type CategoryKey = "all" | "supplements" | "personal" | "lifestyle";

export interface CategoryConfig {
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

export const categoryLabels: Record<CategoryKey, string> = {
  all: "Все продукты",
  supplements: "БАДы",
  personal: "Уход",
  lifestyle: "Образ жизни",
};
