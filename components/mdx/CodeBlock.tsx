"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";

import { cn } from "@/lib/utils";

type CodeBlockProps = React.HTMLAttributes<HTMLPreElement> & {
  "data-language"?: string;
  "data-line-numbers"?: string;
};

const LANGUAGE_LABELS: Record<string, string> = {
  js: "JavaScript",
  ts: "TypeScript",
  jsx: "JSX",
  tsx: "TSX",
  py: "Python",
  sh: "Shell",
  bash: "Bash",
  ps1: "PowerShell",
  yml: "YAML",
  md: "Markdown",
};

function toLanguageLabel(value: string) {
  if (!value) return "Text";
  const key = value.toLowerCase();
  return LANGUAGE_LABELS[key] ?? value.charAt(0).toUpperCase() + value.slice(1);
}

function normalizeCopyText(value: string) {
  return value.replace(/\u00a0/g, " ").replace(/\n$/, "");
}

export function CodeBlock({
  children,
  className,
  onClick,
  "data-language": dataLanguage,
  "data-line-numbers": lineNumbersMeta,
  ...rest
}: CodeBlockProps) {
  const preRef = useRef<HTMLPreElement | null>(null);
  const [copied, setCopied] = useState(false);
  const [lineCount, setLineCount] = useState(0);

  const language = useMemo(() => {
    if (dataLanguage) return dataLanguage;
    const languageClass = className?.match(/language-([\w-]+)/)?.[1];
    return languageClass ?? "text";
  }, [className, dataLanguage]);

  const showLineNumbers = useMemo(() => {
    if (lineNumbersMeta === "true" || lineNumbersMeta === "") return true;
    if (lineNumbersMeta === "false") return false;
    return lineCount >= 6;
  }, [lineCount, lineNumbersMeta]);

  useEffect(() => {
    const pre = preRef.current;
    if (!pre) return;

    const lines = pre.querySelectorAll("[data-line]");
    if (lines.length > 0) {
      setLineCount(lines.length);
      return;
    }

    const text = pre.textContent ?? "";
    setLineCount(text ? text.split("\n").length : 0);
  }, [children]);

  const handleCopy = async () => {
    const pre = preRef.current;
    if (!pre) return;

    const raw = pre.textContent ?? "";
    if (!raw.trim()) return;

    try {
      await navigator.clipboard.writeText(normalizeCopyText(raw));
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    } catch {
      setCopied(false);
    }
  };

  const handleLineSelection = (event: React.MouseEvent<HTMLPreElement>) => {
    onClick?.(event);
    if (event.defaultPrevented) return;

    const pre = preRef.current;
    if (!pre) return;

    const target = event.target as HTMLElement | null;
    const line = target?.closest?.("[data-line]") as HTMLElement | null;

    if (!line || !pre.contains(line)) return;

    pre.querySelectorAll<HTMLElement>("[data-line][data-selected='true']").forEach((node) => {
      if (node !== line) node.removeAttribute("data-selected");
    });

    if (line.getAttribute("data-selected") === "true") {
      line.removeAttribute("data-selected");
      return;
    }

    line.setAttribute("data-selected", "true");
  };

  return (
    <div className="mdx-code-block not-prose">
      <div className="mdx-code-block-header">
        <span className="mdx-code-language">{toLanguageLabel(language)}</span>
        <button
          type="button"
          onClick={handleCopy}
          className="mdx-code-copy"
          aria-label={copied ? "Copied code" : "Copy code"}
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
          <span>{copied ? "Copied" : "Copy"}</span>
        </button>
      </div>

      <pre
        {...rest}
        ref={preRef}
        onClick={handleLineSelection}
        data-language={language}
        data-show-line-numbers={showLineNumbers ? "true" : "false"}
        className={cn("mdx-code-pre", className)}
      >
        {children}
      </pre>
    </div>
  );
}