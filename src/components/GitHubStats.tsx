"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Github, GitCommit, Star, GitFork, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

const GITHUB_USERNAME = "vidyaraut17297"

const stats = [
    { label: "Repositories", value: "10+", icon: Github },
    { label: "Contributions", value: "150+", icon: GitCommit },
    { label: "Stars Earned", value: "25+", icon: Star },
]

const repositories = [
    {
        name: "vidyaraut",
        description: "Personal portfolio website built with Next.js 16 and React 19",
        language: "TypeScript",
        stars: 5,
        forks: 2,
        url: `https://github.com/${GITHUB_USERNAME}/vidyaraut`
    },
    {
        name: "energy-dashboard",
        description: "Power BI dashboard templates for energy sector analysis",
        language: "Python",
        stars: 12,
        forks: 4,
        url: "#"
    },
    {
        name: "battery-analytics",
        description: "Battery performance analytics and degradation prediction",
        language: "Python",
        stars: 8,
        forks: 3,
        url: "#"
    },
]

const languageColors: Record<string, string> = {
    TypeScript: "bg-blue-500",
    Python: "bg-yellow-500",
    JavaScript: "bg-yellow-400",
    HTML: "bg-orange-500",
}

export function GitHubStats() {
    return (
        <section className="py-24 relative overflow-hidden">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="text-center mb-12"
                >
                    <Badge variant="outline" className="mb-4 px-4 py-1">
                        <Github className="w-4 h-4 mr-2 inline" />
                        Open Source
                    </Badge>
                    <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">
                        GitHub Activity
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Contributing to open source and building tools for the energy sector.
                    </p>
                </motion.div>

                {/* Stats Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="grid grid-cols-3 gap-4 md:gap-8 max-w-2xl mx-auto mb-12"
                >
                    {stats.map((stat, idx) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="text-center p-4 md:p-6 bg-card rounded-2xl border border-border/50"
                        >
                            <stat.icon className="w-6 h-6 mx-auto mb-2 text-primary" />
                            <p className="text-2xl md:text-3xl font-bold text-foreground">{stat.value}</p>
                            <p className="text-xs md:text-sm text-muted-foreground">{stat.label}</p>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Contribution Graph Placeholder */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto mb-12"
                >
                    <Card className="p-6 bg-card border border-border/50 overflow-hidden">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-semibold">Contribution Activity</h3>
                            <a
                                href={`https://github.com/${GITHUB_USERNAME}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-primary hover:underline flex items-center gap-1"
                            >
                                View on GitHub <ExternalLink className="w-3 h-3" />
                            </a>
                        </div>

                        {/* Contribution Graph Visual */}
                        <div className="grid grid-cols-52 gap-[3px] overflow-x-auto">
                            {[...Array(52 * 7)].map((_, i) => (
                                <div
                                    key={i}
                                    className={`w-3 h-3 rounded-sm ${Math.random() > 0.6
                                            ? Math.random() > 0.8
                                                ? "bg-primary"
                                                : "bg-primary/60"
                                            : Math.random() > 0.5
                                                ? "bg-primary/30"
                                                : "bg-secondary"
                                        }`}
                                />
                            ))}
                        </div>
                        <p className="text-xs text-muted-foreground mt-4 text-center">
                            Contributions in the last year
                        </p>
                    </Card>
                </motion.div>

                {/* Featured Repositories */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    {repositories.map((repo, idx) => (
                        <motion.div
                            key={repo.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            whileHover={{ y: -4 }}
                            className="will-change-transform"
                        >
                            <Card className="h-full p-6 bg-card border border-border/50 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all duration-150">
                                <div className="flex items-start justify-between mb-3">
                                    <Github className="w-5 h-5 text-muted-foreground" />
                                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                        <span className="flex items-center gap-1">
                                            <Star className="w-4 h-4" /> {repo.stars}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <GitFork className="w-4 h-4" /> {repo.forks}
                                        </span>
                                    </div>
                                </div>

                                <h3 className="font-semibold text-foreground mb-2">{repo.name}</h3>
                                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                                    {repo.description}
                                </p>

                                <div className="flex items-center gap-2 mt-auto">
                                    <div className={`w-3 h-3 rounded-full ${languageColors[repo.language] || "bg-gray-500"}`} />
                                    <span className="text-xs text-muted-foreground">{repo.language}</span>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                <div className="text-center mt-8">
                    <Button asChild variant="outline" className="rounded-full">
                        <a
                            href={`https://github.com/${GITHUB_USERNAME}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Github className="w-4 h-4 mr-2" />
                            View All Repositories
                        </a>
                    </Button>
                </div>
            </div>
        </section>
    )
}
