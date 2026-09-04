"use client"

import { useSyncExternalStore } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ArrowUpRight, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
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
        scrolled ? "border-border" : "border-transparent",
      )}
    >
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link
          href={localePath(locale, "/")}
          className="font-display text-lg tracking-tight"
        >
          Bernardo <span className="serif-accent">Fernandez</span>
        </Link>

        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-7 md:flex"
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              data-active={isActive(link.href)}
              className={cn(
                "nav-link text-sm transition-colors hover:text-foreground",
                isActive(link.href) ? "text-foreground" : "text-muted-foreground",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          <LanguageSwitcher locale={locale} />
          <CommandMenu locale={locale} />
          <Magnetic className="hidden md:inline-block">
            <Button
              asChild
              className="hidden h-9 rounded-full px-5 md:inline-flex"
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
          <ThemeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                aria-label={dict.nav.openMenu}
              >
                <Menu className="size-5" aria-hidden="true" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-xs">
              <SheetHeader>
                <SheetTitle className="font-display text-xl">
                  {dict.nav.menu}
                </SheetTitle>
              </SheetHeader>
              <nav
                aria-label="Mobile navigation"
                className="flex flex-col gap-1 px-4"
              >
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="py-2 font-display text-3xl tracking-tight transition-colors hover:text-highlight"
                  >
                    {link.label}
                  </Link>
                ))}
                <Button
                  asChild
                  className="mt-6 h-11 rounded-full"
                >
                  <Link href={localePath(locale, "/start-a-project")}>
                    {dict.nav.startProject}
                    <ArrowUpRight className="size-4" aria-hidden="true" />
                  </Link>
                </Button>
              </nav>
              <p className="mt-auto px-4 pb-8 text-sm text-muted-foreground">
                {dict.availability}
              </p>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <ScrollProgress />
    </header>
  )
}
