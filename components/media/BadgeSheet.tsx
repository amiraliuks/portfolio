"use client";

import Image from "next/image";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface BadgeSheetProps {
  title: string;
  image: string;
}

export function BadgeSheet({ title, image }: BadgeSheetProps) {
  return (
    <Sheet>
      <TooltipProvider delayDuration={80}>
        <Tooltip>
          <TooltipTrigger asChild>
            <SheetTrigger asChild>
              <button className="relative h-14 w-14 cursor-pointer overflow-hidden rounded-md">
                <Image
                  src={image}
                  alt={`${title} badge`}
                  fill
                  sizes="56px"
                  className="object-contain transition-transform duration-300 ease-out hover:scale-110"
                />
              </button>
            </SheetTrigger>
          </TooltipTrigger>

          <TooltipContent side="top" className="text-xs py-1 px-2">
            Click to open
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <SheetContent
        className="
          left-1/2 top-1/2
          translate-x-[-50%] translate-y-[-50%]
          w-full max-w-md
          h-auto
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
        <SheetHeader className="px-4 py-3 border-b">
          <SheetTitle>{title} - Badge</SheetTitle>
          <SheetDescription className="sr-only">
            Enlarged badge image for {title}.
          </SheetDescription>
        </SheetHeader>

        <div className="w-full p-4 flex justify-center">
          <div className="relative aspect-square w-full max-w-[420px] overflow-hidden rounded-lg shadow-md">
            <Image
              src={image}
              alt={title}
              fill
              sizes="(min-width: 768px) 420px, 90vw"
              className="object-contain"
            />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}