const SAFE_PROTOCOLS = new Set(["http:", "https:"]);

function getBaseOrigin(baseOrigin?: string) {
  if (baseOrigin) return baseOrigin;
  if (typeof window !== "undefined") return window.location.origin;
  return "https://example.com";
}

export function toSafeHttpUrl(value: string, baseOrigin?: string) {
  try {
    const url = new URL(value, getBaseOrigin(baseOrigin));
    if (!SAFE_PROTOCOLS.has(url.protocol)) return null;
    return url.toString();
  } catch {
    return null;
  }
}

export function toSafeHref(value: string, baseOrigin?: string) {
  const trimmed = value.trim();
  if (!trimmed) return null;

  if (trimmed.startsWith("/") || trimmed.startsWith("#") || trimmed.startsWith("?")) {
    return trimmed;
  }

  const safe = toSafeHttpUrl(trimmed, baseOrigin);
  return safe;
}

export function toSafeFilename(value: string) {
  const sanitized = value
    .replace(/[^\w.-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);

  return sanitized || "file";
}
