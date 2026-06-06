"use client";

import dynamic from "next/dynamic";

const NoiseOverlay = dynamic(
  () => import("@shared/NoiseOverlay").then((m) => m.NoiseOverlay),
  { ssr: false },
);

const ClickSpark = dynamic(
  () => import("@shared/ClickSpark").then((m) => m.ClickSpark),
  { ssr: false },
);

export function ProvidersWrapper({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NoiseOverlay />
      <ClickSpark />
      {children}
    </>
  );
}
