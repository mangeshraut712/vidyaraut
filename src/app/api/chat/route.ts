import { NextRequest, NextResponse } from "next/server"
import { sendChatMessage, PORTFOLIO_CONTEXT } from "@/lib/openrouter"

export async function POST(request: NextRequest) {
    try {
        const { messages } = await request.json()

        if (!messages || !Array.isArray(messages)) {
            return NextResponse.json(
                { error: "Messages array is required" },
                { status: 400 }
            )
        }

        // Add system context as the first message
        const fullMessages = [
            { role: "system", content: PORTFOLIO_CONTEXT },
            ...messages.slice(-5) // Keep only last 5 messages to avoid token limits
        ]

        const response = await sendChatMessage(fullMessages)

        return NextResponse.json({ response })
    } catch (error) {
        console.error("Chat API error:", error)

        return NextResponse.json(
            {
                error: "Failed to process chat message",
                response: "I'm currently having trouble connecting to my AI brain. Please try again later, or contact Vidya directly for specific inquiries."
            },
            { status: 500 }
        )
    }
}
