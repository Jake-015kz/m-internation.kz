import { ProductCard } from '@shared/ProductCard';
import type { Product } from '@/types';
import styles from './ProductGrid.module.scss';

interface ProductGridProps {
  products: Product[];
  title?: string;
  description?: string;
}

export function ProductGrid({ products, title, description }: ProductGridProps) {
  return (
    <div className={styles.container}>
      {(title || description) && (
        <div className={styles.header}>
          {title && <h2 className={styles.title}>{title}</h2>}
          {description && <p className={styles.description}>{description}</p>}
        </div>
      )}

      <div className={styles.grid}>
        {products.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </div>
  );
}
