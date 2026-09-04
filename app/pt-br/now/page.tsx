import type { Metadata } from "next"
import { NowPage, nowMetadata } from "@/components/now/now-page"

export const metadata: Metadata = nowMetadata("pt-br")

export default function Page() {
  return <NowPage locale="pt-br" />
}
