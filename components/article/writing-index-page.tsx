import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { Reveal } from "@/components/motion/reveal"
import { ArticleRow } from "@/components/article/article-row"
import { ArrowLink } from "@/components/site/arrow-link"
import { getDictionary } from "@/lib/i18n/get-dictionary"
import { localePath, type Locale } from "@/lib/i18n/config"
import { getArticles } from "@/lib/content/articles"

export function WritingIndexPage({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale)
  const index = dict.writing.index
  const articles = getArticles(locale)
  const [featured, ...rest] = articles

  return (
    <div className="container-page py-16 md:py-24">
      <Reveal>
        <p className="eyebrow">{index.eyebrow}</p>
        <h1 className="mt-6 max-w-3xl font-display text-display-lg tracking-tight">
          {index.title}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          {index.intro}
        </p>
      </Reveal>

      {featured && (
        <Reveal>
          <Link
            href={localePath(locale, `/writing/${featured.slug}`)}
            className="group mt-14 block border-t pt-10 md:mt-20"
            aria-label={featured.title}
          >
            <p className="eyebrow">
              {featured.category} · {featured.readingTime}
            </p>
            <p className="mt-4 max-w-4xl font-display text-display-md tracking-tight transition-colors duration-300 group-hover:text-highlight">
              {featured.title}
              <ArrowUpRight
                className="ml-2 inline size-8 -translate-x-1 text-highlight opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                aria-hidden="true"
              />
            </p>
            <p className="serif-accent mt-5 max-w-2xl text-xl leading-snug text-muted-foreground md:text-2xl">
              {featured.summary}
            </p>
          </Link>
        </Reveal>
      )}

      <div className="mt-14 border-t">
        {rest.map((article, position) => (
          <Reveal key={article.slug} delayMs={position * 60}>
            <ArticleRow
              article={article}
              locale={locale}
              size="large"
              index={position + 2}
            />
          </Reveal>
        ))}
      </div>

      <Reveal>
        <div className="mt-20 flex flex-col items-start gap-4 border-t pt-10 md:flex-row md:items-center md:justify-between">
          <p className="font-display text-display-sm tracking-tight">
            {index.afterLine}
          </p>
          <ArrowLink
            href={localePath(locale, "/start-a-project")}
            className="text-base"
          >
            {index.afterCta}
          </ArrowLink>
        </div>
      </Reveal>
    </div>
  )
}
