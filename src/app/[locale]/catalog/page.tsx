// src/app/[locale]/catalog/page.tsx
// Server Component — fetches products server-side, passes to CatalogFilter

import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { products } from "@/data/products";
import { CatalogFilter } from "@/components/shared/ProductGrid/CatalogFilter";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "catalog" });
  const baseUrl = "https://m-international.kz";
  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `${baseUrl}/${locale}/catalog`,
      languages: {
        "ru": `${baseUrl}/ru/catalog`,
        "en": `${baseUrl}/en/catalog`,
        "kk": `${baseUrl}/kk/catalog`,
        "x-default": `${baseUrl}/ru/catalog`,
      },
    },
    openGraph: {
      type: "website",
      locale: locale === "ru" ? "ru_KZ" : locale === "kk" ? "kk_KZ" : "en_US",
      siteName: "M-International",
      title: t("title"),
      description: t("description"),
    },
  };
}

export default async function CatalogPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ category?: string }>;
}) {
  const { locale } = await params;
  const { category } = await searchParams;
  const t = await getTranslations({ locale, namespace: "catalog" });

  // Products are imported directly — plain JSON, no fetch, no hydration issues
  const safeProducts = products.map((p) => ({
    slug: p.slug,
    name: p.name,
    description: p.description,
    images: p.images,
    category: p.category,
    specifications: p.specifications,
    certificates: p.certificates,
    price: p.price,
  }));

  return (
    <main className="min-h-screen pt-20">
      {/* Hero section */}
      <section className="py-12 md:py-16 text-left border-b border-[var(--border-subtle)] relative overflow-hidden">
        <div
          className="absolute -top-20 -right-20 w-[300px] h-[300px] rounded-full opacity-[0.04] pointer-events-none"
          style={{ background: "radial-gradient(circle, var(--accent-primary), transparent 70%)" }}
        />
        <div
          className="absolute -bottom-10 -left-10 w-[200px] h-[200px] rounded-full opacity-[0.03] pointer-events-none"
          style={{ background: "radial-gradient(circle, var(--accent-gold), transparent 70%)" }}
        />

        <div className="mx-auto max-w-[80rem] px-4 md:px-6 lg:px-8 relative z-10">
          <h1 className="font-heading font-semibold text-2xl leading-[1.1] text-[var(--fg-primary)] tracking-normal mb-3 text-left md:text-3xl lg:text-4xl">
            {t("title")}
          </h1>
          <p className="font-body text-sm md:text-base leading-[1.5] max-w-[32rem] text-[var(--fg-muted)] text-left">
            {t("description")}
          </p>
        </div>
      </section>

      {/* Filter + Grid */}
      <section className="py-8 md:py-12 pb-20">
        <div className="mx-auto max-w-[80rem] px-4 md:px-6 lg:px-8">
          <CatalogFilter
            products={safeProducts}
            locale={locale}
            currentCategory={category}
          />
        </div>
      </section>
    </main>
  );
}
