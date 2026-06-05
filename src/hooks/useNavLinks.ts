import { useLocale, useTranslations } from "next-intl";

export interface NavLink {
  href: string;
  label: string;
}

export function useNavLinks(): NavLink[] {
  const locale = useLocale();
  const t = useTranslations("nav");

  return [
    { href: `/${locale}`, label: t("home") },
    { href: `/${locale}/catalog`, label: t("catalog") },
    { href: `/${locale}/about`, label: t("about") },
    { href: `/${locale}/business`, label: t("business") },
    { href: `/${locale}/contacts`, label: t("contacts") },
  ];
}
