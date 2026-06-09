import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h1 className="font-heading font-semibold text-6xl text-[var(--fg-dim)] mb-4">
          404
        </h1>
        <h2 className="font-heading font-semibold text-xl text-[var(--fg-primary)] mb-3">
          Страница не найдена
        </h2>
        <p className="font-body text-sm text-[var(--fg-muted)] mb-8">
          Запрашиваемая страница не существует или была перемещена.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center font-body font-semibold text-sm px-6 py-3 rounded-[var(--radius-sm)] bg-[var(--accent-primary)] text-white transition-all duration-250 hover:scale-[1.02] active:scale-[0.98]"
        >
          На главную
        </Link>
      </div>
    </main>
  );
}
