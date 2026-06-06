import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ProductGrid } from "@/components/shared";
import { products } from "@/data/products";

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
      <section className="py-16 text-left border-b border-[var(--border-subtle)]">
        <div className="mx-auto max-w-[80rem] px-4 md:px-6 lg:px-8">
          <h1 className="font-heading font-semibold text-4xl leading-[0.95] text-[var(--fg-primary)] tracking-[-0.04em] mb-4 text-left md:text-5xl lg:text-6xl xl:text-7xl">
            {t("title")}
          </h1>
          <p className="font-body text-lg leading-[1.625] max-w-[32rem] text-[var(--fg-muted)] text-left">
            {t("description")}
          </p>
        </div>
      </section>

      <section className="py-12 pb-20">
        <div className="mx-auto max-w-[80rem] px-4 md:px-6 lg:px-8">
          <ProductGrid products={products} />
        </div>
      </section>
    </main>
  );
}
