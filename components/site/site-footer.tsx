import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { LocalTime } from "@/components/site/local-time"
import { getDictionary } from "@/lib/i18n/get-dictionary"
import { localePath, type Locale } from "@/lib/i18n/config"
import { siteConfig } from "@/lib/config/site"

export function SiteFooter({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale).common

  const siteLinks = [
    { href: localePath(locale, "/work"), label: dict.nav.work },
    { href: localePath(locale, "/about"), label: dict.nav.about },
    { href: localePath(locale, "/writing"), label: dict.nav.writing },
    { href: localePath(locale, "/now"), label: dict.nav.now },
    {
      href: localePath(locale, "/start-a-project"),
      label: dict.nav.startProject,
    },
  ]

  const socialLinks = [
    { href: siteConfig.socials.github, label: "GitHub" },
    { href: siteConfig.socials.linkedin, label: "LinkedIn" },
    { href: `mailto:${siteConfig.email}`, label: siteConfig.email },
  ]

  return (
    <footer className="border-t">
      <div className="container-page pb-10 pt-16 md:pt-20">
        <div className="flex flex-col gap-12 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-display text-display-md tracking-tight">
              Bernardo <span className="serif-accent">Fernandez</span>
            </p>
            <p className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
              <span>{dict.brandRole}</span>
              <span aria-hidden="true" className="text-border">
                /
              </span>
              <span>{dict.location}</span>
              <span aria-hidden="true" className="text-border">
                /
              </span>
              <LocalTime label={dict.footer.localTimeLabel} />
            </p>
          </div>

          <div className="flex gap-16 sm:gap-24">
            <nav aria-label="Footer navigation" className="flex flex-col gap-3">
              <p className="eyebrow">{dict.footer.siteColumn}</p>
              {siteLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                  <ArrowUpRight
                    className="size-3 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                    aria-hidden="true"
                  />
                </Link>
              ))}
            </nav>

            <div className="flex flex-col gap-3">
              <p className="eyebrow">{dict.footer.elsewhere}</p>
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                  className="group inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                  <ArrowUpRight
                    className="size-3 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                    aria-hidden="true"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-2 border-t pt-6 text-sm text-muted-foreground sm:flex-row sm:justify-between">
          <p>
            © {new Date().getFullYear()} Bernardo Fernandez. {dict.footer.rights}
          </p>
          <p className="text-xs leading-relaxed text-muted-foreground/70 sm:text-right">
            {dict.footer.colophon}
          </p>
        </div>
      </div>
    </footer>
  )
}
