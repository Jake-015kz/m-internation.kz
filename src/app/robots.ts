import { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";

const baseUrl = "https://m-internation.kz";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/_next/"],
    },
    sitemap: routing.locales.flatMap((locale) => [
      `${baseUrl}/${locale}/sitemap.xml`,
    ]),
  };
}
