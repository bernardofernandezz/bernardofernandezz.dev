import Link from "next/link"
import { ArrowRight } from "lucide-react"
import type { Article } from "@/lib/content/articles"
import { localePath, type Locale } from "@/lib/i18n/config"
import { cn } from "@/lib/utils"

const FORMATTERS = {
  en: new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }),
  "pt-br": new Intl.DateTimeFormat("pt-BR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }),
} as const

interface ArticleRowProps {
  article: Article
  locale: Locale
  size?: "default" | "large"
  index?: number
}

export function ArticleRow({ article, locale, size = "default", index }: ArticleRowProps) {
  return (
    <article className="group border-b">
      <Link
        href={localePath(locale, `/writing/${article.slug}`)}
        className="flex items-baseline gap-5 py-8 md:gap-8 md:py-10"
        aria-label={article.title}
      >
        {index !== undefined && (
          <span
            className="shrink-0 font-mono text-xs text-muted-foreground transition-colors duration-300 group-hover:text-highlight"
            aria-hidden="true"
          >
            {String(index).padStart(2, "0")}
          </span>
        )}
        <div className="min-w-0 flex-1">
          <p className="eyebrow">
            {article.category} ·{" "}
            {FORMATTERS[locale].format(new Date(article.date))} ·{" "}
            {article.readingTime}
          </p>
          <h3
            className={cn(
              "mt-3 max-w-3xl font-display tracking-tight transition-colors duration-300 group-hover:text-highlight",
              size === "large" ? "text-display-sm" : "text-2xl md:text-3xl",
            )}
          >
            {article.title}
          </h3>
          <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
            {article.summary}
          </p>
        </div>
        <ArrowRight
          className="size-5 shrink-0 -translate-x-1 text-highlight opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
          aria-hidden="true"
        />
      </Link>
    </article>
  )
}
