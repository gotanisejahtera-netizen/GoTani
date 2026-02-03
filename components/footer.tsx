"use client"

import Link from "next/link"
import Image from "next/image"
import { Mail, Phone, Facebook, Twitter, Instagram, Linkedin } from "lucide-react"
import { useLanguage } from "@/app/language-provider"

export function Footer() {
  const { language } = useLanguage()

  const footerContent = {
    id: {
      brandDesc: "Menghubungkan petani dengan distributor untuk sistem pangan berkelanjutan dan transparan.",
      product: "Produk",
      company: "Perusahaan",
      contact: "Hubungi Kami",
      follow: "Ikuti Kami",
      copyright: "© 2025 GoTani. Semua hak dilindungi.",
      privacy: "Privacy Policy",
      terms: "Terms of Service",
      productLinks: ["Features", "Market Prices", "Blog", "Testimonials"],
      companyLinks: ["About Us", "Contact", "FAQ", "Blog"],
    },
    en: {
      brandDesc: "Connecting farmers with distributors for a sustainable and transparent food system.",
      product: "Product",
      company: "Company",
      contact: "Contact Us",
      follow: "Follow Us",
      copyright: "© 2025 GoTani. All rights reserved.",
      privacy: "Privacy Policy",
      terms: "Terms of Service",
      productLinks: ["Features", "Market Prices", "Blog", "Testimonials"],
      companyLinks: ["About Us", "Contact", "FAQ", "Blog"],
    },
  }

  const t = footerContent[language]

  return (
    <footer className="bg-foreground text-primary-foreground relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-foreground to-black/50 -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 sm:gap-12 mb-8 sm:mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-6 w-full">
              <Image
              src="/gotani-logo-icon.png"
              alt="GoTani Logo"
              width={512}
              height={128}
              className="w-full h-auto object-contain"
              />
            </div>
            <p className="text-sm opacity-80 leading-relaxed">
              {t.brandDesc}
            </p>
          </div>

          {/* Product */}
          <div className="">
            <h4 className="font-semibold mb-6 text-base">{t.product}</h4>
            <ul className="space-y-3 text-sm">
              {t.productLinks.map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase().replace(" ", "-")}`}
                    className="opacity-80 hover:opacity-100 transition-opacity"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-6 text-base">{t.company}</h4>
            <ul className="space-y-3 text-sm">
              {t.companyLinks.map((item) => (
                <li key={item}>
                  <Link href="/" className="opacity-80 hover:opacity-100 transition-opacity">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-6 text-base">{t.contact}</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4" />
                <a href="mailto:gotanisejahtera@gmail.com" className="opacity-80 hover:opacity-100 transition-opacity">
                  gotanisejahtera@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4" />
                <a href="tel:+6281554877596" className="opacity-80 hover:opacity-100 transition-opacity">
                  +62 815-5487-7596
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div className="">
            <h4 className="font-semibold mb-6 text-base">{t.follow}</h4>
            <div className="flex gap-4 flex-wrap">
              {[
                { icon: Instagram, href: "https://www.instagram.com/gotani_indonesia/" },
              ].map(({ icon: Icon, href }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center hover:bg-primary/40 transition-all duration-500 ease-out"
                  title="Follow us on Instagram"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-primary-foreground/20 py-6 sm:py-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm opacity-75">{t.copyright}</p>
            <div className="flex gap-6 text-sm">
              <Link href="/" className="opacity-75 hover:opacity-100 transition-opacity">
                {t.privacy}
              </Link>
              <Link href="/" className="opacity-75 hover:opacity-100 transition-opacity">
                {t.terms}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
