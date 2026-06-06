import { routing } from "@/i18n/routing";

// Генерация статических параметров для SSG всех локалей
export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// Этот layout расширяет корневой layout.tsx
// Schema.org разметка находится в src/app/layout.tsx
export default function LocaleLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
