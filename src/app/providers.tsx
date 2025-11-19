"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import { NextIntlClientProvider } from "next-intl";
import { ThemeProvider } from "next-themes";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import type { Locale } from "@/i18n/config";

type AppProvidersProps = {
  children: ReactNode;
  locale: Locale;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  messages: Record<string, any>;
};

export function AppProviders({ children, locale, messages }: AppProvidersProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      </ThemeProvider>
    </NextIntlClientProvider>
  );
}
