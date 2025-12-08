"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Database, LineChart, Battery, Code2 } from "lucide-react"
import { useTranslations } from "next-intl"

export function Skills() {
    const t = useTranslations("skills")

    return (
        <section id="skills" className="py-24 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/3 rounded-full blur-3xl -z-10" />

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
            whileHover={{ y: -5 }}
            className="bg-card backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-border/50 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 transition-all duration-200 h-full flex flex-col"
        >
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center mb-6 text-primary ring-1 ring-primary/20">
                <Icon className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold mb-4">{title}</h3>
            <div className="flex flex-wrap gap-2 mt-auto">
                {items.map((item) => (
                    <Badge key={item} variant="secondary" className="bg-secondary/50 hover:bg-primary/10 hover:text-primary transition-colors duration-300 font-medium">
                        {item}
                    </Badge>
                ))}
            </div>
        </motion.div>
    )
}
