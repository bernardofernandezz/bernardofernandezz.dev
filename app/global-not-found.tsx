import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { fontVariables } from "@/lib/fonts"
import "./globals.css"

export const metadata = {
  title: "404 — Bernardo Fernandez",
  description:
    "This page does not exist. / Esta página não existe.",
}

/*
 * The app has two root layouts (EN and PT-BR), so unmatched URLs have no
 * composed 404 to fall back on. This page bypasses layout rendering and
 * therefore renders its own full document — minimal styles, system font
 * fallback, theme applied from the OS preference.
 */
export default function GlobalNotFound() {
  return (
    <html lang="en" className={fontVariables}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{if(matchMedia('(prefers-color-scheme: dark)').matches)document.documentElement.classList.add('dark')}catch(e){}",
          }}
        />
      </head>
      <body className="flex min-h-screen flex-col bg-background font-sans text-foreground antialiased">
        <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col items-center justify-center px-5 py-32 text-center">
          <p className="font-mono text-xs tracking-[0.18em] text-muted-foreground uppercase">
            404
          </p>
          <h1 className="mt-6 text-4xl font-medium tracking-tight">
            This page wandered{" "}
            <span className="font-serif italic">off</span>.
          </h1>
          <p className="mt-4 text-muted-foreground">
            O link pode estar quebrado, ou a página mudou de lugar.
          </p>
          <div className="mt-10 flex gap-4">
            <Button asChild className="h-11 rounded-full px-6 text-base">
              <Link href="/">
                Back home
                <ArrowRight
                  className="size-4 transition-transform duration-300 group-hover/button:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-11 rounded-full px-6 text-base">
              <Link href="/pt-br">Voltar pro início</Link>
            </Button>
          </div>
        </div>
      </body>
    </html>
  )
}
