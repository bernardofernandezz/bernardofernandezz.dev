import { ImageResponse } from "next/og"
import { getDictionary } from "@/lib/i18n/get-dictionary"
import { siteConfig } from "@/lib/config/site"

export const alt = siteConfig.name
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = "image/png"

export default function OpengraphImage() {
  const dict = getDictionary("pt-br")

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 96px",
          backgroundColor: "#f5f4f0",
          color: "#1e1c19",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 24,
            color: "#6f6a63",
            letterSpacing: 4,
            textTransform: "uppercase",
          }}
        >
          {dict.common.brandRole.toUpperCase()}
        </div>
        <div style={{ display: "flex", fontSize: 92, marginTop: 28 }}>
          {siteConfig.name}
        </div>
        <div style={{ display: "flex", fontSize: 38, marginTop: 20, color: "#6f6a63" }}>
          {dict.home.hero.body}
        </div>
        <div
          style={{
            display: "flex",
            width: 140,
            height: 6,
            marginTop: 44,
            backgroundColor: "#3d56c8",
          }}
        />
      </div>
    ),
    size,
  )
}
