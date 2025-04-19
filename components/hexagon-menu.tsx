"use client"

import { useState } from "react"
import Image from "next/image"
import { useKeenSlider } from "keen-slider/react"
import { useIsMobile } from "@/hooks/use-mobile"

import "keen-slider/keen-slider.min.css"

// Define the menu items type
type HexagonMenuItem = {
  icon: string
  label: string
  alt: string
}

// Create reusable HexagonItem component
const HexagonItem = ({ icon, label, alt }: HexagonMenuItem) => (
  <div className="hexagon">
    <Image src={icon} alt={alt} width={56} height={56} className="mb-2" />
    <span className="text-xl">{label}</span>
  </div>
)

export default function HexagonMenu() {
  const isMobile = useIsMobile()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [loaded, setLoaded] = useState(false)

  const [sliderRef, instanceRef] = useKeenSlider({
    slides: {
      perView: "auto",
      spacing: 16
    },
    breakpoints: {
      "(min-width: 768px)": {
        disabled: true
      }
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel)
    },
    created() {
      setLoaded(true)
    }
  })

  // Define menu items
  const menuItems: HexagonMenuItem[] = [
    { icon: "/images/icons/ic-knife.svg", label: "Morning", alt: "Morning" },
    { icon: "/images/icons/ic-knife.svg", label: "Lunch", alt: "Lunch" },
    { icon: "/images/icons/ic-knife.svg", label: "Dinner", alt: "Dinner" },
    { icon: "/images/icons/ic-cup.svg", label: "Snack", alt: "Snack" }
  ]

  if (isMobile) {
    return (
      <div className="mb-8">
        <div className="relative">
          <div ref={sliderRef} className="keen-slider">
            {menuItems.map((item, index) => (
              <div key={index} className="keen-slider__slide" style={{ minWidth: 145, maxWidth: 145 }}>
                <HexagonItem {...item} />
              </div>
            ))}
          </div>

          {loaded && instanceRef.current && (
            <div className="flex justify-center mt-4">
              {[...Array(menuItems.length)].map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    instanceRef.current?.moveToIdx(idx)
                  }}
                  className={`mx-1 rounded-full w-3 h-3 transition-colors ${currentSlide === idx ? "bg-[#ff963c]" : "bg-gray-300"}`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-wrap justify-center gap-8 mb-8">
      {menuItems.map((item, index) => (
        <HexagonItem key={index} {...item} />
      ))}
    </div>
  )
}
