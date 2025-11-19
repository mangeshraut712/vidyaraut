import type { Metadata } from "next";
import "@fontsource/geist/400.css";
import "@fontsource/geist/500.css";
import "@fontsource/geist/600.css";
import "@fontsource/geist/700.css";
import "@fontsource/geist-mono/400.css";
import "@fontsource/geist-mono/500.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vidya Raut | Energy Technology & Market Analyst",
  description:
    "Professional portfolio of Vidya Raut - Energy Technology Analyst specializing in market research, data analysis, and energy storage systems.",
  applicationName: "Vidya Raut Portfolio",
  keywords: [
    "Energy Technology",
    "Market Research",
    "Data Analysis",
    "Energy Storage",
    "Battery Testing",
    "Power BI",
    "Excel",
    "Vidya Raut",
    "Portfolio"
  ],
  authors: [{ name: "Vidya Raut" }],
  metadataBase: new URL("https://vidyaraut.vercel.app"),
  icons: {
    icon: "/favicon.svg",
    apple: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className="font-geist antialiased bg-background text-foreground"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
