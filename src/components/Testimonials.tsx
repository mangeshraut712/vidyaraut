"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react"
import { Button } from "@/components/ui/button"

const testimonials = [
    {
        id: 1,
        name: "Rajesh Kumar",
        role: "Senior Manager",
        company: "Customized Energy Solutions",
        content: "Vidya's analytical skills and attention to detail are exceptional. Her market research reports have been instrumental in our strategic decisions worth millions of dollars.",
        rating: 5,
    },
    {
        id: 2,
        name: "Dr. Priya Sharma",
        role: "R&D Director",
        company: "Energy Research Institute",
        content: "Working with Vidya on battery testing projects was a pleasure. Her systematic approach and accurate data documentation set a high standard for our lab.",
        rating: 5,
    },
    {
        id: 3,
        name: "Amit Patel",
        role: "Team Lead",
        company: "Customized Energy Solutions",
        content: "Vidya's Excel dashboards transformed our reporting process. What used to take days now takes hours. Her technical skills are truly impressive.",
        rating: 5,
    },
]

export function Testimonials() {
    const [current, setCurrent] = useState(0)
    const [isAutoPlaying, setIsAutoPlaying] = useState(true)

    useEffect(() => {
        if (!isAutoPlaying) return
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % testimonials.length)
        }, 5000)
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
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent -z-10" />

            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="text-center mb-12"
                >
                    <Badge variant="outline" className="mb-4 px-4 py-1">
                        <Star className="w-4 h-4 mr-2 inline fill-primary text-primary" />
                        Testimonials
                    </Badge>
                    <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">
                        What People Say
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Feedback from colleagues and mentors I've had the privilege to work with.
                    </p>
                </motion.div>

                <div className="max-w-4xl mx-auto relative">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={current}
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        >
                            <Card className="bg-card border border-border/50 p-8 md:p-12 relative overflow-hidden">
                                <Quote className="absolute top-6 left-6 w-12 h-12 text-primary/10" />

                                <div className="relative z-10">
                                    <div className="flex gap-1 mb-6">
                                        {[...Array(testimonials[current].rating)].map((_, i) => (
                                            <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                                        ))}
                                    </div>

                                    <p className="text-lg md:text-xl text-foreground/90 leading-relaxed mb-8 italic">
                                        "{testimonials[current].content}"
                                    </p>

                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-white font-bold text-lg">
                                            {testimonials[current].name.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="font-semibold text-foreground">{testimonials[current].name}</p>
                                            <p className="text-sm text-muted-foreground">
                                                {testimonials[current].role} at {testimonials[current].company}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation */}
                    <div className="flex items-center justify-center gap-4 mt-8">
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={prev}
                            className="rounded-full"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </Button>

                        <div className="flex gap-2">
                            {testimonials.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => {
                                        setIsAutoPlaying(false)
                                        setCurrent(idx)
                                    }}
                                    className={`w-2 h-2 rounded-full transition-all duration-200 ${idx === current ? "bg-primary w-6" : "bg-muted-foreground/30"
                                        }`}
                                />
                            ))}
                        </div>

                        <Button
                            variant="outline"
                            size="icon"
                            onClick={next}
                            className="rounded-full"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}
