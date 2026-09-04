import type { Metadata } from "next"
import { WorkIndexPage } from "@/components/work/work-index-page"
import { getDictionary } from "@/lib/i18n/get-dictionary"
import { pageMetadata } from "@/lib/i18n/metadata"

export function generateMetadata(): Metadata {
  const dict = getDictionary("en")
  return pageMetadata(
    "en",
    "/work",
    dict.common.nav.work,
    dict.work.metaDescription,
  )
}

export default function Page({
  searchParams,
}: {
  searchParams: Promise<{ category?: string | string[] }>
}) {
  return <WorkIndexPage locale="en" searchParams={searchParams} />
}
