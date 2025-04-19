import { type NextRequest, NextResponse } from "next/server"
import type { ExerciseData } from "@/lib/api"

// Mock database for exercises
const exercisesDatabase: ExerciseData[] = [
  { id: 1, name: "家事全般（立位・軽い）", calories: 26, duration: 10 },
  { id: 2, name: "家事全般（立位・軽い）", calories: 26, duration: 10 },
  { id: 3, name: "家事全般（立位・軽い）", calories: 26, duration: 10 },
  { id: 4, name: "家事全般（立位・軽い）", calories: 26, duration: 10 },
  { id: 5, name: "家事全般（立位・軽い）", calories: 26, duration: 10 },
  { id: 6, name: "家事全般（立位・軽い）", calories: 26, duration: 10 },
  { id: 7, name: "家事全般（立位・軽い）", calories: 26, duration: 10 },
  { id: 8, name: "家事全般（立位・軽い）", calories: 26, duration: 10 },
]

// Generate additional exercises for variety
const exerciseNames = [
  "ウォーキング（平地）",
  "ジョギング",
  "水泳（ゆっくり）",
  "サイクリング",
  "ヨガ",
  "ストレッチ",
  "筋トレ（軽度）",
  "ダンス",
]

for (let i = 0; i < 20; i++) {
  exercisesDatabase.push({
    id: 100 + i,
    name: exerciseNames[i % exerciseNames.length],
    calories: 20 + Math.floor(Math.random() * 100),
    duration: 5 + Math.floor(Math.random() * 30),
  })
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "8")
    const minCalories = searchParams.get("minCalories") ? Number.parseInt(searchParams.get("minCalories")!) : undefined
    const maxCalories = searchParams.get("maxCalories") ? Number.parseInt(searchParams.get("maxCalories")!) : undefined

    // Calculate pagination
    const startIndex = (page - 1) * limit
    const endIndex = page * limit

    // Filter exercises if calorie range is provided
    let filteredExercises = exercisesDatabase
    if (minCalories !== undefined) {
      filteredExercises = filteredExercises.filter((exercise) => exercise.calories >= minCalories)
    }
    if (maxCalories !== undefined) {
      filteredExercises = filteredExercises.filter((exercise) => exercise.calories <= maxCalories)
    }

    // Get paginated results
    const paginatedExercises = filteredExercises.slice(startIndex, endIndex)

    // Create pagination metadata
    const totalItems = filteredExercises.length
    const totalPages = Math.ceil(totalItems / limit)
    const hasMore = page < totalPages

    return NextResponse.json({
      data: paginatedExercises,
      pagination: {
        page,
        limit,
        totalItems,
        totalPages,
        hasMore,
      },
    })
  } catch (error) {
    console.error("Error fetching exercises:", error)
    return NextResponse.json({ error: "Failed to fetch exercises" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.name || body.calories === undefined || body.duration === undefined) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Create new exercise
    const newExercise: ExerciseData = {
      id: exercisesDatabase.length + 1,
      name: body.name,
      calories: body.calories,
      duration: body.duration,
    }

    // Add to database (in a real app, this would be a database operation)
    exercisesDatabase.push(newExercise)

    return NextResponse.json(newExercise, { status: 201 })
  } catch (error) {
    console.error("Error creating exercise:", error)
    return NextResponse.json({ error: "Failed to create exercise" }, { status: 500 })
  }
}
