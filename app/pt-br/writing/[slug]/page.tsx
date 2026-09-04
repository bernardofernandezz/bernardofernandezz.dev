import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { ArticleContent } from "@/components/article/article-content"
import { getArticleBySlug, getArticles } from "@/lib/content/articles"
import { pageMetadata } from "@/lib/i18n/metadata"

export function generateStaticParams() {
  return getArticles("pt-br").map((article) => ({ slug: article.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const article = getArticleBySlug(slug, "pt-br")
  if (!article) return {}

  return pageMetadata(
    "pt-br",
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
  if (!getArticles("pt-br").some((article) => article.slug === slug)) notFound()
  return <ArticleContent locale="pt-br" slug={slug} />
}
