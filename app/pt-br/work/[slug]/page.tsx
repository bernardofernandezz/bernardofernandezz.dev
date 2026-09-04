import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { CaseStudyContent } from "@/components/work/case-study-page"
import { getProjectBySlug, getProjects } from "@/lib/content/projects"
import { pageMetadata } from "@/lib/i18n/metadata"

export function generateStaticParams() {
  return getProjects("pt-br").map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project = getProjectBySlug(slug, "pt-br")
  if (!project) return {}
  return pageMetadata(
    "pt-br",
    `/work/${slug}`,
    `${project.name} — ${project.tagline}`,
    project.summary,
  )
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  if (!getProjectBySlug(slug, "pt-br")) notFound()
  return <CaseStudyContent locale="pt-br" slug={slug} />
}
