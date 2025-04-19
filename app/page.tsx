import ScrollToTop from "@/components/scroll-to-top"
import { fetchDashboardData, fetchMeals } from "@/lib/api-client"
import MealsList from "@/components/meals-list"
import { Container } from "@/components/container"
import AchievementRateHero from "@/components/achievement-rate-hero"
import HexagonMenu from "@/components/hexagon-menu"
import { Suspense } from "react"

export const dynamic = "force-dynamic"

export default async function Home() {
  let dashboardData
  let mealsResponse

  try {
    dashboardData = await fetchDashboardData()
  } catch (error) {
    console.error("Error fetching dashboard data:", error)
    dashboardData = {
      achievementRate: 0,
      bodyWeight: []
    }
  }

  try {
    mealsResponse = await fetchMeals({ limit: 8 })
  } catch (error) {
    console.error("Error fetching meals:", error)
    mealsResponse = {
      data: [],
      pagination: { page: 1, limit: 8, totalItems: 0, totalPages: 0, hasMore: false }
    }
  }

  return (
    <div className="min-h-screen">
      <AchievementRateHero achievementRate={dashboardData.achievementRate} bodyWeightData={dashboardData.bodyWeight} />

      <Container className="py-8">
        <HexagonMenu />
        <Suspense fallback={<div className="py-8 text-center">Loading meals...</div>}>
          <MealsList initialMeals={mealsResponse.data} initialPagination={mealsResponse.pagination} />
        </Suspense>
      </Container>

      <ScrollToTop />
    </div>
  )
}
