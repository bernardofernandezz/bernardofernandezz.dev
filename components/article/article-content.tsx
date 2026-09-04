import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { Reveal } from "@/components/motion/reveal"
import { ArticleJsonLd } from "@/components/seo/json-ld"
import { getDictionary } from "@/lib/i18n/get-dictionary"
import { localePath, type Locale } from "@/lib/i18n/config"
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

  const articleNav = dict.writing.article
  const siblings = getArticles(locale)
  const position = siblings.findIndex((item) => item.slug === article.slug)
  const previous = position > 0 ? siblings[position - 1] : undefined
  const next =
    position >= 0 && position < siblings.length - 1
      ? siblings[position + 1]
      : undefined

  return (
    <div className="container-page py-16 md:py-24">
      <ArticleJsonLd
        locale={locale}
        slug={article.slug}
        title={article.title}
        summary={article.summary}
        date={article.date}
      />
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

      <nav
        aria-label={article.title}
        className="mx-auto mt-20 grid max-w-2xl gap-4 border-t pt-8 sm:grid-cols-2"
      >
        {previous ? (
          <Link
            href={localePath(locale, `/writing/${previous.slug}`)}
            className="group flex flex-col gap-2 rounded-lg border p-5 transition-colors hover:border-foreground/40"
          >
            <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-muted-foreground">
              <ArrowLeft
                className="size-3.5 transition-transform duration-300 group-hover:-translate-x-0.5"
                aria-hidden="true"
              />
              {articleNav.prev}
            </span>
            <span className="font-display text-lg leading-snug tracking-tight transition-colors group-hover:text-highlight">
              {previous.title}
            </span>
          </Link>
        ) : (
          <span aria-hidden="true" className="hidden sm:block" />
        )}
        {next && (
          <Link
            href={localePath(locale, `/writing/${next.slug}`)}
            className="group flex flex-col items-end gap-2 rounded-lg border p-5 text-right transition-colors hover:border-foreground/40"
          >
            <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-muted-foreground">
              {articleNav.next}
              <ArrowRight
                className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </span>
            <span className="font-display text-lg leading-snug tracking-tight transition-colors group-hover:text-highlight">
              {next.title}
            </span>
          </Link>
        )}
      </nav>
    </div>
  )
}
