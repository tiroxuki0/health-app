import { type NextRequest, NextResponse } from "next/server"
import type { BodyWeightData } from "@/lib/api"

// Mock database for body weight data
const bodyWeightDatabase: BodyWeightData[] = [
  { date: "6月", weight: 90, fat: 85 },
  { date: "7月", weight: 75, fat: 65 },
  { date: "8月", weight: 82, fat: 72 },
  { date: "9月", weight: 78, fat: 68 },
  { date: "10月", weight: 72, fat: 62 },
  { date: "11月", weight: 77, fat: 67 },
  { date: "12月", weight: 70, fat: 60 },
  { date: "1月", weight: 65, fat: 55 },
  { date: "2月", weight: 63, fat: 53 },
  { date: "3月", weight: 58, fat: 48 },
  { date: "4月", weight: 55, fat: 45 },
  { date: "5月", weight: 57, fat: 47 }
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const period = searchParams.get("period") || "year" // year, month, week, day

    // Filter data based on period (in a real app, this would be more sophisticated)
    let filteredData = bodyWeightDatabase
    if (period === "month") {
      filteredData = bodyWeightDatabase.slice(-3)
    } else if (period === "week") {
      filteredData = bodyWeightDatabase.slice(-1)
    }

    // Calculate achievement rate (mock calculation)
    const achievementRate = 75

    return NextResponse.json({
      achievementRate,
      bodyWeight: filteredData
    })
  } catch (error) {
    console.error("Error fetching dashboard data:", error)
    return NextResponse.json({ error: "Failed to fetch dashboard data" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.date || body.weight === undefined || body.fat === undefined) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Create new body weight entry
    const newEntry: BodyWeightData = {
      date: body.date,
      weight: body.weight,
      fat: body.fat
    }

    // Add to database (in a real app, this would be a database operation)
    bodyWeightDatabase.push(newEntry)

    return NextResponse.json(newEntry, { status: 201 })
  } catch (error) {
    console.error("Error creating body weight entry:", error)
    return NextResponse.json({ error: "Failed to create body weight entry" }, { status: 500 })
  }
}
