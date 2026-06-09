"use client";

import dynamic from "next/dynamic";

const ProvidersWrapper = dynamic(
  () => import("@shared/ProvidersWrapper").then((m) => m.ProvidersWrapper),
  { ssr: false }
);

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return <ProvidersWrapper>{children}</ProvidersWrapper>;
}
