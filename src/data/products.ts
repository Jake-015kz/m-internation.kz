import type { Product } from '@/types';

export const products: Product[] = [
  {
    slug: 'micrystal',
    name: 'MiCrystal',
    description: 'Клеточное питание для здоровья глаз. 100% натуральный состав: экстракт бузины, ФлораГЛО*, лютеин и астаксантин. Понижает глазное давление, снимает покраснение и дискомфорт от долгой работы за экраном.',
    images: ['/products/micrystal/main.png'],
    category: 'Зрение',
    specifications: {
      'Форма выпуска': 'Порошок',
      'Упаковка': '30 порций',
    },
    certificates: ['GMP', 'ISO', 'HALAL'],
  },
  {
    slug: 'greenmax',
    name: 'GreenMAX',
    description: 'Растительная формула 3 в 1: очищение кишечника, восстановление микрофлоры, защита печени. Пребиотики, пробиотики, ферменты, клетчатка, антиоксиданты.',
    images: ['/products/greenmax/main.png'],
    category: 'Детокс',
    specifications: {
      'Форма выпуска': 'Порошок',
      'Упаковка': '30 порций',
    },
    certificates: ['GMP', 'ISO', 'HALAL'],
  },
  {
    slug: 'mimax',
    name: 'MiMAX',
    description: 'Мощный антиоксидант №1 с астаксантином. Действие в 6000 раз мощнее витамина С. Замедляет старение, защищает клетки, укрепляет сердце и печень.',
    images: ['/products/mimax/main.png'],
    category: 'Антиоксидант',
    specifications: {
      'Форма выпуска': 'Капсулы',
      'Упаковка': '60 капсул',
    },
    certificates: ['GMP', 'ISO', 'HALAL'],
  },
  {
    slug: 'blumax',
    name: 'BluMAX',
    description: 'Сине-зелёные водоросли AFA + витамин С. 60+ минералов, нейропептиды, органическое железо. Укрепление иммунитета, улучшение памяти и концентрации.',
    images: ['/products/blumax/main.png'],
    category: 'Иммунитет',
    specifications: {
      'Форма выпуска': 'Жидкость',
      'Упаковка': '100 мл',
    },
    certificates: ['GMP', 'ISO', 'HALAL'],
  },
  {
    slug: 'nutrimax',
    name: 'NutriMAX',
    description: 'Полноценное питание в одном коктейле. Соевый протеин + спирулина + хлорелла. Для энергии, восстановления после нагрузок и управления весом.',
    images: ['/products/nutrimax/main.png'],
    category: 'Питание',
    specifications: {
      'Форма выпуска': 'Порошок',
      'Упаковка': '30 порций',
    },
    certificates: ['GMP', 'ISO', 'HALAL', 'VEGAN'],
  },
  {
    slug: 'fleximax',
    name: 'FlexiMAX',
    description: 'Комплексная защита суставов, хрящей и костей. Глюкозамин растительный + куркума + гиалуроновая кислота. Снимает боль и воспаление.',
    images: ['/products/fleximax/main.png'],
    category: 'Суставы',
    specifications: {
      'Форма выпуска': 'Капсулы',
      'Упаковка': '60 капсул',
    },
    certificates: ['GMP', 'ISO', 'HALAL'],
  },
  {
    slug: 'machoman',
    name: 'MachoMAN',
    description: 'Клеточное питание для мужчин. Поддержка половой функции, повышение тестостерона, выносливость и энергия. Мака перуанская + L-аргинин + женьшень.',
    images: ['/products/machoman/main.png'],
    category: 'Мужское здоровье',
    specifications: {
      'Форма выпуска': 'Капсулы',
      'Упаковка': '60 капсул',
    },
    certificates: ['GMP', 'ISO', 'HALAL'],
  },
  {
    slug: 'ye-katerina',
    name: 'Ye-Katerina',
    description: 'Натуральные прокладки с экстрактом алоэ вера и ионами серебра. Антибактериальный эффект, защита от бактерий и неприятного запаха. Комфорт и безопасность.',
    images: ['/products/ye-katerina/main.png'],
    category: 'Женская гигиена',
    specifications: {
      'Тип': 'Прокладки',
      'Упаковка': '10 шт',
    },
    certificates: ['GMP', 'ISO', 'HALAL'],
  },
  {
    slug: 'mitown',
    name: 'MiTOWN',
    description: 'Натуральный кофе 100% арабика. Клеточное питание с функциональными ингредиентами. Энергия и бодрость без побочных эффектов.',
    images: ['/products/mitown/main.png'],
    category: 'Питание',
    specifications: {
      'Форма выпуска': 'Кофе',
      'Упаковка': '50 г',
    },
    certificates: ['GMP', 'ISO', 'HALAL'],
  },
  {
    slug: 'lamor',
    name: "L'AMOR",
    description: 'Мультизерновой продукт. Орис, овес, мультизерно, соя, фукус, алоэ, листовой чай, мята перечная, ферменты, жасмин. Полноценное питание для всей семьи.',
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
    description: 'Для сердечно-сосудистой системы. 8 преимуществ для здоровья: укрепление сосудов, нормализация давления, снижение холестерина, профилактика тромбозов.',
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
    description: 'Протеиновый продукт для набора мышечной массы и восстановления после тренировок. Быстрое усвоение, высокое содержание белка.',
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
    description: 'Энергетический активатор воды. Основан на концепции Ци (ТКМ). Дальнее инфракрасное излучение для структурирования воды и повышения её энергетического потенциала.',
    images: ['/products/ebooster/main.png'],
    category: 'Аксессуары',
    specifications: {
      'Тип': 'Активационный стержень',
      'Срок службы': '2 года',
    },
    certificates: ['GMP', 'ISO'],
  },
  {
    slug: 'chai-relax',
    name: 'Чай Relax',
    description: 'Расслабляющий травяной чай. Натуральный состав для снятия стресса, улучшения сна и восстановления нервной системы. Без кофеина.',
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
    description: 'Био-энергетическая карта для защиты от электромагнитного излучения. Структурирование энергетического поля человека. Срок действия: 2 года.',
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
