import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { CatalogFilter } from "@/components/shared/ProductGrid/CatalogFilter";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "catalog" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function CatalogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "catalog" });

  return (
    <main className="min-h-screen pt-20">
      {/* Hero section */}
      <section className="py-12 md:py-16 text-left border-b border-[var(--border-subtle)] relative overflow-hidden">
        {/* Decorative orbs */}
        <div
          className="absolute -top-20 -right-20 w-[300px] h-[300px] rounded-full opacity-[0.04] pointer-events-none"
          style={{ background: "radial-gradient(circle, var(--accent-primary), transparent 70%)" }}
        />
        <div
          className="absolute -bottom-10 -left-10 w-[200px] h-[200px] rounded-full opacity-[0.03] pointer-events-none"
          style={{ background: "radial-gradient(circle, var(--accent-gold), transparent 70%)" }}
        />

        <div className="mx-auto max-w-[80rem] px-4 md:px-6 lg:px-8 relative z-10">
          <h1 className="font-heading font-semibold text-2xl leading-[1.1] text-[var(--fg-primary)] tracking-[-0.02em] mb-3 text-left md:text-3xl lg:text-4xl">
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
          <CatalogFilter />
        </div>
      </section>
    </main>
  );
}
