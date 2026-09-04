import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { localePath } from "@/lib/i18n/config"

export default function NotFound() {

  return (
    <div className="container-page flex flex-1 flex-col items-center justify-center py-32 text-center">
      <p className="eyebrow">404</p>
      <h1 className="mt-6 font-display text-display-md">
        This page doesn&rsquo;t exist.
      </h1>
      <p className="mt-4 max-w-md text-muted-foreground">
        The link may be broken or the page may have moved.
      </p>
      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <Button
          asChild
          className="rounded-full bg-highlight px-6 text-highlight-foreground hover:bg-highlight/90"
        >
          <Link href="/">
            Back home
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </Button>
        <Button asChild variant="outline" className="rounded-full px-6">
          <Link href={localePath("en", "/work")}>See my work</Link>
        </Button>
      </div>
    </div>
  )
}
