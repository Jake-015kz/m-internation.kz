"use client";

import { useEffect, useState, type ReactNode } from "react";

interface ClientProvidersProps {
  children: ReactNode;
}

export function ClientProviders({ children }: ClientProvidersProps) {
  const [effects, setEffects] = useState<ReactNode>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    // Dynamically import effects only on client after mount
    // NOTE: NoiseOverlay removed — grain looks dirty on light backgrounds
    Promise.all([
      import("@shared/ClickSpark").then((m) => m.ClickSpark),
      import("@shared/LenisProvider").then((m) => m.LenisProvider),
    ]).then(([ClickSpark, LenisProvider]) => {
      setEffects(
        <>
          <ClickSpark />
          <LenisProvider>{null}</LenisProvider>
        </>
      );
    }).catch((err) => {
      console.error("[ClientProviders] Failed to load effects:", err);
    });
  }, [isMounted]);

  return (
    <>
      {effects}
      {children}
    </>
  );
}
