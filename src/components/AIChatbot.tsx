"use client"

import React, { useState, useRef, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageSquare, X, Send, Sparkles, Bot, User, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useTranslations } from "next-intl"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

// Quick action suggestions
const QUICK_ACTIONS = [
  "What's Vidya's experience?",
  "Tell me about her skills",
  "Education background",
  "Contact information"
]

// Typing dots animation component - GPU optimized
function TypingDots() {
  return (
    <div className="flex items-center gap-1 px-3 py-2">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-2 h-2 bg-primary rounded-full gpu-accelerated"
          animate={{ y: [0, -6, 0] }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            delay: i * 0.12,
            ease: [0.4, 0, 0.2, 1], // Custom cubic-bezier for smoother animation
          }}
          style={{ willChange: 'transform' }}
        />
      ))}
    </div>
  )
}


export function AIChatbot() {
  const t = useTranslations("chatbot")
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const initialized = useRef(false)

  const getTranslationSafe = useCallback((key: string, fallback: string) => {
    try {
      return t(key)
    } catch {
      return fallback
    }
  }, [t])

  useEffect(() => {
    if (!initialized.current) {
      setMessages([
        {
          id: "1",
          role: "assistant",
          content: getTranslationSafe("initialMessage", "👋 Hello! I'm Vidya's AI Assistant. Ask me anything about her background, experience, skills, or qualifications. I can also help with general questions!"),
          timestamp: new Date(),
        },
      ])
      initialized.current = true
    }
  }, [getTranslationSafe])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const handleSend = async (messageText?: string) => {
    const text = messageText || input
    if (!text.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    try {
      const recentMessages = [
        ...messages.slice(-6).map(msg => ({
          role: msg.role as "user" | "assistant",
          content: msg.content
        })),
        {
          role: "user" as const,
          content: userMessage.content
        }
      ]

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: recentMessages
        }),
      })

      if (!response.ok) {
        throw new Error('API request failed')
      }

      const data = await response.json()

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.response || "I'm having trouble connecting right now. Please try again.",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, aiMessage])
    } catch (err) {
      console.error("Chat error:", err)

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "⚠️ I'm currently having trouble connecting. Please try again later, or contact Vidya directly at vidyaraut17297@gmail.com",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiMessage])
    } finally {
      setIsTyping(false)
    }
  }

  const clearChat = () => {
    setMessages([
      {
        id: Date.now().toString(),
        role: "assistant",
        content: "🔄 Chat cleared! How can I help you?",
        timestamp: new Date(),
      },
    ])
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
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
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-24 right-6 left-4 sm:left-auto w-auto sm:w-[400px] md:w-[440px]"
            style={{ position: 'fixed', zIndex: 99998, isolation: 'isolate' }}
          >
            <div className="rounded-2xl border border-border/50 shadow-2xl overflow-hidden bg-card/95 backdrop-blur-xl">
              {/* Header */}
              <div className="bg-gradient-to-r from-primary via-blue-600 to-indigo-600 p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="p-2 bg-white/20 rounded-xl backdrop-blur-sm"
                  >
                    <Sparkles className="w-5 h-5 text-white" />
                  </motion.div>
                  <div>
                    <h3 className="font-semibold text-white text-base">{t("title")}</h3>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      <span className="text-xs text-white/80">Online • Powered by AI</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 text-white hover:bg-white/20 rounded-xl"
                    onClick={clearChat}
                    title="Clear chat"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 text-white hover:bg-white/20 rounded-xl"
                    onClick={() => setIsOpen(false)}
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              {/* Messages Area */}
              <div className="h-[420px] flex flex-col">
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((msg, index) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{
                        delay: index === messages.length - 1 ? 0.1 : 0,
                        type: "spring",
                        stiffness: 300,
                        damping: 25
                      }}
                      className={cn(
                        "flex w-full gap-3",
                        msg.role === "user" ? "justify-end" : "justify-start"
                      )}
                    >
                      {msg.role === "assistant" && (
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-indigo-600 text-white flex items-center justify-center shrink-0 shadow-lg shadow-primary/20">
                          <Bot className="w-5 h-5" />
                        </div>
                      )}
                      <div
                        className={cn(
                          "p-3.5 rounded-2xl text-sm max-w-[85%] shadow-sm",
                          msg.role === "user"
                            ? "bg-gradient-to-br from-primary to-blue-600 text-white rounded-br-sm"
                            : "bg-secondary/80 text-foreground rounded-bl-sm border border-border/50"
                        )}
                      >
                        <p className="whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                        <p className={cn(
                          "text-[10px] mt-2 opacity-60",
                          msg.role === "user" ? "text-right" : "text-left"
                        )}>
                          {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                      {msg.role === "user" && (
                        <div className="w-9 h-9 rounded-xl bg-secondary text-foreground flex items-center justify-center shrink-0 shadow-sm border border-border/50">
                          <User className="w-5 h-5" />
                        </div>
                      )}
                    </motion.div>
                  ))}

                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex w-full gap-3"
                    >
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-indigo-600 text-white flex items-center justify-center shrink-0 shadow-lg shadow-primary/20">
                        <Bot className="w-5 h-5" />
                      </div>
                      <div className="bg-secondary/80 rounded-2xl rounded-bl-sm border border-border/50">
                        <TypingDots />
                      </div>
                    </motion.div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Quick Actions */}
                <AnimatePresence>
                  {messages.length <= 2 && !isTyping && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="px-4 pb-3 overflow-hidden"
                    >
                      <p className="text-xs text-muted-foreground mb-2 font-medium">Quick questions:</p>
                      <div className="flex flex-wrap gap-2">
                        {QUICK_ACTIONS.map((action, idx) => (
                          <motion.button
                            key={action}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.05 }}
                            onClick={() => handleSend(action)}
                            className="text-xs px-3 py-1.5 rounded-full bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 transition-all duration-200 hover:scale-105"
                          >
                            {action}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Input Area */}
                <div className="p-4 border-t border-border/50 bg-background/50 backdrop-blur-sm">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault()
                      handleSend()
                    }}
                    className="flex gap-3"
                  >
                    <textarea
                      ref={inputRef}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder={t("placeholder")}
                      rows={1}
                      className="flex-1 resize-none rounded-xl border border-border bg-secondary/50 px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                    />
                    <Button
                      type="submit"
                      size="icon"
                      disabled={!input.trim() || isTyping}
                      className="rounded-xl h-11 w-11 bg-gradient-to-br from-primary to-indigo-600 hover:opacity-90 shadow-lg shadow-primary/25 transition-all disabled:opacity-50 disabled:shadow-none"
                    >
                      <Send className="w-5 h-5" />
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-gradient-to-br from-primary via-blue-600 to-indigo-600 text-white shadow-xl flex items-center justify-center hover:shadow-2xl hover:shadow-primary/30 transition-all duration-300"
        style={{ position: 'fixed', zIndex: 99999, isolation: 'isolate' }}
        aria-label="Toggle chat"
      >
        {/* Glow effect */}
        <span className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-indigo-600 blur-lg opacity-40 animate-pulse" />

        {/* Icon */}
        <motion.span
          initial={false}
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="relative z-10"
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <MessageSquare className="w-6 h-6" />
          )}
        </motion.span>

        {/* Notification badge when closed */}
        {!isOpen && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-[10px] font-bold border-2 border-background shadow-md"
          >
            1
          </motion.span>
        )}
      </motion.button>
    </>
  )
}

