import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { products, getProductBySlug, getRelatedProducts } from '@/data/products';
import { ProductGrid } from '@/components/shared';
import styles from './product.module.scss';

interface ProductPageProps {
  params: Promise<{ slug: string; locale: string }>;
}

export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return { title: 'Product not found' };
  }

  return {
    title: product.name,
    description: product.description,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug, locale } = await params;
  const product = getProductBySlug(slug);
  const t = await getTranslations({ locale, namespace: 'catalog' });
  const tNav = await getTranslations({ locale, namespace: 'nav' });
  const tCta = await getTranslations({ locale, namespace: 'cta' });

  if (!product) {
    notFound();
  }

  const relatedProducts = getRelatedProducts(slug, 4);

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        {/* Breadcrumbs */}
        <nav className={styles.breadcrumbs}>
          <Link href={`/${locale}`} className={styles.breadcrumbLink}>{tNav('home')}</Link>
          <span className={styles.breadcrumbSep}>/</span>
          <Link href={`/${locale}/catalog`} className={styles.breadcrumbLink}>{tNav('catalog')}</Link>
          <span className={styles.breadcrumbSep}>/</span>
          <span className={styles.breadcrumbCurrent}>{product.name}</span>
        </nav>

        <div className={styles.product}>
          {/* Product Image Placeholder */}
          <div className={styles.imageSection}>
            <div className={styles.imagePlaceholder}>
              <span className={styles.imageInitial}>{product.name.charAt(0)}</span>
            </div>
          </div>

          {/* Product Info */}
          <div className={styles.infoSection}>
            <div className={styles.header}>
              <span className={styles.category}>{product.category}</span>
              <h1 className={styles.title}>{product.name}</h1>
              <p className={styles.description}>{product.description}</p>
            </div>

            {/* Specifications */}
            <div className={styles.specs}>
              <h2 className={styles.specsTitle}>{t('specifications')}</h2>
              <dl className={styles.specsList}>
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className={styles.specItem}>
                    <dt className={styles.specKey}>{key}</dt>
                    <dd className={styles.specValue}>{value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Certificates */}
            <div className={styles.certificates}>
              <h2 className={styles.certificatesTitle}>{t('certificates')}</h2>
              <div className={styles.certificatesList}>
                {product.certificates.map((cert) => (
                  <span key={cert} className={styles.certificate}>{cert}</span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className={styles.actions}>
              <Link href={`/${locale}/contacts`} className={styles.buttonPrimary}>
                {tCta('contact')}
              </Link>
              <Link href={`/${locale}/catalog`} className={styles.buttonOutline}>
                {t('backToCatalog')}
              </Link>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className={styles.related}>
            <h2 className={styles.relatedTitle}>{t('related')}</h2>
            <ProductGrid products={relatedProducts} />
          </div>
        )}
      </div>
    </main>
  );
}
