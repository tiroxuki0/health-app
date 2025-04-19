import { NextResponse } from "next/server"

export async function POST() {
  // Create the response
  const response = NextResponse.json({ success: true })

  // Clear the auth cookie directly on the response
  response.cookies.set({
    name: "auth-token",
    value: "",
    expires: new Date(0),
    path: "/",
  })

  console.log("Logout: Cookie cleared")
  return response
}
