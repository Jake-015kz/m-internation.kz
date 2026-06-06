"use client";

import { useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import { Globe } from "lucide-react";
import { cn } from "@/lib/utils";

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();

  const switchLocale = (newLocale: string) => {
    // Убираем текущий префикс локали из пути и добавляем новый
    const pathWithoutLocale = pathname.replace(/^\/(ru|en|kk)/, "") || "/";
    const newPath = `/${newLocale}${pathWithoutLocale}`;
    // Используем window.location для полной перезагрузки с новой локалью
    window.location.href = newPath;
  };

  return (
    <div
      className={cn(
        "flex items-center gap-2",
        "px-3 py-1.5",
        "border border-[var(--border)] rounded-lg",
        "bg-[var(--glass-bg)] backdrop-blur-[20px]",
        "cursor-pointer transition-all duration-250",
        "hover:border-[var(--accent-primary)]",
      )}
    >
      <Globe
        className={cn(
          "text-[var(--accent-primary)] flex-shrink-0 pointer-events-none",
          "absolute left-3 z-10",
        )}
        size={18}
      />
      <select
        value={locale}
        onChange={(e) => switchLocale(e.target.value)}
        className={cn(
          "bg-transparent border-none",
          "text-[var(--fg-primary)] font-mono text-sm font-semibold",
          "cursor-pointer outline-none",
          "pl-6 pr-2",
          "appearance-none -webkit-appearance-none -moz-appearance-none",
          "relative z-20 pointer-events-auto",
          "min-w-[50px] h-6",
        )}
        aria-label="Select language"
      >
        <option
          value="ru"
          className="bg-[var(--bg-base)] text-[var(--fg-primary)] px-3 py-2"
        >
          RU
        </option>
        <option
          value="en"
          className="bg-[var(--bg-base)] text-[var(--fg-primary)] px-3 py-2"
        >
          EN
        </option>
        <option
          value="kk"
          className="bg-[var(--bg-base)] text-[var(--fg-primary)] px-3 py-2"
        >
          KZ
        </option>
      </select>
    </div>
  );
}
