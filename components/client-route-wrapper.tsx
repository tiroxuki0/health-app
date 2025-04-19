"use client"

import { Suspense } from "react"
import RouteLoadingIndicator from "./route-loading-indicator"
import { NavigationEvents } from "./navigation-events"

/**
 * Wrapper component that contains all client components that use useSearchParams()
 * This component is marked with "use client" and handles all client-side navigation features
 */
export function ClientRouteWrapper() {
  return (
    <Suspense fallback={null}>
      <RouteLoadingIndicator />
      <NavigationEvents />
    </Suspense>
  )
}
