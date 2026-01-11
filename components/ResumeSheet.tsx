"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MdOpenInFull } from "react-icons/md";
import { Download, ExternalLink } from "lucide-react";

export function ResumeSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button
          className="group cursor-pointer flex items-center gap-3 px-4 py-2.5 rounded-lg border border-border bg-muted/30 hover:bg-muted/60 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
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
          rounded-xl
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
          <SheetTitle>Amir Aliu&apos;s Resume</SheetTitle>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            {/* Open in New Tab */}
            <a
              href="/amir-aliu-resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-muted hover:bg-muted/70 text-sm text-foreground transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
              Open Resume in New Tab
            </a>

            {/* Download Button */}
            <a
              href="/amir-aliu-resume.pdf"
              download
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-muted hover:bg-muted/70 text-sm text-foreground transition-colors"
            >
              <Download className="h-4 w-4" />
              Download Resume
            </a>
          </div>
        </SheetHeader>

        <div className="w-full h-full">
          <iframe src="/amir-aliu-resume.pdf" className="w-full h-full" />
        </div>
      </SheetContent>
    </Sheet>
  );
}