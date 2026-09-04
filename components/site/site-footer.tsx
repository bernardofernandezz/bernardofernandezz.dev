import Link from "next/link"
import { getDictionary } from "@/lib/i18n/get-dictionary"
import { localePath, type Locale } from "@/lib/i18n/config"
import { siteConfig } from "@/lib/config/site"

export function SiteFooter({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale).common

  const siteLinks = [
    { href: localePath(locale, "/work"), label: dict.nav.work },
    { href: localePath(locale, "/about"), label: dict.nav.about },
    { href: localePath(locale, "/writing"), label: dict.nav.writing },
    {
      href: localePath(locale, "/start-a-project"),
      label: dict.nav.startProject,
    },
  ]

  const socialLinks = [
    { href: siteConfig.socials.github, label: "GitHub" },
    { href: siteConfig.socials.linkedin, label: "LinkedIn" },
    { href: `mailto:${siteConfig.email}`, label: dict.footer.email },
  ]

  return (
    <footer className="border-t">
      <div className="container-page py-16">
        <p className="font-display text-display-sm text-muted-foreground">
          Bernardo <span className="italic">Fernandez</span>
        </p>

        <div className="mt-10 flex flex-col gap-10 sm:flex-row sm:justify-between">
          <nav aria-label="Footer navigation" className="flex flex-col gap-3">
            <p className="eyebrow">{dict.footer.siteColumn}</p>
            {siteLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
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
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t pt-6 text-sm text-muted-foreground sm:flex-row sm:justify-between">
          <p>
            © {new Date().getFullYear()} Bernardo Fernandez. {dict.footer.rights}
          </p>
          <p>
            {dict.location} · {dict.availability}
          </p>
        </div>
      </div>
    </footer>
  )
}
