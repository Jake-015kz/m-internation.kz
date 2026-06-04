import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { ProductGrid } from '@/components/shared';
import { products } from '@/data/products';
import styles from './catalog.module.scss';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'catalog' });
  
  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function CatalogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'catalog' });

  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <div className={styles.container}>
          <h1 className={styles.title}>{t('title')}</h1>
          <p className={styles.description}>
            {t('description')}
          </p>
        </div>
      </section>

      <section className={styles.products}>
        <div className={styles.container}>
          <ProductGrid products={products} />
        </div>
      </section>
    </main>
  );
}
