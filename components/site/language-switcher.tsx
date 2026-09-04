"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { getDictionary } from "@/lib/i18n/get-dictionary"
import {
  languageLabel,
  locales,
  switchLocalePath,
  type Locale,
} from "@/lib/i18n/config"
import { cn } from "@/lib/utils"

interface LanguageSwitcherProps {
  locale: Locale
}

export function LanguageSwitcher({ locale }: LanguageSwitcherProps) {
  const pathname = usePathname()
  const router = useRouter()
  const dict = getDictionary(locale).common.language

  return (
    <nav aria-label={dict.label} className="flex items-center gap-1 font-mono text-xs">
      {locales.map((item, index) => {
        const active = item === locale
        const href = switchLocalePath(pathname, item)
        const ariaLabel =
          item === "pt-br" ? dict.switchToPortuguese : dict.switchToEnglish

        return (
          <span key={item} className="flex items-center">
            {index > 0 && (
              <span aria-hidden="true" className="px-1 text-muted-foreground/50">
                ·
              </span>
            )}
            <Link
              href={href}
              aria-current={active ? "true" : undefined}
              aria-label={ariaLabel}
              onClick={(event) => {
                const search = window.location.search
                if (!active && search) {
                  event.preventDefault()
                  router.push(href + search)
                }
              }}
              className={cn(
                "px-1 py-1 transition-colors",
                active
                  ? "text-foreground underline underline-offset-4"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {languageLabel[item]}
            </Link>
          </span>
        )
      })}
    </nav>
  )
}
