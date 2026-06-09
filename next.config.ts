import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/config.ts');

const nextConfig: NextConfig = {
  // Optimize bundle
  // Next.js 16 handles tree-shaking automatically via Turbopack
};

export default withNextIntl(nextConfig);
