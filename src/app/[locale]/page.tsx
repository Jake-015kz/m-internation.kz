import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import Link from "next/link";
import { HeroSectionA } from "@shared/HeroSection";
import { CertificatesSection } from "@shared/CertificatesSection";
import { ProductShowcase } from "@shared/ProductShowcase";
import { AboutSection } from "@shared/AboutSection";
import { BusinessSection } from "@shared/BusinessSection";
import { SITE_CONFIG } from "@/lib/constants";

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
      <CertificatesSection />
      <ProductShowcase />
      <AboutSection />
      <BusinessSection />

      {/* CTA Section */}
      <section className="relative overflow-hidden py-12 md:py-20 bg-[var(--bg-surface)]">
        <div className="mx-auto max-w-[80rem] px-4 md:px-6 lg:px-8">
          <div className="max-w-[36rem] mx-auto text-center">
            <h2 className="font-heading font-semibold text-xl leading-[1.1] text-[var(--fg-primary)] tracking-normal mb-3 md:mb-4 md:text-3xl lg:text-4xl">
              {t("cta.title")}
            </h2>
            <p className="font-body text-sm md:text-base leading-[1.45] text-[var(--fg-secondary)] mb-6 md:mb-8">
              {t("cta.description")}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href={`/${locale}/contacts`}
                className="inline-flex items-center justify-center bg-[var(--accent-primary)] text-[var(--bg-base)] font-body font-semibold text-sm px-6 py-3 min-h-[44px] rounded-[0.5rem] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-[var(--shadow-glow-subtle)] hover:bg-[var(--accent-primary-hover)] hover:shadow-[var(--shadow-md)] hover:scale-[1.02] active:scale-[0.98]"
              >
                {t("cta.contact")}
              </Link>
              <Link
                href={`/${locale}/catalog`}
                className="inline-flex items-center justify-center border border-[var(--border)] text-[var(--fg-primary)] font-body font-medium text-sm px-6 py-3 min-h-[44px] rounded-[0.5rem] transition-all duration-300 hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] hover:shadow-[var(--shadow-sm)]"
              >
                {t("cta.catalog")}
              </Link>
            </div>
          </div>
        </div>

        <div className="section-divider mt-12 md:mt-20" />
      </section>
    </main>
  );
}
