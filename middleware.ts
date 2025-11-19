import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { defaultLocale, isLocale } from "./src/i18n/config";

const PUBLIC_FILE = /\.(.*)$/;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (PUBLIC_FILE.test(pathname) || pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  const segments = pathname.split("/").filter(Boolean);
  const locale = segments[0];

  if (locale && isLocale(locale)) {
    return NextResponse.next();
  }

  const redirectURL = new URL(
    `/${defaultLocale}${pathname.startsWith("/") ? pathname : `/${pathname}`}`,
    request.url,
  );
  return NextResponse.redirect(redirectURL);
}

export const config = {
  matcher: ["/((?!_next).*)"],
};

