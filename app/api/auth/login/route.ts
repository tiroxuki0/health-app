import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Mock user database
const users = [
  {
    id: 1,
    email: "user@example.com",
    // In a real app, this would be hashed
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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log("Login attempt:", body)

    // Validate required fields
    if (!body.email || !body.password) {
      return NextResponse.json({ error: "メールアドレスとパスワードが必要です" }, { status: 400 })
    }

    // Find user
    const user = users.find((u) => u.email === body.email && u.password === body.password)

    if (!user) {
      return NextResponse.json({ error: "メールアドレスまたはパスワードが無効です" }, { status: 401 })
    }

    // Create a simple token
    const token = `user-${user.id}-${Date.now()}`
    console.log("Generated token:", token)

    // Create the response
    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    })

    // Set the cookie directly on the response
    response.cookies.set({
      name: "auth-token",
      value: token,
      httpOnly: false, // Set to false for debugging
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      sameSite: "lax",
    })

    console.log("Cookie set in response:", response.cookies.get("auth-token"))
    return response
  } catch (error) {
    console.error("Error during authentication:", error)
    return NextResponse.json({ error: "認証に失敗しました" }, { status: 500 })
  }
}
