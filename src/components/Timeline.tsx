"use client"

import React from "react"
import { motion } from "framer-motion"
import { Briefcase, GraduationCap, Calendar, MapPin } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface TimelineItem {
  type: "education" | "experience"
  date: string
  title: string
  subtitle: string
  description: string
  highlights?: string[]
  skills?: string[]
}

interface TimelineProps {
  items: TimelineItem[]
  title: string
  icon: React.ElementType
}

export function Timeline({ items, title, icon: Icon }: TimelineProps) {
  return (
    <div className="py-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-primary/10 rounded-xl">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
      </div>

      <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
        {items.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-border bg-background shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
              {item.type === "education" ? (
                <GraduationCap className="w-5 h-5 text-primary" />
              ) : (
                <Briefcase className="w-5 h-5 text-primary" />
              )}
            </div>
            
            <Card className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-0 overflow-hidden hover:shadow-lg transition-shadow duration-300 border-primary/10">
              <CardHeader className="bg-muted/30 p-4 border-b">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                  <CardTitle className="text-lg font-bold text-primary">
                    {item.title}
                  </CardTitle>
                  <Badge variant="secondary" className="w-fit flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {item.date}
                  </Badge>
                </div>
                <p className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {item.subtitle}
                </p>
              </CardHeader>
              <CardContent className="p-4 space-y-4">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
                
                {item.highlights && (
                  <ul className="space-y-2">
                    {item.highlights.map((highlight, idx) => (
                      <li key={idx} className="text-sm flex items-start gap-2">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                        <span className="text-foreground/80">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {item.skills && (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {item.skills.map((skill, idx) => (
                      <Badge key={idx} variant="outline" className="bg-background/50">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
