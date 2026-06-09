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
    // Log the real error for Vercel/Modal logs
    console.error("[error.tsx] Page error:", error.message, error.digest);
  }, [error]);

  return (
    <html lang="ru">
      <body style={{ fontFamily: "system-ui, sans-serif", padding: "2rem", textAlign: "center" }}>
        <h1 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>
          Произошла ошибка
        </h1>
        <p style={{ color: "#666", marginBottom: "2rem" }}>
          Попробуйте обновить страницу
        </p>
        <button
          onClick={() => reset()}
          style={{
            padding: "0.75rem 1.5rem",
            background: "oklch(0.78 0.22 135)",
            color: "white",
            border: "none",
            borderRadius: "0.5rem",
            cursor: "pointer",
            fontSize: "1rem",
          }}
        >
          Попробовать снова
        </button>
      </body>
    </html>
  );
}
