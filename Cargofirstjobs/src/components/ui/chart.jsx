import * as React from "react"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, LineChart, Line, PieChart, Pie, Cell, Legend } from "recharts"
import { cn } from "../../lib/utils"

const ChartContainer = ({ className, children, ...props }) => (
  <div className={cn("w-full", className)} {...props}>
    <ResponsiveContainer width="100%" height={350}>
      {children}
    </ResponsiveContainer>
  </div>
)

const ChartTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border bg-background p-2 shadow-md">
        <div className="grid gap-2">
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: entry.color }} />
              <span className="text-sm font-medium">{entry.name}:</span>
              <span className="text-sm font-bold">{entry.value}</span>
            </div>
          ))}
        </div>
      </div>
    )
  }
  return null
}

export { ChartContainer, ChartTooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line, PieChart, Pie, Cell, Legend }

