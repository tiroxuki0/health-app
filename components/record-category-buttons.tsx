"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"

interface CategoryButtonProps {
  title: string
  subtitle: string
  imageSrc: string
  href: string
}

interface RecordCategoryButtonsProps {
  categories: CategoryButtonProps[]
}

export default function RecordCategoryButtons({ categories }: RecordCategoryButtonsProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [imagesLoaded, setImagesLoaded] = useState<Record<string, boolean>>({})
  const [isMounted, setIsMounted] = useState(false)

  // Mark component as mounted after hydration
  useEffect(() => {
    setIsMounted(true)

    // Simulate loading for demo purposes - only run on client
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  // Track loaded images - only initialize on client
  useEffect(() => {
    if (!isMounted) return

    const initialLoadState: Record<string, boolean> = {}
    categories.forEach((category, index) => {
      initialLoadState[index] = false
    })
    setImagesLoaded(initialLoadState)
  }, [categories, isMounted])

  const handleImageLoad = (index: number) => {
    if (!isMounted) return

    setImagesLoaded((prev) => ({
      ...prev,
      [index]: true
    }))
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
      {/* Show skeleton state only on client-side after hydration */}
      {isMounted && isLoading ? (
        // Skeleton UI
        <>
          {[0, 1, 2].map((index) => (
            <div key={index} className="relative overflow-hidden h-[288px] bg-gray-800 animate-pulse">
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                <div className="h-7 w-36 bg-gray-700 mb-2"></div>
                <div className="h-6 w-28 bg-gray-700"></div>
              </div>
            </div>
          ))}
        </>
      ) : (
        // Actual content
        <>
          {categories.map((category, index) => (
            <Link href={category.href} key={index} className="relative overflow-hidden h-[288px] transition-transform hover:scale-[1.02] duration-300 bg-[#FFCC21] p-[24px]">
              {/* Show skeleton while image loads - only on client side */}
              {isMounted && !imagesLoaded[index] && <div className="absolute inset-0 bg-gray-800 animate-pulse"></div>}

              <Image
                src={category.imageSrc}
                alt={category.title}
                width={288}
                height={288}
                className={`w-full h-full object-cover brightness-50 ${
                  // Apply transition only after hydration
                  isMounted ? `transition-opacity duration-300 ${imagesLoaded[index] ? "opacity-100" : "opacity-0"}` : "opacity-100"
                }`}
                onLoad={() => handleImageLoad(index)}
                // Prevent browser extensions from adding data attributes
                data-no-image-search="true"
                // Static priority rendering for server
                priority={!isMounted}
              />

              <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                <h3 className="text-[25px] font-normal text-[#FFCC21] mb-2">{category.title}</h3>
                <div className="bg-[#FF963C] px-4 py-1 text-white text-sm">{category.subtitle}</div>
              </div>
            </Link>
          ))}
        </>
      )}
    </div>
  )
}
