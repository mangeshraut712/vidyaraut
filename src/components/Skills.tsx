"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Database, LineChart, Battery, Code2 } from "lucide-react"
import { useTranslations } from "next-intl"

export function Skills() {
    const t = useTranslations("skills")

    return (
        <section id="skills" className="py-24 bg-secondary/30">
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

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <SkillCard
                        title={t("marketAnalysis.title")}
                        icon={LineChart}
                        items={t.raw("marketAnalysis.items") as string[]}
                        index={0}
                    />
                    <SkillCard
                        title={t("energyTech.title")}
                        icon={Battery}
                        items={t.raw("energyTech.items") as string[]}
                        index={1}
                    />
                    <SkillCard
                        title={t("dataTools.title")}
                        icon={Database}
                        items={t.raw("dataTools.items") as string[]}
                        index={2}
                    />
                    <SkillCard
                        title={t("technical.title")}
                        icon={Code2}
                        items={t.raw("technical.items") as string[]}
                        index={3}
                    />
                </div>
            </div>
        </section>
    )
}

function SkillCard({ title, icon: Icon, items, index }: { title: string, icon: React.ElementType, items: string[], index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-card rounded-2xl p-6 shadow-sm border border-border/50 hover:shadow-md transition-all duration-300"
        >
            <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center mb-6 text-primary">
                <Icon className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold mb-4">{title}</h3>
            <div className="flex flex-wrap gap-2">
                {items.map((item) => (
                    <Badge key={item} variant="secondary" className="bg-secondary hover:bg-secondary/80 text-secondary-foreground font-normal">
                        {item}
                    </Badge>
                ))}
            </div>
        </motion.div>
    )
}
