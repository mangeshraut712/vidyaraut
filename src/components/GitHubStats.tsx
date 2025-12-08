"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Github, Star, GitFork, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

const GITHUB_USERNAME = "vidyaraut17297"
const GITHUB_URL = `https://github.com/${GITHUB_USERNAME}`

// Real data from your GitHub profile
const stats = [
    { label: "Public Repos", value: "1" },
    { label: "Followers", value: "0" },
    { label: "Following", value: "0" },
]

const repositories = [
    {
        name: "vidyaraut",
        description: "Personal portfolio website built with Next.js 16 and React 19",
        language: "TypeScript",
        stars: 0,
        forks: 0,
        url: `${GITHUB_URL}/vidyaraut`
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
                        GitHub Profile
                    </Badge>
                    <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">
                        Open Source
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Building and sharing projects on GitHub.
                    </p>
                </motion.div>

                {/* Stats Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="grid grid-cols-3 gap-4 md:gap-8 max-w-lg mx-auto mb-12"
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
                            <p className="text-2xl md:text-3xl font-bold text-foreground">{stat.value}</p>
                            <p className="text-xs md:text-sm text-muted-foreground">{stat.label}</p>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Repository */}
                <div className="max-w-md mx-auto">
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
                                <p className="text-sm text-muted-foreground mb-4">
                                    {repo.description}
                                </p>

                                <div className="flex items-center gap-2">
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
                            href={GITHUB_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Github className="w-4 h-4 mr-2" />
                            View GitHub Profile
                            <ExternalLink className="w-3 h-3 ml-2" />
                        </a>
                    </Button>
                </div>
            </div>
        </section>
    )
}
