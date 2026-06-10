import Link from "next/link";

export default function GlobalNotFound() {
  return (
    <main className="flex items-center justify-center px-4 py-16 min-h-screen">
      <div className="w-full max-w-[480px] text-center">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-8 md:p-10">
          <h1 className="font-bold text-5xl md:text-6xl text-white/80 mb-3">404</h1>
          <h2 className="font-semibold text-base md:text-lg text-white/60 mb-2">
            Page not found
          </h2>
          <p className="text-sm text-white/40 leading-relaxed mb-8">
            The page you are looking for does not exist or has been moved.
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center font-semibold text-sm min-h-[48px] px-8 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
          >
            Go home
          </Link>
        </div>
      </div>
    </main>
  );
}
