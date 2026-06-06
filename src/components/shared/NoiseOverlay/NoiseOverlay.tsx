"use client";

export function NoiseOverlay() {
  return (
    <div
      className="fixed top-[-50%] left-[-50%] right-[-50%] bottom-[-50%] w-[200%] h-[200%] bg-transparent pointer-events-none z-[9999] animate-[noise_8s_steps(10)_infinite] opacity-[0.025]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        backgroundRepeat: "repeat",
      }}
      aria-hidden="true"
    />
  );
}
