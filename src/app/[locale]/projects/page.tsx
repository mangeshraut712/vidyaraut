"use client"

import React from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Code, 
  Battery,
  BarChart3,
  FileText,
  Zap,
  TrendingUp
} from "lucide-react"

const projects = [
  {
    title: "Energy Storage Market Analysis Dashboard",
    description: "Comprehensive market analysis dashboard for energy storage systems (ESS) covering global trends, policy impacts, and market sizing.",
    category: "Market Research",
    icon: Battery,
    color: "from-green-500 to-emerald-500",
    tags: ["Excel", "Power BI", "Market Analysis", "ESS"],
    highlights: [
      "Analyzed 200+ market reports",
      "Created interactive dashboards",
      "Identified $5B market opportunity",
      "Presented to C-level executives"
    ],
    metrics: {
      impact: "High",
      duration: "6 months",
      team: "Solo"
    }
  },
  {
    title: "Battery Performance Testing Framework",
    description: "Developed systematic framework for battery testing and performance characterization in R&D laboratory environment.",
    category: "Technical",
    icon: Zap,
    color: "from-yellow-500 to-orange-500",
    tags: ["Battery Testing", "R&D", "Data Analysis", "Lab Safety"],
    highlights: [
      "Conducted 200+ battery tests",
      "Standardized testing procedures",
      "Improved data accuracy by 30%",
      "Created testing documentation"
    ],
    metrics: {
      impact: "Medium",
      duration: "6 months",
      team: "3 members"
    }
  },
  {
    title: "Competitive Intelligence Tracker",
    description: "Real-time competitive intelligence tracking system for energy sector companies, policies, and market movements.",
    category: "Data Analysis",
    icon: TrendingUp,
    color: "from-blue-500 to-cyan-500",
    tags: ["Excel", "Automation", "Market Intelligence", "Reporting"],
    highlights: [
      "Tracked 50+ competitors",
      "Automated data collection",
      "Weekly executive reports",
      "Reduced research time by 40%"
    ],
    metrics: {
      impact: "High",
      duration: "Ongoing",
      team: "Solo"
    }
  },
  {
    title: "Solar PV Market Sizing Study",
    description: "Comprehensive market sizing and forecasting study for solar photovoltaic systems in Indian market.",
    category: "Market Research",
    icon: BarChart3,
    color: "from-purple-500 to-pink-500",
    tags: ["Market Sizing", "Forecasting", "Solar", "India"],
    highlights: [
      "TAM/SAM/SOM analysis",
      "5-year market forecast",
      "Policy impact assessment",
      "Regional breakdown"
    ],
    metrics: {
      impact: "High",
      duration: "3 months",
      team: "2 members"
    }
  },
  {
    title: "Energy Policy Impact Reports",
    description: "Series of analytical reports on government energy policies and their market implications.",
    category: "Research",
    icon: FileText,
    color: "from-red-500 to-rose-500",
    tags: ["Policy Analysis", "Report Writing", "Research", "Government"],
    highlights: [
      "Analyzed 30+ policies",
      "Created impact models",
      "Executive summaries",
      "Stakeholder presentations"
    ],
    metrics: {
      impact: "Medium",
      duration: "12 months",
      team: "Solo"
    }
  },
  {
    title: "Data Visualization Portfolio",
    description: "Collection of interactive data visualizations and dashboards for energy market insights.",
    category: "Visualization",
    icon: BarChart3,
    color: "from-indigo-500 to-purple-500",
    tags: ["Power BI", "Excel", "Dashboards", "Visualization"],
    highlights: [
      "Created 20+ dashboards",
      "Interactive visualizations",
      "Real-time data updates",
      "User-friendly interfaces"
    ],
    metrics: {
      impact: "Medium",
      duration: "Ongoing",
      team: "Solo"
    }
  }
]

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/10 to-background">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="mb-4 px-4 py-1 text-base border-blue-500/50">
            <Code className="w-4 h-4 mr-2 inline" />
            Portfolio
          </Badge>
          <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
            Projects & Work
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Key projects demonstrating expertise in energy technology, market research, and data analysis
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid gap-8">
          {projects.map((project, idx) => {
            const Icon = project.icon
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 border-2 hover:border-primary/50">
                  <div className={`h-2 bg-gradient-to-r ${project.color}`} />
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        <div className={`p-3 rounded-xl bg-gradient-to-br ${project.color} text-white`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <CardTitle className="text-2xl">{project.title}</CardTitle>
                          </div>
                          <Badge variant="secondary" className="mb-3">
                            {project.category}
                          </Badge>
                          <p className="text-muted-foreground leading-relaxed">
                            {project.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {/* Highlights */}
                    <div className="mb-6">
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <span className="w-1 h-4 bg-gradient-to-b from-primary to-primary/50 rounded" />
                        Key Highlights
                      </h4>
                      <ul className="grid md:grid-cols-2 gap-2">
                        {project.highlights.map((highlight, hIdx) => (
                          <li key={hIdx} className="flex items-start gap-2 text-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                            <span className="text-foreground/80">{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag, tIdx) => (
                        <Badge key={tIdx} variant="outline" className="bg-background/50">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Metrics */}
                    <div className="flex gap-6 pt-4 border-t">
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">Impact</div>
                        <Badge className={
                          project.metrics.impact === "High" 
                            ? "bg-green-500" 
                            : "bg-yellow-500"
                        }>
                          {project.metrics.impact}
                        </Badge>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">Duration</div>
                        <div className="text-sm font-medium">{project.metrics.duration}</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">Team</div>
                        <div className="text-sm font-medium">{project.metrics.team}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <Card className="bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 border-2">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-8 text-center">Project Impact</h2>
              <div className="grid md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-emerald-600 mb-2">
                    6+
                  </div>
                  <p className="text-muted-foreground">Major Projects</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-600 mb-2">
                    500+
                  </div>
                  <p className="text-muted-foreground">Reports Analyzed</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 mb-2">
                    40%
                  </div>
                  <p className="text-muted-foreground">Efficiency Gain</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-red-600 mb-2">
                    $10M+
                  </div>
                  <p className="text-muted-foreground">Value Generated</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
