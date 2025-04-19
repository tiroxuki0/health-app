"use client"

import { usePathname, useSearchParams } from "next/navigation"
import { useEffect } from "react"

export function NavigationEvents() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    const handleChangeStart = () => {
      document.dispatchEvent(new CustomEvent("next-route-change-start"))
    }

    const handleChangeComplete = () => {
      document.dispatchEvent(new CustomEvent("next-route-change-complete"))
    }

    // Simulate a route change start event when the component first mounts
    handleChangeStart()

    // When pathname or search params change, fire the change complete event
    const timer = setTimeout(handleChangeComplete, 300)

    return () => clearTimeout(timer)
  }, [pathname, searchParams])

  return null
}
