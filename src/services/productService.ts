// src/services/productService.ts
"use server";

import { products } from "@/data/products";
import type { Product } from "@/types";

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  return products.find((product) => product.slug === slug);
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  return products.filter((product) => product.category === category);
}

export async function getRelatedProducts(slug: string, limit: number = 4): Promise<Product[]> {
  const product = await getProductBySlug(slug);
  if (!product) return [];

  return products
    .filter((p) => p.slug !== slug && p.category === product.category)
    .slice(0, limit);
}

export async function getAllProducts(): Promise<Product[]> {
  return products;
}

export async function getProductsSlugs(): Promise<string[]> {
  return products.map((p) => p.slug);
}
