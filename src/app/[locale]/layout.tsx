import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { AppProviders } from "@/app/providers";
import { isLocale, locales } from "@/i18n/config";
import { getMessages as getServerMessages, unstable_setRequestLocale } from "next-intl/server";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: { children: ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) {
    notFound();
  }
  unstable_setRequestLocale(locale);
  const messages = await getServerMessages();

  return (
    <AppProviders locale={locale} messages={messages}>
      <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)]">
        {children}
      </div>
    </AppProviders>
  );
}
