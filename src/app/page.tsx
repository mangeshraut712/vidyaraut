"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { defaultLocale } from "@/i18n/config";

export default function RootPage() {
  const router = useRouter();
  const href = `/${defaultLocale}/`;

  useEffect(() => {
    router.replace(href);
  }, [href, router]);

  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <p className="text-muted-foreground">
        Redirecting to the portfolio.{" "}
        <Link href={href} className="text-foreground underline">
          Continue
        </Link>
      </p>
    </main>
  );
}
