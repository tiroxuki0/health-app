import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

// Mock user database (same as in login route)
const users = [
  {
    id: 1,
    email: "user@example.com",
    password: "password123",
    name: "Test User"
  },
  {
    id: 2,
    email: "admin@example.com",
    password: "admin123",
    name: "Admin User"
  }
]

export async function GET(request: NextRequest) {
  try {
    // Get the auth token from cookies
    const cookiesStore = await cookies()
    const authToken = cookiesStore.get("auth-token")?.value

    if (!authToken) {
      return NextResponse.json({ authenticated: false })
    }

    // In a real app, you would verify the JWT token here
    // For this mock implementation, we'll extract the user ID from the token
    const tokenParts = authToken.split("-")
    if (tokenParts.length < 4) {
      return NextResponse.json({ authenticated: false })
    }

    const userId = Number.parseInt(tokenParts[3], 10)

    // Find the user
    const user = users.find((u) => u.id === userId)

    if (!user) {
      return NextResponse.json({ authenticated: false })
    }

    return NextResponse.json({
      authenticated: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      }
    })
  } catch (error) {
    console.error("Error checking session:", error)
    return NextResponse.json({ authenticated: false }, { status: 500 })
  }
}
