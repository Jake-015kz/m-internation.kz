import Link from "next/link";
import { useLocale } from "next-intl";
import { FileQuestion } from "lucide-react";

const MESSAGES: Record<string, { title: string; desc: string; cta: string }> = {
  ru: { title: "Страница не найдена", desc: "Запрашиваемая страница не существует или была перемещена.", cta: "На главную" },
  en: { title: "Page not found", desc: "The page you are looking for does not exist or has been moved.", cta: "Go home" },
  kk: { title: "Бет табылмады", desc: "Сұралған бет жоқ немесе жылжытылған.", cta: "Басты бетке" },
};

export default function NotFound() {
  const locale = useLocale();
  const msg = MESSAGES[locale] || MESSAGES.ru;

  return (
    <main className="flex items-center justify-center px-4 py-16 min-h-[calc(100dvh-56px)] md:min-h-[calc(100dvh-64px)]">
      <div className="w-full max-w-[480px] text-center">
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-surface)] p-8 md:p-10 shadow-[var(--shadow-md)]">
          <div className="flex justify-center mb-6">
            <div className="flex items-center justify-center w-14 h-14 rounded-full bg-[var(--fg-dim)]/10">
              <FileQuestion className="w-7 h-7 text-[var(--fg-dim)]" />
            </div>
          </div>

          <h1 className="font-heading font-bold text-5xl md:text-6xl text-[var(--accent-primary)] mb-3">
            404
          </h1>

          <h2 className="font-heading font-semibold text-base md:text-lg text-[var(--fg-primary)] mb-2">
            {msg.title}
          </h2>

          <p className="font-body text-sm text-[var(--fg-muted)] leading-relaxed mb-8">
            {msg.desc}
          </p>

          <Link
            href={`/${locale}`}
            className="inline-flex items-center justify-center font-body font-semibold text-sm min-h-[48px] px-8 rounded-[0.5rem] bg-[var(--accent-primary)] text-white transition-all duration-250 hover:bg-[var(--accent-primary-hover)] hover:scale-[1.02] active:scale-[0.98] shadow-[var(--shadow-glow-subtle)] focus-visible:outline-[3px] focus-visible:outline-[var(--accent-primary)]/25 focus-visible:outline-offset-2"
          >
            {msg.cta}
          </Link>
        </div>
      </div>
    </main>
  );
}
