"use client"

import React from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Puzzle } from "lucide-react"

export default function GamePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="mb-4 px-4 py-1 text-base border-red-500/50 bg-red-500/10">
            <Puzzle className="w-4 h-4 mr-2 inline" />
            Fun & Games
          </Badge>
          <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600">
            Marathi Crossword Game
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Take a break and enjoy this fun Marathi crossword puzzle!
          </p>
        </motion.div>

        {/* Crossword Game */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <Card className="border-2 border-red-500/20 shadow-2xl overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500" />
            <CardContent className="p-0">
              <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src="https://marathigames.in/Crossword/crossword.html"
                  title="Marathi Crossword Game"
                  style={{
                    border: "none",
                    background: "#fff",
                  }}
                  loading="lazy"
                  allow="fullscreen"
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 max-w-2xl mx-auto"
        >
          <Card className="bg-gradient-to-br from-red-500/10 via-orange-500/10 to-yellow-500/10 border-2 border-red-500/20">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">How to Play</h2>
              <p className="text-muted-foreground leading-relaxed">
                Click on the crossword grid to start playing. Fill in the words based on the clues provided. 
                This is a fun way to practice Marathi vocabulary and enjoy a classic puzzle game!
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
