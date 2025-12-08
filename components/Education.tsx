"use client";

import { useState } from "react";
import Image from "next/image";
import { Calendar, ChevronDown } from "lucide-react";
import education from "@/data/education";

export default function Education() {
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});

  const toggle = (id: number) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="w-full space-y-4">
      {education.map((item) => (
        <div
          key={item.id}
          className="border-b border-border/40 pb-3 cursor-pointer"
          onClick={() => toggle(item.id)}
        >
          <div className="flex justify-between items-start">
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
                  {item.school}
                </p>
                <p className="text-[11px] text-muted-foreground mt-0.5">
                  {item.degree}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0 text-muted-foreground/70 text-[11px] font-mono">
              <Calendar className="h-3 w-3" />
              <span>
                {item.start} – {item.end}
              </span>
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform ${expanded[item.id] ? "rotate-180" : ""
                  }`}
              />
            </div>
          </div>

          {expanded[item.id] && (
            <p className="mt-2 text-[12px] text-muted-foreground leading-relaxed">
              {item.description}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
