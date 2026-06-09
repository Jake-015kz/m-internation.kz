"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { AlertTriangle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const locale = useLocale();
  const t = useTranslations("errorPage");

  useEffect(() => {
    console.error("Catalog error:", error);
  }, [error]);

  return (
    <main className="flex items-center justify-center px-4 py-16 min-h-[calc(100dvh-56px)] md:min-h-[calc(100dvh-64px)]">
      <div className="w-full max-w-[480px] text-center">
        {/* Error card */}
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-surface)] p-8 md:p-10 shadow-[var(--shadow-md)]" role="alert" aria-live="polite">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="flex items-center justify-center w-14 h-14 rounded-full bg-[var(--error)]/10">
              <AlertTriangle className="w-7 h-7 text-[var(--error)]" />
            </div>
          </div>

          {/* Title — красный, крупный */}
          <h1 className="font-heading font-bold text-2xl md:text-3xl text-[var(--error)] mb-3">
            {t("title")}
          </h1>

          {/* Subtitle */}
          <h2 className="font-heading font-semibold text-base md:text-lg text-[var(--fg-primary)] mb-2">
            {t("subtitle")}
          </h2>

          {/* Description */}
          <p className="font-body text-sm text-[var(--fg-muted)] leading-relaxed mb-8">
            {t("description")}
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={reset}
              className="flex-1 inline-flex items-center justify-center font-body font-semibold text-sm min-h-[48px] px-6 rounded-[0.5rem] bg-[var(--accent-primary)] text-white transition-all duration-250 hover:bg-[var(--accent-primary-hover)] hover:scale-[1.02] active:scale-[0.98] shadow-[var(--shadow-glow-subtle)] focus-visible:outline-[3px] focus-visible:outline-[var(--accent-primary)]/25 focus-visible:outline-offset-2"
            >
              {t("retry")}
            </button>
            <Link
              href={`/${locale}/catalog`}
              className="flex-1 inline-flex items-center justify-center font-body font-medium text-sm min-h-[48px] px-6 rounded-[0.5rem] border border-[var(--border)] text-[var(--fg-primary)] transition-all duration-250 hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] hover:bg-[var(--bg-overlay)] focus-visible:outline-[3px] focus-visible:outline-[var(--accent-primary)]/25 focus-visible:outline-offset-2"
            >
              {t("home")}
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
