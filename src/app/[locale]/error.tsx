"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[error.tsx] Page error:", error.message, error.digest);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <h1 className="font-heading font-bold text-2xl md:text-3xl text-[var(--fg-primary)] mb-4">
        Произошла ошибка
      </h1>
      <p className="font-body text-sm text-[var(--fg-muted)] mb-8 max-w-md">
        Попробуйте обновить страницу или вернитесь позже.
      </p>
      <button
        onClick={() => reset()}
        className="inline-flex items-center justify-center font-body font-semibold text-sm min-h-[48px] px-8 rounded-[0.5rem] bg-[var(--accent-primary)] text-white transition-all duration-250 hover:bg-[var(--accent-primary-hover)] focus-visible:outline-[3px] focus-visible:outline-[var(--accent-primary)]/25 focus-visible:outline-offset-2"
      >
        Попробовать снова
      </button>
    </div>
  );
}
