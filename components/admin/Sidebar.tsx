"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useLanguage } from "@/app/language-provider"
import { translations } from "@/lib/translations"

const links = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/blogs", label: "Blogs" },
]

export default function Sidebar() {
  const pathname = usePathname() || ""
  const { language } = useLanguage()
  const t = translations[language]

  return (
    <>
      {/* ================= MOBILE TOGGLE ================= */}
      <input
        type="checkbox"
        id="admin-sidebar"
        className="peer hidden"
        aria-hidden
      />

      {/* Hamburger Button */}
      <label
        htmlFor="admin-sidebar"
        className="
          fixed top-4 left-4 z-50 flex h-10 w-10 cursor-pointer
          items-center justify-center rounded-md border bg-background
          md:hidden peer-checked:hidden
        "
      >
        ☰
      </label>

      {/* Overlay */}
      <label
        htmlFor="admin-sidebar"
        className="
          fixed inset-0 z-40 bg-black/40 opacity-0 pointer-events-none
          transition
          peer-checked:opacity-100 peer-checked:pointer-events-auto
          md:hidden
        "
      />

      {/* ================= SIDEBAR ================= */}
<aside
  className="
    fixed z-50 h-screen w-64 bg-card border-r p-4
    -translate-x-full transition-transform
    peer-checked:translate-x-0
    md:sticky md:top-0 md:translate-x-0
    md:flex md:flex-col
  "
>

        {/* Header */}
        <div className="flex items-center gap-2 px-2 py-3">
          <img src="/gotani-logo.png" alt="logo" className="h-10 w-auto" />
          <div className="text-lg font-semibold">{t.nav.admin}</div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-2">
          <ul className="space-y-1">
            {links.map((l) => {
              const active = pathname === l.href
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className={
                      "block px-3 py-2 rounded-md text-sm font-medium " +
                      (active
                        ? "bg-primary/10 text-primary"
                        : "text-foreground hover:bg-muted/50")
                    }
                  >
                    {l.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="px-2">
          <Link
            href="/"
            className="block w-full text-center px-3 py-2 mb-2 bg-primary text-primary-foreground rounded-md hover:opacity-95 transition"
          >
            {t.admin.backToSite}
          </Link>

          <button
            onClick={async () => {
              await fetch("/api/admin/logout", { method: "POST" })
              window.location.href = "/admin/login"
            }}
            className="w-full px-3 py-2 bg-destructive/10 text-destructive rounded-md hover:bg-destructive/20 transition"
          >
            {t.admin.signOut}
          </button>

          <div className="mt-3 text-xs text-muted-foreground">
            GoTani — Admin
          </div>
        </div>
      </aside>
    </>
  )
}
