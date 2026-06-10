export interface Product {
  slug: string;
  name: string;
  description: string;
  images: string[];
  category: string;
  specifications: Record<string, string>;
  certificates: string[];
  price?: string;
}
