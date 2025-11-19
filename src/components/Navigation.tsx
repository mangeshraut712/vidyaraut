"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Home, Sparkles, Code, Briefcase, GraduationCap, Mail, Moon, Sun, Puzzle, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { useTheme } from "next-themes"
import { usePathname, useRouter } from "next/navigation"
import { useLocale, useTranslations } from "next-intl"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const pathname = usePathname()
  const router = useRouter()
  const currentLocale = useLocale()
  const t = useTranslations("nav")

  const navigation = [
    { name: t("home"), href: "#home", icon: Home },
    { name: t("skills"), href: "#skills", icon: Sparkles },
    { name: t("projects"), href: "#projects", icon: Code },
    { name: t("experience"), href: "#experience", icon: Briefcase },
    { name: t("education"), href: "#education", icon: GraduationCap },
    { name: t("contact"), href: "#contact", icon: Mail },
    { name: t("game"), href: "#game", icon: Puzzle },
  ]

  const switchLanguage = (newLocale: string) => {
    const segments = pathname.split('/')
    segments[1] = newLocale
    const newPath = segments.join('/')
    router.push(newPath)
    setIsLangMenuOpen(false)
  }

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setIsOpen(false)
    }
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/80 backdrop-blur-lg border-b shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="#home" onClick={(e) => handleScrollTo(e, "#home")} className="flex items-center justify-center group">
            <div className="relative w-10 h-10 rounded-full overflow-hidden border border-primary/10 group-hover:border-primary/30 transition-colors">
              <Image
                src="/logo.png"
                alt="VR"
                width={40}
                height={40}
                className="transition-transform group-hover:scale-110 object-cover"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navigation.map((item) => {
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleScrollTo(e, item.href)}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-4 py-2 rounded-full hover:bg-secondary/50"
                >
                  {item.name}
                </a>
              )
            })}

            {/* Theme Toggle */}
            {mounted && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="ml-2 rounded-full"
              >
                {theme === "dark" ? (
                  <Sun className="w-4 h-4" />
                ) : (
                  <Moon className="w-4 h-4" />
                )}
              </Button>
            )}

            {/* Language Toggle */}
            <div className="relative ml-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className="rounded-full"
              >
                <Globe className="w-4 h-4" />
              </Button>

              <AnimatePresence>
                {isLangMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 top-full mt-2 w-32 bg-card border border-border rounded-xl shadow-lg overflow-hidden py-1"
                  >
                    {['en', 'hi', 'mr'].map((lang) => (
                      <button
                        key={lang}
                        onClick={() => switchLanguage(lang)}
                        className={cn(
                          "w-full text-left px-4 py-2 text-sm hover:bg-secondary transition-colors",
                          currentLocale === lang ? "font-bold text-primary" : "text-muted-foreground"
                        )}
                      >
                        {lang === 'en' ? 'English' : lang === 'hi' ? 'Hindi' : 'Marathi'}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            {mounted && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="rounded-full"
              >
                {theme === "dark" ? (
                  <Sun className="w-4 h-4" />
                ) : (
                  <Moon className="w-4 h-4" />
                )}
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="rounded-full"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t bg-background/98 backdrop-blur-lg"
          >
            <div className="container mx-auto px-4 py-4 space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => handleScrollTo(e, item.href)}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors hover:bg-secondary"
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.name}</span>
                  </a>
                )
              })}

              <div className="border-t border-border my-2 pt-2">
                <div className="px-4 py-2 text-sm font-semibold text-muted-foreground">Language</div>
                <div className="grid grid-cols-3 gap-2 px-4">
                  {['en', 'hi', 'mr'].map((lang) => (
                    <button
                      key={lang}
                      onClick={() => switchLanguage(lang)}
                      className={cn(
                        "py-2 rounded-lg text-sm font-medium transition-colors border border-border",
                        currentLocale === lang
                          ? "bg-primary text-primary-foreground border-primary"
                          : "hover:bg-secondary text-muted-foreground"
                      )}
                    >
                      {lang === 'en' ? 'EN' : lang === 'hi' ? 'HI' : 'MR'}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
