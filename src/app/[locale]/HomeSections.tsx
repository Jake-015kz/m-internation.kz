"use client";

import dynamic from "next/dynamic";
import Link from "next/link";

// Below-fold sections — dynamically imported with ssr: false to reduce main bundle
const CertificatesSection = dynamic(
  () => import("@shared/CertificatesSection").then((m) => m.CertificatesSection),
  { ssr: false }
);
const ProductShowcase = dynamic(
  () => import("@shared/ProductShowcase").then((m) => m.ProductShowcase),
  { ssr: false }
);
const AboutSection = dynamic(
  () => import("@shared/AboutSection").then((m) => m.AboutSection),
  { ssr: false }
);
const BusinessSection = dynamic(
  () => import("@shared/BusinessSection").then((m) => m.BusinessSection),
  { ssr: false }
);

interface HomeSectionsProps {
  locale: string;
}

export function HomeSections({ locale }: HomeSectionsProps) {
  return (
    <>
      <CertificatesSection />
      <ProductShowcase />
      <AboutSection />
      <BusinessSection />

      {/* CTA Section */}
      <section className="relative overflow-hidden py-12 md:py-20 bg-[var(--bg-surface)]">
        <div className="mx-auto max-w-[80rem] px-4 md:px-6 lg:px-8">
          <div className="max-w-[36rem] mx-auto text-center">
            <h2 className="font-heading font-semibold text-xl leading-[1.1] text-[var(--fg-primary)] tracking-normal mb-3 md:mb-4 md:text-3xl lg:text-4xl">
              Готовы к переменам?
            </h2>
            <p className="font-body text-sm md:text-base leading-[1.45] text-[var(--fg-secondary)] mb-6 md:mb-8">
              Свяжитесь с нами, чтобы узнать больше о продукции и возможностях M-International
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href={`/${locale}/contacts`}
                className="inline-flex items-center justify-center bg-[var(--accent-primary)] text-[var(--bg-base)] font-body font-semibold text-sm px-6 py-3 min-h-[44px] rounded-[0.5rem] transition-[color,background-color,box-shadow,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-[var(--shadow-glow-subtle)] hover:bg-[var(--accent-primary-hover)] hover:shadow-[var(--shadow-md)] hover:scale-[1.02] active:scale-[0.98]"
              >
                Связаться с нами
              </Link>
              <Link
                href={`/${locale}/catalog`}
                className="inline-flex items-center justify-center border border-[var(--border)] text-[var(--fg-primary)] font-body font-medium text-sm px-6 py-3 min-h-[44px] rounded-[0.5rem] transition-[color,border-color,box-shadow] duration-300 hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] hover:shadow-[var(--shadow-sm)]"
              >
                Каталог продукции
              </Link>
            </div>
          </div>
        </div>

        <div className="section-divider mt-12 md:mt-20" />
      </section>
    </>
  );
}
