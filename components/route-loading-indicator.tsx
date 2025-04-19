"use client"

import { useEffect, useState, useRef } from "react"
import { usePathname, useSearchParams } from "next/navigation"

export default function RouteLoadingIndicator() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(false)
  const prevPathRef = useRef(pathname)
  const prevSearchParamsRef = useRef(searchParams)

  useEffect(() => {
    const currentPath = pathname
    const currentSearchParams = searchParams

    if (prevPathRef.current !== currentPath || prevSearchParamsRef.current !== currentSearchParams) {
      setIsLoading(true)

      // Update refs
      prevPathRef.current = currentPath
      prevSearchParamsRef.current = currentSearchParams

      setTimeout(() => {
        setIsLoading(false)
      }, 500)
    }
  }, [pathname, searchParams])

  if (!isLoading) return null

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center justify-center bg-primary p-2 rounded-full shadow-lg animate-fadeIn">
      <div className="animate-spin rounded-full h-6 w-6 border-2 border-t-transparent border-white" />
    </div>
  )
}
