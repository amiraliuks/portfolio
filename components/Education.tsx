"use client";

import { useState } from "react";
import Image from "next/image";
import { Calendar, ChevronDown, ExternalLink } from "lucide-react";
import education from "@/data/education";

export default function Education() {
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});

  const toggle = (id: number) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="w-full space-y-4">
      {education.map((item) => (
        <div key={item.id} className="border-b border-border/40 pb-3">
          <div className="flex justify-between items-start gap-3">
            <button
              type="button"
              className="min-w-0 flex-1 text-left"
              aria-expanded={Boolean(expanded[item.id])}
              aria-controls={`education-content-${item.id}`}
              onClick={() => toggle(item.id)}
            >
              <div className="flex items-start gap-3">
                <Image
                  src={item.logo}
                  alt={item.school}
                  width={26}
                  height={26}
                  className="rounded-md object-contain"
                />

                <div>
                  <p className="font-medium text-[13px] leading-tight">
                    {item.url ? (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded underline-offset-4 transition hover:text-foreground hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        aria-label={`Open ${item.school} website`}
                        onClick={(event) => event.stopPropagation()}
                      >
                        <span>{item.school}</span>
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    ) : (
                      item.school
                    )}
                  </p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    {item.degree}
                  </p>
                </div>
              </div>
            </button>

            <div className="flex items-center gap-2 shrink-0 text-muted-foreground/70 text-[11px] font-mono">
              <Calendar className="h-3 w-3" />
              <span>
                {item.start} - {item.end}
              </span>
              <button
                type="button"
                onClick={() => toggle(item.id)}
                className="inline-flex rounded p-0.5 text-muted-foreground transition hover:text-foreground"
                aria-label={expanded[item.id] ? "Collapse education details" : "Expand education details"}
                aria-expanded={Boolean(expanded[item.id])}
                aria-controls={`education-content-${item.id}`}
              >
                <ChevronDown
                  className={`h-3.5 w-3.5 transition-transform ${expanded[item.id] ? "rotate-180" : ""}`}
                />
              </button>
            </div>
          </div>

          {expanded[item.id] && (
            <p
              id={`education-content-${item.id}`}
              className="mt-2 whitespace-pre-line text-[12px] text-muted-foreground leading-relaxed"
            >
              {item.description}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

