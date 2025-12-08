import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { locales, defaultLocale } from './src/i18n/config';

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // If the user visits the root page, redirect to the default locale
  if (pathname === '/') {
    return NextResponse.redirect(new URL(`/${defaultLocale}`, request.url));
  }

  // Use next-intl middleware for other routes
  return createMiddleware({
    locales: locales,
    defaultLocale,
    localePrefix: 'as-needed'
  })(request);
}

export const config = {
  matcher: ['/', '/(en|hi|mr)/:path*']
};
