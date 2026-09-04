import type { Metadata, Viewport } from "next"
import { SiteShell } from "@/components/site/site-shell"
import { rootMetadata } from "@/lib/i18n/metadata"
import type { Locale } from "@/lib/i18n/config"
import "../globals.css"

export const metadata: Metadata = rootMetadata("pt-br")

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8f7f4" },
    { media: "(prefers-color-scheme: dark)", color: "#0f0c0a" },
  ],
}

const locale: Locale = "pt-br"

export default function PortugueseLayout({ children }: { children: React.ReactNode }) {
  return <SiteShell locale={locale}>{children}</SiteShell>
}
