"use client";

import { useState } from "react";
import Image from "next/image";
import { Calendar, ChevronDown, ExternalLink } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import education from "@/data/education";

function parseStartYear(start: string) {
  const parsed = Number.parseInt(start, 10);
  return Number.isFinite(parsed) ? parsed : 0;
}

function DescriptionLines({ text }: { text: string }) {
  return (
    <div className="mt-2 space-y-1.5 text-[12px] leading-relaxed text-muted-foreground">
      {text.split("\n").map((line, index) => (
        <p key={`${line}-${index}`}>{line}</p>
      ))}
    </div>
  );
}

export default function Education() {
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});
  const sortedEducation = [...education].sort(
    (a, b) => parseStartYear(b.start) - parseStartYear(a.start)
  );

  const toggle = (id: number) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="w-full space-y-4">
      {sortedEducation.map((item) => (
        <div key={item.id} className="border-b border-border/40 pb-3">
          <div className="-mx-2 flex cursor-pointer justify-between items-start gap-3 px-2 py-2 transition-colors hover:bg-muted/10">
            <button
              type="button"
              className="min-w-0 flex-1 cursor-pointer text-left"
              aria-expanded={Boolean(expanded[item.id])}
              aria-controls={`education-content-${item.id}`}
              onClick={() => toggle(item.id)}
            >
              <div className="flex items-start gap-3">
                <span className="relative block h-[26px] w-[26px] shrink-0 overflow-hidden rounded-md">
                  <Image
                    src={item.logo}
                    alt={item.school}
                    fill
                    sizes="26px"
                    className="object-contain"
                  />
                </span>

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
                className="inline-flex cursor-pointer rounded p-0.5 text-muted-foreground transition hover:text-foreground"
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

          <AnimatePresence initial={false}>
            {expanded[item.id] && (
              <motion.div
                id={`education-content-${item.id}`}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.22, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <DescriptionLines text={item.description} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}