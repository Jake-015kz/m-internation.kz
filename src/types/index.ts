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

export interface Founder {
  id: string;
  name: string;
  role: string;
  image: string;
  description: string;
}
