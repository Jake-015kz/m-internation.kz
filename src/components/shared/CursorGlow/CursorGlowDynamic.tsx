"use client";

import dynamic from "next/dynamic";

const CursorGlow = dynamic(
  () => import("./CursorGlow").then((m) => ({ default: m.CursorGlow })),
  { ssr: false },
);

export default function CursorGlowDynamic() {
  return <CursorGlow />;
}
