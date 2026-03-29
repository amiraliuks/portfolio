"use client";

import { useState } from "react";
import { Calendar, ChevronDown } from "lucide-react";
import experience from "@/data/experience";

export default function Experience() {
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});

  const toggle = (id: number) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="w-full space-y-4">
      {experience.map((item) => (
        <div
          key={item.id}
          className="cursor-pointer border-b border-border/40 pb-3"
          onClick={() => toggle(item.id)}
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[13px] font-medium leading-tight">
                {item.role}
              </p>
              <p className="mt-0.5 text-[11px] text-muted-foreground">
                {item.company}
              </p>
            </div>

            <div className="shrink-0 font-mono text-[11px] text-muted-foreground/70 flex items-center gap-2">
              <Calendar className="h-3 w-3" />
              <span>
                {item.start} - {item.end}
              </span>
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform ${expanded[item.id] ? "rotate-180" : ""
                  }`}
              />
            </div>
          </div>

          {expanded[item.id] && (
            <p className="mt-2 whitespace-pre-line text-[12px] leading-relaxed text-muted-foreground">
              {item.description}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
