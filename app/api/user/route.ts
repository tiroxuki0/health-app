import { type NextRequest, NextResponse } from "next/server"

// Mock user profile data
const userProfile = {
  id: 1,
  username: "user1",
  name: "Test User",
  email: "user@example.com",
  height: 175,
  weight: 70,
  targetWeight: 65,
  birthdate: "1990-01-01",
}

export async function GET(request: NextRequest) {
  try {
    // In a real app, you would verify the JWT token here
    // and fetch the user data from a database

    return NextResponse.json(userProfile)
  } catch (error) {
    console.error("Error fetching user profile:", error)
    return NextResponse.json({ error: "Failed to fetch user profile" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()

    // In a real app, you would verify the JWT token here
    // and update the user data in a database

    // Update user profile
    const updatedProfile = {
      ...userProfile,
      ...body,
    }

    return NextResponse.json(updatedProfile)
  } catch (error) {
    console.error("Error updating user profile:", error)
    return NextResponse.json({ error: "Failed to update user profile" }, { status: 500 })
  }
}
