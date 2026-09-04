"use client"

import { useSyncExternalStore } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ArrowRight, Menu } from "lucide-react"
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
  ]

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`)

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
          className="font-display text-xl tracking-tight transition-colors hover:text-highlight"
        >
          Bernardo Fernandez
        </Link>

        <nav aria-label="Main navigation" className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm transition-colors hover:text-foreground",
                isActive(link.href) ? "text-foreground" : "text-muted-foreground",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          <LanguageSwitcher locale={locale} />
          <Button
            asChild
            className="hidden rounded-full bg-highlight text-highlight-foreground hover:bg-highlight/90 md:inline-flex"
          >
            <Link href={localePath(locale, "/start-a-project")}>
              {dict.nav.startProject}
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </Button>
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
                    className="py-2 font-display text-3xl transition-colors hover:text-highlight"
                  >
                    {link.label}
                  </Link>
                ))}
                <Button
                  asChild
                  className="mt-6 rounded-full bg-highlight text-highlight-foreground hover:bg-highlight/90"
                >
                  <Link href={localePath(locale, "/start-a-project")}>
                    {dict.nav.startProject}
                    <ArrowRight className="size-4" aria-hidden="true" />
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
    </header>
  )
}
