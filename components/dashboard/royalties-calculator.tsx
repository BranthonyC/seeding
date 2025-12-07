"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts"

const data = [
  { artist: "Bad Bunny", hours: 45230, color: "#fa2d48" },
  { artist: "Karol G", hours: 38420, color: "#a833b9" },
  { artist: "Peso Pluma", hours: 32100, color: "#ff6b6b" },
  { artist: "Feid", hours: 28900, color: "#ff9f43" },
  { artist: "Shakira", hours: 25600, color: "#ee5a9b" },
  { artist: "J Balvin", hours: 22400, color: "#5f27cd" },
  { artist: "Rauw Alejandro", hours: 19800, color: "#00d2d3" },
  { artist: "Myke Towers", hours: 17200, color: "#54a0ff" },
]

export function RoyaltiesCalculator() {
  const formatHours = (value: number) => `${(value / 1000).toFixed(1)}K hrs`

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ top: 0, right: 30, left: 80, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" horizontal={false} />
          <XAxis
            type="number"
            tickFormatter={formatHours}
            tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 12 }}
            axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
            tickLine={{ stroke: "rgba(255,255,255,0.1)" }}
          />
          <YAxis
            type="category"
            dataKey="artist"
            tick={{ fill: "rgba(255,255,255,0.8)", fontSize: 13 }}
            axisLine={false}
            tickLine={false}
            width={75}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1c1c1e",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "12px",
              boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
            }}
            labelStyle={{ color: "white", fontWeight: 600 }}
            itemStyle={{ color: "rgba(255,255,255,0.7)" }}
            formatter={(value: number) => [`${value.toLocaleString()} horas`, "Reproducidas"]}
          />
          <Bar dataKey="hours" radius={[0, 8, 8, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
