import type { Metadata } from "next"
import { AboutPage } from "@/components/about/about-page"
import { getDictionary } from "@/lib/i18n/get-dictionary"
import { pageMetadata } from "@/lib/i18n/metadata"

export function generateMetadata(): Metadata {
  const dict = getDictionary("pt-br")
  return pageMetadata(
    "pt-br",
    "/about",
    dict.common.nav.about,
    dict.about.metaDescription,
  )
}

export default function Page() {
  return <AboutPage locale="pt-br" />
}
