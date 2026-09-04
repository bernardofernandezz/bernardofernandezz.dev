"use client"

import { useEffect, useRef } from "react"
import { Textarea } from "@/components/ui/textarea"

interface BriefingTextStepProps {
  name: string
  value?: string
  placeholder: string
  label: string
  onChange: (value: string) => void
}

export function BriefingTextStep({
  name,
  value,
  placeholder,
  label,
  onChange,
}: BriefingTextStepProps) {
  const ref = useRef<HTMLTextAreaElement>(null)
  const fieldId = `brief-${name}`

  useEffect(() => {
    const isFinePointer = window.matchMedia("(pointer: fine)").matches
    if (isFinePointer) ref.current?.focus()
  }, [])

  return (
    <>
      <label htmlFor={fieldId} className="sr-only">
        {label}
      </label>
      <Textarea
        ref={ref}
        id={fieldId}
        name={name}
        value={value ?? ""}
        onChange={(event) => onChange(event.target.value)}
        rows={4}
        placeholder={placeholder}
        className="min-h-28 resize-none border-input text-base md:text-lg"
      />
    </>
  )
}
