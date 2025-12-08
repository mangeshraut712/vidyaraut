import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './src/i18n/config';

const intlMiddleware = createMiddleware({
  locales: locales,
  defaultLocale,
  localePrefix: 'always'
});

export default intlMiddleware;

export const config = {
  matcher: ['/', '/(en|hi|mr)/:path*']
};
