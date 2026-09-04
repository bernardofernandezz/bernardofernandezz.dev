"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { useTheme } from "next-themes"
import { ArrowRight, Check, Command as CommandIcon } from "lucide-react"
import { getDictionary } from "@/lib/i18n/get-dictionary"
import {
  languageLabel,
  localePath,
  locales,
  switchLocalePath,
  type Locale,
} from "@/lib/i18n/config"
import { siteConfig } from "@/lib/config/site"
import { cn } from "@/lib/utils"

interface CommandItem {
  id: string
  label: string
  group: "navigate" | "actions"
  keywords?: string
  perform: () => void
}

export function CommandMenu({ locale }: { locale: Locale }) {
  const router = useRouter()
  const { setTheme, resolvedTheme } = useTheme()
  const dict = getDictionary(locale).common
  const palette = dict.commandPalette

  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [activeIndex, setActiveIndex] = useState(0)
  const [emailCopied, setEmailCopied] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

  const close = useCallback(() => {
    setOpen(false)
    setQuery("")
    setActiveIndex(0)
    triggerRef.current?.focus()
  }, [])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault()
        setOpen((value) => !value)
      }
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [])

  useEffect(() => {
    if (!open) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    const timer = window.setTimeout(() => inputRef.current?.focus(), 10)
    return () => {
      document.body.style.overflow = previousOverflow
      window.clearTimeout(timer)
    }
  }, [open])

  const toggleTheme = useCallback(() => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark")
  }, [resolvedTheme, setTheme])

  const items = useMemo<CommandItem[]>(() => {
    type NavKey = "home" | "work" | "about" | "writing" | "now" | "startProject"
    const navigate: { href: string; key: NavKey }[] = [
      { href: "/", key: "home" },
      { href: "/work", key: "work" },
      { href: "/about", key: "about" },
      { href: "/writing", key: "writing" },
      { href: "/now", key: "now" },
      { href: "/start-a-project", key: "startProject" },
    ]

    const navItems: CommandItem[] = navigate.map(({ href, key }) => ({
      id: `nav-${key}`,
      label: dict.nav[key],
      group: "navigate",
      perform: () => router.push(localePath(locale, href)),
    }))

    const actions: CommandItem[] = [
      {
        id: "action-theme",
        label: palette.actions.toggleTheme,
        group: "actions",
        keywords: "dark light theme",
        perform: toggleTheme,
      },
      {
        id: "action-copy-email",
        label: emailCopied ? palette.actions.emailCopied : palette.actions.copyEmail,
        group: "actions",
        keywords: "email contact mail",
        perform: () => {
          navigator.clipboard
            ?.writeText(siteConfig.email)
            .then(() => {
              setEmailCopied(true)
              window.setTimeout(() => setEmailCopied(false), 2000)
            })
            .catch(() => {})
        },
      },
      ...locales
        .filter((item) => item !== locale)
        .map((item) => ({
          id: `action-lang-${item}`,
          label:
            item === "pt-br"
              ? dict.language.switchToPortuguese
              : dict.language.switchToEnglish,
          group: "actions" as const,
          keywords: `language idioma ${languageLabel[item]}`,
          perform: () =>
            router.push(
              `${switchLocalePath(window.location.pathname, item)}${window.location.search}`,
            ),
        })),
    ]

    return [...navItems, ...actions]
  }, [dict, emailCopied, locale, palette.actions, router, toggleTheme])

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    if (!normalized) return items
    return items.filter((item) =>
      `${item.label} ${item.keywords ?? ""}`.toLowerCase().includes(normalized),
    )
  }, [items, query])

  // Derived clamp: when the result list shrinks (typing, or the items
  // array rebuilding) the active index never points past the end, so
  // Enter can't hit a stale index. No setState-in-effect needed.
  const safeIndex = Math.min(activeIndex, Math.max(filtered.length - 1, 0))

  useEffect(() => {
    if (!open) return
    const active = filtered[safeIndex]
    const node = listRef.current?.querySelector(`[data-item-id="${active?.id}"]`)
    node?.scrollIntoView({ block: "nearest" })
  }, [safeIndex, filtered, open])

  const runItem = useCallback(
    (item: CommandItem | undefined) => {
      if (!item) return
      close()
      item.perform()
    },
    [close],
  )

  const onInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Escape") {
      event.preventDefault()
      close()
      return
    }
    if (event.key === "ArrowDown") {
      event.preventDefault()
      setActiveIndex((index) => Math.min(index + 1, filtered.length - 1))
      return
    }
    if (event.key === "ArrowUp") {
      event.preventDefault()
      setActiveIndex((index) => Math.max(index - 1, 0))
      return
    }
    if (event.key === "Home" && filtered.length) {
      event.preventDefault()
      setActiveIndex(0)
      return
    }
    if (event.key === "End" && filtered.length) {
      event.preventDefault()
      setActiveIndex(filtered.length - 1)
      return
    }
    if (event.key === "Enter") {
      event.preventDefault()
      runItem(filtered[safeIndex])
    }
  }

  /*
   * The palette is a modal: Tab would otherwise escape into the page behind
   * it. There are only two focusable elements (input, options), so Tab simply
   * returns focus to the input.
   */
  const onDialogKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Tab") {
      event.preventDefault()
      inputRef.current?.focus()
    }
  }

  const groups: CommandItem["group"][] = ["navigate", "actions"]
  const groupLabels = {
    navigate: palette.groups.navigate,
    actions: palette.groups.actions,
  }

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-label={palette.open}
        className="flex size-8 items-center justify-center rounded-md border text-muted-foreground transition-colors hover:border-foreground/40 hover:text-foreground"
      >
        <CommandIcon className="size-3.5" aria-hidden="true" />
        <kbd className="ml-1 hidden font-mono text-[0.65rem] tracking-widest md:inline">
          K
        </kbd>
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={palette.label}
          className="fixed inset-0 z-50 flex items-start justify-center bg-foreground/25 px-4 pt-[12vh] backdrop-blur-sm"
          onKeyDown={onDialogKeyDown}
          onClick={(event) => {
            if (event.target === event.currentTarget) close()
          }}
        >
          <div className="w-full max-w-lg overflow-hidden rounded-xl border bg-popover text-popover-foreground shadow-2xl">
            <input
              ref={inputRef}
              value={query}
              onChange={(event) => {
                setQuery(event.target.value)
                setActiveIndex(0)
              }}
              onKeyDown={onInputKeyDown}
              placeholder={palette.placeholder}
              autoComplete="off"
              spellCheck={false}
              role="combobox"
              aria-expanded={filtered.length > 0}
              aria-autocomplete="list"
              aria-controls="command-menu-listbox"
              aria-activedescendant={
                filtered[safeIndex] ? `${filtered[safeIndex].id}-option` : undefined
              }
              className="h-13 w-full border-b bg-transparent px-5 text-base outline-none placeholder:text-muted-foreground"
            />
            <p aria-live="polite" className="sr-only">
              {emailCopied
                ? palette.actions.emailCopied
                : query.trim()
                  ? palette.matchCount(filtered.length)
                  : ""}
            </p>
            <div
              ref={listRef}
              id="command-menu-listbox"
              role="listbox"
              className="max-h-80 overflow-y-auto p-2"
            >
              {filtered.length === 0 && (
                <p className="px-3 py-8 text-center text-sm text-muted-foreground">
                  {palette.noResults}
                </p>
              )}
              {groups.map((group) => {
                const groupItems = filtered.filter((item) => item.group === group)
                if (!groupItems.length) return null
                return (
                  <div key={group} className="mb-1 last:mb-0">
                    <p className="eyebrow px-3 pb-1.5 pt-3">{groupLabels[group]}</p>
                    {groupItems.map((item) => {
                      const index = filtered.indexOf(item)
                      const active = index === safeIndex
                      return (
                        <button
                          key={item.id}
                          type="button"
                          id={`${item.id}-option`}
                          data-item-id={item.id}
                          role="option"
                          aria-selected={active}
                          onMouseMove={() => setActiveIndex(index)}
                          onClick={() => runItem(item)}
                          className={cn(
                            "flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors",
                            active
                              ? "bg-secondary text-secondary-foreground"
                              : "text-muted-foreground",
                          )}
                        >
                          <span>{item.label}</span>
                          {active && (
                            <ArrowRight
                              className="size-3.5 shrink-0 text-muted-foreground"
                              aria-hidden="true"
                            />
                          )}
                          {item.id === "action-copy-email" && emailCopied && (
                            <Check className="size-3.5 shrink-0 text-highlight" aria-hidden="true" />
                          )}
                        </button>
                      )
                    })}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
