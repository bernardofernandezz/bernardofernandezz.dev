export const about = {
  intro: {
    plain: "Sou o Bernardo. Eu construo o software que fica atrás da",
    accent: "ideia",
  },
  metaDescription:
    "Quem é Bernardo Fernandez, como ele encara software, o que importa tecnicamente pra ele e o que está explorando agora.",
  story: [
    "Sou desenvolvedor de software, do Brasil. Construo aplicações web, ferramentas internas e os sistemas por trás delas. Cheguei aqui do jeito direto: quis fazer coisas na web e não aceitei parar na superfície — e a curiosidade sobre interfaces virou interesse em tudo por baixo delas.",
    "O que mais me interessa é onde produto encontra engenharia: modelos que deixam o próximo recurso barato ou caro, APIs que falham alto ou caladas, interfaces inevitáveis em vez de apenas funcionais. A mesma preocupação, vista de distâncias diferentes.",
    "Não tenho quinze anos de experiência e não vou fingir que tenho. O que tenho é um hábito: levar problema técnico a sério — ler a documentação, testar suposições, ficar até estar resolvido de verdade.",
  ],
  storyLabel: "Como vim parar aqui",
  howLabel: "Como eu trabalho",
  workingWith: "O que eu uso pra construir",
  workingWithNote:
    "Não é uma parede de skills — só o que aparece nos projetos, agrupado pelo lugar que ocupa.",
  beliefs: {
    label: "Com o que me importo",
    items: [
      {
        title: "As partes chatas são o produto",
        detail:
          "Modelo de dados, migrations, estados de erro, telas vazias. Ninguém elogia — mas tudo que o usuário ama fica em cima delas.",
      },
      {
        title: "Escopo pequeno, qualidade de verdade",
        detail:
          "Uma coisa completa e sólida vale mais que cinco aproximadas. Cortar é competência, não concessão.",
      },
      {
        title: "Tipos são o primeiro rascunho",
        detail:
          "Antes dos componentes e das rotas, eu escrevo os tipos. Se o domínio lê bem, a implementação quase se escreve sozinha.",
      },
      {
        title: "Aprender em público",
        detail:
          "Experimentos, escrita e open source me mantêm honesto — explicar algo expõe o que eu só fingia entender.",
      },
    ],
  },
  thinking: {
    label: "Perguntas que estou pensando",
  },
  evidence: {
    label: "Por trás deste site",
    body:
      "Este portfólio é o próprio case: Next.js com TypeScript estrito, um fluxo de briefing tipado, self-hosted num VPS com nginx, systemd, Let's Encrypt e CI/CD. Sistema pequeno — construído do jeito que eu construiria o seu.",
  },
  outsideCode: {
    label: "Fora do código",
    items: [] as string[],
  },
  currently: "No momento",
  currentlyBody: (availability: string, location: string) =>
    `Vivo no ${location}. ${availability} — e sempre aberto a uma conversa sobre algo que valha a pena construir.`,
  ctaLine: "Agora você me conhece um pouco.",
  ctaButton: "Entre em contato",
}

export type About = typeof about
