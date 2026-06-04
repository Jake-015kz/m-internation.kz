'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Menu, X, Phone } from 'lucide-react';
import { SITE_CONFIG, CONTACTS } from '@/lib/constants';
import { LanguageSwitcher } from './LanguageSwitcher';
import { ThemeSwitcher } from './ThemeSwitcher';
import styles from './Header.module.scss';

export function Header() {
  const locale = useLocale();
  const t = useTranslations('nav');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  const headerBg = useTransform(
    scrollY,
    [0, 100],
    ['rgba(20, 20, 20, 0)', 'rgba(20, 20, 20, 0.95)']
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: `/${locale}`, label: t('home') },
    { href: `/${locale}/catalog`, label: t('catalog') },
    { href: `/${locale}/about`, label: t('about') },
    { href: `/${locale}/business`, label: t('business') },
    { href: `/${locale}/contacts`, label: t('contacts') },
  ];

  return (
    <motion.header
      className={`${styles.header} ${isScrolled ? styles.headerScrolled : ''}`}
      style={{ backgroundColor: headerBg }}
    >
      <div className={styles.container}>
        <Link href={`/${locale}`} className={styles.logo}>
          <span className={styles.logoText}>{SITE_CONFIG.name}</span>
          <span className={styles.logoDot} />
        </Link>

        <nav className={styles.nav} role="navigation" aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={styles.navLink}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className={styles.actions}>
          <a href={`tel:${CONTACTS.phone}`} className={styles.phone} aria-label={CONTACTS.phone}>
            <Phone size={16} />
            <span>{CONTACTS.phone}</span>
          </a>

          <LanguageSwitcher />
          
          <ThemeSwitcher />

          {/* Кнопка "Контакты" — скрыта на мобилке, видна на md+ */}
          <Link href={`/${locale}/contacts`} className={styles.ctaButton}>
            {t('contacts')}
          </Link>

          <button
            className={styles.mobileMenuButton}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        className={styles.mobileMenu}
        initial={false}
        animate={{ height: isMenuOpen ? 'auto' : 0 }}
        transition={{ duration: 0.3 }}
      >
        <nav className={styles.mobileNav} role="navigation" aria-label="Mobile navigation">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={styles.mobileNavLink}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <a
            href={`tel:${CONTACTS.phone}`}
            className={styles.mobilePhone}
          >
            <Phone size={16} />
            {CONTACTS.phone}
          </a>
        </nav>
      </motion.div>
    </motion.header>
  );
}
