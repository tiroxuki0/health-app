// Client-side API functions for fetching data

// Types
export interface PaginationParams {
  page?: number
  limit?: number
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    totalItems: number
    totalPages: number
    hasMore: boolean
  }
}

// Helper function to get the base URL for API requests
function getBaseUrl() {
  // Check if we're running on the server
  if (typeof window === "undefined") {
    // Server-side: use absolute URL with the host from environment
    // Default to localhost:3000 if no host is provided
    return process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"
  }
  // Client-side: use relative URL
  return ""
}

// Meals API
export async function fetchMeals(params: PaginationParams & { type?: string; date?: string } = {}) {
  const queryParams = new URLSearchParams()

  if (params.page) queryParams.set("page", params.page.toString())
  if (params.limit) queryParams.set("limit", params.limit.toString())
  if (params.type) queryParams.set("type", params.type)
  if (params.date) queryParams.set("date", params.date)

  try {
    const response = await fetch(`${getBaseUrl()}/api/meals?${queryParams.toString()}`, {
      cache: "no-store" // Disable caching
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch meals: ${response.statusText}`)
    }

    return response.json() as Promise<
      PaginatedResponse<{
        id: number
        date: string
        type: string
        image: string
      }>
    >
  } catch (error) {
    console.error("Error fetching meals:", error)
    // Return empty data structure to prevent rendering errors
    return {
      data: [],
      pagination: {
        page: 1,
        limit: params.limit || 8,
        totalItems: 0,
        totalPages: 0,
        hasMore: false
      }
    } as any
  }
}

export async function fetchMealById(id: number) {
  const response = await fetch(`${getBaseUrl()}/api/meals/${id}`)

  if (!response.ok) {
    throw new Error(`Failed to fetch meal: ${response.statusText}`)
  }

  return response.json()
}

export async function createMeal(data: { type: string; date: string; image: string }) {
  const response = await fetch(`${getBaseUrl()}/api/meals`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })

  if (!response.ok) {
    throw new Error(`Failed to create meal: ${response.statusText}`)
  }

  return response.json()
}

export async function updateMeal(id: number, data: Partial<{ type: string; date: string; image: string }>) {
  const response = await fetch(`${getBaseUrl()}/api/meals/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })

  if (!response.ok) {
    throw new Error(`Failed to update meal: ${response.statusText}`)
  }

  return response.json()
}

export async function deleteMeal(id: number) {
  const response = await fetch(`${getBaseUrl()}/api/meals/${id}`, {
    method: "DELETE"
  })

  if (!response.ok) {
    throw new Error(`Failed to delete meal: ${response.statusText}`)
  }

  return response.json()
}

// Diaries API
export async function fetchDiaries(params: PaginationParams & { date?: string } = {}) {
  const queryParams = new URLSearchParams()

  if (params.page) queryParams.set("page", params.page.toString())
  if (params.limit) queryParams.set("limit", params.limit.toString())
  if (params.date) queryParams.set("date", params.date)

  try {
    const response = await fetch(`${getBaseUrl()}/api/diaries?${queryParams.toString()}`, {
      cache: "no-store" // Disable caching
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch diaries: ${response.statusText}`)
    }

    return response.json() as Promise<
      PaginatedResponse<{
        id: number
        date: string
        time: string
        content: string
      }>
    >
  } catch (error) {
    console.error("Error fetching diaries:", error)
    // Return empty data structure to prevent rendering errors
    return {
      data: [],
      pagination: {
        page: 1,
        limit: params.limit || 8,
        totalItems: 0,
        totalPages: 0,
        hasMore: false
      }
    } as any
  }
}

export async function createDiary(data: { date: string; time: string; content: string }) {
  const response = await fetch(`${getBaseUrl()}/api/diaries`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })

  if (!response.ok) {
    throw new Error(`Failed to create diary: ${response.statusText}`)
  }

  return response.json()
}

// Columns API
export async function fetchColumns(params: PaginationParams & { category?: string; tag?: string } = {}) {
  const queryParams = new URLSearchParams()

  if (params.page) queryParams.set("page", params.page.toString())
  if (params.limit) queryParams.set("limit", params.limit.toString())
  if (params.category) queryParams.set("category", params.category)
  if (params.tag) queryParams.set("tag", params.tag)

  try {
    const response = await fetch(`${getBaseUrl()}/api/columns?${queryParams.toString()}`, {
      // Add cache control
      cache: "no-store" // This disables caching for this request
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch columns: ${response.statusText}`)
    }

    return response.json() as Promise<
      PaginatedResponse<{
        id: number
        title: string
        description: string
        image: string
        date: string
        category: string
        tags: string[]
      }>
    >
  } catch (error) {
    console.error("Error fetching columns:", error)
    // Return empty data structure to prevent rendering errors
    return {
      data: [],
      pagination: {
        page: 1,
        limit: params.limit || 8,
        totalItems: 0,
        totalPages: 0,
        hasMore: false
      }
    } as any
  }
}

export async function createColumn(data: { title: string; description: string; image: string; category: string; date?: string; tags?: string[] }) {
  const response = await fetch(`${getBaseUrl()}/api/columns`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })

  if (!response.ok) {
    throw new Error(`Failed to create column: ${response.statusText}`)
  }

  return response.json()
}

// Exercises API
export async function fetchExercises(
  params: PaginationParams & {
    minCalories?: number
    maxCalories?: number
  } = {}
) {
  const queryParams = new URLSearchParams()

  if (params.page) queryParams.set("page", params.page.toString())
  if (params.limit) queryParams.set("limit", params.limit.toString())
  if (params.minCalories) queryParams.set("minCalories", params.minCalories.toString())
  if (params.maxCalories) queryParams.set("maxCalories", params.maxCalories.toString())

  try {
    const response = await fetch(`${getBaseUrl()}/api/exercises?${queryParams.toString()}`, {
      cache: "no-store" // Disable caching
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch exercises: ${response.statusText}`)
    }

    return response.json() as Promise<
      PaginatedResponse<{
        id: number
        name: string
        calories: number
        duration: number
      }>
    >
  } catch (error) {
    console.error("Error fetching exercises:", error)
    // Return empty data structure to prevent rendering errors
    return {
      data: [],
      pagination: {
        page: 1,
        limit: params.limit || 8,
        totalItems: 0,
        totalPages: 0,
        hasMore: false
      }
    } as any
  }
}

export async function createExercise(data: { name: string; calories: number; duration: number }) {
  const response = await fetch(`${getBaseUrl()}/api/exercises`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })

  if (!response.ok) {
    throw new Error(`Failed to create exercise: ${response.statusText}`)
  }

  return response.json()
}

// Dashboard API
export async function fetchDashboardData(period: "year" | "month" | "week" | "day" = "year") {
  try {
    const response = await fetch(`${getBaseUrl()}/api/dashboard?period=${period}`, {
      cache: "no-store" // Disable caching
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch dashboard data: ${response.statusText}`)
    }

    return response.json() as Promise<{
      achievementRate: number
      bodyWeight: {
        date: string
        weight: number
        fat: number
      }[]
    }>
  } catch (error) {
    console.error("Error fetching dashboard data:", error)
    // Return empty data structure to prevent rendering errors
    return {
      achievementRate: 0,
      bodyWeight: []
    } as any
  }
}

export async function addBodyWeightEntry(data: { date: string; weight: number; fat: number }) {
  const response = await fetch(`${getBaseUrl()}/api/dashboard`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })

  if (!response.ok) {
    throw new Error(`Failed to add body weight entry: ${response.statusText}`)
  }

  return response.json()
}
