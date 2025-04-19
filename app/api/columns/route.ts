import { type NextRequest, NextResponse } from "next/server"
import type { ColumnData } from "@/lib/api"

// Mock database for columns
const columnsDatabase: ColumnData[] = [
  {
    id: 1,
    title: "魚を食べて頭もカラダも元気に！知っておきたい魚を食べるメリットとは？",
    description: "魚を食べて頭もカラダも元気に！知っておきたい魚を食べるメリットとは？",
    image: "/images/column-1.jpg",
    date: "2021.05.17",
    category: "column",
    tags: ["魚料理", "和食", "DHA"]
  },
  {
    id: 2,
    title: "魚を食べて頭もカラダも元気に！知っておきたい魚を食べるメリットとは？",
    description: "魚を食べて頭もカラダも元気に！知っておきたい魚を食べるメリットとは？",
    image: "/images/column-2.jpg",
    date: "2021.05.17",
    category: "diet",
    tags: ["魚料理", "和食", "DHA"]
  },
  {
    id: 3,
    title: "魚を食べて頭もカラダも元気に！知っておきたい魚を食べるメリットとは？",
    description: "魚を食べて頭もカラダも元気に！知っておきたい魚を食べるメリットとは？",
    image: "/images/column-3.jpg",
    date: "2021.05.17",
    category: "beauty",
    tags: ["魚料理", "和食", "DHA"]
  },
  {
    id: 4,
    title: "魚を食べて頭もカラダも元気に！知っておきたい魚を食べるメリットとは？",
    description: "魚を食べて頭もカラダも元気に！知っておきたい魚を食べるメリットとは？",
    image: "/images/column-4.jpg",
    date: "2021.05.17",
    category: "health",
    tags: ["魚料理", "和食", "DHA"]
  },
  {
    id: 5,
    title: "魚を食べて頭もカラダも元気に！知っておきたい魚を食べるメリットとは？",
    description: "魚を食べて頭もカラダも元気に！知っておきたい魚を食べるメリットとは？",
    image: "/images/column-5.jpg",
    date: "2021.05.17",
    category: "column",
    tags: ["魚料理", "和食", "DHA"]
  },
  {
    id: 6,
    title: "魚を食べて頭もカラダも元気に！知っておきたい魚を食べるメリットとは？",
    description: "魚を食べて頭もカラダも元気に！知っておきたい魚を食べるメリットとは？",
    image: "/images/column-6.jpg",
    date: "2021.05.17",
    category: "diet",
    tags: ["魚料理", "和食", "DHA"]
  },
  {
    id: 7,
    title: "魚を食べて頭もカラダも元気に！知っておきたい魚を食べるメリットとは？",
    description: "魚を食べて頭もカラダも元気に！知っておきたい魚を食べるメリットとは？",
    image: "/images/column-7.jpg",
    date: "2021.05.17",
    category: "beauty",
    tags: ["魚料理", "和食", "DHA"]
  },
  {
    id: 8,
    title: "魚を食べて頭もカラダも元気に！知っておきたい魚を食べるメリットとは？",
    description: "魚を食べて頭もカラダも元気に！知っておきたい魚を食べるメリットとは？",
    image: "/images/column-8.jpg",
    date: "2021.05.17",
    category: "health",
    tags: ["魚料理", "和食", "DHA"]
  }
]

// Generate additional columns for pagination
for (let i = 1; i <= 5; i++) {
  for (let j = 0; j < 8; j++) {
    columnsDatabase.push({
      id: 100 + i * 8 + j,
      title: "魚を食べて頭もカラダも元気に！知っておきたい魚を食べるメリットとは？",
      description: "魚を食べて頭もカラダも元気に！知っておきたい魚を食べるメリットとは？",
      image: `/images/column-${1 + (j % 8)}.jpg`,
      date: `2021.05.${15 - i}`,
      category: j % 4 === 0 ? "column" : j % 4 === 1 ? "diet" : j % 4 === 2 ? "beauty" : "health",
      tags: ["魚料理", "和食", "DHA"]
    })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "8")
    const category = searchParams.get("category")
    const tag = searchParams.get("tag")

    // Calculate pagination
    const startIndex = (page - 1) * limit
    const endIndex = page * limit

    // Filter columns if category or tag is provided
    let filteredColumns = columnsDatabase
    if (category) {
      filteredColumns = filteredColumns.filter((column) => column.category === category)
    }
    if (tag) {
      filteredColumns = filteredColumns.filter((column) => column.tags.includes(tag))
    }

    // Get paginated results
    const paginatedColumns = filteredColumns.slice(startIndex, endIndex)

    // Create pagination metadata
    const totalItems = filteredColumns.length
    const totalPages = Math.ceil(totalItems / limit)
    const hasMore = page < totalPages

    return NextResponse.json({
      data: paginatedColumns,
      pagination: {
        page,
        limit,
        totalItems,
        totalPages,
        hasMore
      }
    })
  } catch (error) {
    console.error("Error fetching columns:", error)
    return NextResponse.json({ error: "Failed to fetch columns" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.title || !body.description || !body.image || !body.category) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Create new column
    const newColumn: ColumnData = {
      id: columnsDatabase.length + 1,
      title: body.title,
      description: body.description,
      image: body.image,
      date: body.date || new Date().toISOString().split("T")[0].replace(/-/g, "."),
      category: body.category,
      tags: body.tags || []
    }

    // Add to database (in a real app, this would be a database operation)
    columnsDatabase.push(newColumn)

    return NextResponse.json(newColumn, { status: 201 })
  } catch (error) {
    console.error("Error creating column:", error)
    return NextResponse.json({ error: "Failed to create column" }, { status: 500 })
  }
}
