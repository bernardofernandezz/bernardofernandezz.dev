import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { localePath } from "@/lib/i18n/config"

export default function NotFound() {
  return (
    <div className="container-page flex flex-1 flex-col items-center justify-center py-32 text-center">
      <p className="eyebrow">404</p>
      <h1 className="mt-6 font-display text-display-md">
        This page wandered{" "}
        <span className="serif-accent">off</span>.
      </h1>
      <p className="mt-4 max-w-md text-muted-foreground">
        The link may be broken, or the page moved and didn&rsquo;t leave a note.
      </p>
      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <Button asChild className="h-11 rounded-full px-6 text-base">
          <Link href="/">
            Back home
            <ArrowRight
              className="size-4 transition-transform duration-300 group-hover/button:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        </Button>
        <Button asChild variant="outline" className="h-11 rounded-full px-6 text-base">
          <Link href={localePath("en", "/work")}>See my work</Link>
        </Button>
      </div>
    </div>
  )
}
