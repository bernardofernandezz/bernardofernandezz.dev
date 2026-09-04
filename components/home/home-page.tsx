import { Hero } from "@/components/home/hero"
import { NowStrip } from "@/components/home/now-strip"
import { SelectedWork } from "@/components/home/selected-work"
import { Positioning } from "@/components/home/positioning"
import { CuriousAbout } from "@/components/home/curious-about"
import { AboutTeaser } from "@/components/home/about-teaser"
import { WritingPreview } from "@/components/home/writing-preview"
import { Door } from "@/components/home/door"
import type { Locale } from "@/lib/i18n/config"

/*
 * Person → Currently → Things built → How I think → Curiosity →
 * About → Notes → Business door.
 */
export function HomePage({ locale }: { locale: Locale }) {
  return (
    <>
      <Hero locale={locale} />
      <NowStrip locale={locale} />
      <SelectedWork locale={locale} />
      <Positioning locale={locale} />
      <CuriousAbout locale={locale} />
      <AboutTeaser locale={locale} />
      <WritingPreview locale={locale} />
      <Door locale={locale} />
    </>
  )
}
