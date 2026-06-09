import "@/styles/tailwind.css";
import type { Metadata } from "next";
import Script from "next/script";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { manrope, onest, jetbrainsMono } from "@/lib/fonts";
import { SITE_CONFIG } from "@/lib/constants";
import { Header, Footer } from "@/components/layout";
import { LenisProvider } from "@shared/LenisProvider";
import { ProvidersWrapper } from "@shared/ProvidersWrapper";
import CursorGlowDynamic from "@shared/CursorGlow/CursorGlowDynamic";

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
        document.documentElement.setAttribute('data-theme', 'dark');
        document.documentElement.style.colorScheme = 'dark';
      }
    })();
  `;
}

// Schema.org Organization JSON-LD
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "M-International",
  url: SITE_CONFIG.url,
  description:
    "Международная компания по производству БАДов и оздоровительной продукции",
  foundingDate: "2010",
  address: {
    "@type": "PostalAddress",
    addressCountry: "KZ",
  },
  sameAs: [
    "https://www.instagram.com/m.international",
    "https://www.facebook.com/m.international",
    "https://www.youtube.com/@m.international",
  ],
  knowsAbout: ["Russian", "English", "Kazakh"],
};

export const metadata: Metadata = {
  title: {
    default: SITE_CONFIG.name,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description:
    "M-International — международная компания по производству БАДов и оздоровительной продукции. Инновационные натуральные продукты для вашего здоровья и долголетия.",
  keywords: [
    "БАДы", "здоровье", "M-International", "MLM", "биодобавки",
    "велнес", "GreenMAX", "BluMAX", "Ye-Katerina",
  ],
  authors: [{ name: SITE_CONFIG.name }],
  openGraph: {
    type: "website",
    locale: "ru_KZ",
    siteName: SITE_CONFIG.name,
    description:
      "Инновационные натуральные продукты для вашего здоровья и долголетия от M-International",
  },
  alternates: {
    canonical: "/",
    languages: {
      ru: "/ru",
      en: "/en",
      kk: "/kk",
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
      className={`${manrope.variable} ${onest.variable} ${jetbrainsMono.variable}`}
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
          <LenisProvider>
            <ProvidersWrapper>
              <div className="relative z-10 flex min-h-screen flex-col">
                <Header />
                <main style={{ flex: "1 1 auto" }}>{children}</main>
                <Footer />
              </div>
              <CursorGlowDynamic />
            </ProvidersWrapper>
          </LenisProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
