import type { Metadata } from "next"
import { BriefingExperience } from "@/components/brief/briefing-experience"
import { getDictionary } from "@/lib/i18n/get-dictionary"
import { pageMetadata } from "@/lib/i18n/metadata"

export function generateMetadata(): Metadata {
  const dict = getDictionary("en")
  return pageMetadata(
    "en",
    "/start-a-project",
    dict.common.nav.startProject,
    dict.briefing.metaDescription,
  )
}

export default function Page() {
  return <BriefingExperience locale="en" />
}
