"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Sparkles, ArrowUpRight } from "lucide-react"
import { useTranslations } from "next-intl"

// Optimized animation variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.2
        }
    }
}

const cardVariants = {
    hidden: {
        opacity: 0,
        y: 40,
        scale: 0.95
    },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            type: "spring",
            stiffness: 260,
            damping: 20
        }
    }
}

// Project gradient colors
const projectGradients = [
    { bg: "from-blue-500/20 via-blue-400/10 to-cyan-500/20", accent: "from-blue-500 to-cyan-400" },
    { bg: "from-purple-500/20 via-violet-400/10 to-pink-500/20", accent: "from-purple-500 to-pink-400" },
    { bg: "from-emerald-500/20 via-green-400/10 to-teal-500/20", accent: "from-emerald-500 to-teal-400" }
]

export function Projects() {
    const t = useTranslations("projects")

    const projects = [
        {
            title: t("p1.title"),
            description: t("p1.description"),
            tags: t.raw("p1.tags") as string[],
            ...projectGradients[0]
        },
        {
            title: t("p2.title"),
            description: t("p2.description"),
            tags: t.raw("p2.tags") as string[],
            ...projectGradients[1]
        },
        {
            title: t("p3.title"),
            description: t("p3.description"),
            tags: t.raw("p3.tags") as string[],
            ...projectGradients[2]
        }
    ]

    return (
        <section id="projects" className="py-24 relative overflow-hidden">
            {/* Background decorations */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/50 to-transparent -z-10" />
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-radial from-primary/10 to-transparent rounded-full blur-3xl -z-10" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-radial from-blue-500/10 to-transparent rounded-full blur-3xl -z-10" />
            <div className="absolute inset-0 bg-dot-pattern opacity-20 -z-10" />

            <div className="container mx-auto px-4">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className="text-center mb-16"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
                    >
                        <Sparkles className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium text-primary">Featured Work</span>
                    </motion.div>

                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-blue-500 to-purple-600">
                        {t("title")}
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-lg md:text-xl">
                        {t("description")}
                    </p>
                </motion.div>

                {/* Projects Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {projects.map((project, index) => (
                        <ProjectCard
                            key={project.title}
                            project={project}
                            index={index}
                        />
                    ))}
                </motion.div>

                {/* View More CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="text-center mt-12"
                >
                    <Button
                        variant="outline"
                        size="lg"
                        className="rounded-full px-8 hover:bg-primary/5 hover:border-primary/50 group"
                    >
                        View All Projects
                        <ArrowUpRight className="w-4 h-4 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </Button>
                </motion.div>
            </div>
        </section>
    )
}

interface ProjectCardProps {
    project: {
        title: string
        description: string
        tags: string[]
        bg: string
        accent: string
    }
    index: number
}

function ProjectCard({ project, index }: ProjectCardProps) {
    return (
        <motion.div
            variants={cardVariants}
            whileHover={{
                y: -12,
                rotateX: 2,
                rotateY: -2,
                transition: { type: "spring", stiffness: 300, damping: 20 }
            }}
            className="group perspective-1000"
        >
            <Card className="h-full flex flex-col overflow-hidden border-border/50 bg-card/80 backdrop-blur-sm hover:shadow-2xl hover:shadow-primary/10 hover:border-primary/30 transition-all duration-500">
                {/* Project Preview Area */}
                <div className="relative h-52 sm:h-56 overflow-hidden">
                    {/* Gradient Background */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${project.bg}`} />

                    {/* Animated Grid Pattern */}
                    <div className="absolute inset-0 bg-grid-pattern opacity-30 group-hover:opacity-50 transition-opacity duration-500" />

                    {/* Project Number */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + index * 0.1, type: "spring" }}
                        className="absolute inset-0 flex items-center justify-center"
                    >
                        <span className="text-8xl sm:text-9xl font-bold text-foreground/5 group-hover:text-foreground/10 group-hover:scale-110 transition-all duration-500">
                            {String(index + 1).padStart(2, '0')}
                        </span>
                    </motion.div>

                    {/* Hover Overlay with CTA */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end justify-center pb-6">
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            whileHover={{ y: 0, opacity: 1 }}
                        >
                            <Button
                                variant="secondary"
                                size="sm"
                                className="gap-2 rounded-full bg-white/90 text-black hover:bg-white shadow-lg backdrop-blur-sm"
                            >
                                <ExternalLink className="w-4 h-4" />
                                {t("viewProject")}
                            </Button>
                        </motion.div>
                    </div>

                    {/* Gradient accent line */}
                    <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${project.accent} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
                </div>

                {/* Content */}
                <CardHeader className="pb-3">
                    <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors duration-300 flex items-center gap-2">
                        {project.title}
                        <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 -translate-y-0 group-hover:-translate-y-1 transition-all duration-300" />
                    </CardTitle>
                    <CardDescription className="mt-2 text-muted-foreground/80 line-clamp-3 leading-relaxed">
                        {project.description}
                    </CardDescription>
                </CardHeader>

                <CardContent className="flex-grow pt-0">
                    <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag, idx) => (
                            <motion.div
                                key={tag}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 * idx + 0.4 }}
                            >
                                <Badge
                                    variant="secondary"
                                    className="font-normal bg-primary/5 text-primary/80 border border-primary/10 hover:bg-primary/10 hover:text-primary transition-all duration-200"
                                >
                                    {tag}
                                </Badge>
                            </motion.div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    )
}

// Helper function for translations in ProjectCard
function t(key: string) {
    // This is a fallback for the viewProject translation
    return key === "viewProject" ? "View Project" : key
}
