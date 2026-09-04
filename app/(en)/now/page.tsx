import type { Metadata } from "next"
import { NowPage, nowMetadata } from "@/components/now/now-page"

export const metadata: Metadata = nowMetadata("en")

export default function Page() {
  return <NowPage locale="en" />
}
