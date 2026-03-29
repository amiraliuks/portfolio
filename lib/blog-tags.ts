const TAG_PRIORITY = [
  "CTF Writeups",
  "Security Research",
  "Browser Extensions",
  "Open Source",
  "Web Development",
  "General",
] as const;

const TAG_ALIASES: Record<string, string> = {
  ctf: "CTF Writeups",
  writeup: "CTF Writeups",
  "ctf writeup": "CTF Writeups",
  cybersecurity: "Security Research",
  "web security": "Security Research",
  phishing: "Security Research",
  cve: "Security Research",
  rce: "Security Research",
  "broken access control": "Security Research",
  cms: "Security Research",
  "browser extension": "Browser Extensions",
  "browser extensions": "Browser Extensions",
  chrome: "Browser Extensions",
  firefox: "Browser Extensions",
  steam: "Browser Extensions",
  "domain verification": "Browser Extensions",
  javascript: "Web Development",
  typescript: "Web Development",
  "ruby on rails": "Web Development",
  "next.js": "Web Development",
  "open source": "Open Source",
  oss: "Open Source",
  kosovo: "Open Source",
};

function inferTagBucket(value: string) {
  if (/ctf|writeup/.test(value)) return "CTF Writeups";
  if (/security|cve|rce|exploit|vulnerability|phish|forensic/.test(value)) {
    return "Security Research";
  }
  if (/extension|chrome|firefox|browser|domain verification|steam/.test(value)) {
    return "Browser Extensions";
  }
  if (/open source|oss|github/.test(value)) return "Open Source";
  if (/web|javascript|typescript|rails|next/.test(value)) return "Web Development";
  return null;
}

function priorityIndex(tag: string) {
  const index = TAG_PRIORITY.indexOf(tag as (typeof TAG_PRIORITY)[number]);
  return index === -1 ? Number.MAX_SAFE_INTEGER : index;
}

export function canonicalizeBlogTag(tag: string) {
  const normalized = tag.trim().toLowerCase();
  if (!normalized) return null;

  return TAG_ALIASES[normalized] ?? inferTagBucket(normalized) ?? null;
}

export function normalizeBlogTags(tags?: string[], maxTags = 3) {
  const canonical = Array.from(
    new Set((tags ?? []).map((tag) => canonicalizeBlogTag(tag)).filter(Boolean) as string[])
  );

  const sorted = canonical.sort((a, b) => {
    const priorityDelta = priorityIndex(a) - priorityIndex(b);
    if (priorityDelta !== 0) return priorityDelta;
    return a.localeCompare(b);
  });

  if (!sorted.length) return ["General"];
  return sorted.slice(0, maxTags);
}
