import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, CustomEase);

// ─── Custom easing curve matching FM's [0.16, 1, 0.3, 1] ───
// This is an ExpoOut-like curve. CustomEase SVG path approximates it.
const _gentleEase = CustomEase.create("gentle", "M0,0 C0.16,0.5 0.3,1 1,1");

/** Easing string for GSAP tweens — use as `ease: EASING.gentle` */
export const EASING = {
  gentle: "gentle" as string,
  smooth: "power2.inOut" as string,
  expo: "power3.out" as string,
};

// ─── Reduced motion helper ───
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
