import type { Locale } from "@/lib/i18n/config"

export interface Fit {
  readonly goodFit: readonly string[]
  readonly notAFit: readonly string[]
}

const EN: Fit = {
  goodFit: [
    "You have an idea and need someone technical to turn it into a product.",
    "You already have a product, and the next version needs deeper engineering work.",
    "Your team has a technical problem that keeps resurfacing and needs to be solved properly once.",
    "Your operation depends on spreadsheets, group chats and manual handoffs.",
    "You want one person who can move between product decisions and implementation.",
  ],
  notAFit: [
    "You only need someone to execute pre-defined tickets without context.",
    "You want the cheapest possible implementation, not the right one.",
    "You need a large team or agency structure right away.",
  ],
}

const PT_BR: Fit = {
  goodFit: [
    "Você tem uma ideia e precisa de alguém técnico pra transformar em produto.",
    "Você já tem um produto, e a próxima versão precisa de engenharia mais profunda.",
    "Seu time tem um problema técnico que volta sempre e precisa ser resolvido direito uma vez.",
    "Sua operação depende de planilhas, grupos de chat e repasses manuais.",
    "Você quer uma pessoa só que transite entre decisões de produto e implementação.",
  ],
  notAFit: [
    "Você só precisa de alguém pra executar tickets prontos, sem contexto.",
    "Você quer a implementação mais barata, não a certa.",
    "Você precisa de um time grande ou de estrutura de agência agora.",
  ],
}

export function getFit(locale: Locale): Fit {
  return locale === "pt-br" ? PT_BR : EN
}
