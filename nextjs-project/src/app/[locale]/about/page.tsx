import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import styles from './about.module.scss';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'aboutPage' });
  
  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about' });
  const tPage = await getTranslations({ locale, namespace: 'aboutPage' });

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

      <section className={styles.content}>
        <div className={styles.container}>
          <div className={styles.grid}>
            <div className={styles.item}>
              <h3 className={styles.itemTitle}>{tPage('mission')}</h3>
              <p className={styles.itemText}>
                {t('mission')}
              </p>
            </div>
            <div className={styles.item}>
              <h3 className={styles.itemTitle}>{tPage('vision')}</h3>
              <p className={styles.itemText}>
                {tPage('visionText')}
              </p>
            </div>
            <div className={styles.item}>
              <h3 className={styles.itemTitle}>{tPage('values')}</h3>
              <p className={styles.itemText}>
                {tPage('valuesText')}
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
