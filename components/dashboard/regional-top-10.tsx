"use client"

import { Play } from "lucide-react"

const topSongs = [
  { rank: 1, title: "Monaco", artist: "Bad Bunny", plays: 2_845_000 },
  { rank: 2, title: "TQG", artist: "Karol G, Shakira", plays: 2_634_000 },
  { rank: 3, title: "Ella Baila Sola", artist: "Eslabon Armado, Peso Pluma", plays: 2_412_000 },
  { rank: 4, title: "Despechá", artist: "Rosalía", plays: 2_198_000 },
  { rank: 5, title: "Bzrp Music Sessions #53", artist: "Bizarrap, Shakira", plays: 2_087_000 },
  { rank: 6, title: "Classy 101", artist: "Feid, Young Miko", plays: 1_923_000 },
  { rank: 7, title: "La Bebe", artist: "Yng Lvcas, Peso Pluma", plays: 1_845_000 },
  { rank: 8, title: "Cupido", artist: "Tini", plays: 1_734_000 },
  { rank: 9, title: "Efecto", artist: "Bad Bunny", plays: 1_623_000 },
  { rank: 10, title: "Provenza", artist: "Karol G", plays: 1_512_000 },
]

export function RegionalTop10() {
  const formatPlays = (plays: number) => {
    if (plays >= 1_000_000) return `${(plays / 1_000_000).toFixed(1)}M`
    if (plays >= 1_000) return `${(plays / 1_000).toFixed(0)}K`
    return plays.toString()
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 mb-4 px-2">
        <span className="text-2xl">🇬🇹</span>
        <span className="text-sm font-medium text-white/70">Guatemala</span>
      </div>
      <div className="space-y-1">
        {topSongs.map((song) => (
          <div
            key={song.rank}
            className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 transition-colors group cursor-pointer"
          >
            <span
              className={`
                w-6 text-center text-sm font-semibold
                ${song.rank <= 3 ? "text-amber-400" : "text-white/40"}
              `}
            >
              {song.rank}
            </span>
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#fa2d48]/20 to-[#a833b9]/20 flex items-center justify-center group-hover:from-[#fa2d48] group-hover:to-[#a833b9] transition-all">
              <Play className="w-4 h-4 text-white/60 group-hover:text-white transition-colors" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{song.title}</p>
              <p className="text-xs text-white/50 truncate">{song.artist}</p>
            </div>
            <span className="text-xs font-medium text-white/40 tabular-nums">{formatPlays(song.plays)}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
