import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "aboutPage" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  const tPage = await getTranslations({ locale, namespace: "aboutPage" });

  return (
    <main className="min-h-screen pt-20">
      <section className="py-16 text-left border-b border-[var(--border-subtle)]">
        <div className="mx-auto max-w-[80rem] px-4 md:px-6 lg:px-8">
          <h1 className="font-heading font-semibold text-4xl leading-[1.1] text-[var(--fg-primary)] tracking-normal mb-4 text-left md:text-5xl lg:text-6xl xl:text-7xl">
            {t("title")}
          </h1>
          <p className="font-body text-lg leading-[1.625] max-w-[32rem] text-[var(--fg-muted)] text-left">
            {t("description")}
          </p>
        </div>
      </section>

      <section className="py-12 pb-20">
        <div className="mx-auto max-w-[80rem] px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-0 md:grid-cols-3">
            <div className="py-8 border-b border-[var(--border-subtle)] md:px-8 md:border-b-0 md:border-r md:last:border-r-0">
              <h3 className="font-heading font-semibold text-xl leading-[1.1] text-[var(--fg-primary)] tracking-normal mb-4 md:text-2xl">
                {tPage("mission")}
              </h3>
              <p className="font-body text-base leading-[1.625] text-[var(--fg-muted)]">
                {t("mission")}
              </p>
            </div>
            <div className="py-8 border-b border-[var(--border-subtle)] md:px-8 md:border-b-0 md:border-r md:last:border-r-0">
              <h3 className="font-heading font-semibold text-xl leading-[1.1] text-[var(--fg-primary)] tracking-normal mb-4 md:text-2xl">
                {tPage("vision")}
              </h3>
              <p className="font-body text-base leading-[1.625] text-[var(--fg-muted)]">
                {tPage("visionText")}
              </p>
            </div>
            <div className="py-8 md:px-8">
              <h3 className="font-heading font-semibold text-xl leading-[1.1] text-[var(--fg-primary)] tracking-normal mb-4 md:text-2xl">
                {tPage("values")}
              </h3>
              <p className="font-body text-base leading-[1.625] text-[var(--fg-muted)]">
                {tPage("valuesText")}
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
