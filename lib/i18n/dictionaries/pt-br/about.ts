export const about = {
  intro: {
    plain: "Sou o Bernardo. Eu construo o software que fica atrás da",
    accent: "ideia",
  },
  metaDescription:
    "Quem é Bernardo Fernandez, como ele encara software, o que importa tecnicamente pra ele e o que está explorando agora.",
  story: [
    "Sou desenvolvedor de software, do Brasil. Construo aplicações web, ferramentas internas e os sistemas por trás delas — e cheguei até aqui do jeito direto: quis fazer coisas na web e não aceitei parar na superfície. A curiosidade sobre interfaces virou interesse em tudo que precisa funcionar para elas existirem.",
    "A parte de construir que mais me interessa é onde produto encontra engenharia: se o modelo de dados torna o próximo recurso barato ou caro; se a API falha alto ou falha calada; se a interface parece inevitável ou apenas funcional. Pra mim não são preocupações separadas — são a mesma preocupação vista de distâncias diferentes.",
    "Não tenho quinze anos de experiência e não vou fingir que tenho. O que tenho é um hábito: levar problema técnico a sério — ler a documentação, testar a suposição, ficar com o problema até ele estar resolvido de verdade, não até acabar minha vez.",
  ],
  workingWith: "O que eu uso",
  beliefs: {
    label: "No que eu acredito",
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
  exploring: "Explorando agora",
  evidence: {
    label: "Este site como evidência",
    body:
      "Este portfólio é um pequeno case de como eu trabalho: Next.js com TypeScript estrito, um briefing interativo tipado, self-hosted num VPS com nginx, systemd, Let's Encrypt e CI/CD com quality gates e health check. Sistema pequeno — construído do jeito que eu construiria o seu.",
  },
  currently: "No momento",
  currentlyBody: (availability: string, location: string) =>
    `Baseado no ${location}, trabalhando com clientes em qualquer lugar. ${availability.toLowerCase()} — o caminho mais rápido pra começar é o briefing abaixo.`,
  ctaLine: "Tem um problema que soa com alguma dessas histórias?",
  ctaButton: "Vamos conversar sobre isso",
}

export type About = typeof about
