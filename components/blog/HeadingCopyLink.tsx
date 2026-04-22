"use client";

import { useState } from "react";
import { Check, Link as LinkIcon } from "lucide-react";

interface HeadingCopyLinkProps {
  slug: string;
  label: string;
}

export function HeadingCopyLink({ slug, label }: HeadingCopyLinkProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const hash = `#${slug}`;
    const href = `${window.location.origin}${window.location.pathname}${hash}`;

    try {
      await navigator.clipboard.writeText(href);
      window.history.replaceState(null, "", hash);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    } catch {
      window.history.replaceState(null, "", hash);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="heading-copy-button"
      aria-label={`Copy link to ${label}`}
      title={copied ? "Copied" : "Copy section link"}
    >
      {copied ? <Check className="h-3.5 w-3.5" /> : <LinkIcon className="h-3.5 w-3.5" />}
    </button>
  );
}
