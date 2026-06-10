// src/services/productService.ts
"use server";

import { products } from "@/data/products";
import type { Product } from "@/types";

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  return products.find((product) => product.slug === slug);
}

export async function getRelatedProducts(slug: string, limit: number = 4): Promise<Product[]> {
  const product = await getProductBySlug(slug);
  if (!product) return [];

  return products
    .filter((p) => p.slug !== slug && p.category === product.category)
    .slice(0, limit);
}
