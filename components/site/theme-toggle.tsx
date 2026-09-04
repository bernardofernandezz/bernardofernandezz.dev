"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { getDictionary } from "@/lib/i18n/get-dictionary"
import type { Locale } from "@/lib/i18n/config"

export function ThemeToggle({ locale }: { locale: Locale }) {
  const { resolvedTheme, setTheme } = useTheme()
  const dict = getDictionary(locale).common

  return (
    <Button
      variant="ghost"
      size="icon"
      className="h-10 w-10 text-muted-foreground hover:text-foreground"
      aria-label={dict.toggleTheme}
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      <Sun className="size-4 dark:hidden" />
      <Moon className="hidden size-4 dark:block" />
    </Button>
  )
}
