"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowDown, Download } from "lucide-react"
import { useTranslations } from "next-intl"

export function Hero() {
    const t = useTranslations("hero")

    return (
        <section id="home" className="min-h-screen flex items-center justify-center pt-16 relative overflow-hidden">
            <div className="container mx-auto px-4 z-10">
                <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="flex-1 text-center md:text-left"
                    >
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
                            {t("name")}
                        </h1>
                        <h2 className="text-2xl md:text-3xl text-muted-foreground mb-8 font-medium">
                            {t("title")}
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-xl mb-10 leading-relaxed mx-auto md:mx-0">
                            {t("description")}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                            <a href="/Vidya_Raut_Resume.md" download>
                                <Button size="lg" className="rounded-full px-8 w-full sm:w-auto gap-2">
                                    <Download className="w-4 h-4" />
                                    {t("downloadResume")}
                                </Button>
                            </a>
                            <Button variant="outline" size="lg" className="rounded-full px-8 w-full sm:w-auto" onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>
                                {t("viewWork")}
                            </Button>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="flex-1 relative"
                    >
                        <div className="relative w-[300px] h-[300px] md:w-[500px] md:h-[500px] mx-auto">
                            <div className="absolute inset-0 bg-gradient-to-tr from-gray-200 to-transparent rounded-[2rem] rotate-6 transform transition-transform hover:rotate-3 duration-500"></div>
                            <div className="relative w-full h-full rounded-[2rem] overflow-hidden shadow-2xl border border-border/50 bg-card">
                                <Image
                                    src="/home picture.jpeg"
                                    alt="Vidya Raut"
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-muted-foreground"
            >
                <ArrowDown className="w-6 h-6" />
            </motion.div>
        </section>
    )
}
