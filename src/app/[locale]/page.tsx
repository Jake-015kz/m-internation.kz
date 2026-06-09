import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { HeroSectionA } from "@shared/HeroSection";
import { CertificatesSection } from "@shared/CertificatesSection";
import { ProductShowcase } from "@shared/ProductShowcase";
import { AboutSection } from "@shared/AboutSection";
import { BusinessSection } from "@shared/BusinessSection";

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return (
    <main className="min-h-screen relative">
      {/* Decorative background orbs */}
      <div
        className="deco-orb deco-orb-1 top-20 -left-40 fixed"
        aria-hidden="true"
      />
      <div
        className="deco-orb deco-orb-2 top-[40vh] -right-20 fixed"
        aria-hidden="true"
      />
      <div
        className="deco-orb deco-orb-1 bottom-20 left-1/3 fixed"
        aria-hidden="true"
      />

      <HeroSectionA />
      <CertificatesSection />
      <ProductShowcase />
      <AboutSection />
      <BusinessSection />

      {/* CTA Section — compact, single column for mobile */}
      <section className="relative overflow-hidden py-12 md:py-20 bg-[var(--bg-surface)]">
        <div className="mx-auto max-w-[80rem] px-4 md:px-6 lg:px-8">
          <div className="max-w-[36rem] mx-auto text-center">
            <h2 className="font-heading font-semibold text-xl leading-[1.1] text-[var(--fg-primary)] tracking-[-0.01em] mb-3 md:mb-4 md:text-3xl lg:text-4xl">
              {t("cta.title")}
            </h2>
            <p className="font-body text-sm md:text-base leading-[1.45] text-[var(--fg-secondary)] mb-6 md:mb-8">
              {t("cta.description")}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href={`/${locale}/contacts`}
                className="inline-flex items-center justify-center bg-[var(--accent-primary)] text-white font-body font-semibold text-sm px-6 py-3 rounded-[var(--radius-sm)] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-[var(--shadow-glow)] hover:bg-[var(--accent-primary-hover)] hover:shadow-[var(--shadow-xl)] hover:scale-[1.02] active:scale-[0.98]"
              >
                {t("cta.contact")}
              </Link>
              <Link
                href={`/${locale}/catalog`}
                className="inline-flex items-center justify-center border border-[var(--border)] text-[var(--fg-primary)] font-body font-medium text-sm px-6 py-3 rounded-[var(--radius-sm)] transition-all duration-300 hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)]"
              >
                {t("cta.catalog")}
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative line */}
        <div className="section-divider mt-12 md:mt-20" />
      </section>
    </main>
  );
}
