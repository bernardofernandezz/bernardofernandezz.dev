import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google"

export const fontSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

export const fontMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const fontDisplay = Instrument_Serif({
  variable: "--font-instrument-serif",
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
})

export const fontVariables = `${fontSans.variable} ${fontMono.variable} ${fontDisplay.variable}`
