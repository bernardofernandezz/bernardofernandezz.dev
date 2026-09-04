"use client"

import { useEffect, useRef } from "react"
import { Textarea } from "@/components/ui/textarea"

interface BriefingTextStepProps {
  name: string
  value?: string
  placeholder: string
  onChange: (value: string) => void
}

export function BriefingTextStep({
  name,
  value,
  placeholder,
  onChange,
}: BriefingTextStepProps) {
  const ref = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    const isFinePointer = window.matchMedia("(pointer: fine)").matches
    if (isFinePointer) ref.current?.focus()
  }, [])

  return (
    <Textarea
      ref={ref}
      name={name}
      value={value ?? ""}
      onChange={(event) => onChange(event.target.value)}
      rows={4}
      placeholder={placeholder}
      className="min-h-28 resize-none border-input text-base md:text-lg"
    />
  )
}
