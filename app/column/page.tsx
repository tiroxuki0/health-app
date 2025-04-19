import ScrollToTop from "@/components/scroll-to-top"
import { fetchColumns } from "@/lib/api-client"
import ColumnList from "@/components/column-list"
import { Container } from "@/components/container"
import { Suspense } from "react"

export const dynamic = "force-dynamic"

export default async function Column() {
  let columnsResponse
  try {
    columnsResponse = await fetchColumns({ limit: 8 })
  } catch (error) {
    console.error("Error in Column page:", error)
    columnsResponse = {
      data: [],
      pagination: { page: 1, limit: 8, totalItems: 0, totalPages: 0, hasMore: false }
    }
  }

  return (
    <Container className="py-8">
      {/* Category Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-12">
        <div className="flex flex-col items-center justify-center bg-[#2E2E2E] py-6 px-4">
          <h3 className="text-[#FFCC21] text-[22px] text-center">
            RECOMMENDED
            <br />
            COLUMN
          </h3>
          <div className="w-14 h-[1px] bg-white my-2"></div>
          <p className="text-white text-lg">オススメ</p>
        </div>
        <div className="flex flex-col items-center justify-center bg-[#2E2E2E] py-6 px-4">
          <h3 className="text-[#FFCC21] text-[22px] text-center">
            RECOMMENDED
            <br />
            DIET
          </h3>
          <div className="w-14 h-[1px] bg-white my-2"></div>
          <p className="text-white text-lg">ダイエット</p>
        </div>
        <div className="flex flex-col items-center justify-center bg-[#2E2E2E] py-6 px-4">
          <h3 className="text-[#FFCC21] text-[22px] text-center">
            RECOMMENDED
            <br />
            BEAUTY
          </h3>
          <div className="w-14 h-[1px] bg-white my-2"></div>
          <p className="text-white text-lg">美容</p>
        </div>
        <div className="flex flex-col items-center justify-center bg-[#2E2E2E] py-6 px-4">
          <h3 className="text-[#FFCC21] text-[22px] text-center">
            RECOMMENDED
            <br />
            HEALTH
          </h3>
          <div className="w-14 h-[1px] bg-white my-2"></div>
          <p className="text-white text-lg">健康</p>
        </div>
      </div>

      <Suspense fallback={<div className="py-8 text-center">Loading columns...</div>}>
        <ColumnList initialColumns={columnsResponse.data} initialPagination={columnsResponse.pagination} />
      </Suspense>

      <ScrollToTop />
    </Container>
  )
}
