// Mock data for the application

// Top Page Data
export interface TopPageData {
  achievementRate: number
  bodyWeight: BodyWeightData[]
  meals: MealData[]
}

export interface BodyWeightData {
  date: string
  weight: number
  fat: number
}

export interface MealData {
  id: number
  date: string
  type: "Morning" | "Lunch" | "Dinner" | "Snack"
  image: string
}

// My Record Page Data
export interface MyRecordData {
  bodyWeight: BodyWeightData[]
  exercises: ExerciseData[]
  diaries: DiaryData[]
}

export interface ExerciseData {
  id: number
  name: string
  calories: number
  duration: number
}

export interface DiaryData {
  id: number
  date: string
  time: string
  content: string
}

// Column Page Data
export interface ColumnData {
  id: number
  title: string
  description: string
  image: string
  date: string
  category: "column" | "diet" | "beauty" | "health"
  tags: string[]
}

// Mock API functions
export const getTopPageData = async (): Promise<TopPageData> => {
  return {
    achievementRate: 75,
    bodyWeight: [
      { date: "6月", weight: 90, fat: 85 },
      { date: "7月", weight: 75, fat: 65 },
      { date: "8月", weight: 82, fat: 72 },
      { date: "9月", weight: 78, fat: 68 },
      { date: "10月", weight: 72, fat: 62 },
      { date: "11月", weight: 77, fat: 67 },
      { date: "12月", weight: 70, fat: 60 },
      { date: "1月", weight: 65, fat: 55 },
      { date: "2月", weight: 63, fat: 53 },
      { date: "3月", weight: 58, fat: 48 },
      { date: "4月", weight: 55, fat: 45 },
      { date: "5月", weight: 57, fat: 47 }
    ],
    meals: [
      { id: 1, date: "05.21", type: "Morning", image: "/placeholder.svg?height=234&width=234" },
      { id: 2, date: "05.21", type: "Lunch", image: "/placeholder.svg?height=234&width=234" },
      { id: 3, date: "05.21", type: "Dinner", image: "/placeholder.svg?height=234&width=234" },
      { id: 4, date: "05.21", type: "Snack", image: "/placeholder.svg?height=234&width=234" },
      { id: 5, date: "05.20", type: "Morning", image: "/placeholder.svg?height=234&width=234" },
      { id: 6, date: "05.20", type: "Lunch", image: "/placeholder.svg?height=234&width=234" },
      { id: 7, date: "05.20", type: "Dinner", image: "/placeholder.svg?height=234&width=234" },
      { id: 8, date: "05.21", type: "Snack", image: "/placeholder.svg?height=234&width=234" }
    ]
  }
}

export const getMyRecordData = async (): Promise<MyRecordData> => {
  return {
    bodyWeight: [
      { date: "6月", weight: 90, fat: 85 },
      { date: "7月", weight: 75, fat: 65 },
      { date: "8月", weight: 82, fat: 72 },
      { date: "9月", weight: 78, fat: 68 },
      { date: "10月", weight: 72, fat: 62 },
      { date: "11月", weight: 77, fat: 67 },
      { date: "12月", weight: 70, fat: 60 },
      { date: "1月", weight: 65, fat: 55 },
      { date: "2月", weight: 63, fat: 53 },
      { date: "3月", weight: 58, fat: 48 },
      { date: "4月", weight: 55, fat: 45 },
      { date: "5月", weight: 57, fat: 47 }
    ],
    exercises: [
      { id: 1, name: "家事全般（立位・軽い）", calories: 26, duration: 10 },
      { id: 2, name: "家事全般（立位・軽い）", calories: 26, duration: 10 },
      { id: 3, name: "家事全般（立位・軽い）", calories: 26, duration: 10 },
      { id: 4, name: "家事全般（立位・軽い）", calories: 26, duration: 10 },
      { id: 5, name: "家事全般（立位・軽い）", calories: 26, duration: 10 },
      { id: 6, name: "家事全般（立位・軽い）", calories: 26, duration: 10 },
      { id: 7, name: "家事全般（立位・軽い）", calories: 26, duration: 10 },
      { id: 8, name: "家事全般（立位・軽い）", calories: 26, duration: 10 }
    ],
    diaries: [
      {
        id: 1,
        date: "2021.05.21",
        time: "23:25",
        content: "私の日記の記録が一部表示されます。テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト..."
      },
      {
        id: 2,
        date: "2021.05.21",
        time: "23:25",
        content: "私の日記の記録が一部表示されます。テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト..."
      },
      {
        id: 3,
        date: "2021.05.21",
        time: "23:25",
        content: "私の日記の記録が一部表示されます。テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト..."
      },
      {
        id: 4,
        date: "2021.05.21",
        time: "23:25",
        content: "私の日記の記録が一部表示されます。テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト..."
      },
      {
        id: 5,
        date: "2021.05.21",
        time: "23:25",
        content: "私の日記の記録が一部表示されます。テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト..."
      },
      {
        id: 6,
        date: "2021.05.21",
        time: "23:25",
        content: "私の日記の記録が一部表示されます。テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト..."
      },
      {
        id: 7,
        date: "2021.05.21",
        time: "23:25",
        content: "私の日記の記録が一部表示されます。テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト..."
      },
      {
        id: 8,
        date: "2021.05.21",
        time: "23:25",
        content: "私の日記の記録が一部表示されます。テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト..."
      }
    ]
  }
}

export const getColumnData = async (): Promise<ColumnData[]> => {
  return [
    {
      id: 1,
      title: "魚を食べて頭もカラダも元気に！知っておきたい魚を食べるメリットとは？",
      description: "魚を食べて頭もカラダも元気に！知っておきたい魚を食べるメリットとは？",
      image: "/placeholder.svg?height=144&width=240",
      date: "2021.05.17",
      category: "column",
      tags: ["魚料理", "和食", "DHA"]
    },
    {
      id: 2,
      title: "魚を食べて頭もカラダも元気に！知っておきたい魚を食べるメリットとは？",
      description: "魚を食べて頭もカラダも元気に！知っておきたい魚を食べるメリットとは？",
      image: "/placeholder.svg?height=144&width=240",
      date: "2021.05.17",
      category: "diet",
      tags: ["魚料理", "和食", "DHA"]
    },
    {
      id: 3,
      title: "魚を食べて頭もカラダも元気に！知っておきたい魚を食べるメリットとは？",
      description: "魚を食べて頭もカラダも元気に！知っておきたい魚を食べるメリットとは？",
      image: "/placeholder.svg?height=144&width=240",
      date: "2021.05.17",
      category: "beauty",
      tags: ["魚料理", "和食", "DHA"]
    },
    {
      id: 4,
      title: "魚を食べて頭もカラダも元気に！知っておきたい魚を食べるメリットとは？",
      description: "魚を食べて頭もカラダも元気に！知っておきたい魚を食べるメリットとは？",
      image: "/placeholder.svg?height=144&width=240",
      date: "2021.05.17",
      category: "health",
      tags: ["魚料理", "和食", "DHA"]
    },
    {
      id: 5,
      title: "魚を食べて頭もカラダも元気に！知っておきたい魚を食べるメリットとは？",
      description: "魚を食べて頭もカラダも元気に！知っておきたい魚を食べるメリットとは？",
      image: "/placeholder.svg?height=144&width=240",
      date: "2021.05.17",
      category: "column",
      tags: ["魚料理", "和食", "DHA"]
    },
    {
      id: 6,
      title: "魚を食べて頭もカラダも元気に！知っておきたい魚を食べるメリットとは？",
      description: "魚を食べて頭もカラダも元気に！知っておきたい魚を食べるメリットとは？",
      image: "/placeholder.svg?height=144&width=240",
      date: "2021.05.17",
      category: "diet",
      tags: ["魚料理", "和食", "DHA"]
    },
    {
      id: 7,
      title: "魚を食べて頭もカラダも元気に！知っておきたい魚を食べるメリットとは？",
      description: "魚を食べて頭もカラダも元気に！知っておきたい魚を食べるメリットとは？",
      image: "/placeholder.svg?height=144&width=240",
      date: "2021.05.17",
      category: "beauty",
      tags: ["魚料理", "和食", "DHA"]
    },
    {
      id: 8,
      title: "魚を食べて頭もカラダも元気に！知っておきたい魚を食べるメリットとは？",
      description: "魚を食べて頭もカラダも元気に！知っておきたい魚を食べるメリットとは？",
      image: "/placeholder.svg?height=144&width=240",
      date: "2021.05.17",
      category: "health",
      tags: ["魚料理", "和食", "DHA"]
    }
  ]
}

// Add more mock data for pagination
export const getMoreMeals = async (page: number): Promise<MealData[]> => {
  // Generate additional meals for pagination
  return Array.from({ length: 8 }, (_, i) => ({
    id: 100 + page * 8 + i,
    date: `05.${20 - page}`,
    type: i % 4 === 0 ? "Morning" : i % 4 === 1 ? "Lunch" : i % 4 === 2 ? "Dinner" : "Snack",
    image: "/placeholder.svg?height=234&width=234"
  }))
}

export const getMoreDiaries = async (page: number): Promise<DiaryData[]> => {
  // Generate additional diaries for pagination
  return Array.from({ length: 8 }, (_, i) => ({
    id: 100 + page * 8 + i,
    date: `2021.05.${20 - page}`,
    time: "23:25",
    content: "私の日記の記録が一部表示されます。テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト..."
  }))
}

export const getMoreColumns = async (page: number): Promise<ColumnData[]> => {
  // Generate additional columns for pagination
  return Array.from({ length: 8 }, (_, i) => ({
    id: 100 + page * 8 + i,
    title: "魚を食べて頭もカラダも元気に！知っておきたい魚を食べるメリットとは？",
    description: "魚を食べて頭もカラダも元気に！知っておきたい魚を食べるメリットとは？",
    image: "/placeholder.svg?height=144&width=240",
    date: `2021.05.${15 - page}`,
    category: i % 4 === 0 ? "column" : i % 4 === 1 ? "diet" : i % 4 === 2 ? "beauty" : "health",
    tags: ["魚料理", "和食", "DHA"]
  }))
}
