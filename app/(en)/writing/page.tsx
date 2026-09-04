import type { Metadata } from "next"
import { Reveal } from "@/components/motion/reveal"
import { ArticleRow } from "@/components/article/article-row"
import { ArrowLink } from "@/components/site/arrow-link"
import { articles } from "@/lib/content/articles"

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Essays on engineering, product thinking and the craft of building software — how Bernardo Fernandez thinks about the work.",
  alternates: { canonical: "/writing" },
}

export default function WritingPage() {
  return (
    <div className="container-page py-16 md:py-24">
      <Reveal>
        <p className="eyebrow">Writing</p>
        <h1 className="mt-6 max-w-3xl font-display text-display-lg">
          Thinking, in public
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          Essays on engineering, product decisions and the craft of building
          software — the reasoning behind the work.
        </p>
      </Reveal>

      <div className="mt-14 flex flex-col border-t">
        {articles.map((article, index) => (
          <Reveal key={article.slug} delayMs={index * 60}>
            <ArticleRow article={article} size="large" />
          </Reveal>
        ))}
      </div>

      <Reveal>
        <div className="mt-20 flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
          <p className="font-display text-display-sm">
            Prefer talking to reading?
          </p>
          <ArrowLink href="/start-a-project" className="text-base">
            Start a project
          </ArrowLink>
        </div>
      </Reveal>
    </div>
  )
}
