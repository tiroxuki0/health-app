import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Define which paths require authentication
const protectedPaths = ["/", "/my-record"]

export function middleware(request: NextRequest) {
  // For debugging - log the current cookies
  console.log("Middleware running for path:", request.nextUrl.pathname)
  console.log("Auth cookie:", request.cookies.get("auth-token")?.value)

  const { pathname } = request.nextUrl

  // Check if the path is protected
  const isProtectedPath = protectedPaths.some((path) => pathname === path || pathname.startsWith(`${path}/`))

  // If it's not a protected path, allow the request
  if (!isProtectedPath) {
    console.log("Not a protected path, allowing request")
    return NextResponse.next()
  }

  // Check for the auth token in cookies
  const authToken = request.cookies.get("auth-token")?.value

  // If there's no token and the path is protected, redirect to login
  if (!authToken && isProtectedPath) {
    console.log("No auth token found, redirecting to login")
    const url = new URL("/login", request.url)
    // Store the original URL to redirect after login
    url.searchParams.set("callbackUrl", pathname)
    return NextResponse.redirect(url)
  }

  // If there is a token, allow the request
  console.log("Auth token found, allowing request")
  return NextResponse.next()
}

// Configure middleware to run on specific paths
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api routes
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (e.g. robots.txt)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)",
  ],
}
