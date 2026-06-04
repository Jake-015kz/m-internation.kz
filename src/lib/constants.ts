export const SITE_CONFIG = {
  name: 'M-International',
  description: 'Международная компания по производству БАДов и оздоровительной продукции',
  url: 'https://m-international.kz',
} as const;

export const CONTACTS = {
  phone: '+7 775 925 9525',
  email: 'indira0803@mail.ru',
  instagram: 'https://www.instagram.com/indira_seytimbekovna',
  tiktok: 'https://www.tiktok.com/@minternational.kz',
} as const;

export const CERTIFICATES = [
  { id: 'gmp', name: 'GMP', image: '/certificates/gmp.svg' },
  { id: 'iso', name: 'ISO', image: '/certificates/iso.svg' },
  { id: 'halal', name: 'HALAL', image: '/certificates/halal.svg' },
  { id: 'mesti', name: 'MESTI', image: '/certificates/mesti.svg' },
  { id: 'fda', name: 'FDA', image: '/certificates/fda.svg' },
  { id: 'natural', name: '100% NATURAL', image: '/certificates/natural.svg' },
  { id: 'eac', name: 'EAC', image: '/certificates/eac.svg' },
  { id: 'vegan', name: 'ВЕГАН', image: '/certificates/vegan.svg' },
] as const;

export const FOUNDERS = [
  {
    id: 'indira',
    name: 'Индира Сейтимбековна',
    role: 'Основатель компании',
    image: '/founders/indira.jpg',
    description: 'Визионер и лидер компании M-International',
  },
  {
    id: 'barbara',
    name: 'Барбара Кабуки',
    role: 'Партнер / Лидер',
    image: '/founders/barbara.jpg',
    description: 'Международный лидер компании',
  },
  {
    id: 'machoman',
    name: 'Мачо Янг',
    role: 'Партнер / Лидер',
    image: '/founders/machoman.jpg',
    description: 'Энххишиг Баярболд — международный партнер',
  },
  {
    id: 'mrli',
    name: 'Мистер Ли',
    role: 'Партнер / Лидер',
    image: '/founders/mrli.jpg',
    description: 'Стратегический партнер компании',
  },
  {
    id: 'ester',
    name: 'Эстер Вонг',
    role: 'Партнер / Лидер',
    image: '/founders/ester.jpg',
    description: 'Лидер международного уровня',
  },
] as const;
