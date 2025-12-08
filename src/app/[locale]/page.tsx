"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Briefcase,
  GraduationCap,
  Loader2,
  CheckCircle2
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Timeline } from "@/components/Timeline"
import { Navigation } from "@/components/Navigation"
import { Hero } from "@/components/Hero"
import { Skills } from "@/components/Skills"
import { Projects } from "@/components/Projects"
import { Game } from "@/components/Game"
import { ScrollToTop } from "@/components/ScrollToTop"
import { Testimonials } from "@/components/Testimonials"
import { GitHubStats } from "@/components/GitHubStats"
import { BookingSection } from "@/components/BookingSection"
import { contactInfo } from "@/lib/data"
import { useTranslations } from "next-intl"
import dynamic from "next/dynamic"

// Lazy load the chatbot for better initial performance
const AIChatbot = dynamic(() => import("@/components/AIChatbot").then(mod => mod.AIChatbot), {
  ssr: false,
  loading: () => null
})

// Define interfaces for data structures
interface TimelineItem {
  type: "education" | "experience"
  date: string
  title: string
  subtitle: string
  description: string
  highlights?: string[]
  skills?: string[]
}

export default function PortfolioPage() {
  const t = useTranslations()
  const [formState, setFormState] = useState<"idle" | "submitting" | "success" | "error">("idle")

  const experienceData: TimelineItem[] = [
    {
      type: "experience",
      title: t("experience.analyst.title"),
      subtitle: t("experience.analyst.subtitle"),
      date: t("experience.analyst.date"),
      description: t("experience.analyst.description"),
      highlights: t.raw("experience.analyst.highlights") as string[],
      skills: t.raw("experience.analyst.skills") as string[]
    },
    {
      type: "experience",
      title: t("experience.intern.title"),
      subtitle: t("experience.intern.subtitle"),
      date: t("experience.intern.date"),
      description: t("experience.intern.description"),
      highlights: t.raw("experience.intern.highlights") as string[],
      skills: t.raw("experience.intern.skills") as string[]
    },
    {
      type: "experience",
      title: t("experience.dataAnalyst.title"),
      subtitle: t("experience.dataAnalyst.subtitle"),
      date: t("experience.dataAnalyst.date"),
      description: t("experience.dataAnalyst.description"),
      highlights: t.raw("experience.dataAnalyst.highlights") as string[],
      skills: t.raw("experience.dataAnalyst.skills") as string[]
    },
    {
      type: "experience",
      title: t("experience.teacher.title"),
      subtitle: t("experience.teacher.subtitle"),
      date: t("experience.teacher.date"),
      description: t("experience.teacher.description"),
      highlights: t.raw("experience.teacher.highlights") as string[],
      skills: t.raw("experience.teacher.skills") as string[]
    }
  ]

  const educationData: TimelineItem[] = [
    {
      type: "education",
      title: t("education.mtech.title"),
      subtitle: t("education.mtech.subtitle"),
      date: t("education.mtech.date"),
      description: t("education.mtech.description")
    },
    {
      type: "education",
      title: t("education.bed.title"),
      subtitle: t("education.bed.subtitle"),
      date: t("education.bed.date"),
      description: t("education.bed.description")
    },
    {
      type: "education",
      title: t("education.msc.title"),
      subtitle: t("education.msc.subtitle"),
      date: t("education.msc.date"),
      description: t("education.msc.description")
    },
    {
      type: "education",
      title: t("education.bsc.title"),
      subtitle: t("education.bsc.subtitle"),
      date: t("education.bsc.date"),
      description: t("education.bsc.description")
    }
  ]

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormState("submitting")

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))

    setFormState("success")
    // Reset form after 3 seconds
    setTimeout(() => setFormState("idle"), 3000)

    // In a real app, you would send the data to an API route here
    // const formData = new FormData(e.currentTarget)
    // await fetch('/api/contact', { method: 'POST', body: formData })
  }

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navigation />

      <Hero />

      <Skills />

      <Projects />

      {/* Experience Section */}
      <section id="experience" className="py-24">
        <div className="container mx-auto px-4 max-w-5xl">
          <Timeline
            items={experienceData}
            title={t("experience.title")}
            icon={Briefcase}
          />
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-24">
        <div className="container mx-auto px-4 max-w-5xl">
          <Timeline
            items={educationData}
            title={t("education.title")}
            icon={GraduationCap}
          />
        </div>
      </section>

      {/* Testimonials Section */}
      <Testimonials />

      {/* GitHub Stats Section */}
      <GitHubStats />

      {/* Booking Section */}
      <BookingSection />

      {/* Contact Section */}
      <section id="contact" className="py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Badge variant="outline" className="mb-4 px-4 py-1">
              <Mail className="w-4 h-4 mr-2 inline" />
              {t("contact.badge")}
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">{t("contact.title")}</h2>
            <p className="text-muted-foreground text-lg">
              {t("contact.description")}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-primary text-primary-foreground border-none shadow-2xl hover:shadow-xl hover:shadow-primary/5 transition-all duration-200">
              <CardContent className="p-8 flex flex-col justify-center h-full space-y-6">
                <h3 className="text-2xl font-bold">{t("contact.infoTitle")}</h3>
                <div className="space-y-4">
                  <a href={`mailto:${contactInfo.email}`} className="flex items-center gap-3 hover:opacity-80 transition-opacity group">
                    <div className="p-2 bg-white/10 rounded-lg group-hover:bg-white/20 transition-colors">
                      <Mail className="w-5 h-5" />
                    </div>
                    <span>{contactInfo.email}</span>
                  </a>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/10 rounded-lg">
                      <Phone className="w-5 h-5" />
                    </div>
                    <span>{contactInfo.phone}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/10 rounded-lg">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <span>{contactInfo.location}</span>
                  </div>
                </div>

                <div className="pt-6 flex gap-4">
                  <a
                    href={contactInfo.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                    aria-label="LinkedIn Profile"
                  >
                    <Linkedin className="w-6 h-6" />
                  </a>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border border-border/50 shadow-2xl hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 transition-all duration-200">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">{t("contact.form.name")}</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      placeholder={t("contact.form.namePlaceholder")}
                      autoComplete="name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">{t("contact.form.email")}</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      placeholder={t("contact.form.emailPlaceholder")}
                      autoComplete="email"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">{t("contact.form.message")}</label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      placeholder={t("contact.form.messagePlaceholder")}
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={formState === "submitting" || formState === "success"}
                  >
                    {formState === "submitting" ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : formState === "success" ? (
                      <>
                        <CheckCircle2 className="mr-2 h-4 w-4" />
                        Sent Successfully
                      </>
                    ) : (
                      t("contact.form.send")
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Game />

      {/* Footer */}
      <footer className="py-8 border-t">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">{t("footer.rights", { year: new Date().getFullYear() })}</p>
          <p className="text-sm mt-2 text-muted-foreground">{t("footer.builtWith")}</p>
        </div>
      </footer>

      <AIChatbot />
      <ScrollToTop />
    </div>
  )
}
