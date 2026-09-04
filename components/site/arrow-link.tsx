import Link from "next/link"
import { ArrowRight } from "lucide-react"
import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface ArrowLinkProps {
  href: string
  children: ReactNode
  className?: string
}

export function ArrowLink({ href, children, className }: ArrowLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-2 text-sm font-medium text-foreground underline-offset-8 transition-colors hover:text-highlight",
        className,
      )}
    >
      <span className="border-b border-border pb-1 transition-colors group-hover:border-highlight">
        {children}
      </span>
      <ArrowRight
        className="size-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1"
        aria-hidden="true"
      />
    </Link>
  )
}
