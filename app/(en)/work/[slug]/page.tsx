import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { CaseStudyContent } from "@/components/work/case-study-page"
import { getProjectBySlug } from "@/lib/content/projects"
import { pageMetadata } from "@/lib/i18n/metadata"
import { getProjects } from "@/lib/content/projects"

export function generateStaticParams() {
  return getProjects("en").map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project = getProjectBySlug(slug, "en")
  if (!project) return {}
  return pageMetadata(
    "en",
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
  if (!getProjectBySlug(slug, "en")) notFound()
  return <CaseStudyContent locale="en" slug={slug} />
}
