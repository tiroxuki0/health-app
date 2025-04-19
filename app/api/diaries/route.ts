import { type NextRequest, NextResponse } from "next/server"
import type { DiaryData } from "@/lib/api"

// Mock database for diaries
const diariesDatabase: DiaryData[] = [
  {
    id: 1,
    date: "2021.05.21",
    time: "23:25",
    content:
      "私の日記の記録が一部表示されます。テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト...",
  },
  {
    id: 2,
    date: "2021.05.21",
    time: "23:25",
    content:
      "私の日記の記録が一部表示されます。テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト...",
  },
  {
    id: 3,
    date: "2021.05.21",
    time: "23:25",
    content:
      "私の日記の記録が一部表示されます。テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト...",
  },
  {
    id: 4,
    date: "2021.05.21",
    time: "23:25",
    content:
      "私の日記の記録が一部表示されます。テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト...",
  },
  {
    id: 5,
    date: "2021.05.21",
    time: "23:25",
    content:
      "私の日記の記録が一部表示されます。テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト...",
  },
  {
    id: 6,
    date: "2021.05.21",
    time: "23:25",
    content:
      "私の日記の記録が一部表示されます。テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト...",
  },
  {
    id: 7,
    date: "2021.05.21",
    time: "23:25",
    content:
      "私の日記の記録が一部表示されます。テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト...",
  },
  {
    id: 8,
    date: "2021.05.21",
    time: "23:25",
    content:
      "私の日記の記録が一部表示されます。テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト...",
  },
]

// Generate additional diaries for pagination
for (let i = 1; i <= 5; i++) {
  for (let j = 0; j < 8; j++) {
    diariesDatabase.push({
      id: 100 + i * 8 + j,
      date: `2021.05.${20 - i}`,
      time: "23:25",
      content:
        "私の日記の記録が一部表示されます。テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト...",
    })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "8")
    const date = searchParams.get("date")

    // Calculate pagination
    const startIndex = (page - 1) * limit
    const endIndex = page * limit

    // Filter diaries if date is provided
    let filteredDiaries = diariesDatabase
    if (date) {
      filteredDiaries = filteredDiaries.filter((diary) => diary.date === date)
    }

    // Get paginated results
    const paginatedDiaries = filteredDiaries.slice(startIndex, endIndex)

    // Create pagination metadata
    const totalItems = filteredDiaries.length
    const totalPages = Math.ceil(totalItems / limit)
    const hasMore = page < totalPages

    return NextResponse.json({
      data: paginatedDiaries,
      pagination: {
        page,
        limit,
        totalItems,
        totalPages,
        hasMore,
      },
    })
  } catch (error) {
    console.error("Error fetching diaries:", error)
    return NextResponse.json({ error: "Failed to fetch diaries" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.date || !body.time || !body.content) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Create new diary
    const newDiary: DiaryData = {
      id: diariesDatabase.length + 1,
      date: body.date,
      time: body.time,
      content: body.content,
    }

    // Add to database (in a real app, this would be a database operation)
    diariesDatabase.push(newDiary)

    return NextResponse.json(newDiary, { status: 201 })
  } catch (error) {
    console.error("Error creating diary:", error)
    return NextResponse.json({ error: "Failed to create diary" }, { status: 500 })
  }
}
