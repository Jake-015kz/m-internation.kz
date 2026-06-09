"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Catalog error:", error);
  }, [error]);

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h1 className="font-heading font-semibold text-4xl text-[var(--fg-dim)] mb-4">
          Ошибка
        </h1>
        <h2 className="font-heading font-semibold text-xl text-[var(--fg-primary)] mb-3">
          Что-то пошло не так
        </h2>
        <p className="font-body text-sm text-[var(--fg-muted)] mb-8">
          Произошла ошибка при загрузке страницы. Попробуйте обновить страницу.
        </p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center font-body font-semibold text-sm px-6 py-3 rounded-[var(--radius-sm)] bg-[var(--accent-primary)] text-white transition-all duration-250 hover:scale-[1.02] active:scale-[0.98]"
          >
            Попробовать снова
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center font-body font-medium text-sm px-6 py-3 rounded-[var(--radius-sm)] border border-[var(--border)] text-[var(--fg-primary)] transition-all duration-250 hover:border-[var(--accent-primary)]"
          >
            На главную
          </Link>
        </div>
      </div>
    </main>
  );
}
