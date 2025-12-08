"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Video, Mail, ExternalLink } from "lucide-react"

const availableSlots = [
    { day: "Monday", times: ["10:00 AM", "2:00 PM", "4:00 PM"] },
    { day: "Tuesday", times: ["10:00 AM", "2:00 PM"] },
    { day: "Wednesday", times: ["10:00 AM", "2:00 PM", "4:00 PM"] },
    { day: "Thursday", times: ["10:00 AM", "2:00 PM"] },
    { day: "Friday", times: ["10:00 AM"] },
]

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

                <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {/* Meeting Types */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-4"
                    >
                        <h3 className="text-lg font-semibold mb-4">Select Meeting Type</h3>
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
                                <Card className="p-4 bg-card border border-border/50 hover:border-primary/50 hover:shadow-md transition-all duration-150 cursor-pointer group">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center text-primary group-hover:from-primary group-hover:to-blue-600 group-hover:text-white transition-all duration-200">
                                            <type.icon className="w-6 h-6" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2">
                                                <h4 className="font-semibold">{type.title}</h4>
                                                <Badge variant="secondary" className="text-xs">{type.duration}</Badge>
                                            </div>
                                            <p className="text-sm text-muted-foreground">{type.description}</p>
                                        </div>
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Availability Calendar */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <Card className="p-6 bg-card border border-border/50">
                            <h3 className="text-lg font-semibold mb-4">Available This Week</h3>
                            <div className="space-y-3">
                                {availableSlots.map((slot) => (
                                    <div key={slot.day} className="flex items-center gap-4">
                                        <span className="w-24 text-sm font-medium text-foreground">{slot.day}</span>
                                        <div className="flex flex-wrap gap-2">
                                            {slot.times.map((time) => (
                                                <Badge
                                                    key={time}
                                                    variant="outline"
                                                    className="cursor-pointer hover:bg-primary hover:text-white hover:border-primary transition-colors duration-150"
                                                >
                                                    {time}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t border-border/50 mt-6 pt-6">
                                <p className="text-sm text-muted-foreground mb-4">
                                    Timezone: IST (India Standard Time)
                                </p>
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <Button className="flex-1 rounded-xl bg-gradient-to-r from-primary to-blue-600">
                                        <Calendar className="w-4 h-4 mr-2" />
                                        Book via Cal.com
                                        <ExternalLink className="w-3 h-3 ml-2" />
                                    </Button>
                                    <Button variant="outline" className="flex-1 rounded-xl">
                                        <Mail className="w-4 h-4 mr-2" />
                                        Email Instead
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
