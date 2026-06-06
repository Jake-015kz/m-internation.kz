import Link from "next/link";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/catalog/${product.slug}`}
      className="flex flex-col p-6 rounded-lg no-underline text-inherit transition-all duration-250 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-default hover:-translate-y-1.5 hover:scale-[1.01] bg-[linear-gradient(135deg,oklch(1_0_0/0.08)_0%,oklch(1_0_0/0.02)_100%)] backdrop-blur-[20px] border border-[oklch(1_0_0/0.1)] shadow-[inset_0_1px_0_oklch(1_0_0/0.15),inset_0_-1px_0_oklch(0_0_0/0.05),0_8px_32px_oklch(0_0_0/0.3)] hover:border-[oklch(0.82_0.22_135/0.25)] hover:bg-[linear-gradient(135deg,oklch(0.82_0.22_135/0.08)_0%,oklch(1_0_0/0.04)_100%)] hover:shadow-[inset_0_1px_0_oklch(1_0_0/0.2),inset_0_-1px_0_oklch(0_0_0/0.08),0_16px_48px_oklch(0_0_0/0.35),0_0_24px_oklch(0.82_0.22_135/0.1)] [&:hover_.arrow]:translate-x-1.5 [&:hover_.arrow]:text-[var(--accent-primary)]"
    >
      <div className="flex items-baseline justify-between gap-4 mb-3">
        <h3 className="font-heading font-semibold text-lg text-[var(--fg-primary)] leading-[1.1] tracking-[-0.02em]">
          {product.name}
        </h3>
        <span className="font-body text-xs font-semibold uppercase tracking-[0.12em] text-[var(--fg-muted)] flex-shrink-0">
          {product.category}
        </span>
      </div>

      <p className="font-body text-sm leading-normal text-[var(--fg-muted)] mb-4 flex-1">
        {product.description}
      </p>

      <div className="flex items-center justify-between pt-4 border-t border-[var(--border)]">
        <div className="flex gap-2 flex-wrap">
          {product.certificates.slice(0, 3).map((cert) => (
            <span
              key={cert}
              className="font-mono font-medium text-[0.6rem] text-[var(--accent-primary)] uppercase tracking-[0.12em] px-1.5 py-0.5 border border-[var(--accent-primary)] rounded-xs bg-[var(--bg-surface)] transition-all duration-250 hover:bg-[var(--bg-elevated)]"
            >
              {cert}
            </span>
          ))}
        </div>
        <span className="arrow text-lg text-[var(--fg-muted)] flex-shrink-0 transition-all duration-250 ease-[cubic-bezier(0.16,1,0.3,1)]">
          →
        </span>
      </div>
    </Link>
  );
}
