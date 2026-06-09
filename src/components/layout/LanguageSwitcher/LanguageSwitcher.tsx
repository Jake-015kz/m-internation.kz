"use client";

import { useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();

  const switchLocale = (newLocale: string) => {
    const pathWithoutLocale = pathname.replace(/^\/(ru|en|kk)/, "") || "/";
    const newPath = `/${newLocale}${pathWithoutLocale}`;
    window.location.href = newPath;
  };

  return (
    <button
      onClick={() => {
        const next = locale === "ru" ? "en" : locale === "en" ? "kk" : "ru";
        switchLocale(next);
      }}
      className={cn(
        "flex items-center justify-center",
        "h-8 px-2.5 md:h-9 md:px-3",
        "rounded-lg",
        "border border-[var(--border)]",
        "bg-[var(--bg-surface)]",
        "text-[var(--fg-secondary)] font-mono text-xs md:text-sm font-bold",
        "cursor-pointer transition-all duration-250",
        "hover:border-[var(--accent-primary)] hover:text-[var(--fg-primary)]",
        "focus-visible:outline-2 focus-visible:outline-[var(--accent-primary)] focus-visible:outline-offset-2",
        "min-w-[44px] min-h-[44px] md:min-w-[36px] md:min-h-[36px]",
      )}
      aria-label="Switch language"
    >
      {locale.toUpperCase()}
    </button>
  );
}
