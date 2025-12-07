"use client"

import type React from "react"

import { RoyaltiesCalculator } from "@/components/dashboard/royalties-calculator"
import { RegionalTop10 } from "@/components/dashboard/regional-top-10"
import { ChurnRisk } from "@/components/dashboard/churn-risk"
import { AudienceDemographics } from "@/components/dashboard/audience-demographics"
import { SuperFans } from "@/components/dashboard/super-fans"
import { Music2, BarChart3, Users, AlertTriangle, Trophy } from "lucide-react"

export function AppleMusicDashboard() {
  return (
    <div className="min-h-screen bg-[#000000] text-white">
      {/* Header */}
      <header className="border-b border-white/10 bg-[#1c1c1e]/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#fa2d48] to-[#a833b9] flex items-center justify-center">
              <Music2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-semibold tracking-tight">Apple Music Analytics</h1>
              <p className="text-sm text-white/50">Panel de Administración</p>
            </div>
          </div>
        </div>
      </header>

      {/* Dashboard Grid */}
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {/* Calculadora de Regalías - Grande */}
          <div className="xl:col-span-2">
            <DashboardCard
              title="Calculadora de Regalías"
              subtitle="Artista vs Horas Totales Reproducidas"
              icon={<BarChart3 className="w-5 h-5" />}
            >
              <RoyaltiesCalculator />
            </DashboardCard>
          </div>

          {/* Top 10 Regional */}
          <div className="row-span-2">
            <DashboardCard
              title="Top 10 Regional"
              subtitle="Canciones populares en Guatemala"
              icon={<Trophy className="w-5 h-5 text-amber-400" />}
              className="h-full"
            >
              <RegionalTop10 />
            </DashboardCard>
          </div>

          {/* Demografía de Audiencia */}
          <DashboardCard
            title="Demografía de Audiencia"
            subtitle="Distribución por edad - Oyentes de Reggaeton"
            icon={<Users className="w-5 h-5 text-blue-400" />}
          >
            <AudienceDemographics />
          </DashboardCard>

          {/* Super Fans */}
          <DashboardCard
            title="Super Fans"
            subtitle="Top oyentes de Bad Bunny por canciones únicas"
            icon={<Trophy className="w-5 h-5 text-pink-400" />}
          >
            <SuperFans />
          </DashboardCard>

          {/* Riesgo de Abandono - Ancho completo */}
          <div className="xl:col-span-3">
            <DashboardCard
              title="Riesgo de Abandono"
              subtitle="Usuarios Zombie - Premium sin actividad"
              icon={<AlertTriangle className="w-5 h-5 text-red-400" />}
              variant="danger"
            >
              <ChurnRisk />
            </DashboardCard>
          </div>
        </div>
      </div>
    </div>
  )
}

function DashboardCard({
  title,
  subtitle,
  icon,
  children,
  variant = "default",
  className = "",
}: {
  title: string
  subtitle: string
  icon: React.ReactNode
  children: React.ReactNode
  variant?: "default" | "danger"
  className?: string
}) {
  return (
    <div
      className={`
        rounded-2xl border backdrop-blur-xl p-6
        ${variant === "danger" ? "bg-red-500/5 border-red-500/20" : "bg-[#1c1c1e]/60 border-white/10"}
        ${className}
      `}
    >
      <div className="flex items-center gap-3 mb-6">
        <div
          className={`
          w-10 h-10 rounded-xl flex items-center justify-center
          ${variant === "danger" ? "bg-red-500/20" : "bg-white/10"}
        `}
        >
          {icon}
        </div>
        <div>
          <h2 className="font-semibold text-white">{title}</h2>
          <p className="text-sm text-white/50">{subtitle}</p>
        </div>
      </div>
      {children}
    </div>
  )
}
