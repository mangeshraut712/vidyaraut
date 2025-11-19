"use client"

import React from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Zap, 
  TrendingUp, 
  Database, 
  BarChart3, 
  Battery, 
  Sun,
  Lightbulb
} from "lucide-react"

const skills = [
  {
    category: "Data Analysis & Visualization",
    icon: BarChart3,
    color: "from-purple-500 to-pink-500",
    items: [
      { name: "Microsoft Excel", level: 95, description: "Advanced formulas, pivot tables, macros" },
      { name: "Power BI", level: 85, description: "Dashboard creation, DAX, data modeling" },
      { name: "Data Visualization", level: 90, description: "Charts, graphs, infographics" },
      { name: "Statistical Analysis", level: 80, description: "Regression, forecasting, trends" }
    ]
  },
  {
    category: "Energy Technology",
    icon: Battery,
    color: "from-green-500 to-teal-500",
    items: [
      { name: "Battery Testing", level: 85, description: "Performance analysis, R&D support" },
      { name: "Energy Storage Systems", level: 80, description: "ESS market research, sizing" },
      { name: "Solar PV Management", level: 75, description: "System analysis, optimization" },
      { name: "Hydrogen Fuel", level: 70, description: "Market analysis, applications" }
    ]
  },
  {
    category: "Market Research",
    icon: TrendingUp,
    color: "from-blue-500 to-cyan-500",
    items: [
      { name: "Competitive Intelligence", level: 90, description: "Market analysis, competitor tracking" },
      { name: "Policy & Tariff Tracking", level: 85, description: "Regulatory analysis, compliance" },
      { name: "Market Sizing", level: 80, description: "TAM/SAM/SOM analysis" },
      { name: "Report Writing", level: 95, description: "Executive summaries, presentations" }
    ]
  },
  {
    category: "Technical Skills",
    icon: Database,
    color: "from-orange-500 to-red-500",
    items: [
      { name: "Data Management", level: 85, description: "Data cleaning, ETL processes" },
      { name: "Research Methodology", level: 90, description: "Qualitative & quantitative" },
      { name: "PowerPoint", level: 95, description: "Professional presentations" },
      { name: "Project Management", level: 80, description: "Planning, execution, delivery" }
    ]
  }
]

const certifications = [
  {
    title: "Energy Market Analysis",
    issuer: "Industry Certification",
    year: "2023",
    icon: Zap,
    color: "bg-purple-500"
  },
  {
    title: "Advanced Excel for Data Analysis",
    issuer: "Microsoft",
    year: "2022",
    icon: BarChart3,
    color: "bg-green-500"
  },
  {
    title: "Power BI Data Analyst",
    issuer: "Microsoft",
    year: "2023",
    icon: TrendingUp,
    color: "bg-blue-500"
  },
  {
    title: "Renewable Energy Systems",
    issuer: "Academic",
    year: "2024",
    icon: Sun,
    color: "bg-orange-500"
  }
]

export default function SkillsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="mb-4 px-4 py-1 text-base border-purple-500/50">
            <Lightbulb className="w-4 h-4 mr-2 inline" />
            Skills & Expertise
          </Badge>
          <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600">
            Technical Expertise
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive skill set in energy technology, data analysis, and market research
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid gap-8 mb-16">
          {skills.map((category, idx) => {
            const Icon = category.icon
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="overflow-hidden border-2 hover:border-primary/50 transition-all duration-300">
                  <CardHeader className={`bg-gradient-to-r ${category.color} text-white`}>
                    <CardTitle className="flex items-center gap-3">
                      <div className="p-2 bg-white/20 rounded-lg">
                        <Icon className="w-6 h-6" />
                      </div>
                      {category.category}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      {category.items.map((skill, skillIdx) => (
                        <div key={skillIdx} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="font-semibold text-foreground">{skill.name}</span>
                            <span className="text-sm font-bold text-primary">{skill.level}%</span>
                          </div>
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${skill.level}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 1, delay: skillIdx * 0.1 }}
                              className={`h-full bg-gradient-to-r ${category.color} rounded-full`}
                            />
                          </div>
                          <p className="text-sm text-muted-foreground">{skill.description}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold mb-8 text-center">Certifications & Training</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications.map((cert, idx) => {
              const Icon = cert.icon
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Card className="text-center hover:shadow-lg transition-shadow duration-300 h-full">
                    <CardContent className="p-6">
                      <div className={`w-16 h-16 ${cert.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="font-bold mb-2">{cert.title}</h3>
                      <p className="text-sm text-muted-foreground mb-1">{cert.issuer}</p>
                      <Badge variant="secondary">{cert.year}</Badge>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Key Strengths */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Card className="bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-blue-500/10 border-2">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6 text-center">Key Strengths</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-purple-600 mb-2">500+</div>
                  <p className="text-muted-foreground">Reports Analyzed</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-pink-600 mb-2">40%</div>
                  <p className="text-muted-foreground">Efficiency Improvement</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">$10M+</div>
                  <p className="text-muted-foreground">Decision Support Value</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
