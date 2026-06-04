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

export interface Contact {
  phone: string;
  email: string;
  socialLinks: SocialLink[];
}

export interface SocialLink {
  platform: string;
  url: string;
  username: string;
}

export interface Review {
  id: string;
  author: string;
  text: string;
  rating: number;
  date: string;
  avatar?: string;
}

export interface Founder {
  id: string;
  name: string;
  role: string;
  image: string;
  description: string;
}

export interface Certificate {
  id: string;
  name: string;
  image: string;
}
