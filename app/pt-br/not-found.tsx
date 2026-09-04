import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { localePath } from "@/lib/i18n/config"

export default function NotFound() {
  return (
    <div className="container-page flex flex-1 flex-col items-center justify-center py-32 text-center">
      <p className="eyebrow">404</p>
      <h1 className="mt-6 font-display text-display-md">
        Essa página não existe.
      </h1>
      <p className="mt-4 max-w-md text-muted-foreground">
        O link pode estar quebrado ou a página pode ter mudado de lugar.
      </p>
      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <Button
          asChild
          className="rounded-full bg-highlight px-6 text-highlight-foreground hover:bg-highlight/90"
        >
          <Link href="/pt-br">
            Voltar pro início
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </Button>
        <Button asChild variant="outline" className="rounded-full px-6">
          <Link href={localePath("pt-br", "/work")}>Ver os projetos</Link>
        </Button>
      </div>
    </div>
  )
}
