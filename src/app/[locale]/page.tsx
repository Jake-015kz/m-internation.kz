import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { HeroSectionA } from "@shared/HeroSection/HeroSectionA";
import { SITE_CONFIG } from "@/lib/constants";
import { HomeSections } from "./HomeSections";

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = SITE_CONFIG.url;
  const t = await getTranslations({ locale, namespace: "hero" });
  return {
    title: {
      default: t("title"),
      template: `%s | ${SITE_CONFIG.name}`,
    },
    description: t("subtitle"),
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        "ru": `${baseUrl}/ru`,
        "en": `${baseUrl}/en`,
        "kk": `${baseUrl}/kk`,
        "x-default": `${baseUrl}/ru`,
      },
    },
    openGraph: {
      type: "website",
      locale: locale === "ru" ? "ru_KZ" : locale === "kk" ? "kk_KZ" : "en_US",
      siteName: SITE_CONFIG.name,
      title: t("title"),
      description: t("subtitle"),
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: t("title"),
        },
      ],
    },
  };
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return (
    <main className="min-h-screen relative">
      {/* Decorative background orbs — desktop only to reduce mobile paint */}
      <div
        className="hidden md:block deco-orb deco-orb-1 top-20 -left-40 fixed"
        aria-hidden="true"
      />
      <div
        className="hidden md:block deco-orb deco-orb-2 top-[40vh] -right-20 fixed"
        aria-hidden="true"
      />
      <div
        className="hidden md:block deco-orb deco-orb-1 bottom-20 left-1/3 fixed"
        aria-hidden="true"
      />

      <HeroSectionA />
      <HomeSections locale={locale} />
    </main>
  );
}
