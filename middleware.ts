import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: ["/((?!api|_next|favicon.ico).*)"],
};

/**
 * Content-negotiation middleware for modern image formats.
 * If the browser supports AVIF and an .avif variant exists, prefer it.
 * Otherwise fall back to .webp if supported.
 * Original PNG/JPG is served as fallback.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only rewrite image requests
  if (!pathname.match(/\.(png|jpe?g)$/i)) {
    return NextResponse.next();
  }

  const accept = request.headers.get("accept") || "";
  const url = request.nextUrl.clone();

  // AVIF → WebP → original
  if (accept.includes("image/avif")) {
    url.pathname = pathname.replace(/\.(png|jpe?g)$/i, ".avif");
    return NextResponse.rewrite(url);
  }

  if (accept.includes("image/webp")) {
    url.pathname = pathname.replace(/\.(png|jpe?g)$/i, ".webp");
    return NextResponse.rewrite(url);
  }

  // Browser doesn't support modern formats — serve original
  return NextResponse.next();
}
