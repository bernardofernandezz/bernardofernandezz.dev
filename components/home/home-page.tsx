import { Hero } from "@/components/home/hero"
import { SelectedWork } from "@/components/home/selected-work"
import { Positioning } from "@/components/home/positioning"
import { CuriousAbout } from "@/components/home/curious-about"
import { NowStrip } from "@/components/home/now-strip"
import { WritingPreview } from "@/components/home/writing-preview"
import { Door } from "@/components/home/door"
import type { Locale } from "@/lib/i18n/config"

export function HomePage({ locale }: { locale: Locale }) {
  return (
    <>
      <Hero locale={locale} />
      <SelectedWork locale={locale} />
      <Positioning locale={locale} />
      <CuriousAbout locale={locale} />
      <NowStrip locale={locale} />
      <WritingPreview locale={locale} />
      <Door locale={locale} />
    </>
  )
}
