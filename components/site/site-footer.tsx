import Link from "next/link"
import { siteConfig } from "@/lib/config/site"

const FOOTER_LINKS = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/writing", label: "Writing" },
  { href: "/start-a-project", label: "Start a project" },
] as const

const SOCIAL_LINKS = [
  { href: siteConfig.socials.github, label: "GitHub" },
  { href: siteConfig.socials.linkedin, label: "LinkedIn" },
  { href: `mailto:${siteConfig.email}`, label: "Email" },
] as const

export function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="container-page py-16">
        <p className="font-display text-display-sm text-muted-foreground">
          Bernardo <span className="italic">Fernandez</span>
        </p>

        <div className="mt-10 flex flex-col gap-10 sm:flex-row sm:justify-between">
          <nav aria-label="Footer navigation" className="flex flex-col gap-3">
            <p className="eyebrow">Site</p>
            {FOOTER_LINKS.map((link) => (
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
            <p className="eyebrow">Elsewhere</p>
            {SOCIAL_LINKS.map((link) => (
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
          <p>© {new Date().getFullYear()} Bernardo Fernandez</p>
          <p>
            {siteConfig.location} · {siteConfig.availability}
          </p>
        </div>
      </div>
    </footer>
  )
}
