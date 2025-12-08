"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Database, LineChart, Battery, Code2 } from "lucide-react"
import { useTranslations } from "next-intl"

// Optimized animation variants for 120fps
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.1
        }
    }
}

const cardVariants = {
    hidden: {
        opacity: 0,
        y: 15,
        scale: 0.98
    },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            type: "spring",
            stiffness: 400,
            damping: 25
        }
    }
}

const titleVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 300,
            damping: 20
        }
    }
}

export function Skills() {
    const t = useTranslations("skills")

    return (
        <section id="skills" className="py-24 relative overflow-hidden">
            {/* Background decoration - GPU accelerated */}
            <div
                className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-primary/3 rounded-full blur-3xl -z-10"
                style={{ transform: 'translate(-50%, -50%)' }}
            />

            <div className="container mx-auto px-4">
                <motion.div
                    variants={titleVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">
                        {t("title")}
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                        {t("description")}
                    </p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                    <SkillCard
                        title={t("marketAnalysis.title")}
                        icon={LineChart}
                        items={t.raw("marketAnalysis.items") as string[]}
                    />
                    <SkillCard
                        title={t("energyTech.title")}
                        icon={Battery}
                        items={t.raw("energyTech.items") as string[]}
                    />
                    <SkillCard
                        title={t("dataTools.title")}
                        icon={Database}
                        items={t.raw("dataTools.items") as string[]}
                    />
                    <SkillCard
                        title={t("technical.title")}
                        icon={Code2}
                        items={t.raw("technical.items") as string[]}
                    />
                </motion.div>
            </div>
        </section>
    )
}

function SkillCard({ title, icon: Icon, items }: { title: string, icon: React.ElementType, items: string[] }) {
    return (
        <motion.div
            variants={cardVariants}
            whileHover={{
                y: -4,
                transition: { type: "spring", stiffness: 400, damping: 20 }
            }}
            className="bg-card backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-border/50 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 transition-shadow duration-150 h-full flex flex-col will-change-transform"
        >
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center mb-6 text-primary ring-1 ring-primary/20">
                <Icon className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold mb-4">{title}</h3>
            <div className="flex flex-wrap gap-2 mt-auto">
                {items.map((item, idx) => (
                    <Badge
                        key={item}
                        variant="secondary"
                        className="bg-secondary/50 hover:bg-primary/10 hover:text-primary transition-colors duration-150 font-medium"
                        style={{ animationDelay: `${idx * 30}ms` }}
                    >
                        {item}
                    </Badge>
                ))}
            </div>
        </motion.div>
    )
}
