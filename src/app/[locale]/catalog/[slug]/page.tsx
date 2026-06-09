import { products } from "@/data/products";
import { routing } from "@/i18n/routing";
import { getProductBySlug, getRelatedProducts } from "@/services/productService";
import { ProductPageClient } from "./page.client";

export function generateStaticParams() {
  // Generate params for all locale + slug combinations
  const slugs = products.map((product) => product.slug);
  const params: { slug: string; locale: string }[] = [];
  for (const locale of routing.locales) {
    for (const slug of slugs) {
      params.push({ slug, locale });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;
  const product = await getProductBySlug(slug);
  const baseUrl = "https://m-international.kz";

  if (!product) return { title: "Product not found" };

  return {
    title: `${product.name} | M-International`,
    description: product.description,
    alternates: {
      canonical: `${baseUrl}/${locale}/catalog/${slug}`,
      languages: {
        "ru": `${baseUrl}/ru/catalog/${slug}`,
        "en": `${baseUrl}/en/catalog/${slug}`,
        "kk": `${baseUrl}/kk/catalog/${slug}`,
        "x-default": `${baseUrl}/ru/catalog/${slug}`,
      },
    },
    openGraph: {
      type: "website",
      locale: locale === "ru" ? "ru_KZ" : locale === "kk" ? "kk_KZ" : "en_US",
      siteName: "M-International",
      title: `${product.name} | M-International`,
      description: product.description,
    },
  };
}

interface ProductPageProps {
  params: Promise<{ slug: string; locale: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug, locale } = await params;
  const [product, relatedProducts] = await Promise.all([
    getProductBySlug(slug),
    getRelatedProducts(slug, 4),
  ]);

  if (!product) {
    const { notFound } = await import("next/navigation");
    notFound();
  }

  return <ProductPageClient locale={locale} product={product as import("@/types").Product} relatedProducts={relatedProducts} />;
}
