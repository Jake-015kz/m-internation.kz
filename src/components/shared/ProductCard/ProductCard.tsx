import Link from 'next/link';
import type { Product } from '@/types';
import styles from './ProductCard.module.scss';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/catalog/${product.slug}`} className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.title}>{product.name}</h3>
        <span className={styles.category}>{product.category}</span>
      </div>
      <p className={styles.description}>{product.description}</p>
      <div className={styles.footer}>
        <div className={styles.certificates}>
          {product.certificates.slice(0, 3).map((cert) => (
            <span key={cert} className={styles.certificate}>{cert}</span>
          ))}
        </div>
        <span className={styles.arrow}>→</span>
      </div>
    </Link>
  );
}
