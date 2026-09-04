import { notFound } from "next/navigation"
import { Reveal } from "@/components/motion/reveal"
import { ArticleRow } from "@/components/article/article-row"
import { getDictionary } from "@/lib/i18n/get-dictionary"
import type { Locale } from "@/lib/i18n/config"
import { getArticleBySlug, getArticles } from "@/lib/content/articles"

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

export function ArticleContent({ locale, slug }: { locale: Locale; slug: string }) {
  const dict = getDictionary(locale)
  const article = getArticleBySlug(slug, locale)
  if (!article) notFound()

  const articleCta = dict.writing.article
  const otherArticles = getArticles(locale)
    .filter((item) => item.slug !== article.slug)
    .slice(0, 2)

  return (
    <div className="container-page py-16 md:py-24">
      <Reveal>
        <div className="mx-auto max-w-2xl">
          <header>
            <p className="eyebrow">
              {article.category} ·{" "}
              {FORMATTERS[locale].format(new Date(article.date))} ·{" "}
              {article.readingTime}
            </p>
            <h1 className="mt-6 font-display text-display-md tracking-tight">
              {article.title}
            </h1>
            <p className="serif-accent mt-6 border-l-2 border-highlight pl-5 text-xl leading-snug text-muted-foreground md:text-2xl">
              {article.summary}
            </p>
          </header>

          <div className="mt-12 flex flex-col gap-10">
            {article.sections.map((section, index) => (
              <section key={section.heading ?? index}>
                {section.heading && (
                  <h2 className="font-display text-2xl tracking-tight md:text-3xl">
                    <span
                      className="mr-3 font-mono text-xs text-muted-foreground"
                      aria-hidden="true"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {section.heading}
                  </h2>
                )}
                <div className="flex flex-col gap-5">
                  {section.paragraphs.map((paragraph, paragraphIndex) => (
                    <p
                      key={paragraphIndex}
                      className="text-lg leading-relaxed text-muted-foreground"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </Reveal>

      <div className="mx-auto mt-20 max-w-2xl">
        <p className="eyebrow">{articleCta.moreLabel}</p>
        <div className="mt-4 border-t">
          {otherArticles.map((item, index) => (
            <ArticleRow
              key={item.slug}
              article={item}
              locale={locale}
              index={index + 1}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
