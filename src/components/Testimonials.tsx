"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Quote, ChevronLeft, ChevronRight, Star, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

const testimonials = [
    {
        id: 1,
        name: "Rajesh Kumar",
        role: "Senior Manager",
        company: "Customized Energy Solutions",
        content: "Vidya's analytical skills and attention to detail are exceptional. Her market research reports have been instrumental in our strategic decisions worth millions of dollars.",
        rating: 5,
        avatar: "RK"
    },
    {
        id: 2,
        name: "Dr. Priya Sharma",
        role: "R&D Director",
        company: "Energy Research Institute",
        content: "Working with Vidya on battery testing projects was a pleasure. Her systematic approach and accurate data documentation set a high standard for our lab.",
        rating: 5,
        avatar: "PS"
    },
    {
        id: 3,
        name: "Amit Patel",
        role: "Team Lead",
        company: "Customized Energy Solutions",
        content: "Vidya's Excel dashboards transformed our reporting process. What used to take days now takes hours. Her technical skills are truly impressive.",
        rating: 5,
        avatar: "AP"
    },
]

// Avatar gradient colors for each testimonial
const avatarGradients = [
    "from-blue-500 to-cyan-400",
    "from-purple-500 to-pink-400",
    "from-amber-500 to-orange-400"
]

export function Testimonials() {
    const [current, setCurrent] = useState(0)
    const [isAutoPlaying, setIsAutoPlaying] = useState(true)

    useEffect(() => {
        if (!isAutoPlaying) return
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % testimonials.length)
        }, 6000) // Slightly longer for better reading time
        return () => clearInterval(timer)
    }, [isAutoPlaying])

    const next = () => {
        setIsAutoPlaying(false)
        setCurrent((prev) => (prev + 1) % testimonials.length)
    }

    const prev = () => {
        setIsAutoPlaying(false)
        setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    }

    return (
        <section className="py-24 relative overflow-hidden">
            {/* Background decorations */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent -z-10" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-primary/10 to-transparent rounded-full blur-3xl -z-10" />
            <div className="absolute inset-0 bg-dot-pattern opacity-20 -z-10" />

            <div className="container mx-auto px-4">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className="text-center mb-16"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
                    >
                        <Star className="w-4 h-4 text-primary fill-primary" />
                        <span className="text-sm font-medium text-primary">Testimonials</span>
                    </motion.div>

                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary via-blue-500 to-purple-600">
                        What People Say
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                        Feedback from colleagues and mentors I've had the privilege to work with.
                    </p>
                </motion.div>

                {/* Testimonials Carousel */}
                <div className="max-w-4xl mx-auto relative">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={current}
                            initial={{ opacity: 0, x: 80, scale: 0.95 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: -80, scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 200, damping: 25 }}
                        >
                            <Card className="bg-card/80 backdrop-blur-lg border border-border/50 p-8 md:p-12 relative overflow-hidden hover:border-primary/30 transition-colors duration-300">
                                {/* Decorative quote icon */}
                                <motion.div
                                    initial={{ opacity: 0, rotate: -20 }}
                                    animate={{ opacity: 1, rotate: 0 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <Quote className="absolute top-6 left-6 w-16 h-16 text-primary/10" />
                                </motion.div>

                                {/* Gradient corner decoration */}
                                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${avatarGradients[current]} opacity-10 rounded-bl-full`} />

                                <div className="relative z-10">
                                    {/* Star Rating */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 }}
                                        className="flex gap-1 mb-6"
                                    >
                                        {[...Array(testimonials[current].rating)].map((_, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, scale: 0 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: 0.2 + i * 0.1 }}
                                            >
                                                <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                                            </motion.div>
                                        ))}
                                    </motion.div>

                                    {/* Quote Content */}
                                    <motion.p
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 }}
                                        className="text-xl md:text-2xl text-foreground/90 leading-relaxed mb-8 italic font-light"
                                    >
                                        "{testimonials[current].content}"
                                    </motion.p>

                                    {/* Author Info */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.4 }}
                                        className="flex items-center gap-4"
                                    >
                                        <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${avatarGradients[current]} flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                                            {testimonials[current].avatar}
                                        </div>
                                        <div>
                                            <p className="font-semibold text-lg text-foreground">{testimonials[current].name}</p>
                                            <p className="text-sm text-muted-foreground">
                                                {testimonials[current].role} · <span className="text-primary">{testimonials[current].company}</span>
                                            </p>
                                        </div>
                                    </motion.div>
                                </div>
                            </Card>
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation Controls */}
                    <div className="flex items-center justify-center gap-6 mt-8">
                        {/* Previous Button */}
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={prev}
                            className="rounded-full w-12 h-12 hover:bg-primary/5 hover:border-primary/50 transition-all duration-300"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </Button>

                        {/* Progress Indicators */}
                        <div className="flex gap-2">
                            {testimonials.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => {
                                        setIsAutoPlaying(false)
                                        setCurrent(idx)
                                    }}
                                    className={`relative h-2 rounded-full transition-all duration-500 overflow-hidden ${idx === current ? "w-8 bg-primary" : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                                        }`}
                                    aria-label={`Go to testimonial ${idx + 1}`}
                                >
                                    {/* Progress bar animation for active item */}
                                    {idx === current && isAutoPlaying && (
                                        <motion.div
                                            initial={{ scaleX: 0 }}
                                            animate={{ scaleX: 1 }}
                                            transition={{ duration: 6, ease: "linear" }}
                                            className="absolute inset-0 bg-primary-foreground/30 origin-left"
                                        />
                                    )}
                                </button>
                            ))}
                        </div>

                        {/* Next Button */}
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={next}
                            className="rounded-full w-12 h-12 hover:bg-primary/5 hover:border-primary/50 transition-all duration-300"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </Button>
                    </div>

                    {/* Auto-play indicator */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center text-xs text-muted-foreground mt-4"
                    >
                        {isAutoPlaying ? "Auto-playing • Click to pause" : "Paused • Navigate manually"}
                    </motion.p>
                </div>
            </div>
        </section>
    )
}
