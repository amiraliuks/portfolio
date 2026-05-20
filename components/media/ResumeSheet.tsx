"use client";

import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MdOpenInFull } from "react-icons/md";
import { Download, ExternalLink } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

const resumeHref = "/amir-aliu-resume.pdf";

export function ResumeSheet() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
        if (open) {
          trackEvent("resume_sheet_open", { location: "home_hero" });
        }
      }}
    >
      <SheetTrigger asChild>
        <button
          type="button"
          className="group cursor-pointer flex items-center gap-3 px-4 py-2.5 rounded-none border border-border bg-muted/30 hover:bg-muted/60 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        >
          <code className="font-mono text-sm text-foreground">Resume</code>
          <div className="pl-3 border-l border-border/50 ml-1">
            <MdOpenInFull className="h-3.5 w-3.5 text-muted-foreground group-hover:text-foreground transition-colors" />
          </div>
        </button>
      </SheetTrigger>

      <SheetContent
        className="
          left-1/2 top-1/2
          translate-x-[-50%] translate-y-[-50%]
          w-full max-w-4xl
          h-[80vh]
          rounded-none
          border
          shadow-2xl
          bg-background
          p-0
          overflow-hidden
          animate-in
          fade-in-0
          zoom-in-95
        "
        side="bottom"
      >
        <SheetHeader className="px-4 py-3 border-b flex items-center justify-between">
          <div>
            <SheetTitle>Amir Aliu&apos;s Resume</SheetTitle>
            <SheetDescription className="sr-only">
              Embedded resume preview with links to open or download the PDF.
            </SheetDescription>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            {/* Open in New Tab */}
            <a
              href={resumeHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackEvent("resume_open_new_tab", {
                  location: "resume_sheet",
                })
              }
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-none bg-muted hover:bg-muted/70 text-sm text-foreground transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
              Open Resume in New Tab
            </a>

            {/* Download Button */}
            <a
              href={resumeHref}
              download
              onClick={() =>
                trackEvent("resume_download", {
                  location: "resume_sheet",
                })
              }
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-none bg-muted hover:bg-muted/70 text-sm text-foreground transition-colors"
            >
              <Download className="h-4 w-4" />
              Download Resume
            </a>
          </div>
        </SheetHeader>

        <div className="border-b border-border bg-muted/20 px-4 py-2 text-xs text-muted-foreground">
          If the PDF preview does not load in your browser, open the resume in a new tab or download it instead.
        </div>

        <div className="relative min-h-0 flex-1">
          <iframe
            src={resumeHref}
            title="Amir Aliu resume preview"
            loading="lazy"
            className="w-full h-full"
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}