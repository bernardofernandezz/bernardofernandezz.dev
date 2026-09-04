import { Hero } from "@/components/home/hero"
import { Positioning } from "@/components/home/positioning"
import { SelectedWork } from "@/components/home/selected-work"
import { Services } from "@/components/home/services"
import { EngineeringProof } from "@/components/home/engineering-proof"
import { HowIWork } from "@/components/home/how-i-work"
import { GoodFit } from "@/components/home/good-fit"
import { WritingPreview } from "@/components/home/writing-preview"
import { ProjectCta } from "@/components/home/project-cta"
import type { Locale } from "@/lib/i18n/config"

export function HomePage({ locale }: { locale: Locale }) {
  return (
    <>
      <Hero locale={locale} />
      <Positioning locale={locale} />
      <SelectedWork locale={locale} />
      <Services locale={locale} />
      <EngineeringProof locale={locale} />
      <HowIWork locale={locale} />
      <GoodFit locale={locale} />
      <WritingPreview locale={locale} />
      <ProjectCta locale={locale} />
    </>
  )
}
