import type { Common } from "@/lib/i18n/dictionaries/en/common"
import type { Home } from "@/lib/i18n/dictionaries/en/home"
import type { About } from "@/lib/i18n/dictionaries/en/about"
import type { Work } from "@/lib/i18n/dictionaries/en/work"
import type { Writing } from "@/lib/i18n/dictionaries/en/writing"
import type { Briefing } from "@/lib/i18n/dictionaries/en/briefing"
import type { Now } from "@/lib/i18n/dictionaries/en/now"
import { common } from "@/lib/i18n/dictionaries/en/common"
import { home } from "@/lib/i18n/dictionaries/en/home"
import { about } from "@/lib/i18n/dictionaries/en/about"
import { work } from "@/lib/i18n/dictionaries/en/work"
import { writing } from "@/lib/i18n/dictionaries/en/writing"
import { briefing } from "@/lib/i18n/dictionaries/en/briefing"
import { now } from "@/lib/i18n/dictionaries/en/now"

export const en = { common, home, about, work, writing, briefing, now }

export type Dictionary = typeof en

export type { Common, Home, About, Work, Writing, Briefing, Now }
