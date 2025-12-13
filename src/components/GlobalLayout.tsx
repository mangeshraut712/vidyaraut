"use client"

import { Navigation } from "@/components/Navigation"
import { ScrollToTop } from "@/components/ScrollToTop"
import dynamic from "next/dynamic"

const AIChatbot = dynamic(() => import("@/components/AIChatbot").then(mod => mod.AIChatbot), {
    ssr: false,
    loading: () => null
})

export function GlobalLayout() {
    return (
        <>
            <Navigation />
            <ScrollToTop />
            <AIChatbot />
        </>
    )
}
