import { Reveal } from "@/components/motion/reveal"
import { ArticleRow } from "@/components/article/article-row"
import { ArrowLink } from "@/components/site/arrow-link"
import { articles } from "@/lib/content/articles"

export function WritingPreview() {
  const latestArticles = articles.slice(0, 3)

  return (
    <section className="border-t">
      <div className="container-page py-20 md:py-28">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow">Writing</p>
              <h2 className="mt-4 font-display text-display-lg">
                How I think
              </h2>
            </div>
            <ArrowLink href="/writing" className="text-base">
              All writing
            </ArrowLink>
          </div>
        </Reveal>

        <div className="mt-14 flex flex-col border-t">
          {latestArticles.map((article, index) => (
            <Reveal key={article.slug} delayMs={index * 60}>
              <ArticleRow article={article} size="large" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
