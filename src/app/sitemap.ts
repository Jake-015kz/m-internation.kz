import { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { SITE_CONFIG } from "@/lib/constants";
import { products } from "@/data/products";

const baseUrl = SITE_CONFIG.url;

const staticPages = [
  { path: "", priority: 1.0, changeFrequency: "weekly" as const },
  { path: "/about", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/business", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/catalog", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "/contacts", priority: 0.7, changeFrequency: "monthly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date();

  // Static pages for all locales
  const staticEntries = routing.locales.flatMap((locale) =>
    staticPages.map((page) => ({
      url: `${baseUrl}/${locale}${page.path}`,
      lastModified: currentDate,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    }))
  );

  // Dynamic product pages for all locales
  const productEntries = routing.locales.flatMap((locale) =>
    products.map((product) => ({
      url: `${baseUrl}/${locale}/catalog/${product.slug}`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }))
  );

  return [...staticEntries, ...productEntries];
}
