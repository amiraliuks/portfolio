"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, ExternalLink, Share2, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from "lucide-react"
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

export function ImageModal({ images, currentIndex, isOpen, onClose, projectTitle }: ImageModalProps) {
  const [imageIndex, setImageIndex] = useState(currentIndex)
  const [isZoomed, setIsZoomed] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Fix hydration issues by only rendering on client
  useEffect(() => {
    setMounted(true)
    setImageIndex(currentIndex)
  }, [currentIndex])

  // Don't render anything until client-side
  if (!mounted) return null

  const currentImage = images[imageIndex]

  const nextImage = () => {
    setImageIndex((prev) => (prev + 1) % images.length)
    setIsZoomed(false)
  }

  const prevImage = () => {
    setImageIndex((prev) => (prev - 1 + images.length) % images.length)
    setIsZoomed(false)
  }

  const downloadImage = async () => {
    try {
      const response = await fetch(currentImage.src)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = `${projectTitle}-${imageIndex + 1}.jpg`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Failed to download image:", error)
      // Fallback: open image in new tab
      window.open(currentImage.src, "_blank")
    }
  }

  const shareImage = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${projectTitle} - ${currentImage.alt}`,
          text: currentImage.caption || currentImage.alt,
          url: currentImage.src,
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
    navigator.clipboard.writeText(currentImage.src).then(() => {
      // You could add a toast notification here
      console.log("Image URL copied to clipboard")
    })
  }

  const openInNewTab = () => {
    window.open(currentImage.src, "_blank")
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl w-full h-[90vh] p-0 overflow-hidden">
        <div className="relative h-full flex flex-col">
          {/* Header */}
          <DialogHeader className="p-4 border-b bg-background/95 backdrop-blur">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <DialogTitle className="text-lg font-semibold truncate">
                  {currentImage.alt || `${projectTitle} - Image ${imageIndex + 1}`}
                </DialogTitle>
                {images.length > 1 && (
                  <Badge variant="secondary" className="mt-1">
                    {imageIndex + 1} of {images.length}
                  </Badge>
                )}
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-2 ml-4">
                <Button variant="ghost" size="sm" onClick={() => setIsZoomed(!isZoomed)} className="gap-2">
                  {isZoomed ? <ZoomOut className="h-4 w-4" /> : <ZoomIn className="h-4 w-4" />}
                  {isZoomed ? "Zoom Out" : "Zoom In"}
                </Button>

                <Button variant="ghost" size="sm" onClick={downloadImage} className="gap-2">
                  <Download className="h-4 w-4" />
                  Download
                </Button>

                <Button variant="ghost" size="sm" onClick={openInNewTab} className="gap-2">
                  <ExternalLink className="h-4 w-4" />
                  Open
                </Button>

                <Button variant="ghost" size="sm" onClick={shareImage} className="gap-2">
                  <Share2 className="h-4 w-4" />
                  Share
                </Button>
              </div>
            </div>
          </DialogHeader>

          {/* Image container */}
          <div className="flex-1 relative overflow-hidden bg-black/5 dark:bg-black/20">
            <div
              className={cn(
                "relative h-full w-full transition-transform duration-300 ease-out",
                isZoomed ? "scale-150 cursor-grab active:cursor-grabbing" : "cursor-zoom-in",
              )}
            >
              <Image
                src={currentImage.src || "/placeholder.svg"}
                alt={currentImage.alt}
                fill
                className="object-contain"
                sizes="100vw"
                priority
                onClick={() => setIsZoomed(!isZoomed)}
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
                        setImageIndex(index)
                        setIsZoomed(false)
                      }}
                      className={cn(
                        "relative flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 transition-all",
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
