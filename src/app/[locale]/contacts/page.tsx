import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { CONTACTS } from "@/lib/constants";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contactsPage" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function ContactsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contactsPage" });

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
          <div className="flex flex-col gap-0">
            <a
              href={`tel:${CONTACTS.phone}`}
              className="flex flex-col py-6 border-b border-[var(--border-subtle)] no-underline text-inherit transition-opacity duration-250 hover:opacity-80 last:border-b-0"
            >
              <h3 className="font-body font-bold text-base text-[var(--fg-primary)] mb-1">
                {t("phone")}
              </h3>
              <p className="font-body text-base leading-[1.625] text-[var(--fg-muted)]">
                {CONTACTS.phone}
              </p>
            </a>

            <a
              href={`mailto:${CONTACTS.email}`}
              className="flex flex-col py-6 border-b border-[var(--border-subtle)] no-underline text-inherit transition-opacity duration-250 hover:opacity-80 last:border-b-0"
            >
              <h3 className="font-body font-bold text-base text-[var(--fg-primary)] mb-1">
                {t("email")}
              </h3>
              <p className="font-body text-base leading-[1.625] text-[var(--fg-muted)]">
                {CONTACTS.email}
              </p>
            </a>

            <a
              href={CONTACTS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col py-6 border-b border-[var(--border-subtle)] no-underline text-inherit transition-opacity duration-250 hover:opacity-80 last:border-b-0"
            >
              <h3 className="font-body font-bold text-base text-[var(--fg-primary)] mb-1">
                {t("instagram")}
              </h3>
              <p className="font-body text-base leading-[1.625] text-[var(--fg-muted)]">
                @indira_seytimbekovna
              </p>
            </a>

            <a
              href={CONTACTS.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col py-6 border-b border-[var(--border-subtle)] no-underline text-inherit transition-opacity duration-250 hover:opacity-80 last:border-b-0"
            >
              <h3 className="font-body font-bold text-base text-[var(--fg-primary)] mb-1">
                {t("tiktok")}
              </h3>
              <p className="font-body text-base leading-[1.625] text-[var(--fg-muted)]">
                @minternational.kz
              </p>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
