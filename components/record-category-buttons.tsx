"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"

const loadedImagesCache: Record<string, boolean> = {}
let hasInitiallyLoaded = false

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
  const [isLoading, setIsLoading] = useState(!hasInitiallyLoaded)
  const [imagesLoaded, setImagesLoaded] = useState<Record<string, boolean>>(loadedImagesCache)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)

    if (!hasInitiallyLoaded) {
      const timer = setTimeout(() => {
        setIsLoading(false)
        hasInitiallyLoaded = true
      }, 500)

      return () => clearTimeout(timer)
    }
  }, [])

  useEffect(() => {
    if (!isMounted) return

    const initialLoadState: Record<string, boolean> = { ...loadedImagesCache }
    categories.forEach((category, index) => {
      if (initialLoadState[index] === undefined) {
        initialLoadState[index] = false
      }
    })
    setImagesLoaded(initialLoadState)
  }, [categories, isMounted])

  const handleImageLoad = (index: number) => {
    if (!isMounted) return

    loadedImagesCache[index] = true
    setImagesLoaded((prev) => ({
      ...prev,
      [index]: true
    }))
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
      {/* Show skeleton state only on client-side after hydration */}
      {isMounted && isLoading ? (
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
        <>
          {categories.map((category, index) => (
            <Link href={category.href} key={index} className="relative overflow-hidden h-[288px] transition-transform hover:scale-[1.02] duration-300 bg-[#FFCC21] p-[24px]">
              {isMounted && !imagesLoaded[index] && <div className="absolute inset-0 bg-gray-800 animate-pulse"></div>}

              <Image
                src={category.imageSrc}
                alt={category.title}
                width={288}
                height={288}
                className={`w-full h-full object-cover brightness-50 grayscale ${isMounted ? `transition-opacity duration-300 ${imagesLoaded[index] ? "opacity-100" : "opacity-0"}` : "opacity-100"}`}
                onLoad={() => handleImageLoad(index)}
                data-no-image-search="true"
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
