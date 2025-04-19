"use client"

import { useEffect, useRef, useState } from "react"
import * as d3 from "d3"

interface DataPoint {
  date: string
  weight: number
  fat: number
}

interface ChartMargin {
  top: number
  right: number
  bottom: number
  left: number
}

type ViewMode = "day" | "week" | "month" | "year"

interface BodyWeightChartProps {
  data: DataPoint[]
  title?: string
  className?: string
  margin?: ChartMargin
  initialViewMode?: ViewMode
  isFilter?: boolean
}

export default function BodyWeightChart({ isFilter, data, title, className, margin = { top: 20, right: 30, bottom: 30, left: 40 }, initialViewMode = "year" }: BodyWeightChartProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const [viewMode, setViewMode] = useState<ViewMode>(initialViewMode)
  const [filteredData, setFilteredData] = useState<DataPoint[]>(data)

  // Filter data based on view mode
  useEffect(() => {
    if (!data?.length) return

    const today = new Date()
    let filteredResults: DataPoint[] = []

    switch (viewMode) {
      case "day":
        // Last 24 hours
        filteredResults = data.slice(-1) // Just the latest point for demo
        break
      case "week":
        // Last 7 days
        filteredResults = data.slice(-7)
        break
      case "month":
        // Last 30 days
        filteredResults = data.slice(-30)
        break
      case "year":
      default:
        // All data (full year view)
        filteredResults = data
        break
    }

    setFilteredData(filteredResults)
  }, [data, viewMode])

  // Draw chart when data or view mode changes
  useEffect(() => {
    if (!svgRef.current || !filteredData.length) return

    const svg = d3.select(svgRef.current)
    svg.selectAll("*").remove()

    const width = svgRef.current.clientWidth - margin.left - margin.right
    const height = svgRef.current.clientHeight - margin.top - margin.bottom

    const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`)

    // X scale
    const x = d3
      .scalePoint()
      .domain(filteredData.map((d) => d.date))
      .range([0, width])
      .padding(0.5)

    // Y scale for weight
    const yWeight = d3
      .scaleLinear()
      .domain([0, (d3.max(filteredData, (d) => d.weight) as number) * 1.2])
      .range([height, 0])

    // Y scale for fat
    const yFat = d3
      .scaleLinear()
      .domain([0, (d3.max(filteredData, (d) => d.fat) as number) * 1.2])
      .range([height, 0])

    // Add subtle grid lines without axis
    g.selectAll("line.grid-line")
      .data(x.domain())
      .enter()
      .append("line")
      .attr("class", "grid-line")
      .attr("x1", (d) => x(d) as number)
      .attr("y1", 0)
      .attr("x2", (d) => x(d) as number)
      .attr("y2", height)
      .attr("stroke", "#777")
      .attr("stroke-opacity", 0.2)

    // Add title if provided
    if (title) {
      g.append("text").attr("x", 10).attr("y", 15).attr("fill", "white").style("font-family", "Hiragino Kaku Gothic Pro, Hiragino Sans, sans-serif").style("font-size", "15px").text(title)
    }

    // Create line generator for weight
    const lineWeight = d3
      .line<DataPoint>()
      .x((d) => x(d.date) as number)
      .y((d) => yWeight(d.weight))
      .curve(d3.curveLinear)

    // Create line generator for fat
    const lineFat = d3
      .line<DataPoint>()
      .x((d) => x(d.date) as number)
      .y((d) => yFat(d.fat))
      .curve(d3.curveLinear)

    // Add weight line
    g.append("path").datum(filteredData).attr("fill", "none").attr("stroke", "#FFCC21").attr("stroke-width", 3).attr("d", lineWeight)

    // Add fat line
    g.append("path").datum(filteredData).attr("fill", "none").attr("stroke", "#8FE9D0").attr("stroke-width", 3).attr("d", lineFat)

    // Add dots for weight
    g.selectAll(".dot-weight")
      .data(filteredData)
      .enter()
      .append("circle")
      .attr("class", "dot-weight")
      .attr("cx", (d) => x(d.date) as number)
      .attr("cy", (d) => yWeight(d.weight))
      .attr("r", 4)
      .attr("fill", "#FFCC21")

    // Add dots for fat
    g.selectAll(".dot-fat")
      .data(filteredData)
      .enter()
      .append("circle")
      .attr("class", "dot-fat")
      .attr("cx", (d) => x(d.date) as number)
      .attr("cy", (d) => yFat(d.fat))
      .attr("r", 4)
      .attr("fill", "#8FE9D0")

    // Optional: Add small date labels at the bottom without full axis
    g.selectAll(".date-label")
      .data(filteredData)
      .enter()
      .append("text")
      .attr("class", "date-label")
      .attr("x", (d) => x(d.date) as number)
      .attr("y", height + 15)
      .attr("text-anchor", "middle")
      .attr("fill", "white")
      .style("font-family", "Hiragino Kaku Gothic Pro, Hiragino Sans, sans-serif")
      .style("font-size", "10px")
      .style("opacity", 0.7)
      .text((d) => d.date)
  }, [filteredData, title, margin])

  // Labels for buttons
  const viewModeLabels: Record<ViewMode, string> = {
    day: "日",
    week: "週",
    month: "月",
    year: "年"
  }

  return (
    <div className={`chart-container w-full h-full bg-[#2E2E2E] flex flex-col ${className}`}>
      {title && (
        <div className="flex justify-between items-center mb-4">
          <div className="text-white text-lg">{title}</div>
        </div>
      )}
      <div className="flex-grow">
        <svg ref={svgRef} width="100%" height="100%" />
      </div>

      {isFilter && (
        <div className="flex gap-2 mt-[20px]">
          {(Object.keys(viewModeLabels) as ViewMode[]).map((mode) => (
            <button
              key={mode}
              className={`${viewMode === mode ? "bg-[#FFCC21] text-white" : "bg-white text-[#FFCC21]"} rounded-full px-4 py-1 text-sm transition-colors`}
              onClick={() => setViewMode(mode)}
              aria-label={`View by ${mode}`}
            >
              {viewModeLabels[mode]}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
