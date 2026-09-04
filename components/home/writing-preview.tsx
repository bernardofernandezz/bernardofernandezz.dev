import { Reveal } from "@/components/motion/reveal"
import { ArticleRow } from "@/components/article/article-row"
import { ArrowLink } from "@/components/site/arrow-link"
import { getDictionary } from "@/lib/i18n/get-dictionary"
import { localePath, type Locale } from "@/lib/i18n/config"
import { getArticles } from "@/lib/content/articles"

export function WritingPreview({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale)
  const writing = dict.home.writing

  return (
    <section className="border-t">
      <div className="container-page py-20 md:py-28">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow">{writing.eyebrow}</p>
              <h2 className="mt-4 font-display text-display-lg tracking-tight">
                {writing.title}
              </h2>
              <p className="mt-4 max-w-xl leading-relaxed text-muted-foreground">
                {writing.intro}
              </p>
            </div>
            <ArrowLink
              href={localePath(locale, "/writing")}
              className="text-base"
            >
              {writing.all}
            </ArrowLink>
          </div>
        </Reveal>

        <div className="mt-14 border-t md:mt-20">
          {getArticles(locale)
            .slice(0, 3)
            .map((article, index) => (
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
      </div>
    </section>
  )
}
