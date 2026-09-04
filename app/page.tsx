import { Hero } from "@/components/home/hero"
import { Positioning } from "@/components/home/positioning"
import { SelectedWork } from "@/components/home/selected-work"
import { Services } from "@/components/home/services"
import { ExperienceProof } from "@/components/home/experience-proof"
import { HowIWork } from "@/components/home/how-i-work"
import { WritingPreview } from "@/components/home/writing-preview"
import { ProjectCta } from "@/components/home/project-cta"

export default function Home() {
  return (
    <>
      <Hero />
      <Positioning />
      <SelectedWork />
      <Services />
      <ExperienceProof />
      <HowIWork />
      <WritingPreview />
      <ProjectCta />
    </>
  )
}
