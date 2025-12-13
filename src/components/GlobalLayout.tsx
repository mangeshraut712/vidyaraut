"use client"

import { Suspense, lazy } from "react"
import { ErrorBoundary } from "@/components/ErrorBoundary"
import { Navigation } from "@/components/Navigation"
import { ScrollToTop } from "@/components/ScrollToTop"
import { Skeleton } from "@/components/ui/skeleton"

// Lazy load the AI Chatbot for better performance
const AIChatbot = lazy(() =>
    import("@/components/AIChatbot").then(mod => ({ default: mod.AIChatbot }))
)

// Loading component for the chatbot
function ChatbotLoading() {
    return (
        <div className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-muted animate-pulse" />
    )
}

// Error fallback component for individual components
const ComponentErrorFallback = ({ error, resetError }: { error?: Error; resetError: () => void }) => (
    <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg m-4">
        <p className="text-sm text-destructive">
            A component failed to load.{" "}
            <button
                onClick={resetError}
                className="underline hover:no-underline"
            >
                Try again
            </button>
        </p>
        {process.env.NODE_ENV === 'development' && error && (
            <p className="text-xs text-muted-foreground mt-2">
                {error.message}
            </p>
        )}
    </div>
)

export function GlobalLayout() {
    return (
        <>
            <Navigation />
            <ScrollToTop />
            {/* AI Chatbot with lazy loading */}
            <Suspense fallback={<ChatbotLoading />}>
                <AIChatbot />
            </Suspense>
        </>
    )
}
