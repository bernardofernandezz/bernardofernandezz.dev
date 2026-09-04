import type { ProjectText } from "@/lib/content/projects"

export const TEXT_PT_BR: Record<string, ProjectText> = {
  ledgerline: {
    name: "Ledgerline",
    tagline: "Clareza financeira pra quem vive de freelance",
    summary:
      "Uma aplicação web que transforma faturas espalhadas, recibos e exportações bancárias num retrato claro e em tempo real das finanças de um freelancer — minha resposta a um problema que todo freelancer conhece.",
    caseStudy: {
      context:
        "Dinheiro de freelance nasce espalhado: fatura numa ferramenta, recibo no email, imposto numa planilha, o banco em outro lugar. Construí o Ledgerline em torno de outro modelo — em vez de gerenciar documentos, acompanhar o movimento do dinheiro: o que entrou, o que está comprometido, o que dá pra gastar com segurança.",
      problem:
        "A parte difícil nunca foi o dashboard. Era tornar a importação e a categorização confiáveis o suficiente pra agir em cima: CSVs de bancos com formatos diferentes, pagadores recorrentes com nomes inconsistentes, e o fato de que ferramenta financeira em que ninguém confia é pior que nenhuma.",
      role: "Desenvolvedor único — modelagem de domínio, backend, pipeline de dados e interface.",
      technicalChallenge: [
        "Cada banco exporta CSV com suas manias — datas estranhas, débitos com sinal trocado, encodings que quebram no meio do arquivo. A ingestão traduz tudo isso num modelo de transação confiável sem perder dado no caminho.",
        "A categorização precisa ser automática o suficiente pra economizar tempo e corrigível o suficiente pra continuar precisa — um motor de regras que aprende pagadores recorrentes, com cada correção manual realimentando as regras.",
        "A pergunta central do painel — 'quanto posso gastar com segurança agora' — depende de compromissos, não de saldos. Então obrigações futuras também são modeladas, não só transações passadas.",
      ],
      decisions: [
        {
          title: "Um modelo de transação único e normalizado",
          detail:
            "Todo formato é traduzido na borda, então o domínio central nunca sabe de onde veio a transação. Adicionar um banco virou mapeamento, não reescrita.",
        },
        {
          title: "Agregação no servidor, não no cliente",
          detail:
            "Os resumos mensais são calculados em views SQL; o navegador nunca carrega transações cruas, então o painel continua rápido mesmo com anos de histórico.",
        },
        {
          title: "Motor de regras com correção humana",
          detail:
            "A automação categoriza a maior parte; correções manuais realimentam as regras, e a precisão cresce com o uso.",
        },
      ],
      result: [
        "Exportações de bancos diferentes se normalizam num modelo único — estender o pipeline significa adicionar um mapeamento, nada além disso.",
        "Resumos mensais com ciência de compromissos são calculados em SQL — a interface nunca rederiva o estado financeiro.",
        "Correções alimentam o motor de regras, então a pilha de exceções pontuais encolhe em vez de crescer.",
      ],
      lesson:
        "Automatizar um domínio ensina o domínio. Cada categoria que eu errei no começo era uma falha no meu próprio entendimento de como o dinheiro circula no trabalho freelance.",
    },
  },
  meridian: {
    name: "Meridian",
    tagline: "Booking direto para hospedagens boutique",
    summary:
      "Um protótipo multi-tenant de reservas que explora o que um sistema de booking direto exige: disponibilidade como invariante, pagamentos confirmados por webhook, identidade por propriedade.",
    caseStudy: {
      context:
        "Hotéis pequenos dependem de agregadores que cobram comissões pesadas e achatam cada propriedade no mesmo template. Construí o Meridian como protótipo pra entender o que um sistema de reserva direta realmente exige — não a superfície, as garantias por baixo.",
      problem:
        "Reserva parece problema de interface e é problema de correção: disponibilidade, tarifas e confirmação de pagamento precisam permanecer consistentes sob concorrência. A pergunta interessante era como tornar overbooking e pagamento fantasma estruturalmente impossíveis, em vez de tratá-los no suporte.",
      role: "Desenvolvedor único — desenho do sistema, modelo de disponibilidade, pagamentos e fluxo de reserva.",
      technicalChallenge: [
        "Disponibilidade se verifica na hora da reserva, sob concorrência — duas pessoas disputando o último quarto precisam receber respostas verdadeiras.",
        "Pagamento e reserva vivem em dois sistemas. Manter os dois sincronizados é onde a maioria dos bookings escorrega.",
        "Cada propriedade precisa da própria identidade, mas um fork por propriedade transformaria cada correção em deploy para toda a rede.",
      ],
      decisions: [
        {
          title: "Disponibilidade como invariante central",
          detail:
            "Reservas, retenções e restrições de tarifa passam por um único serviço de disponibilidade com checagens transacionais. Overbooking parou de ser um chamado de suporte e virou algo que o banco de dados recusa.",
        },
        {
          title: "Pagamento confirmado por webhook, não por redirect",
          detail:
            "A reserva só confirma quando o webhook do Stripe chega — usuário fechando a aba depois de pagar não cria mais reserva fantasma.",
        },
        {
          title: "Identidade por propriedade sem código por propriedade",
          detail:
            "Paleta, tipografia e imagens vivem em dados de configuração, então uma propriedade nova é um passo de onboarding — o deploy nunca acontece.",
        },
      ],
      result: [
        "O serviço de disponibilidade torna reservas conflitantes impossíveis no nível do banco de dados, não por convenção.",
        "O estado do pagamento só avança por eventos de webhook — o sistema nunca exibe uma reserva confirmada que não foi paga.",
        "Propriedades são dados — o protótipo demonstrou que uma propriedade nova não exige mudança de código.",
      ],
      lesson:
        "Invariantes primeiro. Com disponibilidade e estado de pagamento guardados por desenho, todo o resto de um sistema de reservas vira problema muito mais simples.",
    },
  },
  fieldnote: {
    name: "Fieldnote",
    tagline: "Um MVP construído em seis semanas",
    summary:
      "Um exercício de produto que me impus: pegar uma ideia de um parágrafo — guias escritas pela comunidade, organizadas por bairro — e levar do conceito a um MVP funcionando em seis semanas.",
    caseStudy: {
      context:
        "Eu queria treinar a parte mais difícil de construir produtos: cortar. A premissa — guias escritas por moradores superam reviews genéricos — chegou sem especificação, sem design e sem segunda chance. Seis semanas, um loop, entregar.",
      problem:
        "O risco não era técnico. Cada funcionalidade que eu imaginava (perfis, follows, comentários, gamificação) era uma forma de fugir da pergunta real: o ciclo escrever → compartilhar → descobrir é atraente o suficiente sozinho?",
      role: "Pensamento de produto, design de interface e desenvolvimento completo.",
      technicalChallenge: [
        "Cortar pra um único ciclo significou dizer não pra uma dúzia de recursos que pareciam obrigatórios — e construir o único ciclo tão bem que ele não parecesse pequeno.",
        "A experiência de leitura carrega o produto: tipografia, mapas e imagens precisaram de polimento real, porque o teste era desejo — as pessoas querem continuar lendo? — mais que fluxo de trabalho.",
        "O conteúdo precisava ser dado estruturado no banco da aplicação — portável e consultável — não documentos num CMS de terceiros.",
      ],
      decisions: [
        {
          title: "Um ciclo principal, sem dó",
          detail:
            "Toda funcionalidade tinha que servir o ciclo escrever → compartilhar → descobrir, ou esperar. Essa restrição é o que tornou o prazo de seis semanas possível.",
        },
        {
          title: "Experiência de leitura acima de recursos de admin",
          detail:
            "O orçamento de polimento foi para as páginas de guia — tipografia, mapas, imagens — porque o risco em teste era emocional, não operacional.",
        },
        {
          title: "Modelo de conteúdo no Postgres, sem CMS",
          detail:
            "Guias são linhas estruturadas, não documentos num serviço — produto portátil, dados consultáveis, espaço pra evoluir.",
        },
      ],
      result: [
        "Um MVP funcionando em seis semanas: editor focado, páginas de guia compartilháveis, um feed mínimo de descoberta.",
        "Evidência clara a favor e contra a hipótese inicial — o MVP virou o argumento pelo que construir em seguida.",
      ],
      lesson:
        "Cortar é uma habilidade de design. O escopo que você recusa é o que faz o escopo que você entrega valer a pena.",
    },
  },
  opsboard: {
    name: "OpsBoard",
    tagline: "Coordenação em tempo real para operações de campo",
    summary:
      "Um protótipo de coordenação em tempo real para o tipo de dia de trabalho que vive num grupo de chat e três planilhas — cada tarefa num quadro vivo, atualizado por todos, reconstruível a partir de um log de eventos.",
    caseStudy: {
      context:
        "Operações de campo se coordenam pelo pior meio possível: um chat onde atribuições, atrasos e repasses de responsabilidade desaparecem da tela em horas. Construí o OpsBoard como protótipo pra responder uma pergunta — como é uma ferramenta cujo único trabalho é mostrar 'o que está acontecendo agora'?",
      problem:
        "Estado em tempo real sobre conexão móvel ruim, para pessoas usando luvas, é um problema mais duro do que parece. O quadro precisava continuar verdadeiro em redes ruins, sobreviver a desconexões e caber num dia que acontece majoritariamente no celular.",
      role: "Desenvolvedor único — arquitetura de eventos, camada de tempo real e interface.",
      technicalChallenge: [
        "Transmitir estado é fácil; manter todo cliente correto através de reconexões, períodos offline e edições simultâneas é o problema de verdade.",
        "Uso em campo significa luvas, sol e uma barra de sinal — o orçamento de interface é medido em toques, e toda mudança de estado precisa sobreviver ao atraso.",
        "Histórico importa tanto quanto o presente: 'o que aconteceu ontem' precisa ser consultável, não algo que você escava do histórico do chat.",
      ],
      decisions: [
        {
          title: "Eventos, não diffs",
          detail:
            "O servidor publica eventos de domínio; quem reconecta reconstrói a visão pelo log de eventos — sem lógica de sync no frontend.",
        },
        {
          title: "UI otimista, reconciliação autoritativa",
          detail:
            "Atualizações aplicam na hora e se reconciliam com o evento autoritativo — rápido em conexão ruim sem mentir sobre o estado.",
        },
        {
          title: "Pensado pro celular do campo",
          detail:
            "Mudança de estado em um toque e alvos grandes — a ferramenta se adapta ao ambiente em vez de brigar com ele.",
        },
      ],
      result: [
        "Todo cliente reconstrói sua visão a partir do log de eventos — reconectar depois de um período offline não exige lógica especial.",
        "Mudar de estado é um toque no celular, e o quadro reflete pra todo mundo sem refresh.",
      ],
      lesson:
        "Ferramentas internas falham socialmente antes de falharem tecnicamente. Projetar para o ambiente — luvas, sinal ruim, interrupções — pesou mais que qualquer decisão de arquitetura.",
    },
  },
  "typeset-playground": {
    name: "Typeset",
    tagline: "Um playground interativo de tipografia",
    summary:
      "Uma ferramenta no navegador pra explorar tipografia: eixos de fonte variável ao vivo, previews de escala fluida em todas as larguras de uma vez e pareamento lado a lado — construída pra afiar meu próprio olhar.",
    caseStudy: {
      context:
        "Decisões de tipografia normalmente acontecem em mockups estáticos, amostradas num tamanho e num peso. As relações que importam de verdade — como uma escala fluida se comporta em larguras reais, como duas fontes se pareiam em tamanho de parágrafo — ficam invisíveis até a implementação, quando mudar é mais caro.",
      problem:
        "Renderizar dezenas de amostras de texto vivas no DOM a framerate interativo é um problema de performance; compartilhar uma descoberta sem contas nem armazenamento é um problema de produto.",
      role: "Conceito, design e desenvolvimento.",
      technicalChallenge: [
        "Dezenas de amostras vivas por frame travam o layout no DOM — os previews precisavam segurar 60fps com fontes reais.",
        "Uma escala fluida é uma função da largura da viewport; mostrar um número esconde a curva que decide se ela funciona.",
        "A ferramenta precisava ser compartilhável com zero backend, zero contas e zero armazenamento.",
      ],
      decisions: [
        {
          title: "Canvas em vez de DOM nos previews",
          detail:
            "Renderização em canvas segura 60fps com o texto vindo de fontes reais.",
        },
        {
          title: "A URL é o botão de salvar",
          detail:
            "O estado inteiro serializa na query string — compartilhar uma descoberta não custa nada e a ferramenta não precisa de contas nem backend.",
        },
      ],
      result: [
        "Uma ferramenta que eu uso em todo projeto onde tipografia faz parte da interface.",
        "Um lembrete público de que decisões de tipografia são decisões de engenharia — têm restrições, trade-offs e comportamento mensurável.",
      ],
      lesson:
        "A intenção era criar uma referência de design. Virou uma ferramenta porque tornar as relações tipográficas mensuráveis mudou meu olhar mais do que qualquer referência mudou.",
    },
  },
  "route-schema": {
    name: "route-schema",
    tagline: "Rotas type-safe para APIs tipadas",
    summary:
      "Uma biblioteca TypeScript pequena que transforma declarações de rota em construtores de URL tipados — sem runtime, sem codegen, só inferência.",
    caseStudy: {
      context:
        "Na maioria dos codebases TypeScript, URLs são strings com o sistema de tipos desligado. Renomear um parâmetro num lugar quebra em silêncio os links de outros nove — uma classe de bug que não deveria existir numa linguagem tipada.",
      problem:
        "A solução precisava ser adotável: sem build step, sem arquivos gerados para dessincronizar, sem custo de runtime — ou os times continuariam escrevendo template strings.",
      role: "Autor e mantenedor.",
      technicalChallenge: [
        "Inferir assinatura do builder e tipos dos parâmetros de uma declaração só — sem codegen — empurra os template literal types ao limite prático.",
        "A proposta de valor é a pequenez — cada funcionalidade que adiciona peso de runtime trabalha contra a adoção.",
      ],
      decisions: [
        {
          title: "Inferência em vez de codegen",
          detail:
            "Os tipos derivam da declaração — sem build step pra manter, sem arquivo gerado pra dessincronizar.",
        },
        {
          title: "Zero runtime por padrão",
          detail:
            "Tipos trabalham em compilação; o runtime é uma função pequena de parse. API pequena, bundle pequeno, adoção fácil.",
        },
      ],
      result: [
        "Construir uma URL com parâmetro faltando ou errado é erro de compilação, não bug de produção.",
        "A biblioteca shipa com menos de 2kB e zero dependências.",
      ],
      lesson:
        "O sistema de tipos é uma ferramenta de design, e contenção é uma feature — a melhor biblioteca muitas vezes é a que se recusa a crescer.",
    },
  },
}
