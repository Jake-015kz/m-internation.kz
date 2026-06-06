import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "businessPage" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function BusinessPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "business" });
  const tPage = await getTranslations({ locale, namespace: "businessPage" });
  const tNav = await getTranslations({ locale, namespace: "nav" });

  const steps = [
    {
      step: "01",
      title: t("steps.register.title"),
      desc: t("steps.register.description"),
    },
    {
      step: "02",
      title: t("steps.training.title"),
      desc: t("steps.training.description"),
    },
    {
      step: "03",
      title: t("steps.income.title"),
      desc: t("steps.income.description"),
    },
  ];

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
          <h2 className="font-heading font-semibold text-3xl leading-[1.1] text-[var(--fg-primary)] tracking-[-0.02em] text-left mb-10 md:text-4xl lg:text-5xl">
            {tPage("howToStart")}
          </h2>
          <div className="flex flex-col gap-0">
            {steps.map((item) => (
              <div
                key={item.step}
                className="flex items-start gap-5 py-6 border-b border-[var(--border-subtle)] last:border-b-0"
              >
                <span className="font-mono font-bold text-3xl text-[var(--accent-primary)] leading-none flex-shrink-0 min-w-[3rem]">
                  {item.step}
                </span>
                <div className="flex flex-col gap-1">
                  <h3 className="font-body font-bold text-lg text-[var(--fg-primary)]">
                    {item.title}
                  </h3>
                  <p className="font-body text-base leading-[1.625] text-[var(--fg-muted)]">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 text-left border-t border-[var(--border-subtle)]">
        <div className="mx-auto max-w-[80rem] px-4 md:px-6 lg:px-8">
          <h2 className="font-heading font-semibold text-3xl leading-[1.1] text-[var(--fg-primary)] tracking-[-0.02em] mb-4 md:text-4xl lg:text-5xl">
            {t("cta")}
          </h2>
          <p className="font-body text-lg leading-[1.625] max-w-[32rem] text-[var(--fg-muted)] mb-8">
            {t("description")}
          </p>
          <Link
            href={`/${locale}/contacts`}
            className="inline-flex items-center justify-center bg-[var(--accent-primary)] text-[var(--bg-base)] font-body font-semibold text-sm px-6 py-3 rounded-[0.375rem] transition-all duration-250 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-[0_0_20px_oklch(0.82_0.22_135/0.3),0_0_40px_oklch(0.82_0.22_135/0.15)] hover:bg-[var(--accent-primary-hover)] hover:scale-[1.02] active:scale-[0.98]"
          >
            {tNav("contacts")}
          </Link>
        </div>
      </section>
    </main>
  );
}
