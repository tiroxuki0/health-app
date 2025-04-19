import BodyWeightChart from "@/components/charts/body-weight-chart"
import ScrollToTop from "@/components/scroll-to-top"
import { fetchDashboardData, fetchDiaries, fetchExercises } from "@/lib/api-client"
import DiaryList from "@/components/diary-list"
import { Container } from "@/components/container"
import RecordCategoryButtons from "@/components/record-category-buttons"

export const dynamic = "force-dynamic"

export default async function MyRecord() {
  // Fetch initial data from API with error handling
  let dashboardData
  let exercisesResponse
  let diariesResponse

  try {
    dashboardData = await fetchDashboardData()
  } catch (error) {
    console.error("Error fetching dashboard data:", error)
    // Provide fallback data
    dashboardData = {
      achievementRate: 0,
      bodyWeight: []
    }
  }

  try {
    exercisesResponse = await fetchExercises({ limit: 8 })
  } catch (error) {
    console.error("Error fetching exercises:", error)
    // Provide fallback data
    exercisesResponse = {
      data: [],
      pagination: { page: 1, limit: 8, totalItems: 0, totalPages: 0, hasMore: false }
    }
  }

  try {
    diariesResponse = await fetchDiaries({ limit: 8 })
  } catch (error) {
    console.error("Error fetching diaries:", error)
    // Provide fallback data
    diariesResponse = {
      data: [],
      pagination: { page: 1, limit: 8, totalItems: 0, totalPages: 0, hasMore: false }
    }
  }

  // Custom margin for the chart
  const chartMargin = {
    top: 0,
    right: 0,
    bottom: 20,
    left: 0
  }

  // Define record categories
  const recordCategories = [
    {
      title: "BODY RECORD",
      subtitle: "自分のカラダの記録",
      imageSrc: "/images/MyRecommend-1.jpg",
      href: "#body-record"
    },
    {
      title: "MY EXERCISE",
      subtitle: "自分の運動の記録",
      imageSrc: "/images/MyRecommend-2.jpg",
      href: "#my-exercise"
    },
    {
      title: "MY DIARY",
      subtitle: "自分の日記",
      imageSrc: "/images/MyRecommend-3.jpg",
      href: "#my-diary"
    }
  ]

  return (
    <Container className="py-8">
      {/* Record Category Buttons */}
      <RecordCategoryButtons categories={recordCategories} />

      {/* Body Record Chart */}
      <div id="body-record" className="bg-[#414141] p-4 mb-12">
        <div className="flex items-center mb-4">
          <h3 className="text-white text-xl mr-8">BODY RECORD</h3>
          <span className="text-white">2021.05.21</span>
        </div>

        <div className="h-[304px]">
          <BodyWeightChart isFilter className="!bg-transparent" data={dashboardData.bodyWeight} margin={chartMargin} />
        </div>
      </div>

      {/* My Exercise */}
      <div id="my-exercise" className="bg-[#414141] p-4 mb-12">
        <div className="flex items-center">
          <h3 className="text-white text-xl font-bold mr-8">MY EXERCISE</h3>
          <span className="text-white">2021.05.21</span>
        </div>

        <div className="h-[192px] overflow-y-auto pr-[30px] custom-scrollbar">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
            {exercisesResponse.data.map((exercise: any) => (
              <div key={exercise.id} className="flex justify-between items-center border-b border-[#777777] py-2">
                <div>
                  <p className="text-white">• {exercise.name}</p>
                  <p className="text-[#FFCC21] text-sm">{exercise.calories}kcal</p>
                </div>
                <div className="text-[#FFCC21]">{exercise.duration} min</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* My Diary */}
      <div id="my-diary" className="mb-12">
        <h3 className="text-xl font-bold mb-4">MY DIARY</h3>

        {/* Sử dụng component DiaryList đã tách ra */}
        <DiaryList initialDiaries={diariesResponse.data} initialPagination={diariesResponse.pagination} />
      </div>

      <ScrollToTop />
    </Container>
  )
}
