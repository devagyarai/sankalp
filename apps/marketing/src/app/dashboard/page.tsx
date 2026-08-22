"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { NBABanner } from "@/components/nba-banner"
import { FocusWidget } from "@/components/focus-widget"
import { determineNextBestAction, Task } from "@/lib/nba-engine"
import { GlassCard } from "@/components/ui/glass-card"
import { Activity, BookOpen, AlertTriangle } from "lucide-react"
import mockData from "@/data/focus-mock.json"

export default function Home() {
  const tasks = mockData.tasks as Task[];
  const nba = determineNextBestAction(tasks);
  
  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Intelligence Header */}
        <div className="space-y-2 mb-8">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
            Situation Overview
          </h2>
          <p className="text-muted-foreground flex items-center gap-2">
            <Activity className="w-4 h-4 text-green-400" /> 
            System active. {tasks.length} tasks analyzed. 1 critical risk detected.
          </p>
        </div>

        {/* Next Best Action Banner */}
        <NBABanner nba={nba} onActionStart={(id) => console.log('Started', id)} />

        {/* Domain Widgets Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          
          {/* FOCUS Domain (Study Planning) */}
          <div className="lg:col-span-2">
            <FocusWidget tasks={tasks} />
          </div>

          {/* Placeholder for PULSE / NEXUS */}
          <div className="space-y-6">
            <GlassCard className="border-border/50 bg-card/30">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="w-5 h-5 text-yellow-500" />
                <h3 className="font-semibold text-lg">PULSE WARNING</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Your performance in DBMS has dropped slightly over the last 2 weeks. Combined with the upcoming exam, this represents your highest current academic risk.
              </p>
            </GlassCard>

            <GlassCard className="border-border/50 bg-card/30 opacity-60">
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <div className="w-12 h-12 rounded-full border border-dashed border-muted-foreground/30 flex items-center justify-center mb-3">
                  <BookOpen className="w-5 h-5 text-muted-foreground/50" />
                </div>
                <h3 className="font-medium text-sm text-muted-foreground">Trajectory Domain</h3>
                <p className="text-xs text-muted-foreground/70 mt-1">Awaiting more career signals</p>
              </div>
            </GlassCard>
          </div>
          
        </div>

      </div>
    </DashboardLayout>
  )
}
