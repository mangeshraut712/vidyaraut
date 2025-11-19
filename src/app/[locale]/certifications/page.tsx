"use client"

import React from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Award, Calendar, Building } from "lucide-react"
import { certificationsData } from "@/lib/legacy-data"

export default function CertificationsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="mb-4 px-4 py-1 text-base border-orange-500/50 bg-orange-500/10">
            <Award className="w-4 h-4 mr-2 inline" />
            Achievements
          </Badge>
          <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-orange-600 via-red-600 to-pink-600">
            Certifications & Awards
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Professional certifications and academic achievements
          </p>
        </motion.div>

        {/* Certifications Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {certificationsData.map((cert, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="h-full hover:shadow-2xl transition-all duration-300 border-2 hover:border-orange-500/50 group">
                <div className="h-2 bg-gradient-to-r from-orange-500 to-red-500" />
                <CardHeader className="text-center pb-4">
                  <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">
                    {cert.icon}
                  </div>
                  <CardTitle className="text-xl mb-2">{cert.title}</CardTitle>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {cert.description}
                  </p>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Building className="w-4 h-4 text-orange-600" />
                    <span>{cert.issuer}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-orange-600" />
                    <Badge variant="secondary">{cert.date}</Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 max-w-4xl mx-auto"
        >
          <Card className="bg-gradient-to-br from-orange-500/10 via-red-500/10 to-pink-500/10 border-2 border-orange-500/20">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Continuous Learning</h2>
              <p className="text-muted-foreground leading-relaxed">
                Committed to staying updated with the latest developments in energy technology, 
                market analysis, and data science through continuous professional development and 
                participation in industry conferences and workshops.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
