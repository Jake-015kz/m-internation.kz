import { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { SITE_CONFIG } from "@/lib/constants";

const baseUrl = SITE_CONFIG.url;

const pages = ["", "/about", "/business", "/catalog", "/contacts"];

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date();

  return routing.locales.flatMap((locale) =>
    pages.map((page) => ({
      url: `${baseUrl}/${locale}${page}`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: page === "" ? 1 : 0.8,
    })),
  );
}
