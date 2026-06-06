import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { HeroSection as HeroSection } from "@shared/HeroSection";
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

      <HeroSection />
      <CertificatesSection />
      <ProductShowcase />
      <AboutSection />
      <BusinessSection />

      {/* CTA Section — split screen */}
      <section className="relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[60vh]">
          {/* Left — text */}
          <div className="flex items-center justify-center p-8 md:p-12 lg:p-16 bg-[var(--accent-primary)] relative">
            <div className="max-w-[28rem] relative z-10">
              <h2 className="font-heading font-semibold text-2xl leading-[1.1] text-white tracking-[-0.02em] mb-5 md:text-3xl lg:text-4xl">
                {t("cta.title")}
              </h2>
              <p className="font-body text-base leading-[1.45] text-white/80 mb-8">
                {t("cta.description")}
              </p>
              <Link
                href={`/${locale}/contacts`}
                className="inline-flex items-center justify-center bg-white text-[var(--accent-primary)] font-body font-medium text-sm px-6 py-3 rounded-[var(--radius-sm)] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-white/90 hover:scale-[1.02] active:scale-[0.98] shadow-[var(--shadow-md)]"
              >
                {t("cta.contact")}
              </Link>
            </div>
          </div>

          {/* Right — visual with glass card */}
          <div className="flex items-center justify-center p-8 md:p-12 lg:p-16 bg-[var(--bg-elevated)] relative">
            <div className="max-w-[28rem] text-center glass-card p-8 md:p-10 relative z-10">
              <p className="font-mono text-xs text-[var(--fg-muted)] uppercase tracking-[0.15em] mb-4">
                Natural. Certified. Trusted.
              </p>
              <p className="font-body text-base text-[var(--fg-secondary)] leading-[1.45]">
                {t("cta.description")}
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
