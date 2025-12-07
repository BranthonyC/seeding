"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts"

const data = [
  { name: "18-24", value: 35, color: "#fa2d48" },
  { name: "25-34", value: 28, color: "#a833b9" },
  { name: "13-17", value: 18, color: "#ff6b6b" },
  { name: "35-44", value: 12, color: "#ff9f43" },
  { name: "45+", value: 7, color: "#54a0ff" },
]

export function AudienceDemographics() {
  return (
    <div className="h-[280px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={3}
            dataKey="value"
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: "#1c1c1e",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "12px",
              boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
            }}
            labelStyle={{ color: "white", fontWeight: 600 }}
            itemStyle={{ color: "rgba(255,255,255,0.7)" }}
            formatter={(value: number) => [`${value}%`, "Oyentes"]}
          />
          <Legend
            verticalAlign="bottom"
            height={36}
            formatter={(value) => <span className="text-white/70 text-sm">{value} años</span>}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="text-center -mt-2">
        <span className="text-xs text-white/40">Género: Reggaeton</span>
      </div>
    </div>
  )
}
