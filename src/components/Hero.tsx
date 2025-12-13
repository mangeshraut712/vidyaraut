"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowDown, Download, Linkedin, Mail, Sparkles } from "lucide-react"
import { useTranslations } from "next-intl"
import { useRef, useEffect, useState } from "react"

// Typewriter effect hook
function useTypewriter(text: string, speed: number = 50) {
    const [displayText, setDisplayText] = useState("")
    const [isComplete, setIsComplete] = useState(false)

    useEffect(() => {
        let index = 0
        setDisplayText("")
        setIsComplete(false)

        const timer = setInterval(() => {
            if (index < text.length) {
                setDisplayText(text.slice(0, index + 1))
                index++
            } else {
                setIsComplete(true)
                clearInterval(timer)
            }
        }, speed)

        return () => clearInterval(timer)
    }, [text, speed])

    return { displayText, isComplete }
}

export function Hero() {
    const t = useTranslations("hero")
    const containerRef = useRef<HTMLElement>(null)
    const { scrollY } = useScroll()

    // Parallax effect for background elements
    const y1 = useTransform(scrollY, [0, 500], [0, 150])
    const y2 = useTransform(scrollY, [0, 500], [0, -100])
    const opacity = useTransform(scrollY, [0, 400], [1, 0])

    const title = t("title")
    const { displayText, isComplete } = useTypewriter(title, 60)

    return (
        <section
            ref={containerRef}
            id="home"
            className="min-h-screen flex items-center justify-center pt-16 relative overflow-hidden bg-background"
        >
            {/* Subtle gradient orbs - GPU accelerated */}
            <motion.div
                style={{ y: y1, willChange: 'transform' }}
                className="absolute top-20 left-10 w-[400px] h-[400px] bg-gradient-to-br from-primary/10 to-blue-500/5 rounded-full blur-3xl -z-10 gpu-accelerated"
            />
            <motion.div
                style={{ y: y2, willChange: 'transform' }}
                className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-full blur-3xl -z-10 gpu-accelerated"
            />

            <motion.div
                style={{ opacity }}
                className="container mx-auto px-4 z-10"
            >
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                    {/* Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="flex-1 text-center lg:text-left"
                    >
                        {/* Greeting badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
                        >
                            <Sparkles className="w-4 h-4 text-primary" />
                            <span className="text-sm font-medium text-primary">Welcome to my portfolio</span>
                        </motion.div>

                        {/* Name with gradient */}
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6"
                            style={{
                                background: 'linear-gradient(135deg, #3B82F6 0%, #6366F1 50%, #8B5CF6 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                            }}
                        >
                            {t("name")}
                        </motion.h1>

                        {/* Typewriter title */}
                        <motion.h2
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="text-xl sm:text-2xl md:text-3xl text-muted-foreground mb-8 font-medium h-[1.5em]"
                        >
                            <span>{displayText}</span>
                            <span className={`${isComplete ? "animate-pulse" : ""} text-primary`}>|</span>
                        </motion.h2>

                        {/* Description with fade effect */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7, duration: 0.6 }}
                            className="text-lg text-muted-foreground/80 max-w-xl mb-10 leading-relaxed mx-auto lg:mx-0"
                        >
                            {t("description")}
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.9, duration: 0.6 }}
                            className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4"
                        >
                            <a href="/Vidya_Raut_Resume.md" download>
                                <Button
                                    size="lg"
                                    className="rounded-full px-8 gap-2 bg-gradient-to-r from-primary to-blue-600 hover:shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5 transition-all duration-300 group"
                                >
                                    <Download className="w-4 h-4 group-hover:animate-bounce" />
                                    {t("downloadResume")}
                                </Button>
                            </a>
                            <div className="flex gap-3 justify-center">
                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="rounded-full px-6 hover:bg-primary/5 hover:border-primary/50 transition-all duration-300"
                                    asChild
                                >
                                    <a href="https://www.linkedin.com/in/vidyaraut17/" target="_blank" rel="noopener noreferrer">
                                        <Linkedin className="w-5 h-5" />
                                    </a>
                                </Button>
                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="rounded-full px-6 hover:bg-primary/5 hover:border-primary/50 transition-all duration-300"
                                    asChild
                                >
                                    <a href="mailto:vidyaraut17297@gmail.com">
                                        <Mail className="w-5 h-5" />
                                    </a>
                                </Button>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Profile Image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{ duration: 1, delay: 0.4, type: "spring", stiffness: 100 }}
                        className="flex-1 relative"
                    >
                        <div className="relative w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] md:w-[450px] md:h-[450px] lg:w-[500px] lg:h-[500px] mx-auto">
                            {/* Glow effect behind image */}
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/40 to-blue-600/30 rounded-[2.5rem] blur-2xl scale-95 animate-pulse-glow" />

                            {/* Rotating border decoration */}
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-[-20px] rounded-[3rem] border-2 border-dashed border-primary/20"
                            />

                            {/* Main image container */}
                            <motion.div
                                whileHover={{ scale: 1.02, rotate: 2 }}
                                transition={{ type: "spring", stiffness: 300 }}
                                className="relative w-full h-full rounded-[2.5rem] overflow-hidden shadow-2xl border-2 border-white/20 dark:border-white/10 bg-card group"
                            >
                                {/* Gradient overlay on hover */}
                                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />

                                <Image
                                    src="/home picture.jpeg"
                                    alt="Vidya Raut - Energy Technology Analyst"
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                                    sizes="(max-width: 640px) 280px, (max-width: 768px) 350px, (max-width: 1024px) 450px, 500px"
                                    priority
                                />
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.8 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            >
                <span className="text-xs text-muted-foreground">Scroll to explore</span>
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2"
                >
                    <motion.div
                        animate={{ opacity: [0.5, 1, 0.5], y: [0, 8, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        className="w-1.5 h-3 bg-primary rounded-full"
                    />
                </motion.div>
            </motion.div>
        </section>
    )
}
