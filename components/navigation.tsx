"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X, Globe } from "lucide-react"
import { useLanguage } from "@/app/language-provider"
import { translations } from "@/lib/translations"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const { language, setLanguage } = useLanguage()

  const t = translations[language]

  const navLinks = [
    { href: "/", label: t.nav.home },
    { href: "/about", label: t.nav.about },
    { href: "/features", label: t.nav.features },
    { href: "/prices", label: t.nav.catalog },
    { href: "/testimonials", label: t.nav.testimonials },
    { href: "/blog", label: t.nav.blog },
    { href: "/contact", label: t.nav.contact },
  ]

  const toggleLanguage = () => {
    setLanguage(language === 'id' ? 'en' : 'id')
  }

  return (
    <nav className="fixed top-0 w-full backdrop-blur-md bg-white/80 shadow-lg z-50 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <img src="/gotani-logo.png" alt="GoTani Logo" className="h-12 md:h-16 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-1 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm md:text-sm font-medium text-foreground hover:text-primary hover:bg-primary/5 rounded-lg transition-all duration-300 ease-out"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA, Language Switcher and Mobile Menu Button */}
          <div className="flex items-center gap-4">
            <a
              href="https://wa.me/6281554877596"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-block px-5 py-2 bg-gradient-to-r from-primary to-accent text-white rounded-lg hover:shadow-lg transition-all duration-500 ease-out font-medium text-sm"
            >
              {t.nav.joinNow}
            </a>

            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-primary/10 transition-all duration-300 cursor-pointer"
              title={language === 'id' ? 'Switch to English' : 'Beralih ke Bahasa Indonesia'}
              aria-label={language === 'id' ? 'Switch to English' : 'Beralih ke Bahasa Indonesia'}
            >
              {language === 'id' ? (
                <svg className="w-6 h-6" viewBox="0 0 4 3" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="false">
                  <title>Indonesia</title>
                  <rect width="4" height="1.5" y="0" fill="#e70000" />
                  <rect width="4" height="1.5" y="1.5" fill="#ffffff" />
                </svg>
              ) : (
                <svg className="w-6 h-6" viewBox="0 0 60 30" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="false">
                  <title>United Kingdom</title>
                  <rect width="60" height="30" fill="#012169" />
                  <path d="M0 0 L60 30 M60 0 L0 30" stroke="#fff" strokeWidth="6" />
                  <path d="M0 0 L60 30 M60 0 L0 30" stroke="#C8102E" strokeWidth="4" />
                  <path d="M30 0 L30 30 M0 15 L60 15" stroke="#fff" strokeWidth="10" />
                  <path d="M30 0 L30 30 M0 15 L60 15" stroke="#C8102E" strokeWidth="6" />
                </svg>
              )}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
            <div className="md:hidden pb-4 space-y-2 fade-in">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-4 py-3 text-base font-medium text-foreground hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}
