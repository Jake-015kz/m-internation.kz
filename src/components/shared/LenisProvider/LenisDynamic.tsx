"use client";

import dynamic from "next/dynamic";

// Динамический импорт LenisProvider без SSR для улучшения метрик скорости
const LenisProvider = dynamic(
  () => import("./LenisProviderClient").then((mod) => mod.LenisProviderClient),
  {
    ssr: false,
  },
);

export { LenisProvider };
