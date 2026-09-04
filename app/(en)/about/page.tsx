import type { Metadata } from "next"
import { AboutPage } from "@/components/about/about-page"
import { getDictionary } from "@/lib/i18n/get-dictionary"
import { pageMetadata } from "@/lib/i18n/metadata"

export function generateMetadata(): Metadata {
  const dict = getDictionary("en")
  return pageMetadata("en", "/about", dict.common.nav.about, dict.about.story[0])
}

export default function Page() {
  return <AboutPage locale="en" />
}
