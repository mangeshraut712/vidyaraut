"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Video, Mail, ExternalLink } from "lucide-react"

const CALENDLY_URL = "https://calendly.com/vidyaraut17297/30min"
const EMAIL = "vidyaraut17297@gmail.com"

const meetingTypes = [
    {
        title: "Quick Chat",
        duration: "15 min",
        description: "Brief introduction or quick question",
        icon: Clock,
    },
    {
        title: "Career Discussion",
        duration: "30 min",
        description: "Discuss potential opportunities",
        icon: Video,
    },
    {
        title: "Consultation",
        duration: "45 min",
        description: "In-depth project or career discussion",
        icon: Calendar,
    },
]

export function BookingSection() {
    return (
        <section id="booking" className="py-24 relative overflow-hidden">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="text-center mb-12"
                >
                    <Badge variant="outline" className="mb-4 px-4 py-1">
                        <Calendar className="w-4 h-4 mr-2 inline" />
                        Schedule a Meeting
                    </Badge>
                    <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">
                        Book a Call
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Let's connect! Schedule a virtual meeting to discuss opportunities, projects, or just to chat.
                    </p>
                </motion.div>

                <div className="max-w-3xl mx-auto">
                    {/* Meeting Types */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="grid md:grid-cols-3 gap-4 mb-8"
                    >
                        {meetingTypes.map((type, idx) => (
                            <motion.div
                                key={type.title}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                whileHover={{ scale: 1.02 }}
                                className="will-change-transform"
                            >
                                <Card className="p-4 bg-card border border-border/50 hover:border-primary/50 hover:shadow-md transition-all duration-150 cursor-pointer group text-center">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center text-primary group-hover:from-primary group-hover:to-blue-600 group-hover:text-white transition-all duration-200 mx-auto mb-3">
                                        <type.icon className="w-6 h-6" />
                                    </div>
                                    <h4 className="font-semibold mb-1">{type.title}</h4>
                                    <Badge variant="secondary" className="text-xs mb-2">{type.duration}</Badge>
                                    <p className="text-xs text-muted-foreground">{type.description}</p>
                                </Card>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Booking Actions */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <Card className="p-6 bg-card border border-border/50">
                            <div className="text-center mb-6">
                                <p className="text-muted-foreground">
                                    Timezone: IST (India Standard Time)
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button
                                    asChild
                                    className="rounded-xl bg-gradient-to-r from-primary to-blue-600 hover:opacity-90"
                                >
                                    <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
                                        <Calendar className="w-4 h-4 mr-2" />
                                        Book via Calendly
                                        <ExternalLink className="w-3 h-3 ml-2" />
                                    </a>
                                </Button>

                                <Button
                                    asChild
                                    variant="outline"
                                    className="rounded-xl"
                                >
                                    <a href={`mailto:${EMAIL}`}>
                                        <Mail className="w-4 h-4 mr-2" />
                                        Email Me
                                    </a>
                                </Button>
                            </div>

                            <p className="text-xs text-muted-foreground text-center mt-4">
                                {EMAIL}
                            </p>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
