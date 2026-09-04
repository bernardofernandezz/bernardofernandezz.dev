import type { Metadata } from "next"
import { HomePage } from "@/components/home/home-page"
import { getDictionary } from "@/lib/i18n/get-dictionary"
import { pageMetadata } from "@/lib/i18n/metadata"

export const metadata: Metadata = (() => {
  const dict = getDictionary("pt-br")
  return pageMetadata(
    "pt-br",
    "/",
    dict.common.siteTitle,
    dict.common.siteDescription,
  )
})()

export default function Page() {
  return <HomePage locale="pt-br" />
}
