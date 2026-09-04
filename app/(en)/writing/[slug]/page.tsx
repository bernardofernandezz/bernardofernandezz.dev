import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { ArticleContent } from "@/components/article/article-content"
import { getArticleBySlug, getArticles } from "@/lib/content/articles"
import { pageMetadata } from "@/lib/i18n/metadata"

export function generateStaticParams() {
  return getArticles("en").map((article) => ({ slug: article.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const article = getArticleBySlug(slug, "en")
  if (!article) return {}

  return pageMetadata(
    "en",
    `/writing/${article.slug}`,
    article.title,
    article.summary,
  )
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  if (!getArticles("en").some((article) => article.slug === slug)) notFound()
  return <ArticleContent locale="en" slug={slug} />
}
