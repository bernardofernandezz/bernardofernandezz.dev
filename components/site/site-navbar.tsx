"use client"

import { useState, useSyncExternalStore, type CSSProperties } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ArrowUpRight, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { ThemeToggle } from "@/components/site/theme-toggle"
import { LanguageSwitcher } from "@/components/site/language-switcher"
import { CommandMenu } from "@/components/site/command-palette"
import { ScrollProgress } from "@/components/site/scroll-progress"
import { Magnetic } from "@/components/site/magnetic"
import { getDictionary } from "@/lib/i18n/get-dictionary"
import { localePath, type Locale } from "@/lib/i18n/config"
import { siteConfig } from "@/lib/config/site"
import { cn } from "@/lib/utils"

function subscribeToScroll(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true })
  return () => window.removeEventListener("scroll", onChange)
}

function getIsScrolled() {
  return window.scrollY > 8
}

function getIsScrolledOnServer() {
  return false
}

export function SiteNavbar({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale).common
  const pathname = usePathname()
  const scrolled = useSyncExternalStore(
    subscribeToScroll,
    getIsScrolled,
    getIsScrolledOnServer,
  )
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = () => setMenuOpen(false)

  const links = [
    { href: localePath(locale, "/work"), label: dict.nav.work },
    { href: localePath(locale, "/about"), label: dict.nav.about },
    { href: localePath(locale, "/writing"), label: dict.nav.writing },
    { href: localePath(locale, "/now"), label: dict.nav.now },
  ]

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`)

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b bg-background/85 backdrop-blur-md transition-colors duration-300",
        scrolled
          ? "border-border shadow-[0_12px_32px_-20px_rgba(0,0,0,0.35)]"
          : "border-transparent",
      )}
    >
      <div className="container-page flex h-16 items-center justify-between gap-2 sm:gap-4">
        <Link
          href={localePath(locale, "/")}
          className="min-w-0 shrink-0 font-display text-base tracking-tight sm:text-lg"
        >
          Bernardo
          <span className="serif-accent min-[480px]:inline hidden">
            {" "}
            Fernandez
          </span>
        </Link>

        <nav
          aria-label={dict.nav.mainNav}
          className="hidden items-center gap-7 lg:flex"
        >
          {links.map((link) => {
            const active = isActive(link.href)
            return (
              <Link
                key={link.href}
                href={link.href}
                data-active={active}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "nav-link text-sm transition-colors hover:text-foreground",
                  active ? "text-foreground" : "text-muted-foreground",
                )}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        <div className="flex min-w-0 items-center gap-1 sm:gap-1.5">
          <LanguageSwitcher locale={locale} />
          <span className="hidden min-[480px]:block">
            <CommandMenu locale={locale} />
          </span>
          <Magnetic className="hidden lg:inline-block">
            <Button
              asChild
              className="hidden h-9 rounded-full px-5 lg:inline-flex"
            >
              <Link href={localePath(locale, "/start-a-project")}>
                {dict.nav.startProject}
                <ArrowUpRight
                  className="size-4 transition-transform duration-300 group-hover/button:translate-x-0.5 group-hover/button:-translate-y-0.5"
                  aria-hidden="true"
                />
              </Link>
            </Button>
          </Magnetic>
          <ThemeToggle locale={locale} />
          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-11 w-11 lg:hidden"
                aria-label={dict.nav.openMenu}
              >
                <Menu className="size-5" aria-hidden="true" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              showCloseButton={false}
              closeLabel={dict.close}
              className="flex w-full max-w-none flex-col bg-background p-0 sm:w-[400px]"
            >
              <SheetTitle className="sr-only">{dict.nav.menu}</SheetTitle>

              <div className="container-page flex h-16 shrink-0 items-center justify-between">
                <span className="font-display text-lg tracking-tight">
                  Bernardo <span className="serif-accent">Fernandez</span>
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-11 w-11"
                  aria-label={dict.close}
                  onClick={() => setMenuOpen(false)}
                >
                  <X className="size-5" aria-hidden="true" />
                </Button>
              </div>

              <nav
                aria-label={dict.nav.mobileNav}
                className="container-page flex flex-col pt-6"
              >
                {links.map((link, index) => {
                  const active = isActive(link.href)
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={closeMenu}
                      aria-current={active ? "page" : undefined}
                      style={{ "--menu-delay": `${120 + index * 70}ms` } as CSSProperties}
                      className="menu-item group flex items-baseline gap-4 border-b py-4"
                    >
                      <span
                        aria-hidden="true"
                        className={cn(
                          "font-mono text-xs transition-colors",
                          active
                            ? "text-highlight"
                            : "text-muted-foreground group-hover:text-highlight",
                        )}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={cn(
                          "font-display text-4xl tracking-tight transition-colors",
                          active
                            ? "text-highlight"
                            : "text-foreground group-hover:text-highlight",
                        )}
                      >
                        {link.label}
                      </span>
                      <ArrowUpRight
                        aria-hidden="true"
                        className={cn(
                          "ml-auto size-6 shrink-0 self-center transition-all duration-300",
                          active
                            ? "text-highlight opacity-100"
                            : "-translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 group-hover:text-highlight",
                        )}
                      />
                    </Link>
                  )
                })}
              </nav>

              <div
                className="menu-item container-page mt-auto flex flex-col gap-4 pb-[max(2rem,env(safe-area-inset-bottom))]"
                style={{ "--menu-delay": "420ms" } as CSSProperties}
              >
                <Button asChild className="h-12 rounded-full text-base">
                  <Link
                    href={localePath(locale, "/start-a-project")}
                    onClick={closeMenu}
                  >
                    {dict.nav.startProject}
                    <ArrowUpRight className="size-4" aria-hidden="true" />
                  </Link>
                </Button>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="transition-colors hover:text-foreground"
                  >
                    {siteConfig.email}
                  </a>
                  <span>{dict.availability}</span>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <ScrollProgress />
    </header>
  )
}
