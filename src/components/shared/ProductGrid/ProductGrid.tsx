import { ProductCard } from "@shared/ProductCard";
import type { Product } from "@/types";

interface ProductGridProps {
  products: Product[];
  title?: string;
  description?: string;
}

export function ProductGrid({
  products,
  title,
  description,
}: ProductGridProps) {
  return (
    <div className="flex flex-col">
      {(title || description) && (
        <div className="text-left mb-10">
          {title && (
            <h2 className="font-heading font-semibold text-3xl leading-[1.1] text-[var(--fg-primary)] tracking-[-0.02em] mb-2 md:text-4xl lg:text-5xl">
              {title}
            </h2>
          )}
          {description && (
            <p className="font-body text-sm leading-normal text-[var(--fg-muted)]">
              {description}
            </p>
          )}
        </div>
      )}

      <div className="bento-grid">
        {products.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </div>
  );
}
