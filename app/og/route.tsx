import { ImageResponse } from "next/og";

export const runtime = "edge";
export const contentType = "image/png";
export const size = {
  width: 1200,
  height: 630,
};

const DEFAULT_TITLE = "Amir Aliu - Full Stack Developer";
const DEFAULT_DESCRIPTION =
  "Cybersecurity practitioner focused on vulnerability research and CTF competitions.";
const TITLE_MAX_LENGTH = 90;
const DESCRIPTION_MAX_LENGTH = 180;

function sanitizeText(value: string | null, fallback: string, maxLength: number) {
  if (!value) return fallback;

  const clean = value
    .replace(/<[^>]*>/g, " ")
    .replace(/[\u0000-\u001F\u007F]/g, "")
    .replace(/\s+/g, " ")
    .trim();

  if (!clean) return fallback;
  if (clean.length <= maxLength) return clean;
  return `${clean.slice(0, maxLength - 3).trimEnd()}...`;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = sanitizeText(searchParams.get("title"), DEFAULT_TITLE, TITLE_MAX_LENGTH);
  const description = sanitizeText(
    searchParams.get("description"),
    DEFAULT_DESCRIPTION,
    DESCRIPTION_MAX_LENGTH
  );

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "56px 64px",
          background:
            "radial-gradient(circle at top left, rgba(59,130,246,0.18), transparent 40%), linear-gradient(135deg, #05070d 0%, #0a0f1f 50%, #05070d 100%)",
          color: "#f8fafc",
          fontFamily:
            "Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            fontSize: 22,
            opacity: 0.85,
            letterSpacing: 0.4,
          }}
        >
          <span style={{ fontWeight: 700 }}>amiraliu.vercel.app</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 64,
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: -1.5,
              maxWidth: 1020,
              color: "#ffffff",
            }}
          >
            {title}
          </div>

          <div
            style={{
              fontSize: 30,
              lineHeight: 1.4,
              color: "rgba(241,245,249,0.92)",
              maxWidth: 1040,
            }}
          >
            {description}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 20,
            color: "rgba(226,232,240,0.85)",
            borderTop: "1px solid rgba(148,163,184,0.35)",
            paddingTop: 18,
          }}
        >
          <span>Portfolio</span>
          <span>Projects - Blog - Security Research</span>
        </div>
      </div>
    ),
    size
  );
}
