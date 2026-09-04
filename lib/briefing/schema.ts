import { z } from "zod"
import {
  AUDIENCES,
  BUDGET_RANGES,
  PROJECT_STAGES,
  PROJECT_TYPES,
  TIMELINES,
} from "@/lib/briefing/types"

export const briefSchema = z.object({
  intent: z.enum(PROJECT_TYPES),
  intentDetail: z.string().min(1).max(2000),
  problem: z.string().min(1).max(5000),
  audience: z.enum(AUDIENCES),
  stage: z.enum(PROJECT_STAGES),
  timeline: z.enum(TIMELINES),
  budget: z.enum(BUDGET_RANGES),
  name: z.string().min(2).max(120),
  email: z.email().max(200),
})

export type BriefSubmissionPayload = z.infer<typeof briefSchema>
