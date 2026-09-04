import { Geist_Mono, Instrument_Sans, Instrument_Serif } from "next/font/google"

export const fontSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
})

export const fontMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const fontSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
})

export const fontVariables = `${fontSans.variable} ${fontMono.variable} ${fontSerif.variable}`
