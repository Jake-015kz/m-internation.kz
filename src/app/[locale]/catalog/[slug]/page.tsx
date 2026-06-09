import { products, getProductBySlug, getRelatedProducts } from "@/data/products";
import { ProductPageClient } from "./page.client";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;
  const product = getProductBySlug(slug);
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

export default function ProductPage({ params }: ProductPageProps) {
  return <ProductPageClient params={params} />;
}
