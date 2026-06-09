// src/data/products.ts — single source of truth for product data
import type { Product } from "@/types";

export const products: Product[] = [
  // ═══════════════════════════════════════════
  // SUPPLEMENTS (БАДы)
  // ═══════════════════════════════════════════
  {
    slug: "micrystal",
    name: "MiCrystal",
    description: "Клеточное питание для здоровья глаз. 100% натуральный состав: экстракт бузины, ФлораГЛО*, лютеин и астаксантин. Снижает глазное давление, снимает покраснение и сухость при работе за экраном. Профилактика возрастных изменений зрения. Натуральные биодобавки для остроты зрения.",
    images: ["/images/products/main/supplement/micrystal.png"],
    category: "Зрение",
    specifications: {
      "Форма выпуска": "Порошок",
      "Упаковка": "30 порций",
    },
    certificates: ["GMP", "ISO", "HALAL"],
  },
  {
    slug: "greenmax",
    name: "GreenMAX",
    description: "Растительная формула 3 в 1: очищение кишечника, восстановление микрофлоры, защита печени. Пребиотики, пробиотики, ферменты, клетчатка, антиоксиданты. Комплексная детоксикация организма натуральными ингредиентами. Очищает кишечник от токсинов, восстанавливает микрофлору, защищает печень.",
    images: ["/images/products/main/supplement/greenmax.png"],
    category: "Детокс",
    specifications: {
      "Форма выпуска": "Порозок",
      "Упаковка": "30 порций",
    },
    certificates: ["GMP", "ISO", "HALAL"],
  },
  {
    slug: "mimax",
    name: "MiMAX",
    description: "Мощный антиоксидант №1 с астаксантином. Действие в 6000 раз мощнее витамина С. Замедляет старение клеток, защищает от свободных радикалов, укрепляет сердце и печень. Антиоксидантная защита для активного долголетия. Улучшение зрения и состояния кожи.",
    images: ["/images/products/main/supplement/mimax.png"],
    category: "Антиоксидант",
    specifications: {
      "Форма выпуска": "Капсулы",
      "Упаковка": "60 капсул",
    },
    certificates: ["GMP", "ISO", "HALAL"],
  },
  {
    slug: "blumax",
    name: "BluMAX",
    description: "Сине-зелёные водоросли AFA + витамин С. 60+ минералов, нейропептиды, органическое железо. Укрепление иммунитета, улучшение памяти и концентрации. Комплексная поддержка мозга и сосудов натуральными ингредиентами. Очищение сосудов, профилактика тромбов.",
    images: ["/images/products/main/supplement/blumax.png"],
    category: "Иммунитет",
    specifications: {
      "Форма выпуска": "Жидкость",
      "Упаковка": "100 мл",
    },
    certificates: ["GMP", "ISO", "HALAL"],
  },
  {
    slug: "nutrimax",
    name: "NutriMAX",
    description: "Полноценное питание в одном коктейле. Соевый протеин + спирулина + хлорелла. Для энергии, восстановления после нагрузок и управления весом. Сбалансированный растительный белок для всей семьи. Рекомендован спортсменам и вегетарианцам.",
    images: ["/images/products/main/supplement/nutrimax.png"],
    category: "Питание",
    specifications: {
      "Форма выпуска": "Порошок",
      "Упаковка": "30 порций",
    },
    certificates: ["GMP", "ISO", "HALAL", "VEGAN"],
  },
  {
    slug: "fleximax",
    name: "FlexiMAX",
    description: "Комплексная защита суставов, хрящей и костей. Глюкозамин растительный + куркума + гиалуроновая кислота. Снимает боль и воспаление, восстанавливает подвижность. Профилактика артритов и артрозов. Показан при артритах, артрозах.",
    images: ["/images/products/main/supplement/fleximax.png"],
    category: "Суставы",
    specifications: {
      "Форма выпуска": "Капсулы",
      "Упаковка": "60 капсул",
    },
    certificates: ["GMP", "ISO", "HALAL"],
  },
  {
    slug: "machoman",
    name: "MachoMAN",
    description: "Клеточное питание для мужчин. Поддержка половой функции, повышение тестостерона, выносливость и энергия. Мака перуанская + L-аргинин + женьшень. Натуральная поддержка мужского здоровья и жизненной силы. Повышение либидо и качества спермы.",
    images: ["/images/products/main/supplement/machoman.png"],
    category: "Мужское здоровье",
    specifications: {
      "Форма выпуска": "Капсулы",
      "Упаковка": "60 капсул",
    },
    certificates: ["GMP", "ISO", "HALAL"],
  },
  {
    slug: "mishroom",
    name: "MiSHROOM",
    description: "Грибной продукт для полноценного питания. Замена приёма пищи с богатым составом витаминов и минералов. Поддержка иммунитета и общего тонуса организма. Традиционная грибная медицина для современного человека.",
    images: ["/images/products/main/supplement/mishroom.png"],
    category: "Питание",
    specifications: {
      "Форма выпуска": "Порошок",
      "Упаковка": "30 порций",
    },
    certificates: ["GMP", "ISO", "HALAL"],
  },
  {
    slug: "lamor",
    name: "L'AMOR",
    description: "Мультизерновой продукт для полноценного питания. Орис, овес, мультизерно, соя, фукус, алоэ, листовой чай, мята перечная, ферменты, жасмин. Полноценное питание для всей семьи.",
    images: ["/products/lamor/main.png"],
    category: "Питание",
    specifications: {
      "Форма выпуска": "Порошок",
      "Упаковка": "500 г",
    },
    certificates: ["GMP", "ISO", "HALAL", "VEGAN"],
  },
  {
    slug: "kordymax",
    name: "KordyMAX",
    description: "Для сердечно-сосудистой системы. 8 преимуществ для здоровья: укрепление сосудов, нормализация давления, снижение холестерина, профилактика тромбозов. Натуральная поддержка сердца и сосудов.",
    images: ["/products/kordymax/main.png"],
    category: "Сердце",
    specifications: {
      "Форма выпуска": "Капсулы",
      "Упаковка": "60 капсул",
    },
    certificates: ["GMP", "ISO", "HALAL", "FDA"],
  },
  {
    slug: "promax",
    name: "ProMAX",
    description: "Протеиновый продукт для набора мышечной массы и восстановления после тренировок. Быстрое усвоение, высокое содержание белка. Спортивное питание для активного образа жизни.",
    images: ["/products/promax/main.png"],
    category: "Протеины",
    specifications: {
      "Форма выпуска": "Порошок",
      "Упаковка": "500 г",
    },
    certificates: ["GMP", "ISO", "HALAL"],
  },

  // ═══════════════════════════════════════════
  // PERSONAL CARE (Личная гигиена)
  // ═══════════════════════════════════════════
  {
    slug: "ye-katerina",
    name: "Ye-Katerina",
    description: "Натуральные прокладки с экстрактом алоэ вера и ионами серебра. Антибактериальный эффект, защита от бактерий и неприятного запаха. Комфорт и безопасность для женского здоровья каждый день.",
    images: ["/images/products/main/personal/yekaterina.png"],
    category: "Женская гигиена",
    specifications: {
      "Тип": "Прокладки",
      "Упаковка": "10 шт",
    },
    certificates: ["GMP", "ISO", "HALAL"],
  },
  {
    slug: "mi-mask",
    name: "Mi MASK",
    description: "Гинзенговая маска для лица. Питание, увлажнение и омоложение кожи. Натуральный состав с экстрактом женьшеня для сияния, упругости и молодости кожи.",
    images: ["/images/products/main/personal/mimask.png"],
    category: "Уход за лицом",
    specifications: {
      "Тип": "Маска для лица",
      "Упаковка": "5 шт",
    },
    certificates: ["GMP", "ISO"],
  },
  {
    slug: "mi-serum",
    name: "Mi SERUM",
    description: "Гинзенговая паровая сыворотка для клеток кожи. Глубокое питание и восстановление. Активирует клеточное обновление, улучшает текстуру, тонус и эластичность кожи.",
    images: ["/images/products/main/personal/miserum.png"],
    category: "Уход за лицом",
    specifications: {
      "Тип": "Сыворотка",
      "Упаковка": "30 мл",
    },
    certificates: ["GMP", "ISO"],
  },
  {
    slug: "magicare",
    name: "Magicare",
    description: "Инновационный продукт по уходу за кожей. Комплексный уход для здоровья и красоты кожи с натуральными ингредиентами.",
    images: ["/images/products/main/personal/magicare.png"],
    category: "Уход за кожей",
    specifications: {},
    certificates: ["GMP", "ISO"],
  },
  {
    slug: "mifresh",
    name: "MiFresh",
    description: "Продукт для ежедневной гигиены. Свежесть и чистота на весь день. Натуральный состав без агрессивной химии.",
    images: ["/images/products/main/personal/mifresh.png"],
    category: "Гигиена",
    specifications: {},
    certificates: ["GMP", "ISO"],
  },

  // ═══════════════════════════════════════════
  // LIFESTYLE (Образ жизни)
  // ═══════════════════════════════════════════
  {
    slug: "mitown",
    name: "MiTOWN",
    description: "Натуральный кофе с кордицепсом. 100% арабика с функциональными ингредиентами. Энергия и бодрость без побочных эффектов. Функциональный напиток для активного образа жизни.",
    images: ["/images/products/main/lifestyle/mitown-cordyceps.png"],
    category: "Напитки",
    specifications: {
      "Форма выпуска": "Кофе",
      "Упаковка": "50 г",
    },
    certificates: ["GMP", "ISO", "HALAL"],
  },
  {
    slug: "essential-oil",
    name: "Essential Oil",
    description: "Эфирные масла для ароматерапии и велнеса. Натуральные масла для расслабления, восстановления и создания гармоничной атмосферы.",
    images: ["/images/products/main/lifestyle/essential.png"],
    category: "Ароматерапия",
    specifications: {
      "Тип": "Эфирные масла",
      "Упаковка": "10 мл",
    },
    certificates: ["GMP", "ISO", "ORGANIC"],
  },
  {
    slug: "relax",
    name: "Relax Tea",
    description: "Расслабляющий травяной чай. Натуральный состав для снятия стресса, улучшения сна и восстановления нервной системы. Без кофеина.",
    images: ["/images/products/main/lifestyle/relax.png"],
    category: "Напитки",
    specifications: {
      "Форма выпуска": "Чай",
      "Упаковка": "20 пакетиков",
    },
    certificates: ["GMP", "ISO", "HALAL", "ORGANIC"],
  },
  {
    slug: "miwellness",
    name: "MiWellness",
    description: "Продукт для здорового образа жизни. Комплексная поддержка организма для повседневного благополучия и профилактики.",
    images: ["/images/products/main/lifestyle/miwellness.png"],
    category: "Велнес",
    specifications: {},
    certificates: ["GMP", "ISO"],
  },
  {
    slug: "shaker",
    name: "Shaker",
    description: "Шейкер для приготовления коктейлей и напитков. Удобный и стильный аксессуар для здорового питания и спортивного рациона.",
    images: ["/images/products/main/lifestyle/shaker.png"],
    category: "Аксессуары",
    specifications: {},
    certificates: [],
  },
  {
    slug: "ebooster",
    name: "Ebooster",
    description: "Энергетический активатор воды. Основан на концепции Ци (ТКМ). Дальнее инфракрасное излучение для структурирования воды.",
    images: ["/products/ebooster/main.png"],
    category: "Аксессуары",
    specifications: {
      "Тип": "Активационный стержень",
      "Срок службы": "2 года",
    },
    certificates: ["GMP", "ISO"],
  },
  {
    slug: "chai-relax",
    name: "Чай Relax",
    description: "Расслабляющий травяной чай. Натуральный состав для снятия стресса, улучшения сна и восстановления нервной системы. Без кофеина.",
    images: ["/products/chai-relax/main.png"],
    category: "Напитки",
    specifications: {
      "Форма выпуска": "Чай",
      "Упаковка": "20 пакетиков",
    },
    certificates: ["GMP", "ISO", "HALAL", "ORGANIC"],
  },
  {
    slug: "energy-card",
    name: "Energy Card",
    description: "Био-энергетическая карта для защиты от электромагнитного излучения. Структурирование энергетического поля человека. Срок действия: 2 года.",
    images: ["/products/energy-card/main.png"],
    category: "Аксессуары",
    specifications: {
      "Тип": "Био-энергетическая карта",
      "Срок действия": "2 года",
    },
    certificates: ["GMP", "ISO"],
  },
];

// Re-export for backwards compatibility — prefer using services/productService.ts
export { getProductBySlug, getProductsByCategory, getRelatedProducts } from "@/services/productService";
