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
  if (!products || !Array.isArray(products)) {
    console.warn("[ProductGrid] products is not an array:", typeof products, products);
    return (
      <div className="text-center py-20">
        <p className="font-body text-sm text-[var(--fg-muted)]">
          Ошибка загрузки данных
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {(title || description) && (
        <div className="text-left mb-10">
          {title && (
            <h2 className="font-heading font-semibold text-3xl leading-[1.1] text-[var(--fg-primary)] tracking-normal mb-2 md:text-4xl lg:text-5xl">
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

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </div>
  );
}
