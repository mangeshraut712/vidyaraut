"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Puzzle } from "lucide-react"
import { useTranslations } from "next-intl"

export function Game() {
    const t = useTranslations("game")

    return (
        <section id="game" className="py-24 bg-secondary/30">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <Badge variant="outline" className="mb-4 px-4 py-1 text-base border-primary/20 bg-primary/5">
                        <Puzzle className="w-4 h-4 mr-2 inline" />
                        {t("badge")}
                    </Badge>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        {t("title")}
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        {t("description")}
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto"
                >
                    <Card className="border border-border/50 shadow-2xl overflow-hidden">
                        <CardContent className="p-0">
                            <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                                <iframe
                                    className="absolute top-0 left-0 w-full h-full"
                                    src="https://marathigames.in/Crossword/crossword.html"
                                    title="Marathi Crossword Game"
                                    style={{
                                        border: "none",
                                        background: "#fff",
                                    }}
                                    loading="lazy"
                                    allow="fullscreen"
                                />
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </section>
    )
}
