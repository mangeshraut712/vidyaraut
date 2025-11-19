"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
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
        <section id="projects" className="py-24">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("title")}</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
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
                            <Card className="h-full flex flex-col overflow-hidden border-border/50 hover:shadow-lg transition-all duration-300 group">
                                <div className="relative h-48 bg-secondary overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-br from-muted/50 to-muted group-hover:scale-105 transition-transform duration-500" />
                                    {/* Placeholder for project image */}
                                    <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/20 font-bold text-4xl">
                                        {index + 1}
                                    </div>
                                </div>
                                <CardHeader>
                                    <CardTitle>{project.title}</CardTitle>
                                    <CardDescription className="mt-2">{project.description}</CardDescription>
                                </CardHeader>
                                <CardContent className="flex-grow">
                                    <div className="flex flex-wrap gap-2">
                                        {project.tags.map((tag) => (
                                            <Badge key={tag} variant="outline" className="font-normal">
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>
                                </CardContent>
                                <CardFooter className="gap-2 pt-0">
                                    <Button variant="outline" size="sm" className="w-full gap-2">
                                        <ExternalLink className="w-4 h-4" />
                                        {t("viewProject")}
                                    </Button>
                                </CardFooter>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
