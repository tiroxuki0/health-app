"use client"

import { useState } from "react"
import { fetchDiaries } from "@/lib/api-client"
import LoadMoreButton from "@/components/load-more-button"

interface DiaryListProps {
  initialDiaries: any[]
  initialPagination: { page: number; hasMore: boolean }
}

export default function DiaryList({ initialDiaries, initialPagination }: DiaryListProps) {
  const [diaries, setDiaries] = useState(initialDiaries)
  const [pagination, setPagination] = useState(initialPagination)
  const [isLoading, setIsLoading] = useState(false)

  const loadMore = async () => {
    if (!pagination.hasMore || isLoading) return

    setIsLoading(true)
    try {
      const response = await fetchDiaries({ page: pagination.page + 1, limit: 8 })
      setDiaries([...diaries, ...response.data])
      setPagination(response.pagination)
    } catch (error) {
      console.error("Error loading more diaries:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
        {diaries.map((diary) => (
          <div key={diary.id} className="border border-[#707070] p-4">
            <p className="font-bold">{diary.date}</p>
            <p className="font-bold">{diary.time}</p>
            <p className="text-sm mt-2">{diary.content}</p>
          </div>
        ))}
      </div>

      {pagination.hasMore && (
        <div className="flex justify-center mt-8 mb-12">
          <LoadMoreButton onLoadMore={loadMore} label="自分の日記をもっと見る" loading={isLoading} />
        </div>
      )}
    </>
  )
}
