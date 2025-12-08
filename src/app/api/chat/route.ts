import { NextRequest, NextResponse } from "next/server"
import { sendChatMessage, PORTFOLIO_CONTEXT, getFallbackResponse } from "@/lib/openrouter"

export async function POST(request: NextRequest) {
    try {
        const { messages } = await request.json()

        if (!messages || !Array.isArray(messages)) {
            return NextResponse.json(
                { error: "Messages array is required" },
                { status: 400 }
            )
        }

        // Check if API key is configured
        if (!process.env.OPENROUTER_API_KEY) {
            console.warn("OPENROUTER_API_KEY not configured - using fallback responses")
            const userMessage = messages[messages.length - 1]?.content || ""
            const fallback = getFallbackResponse(userMessage)
            return NextResponse.json({ response: fallback })
        }

        // Add system context as the first message
        const fullMessages = [
            { role: "system", content: PORTFOLIO_CONTEXT },
            ...messages.slice(-5)
        ]

        const response = await sendChatMessage(fullMessages)

        return NextResponse.json({ response })
    } catch (error) {
        console.error("Chat API error:", error)

        // Provide helpful fallback
        const userMessage = (await request.clone().json()).messages?.slice(-1)[0]?.content || ""
        const fallback = getFallbackResponse(userMessage)

        return NextResponse.json({ response: fallback })
    }
}
