"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useLocale } from "next-intl";
import { AlertTriangle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const locale = useLocale();

  useEffect(() => {
    console.error("Catalog error:", error);
  }, [error]);

  return (
    <main className="flex items-center justify-center px-4 py-16 min-h-[calc(100dvh-56px)] md:min-h-[calc(100dvh-64px)]">
      <div className="w-full max-w-[600px] text-center">
        <div className="rounded-2xl border border-red-500/30 bg-[var(--bg-surface)] p-8 md:p-10 shadow-[var(--shadow-md)]" role="alert" aria-live="polite">
          <div className="flex justify-center mb-6">
            <div className="flex items-center justify-center w-14 h-14 rounded-full bg-[var(--error)]/10">
              <AlertTriangle className="w-7 h-7 text-[var(--error)]" />
            </div>
          </div>

          <h1 className="font-heading font-bold text-2xl md:text-3xl text-[var(--error)] mb-3">
            Catalog Error
          </h1>

          {/* РЕАЛЬНЫЙ ТЕКСТ ОШИБКИ */}
          <div className="mb-6 rounded-xl border border-red-500/20 bg-red-500/5 p-4 text-left">
            <p className="font-mono text-xs text-red-400 font-semibold mb-2">Error message:</p>
            <p className="font-mono text-sm text-red-300 break-all whitespace-pre-wrap">
              {error.message || "Unknown error"}
            </p>
            {error.digest && (
              <>
                <p className="font-mono text-xs text-red-400/60 mt-3 mb-1">Digest:</p>
                <p className="font-mono text-xs text-red-300/60 break-all">{error.digest}</p>
              </>
            )}
            {error.stack && (
              <>
                <p className="font-mono text-xs text-red-400/60 mt-3 mb-1">Stack:</p>
                <pre className="font-mono text-[10px] text-red-300/40 break-all whitespace-pre-wrap max-h-40 overflow-y-auto">
                  {error.stack}
                </pre>
              </>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={reset}
              className="flex-1 inline-flex items-center justify-center font-body font-semibold text-sm min-h-[48px] px-6 rounded-[0.5rem] bg-[var(--accent-primary)] text-white transition-all duration-250 hover:bg-[var(--accent-primary-hover)] hover:scale-[1.02] active:scale-[0.98] shadow-[var(--shadow-glow-subtle)] focus-visible:outline-[3px] focus-visible:outline-[var(--accent-primary)]/25 focus-visible:outline-offset-2"
            >
              Try again
            </button>
            <Link
              href={`/${locale}/catalog`}
              className="flex-1 inline-flex items-center justify-center font-body font-medium text-sm min-h-[48px] px-6 rounded-[0.5rem] border border-[var(--border)] text-[var(--fg-primary)] transition-all duration-250 hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] hover:bg-[var(--bg-overlay)] focus-visible:outline-[3px] focus-visible:outline-[var(--accent-primary)]/25 focus-visible:outline-offset-2"
            >
              Catalog
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
