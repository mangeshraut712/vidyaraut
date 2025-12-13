"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { Github, Linkedin, Mail, Heart, MapPin, ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const socialLinks = [
    {
        name: "LinkedIn",
        href: "https://www.linkedin.com/in/vidyaraut17/",
        icon: Linkedin,
        color: "hover:text-blue-500"
    },
    {
        name: "GitHub",
        href: "https://github.com/vidyaraut17297",
        icon: Github,
        color: "hover:text-foreground"
    },
    {
        name: "Email",
        href: "mailto:vidyaraut17297@gmail.com",
        icon: Mail,
        color: "hover:text-red-500"
    }
]

const quickLinks = [
    { name: "Home", href: "#home" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Contact", href: "#contact" },
]

export function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="relative overflow-hidden border-t border-border/50">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent -z-10" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-radial from-primary/10 to-transparent rounded-full blur-3xl -z-10" />

            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="lg:col-span-2"
                    >
                        <Link href="#home" className="inline-flex items-center gap-3 mb-4 group">
                            <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-primary/20 group-hover:border-primary/50 transition-colors">
                                <Image
                                    src="/logo.png"
                                    alt="Vidya Raut"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <span className="text-2xl font-bold gradient-text">Vidya Raut</span>
                        </Link>
                        <p className="text-muted-foreground max-w-md mb-6 leading-relaxed">
                            Energy Technology Analyst with expertise in market research, data analysis, and energy storage systems. Passionate about driving insights that power the future.
                        </p>

                        {/* Contact Info */}
                        <div className="space-y-2">
                            <a
                                href="mailto:vidyaraut17297@gmail.com"
                                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                            >
                                <Mail className="w-4 h-4" />
                                vidyaraut17297@gmail.com
                            </a>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <MapPin className="w-4 h-4" />
                                Pune, Maharashtra, India
                            </div>
                        </div>
                    </motion.div>

                    {/* Quick Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                    >
                        <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
                        <ul className="space-y-3">
                            {quickLinks.map((link) => (
                                <li key={link.name}>
                                    <a
                                        href={link.href}
                                        className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1 group"
                                    >
                                        {link.name}
                                        <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Connect Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <h3 className="font-semibold text-lg mb-4">Connect</h3>
                        <div className="flex gap-3 mb-6">
                            {socialLinks.map((social) => {
                                const Icon = social.icon
                                return (
                                    <a
                                        key={social.name}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`p-3 rounded-full bg-secondary/50 border border-border/50 hover:border-primary/50 hover:bg-primary/10 transition-all duration-300 ${social.color}`}
                                        aria-label={social.name}
                                    >
                                        <Icon className="w-5 h-5" />
                                    </a>
                                )
                            })}
                        </div>

                        <Button
                            asChild
                            className="rounded-full bg-gradient-to-r from-primary to-blue-600 hover:shadow-lg hover:shadow-primary/25 transition-all"
                        >
                            <a href="#contact">
                                Let&apos;s Connect
                                <ArrowUpRight className="w-4 h-4 ml-2" />
                            </a>
                        </Button>
                    </motion.div>
                </div>

                {/* Bottom Bar */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="pt-8 border-t border-border/50"
                >
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-sm text-muted-foreground text-center md:text-left">
                            © {currentYear} Vidya Raut. All rights reserved.
                        </p>

                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                            Built with <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" /> using Next.js 16 &amp; React 19
                        </p>
                    </div>
                </motion.div>
            </div>
        </footer>
    )
}
