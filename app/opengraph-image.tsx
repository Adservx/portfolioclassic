import { ImageResponse } from "next/og";
import { SITE_NAME } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function loadFont(url: string): Promise<ArrayBuffer | null> {
  try {
    const res = await fetch(url, { cache: "force-cache" });
    if (!res.ok) return null;
    return await res.arrayBuffer();
  } catch {
    return null;
  }
}

export default async function OpengraphImage() {
  const [fraunces, sourceSerif, sourceSerifItalic] = await Promise.all([
    loadFont("https://cdn.jsdelivr.net/fontsource/fonts/fraunces@latest/latin-600-normal.ttf"),
    loadFont("https://cdn.jsdelivr.net/fontsource/fonts/source-serif-4@latest/latin-400-normal.ttf"),
    loadFont("https://cdn.jsdelivr.net/fontsource/fonts/source-serif-4@latest/latin-400-italic.ttf"),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#FAFAFA",
          color: "#000000",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle frame */}
        <div
          style={{
            position: "absolute",
            inset: 24,
            border: "1px solid rgba(0,0,0,0.35)",
            borderRadius: 6,
          }}
        />
        {/* Faint fleuron ornaments */}
        <div
          style={{
            position: "absolute",
            top: 78,
            left: 80,
            fontSize: 64,
            color: "rgba(0,0,0,0.16)",
          }}
        >
          •
        </div>
        <div
          style={{
            position: "absolute",
            top: 78,
            right: 80,
            fontSize: 64,
            color: "rgba(0,0,0,0.16)",
          }}
        >
          •
        </div>

        {/* Top register */}
        <div
          style={{
            display: "flex",
            fontSize: 26,
            letterSpacing: "0.55em",
            textTransform: "uppercase",
            color: "rgba(0,0,0,0.55)",
            fontFamily: sourceSerif ? "Source Serif 4" : "Georgia",
          }}
        >
          THE OFFICIAL BOOKSTORE · 2023
        </div>
        <div
          style={{
            marginTop: 10,
            width: 56,
            height: 2,
            backgroundColor: "rgba(0,0,0,0.7)",
          }}
        />

        {/* Title */}
        <div
          style={{
            display: "flex",
            marginTop: 28,
            fontSize: 150,
            letterSpacing: "0.01em",
            lineHeight: 1,
            fontFamily: fraunces ? "Fraunces" : "Georgia",
          }}
        >
          White Words
        </div>

        {/* Divider */}
        <div
          style={{
            marginTop: 18,
            display: "flex",
            alignItems: "center",
            gap: 16,
            color: "rgba(0,0,0,0.5)",
            fontSize: 28,
          }}
        >
          <div style={{ width: 120, height: 1, backgroundColor: "rgba(0,0,0,0.4)" }} />
          •
          <div style={{ width: 120, height: 1, backgroundColor: "rgba(0,0,0,0.4)" }} />
        </div>

        {/* Subtitle */}
        <div
          style={{
            marginTop: 20,
            display: "flex",
            fontSize: 38,
            fontStyle: "italic",
            textAlign: "center",
            color: "rgba(0,0,0,0.78)",
            fontFamily: sourceSerif ? "Source Serif 4" : "Georgia",
          }}
        >
          93 articles on love, spirit, science &amp; the quiet architecture of the mind
        </div>

        {/* Author register */}
        <div
          style={{
            position: "absolute",
            bottom: 60,
            left: 0,
            right: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 24,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 4,
            }}
          >
            <div
              style={{
                fontSize: 40,
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                fontFamily: fraunces ? "Fraunces" : "Georgia",
              }}
            >
              {SITE_NAME}
            </div>
            <div
              style={{
                fontSize: 22,
                letterSpacing: "0.35em",
                textTransform: "uppercase",
                color: "rgba(0,0,0,0.5)",
                fontFamily: sourceSerif ? "Source Serif 4" : "Georgia",
              }}
            >
              Author · Microbiologist · Sociologist · Teacher
            </div>
          </div>
        </div>

        {/* Bottom ISBN */}
        <div
          style={{
            position: "absolute",
            bottom: 34,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
            fontSize: 20,
            letterSpacing: "0.4em",
            color: "rgba(0,0,0,0.45)",
            fontFamily: sourceSerif ? "Source Serif 4" : "Georgia",
          }}
        >
          ISBN 978-9937-1-3757-7
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        ...(fraunces
          ? [{ name: "Fraunces", data: fraunces, style: "normal" as const, weight: 600 as const }]
          : []),
        ...(sourceSerif
          ? [{ name: "Source Serif 4", data: sourceSerif, style: "normal" as const, weight: 400 as const }]
          : []),
        ...(sourceSerifItalic
          ? [{ name: "Source Serif 4", data: sourceSerifItalic, style: "italic" as const, weight: 400 as const }]
          : []),
      ],
    }
  );
}