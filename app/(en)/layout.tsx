import type { Metadata, Viewport } from "next"
import { SiteShell } from "@/components/site/site-shell"
import { rootMetadata } from "@/lib/i18n/metadata"
import type { Locale } from "@/lib/i18n/config"
import "../globals.css"

export const metadata: Metadata = rootMetadata("en")

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8f7f4" },
    { media: "(prefers-color-scheme: dark)", color: "#0f0c0a" },
  ],
}

const locale: Locale = "en"

export default function EnglishLayout({ children }: { children: React.ReactNode }) {
  return <SiteShell locale={locale}>{children}</SiteShell>
}
