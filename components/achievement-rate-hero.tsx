"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import BodyWeightChart from "@/components/charts/body-weight-chart"

interface BodyWeightData {
  date: string
  weight: number
  fat: number
}

interface AchievementRateHeroProps {
  achievementRate: number
  bodyWeightData: BodyWeightData[]
  date?: string
}

export default function AchievementRateHero({ achievementRate, bodyWeightData, date }: AchievementRateHeroProps) {
  // States for UI management
  const [isLoading, setIsLoading] = useState(true)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [clientDate, setClientDate] = useState("")

  // Use provided date or a placeholder initially to avoid hydration mismatch
  // This ensures server and client initially render the same content
  const initialDate = date || "05/21"

  // Mark component as mounted after hydration and update with client date
  useEffect(() => {
    setIsMounted(true)

    // After hydration, update the date with client-side calculation
    const today = new Date()
    const currentDate = `${String(today.getMonth() + 1).padStart(2, "0")}/${String(today.getDate()).padStart(2, "0")}`
    setClientDate(currentDate)

    // Simulate loading for demo purposes only on client-side
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  // Use the client-calculated date only after component is mounted
  const displayDate = isMounted && !date ? clientDate : initialDate

  return (
    <div className="flex flex-col md:flex-row md:grid md:grid-cols-[540px_1fr] grid-cols-1">
      {/* Left Section - Achievement Rate with Background Image */}
      <div className="relative w-full h-[316px]">
        {!isMounted && isLoading ? (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 z-10">
            {/* Skeleton for image */}
            <div className="absolute inset-0">
              <div className="animate-pulse bg-gradient-to-br from-gray-700 to-gray-800 h-full w-full"></div>
            </div>

            {/* Skeleton for achievement circle */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-[181px] h-[181px]">
                {/* Arc skeleton that mimics the progress */}
                <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="transparent"
                    stroke="#9ca3af"
                    strokeWidth="2"
                    strokeDasharray="200 283"
                    strokeDashoffset="0"
                    transform="rotate(-90 50 50)"
                    className="animate-pulse"
                  />
                </svg>

                {/* Center content skeleton */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="flex items-baseline gap-1">
                    <div className="h-4 w-14 bg-gray-600 rounded animate-pulse"></div>
                    <div className="h-6 w-10 bg-gray-600 rounded animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="circle-gradient relative w-[181px] h-[181px]">
                {/* Define filters and gradients */}
                <svg width="0" height="0">
                  <defs>
                    <filter id="enhanced-glow" x="-50%" y="-50%" width="200%" height="200%">
                      {/* Multiple blur layers for stronger effect */}
                      <feGaussianBlur stdDeviation="10" result="blur1" />
                      <feGaussianBlur stdDeviation="6" result="blur2" />
                      <feFlood floodColor="rgba(255, 150, 60, 1)" result="color" />
                      <feComposite in="color" in2="blur1" operator="in" result="glow1" />
                      <feComposite in="color" in2="blur2" operator="in" result="glow2" />
                      <feMerge>
                        <feMergeNode in="glow1" />
                        <feMergeNode in="glow2" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>
                </svg>

                {/* Shadow effect for the progress arc */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" className="absolute inset-0 w-full h-full">
                  <circle
                    stroke="rgba(255, 150, 60, 0.7)"
                    r="180"
                    cy="200"
                    cx="200"
                    strokeWidth="8"
                    fill="transparent"
                    filter="url(#enhanced-glow)"
                    strokeDasharray={`${2 * Math.PI * 180 * (achievementRate / 100)} ${2 * Math.PI * 180}`}
                    transform="rotate(-90, 200, 200)"
                    className="glow-circle"
                  />
                </svg>

                {/* Actual progress circle with gradient */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" className="absolute inset-0 w-full h-full">
                  <circle
                    stroke="#ffffff"
                    r="180"
                    cy="200"
                    cx="200"
                    strokeWidth="8"
                    fill="transparent"
                    className="circle1"
                    strokeDasharray={`${2 * Math.PI * 180 * (achievementRate / 100)} ${2 * Math.PI * 180}`}
                    transform="rotate(-90, 200, 200)"
                  />
                </svg>

                <div className="absolute inset-0 rounded-full blur-effect"></div>

                {/* Content in the middle */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="gap-[4px] flex items-end justify-center text-white">
                    <div className="leading-none text-[18px] text-shadow-orange">{displayDate}</div>
                    <div className="text-[25px] leading-none text-shadow-orange">{achievementRate}%</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Background image */}
            <div className={`absolute inset-0 transition-opacity duration-500 ${imageLoaded ? "opacity-100" : "opacity-0"}`}>
              <Image src="/images/d01.jpg" alt="Meal" width={540} height={316} className="w-full h-full object-cover" onLoad={() => setImageLoaded(true)} priority />
            </div>

            {/* Background image skeleton fallback */}
            {!imageLoaded && <div className="absolute inset-0 bg-gray-800"></div>}
          </>
        )}
      </div>

      {/* Right Section - Body Weight Chart */}
      <div className="w-full h-[316px] bg-[#2E2E2E]">
        {!isMounted && isLoading ? (
          <div className="h-full w-full p-6 bg-[#2E2E2E]">
            {/* Chart area skeleton */}
            <div className="h-full w-full relative">
              {/* Chart lines skeletons */}
              <div className="absolute bottom-0 left-0 w-full border-b border-gray-700"></div>
              <div className="absolute bottom-1/5 left-0 w-full border-b border-gray-700"></div>
              <div className="absolute bottom-1/4 left-0 w-full border-b border-gray-700"></div>
              <div className="absolute bottom-2/5 left-0 w-full border-b border-gray-700"></div>
              <div className="absolute bottom-2/4 left-0 w-full border-b border-gray-700"></div>
              <div className="absolute bottom-3/4 left-0 w-full border-b border-gray-700"></div>
            </div>
          </div>
        ) : (
          <BodyWeightChart data={bodyWeightData} />
        )}
      </div>
    </div>
  )
}
