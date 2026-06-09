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
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) return { title: "Product not found" };

  return {
    title: product.name,
    description: product.description,
  };
}

interface ProductPageProps {
  params: Promise<{ slug: string; locale: string }>;
}

export default function ProductPage({ params }: ProductPageProps) {
  return <ProductPageClient params={params} />;
}
