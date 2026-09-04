import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/motion/reveal";
import { ArticleRow } from "@/components/article/article-row";
import { ArrowLink } from "@/components/site/arrow-link";
import { articles, getArticleBySlug } from "@/lib/content/articles";

const DATE_FORMATTER = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

interface ArticleBodyProps {
  article: NonNullable<ReturnType<typeof getArticleBySlug>>;
}

function ArticleBody({ article }: ArticleBodyProps) {
  return (
    <div className="mx-auto max-w-2xl">
      <header>
        <p className="eyebrow">
          {article.category} · {DATE_FORMATTER.format(new Date(article.date))} ·{" "}
          {article.readingTime}
        </p>
        <h1 className="mt-6 font-display text-display-md leading-tight">
          {article.title}
        </h1>
        <p className="mt-6 border-l-2 border-highlight pl-5 font-display text-xl leading-snug text-muted-foreground">
          {article.summary}
        </p>
      </header>

      <div className="mt-12 flex flex-col gap-10">
        {article.sections.map((section, index) => (
          <section key={section.heading ?? index}>
            {section.heading && (
              <h2 className="font-display text-2xl md:text-3xl">
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
  );
}

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/writing/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};

  return {
    title: article.title,
    description: article.summary,
    alternates: { canonical: `/writing/${article.slug}` },
  };
}

export default async function ArticlePage(props: PageProps<"/writing/[slug]">) {
  const { slug } = await props.params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const otherArticles = articles
    .filter((item) => item.slug !== article.slug)
    .slice(0, 2);

  return (
    <div className="container-page py-16 md:py-24">
      <Reveal>
        <ArticleBody article={article} />
      </Reveal>

      <Reveal>
        <div className="mx-auto mt-24 max-w-2xl border-t pt-10">
          <p className="font-display text-display-sm">
            Thinking about something like this?
          </p>
          <ArrowLink href="/start-a-project" className="mt-6">
            Let&rsquo;s talk about your project
          </ArrowLink>
        </div>
      </Reveal>

      <div className="mx-auto mt-20 max-w-2xl">
        <p className="eyebrow">More writing</p>
        <div className="mt-4 flex flex-col border-t">
          {otherArticles.map((item) => (
            <ArticleRow key={item.slug} article={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
