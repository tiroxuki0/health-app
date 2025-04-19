import { NextResponse } from "next/server"

export async function GET() {
  // Create the response
  const response = NextResponse.json({ success: true, message: "Test cookie set" })

  // Set a test cookie
  response.cookies.set({
    name: "test-cookie",
    value: `test-${Date.now()}`,
    httpOnly: false,
    path: "/",
    maxAge: 3600,
  })

  return response
}
