"use client"

import { Input } from "@/components/ui/input"

interface BriefingContactStepProps {
  name?: string
  email?: string
  onNameChange: (value: string) => void
  onEmailChange: (value: string) => void
}

export function BriefingContactStep({
  name,
  email,
  onNameChange,
  onEmailChange,
}: BriefingContactStepProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="flex flex-col gap-2">
        <label htmlFor="brief-name" className="text-sm font-medium text-muted-foreground">
          Your name
        </label>
        <Input
          id="brief-name"
          name="name"
          value={name ?? ""}
          onChange={(event) => onNameChange(event.target.value)}
          placeholder="Ana Silva"
          autoComplete="name"
          className="h-12 border-input text-base"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="brief-email" className="text-sm font-medium text-muted-foreground">
          Email
        </label>
        <Input
          id="brief-email"
          name="email"
          type="email"
          value={email ?? ""}
          onChange={(event) => onEmailChange(event.target.value)}
          placeholder="ana@company.com"
          autoComplete="email"
          className="h-12 border-input text-base"
        />
      </div>
    </div>
  )
}
