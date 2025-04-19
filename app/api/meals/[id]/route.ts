import { type NextRequest, NextResponse } from "next/server"
import type { MealData } from "@/lib/api"

// Mock database for meals (same as in the main route file)
const mealsDatabase: MealData[] = [
  { id: 1, date: "05.21", type: "Morning", image: "/placeholder.svg?height=234&width=234" },
  { id: 2, date: "05.21", type: "Lunch", image: "/placeholder.svg?height=234&width=234" },
  { id: 3, date: "05.21", type: "Dinner", image: "/placeholder.svg?height=234&width=234" },
  { id: 4, date: "05.21", type: "Snack", image: "/placeholder.svg?height=234&width=234" },
  { id: 5, date: "05.20", type: "Morning", image: "/placeholder.svg?height=234&width=234" },
  { id: 6, date: "05.20", type: "Lunch", image: "/placeholder.svg?height=234&width=234" },
  { id: 7, date: "05.20", type: "Dinner", image: "/placeholder.svg?height=234&width=234" },
  { id: 8, date: "05.21", type: "Snack", image: "/placeholder.svg?height=234&width=234" },
]

// Generate additional meals for pagination
for (let i = 1; i <= 5; i++) {
  for (let j = 0; j < 8; j++) {
    mealsDatabase.push({
      id: 100 + i * 8 + j,
      date: `05.${20 - i}`,
      type: j % 4 === 0 ? "Morning" : j % 4 === 1 ? "Lunch" : j % 4 === 2 ? "Dinner" : "Snack",
      image: "/placeholder.svg?height=234&width=234",
    })
  }
}

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)

    // Find the meal by ID
    const meal = mealsDatabase.find((meal) => meal.id === id)

    if (!meal) {
      return NextResponse.json({ error: "Meal not found" }, { status: 404 })
    }

    return NextResponse.json(meal)
  } catch (error) {
    console.error("Error fetching meal:", error)
    return NextResponse.json({ error: "Failed to fetch meal" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    const body = await request.json()

    // Find the meal index
    const mealIndex = mealsDatabase.findIndex((meal) => meal.id === id)

    if (mealIndex === -1) {
      return NextResponse.json({ error: "Meal not found" }, { status: 404 })
    }

    // Update the meal
    const updatedMeal = {
      ...mealsDatabase[mealIndex],
      ...body,
      id, // Ensure ID doesn't change
    }

    mealsDatabase[mealIndex] = updatedMeal

    return NextResponse.json(updatedMeal)
  } catch (error) {
    console.error("Error updating meal:", error)
    return NextResponse.json({ error: "Failed to update meal" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)

    // Find the meal index
    const mealIndex = mealsDatabase.findIndex((meal) => meal.id === id)

    if (mealIndex === -1) {
      return NextResponse.json({ error: "Meal not found" }, { status: 404 })
    }

    // Remove the meal
    mealsDatabase.splice(mealIndex, 1)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting meal:", error)
    return NextResponse.json({ error: "Failed to delete meal" }, { status: 500 })
  }
}
