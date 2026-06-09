"use client";

import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { getProductAccent } from "@/lib/constants/product-colors";
import { ProductGrid } from "@/components/shared/ProductGrid/ProductGrid";
import type { Product } from "@/types";

interface ProductPageClientProps {
  locale: string;
  product: Product;
  relatedProducts: Product[];
}

export function ProductPageClient({ locale, product, relatedProducts }: ProductPageClientProps) {
  const t = useTranslations("catalog");
  const tNav = useTranslations("nav");
  const tProducts = useTranslations("products");
  const accent = getProductAccent(product.slug);

  // Localized product name/description from i18n if available, fallback to data
  const productName = tProducts(`${product.slug}.name`) !== `products.${product.slug}.name`
    ? tProducts(`${product.slug}.name`)
    : product.name;
  const productDescription = tProducts(`${product.slug}.description`) !== `products.${product.slug}.description`
    ? tProducts(`${product.slug}.description`)
    : product.description;

  return (
    <main className="min-h-screen pt-16 pb-20 relative">
      {/* Decorative background orbs */}
      <div
        className="fixed top-20 -right-40 w-[500px] h-[500px] rounded-full opacity-[0.03] pointer-events-none"
        style={{ background: `radial-gradient(circle, ${accent}, transparent 70%)` }}
      />
      <div
        className="fixed bottom-20 -left-40 w-[400px] h-[400px] rounded-full opacity-[0.02] pointer-events-none"
        style={{ background: `radial-gradient(circle, ${accent}, transparent 70%)` }}
      />

      <div className="mx-auto max-w-[80rem] px-4 md:px-6 lg:px-8 relative z-10">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 py-4 md:py-6 text-[13px]">
          <Link
            href={`/${locale}`}
            className="font-body text-[var(--fg-muted)] transition-colors duration-250 hover:text-[var(--fg-primary)]"
          >
            {tNav("home")}
          </Link>
          <span className="font-body text-[var(--border)]">/</span>
          <Link
            href={`/${locale}/catalog`}
            className="font-body text-[var(--fg-muted)] transition-colors duration-250 hover:text-[var(--fg-primary)]"
          >
            {tNav("catalog")}
          </Link>
          <span className="font-body text-[var(--border)]">/</span>
          <span className="font-body text-[var(--fg-primary)] font-semibold">
            {productName}
          </span>
        </nav>

        {/* Product hero — image + info side by side */}
        <div className="grid grid-cols-1 gap-6 md:gap-10 mb-12 md:mb-16 lg:grid-cols-2 lg:gap-12">
          {/* Image */}
          <div className="relative">
            <div
              className="aspect-square rounded-[var(--radius-lg)] overflow-hidden flex items-center justify-center relative"
              style={{
                background: `linear-gradient(135deg, ${accent}08 0%, var(--bg-surface) 100%)`,
                border: `1px solid ${accent}15`,
              }}
            >
              {/* Decorative corner accents */}
              <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 rounded-tl-sm opacity-20" style={{ borderColor: accent }} />
              <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 rounded-tr-sm opacity-20" style={{ borderColor: accent }} />
              <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 rounded-bl-sm opacity-20" style={{ borderColor: accent }} />
              <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 rounded-br-sm opacity-20" style={{ borderColor: accent }} />

              {product.images?.[0] ? (
                <Image
                  src={product.images[0]}
                  alt={productName}
                  width={500}
                  height={500}
                  className="w-full h-full object-contain p-6 md:p-10"
                />
              ) : (
                <span className="font-heading font-bold text-6xl" style={{ color: `${accent}40` }}>
                  {productName.charAt(0)}
                </span>
              )}

              {/* Glow under product */}
              <div
                className="absolute bottom-4 left-1/2 -translate-x-1/2 w-1/2 h-8 blur-2xl rounded-full"
                style={{ background: accent, opacity: 0.08 }}
                aria-hidden="true"
              />
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col gap-6 md:gap-8">
            <div className="flex flex-col gap-3 pb-6 border-b border-[var(--border-subtle)]">
              <div className="flex items-center gap-2">
                <span
                  className="font-mono font-semibold text-[10px] md:text-xs uppercase tracking-[0.05em] px-2 py-0.5 rounded-full"
                  style={{
                    color: accent,
                    backgroundColor: `${accent}12`,
                    border: `1px solid ${accent}20`,
                  }}
                >
                  {product.category}
                </span>
              </div>

              <h1 className="font-heading font-semibold text-2xl leading-[1.1] text-[var(--fg-primary)] tracking-normal md:text-3xl lg:text-4xl">
                {productName}
              </h1>

              <p className="font-body text-sm md:text-base leading-[1.5] text-[var(--fg-secondary)]">
                {productDescription}
              </p>
            </div>

            {/* Specifications */}
            {Object.keys(product.specifications).length > 0 && (
              <div className="pb-6 border-b border-[var(--border-subtle)]">
                <h2 className="font-heading font-semibold text-base md:text-lg leading-[1.1] text-[var(--fg-primary)] tracking-[-0.01em] mb-4">
                  {t("specifications")}
                </h2>
                <dl className="flex flex-col gap-0">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-2.5 border-b border-[var(--border-subtle)] last:border-b-0">
                      <dt className="font-body text-sm text-[var(--fg-muted)]">{key}</dt>
                      <dd className="font-body text-sm text-[var(--fg-primary)] font-medium">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}

            {/* Certificates */}
            {product.certificates.length > 0 && (
              <div className="pb-6 border-b border-[var(--border-subtle)]">
                <h2 className="font-heading font-semibold text-base md:text-lg leading-[1.1] text-[var(--fg-primary)] tracking-[-0.01em] mb-4">
                  {t("certificates")}
                </h2>
                <div className="flex flex-wrap gap-2">
                  {product.certificates.map((cert) => (
                    <span
                      key={cert}
                      className="font-mono font-semibold text-[0.6rem] md:text-[0.65rem] uppercase tracking-[0.1em] px-2.5 py-1 border rounded-full"
                      style={{
                        color: accent,
                        borderColor: `${accent}25`,
                        backgroundColor: `${accent}08`,
                      }}
                    >
                      {cert}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-wrap gap-3">
              <Link
                href={`/${locale}/contacts`}
                className="inline-flex items-center justify-center font-body font-semibold text-sm px-6 py-3 rounded-[var(--radius-sm)] transition-all duration-250 ease-[cubic-bezier(0.16,1,0.3,1)] text-white hover:scale-[1.02] active:scale-[0.98]"
                style={{
                  background: accent,
                  boxShadow: `0 0 20px ${accent}30, 0 0 40px ${accent}10`,
                }}
              >
                {t("contact")}
              </Link>
              <Link
                href={`/${locale}/catalog`}
                className="inline-flex items-center justify-center bg-transparent border border-[var(--border)] text-[var(--fg-primary)] font-body font-medium text-sm px-6 py-3 rounded-[var(--radius-sm)] transition-all duration-250 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-[var(--accent-primary)]"
              >
                ← {t("backToCatalog")}
              </Link>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="pt-12 md:pt-16 border-t border-[var(--border-subtle)]">
            <h2 className="font-heading font-semibold text-xl leading-[1.1] text-[var(--fg-primary)] tracking-[-0.01em] mb-8 md:text-2xl lg:text-3xl">
              {t("related")}
            </h2>
            <ProductGrid products={relatedProducts} />
          </div>
        )}
      </div>
    </main>
  );
}
