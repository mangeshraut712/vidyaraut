import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { AppProviders } from "@/app/providers";
import { GlobalLayout } from "@/components/GlobalLayout";
import { isLocale, locales } from "@/i18n/config";
import { getMessages } from "next-intl/server";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: { children: ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) {
    notFound();
  }

  const messages = await getMessages({ locale });

  return (
    <AppProviders locale={locale} messages={messages}>
      <div className="min-h-screen bg-background text-foreground">
        <GlobalLayout />
        {children}
      </div>
    </AppProviders>
  );
}
