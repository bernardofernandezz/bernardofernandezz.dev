import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { Reveal } from "@/components/motion/reveal"
import { ArrowLink } from "@/components/site/arrow-link"
import { getDictionary } from "@/lib/i18n/get-dictionary"
import { localePath, type Locale } from "@/lib/i18n/config"
import { getArticles } from "@/lib/content/articles"

const FORMATTERS = {
  en: new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
  }),
  "pt-br": new Intl.DateTimeFormat("pt-BR", {
    year: "numeric",
    month: "long",
  }),
} as const

/*
 * Compact reading list — no index numbers, no borders per row. Kept
 * visually distinct from the numbered rows used by SelectedWork on the
 * same page.
 */
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

        <div className="mt-14 flex flex-col gap-10 md:mt-20 md:gap-12">
          {getArticles(locale)
            .slice(0, 3)
            .map((article, index) => (
              <Reveal key={article.slug} delayMs={index * 60}>
                <Link
                  href={localePath(locale, `/writing/${article.slug}`)}
                  className="group block max-w-3xl"
                  aria-label={article.title}
                >
                  <p className="eyebrow">
                    {article.category} ·{" "}
                    {FORMATTERS[locale].format(new Date(article.date))} ·{" "}
                    {article.readingTime}
                  </p>
                  <h3 className="mt-2 inline-flex items-baseline gap-2 font-display text-display-sm tracking-tight transition-colors duration-300 group-hover:text-highlight">
                    {article.title}
                    <ArrowUpRight
                      className="size-5 shrink-0 -translate-x-1 text-highlight opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                      aria-hidden="true"
                    />
                  </h3>
                  <p className="mt-2.5 max-w-2xl leading-relaxed text-muted-foreground">
                    {article.summary}
                  </p>
                </Link>
              </Reveal>
            ))}
        </div>
      </div>
    </section>
  )
}
