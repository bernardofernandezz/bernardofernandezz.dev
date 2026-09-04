import type { Metadata } from "next"
import { BriefingExperience } from "@/components/brief/briefing-experience"

export const metadata: Metadata = {
  title: "Start a project",
  description:
    "Tell me what you're trying to build. A short guided briefing — enough to understand the direction of your project before we talk.",
  alternates: { canonical: "/start-a-project" },
}

export default function StartAProjectPage() {
  return <BriefingExperience />
}
