'use client';

import { useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';
import { Globe } from 'lucide-react';
import styles from './LanguageSwitcher.module.scss';

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();

  const switchLocale = (newLocale: string) => {
    // Убираем текущий префикс локали из пути и добавляем новый
    const pathWithoutLocale = pathname.replace(/^\/(ru|en|kk)/, '') || '/';
    const newPath = `/${newLocale}${pathWithoutLocale}`;
    // Используем window.location для полной перезагрузки с новой локалью
    window.location.href = newPath;
  };

  return (
    <div className={styles.switcher}>
      <Globe className={styles.icon} size={18} />
      <select
        value={locale}
        onChange={(e) => switchLocale(e.target.value)}
        className={styles.select}
        aria-label="Select language"
      >
        <option value="ru">RU</option>
        <option value="en">EN</option>
        <option value="kk">KZ</option>
      </select>
    </div>
  );
}
