import { ImageResponse } from "next/og";
import { siteConfig } from "@/data/site";

// Se genera en el build: sin archivos ni dominios externos.
export const alt = `${siteConfig.name} · ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
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
          background: "#0b2848",
          color: "#f6f2e9",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 108, fontWeight: 700 }}>
          Conexión&nbsp;<span style={{ color: "#4ea62b" }}>Vida</span>
        </div>
        <div style={{ marginTop: 28, fontSize: 44, color: "#b9c4d2" }}>
          Conectando a las personas con Jesús
        </div>
        <div style={{ marginTop: 56, fontSize: 32, color: "#f6f2e9" }}>
          Querétaro · Celaya · Domingos
        </div>
      </div>
    ),
    size,
  );
}
