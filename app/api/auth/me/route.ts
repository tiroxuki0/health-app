import { type NextRequest, NextResponse } from "next/server"

// Mock user database (same as in login route)
const users = [
  {
    id: 1,
    email: "user@example.com",
    password: "password123",
    name: "Test User",
  },
  {
    id: 2,
    email: "admin@example.com",
    password: "admin123",
    name: "Admin User",
  },
]

export async function GET(request: NextRequest) {
  try {
    // Get the auth token from cookies
    const authToken = request.cookies.get("auth-token")?.value
    console.log("Auth token in /api/auth/me:", authToken)

    if (!authToken) {
      return NextResponse.json({ error: "認証されていません", authenticated: false }, { status: 401 })
    }

    // For test cookies that don't follow our format
    if (authToken.startsWith("test-cookie-")) {
      return NextResponse.json({
        authenticated: true,
        user: {
          id: 999,
          email: "test@example.com",
          name: "Test Cookie User",
        },
      })
    }

    // Extract the user ID from the token
    // Format: user-{id}-{timestamp}
    const parts = authToken.split("-")
    if (parts.length < 3 || parts[0] !== "user") {
      return NextResponse.json({ error: "無効なトークン", authenticated: false }, { status: 401 })
    }

    const userId = Number.parseInt(parts[1], 10)

    // Find the user
    const user = users.find((u) => u.id === userId)

    if (!user) {
      return NextResponse.json({ error: "ユーザーが見つかりません", authenticated: false }, { status: 404 })
    }

    return NextResponse.json({
      authenticated: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    })
  } catch (error) {
    console.error("Error fetching user:", error)
    return NextResponse.json({ error: "ユーザー情報の取得に失敗しました", authenticated: false }, { status: 500 })
  }
}
