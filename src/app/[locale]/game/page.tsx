"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { isLocale } from "@/i18n/config";

export default function GameRedirectPage() {
  const params = useParams();
  const router = useRouter();
  const locale =
    typeof params.locale === "string" && isLocale(params.locale)
      ? params.locale
      : "en";
  const href = `/${locale}/#game`;

  useEffect(() => {
    router.replace(href);
  }, [href, router]);

  return null;
}
