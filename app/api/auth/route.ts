import { type NextRequest, NextResponse } from "next/server"

// Mock user database
const users = [
  {
    id: 1,
    username: "user1",
    password: "password1", // In a real app, this would be hashed
    name: "Test User",
  },
]

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.username || !body.password) {
      return NextResponse.json({ error: "Missing username or password" }, { status: 400 })
    }

    // Find user
    const user = users.find((u) => u.username === body.username && u.password === body.password)

    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // In a real app, you would generate a JWT token here
    const token = "mock-jwt-token"

    return NextResponse.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        name: user.name,
      },
    })
  } catch (error) {
    console.error("Error during authentication:", error)
    return NextResponse.json({ error: "Authentication failed" }, { status: 500 })
  }
}
