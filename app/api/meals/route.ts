import { type NextRequest, NextResponse } from "next/server"
import type { MealData } from "@/lib/api"

// Mock database for meals
const mealsDatabase: MealData[] = [
  { id: 1, date: "05.21", type: "Morning", image: "/images/m01.jpg" },
  { id: 2, date: "05.21", type: "Lunch", image: "/images/l03.jpg" },
  { id: 3, date: "05.21", type: "Dinner", image: "/images/d01.jpg" },
  { id: 4, date: "05.21", type: "Snack", image: "/images/l01.jpg" },
  { id: 5, date: "05.20", type: "Morning", image: "/images/m01.jpg" },
  { id: 6, date: "05.20", type: "Lunch", image: "/images/l02.jpg" },
  { id: 7, date: "05.20", type: "Dinner", image: "/images/d02.jpg" },
  { id: 8, date: "05.21", type: "Snack", image: "/images/s01.jpg" }
]

for (let i = 1; i <= 5; i++) {
  for (let j = 0; j < 8; j++) {
    const mealType = j % 4 === 0 ? "Morning" : j % 4 === 1 ? "Lunch" : j % 4 === 2 ? "Dinner" : "Snack"

    let imageToUse = ""

    if (mealType === "Morning") {
      imageToUse = "/images/m01.jpg"
    } else if (mealType === "Lunch") {
      const lunchImages = ["/images/l01.jpg", "/images/l02.jpg", "/images/l03.jpg"]
      imageToUse = lunchImages[j % lunchImages.length]
    } else if (mealType === "Dinner") {
      const dinnerImages = ["/images/d01.jpg", "/images/d02.jpg"]
      imageToUse = dinnerImages[j % dinnerImages.length]
    } else {
      imageToUse = "/images/s01.jpg"
    }

    mealsDatabase.push({
      id: 100 + i * 8 + j,
      date: `05.${20 - i}`,
      type: mealType,
      image: imageToUse
    })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "8")
    const type = searchParams.get("type")
    const date = searchParams.get("date")

    // Calculate pagination
    const startIndex = (page - 1) * limit
    const endIndex = page * limit

    // Filter meals if type or date is provided
    let filteredMeals = mealsDatabase
    if (type) {
      filteredMeals = filteredMeals.filter((meal) => meal.type === type)
    }
    if (date) {
      filteredMeals = filteredMeals.filter((meal) => meal.date === date)
    }

    // Get paginated results
    const paginatedMeals = filteredMeals.slice(startIndex, endIndex)

    // Create pagination metadata
    const totalItems = filteredMeals.length
    const totalPages = Math.ceil(totalItems / limit)
    const hasMore = page < totalPages

    return NextResponse.json({
      data: paginatedMeals,
      pagination: {
        page,
        limit,
        totalItems,
        totalPages,
        hasMore
      }
    })
  } catch (error) {
    console.error("Error fetching meals:", error)
    return NextResponse.json({ error: "Failed to fetch meals" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.type || !body.date || !body.image) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Create new meal
    const newMeal: MealData = {
      id: mealsDatabase.length + 1,
      type: body.type,
      date: body.date,
      image: body.image
    }

    // Add to database (in a real app, this would be a database operation)
    mealsDatabase.push(newMeal)

    return NextResponse.json(newMeal, { status: 201 })
  } catch (error) {
    console.error("Error creating meal:", error)
    return NextResponse.json({ error: "Failed to create meal" }, { status: 500 })
  }
}
