"use client"

import React, { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageSquare, X, Send, Sparkles, Bot, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { sendChatMessage, PORTFOLIO_CONTEXT, type ChatMessage } from "@/lib/openrouter"
import { useTranslations } from "next-intl"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

export function AIChatbot() {
  const t = useTranslations("chatbot")
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const initialized = useRef(false)

  useEffect(() => {
    if (!initialized.current) {
      setMessages([
        {
          id: "1",
          role: "assistant",
          content: t("initialMessage"),
          timestamp: new Date(),
        },
      ])
      initialized.current = true
    }
  }, [t])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)
    setError(null)

    try {
      // Check if API key is configured
      const apiKey = process.env.NEXT_PUBLIC_OPENROUTER_API_KEY

      if (!apiKey) {
        // Show error if no API key
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "My AI brain is currently offline (API Key missing). Please check the configuration.",
          timestamp: new Date(),
        }
        setTimeout(() => {
          setMessages((prev) => [...prev, aiMessage])
          setIsTyping(false)
        }, 500)
        return
      }

      // Prepare messages for API
      const chatMessages: ChatMessage[] = [
        { role: "system", content: PORTFOLIO_CONTEXT },
        ...messages.slice(-5).map(msg => ({
          role: msg.role as "user" | "assistant",
          content: msg.content
        })),
        { role: "user", content: userMessage.content }
      ]

      // Call OpenRouter API
      const responseContent = await sendChatMessage(chatMessages)

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: responseContent,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, aiMessage])
    } catch (err) {
      console.error("Chat error:", err)
      setError(t("error"))

      // Fallback response on error - simpler and less misleading
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "I'm currently having trouble connecting to the AI service. Please try again later, or contact Vidya directly for specific inquiries.",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiMessage])
    } finally {
      setIsTyping(false)
    }
  }

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-20 right-4 z-50 w-[350px] md:w-[400px]"
          >
            <Card className="border-primary/20 shadow-2xl overflow-hidden">
              <CardHeader className="bg-primary text-primary-foreground p-4 flex flex-row items-center justify-between space-y-0">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-background/20 rounded-full">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <CardTitle className="text-base">{t("title")}</CardTitle>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/20"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </CardHeader>
              <CardContent className="p-0 h-[400px] flex flex-col bg-background">
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={cn(
                        "flex w-full gap-2 max-w-[80%]",
                        msg.role === "user" ? "ml-auto flex-row-reverse" : ""
                      )}
                    >
                      <div
                        className={cn(
                          "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                          msg.role === "user"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground"
                        )}
                      >
                        {msg.role === "user" ? (
                          <User className="w-4 h-4" />
                        ) : (
                          <Bot className="w-4 h-4" />
                        )}
                      </div>
                      <div
                        className={cn(
                          "p-3 rounded-2xl text-sm",
                          msg.role === "user"
                            ? "bg-primary text-primary-foreground rounded-tr-none"
                            : "bg-muted text-muted-foreground rounded-tl-none"
                        )}
                      >
                        {msg.content}
                      </div>
                    </div>
                  ))}
                  {isTyping && (
                    <div className="flex w-full gap-2 max-w-[80%]">
                      <div className="w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center shrink-0">
                        <Bot className="w-4 h-4" />
                      </div>
                      <div className="bg-muted p-3 rounded-2xl rounded-tl-none flex items-center gap-1">
                        <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                        <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                        <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce"></span>
                      </div>
                    </div>
                  )}
                  {error && (
                    <div className="text-xs text-destructive text-center">
                      {error}
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
                <div className="p-4 border-t bg-background">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault()
                      handleSend()
                    }}
                    className="flex gap-2"
                  >
                    <Input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder={t("placeholder")}
                      className="flex-1"
                    />
                    <Button type="submit" size="icon" disabled={!input.trim() || isTyping}>
                      <Send className="w-4 h-4" />
                    </Button>
                  </form>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 z-50 h-14 w-14 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center hover:bg-primary/90 transition-colors"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageSquare className="w-6 h-6" />
        )}
      </motion.button>
    </>
  )
}
