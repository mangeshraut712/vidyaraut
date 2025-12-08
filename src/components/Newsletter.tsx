"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, CheckCircle, Sparkles, Send } from "lucide-react"

export function Newsletter() {
    const [email, setEmail] = useState("")
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!email) return

        setStatus("loading")

        // Simulate API call - replace with actual Resend integration
        await new Promise(resolve => setTimeout(resolve, 1000))

        setStatus("success")
        setEmail("")

        // Reset after 3 seconds
        setTimeout(() => setStatus("idle"), 3000)
    }

    return (
        <section className="py-24 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-blue-500/5 -z-10" />

            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="max-w-2xl mx-auto"
                >
                    <Card className="p-8 md:p-12 bg-card border border-border/50 relative overflow-hidden">
                        {/* Decorative elements */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-2xl" />
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-blue-500/10 to-transparent rounded-full blur-2xl" />

                        <div className="relative z-10 text-center">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center mx-auto mb-6">
                                <Mail className="w-8 h-8 text-white" />
                            </div>

                            <Badge variant="outline" className="mb-4">
                                <Sparkles className="w-3 h-3 mr-1" />
                                Stay Updated
                            </Badge>

                            <h2 className="text-2xl md:text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">
                                Subscribe to Newsletter
                            </h2>

                            <p className="text-muted-foreground mb-8">
                                Get insights on energy markets, data analytics tips, and career updates delivered to your inbox.
                            </p>

                            {status === "success" ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="flex items-center justify-center gap-2 text-green-600 dark:text-green-400"
                                >
                                    <CheckCircle className="w-5 h-5" />
                                    <span>Thanks for subscribing!</span>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                                    <Input
                                        type="email"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="flex-1 h-12 rounded-xl"
                                        required
                                    />
                                    <Button
                                        type="submit"
                                        disabled={status === "loading"}
                                        className="h-12 px-6 rounded-xl bg-gradient-to-r from-primary to-blue-600 hover:opacity-90"
                                    >
                                        {status === "loading" ? (
                                            <span className="flex items-center gap-2">
                                                <motion.div
                                                    animate={{ rotate: 360 }}
                                                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                                >
                                                    <Send className="w-4 h-4" />
                                                </motion.div>
                                                Subscribing...
                                            </span>
                                        ) : (
                                            <span className="flex items-center gap-2">
                                                <Send className="w-4 h-4" />
                                                Subscribe
                                            </span>
                                        )}
                                    </Button>
                                </form>
                            )}

                            <p className="text-xs text-muted-foreground mt-4">
                                No spam. Unsubscribe anytime.
                            </p>
                        </div>
                    </Card>
                </motion.div>
            </div>
        </section>
    )
}
