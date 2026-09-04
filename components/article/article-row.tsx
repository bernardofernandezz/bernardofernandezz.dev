import Link from "next/link"
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
}

export function ArticleRow({ article, locale, size = "default" }: ArticleRowProps) {
  return (
    <article className="group border-b py-8 transition-colors md:py-10">
      <Link href={localePath(locale, `/writing/${article.slug}`)} className="block">
        <p className="eyebrow">
          {article.category} ·{" "}
          {FORMATTERS[locale].format(new Date(article.date))} ·{" "}
          {article.readingTime}
        </p>
        <h3
          className={cn(
            "mt-3 font-display transition-colors group-hover:text-highlight",
            size === "large" ? "text-display-sm" : "text-2xl md:text-3xl",
          )}
        >
          {article.title}
        </h3>
        <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
          {article.summary}
        </p>
      </Link>
    </article>
  )
}
