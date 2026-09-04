"use server"

import { briefSchema } from "@/lib/briefing/schema"
import { getBriefSubmissionSink } from "@/lib/briefing/sink"

export type SubmitBriefResult =
  | { readonly ok: true }
  | { readonly ok: false; readonly error: string }

export async function submitBrief(payload: unknown): Promise<SubmitBriefResult> {
  const parsed = briefSchema.safeParse(payload)

  if (!parsed.success) {
    return {
      ok: false,
      error: "Some answers are missing or invalid. Please review them and try again.",
    }
  }

  await getBriefSubmissionSink().save(parsed.data)
  return { ok: true }
}
