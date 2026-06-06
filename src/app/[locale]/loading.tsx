export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg-base)]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-2 border-[var(--border)] border-t-[var(--accent-primary)] rounded-full animate-spin" />
        <span className="text-sm text-[var(--fg-muted)]">Loading...</span>
      </div>
    </div>
  );
}
