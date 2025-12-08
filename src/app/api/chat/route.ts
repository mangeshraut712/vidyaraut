import { NextRequest, NextResponse } from "next/server"
import { PORTFOLIO_CONTEXT, getFallbackResponse } from "@/lib/openrouter"

// FastAPI backend URL - uses Vercel environment variables
const FASTAPI_URL = process.env.FASTAPI_URL || "https://vidyaraut-api.vercel.app"

export async function POST(request: NextRequest) {
    try {
        const { messages } = await request.json()

        if (!messages || !Array.isArray(messages)) {
            return NextResponse.json(
                { error: "Messages array is required" },
                { status: 400 }
            )
        }

        // Prepare messages with context
        const fullMessages = [
            { role: "system", content: PORTFOLIO_CONTEXT },
            ...messages.slice(-5)
        ]

        // Call FastAPI backend (which has the API key in Vercel env vars)
        const response = await fetch(`${FASTAPI_URL}/api/chat`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ messages: fullMessages }),
        })

        if (!response.ok) {
            throw new Error(`FastAPI error: ${response.status}`)
        }

        const data = await response.json()
        return NextResponse.json({ response: data.response || data.message })

    } catch (error) {
        console.error("Chat API error:", error)

        // Use fallback responses
        try {
            const body = await request.clone().json()
            const userMessage = body.messages?.slice(-1)[0]?.content || ""
            const fallback = getFallbackResponse(userMessage)
            return NextResponse.json({ response: fallback })
        } catch {
            return NextResponse.json({
                response: "I'm having trouble connecting. Please contact Vidya at vidyaraut17297@gmail.com"
            })
        }
    }
}

// Health check endpoint
export async function GET() {
    try {
        const healthCheck = await fetch(`${FASTAPI_URL}/health`)
        const isHealthy = healthCheck.ok

        return NextResponse.json({
            status: isHealthy ? "healthy" : "degraded",
            backend: FASTAPI_URL,
            timestamp: new Date().toISOString()
        })
    } catch {
        return NextResponse.json({
            status: "fallback",
            message: "Using local fallback responses",
            timestamp: new Date().toISOString()
        })
    }
}
