"use client"

import { useState } from "react"
import Image from "next/image"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, ExternalLink, Share2, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface ImageData {
  src: string
  alt: string
  caption?: string
}

interface ImageModalProps {
  images: ImageData[]
  currentIndex: number
  isOpen: boolean
  onClose: () => void
  projectTitle: string
}

function resolveSafeHttpUrl(value: string) {
  try {
    const base =
      typeof window === "undefined" ? "https://example.com" : window.location.origin
    const url = new URL(value, base)
    if (url.protocol !== "http:" && url.protocol !== "https:") return null
    return url.toString()
  } catch {
    return null
  }
}

function toSafeFilename(value: string) {
  const sanitized = value
    .replace(/[^\w.-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80)

  return sanitized || "image"
}

export function ImageModal({ images, currentIndex, isOpen, onClose, projectTitle }: ImageModalProps) {
  const [offset, setOffset] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)
  const imageIndex = (currentIndex + (isOpen ? offset : 0) + images.length) % images.length

  const currentImage = images[imageIndex]
  const safeImageUrl = resolveSafeHttpUrl(currentImage.src)

  const nextImage = () => {
    setOffset((prev) => prev + 1)
    setIsZoomed(false)
  }

  const prevImage = () => {
    setOffset((prev) => prev - 1)
    setIsZoomed(false)
  }

  const downloadImage = () => {
    if (!safeImageUrl) return

    const link = document.createElement("a")
    link.href = safeImageUrl
    link.download = `${toSafeFilename(projectTitle)}-${imageIndex + 1}.jpg`
    link.rel = "noopener noreferrer"
    link.click()
  }

  const shareImage = async () => {
    if (!safeImageUrl) return

    if (navigator.share) {
      try {
        await navigator.share({
          title: `${projectTitle} - ${currentImage.alt}`,
          text: currentImage.caption || currentImage.alt,
          url: safeImageUrl,
        })
      } catch (error) {
        console.error("Failed to share:", error)
        copyToClipboard()
      }
    } else {
      copyToClipboard()
    }
  }

  const copyToClipboard = () => {
    if (!safeImageUrl) return

    navigator.clipboard.writeText(safeImageUrl).then(() => {
      // You could add a toast notification here
      console.log("Image URL copied to clipboard")
    })
  }

  const openInNewTab = () => {
    if (!safeImageUrl) return
    window.open(safeImageUrl, "_blank", "noopener,noreferrer")
  }

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setOffset(0)
      setIsZoomed(false)
      onClose()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="!w-[96vw] sm:!w-[min(96vw,1200px)] !max-w-[96vw] sm:!max-w-[min(96vw,1200px)] h-[min(92vh,860px)] gap-0 p-0 overflow-hidden"
      >
        <div className="relative h-full flex flex-col">
          {/* Header */}
          <DialogHeader className="border-b bg-background/95 p-4 backdrop-blur">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <DialogTitle className="truncate pr-1 text-base font-semibold sm:text-lg">
                  {currentImage.alt || `${projectTitle} - Image ${imageIndex + 1}`}
                </DialogTitle>
                {images.length > 1 && (
                  <Badge variant="secondary" className="mt-1">
                    {imageIndex + 1} of {images.length}
                  </Badge>
                )}
              </div>

              {/* Action buttons */}
              <div className="ml-2 flex shrink flex-wrap items-center justify-end gap-1 sm:gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsZoomed(!isZoomed)}
                  className="h-8 gap-1.5 px-2 sm:px-3"
                  title={isZoomed ? "Zoom Out" : "Zoom In"}
                >
                  {isZoomed ? <ZoomOut className="h-4 w-4" /> : <ZoomIn className="h-4 w-4" />}
                  <span className="hidden xl:inline">{isZoomed ? "Zoom Out" : "Zoom In"}</span>
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={downloadImage}
                  className="h-8 gap-1.5 px-2 sm:px-3"
                  title="Download"
                >
                  <Download className="h-4 w-4" />
                  <span className="hidden xl:inline">Download</span>
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={openInNewTab}
                  className="h-8 gap-1.5 px-2 sm:px-3"
                  title="Open in New Tab"
                >
                  <ExternalLink className="h-4 w-4" />
                  <span className="hidden xl:inline">Open</span>
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={shareImage}
                  className="h-8 gap-1.5 px-2 sm:px-3"
                  title="Share"
                >
                  <Share2 className="h-4 w-4" />
                  <span className="hidden xl:inline">Share</span>
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleOpenChange(false)}
                  className="h-8 px-2 sm:px-2.5"
                  title="Close"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </DialogHeader>

          {/* Image container */}
          <div className="relative flex-1 overflow-hidden bg-muted/30">
            <div
              className={cn(
                "relative h-full w-full transition-transform duration-300 ease-out",
                isZoomed ? "scale-125 cursor-grab active:cursor-grabbing" : "cursor-default",
              )}
            >
              <Image
                src={currentImage.src || "/placeholder.svg"}
                alt={currentImage.alt}
                fill
                className="object-contain object-top"
                sizes="100vw"
                priority
              />
            </div>

            {/* Navigation arrows */}
            {images.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background/90 backdrop-blur"
                  onClick={prevImage}
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background/90 backdrop-blur"
                  onClick={nextImage}
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
              </>
            )}
          </div>

          {/* Footer with caption and thumbnails */}
          <div className="border-t bg-background/95 backdrop-blur">
            {/* Caption */}
            {currentImage.caption && (
              <div className="p-4 border-b">
                <p className="text-sm text-muted-foreground">{currentImage.caption}</p>
              </div>
            )}

            {/* Thumbnail navigation */}
            {images.length > 1 && (
              <div className="p-4">
                <div className="flex gap-2 overflow-x-auto">
                  {images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setOffset(index - currentIndex)
                        setIsZoomed(false)
                      }}
                      className={cn(
                        "relative shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 transition-all",
                        index === imageIndex
                          ? "border-primary ring-2 ring-primary/20"
                          : "border-border hover:border-primary/50",
                      )}
                    >
                      <Image
                        src={img.src || "/placeholder.svg"}
                        alt={img.alt}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
