import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { CONTACTS } from '@/lib/constants';
import styles from './contacts.module.scss';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contactsPage' });
  
  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function ContactsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contactsPage' });

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

      <section className={styles.contacts}>
        <div className={styles.container}>
          <div className={styles.list}>
            <a href={`tel:${CONTACTS.phone}`} className={styles.item}>
              <h3 className={styles.itemTitle}>{t('phone')}</h3>
              <p className={styles.itemText}>{CONTACTS.phone}</p>
            </a>

            <a href={`mailto:${CONTACTS.email}`} className={styles.item}>
              <h3 className={styles.itemTitle}>{t('email')}</h3>
              <p className={styles.itemText}>{CONTACTS.email}</p>
            </a>

            <a href={CONTACTS.instagram} target="_blank" rel="noopener noreferrer" className={styles.item}>
              <h3 className={styles.itemTitle}>{t('instagram')}</h3>
              <p className={styles.itemText}>@indira_seytimbekovna</p>
            </a>

            <a href={CONTACTS.tiktok} target="_blank" rel="noopener noreferrer" className={styles.item}>
              <h3 className={styles.itemTitle}>{t('tiktok')}</h3>
              <p className={styles.itemText}>@minternational.kz</p>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
