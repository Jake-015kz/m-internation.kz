import "@/styles/tailwind.css";
import type { Metadata } from "next";
import Script from "next/script";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { manrope, onest, dmSerif } from "@/lib/fonts";
import { SITE_CONFIG } from "@/lib/constants";
import { Header, Footer, MobileMenuProvider, MobileMenu } from "@/components/layout";
import { ClientProviders } from "./ClientProviders";

function getThemeScript() {
  return `
    (function() {
      try {
        var saved = localStorage.getItem('theme');
        if (saved === 'light' || saved === 'dark') {
          document.documentElement.setAttribute('data-theme', saved);
          document.documentElement.style.colorScheme = saved;
        } else {
          var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
          var t = prefersDark ? 'dark' : 'light';
          document.documentElement.setAttribute('data-theme', t);
          document.documentElement.style.colorScheme = t;
        }
      } catch (e) {
        document.documentElement.setAttribute('data-theme', 'light');
        document.documentElement.style.colorScheme = 'light';
      }
    })();
  `;
}

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "M-International",
  url: SITE_CONFIG.url,
  description:
    "Международная компания по производству БАДов и оздоровительной продукции",
  foundingDate: "2010",
  logo: `${SITE_CONFIG.url}/logo.png`,
  address: {
    "@type": "PostalAddress",
    addressCountry: "KZ",
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    availableLanguage: ["Russian", "English", "Kazakh"],
  },
  sameAs: [
    "https://www.instagram.com/m.international",
    "https://www.facebook.com/m.international",
    "https://www.youtube.com/@m.international",
  ],
  availableLanguage: ["ru", "en", "kk"],
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: SITE_CONFIG.name,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description:
    "M-International — международная компания по производству БАДов и оздоровительной продукции. Растительные формулы для здоровья с международными сертификатами качества.",
  authors: [{ name: SITE_CONFIG.name }],
  openGraph: {
    type: "website",
    locale: "ru_KZ",
    siteName: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    description:
      "Растительные формулы для здоровья с международными сертификатами качества. Натуральные биодобавки для иммунитета, детокса и долголетия от M-International.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "M-International — БАДы и оздоровительная продукция",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@minternational",
    title: SITE_CONFIG.name,
    description:
      "Растительные формулы для здоровья с международными сертификатами качества.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: SITE_CONFIG.url,
    languages: {
      "ru": `${SITE_CONFIG.url}/ru`,
      "en": `${SITE_CONFIG.url}/en`,
      "kk": `${SITE_CONFIG.url}/kk`,
      "x-default": `${SITE_CONFIG.url}/ru`,
    },
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();
  const themeScript = getThemeScript();

  return (
    <html
      lang={locale}
      className={`${manrope.variable} ${onest.variable} ${dmSerif.variable}`}
      suppressHydrationWarning
    >
      <head>
        <meta name="theme-color" content="#0f0f14" media="(prefers-color-scheme: dark)" />
        <meta name="theme-color" content="#f7f7f2" media="(prefers-color-scheme: light)" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <Script
          id="theme-script"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: themeScript }}
        />
        <Script
          id="organization-schema"
          strategy="afterInteractive"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
      </head>
      <body className={`${onest.className} antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <MobileMenuProvider>
             <ClientProviders>
               <MobileMenu />
               <div className="relative z-10 flex min-h-screen flex-col">
                 <a
                   href="#main-content"
                   className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[10000] focus:bg-[var(--accent-primary)] focus:text-white focus:px-4 focus:py-2 focus:rounded"
                 >
                     {locale === "ru" ? "Перейти к содержимому" : locale === "kk" ? "Мазмұнына өту" : "Skip to content"}
                 </a>
                 <Header />
                 <main id="main-content" className="flex-[1_1_auto]">{children}</main>
                 <Footer />
               </div>
             </ClientProviders>
           </MobileMenuProvider>
         </NextIntlClientProvider>
      </body>
    </html>
  );
}
