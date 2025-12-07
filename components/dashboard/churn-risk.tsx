"use client"

import { AlertCircle, Clock, CreditCard, Calendar } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const zombieUsers = [
  {
    id: "USR-001",
    name: "Carlos Mendoza",
    email: "c.mendoza@email.com",
    plan: "Individual",
    lastActive: "45 días",
    monthlyFee: "Q79.99",
    riskLevel: "critical",
  },
  {
    id: "USR-002",
    name: "María García",
    email: "m.garcia@email.com",
    plan: "Familiar",
    lastActive: "38 días",
    monthlyFee: "Q129.99",
    riskLevel: "critical",
  },
  {
    id: "USR-003",
    name: "Roberto Pérez",
    email: "r.perez@email.com",
    plan: "Individual",
    lastActive: "32 días",
    monthlyFee: "Q79.99",
    riskLevel: "high",
  },
  {
    id: "USR-004",
    name: "Ana Lucía Morales",
    email: "a.morales@email.com",
    plan: "Estudiante",
    lastActive: "28 días",
    monthlyFee: "Q49.99",
    riskLevel: "high",
  },
  {
    id: "USR-005",
    name: "Diego Ramírez",
    email: "d.ramirez@email.com",
    plan: "Individual",
    lastActive: "25 días",
    monthlyFee: "Q79.99",
    riskLevel: "medium",
  },
]

const riskColors = {
  critical: "bg-red-500/20 text-red-400 border-red-500/30",
  high: "bg-orange-500/20 text-orange-400 border-orange-500/30",
  medium: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
}

const riskLabels = {
  critical: "Crítico",
  high: "Alto",
  medium: "Medio",
}

export function ChurnRisk() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-red-500/20">
            <th className="text-left py-3 px-4 text-xs font-medium text-white/50 uppercase tracking-wider">Usuario</th>
            <th className="text-left py-3 px-4 text-xs font-medium text-white/50 uppercase tracking-wider">Plan</th>
            <th className="text-left py-3 px-4 text-xs font-medium text-white/50 uppercase tracking-wider">
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                Sin Actividad
              </div>
            </th>
            <th className="text-left py-3 px-4 text-xs font-medium text-white/50 uppercase tracking-wider">
              <div className="flex items-center gap-1">
                <CreditCard className="w-3 h-3" />
                Tarifa Mensual
              </div>
            </th>
            <th className="text-left py-3 px-4 text-xs font-medium text-white/50 uppercase tracking-wider">
              Nivel de Riesgo
            </th>
          </tr>
        </thead>
        <tbody>
          {zombieUsers.map((user) => (
            <tr key={user.id} className="border-b border-white/5 hover:bg-red-500/5 transition-colors">
              <td className="py-4 px-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                    <AlertCircle className="w-5 h-5 text-red-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{user.name}</p>
                    <p className="text-xs text-white/40">{user.email}</p>
                  </div>
                </div>
              </td>
              <td className="py-4 px-4">
                <span className="text-sm text-white/70">{user.plan}</span>
              </td>
              <td className="py-4 px-4">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-red-400" />
                  <span className="text-sm font-medium text-red-400">{user.lastActive}</span>
                </div>
              </td>
              <td className="py-4 px-4">
                <span className="text-sm text-white/70 font-mono">{user.monthlyFee}</span>
              </td>
              <td className="py-4 px-4">
                <Badge variant="outline" className={`${riskColors[user.riskLevel as keyof typeof riskColors]} border`}>
                  {riskLabels[user.riskLevel as keyof typeof riskLabels]}
                </Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center gap-3">
        <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
        <p className="text-sm text-red-300">
          <span className="font-semibold">{zombieUsers.length} usuarios Premium</span> sin actividad generan un riesgo
          de pérdida de <span className="font-semibold">Q419.95/mes</span>
        </p>
      </div>
    </div>
  )
}
