"use server"

import { briefSchema } from "@/lib/briefing/schema"
import { getBriefSubmissionSink } from "@/lib/briefing/sink"

export type SubmitBriefResult =
  | { readonly ok: true }
  /*
   * The server only reports a machine-readable code; the client renders
   * the localized message for it, so the action stays locale-agnostic.
   */
  | { readonly ok: false; readonly error: "invalid" }

export async function submitBrief(payload: unknown): Promise<SubmitBriefResult> {
  const parsed = briefSchema.safeParse(payload)

  if (!parsed.success) {
    return { ok: false, error: "invalid" }
  }

  await getBriefSubmissionSink().save(parsed.data)
  return { ok: true }
}
