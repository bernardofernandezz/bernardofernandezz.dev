import { ImageResponse } from "next/og"

export const alt = "Bernardo Fernandez — Software Developer"
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = "image/png"

export default function OpengraphImage() {
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
          Software Developer · Product Builder
        </div>
        <div style={{ display: "flex", fontSize: 92, marginTop: 28 }}>
          Bernardo Fernandez
        </div>
        <div style={{ display: "flex", fontSize: 38, marginTop: 20, color: "#6f6a63" }}>
          I build software people actually use.
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
