"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Skeleton } from "@/components/ui/skeleton"

interface ImageWithSkeletonProps {
  src: string
  alt: string
  width: number
  height: number
  className?: string
  containerClassName?: string
  aspectRatio?: "square" | "video" | "portrait" | "wide" | "auto" | string
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down"
}

export default function ImageWithSkeleton({ src, alt, width, height, className, containerClassName = "", aspectRatio = "square", objectFit = "cover" }: ImageWithSkeletonProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [isMounted, setIsMounted] = useState(false)

  // Mark component as mounted after hydration
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Determine the aspect ratio class
  const getAspectRatioClass = () => {
    switch (aspectRatio) {
      case "square":
        return "aspect-square" // 1:1
      case "video":
        return "aspect-video" // 16:9
      case "portrait":
        return "aspect-[3/4]" // 3:4
      case "wide":
        return "aspect-[5/3]" // 5:3
      case "auto":
        return "" // No aspect ratio
      default:
        if (typeof aspectRatio === "string" && aspectRatio.includes("/")) {
          return `aspect-[${aspectRatio}]` // Custom ratio if properly formatted
        }
        return "aspect-square" // Default to square if invalid format
    }
  }

  // Determine object-fit class
  const getObjectFitClass = () => {
    switch (objectFit) {
      case "cover":
        return "object-cover"
      case "contain":
        return "object-contain"
      case "fill":
        return "object-fill"
      case "none":
        return "object-none"
      case "scale-down":
        return "object-scale-down"
      default:
        return "object-cover" // Default
    }
  }

  return (
    <div className={`relative ${getAspectRatioClass()} w-full overflow-hidden ${containerClassName}`}>
      {/* Only show skeleton on client-side after hydration to prevent mismatch */}
      {isMounted && isLoading && <Skeleton className="absolute inset-0 h-full w-full bg-gray-200" />}
      <Image
        src={src || "/placeholder.svg"}
        alt={alt}
        width={width}
        height={height}
        className={`w-full h-full ${getObjectFitClass()} ${
          // Only apply transition effects after hydration
          isMounted ? `transition-opacity duration-300 ${isLoading ? "opacity-0" : "opacity-100"}` : "opacity-100"
        } ${className || ""}`}
        onLoad={() => setIsLoading(false)}
        // Disable potential image search extensions
        data-no-image-search="true"
        // Force static rendering for server
        priority={!isMounted}
      />
    </div>
  )
}
