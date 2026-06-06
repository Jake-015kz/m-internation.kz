import { notFound } from "next/navigation";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import {
  products,
  getProductBySlug,
  getRelatedProducts,
} from "@/data/products";
import { ProductGrid } from "@/components/shared";

interface ProductPageProps {
  params: Promise<{ slug: string; locale: string }>;
}

export async function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) return { title: "Product not found" };

  return {
    title: product.name,
    description: product.description,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug, locale } = await params;
  const product = getProductBySlug(slug);
  const t = await getTranslations({ locale, namespace: "catalog" });
  const tNav = await getTranslations({ locale, namespace: "nav" });
  const tCta = await getTranslations({ locale, namespace: "cta" });

  if (!product) notFound();

  const relatedProducts = getRelatedProducts(slug, 4);

  return (
    <main className="min-h-screen pt-20 pb-20">
      <div className="mx-auto max-w-[80rem] px-4 md:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 py-6 mb-8 border-b border-[var(--border-subtle)]">
          <Link
            href={`/${locale}`}
            className="font-body text-sm text-[var(--fg-muted)] transition-colors duration-250 hover:text-[var(--fg-primary)]"
          >
            {tNav("home")}
          </Link>
          <span className="font-body text-sm text-[var(--border)]">/</span>
          <Link
            href={`/${locale}/catalog`}
            className="font-body text-sm text-[var(--fg-muted)] transition-colors duration-250 hover:text-[var(--fg-primary)]"
          >
            {tNav("catalog")}
          </Link>
          <span className="font-body text-sm text-[var(--border)]">/</span>
          <span className="font-body text-sm text-[var(--fg-primary)] font-semibold">
            {product.name}
          </span>
        </nav>

        <div className="grid grid-cols-1 gap-12 mb-20 lg:grid-cols-2 lg:gap-16">
          {/* Image */}
          <div className="sticky top-24 self-start">
            <div className="aspect-square bg-[var(--bg-surface)] flex items-center justify-center">
              <span className="font-heading font-bold text-6xl text-[var(--border)]">
                {product.name.charAt(0)}
              </span>
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-4 pb-8 border-b border-[var(--border-subtle)]">
              <span className="font-body text-xs font-semibold uppercase tracking-[0.12em] text-[var(--fg-muted)]">
                {product.category}
              </span>
              <h1 className="font-heading font-semibold text-4xl leading-[0.95] text-[var(--fg-primary)] tracking-[-0.04em] text-left md:text-5xl lg:text-6xl xl:text-7xl">
                {product.name}
              </h1>
              <p className="font-body text-lg leading-[1.625] text-[var(--fg-muted)]">
                {product.description}
              </p>
            </div>

            {/* Specifications */}
            <div className="pb-8 border-b border-[var(--border-subtle)]">
              <h2 className="font-heading font-semibold text-xl leading-[1.1] text-[var(--fg-primary)] tracking-[-0.02em] mb-6 md:text-2xl">
                {t("specifications")}
              </h2>
              <dl className="flex flex-col gap-0">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex justify-between py-3 border-b border-[var(--border-subtle)] last:border-b-0"
                  >
                    <dt className="font-body text-base text-[var(--fg-muted)]">
                      {key}
                    </dt>
                    <dd className="font-body text-base text-[var(--fg-primary)] font-semibold">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Certificates */}
            <div className="pb-8 border-b border-[var(--border-subtle)]">
              <h2 className="font-heading font-semibold text-xl leading-[1.1] text-[var(--fg-primary)] tracking-[-0.02em] mb-6 md:text-2xl">
                {t("certificates")}
              </h2>
              <div className="flex flex-wrap gap-2">
                {product.certificates.map((cert) => (
                  <span
                    key={cert}
                    className="font-mono font-semibold text-[0.6rem] text-[var(--accent-primary)] uppercase tracking-[0.12em] px-2 py-0.5 border border-[var(--border-subtle)]"
                  >
                    {cert}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-4">
              <Link
                href={`/${locale}/contacts`}
                className="inline-flex items-center justify-center bg-[var(--accent-primary)] text-[var(--bg-base)] font-body font-semibold text-sm px-6 py-3 rounded-[0.375rem] transition-all duration-250 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-[0_0_20px_oklch(0.82_0.22_135/0.3),0_0_40px_oklch(0.82_0.22_135/0.15)] hover:bg-[var(--accent-primary-hover)] hover:scale-[1.02] active:scale-[0.98]"
              >
                {tCta("contact")}
              </Link>
              <Link
                href={`/${locale}/catalog`}
                className="inline-flex items-center justify-center bg-transparent border border-[var(--border)] text-[var(--fg-primary)] font-body font-medium text-sm px-6 py-3 rounded-[0.375rem] transition-all duration-250 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-[var(--accent-primary)] hover:bg-[oklch(0.82_0.22_135/0.08)]"
              >
                {t("backToCatalog")}
              </Link>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="pt-16 border-t border-[var(--border-subtle)]">
            <h2 className="font-heading font-semibold text-3xl leading-[1.1] text-[var(--fg-primary)] tracking-[-0.02em] mb-10 md:text-4xl lg:text-5xl">
              {t("related")}
            </h2>
            <ProductGrid products={relatedProducts} />
          </div>
        )}
      </div>
    </main>
  );
}
