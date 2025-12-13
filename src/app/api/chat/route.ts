import { NextRequest, NextResponse } from "next/server"
import { sendChatMessage, PORTFOLIO_CONTEXT, getFallbackResponse } from "@/lib/openrouter"

// Simple in-memory rate limiting (for production, use Redis or similar)
const rateLimit = new Map<string, { count: number; resetTime: number }>()
const RATE_LIMIT_WINDOW = 60 * 1000 // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 10 // 10 requests per minute per IP

function checkRateLimit(ip: string): boolean {
    const now = Date.now()
    const userLimit = rateLimit.get(ip)

    if (!userLimit || now > userLimit.resetTime) {
        rateLimit.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW })
        return true
    }

    if (userLimit.count >= RATE_LIMIT_MAX_REQUESTS) {
        return false
    }

    userLimit.count++
    return true
}

export async function POST(request: NextRequest) {
    // Rate limiting
    const clientIP = request.headers.get('x-forwarded-for') ||
        request.headers.get('x-real-ip') ||
        'unknown'
    const ip = Array.isArray(clientIP) ? clientIP[0] : clientIP

    if (!checkRateLimit(ip)) {
        return NextResponse.json(
            { error: "Rate limit exceeded. Please try again later." },
            { status: 429 }
        )
    }

    let lastUserMessage = ""

    try {
        const { messages } = await request.json()

        if (!messages || !Array.isArray(messages)) {
            return NextResponse.json(
                { error: "Messages array is required" },
                { status: 400 }
            )
        }

        // Get the last user message for fallback matching
        lastUserMessage = messages.slice(-1)[0]?.content || ""

        // Prepare messages with context
        const fullMessages = [
            { role: "system", content: PORTFOLIO_CONTEXT },
            ...messages.slice(-5) // Keep last 5 messages for context
        ]

        // Try OpenRouter API first
        const aiResponse = await sendChatMessage(fullMessages)
        return NextResponse.json({ response: aiResponse })

    } catch (error) {
        console.error("Chat API error:", error)

        // Use intelligent fallback responses
        try {
            const fallback = getFallbackResponse(lastUserMessage)
            return NextResponse.json({
                response: fallback,
                fallback: true
            })
        } catch {
            return NextResponse.json({
                response: "🤖 I'm currently experiencing technical difficulties. Please contact Vidya directly at vidyaraut17297@gmail.com for immediate assistance.",
                fallback: true
            })
        }
    }
}

// Health check endpoint
export async function GET() {
    return NextResponse.json({
        status: "active",
        message: "OpenRouter API integration active",
        timestamp: new Date().toISOString()
    })
}
