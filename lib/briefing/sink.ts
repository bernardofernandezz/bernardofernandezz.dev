import type { ProjectBrief } from "@/lib/briefing/types"

export interface BriefSubmissionSink {
  readonly name: string
  save(brief: ProjectBrief): Promise<void>
}

const logSink: BriefSubmissionSink = {
  name: "log",
  async save(brief) {
    console.info(
      `[brief] New project brief received (${new Date().toISOString()}):`,
      JSON.stringify(brief, null, 2),
    )
  },
}

/*
 * Integration seam for the briefing. Swap the returned sink to
 * deliver briefs elsewhere (Resend, CRM, Notion, database, webhook)
 * without touching the UI or the server action.
 */
export function getBriefSubmissionSink(): BriefSubmissionSink {
  return logSink
}
