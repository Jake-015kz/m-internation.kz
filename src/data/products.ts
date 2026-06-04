import type { Product } from '@/types';

export const products: Product[] = [
  {
    slug: 'greenmax',
    name: 'GreenMAX',
    description: 'Детокс, иммунитет, энергия. Содержит пребиотики, пробиотики, ферменты, клетчатку, антиоксиданты.',
    images: ['/products/greenmax/main.png'],
    category: 'Детокс',
    specifications: {
      'Форма выпуска': 'Порошок',
      'Упаковка': '30 порций',
    },
    certificates: ['GMP', 'ISO', 'HALAL'],
  },
  {
    slug: 'blumax',
    name: 'BluMAX',
    description: 'Для детей и взрослых. Поддержка иммунитета.',
    images: ['/products/blumax/main.png'],
    category: 'Иммунитет',
    specifications: {
      'Форма выпуска': 'Жидкость',
      'Упаковка': '100 мл',
    },
    certificates: ['GMP', 'ISO', 'HALAL'],
  },
  {
    slug: 'ye-katerina',
    name: 'Ye-Katerina',
    description: 'Продукт для женского здоровья.',
    images: ['/products/ye-katerina/main.png'],
    category: 'Женское здоровье',
    specifications: {
      'Форма выпуска': 'Капсулы',
      'Упаковка': '60 капсул',
    },
    certificates: ['GMP', 'ISO', 'HALAL'],
  },
  {
    slug: 'lamor',
    name: "L'AMOR",
    description: 'Мультизерновой продукт. Содержит: орис, овес, мультизерно, соя, фукус, алоэ, листовой чай, мята перечная, ферменты, жасмин.',
    images: ['/products/lamor/main.png'],
    category: 'Питание',
    specifications: {
      'Форма выпуска': 'Порошок',
      'Упаковка': '500 г',
    },
    certificates: ['GMP', 'ISO', 'HALAL', 'VEGAN'],
  },
  {
    slug: 'kordymax',
    name: 'KordyMAX',
    description: 'Для сердечно-сосудистой системы. 8 преимуществ для здоровья.',
    images: ['/products/kordymax/main.png'],
    category: 'Сердце',
    specifications: {
      'Форма выпуска': 'Капсулы',
      'Упаковка': '60 капсул',
    },
    certificates: ['GMP', 'ISO', 'HALAL', 'FDA'],
  },
  {
    slug: 'promax',
    name: 'ProMAX',
    description: 'Протеиновый продукт.',
    images: ['/products/promax/main.png'],
    category: 'Протеины',
    specifications: {
      'Форма выпуска': 'Порошок',
      'Упаковка': '500 г',
    },
    certificates: ['GMP', 'ISO', 'HALAL'],
  },
  {
    slug: 'ebooster',
    name: 'Ebooster',
    description: 'Энергетический активатор воды. Основан на концепции Ци (ТКМ). Дальнее инфракрасное излучение.',
    images: ['/products/ebooster/main.png'],
    category: 'Аксессуары',
    specifications: {
      'Тип': 'Активационный стержень',
      'Срок службы': '2 года',
    },
    certificates: ['GMP', 'ISO'],
  },
  {
    slug: 'fleximax',
    name: 'FlexiMAX',
    description: 'Для гибкости суставов и связок.',
    images: ['/products/fleximax/main.png'],
    category: 'Суставы',
    specifications: {
      'Форма выпуска': 'Капсулы',
      'Упаковка': '60 капсул',
    },
    certificates: ['GMP', 'ISO', 'HALAL'],
  },
  {
    slug: 'nutrimax',
    name: 'NutriMAX',
    description: 'Полное питание, 6 основных преимуществ.',
    images: ['/products/nutrimax/main.png'],
    category: 'Питание',
    specifications: {
      'Форма выпуска': 'Порошок',
      'Упаковка': '30 порций',
    },
    certificates: ['GMP', 'ISO', 'HALAL', 'VEGAN'],
  },
  {
    slug: 'machoman',
    name: 'MachoMAN',
    description: 'Для мужского здоровья.',
    images: ['/products/machoman/main.png'],
    category: 'Мужское здоровье',
    specifications: {
      'Форма выпуска': 'Капсулы',
      'Упаковка': '60 капсул',
    },
    certificates: ['GMP', 'ISO', 'HALAL'],
  },
  {
    slug: 'mitown',
    name: 'MiTown',
    description: 'Городской продукт. Позиционирование для жителей городов.',
    images: ['/products/mitown/main.png'],
    category: 'Городская жизнь',
    specifications: {
      'Форма выпуска': 'Капсулы',
      'Упаковка': '60 капсул',
    },
    certificates: ['GMP', 'ISO', 'HALAL'],
  },
  {
    slug: 'chai-relax',
    name: 'Чай Relax',
    description: 'Расслабляющий чай.',
    images: ['/products/chai-relax/main.png'],
    category: 'Напитки',
    specifications: {
      'Форма выпуска': 'Чай',
      'Упаковка': '20 пакетиков',
    },
    certificates: ['GMP', 'ISO', 'HALAL', 'ORGANIC'],
  },
  {
    slug: 'energy-card',
    name: 'Energy Card',
    description: 'Био-энергетическая карта для защиты от электромагнитного излучения. Срок действия: 2 года.',
    images: ['/products/energy-card/main.png'],
    category: 'Аксессуары',
    specifications: {
      'Тип': 'Био-энергетическая карта',
      'Срок действия': '2 года',
    },
    certificates: ['GMP', 'ISO'],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((product) => product.category === category);
}

export function getRelatedProducts(slug: string, limit: number = 4): Product[] {
  const product = getProductBySlug(slug);
  if (!product) return [];

  return products
    .filter((p) => p.slug !== slug && p.category === product.category)
    .slice(0, limit);
}
