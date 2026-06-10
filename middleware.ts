import createMiddleware from "next-intl/middleware";
import { routing } from "./src/i18n/routing";
import { NextRequest, NextResponse } from "next/server";

const nextIntlMiddleware = createMiddleware(routing);

export const config = {
  matcher: ["/((?!api|_next|favicon.ico).*)"],
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Redirect root "/" to default locale "/ru"
  if (pathname === "/") {
    return NextResponse.redirect(new URL("/ru", request.url), 307);
  }

  // Image negotiation: AVIF → WebP → original
  if (pathname.match(/\.(png|jpe?g)$/i)) {
    const accept = request.headers.get("accept") || "";
    const url = request.nextUrl.clone();

    if (accept.includes("image/avif")) {
      url.pathname = pathname.replace(/\.(png|jpe?g)$/i, ".avif");
      return NextResponse.rewrite(url);
    }

    if (accept.includes("image/webp")) {
      url.pathname = pathname.replace(/\.(png|jpe?g)$/i, ".webp");
      return NextResponse.rewrite(url);
    }
  }

  // Delegate to next-intl middleware for i18n routing
  return nextIntlMiddleware(request);
}
