"use client"

import { useState } from "react"
import { fetchColumns } from "@/lib/api-client"
import LoadMoreButton from "@/components/load-more-button"
import ImageWithSkeleton from "@/components/image-with-skeleton"

interface ColumnListProps {
  initialColumns: any[]
  initialPagination: { page: number; hasMore: boolean }
}

export default function ColumnList({ initialColumns, initialPagination }: ColumnListProps) {
  const [columns, setColumns] = useState(initialColumns || [])
  const [pagination, setPagination] = useState(initialPagination)
  const [isLoading, setIsLoading] = useState(false)
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const loadMore = async () => {
    if (!pagination.hasMore || isLoading) return

    setIsLoading(true)
    try {
      const response = await fetchColumns({
        page: pagination.page + 1,
        limit: 8,
        category: activeCategory || undefined
      })

      setColumns([...columns, ...response.data])
      setPagination(response.pagination)
    } catch (error) {
      console.error("Error loading more columns:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {/* Articles Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-2 gap-y-4 mb-12">
        {columns.map((article) => (
          <div key={article.id} className="flex flex-col">
            <div className="relative">
              <ImageWithSkeleton src={article.image || "/placeholder.svg"} alt={article.title} width={240} height={144} aspectRatio="wide" objectFit="cover" />
              <div className="absolute bottom-0 left-0 bg-[#FFCC21] text-white px-2 py-1">
                {article.date} {article.date.includes(":") ? "" : "23:25"}
              </div>
            </div>
            <p className="text-sm font-bold mt-2 line-clamp-2">{article.title}</p>
            <div className="flex flex-wrap gap-2 mt-1">
              {article.tags.map((tag: string, index: number) => (
                <span key={index} className="text-xs text-[#FF963C]">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {pagination.hasMore && (
        <div className="flex justify-center mt-8 mb-12">
          <LoadMoreButton onLoadMore={loadMore} label="コラムをもっと見る" loading={isLoading} />
        </div>
      )}
    </>
  )
}
