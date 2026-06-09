import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { FileQuestion } from "lucide-react";

export default function NotFound() {
  const locale = useLocale();

  return (
    <main className="flex items-center justify-center px-4 py-16 min-h-[calc(100dvh-56px)] md:min-h-[calc(100dvh-64px)]">
      <div className="w-full max-w-[480px] text-center">
        {/* Not found card */}
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-surface)] p-8 md:p-10 shadow-[var(--shadow-md)]">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="flex items-center justify-center w-14 h-14 rounded-full bg-[var(--fg-dim)]/10">
              <FileQuestion className="w-7 h-7 text-[var(--fg-dim)]" />
            </div>
          </div>

          {/* 404 — крупный, но не серый */}
          <h1 className="font-heading font-bold text-5xl md:text-6xl text-[var(--accent-primary)] mb-3">
            404
          </h1>

          {/* Subtitle */}
          <h2 className="font-heading font-semibold text-base md:text-lg text-[var(--fg-primary)] mb-2">
            Страница не найдена
          </h2>

          {/* Description */}
          <p className="font-body text-sm text-[var(--fg-muted)] leading-relaxed mb-8">
            Запрашиваемая страница не существует или была перемещена.
          </p>

          {/* Action */}
          <Link
            href={`/${locale}`}
            className="inline-flex items-center justify-center font-body font-semibold text-sm min-h-[48px] px-8 rounded-[0.5rem] bg-[var(--accent-primary)] text-white transition-all duration-250 hover:bg-[var(--accent-primary-hover)] hover:scale-[1.02] active:scale-[0.98] shadow-[var(--shadow-glow-subtle)] focus-visible:outline-[3px] focus-visible:outline-[var(--accent-primary)]/25 focus-visible:outline-offset-2"
          >
            На главную
          </Link>
        </div>
      </div>
    </main>
  );
}
