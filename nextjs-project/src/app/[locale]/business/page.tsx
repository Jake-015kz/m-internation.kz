import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import styles from './business.module.scss';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'businessPage' });
  
  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function BusinessPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'business' });
  const tPage = await getTranslations({ locale, namespace: 'businessPage' });
  const tNav = await getTranslations({ locale, namespace: 'nav' });

  const steps = [
    { step: '01', title: t('steps.register.title'), desc: t('steps.register.description') },
    { step: '02', title: t('steps.training.title'), desc: t('steps.training.description') },
    { step: '03', title: t('steps.income.title'), desc: t('steps.income.description') },
  ];

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

      <section className={styles.steps}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>{tPage('howToStart')}</h2>
          <div className={styles.list}>
            {steps.map((item) => (
              <div key={item.step} className={styles.item}>
                <span className={styles.stepNumber}>{item.step}</span>
                <div className={styles.itemContent}>
                  <h3 className={styles.itemTitle}>{item.title}</h3>
                  <p className={styles.itemText}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.cta}>
        <div className={styles.container}>
          <h2 className={styles.ctaTitle}>{t('cta')}</h2>
          <p className={styles.ctaDescription}>
            {t('description')}
          </p>
          <Link href={`/${locale}/contacts`} className={styles.ctaButton}>
            {tNav('contacts')}
          </Link>
        </div>
      </section>
    </main>
  );
}
