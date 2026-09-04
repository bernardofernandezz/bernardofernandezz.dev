import { ImageResponse } from "next/og"
import { getDictionary } from "@/lib/i18n/get-dictionary"

export const alt = "Bernardo Fernandez — Software Developer & Builder"
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = "image/png"

export default function OpengraphImage() {
  const dict = getDictionary("en")

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
          backgroundColor: "#faf9f5",
          color: "#1c1a17",
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
          Bernardo Fernandez
        </div>
        <div style={{ display: "flex", fontSize: 38, marginTop: 20, color: "#6f6a63" }}>
          Some ideas need a landing page. Others need a real product.
        </div>
        <div
          style={{
            display: "flex",
            width: 140,
            height: 6,
            marginTop: 44,
            backgroundColor: "#b0593c",
          }}
        />
      </div>
    ),
    size,
  )
}
