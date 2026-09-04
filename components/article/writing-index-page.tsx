import { Reveal } from "@/components/motion/reveal"
import { ArticleRow } from "@/components/article/article-row"
import { ArrowLink } from "@/components/site/arrow-link"
import { getDictionary } from "@/lib/i18n/get-dictionary"
import { localePath, type Locale } from "@/lib/i18n/config"
import { getArticles } from "@/lib/content/articles"

export function WritingIndexPage({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale)
  const index = dict.writing.index

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

      <div className="mt-14 border-t md:mt-20">
        {getArticles(locale).map((article, index) => (
          <Reveal key={article.slug} delayMs={index * 60}>
            <ArticleRow
              article={article}
              locale={locale}
              size="large"
              index={index + 1}
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
