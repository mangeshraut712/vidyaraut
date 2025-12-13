"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Database, LineChart, Battery, Code2, Sparkles } from "lucide-react"
import { useTranslations } from "next-intl"

// Optimized animation variants for smooth 120fps
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
}

const cardVariants = {
    hidden: {
        opacity: 0,
        y: 30,
        scale: 0.95
    },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            type: "spring",
            stiffness: 300,
            damping: 24
        }
    }
}

const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 200,
            damping: 20
        }
    }
}

// Icon gradient background colors
const iconGradients = [
    "from-blue-500 to-cyan-400",
    "from-amber-500 to-orange-400",
    "from-emerald-500 to-teal-400",
    "from-purple-500 to-pink-400"
]

export function Skills() {
    const t = useTranslations("skills")

    const skills = [
        {
            title: t("marketAnalysis.title"),
            icon: LineChart,
            items: t.raw("marketAnalysis.items") as string[],
            gradient: iconGradients[0],
            accentColor: "blue"
        },
        {
            title: t("energyTech.title"),
            icon: Battery,
            items: t.raw("energyTech.items") as string[],
            gradient: iconGradients[1],
            accentColor: "amber"
        },
        {
            title: t("dataTools.title"),
            icon: Database,
            items: t.raw("dataTools.items") as string[],
            gradient: iconGradients[2],
            accentColor: "emerald"
        },
        {
            title: t("technical.title"),
            icon: Code2,
            items: t.raw("technical.items") as string[],
            gradient: iconGradients[3],
            accentColor: "purple"
        }
    ]

    return (
        <section id="skills" className="py-24 relative overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent -z-10" />
            <div
                className="absolute top-1/2 left-1/2 w-[800px] h-[800px] bg-gradient-radial from-primary/10 to-transparent rounded-full blur-3xl -z-10"
                style={{ transform: 'translate(-50%, -50%)' }}
            />
            <div className="absolute inset-0 bg-dot-pattern opacity-20 -z-10" />

            <div className="container mx-auto px-4">
                {/* Section Header */}
                <motion.div
                    variants={titleVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="text-center mb-16"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
                    >
                        <Sparkles className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium text-primary">Expertise</span>
                    </motion.div>

                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-blue-500 to-purple-600">
                        {t("title")}
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-lg md:text-xl">
                        {t("description")}
                    </p>
                </motion.div>

                {/* Skills Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                    {skills.map((skill, index) => (
                        <SkillCard
                            key={skill.title}
                            title={skill.title}
                            icon={skill.icon}
                            items={skill.items}
                            gradient={skill.gradient}
                            index={index}
                        />
                    ))}
                </motion.div>
            </div>
        </section>
    )
}

interface SkillCardProps {
    title: string
    icon: React.ElementType
    items: string[]
    gradient: string
    index: number
}

function SkillCard({ title, icon: Icon, items, gradient, index }: SkillCardProps) {
    return (
        <motion.div
            variants={cardVariants}
            whileHover={{
                y: -8,
                transition: { type: "spring", stiffness: 400, damping: 17 }
            }}
            className="group relative"
        >
            {/* Gradient border effect on hover */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/20 via-transparent to-blue-500/20 opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500 -z-10" />

            <div className="relative bg-card/80 backdrop-blur-sm rounded-2xl p-6 h-full flex flex-col border border-border/50 group-hover:border-primary/30 group-hover:shadow-2xl group-hover:shadow-primary/10 transition-all duration-300">
                {/* Icon */}
                <motion.div
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.5 }}
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300`}
                >
                    <Icon className="w-7 h-7 text-white" />
                </motion.div>

                {/* Title */}
                <h3 className="text-xl font-bold mb-4 group-hover:text-primary transition-colors duration-300">
                    {title}
                </h3>

                {/* Skills Tags */}
                <div className="flex flex-wrap gap-2 mt-auto">
                    {items.map((item, idx) => (
                        <motion.div
                            key={item}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 * idx + 0.3 }}
                        >
                            <Badge
                                variant="secondary"
                                className="bg-secondary/50 hover:bg-primary/10 hover:text-primary group-hover:border-primary/20 transition-all duration-200 font-medium cursor-default"
                            >
                                {item}
                            </Badge>
                        </motion.div>
                    ))}
                </div>

                {/* Decorative corner gradient */}
                <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl ${gradient} opacity-5 rounded-tr-2xl rounded-bl-full pointer-events-none`} />
            </div>
        </motion.div>
    )
}
