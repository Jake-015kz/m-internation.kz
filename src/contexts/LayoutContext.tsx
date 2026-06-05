import { createContext, useContext, type ReactNode } from "react";
import { useLocale, useTranslations } from "next-intl";
import { SITE_CONFIG, CONTACTS } from "@/lib/constants";

interface LayoutContextValue {
  locale: string;
  siteConfig: typeof SITE_CONFIG;
  contacts: typeof CONTACTS;
  t: (key: string) => string;
  tNav: (key: string) => string;
}

const LayoutContext = createContext<LayoutContextValue | null>(null);

export function useLayout() {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error("useLayout must be used within LayoutProvider");
  }
  return context;
}

export function LayoutProvider({ children }: { children: ReactNode }) {
  const locale = useLocale();
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");

  return (
    <LayoutContext.Provider
      value={{ locale, siteConfig: SITE_CONFIG, contacts: CONTACTS, t, tNav }}
    >
      {children}
    </LayoutContext.Provider>
  );
}
