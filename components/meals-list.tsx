"use client"

import { useState } from "react"
import { fetchMeals } from "@/lib/api-client"
import LoadMoreButton from "@/components/load-more-button"
import ImageWithSkeleton from "@/components/image-with-skeleton"

interface MealsListProps {
  initialMeals: any[]
  initialPagination: { page: number; hasMore: boolean }
}

export default function MealsList({ initialMeals, initialPagination }: MealsListProps) {
  const [meals, setMeals] = useState(initialMeals)
  const [pagination, setPagination] = useState(initialPagination)
  const [isLoading, setIsLoading] = useState(false)

  const loadMore = async () => {
    if (!pagination.hasMore || isLoading) return

    setIsLoading(true)
    try {
      const response = await fetchMeals({ page: pagination.page + 1, limit: 8 })
      setMeals([...meals, ...response.data])
      setPagination(response.pagination)
    } catch (error) {
      console.error("Error loading more meals:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {/* Meals Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 mb-4">
        {meals.map((meal) => (
          <div key={meal.id} className="relative h-full">
            <ImageWithSkeleton src={meal.image} alt={meal.type} width={234} height={234} aspectRatio="square" containerClassName="h-full" />
            <div className="absolute bottom-0 left-0 bg-[#FFCC21] text-white px-2 py-1">
              {meal.date}.{meal.type}
            </div>
          </div>
        ))}
      </div>

      {pagination.hasMore && (
        <div className="flex justify-center mt-4">
          <LoadMoreButton onLoadMore={loadMore} label="記録をもっと見る" loading={isLoading} />
        </div>
      )}
    </>
  )
}
