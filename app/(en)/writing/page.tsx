import type { Metadata } from "next"
import { WritingIndexPage } from "@/components/article/writing-index-page"
import { getDictionary } from "@/lib/i18n/get-dictionary"
import { pageMetadata } from "@/lib/i18n/metadata"

export function generateMetadata(): Metadata {
  const dict = getDictionary("en")
  return pageMetadata(
    "en",
    "/writing",
    dict.common.nav.writing,
    dict.writing.metaDescription,
  )
}

export default function Page() {
  return <WritingIndexPage locale="en" />
}
