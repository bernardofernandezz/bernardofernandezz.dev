import Link from "next/link"
import { type Article } from "@/lib/content/articles"
import { cn } from "@/lib/utils"

const DATE_FORMATTER = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
})

interface ArticleRowProps {
  article: Article
  size?: "default" | "large"
}

export function ArticleRow({ article, size = "default" }: ArticleRowProps) {
  return (
    <article className="group border-b py-8 transition-colors md:py-10">
      <Link href={`/writing/${article.slug}`} className="block">
        <p className="eyebrow">
          {article.category} · {DATE_FORMATTER.format(new Date(article.date))} ·{" "}
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
