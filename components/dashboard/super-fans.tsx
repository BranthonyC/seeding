"use client"

import { Crown, Music, Star } from "lucide-react"

const superFans = [
  { rank: 1, username: "@reggaeton_lover_gt", uniqueSongs: 156, totalHours: 342 },
  { rank: 2, username: "@maria_music22", uniqueSongs: 142, totalHours: 298 },
  { rank: 3, username: "@carlos_beats", uniqueSongs: 138, totalHours: 276 },
  { rank: 4, username: "@andrea_vibes", uniqueSongs: 125, totalHours: 234 },
  { rank: 5, username: "@luisfer_502", uniqueSongs: 118, totalHours: 215 },
]

const rankIcons = {
  1: <Crown className="w-5 h-5 text-amber-400" />,
  2: <Star className="w-5 h-5 text-gray-300" />,
  3: <Star className="w-5 h-5 text-amber-700" />,
}

const rankColors = {
  1: "from-amber-500/30 to-orange-500/30 border-amber-500/40",
  2: "from-gray-400/20 to-gray-500/20 border-gray-400/30",
  3: "from-amber-700/20 to-orange-700/20 border-amber-700/30",
}

export function SuperFans() {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#fa2d48] to-[#a833b9] flex items-center justify-center">
          <Music className="w-4 h-4 text-white" />
        </div>
        <span className="text-sm font-medium text-white/70">Artista: Bad Bunny</span>
      </div>

      {superFans.map((fan) => (
        <div
          key={fan.rank}
          className={`
            flex items-center gap-4 p-3 rounded-xl border transition-all hover:scale-[1.02]
            ${
              fan.rank <= 3
                ? `bg-gradient-to-r ${rankColors[fan.rank as keyof typeof rankColors]}`
                : "bg-white/5 border-white/10"
            }
          `}
        >
          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
            {rankIcons[fan.rank as keyof typeof rankIcons] || (
              <span className="text-sm font-bold text-white/50">{fan.rank}</span>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">{fan.username}</p>
            <p className="text-xs text-white/40">{fan.totalHours} horas totales</p>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-pink-400">{fan.uniqueSongs}</p>
            <p className="text-xs text-white/40">canciones</p>
          </div>
        </div>
      ))}
    </div>
  )
}
