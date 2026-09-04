import type { Metadata, Viewport } from "next"
import { fontVariables } from "@/lib/fonts"
import { ThemeProvider } from "@/components/theme-provider"
import { SiteNavbar } from "@/components/site/site-navbar"
import { SiteFooter } from "@/components/site/site-footer"
import { rootMetadata } from "@/lib/i18n/metadata"
import { getDictionary } from "@/lib/i18n/get-dictionary"
import type { Locale } from "@/lib/i18n/config"
import "../globals.css"

export const metadata: Metadata = rootMetadata("en")

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf9f5" },
    { media: "(prefers-color-scheme: dark)", color: "#131110" },
  ],
}

const locale: Locale = "en"

export default function EnglishLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${fontVariables} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <noscript>
          <style>{`.reveal { opacity: 1 !important; translate: none !important; }`}</style>
        </noscript>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-highlight focus:px-4 focus:py-2 focus:text-sm focus:text-highlight-foreground"
        >
          {getDictionary(locale).common.skipToContent}
        </a>
        <ThemeProvider>
          <SiteNavbar locale={locale} />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <SiteFooter locale={locale} />
        </ThemeProvider>
      </body>
    </html>
  )
}
