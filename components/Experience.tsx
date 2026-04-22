"use client";

import { useState } from "react";
import { Calendar, ChevronDown, ExternalLink } from "lucide-react";
import experience from "@/data/experience";

export default function Experience() {
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});

  const toggle = (id: number) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="w-full space-y-4">
      {experience.map((item) => (
        <div key={item.id} className="border-b border-border/40 pb-3">
          <div className="flex items-start justify-between gap-3">
            <button
              type="button"
              className="min-w-0 flex-1 text-left"
              aria-expanded={Boolean(expanded[item.id])}
              aria-controls={`experience-content-${item.id}`}
              onClick={() => toggle(item.id)}
            >
              <div>
                <p className="text-[13px] font-medium leading-tight">
                  {item.url ? (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded underline-offset-4 transition hover:text-foreground hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      aria-label={`Open ${item.company} website`}
                      onClick={(event) => event.stopPropagation()}
                    >
                      <span>{item.company}</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  ) : (
                    item.company
                  )}
                </p>
                <p className="mt-0.5 text-[11px] text-muted-foreground">
                  {item.role}
                </p>
              </div>
            </button>

            <div className="shrink-0 font-mono text-[11px] text-muted-foreground/70 flex items-center gap-2">
              <Calendar className="h-3 w-3" />
              <span>
                {item.start} - {item.end}
              </span>
              <button
                type="button"
                onClick={() => toggle(item.id)}
                className="inline-flex rounded p-0.5 text-muted-foreground transition hover:text-foreground"
                aria-label={expanded[item.id] ? "Collapse experience details" : "Expand experience details"}
                aria-expanded={Boolean(expanded[item.id])}
                aria-controls={`experience-content-${item.id}`}
              >
                <ChevronDown
                  className={`h-3.5 w-3.5 transition-transform ${expanded[item.id] ? "rotate-180" : ""
                    }`}
                />
              </button>
            </div>
          </div>

          {expanded[item.id] && (
            <p
              id={`experience-content-${item.id}`}
              className="mt-2 whitespace-pre-line text-[12px] leading-relaxed text-muted-foreground"
            >
              {item.description}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
