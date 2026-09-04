import { fontVariables } from "@/lib/fonts"
import { ThemeProvider } from "@/components/theme-provider"
import { SiteNavbar } from "@/components/site/site-navbar"
import { SiteFooter } from "@/components/site/site-footer"
import { getDictionary } from "@/lib/i18n/get-dictionary"
import { htmlLang, type Locale } from "@/lib/i18n/config"

/*
 * The console note is a small wink for anyone who opens devtools —
 * it also doubles as the only hint that the command palette exists.
 */
const consoleNote =
  'console.info("%c⌘K%c works here. Curiosity rewarded. — B","font-weight:bold;color:#3d56c8","color:inherit")'

interface SiteShellProps {
  locale: Locale
  children: React.ReactNode
}

export function SiteShell({ locale, children }: SiteShellProps) {
  const dict = getDictionary(locale)

  return (
    <html
      lang={htmlLang[locale]}
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${fontVariables} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <script dangerouslySetInnerHTML={{ __html: consoleNote }} />
        <noscript>
          <style>{`.reveal { opacity: 1 !important; translate: none !important; }`}</style>
        </noscript>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-highlight focus:px-4 focus:py-2 focus:text-sm focus:text-highlight-foreground"
        >
          {dict.common.skipToContent}
        </a>
        <ThemeProvider>
          <SiteNavbar locale={locale} />
          <main
            id="main-content"
            tabIndex={-1}
            className="flex-1 focus:outline-none"
          >
            {children}
          </main>
          <SiteFooter locale={locale} />
        </ThemeProvider>
      </body>
    </html>
  )
}
