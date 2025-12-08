"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"
import { useTranslations } from "next-intl"

export function Projects() {
    const t = useTranslations("projects")

    const projects = [
        {
            title: t("p1.title"),
            description: t("p1.description"),
            image: "/images/project1.jpg",
            tags: t.raw("p1.tags") as string[],
            link: "#",
            github: "#"
        },
        {
            title: t("p2.title"),
            description: t("p2.description"),
            image: "/images/project2.jpg",
            tags: t.raw("p2.tags") as string[],
            link: "#",
            github: "#"
        },
        {
            title: t("p3.title"),
            description: t("p3.description"),
            image: "/images/project3.jpg",
            tags: t.raw("p3.tags") as string[],
            link: "#",
            github: "#"
        }
    ]

    return (
        <section id="projects" className="py-24 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -z-10" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl -z-10" />

            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">
                        {t("title")}
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                        {t("description")}
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Card className="h-full flex flex-col overflow-hidden border-border/50 bg-card backdrop-blur-sm hover:shadow-2xl hover:shadow-primary/10 hover:border-primary/50 transition-all duration-200 group">
                                <div className="relative h-56 bg-secondary overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary group-hover:scale-110 transition-transform duration-500" />
                                    {/* Placeholder for project image */}
                                    <div className="absolute inset-0 flex items-center justify-center text-primary/20 font-bold text-6xl">
                                        {index + 1}
                                    </div>
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                        <Button variant="secondary" size="sm" className="gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                            <ExternalLink className="w-4 h-4" />
                                            {t("viewProject")}
                                        </Button>
                                    </div>
                                </div>
                                <CardHeader>
                                    <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors">{project.title}</CardTitle>
                                    <CardDescription className="mt-2 text-muted-foreground/80 line-clamp-3">{project.description}</CardDescription>
                                </CardHeader>
                                <CardContent className="flex-grow">
                                    <div className="flex flex-wrap gap-2">
                                        {project.tags.map((tag) => (
                                            <Badge key={tag} variant="secondary" className="font-normal bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
