"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg-base)]">
      <div className="text-center">
        <h2 className="font-heading text-2xl text-[var(--fg-primary)] mb-4">
          Something went wrong
        </h2>
        <button
          onClick={reset}
          className="px-6 py-3 bg-[var(--accent-primary)] text-[var(--bg-base)] rounded-md"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
