"use client"

import { DomainShell } from "@/components/domain/shell"
import { DomainHeader } from "@/components/domain/header"
import { LivingCard } from "@/components/ui/living-card"
import { EmptyState } from "@/components/ui/empty-state"
import { Activity, ArrowDownRight, ArrowUpRight } from "lucide-react"

export default function InsightPage() {
  return (
    <DomainShell domainId="insight">
      <DomainHeader 
        domainId="insight"
        title="Understand the signals behind your performance."
        description="Monitor your academic trajectory and detect meaningful early-warning signals before they become problems."
      />
      
      <div className="flex-1 space-y-6">
        
        {/* Signals Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <LivingCard glowColor="white" className="justify-between">
              <div className="text-sm font-medium text-muted-foreground mb-4">Overall Academic Pulse</div>
              <div className="flex items-end justify-between">
                 <div className="text-3xl font-bold text-white">Stable</div>
                 <div className="flex items-center gap-1 text-emerald-400 text-sm font-medium">
                   <ArrowUpRight className="w-4 h-4" /> 2%
                 </div>
              </div>
           </LivingCard>

           <LivingCard glowColor="amber" className="bg-amber-500/5 border-amber-500/20 group">
              <div className="text-sm font-medium text-amber-500/80 mb-4 flex items-center gap-2 relative z-10">
                <Activity className="w-4 h-4" />
                Attention Required
              </div>
              <div className="flex items-end justify-between relative z-10">
                 <div className="text-2xl font-bold text-white group-hover:text-amber-50 transition-colors">Database Systems</div>
                 <div className="flex items-center gap-1 text-amber-400 text-sm font-medium">
                   <ArrowDownRight className="w-4 h-4" /> Dropping
                 </div>
              </div>
           </LivingCard>

           <LivingCard glowColor="white" className="justify-between">
              <div className="text-sm font-medium text-muted-foreground mb-4">Strongest Area</div>
              <div className="flex items-end justify-between">
                 <div className="text-2xl font-bold text-white">Data Structures</div>
                 <div className="flex items-center gap-1 text-emerald-400 text-sm font-medium">
                   <ArrowUpRight className="w-4 h-4" /> Peak
                 </div>
              </div>
           </LivingCard>
        </div>

        {/* Trend Visualization Placeholder */}
        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 min-h-[400px] flex flex-col">
           <div className="flex items-center justify-between mb-8">
              <h3 className="text-lg font-semibold text-white">Performance Trends</h3>
              <button className="px-4 py-2 text-sm font-medium rounded-full bg-white/5 hover:bg-white/10 transition-colors text-white">
                View Detailed Performance
              </button>
           </div>
           
           <div className="flex-1">
              <EmptyState
                icon={Activity}
                title="Awaiting sufficient data"
                description="Trend graphs will populate here automatically once enough academic signals have been logged into the SANKALP intelligence layer."
                domainColorClass="text-amber-500"
                className="p-0"
              />
           </div>
        </div>

      </div>
    </DomainShell>
  )
}
