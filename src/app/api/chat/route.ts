import { NextRequest, NextResponse } from "next/server"
import { sendChatMessage, PORTFOLIO_CONTEXT, getFallbackResponse } from "@/lib/openrouter"

export async function POST(request: NextRequest) {
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
