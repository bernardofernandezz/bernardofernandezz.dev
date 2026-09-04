import type { Locale } from "@/lib/i18n/config"

export interface ArticleSection {
  readonly heading?: string
  readonly paragraphs: readonly string[]
}

export interface ArticleText {
  readonly title: string
  readonly category: string
  readonly date: string
  readonly readingTime: string
  readonly summary: string
  readonly sections: readonly ArticleSection[]
}

export interface Article extends ArticleText {
  readonly slug: string
}

const EN: Record<string, ArticleText> = {
  "business-logic-out-of-react-components": {
    title: "I kept finding the same rule in three components",
    category: "Engineering",
    date: "2026-08-20",
    readingTime: "5 min read",
    summary:
      "Components are where bugs get discovered, not where rules should live. What changed when I moved decisions out of the view layer — and where I draw the line now.",
    sections: [
      {
        paragraphs: [
          "The first version of any feature puts the logic right there in the component. It's fast, it's obvious, and it works — until the second screen needs the same rule and copies it, or the rule changes and someone finds the third copy two months later.",
          "That was me for a while: a date comparison here, a currency format there, a status check in JSX. Each harmless alone. Together, they made every screen slightly different — never wrong in a way a test could catch.",
        ],
      },
      {
        heading: "Where I draw the line now",
        paragraphs: [
          "My rule is blunt: components render and capture intent; they don't decide. If a piece of code answers 'what is this UI state?', it can live in the component or a hook. If it answers 'what does the business allow?', it belongs in typed functions with no knowledge of React at all.",
          "The type system does more work than any architecture diagram here. A status as a string with six valid values is a typo waiting to happen; as a union type, half the invalid states become unwritable. The component just renders a decision already made.",
        ],
      },
      {
        heading: "What actually changed",
        paragraphs: [
          "Domain rules became testable without rendering anything. Refactors stopped being archaeology. And the components got boring — which is the goal. A boring component is one whose bugs are about rendering, not about rules nobody remembers writing.",
          "The framework didn't matter as much as I expected: the discipline is the same whether the view is React or something else. The view layer is for translation, not for policy.",
        ],
      },
    ],
  },
  "what-a-broken-endpoint-taught-me-about-architecture": {
    title: "The endpoint that passed every test and failed with real data",
    category: "Engineering",
    date: "2026-05-14",
    readingTime: "5 min read",
    summary:
      "An endpoint that passed every test and failed with real data. What it taught me about boundaries, validation and designing for the failure you haven't seen yet.",
    sections: [
      {
        paragraphs: [
          "The endpoint passed every test: correct inputs in, correct outputs out, edge cases covered, suite green. Then real traffic arrived and it failed in a way no test had imagined — not because the logic was wrong, but because the world could send things the tests never considered.",
          "The bug itself was ordinary. The interesting part was where it lived: exactly on the boundary between my system and the outside world, in the place where I had trusted the shape of the data instead of verifying it.",
        ],
      },
      {
        heading: "Tests verify what you assumed",
        paragraphs: [
          "Every test I had written confirmed the behavior for data shaped the way I expected it to arrive. Not one of them asked the more important question: what does this endpoint do with data shaped like nothing we expected?",
          "Validation at the boundary is architecture, not bureaucracy. A strict parser at the edge turns an unknown future failure into a known present rejection — the difference between a bug report and a log line.",
        ],
      },
      {
        heading: "What changed in how I build",
        paragraphs: [
          "I now treat system edges — user inputs, other services, third parties — as hostile by default, with narrow contracts that fail loudly. The interior stays elegant because it only sees data that passed the door guard.",
          "The irony is that the fix made the code smaller, not bigger. Trusting less means checking once at the boundary instead of defensively everywhere.",
        ],
      },
    ],
  },
  "how-to-build-an-mvp-without-building-a-mess": {
    title: "Building an MVP is mostly deciding what not to build",
    category: "Product",
    date: "2026-02-11",
    readingTime: "4 min read",
    summary:
      "Speed and maintainability aren't opposites. The constraints I use so a six-week MVP doesn't become a six-month rewrite.",
    sections: [
      {
        paragraphs: [
          "Every ambitious project starts with a list, and the list is honest — all of it will eventually matter. The mistake is building in parallel: everything half-done, nothing good to use, the launch date drifting while the codebase hardens.",
          "The alternative I've settled on is a loop, not a feature list: one complete path a user walks, from arrival to the moment the product earns their trust. Build the loop. Polish the loop. Ship the loop. Let real usage decide what loop two is.",
        ],
      },
      {
        heading: "Quality is the scope multiplier",
        paragraphs: [
          "A small product that feels solid beats a large one that feels approximate. Users forgive missing features; they don't forgive feeling like beta testers. Polish isn't vanity — it's the difference between spreading and stalling.",
          "The trick is directing that polish at the loop. Polishing features nobody has asked for yet is how teams feel productive while building the wrong thing.",
        ],
      },
      {
        heading: "What I cut first",
        paragraphs: [
          "Admin panels become scripts. Permissions become conventions. The second content type becomes a future feature. Every cut is a bet that the core, done well, is enough to learn from — and in my experience it almost always is.",
          "What I refuse to cut is the part users touch and the part the next developer will read. A small codebase that a stranger can navigate is worth more than a large one that only its author can change.",
        ],
      },
    ],
  },
}

const PT_BR: Record<string, ArticleText> = {
  "business-logic-out-of-react-components": {
    title: "A mesma regra, em três componentes diferentes",
    category: "Engenharia",
    date: "2026-08-20",
    readingTime: "5 min de leitura",
    summary:
      "Componentes são onde os bugs aparecem, não onde as regras deveriam morar. O que mudou quando tirei as decisões da camada de visão — e onde traço a linha hoje.",
    sections: [
      {
        paragraphs: [
          "A primeira versão de qualquer recurso coloca a lógica ali mesmo, no componente. É rápido, é óbvio e funciona — até a segunda tela precisar da mesma regra e copiar, ou a regra mudar e alguém encontrar a terceira cópia dois meses depois.",
          "Fui assim por um tempo: comparação de data aqui, formato de moeda ali, checagem de status no JSX. Cada uma inofensiva sozinha. Juntas, deixaram cada tela levemente diferente — nunca erradas de um jeito que um teste pegasse.",
        ],
      },
      {
        heading: "Onde eu traço a linha hoje",
        paragraphs: [
          "Minha regra é direta: componentes renderizam e capturam intenção; eles não decidem. Se um pedaço de código responde 'que estado de interface é esse?', pode viver no componente ou num hook. Se responde 'o que o negócio permite?', pertence a funções tipadas que não sabem nada de React.",
          "O sistema de tipos trabalha mais aqui que qualquer diagrama. Um status como string de seis valores é um typo esperando acontecer; como union type, metade dos estados inválidos vira impossível de escrever. O componente só renderiza uma decisão já tomada.",
        ],
      },
      {
        heading: "O que mudou de verdade",
        paragraphs: [
          "Regras de domínio ficaram testáveis sem renderizar nada. Refatorações deixaram de ser arqueologia. E os componentes ficaram chatos — que é o objetivo. Componente chato é aquele cujos bugs são de renderização, não de regras que ninguém lembra de ter escrito.",
          "O framework importou menos do que eu esperava: a disciplina é a mesma se a visão é React ou outra coisa. A camada de visão é para tradução, não para política.",
        ],
      },
    ],
  },
  "what-a-broken-endpoint-taught-me-about-architecture": {
    title: "O endpoint que passou em todos os testes e falhou com dados reais",
    category: "Engenharia",
    date: "2026-05-14",
    readingTime: "5 min de leitura",
    summary:
      "Um endpoint que passou em todos os testes e falhou com dados reais. O que ele me ensinou sobre fronteiras, validação e projetar para a falha que você ainda não viu.",
    sections: [
      {
        paragraphs: [
          "O endpoint passou em todos os testes: entradas corretas, saídas corretas, bordas cobertas, suíte verde. Aí chegou tráfego real e ele falhou de um jeito que nenhum teste imaginou — não porque a lógica estava errada, mas porque o mundo podia enviar coisas que os testes nunca consideraram.",
          "O bug em si era comum. O interessante era onde ele morava: exatamente na fronteira entre meu sistema e o mundo exterior, no lugar onde eu confiava na forma dos dados em vez de verificá-la.",
        ],
      },
      {
        heading: "Testes verificam o que você assumiu",
        paragraphs: [
          "Todo teste que eu tinha escrito confirmava o comportamento para dados no formato que eu esperava que chegassem. Nenhum perguntava a pergunta mais importante: o que esse endpoint faz com dados num formato que ninguém imaginou?",
          "Validação na fronteira é arquitetura, não burocracia. Um parser estrito na borda transforma falha futura desconhecida em rejeição presente e conhecida — a diferença entre um bug report e uma linha de log.",
        ],
      },
      {
        heading: "O que mudou no jeito de construir",
        paragraphs: [
          "Hoje trato as bordas do sistema — entradas de usuários, outros serviços, terceiros — como hostis por padrão, com contratos estreitos que falham alto. O interior fica elegante porque só vê dados que passaram pelo porteiro.",
          "A ironia é que a correção deixou o código menor, não maior. Confiar menos significa verificar uma vez, na fronteira, em vez de se defender por toda parte.",
        ],
      },
    ],
  },
  "how-to-build-an-mvp-without-building-a-mess": {
    title: "Construir um MVP é decidir o que não construir",
    category: "Produto",
    date: "2026-02-11",
    readingTime: "4 min de leitura",
    summary:
      "Velocidade e manutenibilidade não são opostos. As restrições que eu uso pra que um MVP de seis semanas não vire uma reescrita de seis meses.",
    sections: [
      {
        paragraphs: [
          "Todo projeto ambicioso começa com uma lista, e a lista é honesta — tudo aquilo vai importar um dia. O erro é construir em paralelo: tudo pela metade, nada bom de usar, o lançamento escorrendo enquanto o codebase endurece.",
          "A alternativa em que me estabilizei é um ciclo, não uma lista de funcionalidades: um caminho completo que o usuário percorre, da chegada até o momento em que o produto conquista a confiança dele. Constrói o ciclo. Refina o ciclo. Entrega o ciclo. Deixa o uso real decidir o que é o ciclo dois.",
        ],
      },
      {
        heading: "Qualidade é o multiplicador do escopo",
        paragraphs: [
          "Um produto pequeno que parece sólido vence um grande que parece aproximado. Usuários perdoam funcionalidade faltando; não perdoam se sentir beta tester. Polimento não é vaidade — é a diferença entre espalhar e estancar.",
          "O truque é direcionar esse polimento ao ciclo. Polir funcionalidades que ninguém pediu ainda é como times se sentem produtivos construindo a coisa errada.",
        ],
      },
      {
        heading: "O que eu corto primeiro",
        paragraphs: [
          "Painéis de admin viram scripts. Permissões viram convenções. O segundo tipo de conteúdo vira funcionalidade futura. Cada corte é uma aposta de que o núcleo, bem feito, basta para aprender — e na minha experiência quase sempre basta.",
          "O que eu me recuso a cortar é a parte que o usuário toca e a parte que o próximo desenvolvedor vai ler. Um codebase pequeno que um estranho consegue navegar vale mais que um grande que só o autor consegue mudar.",
        ],
      },
    ],
  },
}

export function getArticles(locale: Locale): readonly Article[] {
  const textBySlug = locale === "pt-br" ? PT_BR : EN
  return Object.entries(textBySlug).map(([slug, text]) => ({ slug, ...text }))
}

export function getArticleBySlug(slug: string, locale: Locale): Article | undefined {
  const text = (locale === "pt-br" ? PT_BR : EN)[slug]
  if (!text) return undefined
  return { slug, ...text }
}
