import { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { SITE_CONFIG } from "@/lib/constants";

const baseUrl = SITE_CONFIG.url;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/_next/"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
