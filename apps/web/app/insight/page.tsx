"use client"

import { StitchDomainShell } from "@/components/stitch/stitch-domain-shell"
import { StitchDomainHeader } from "@/components/stitch/stitch-domain-header"
import { StitchGlassCard } from "@/components/stitch/stitch-glass-card"
import { Activity, ArrowDownRight, ArrowUpRight } from "lucide-react"

export default function StitchInsightPage() {
  return (
    <StitchDomainShell domainId="insight">
      <StitchDomainHeader 
        domainId="insight"
        title="Understand the signals behind your performance."
        description="Monitor your academic trajectory and detect meaningful early-warning signals before they become problems."
      />
      
      <div className="flex-1 space-y-6">
        
        {/* Signals Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <StitchGlassCard className="flex flex-col justify-between border-[#00e676]/20 hover:border-[#00e676]/40 hover:shadow-[0_0_30px_rgba(0,230,118,0.15)]">
              <div className="text-xs font-bold tracking-widest uppercase text-zinc-500 mb-4">Overall Academic Pulse</div>
              <div className="flex items-end justify-between">
                 <div className="text-3xl font-black text-white uppercase">Stable</div>
                 <div className="flex items-center gap-1 text-[#00e676] text-xs font-bold uppercase tracking-widest bg-[#00e676]/10 px-2 py-1 rounded-md border border-[#00e676]/30">
                   <ArrowUpRight className="w-3 h-3" /> 2%
                 </div>
              </div>
           </StitchGlassCard>

           <StitchGlassCard className="flex flex-col justify-between border-red-500/30 bg-red-500/5 hover:border-red-500/50 hover:shadow-[0_0_30px_rgba(239,68,68,0.2)]">
              <div className="text-xs font-bold tracking-widest uppercase text-red-400 mb-4 flex items-center gap-2">
                <Activity className="w-4 h-4" />
                Attention Required
              </div>
              <div className="flex items-end justify-between">
                 <div className="text-xl font-black text-white truncate pr-2">Database Systems</div>
                 <div className="flex items-center gap-1 text-red-400 text-xs font-bold uppercase tracking-widest bg-red-500/10 px-2 py-1 rounded-md border border-red-500/30">
                   <ArrowDownRight className="w-3 h-3" /> Drop
                 </div>
              </div>
           </StitchGlassCard>

           <StitchGlassCard className="flex flex-col justify-between border-[#00e676]/20 hover:border-[#00e676]/40 hover:shadow-[0_0_30px_rgba(0,230,118,0.15)]">
              <div className="text-xs font-bold tracking-widest uppercase text-zinc-500 mb-4">Strongest Area</div>
              <div className="flex items-end justify-between">
                 <div className="text-xl font-black text-white truncate pr-2">Data Structures</div>
                 <div className="flex items-center gap-1 text-[#00e676] text-xs font-bold uppercase tracking-widest bg-[#00e676]/10 px-2 py-1 rounded-md border border-[#00e676]/30">
                   <ArrowUpRight className="w-3 h-3" /> Peak
                 </div>
              </div>
           </StitchGlassCard>
        </div>

        {/* Trend Visualization Placeholder */}
        <div className="p-8 rounded-2xl bg-zinc-950/50 border border-zinc-900 min-h-[400px] flex flex-col relative overflow-hidden">
           {/* Grid Pattern overlay */}
           <div className="absolute inset-0 pointer-events-none opacity-5 z-0" 
                style={{ backgroundImage: 'linear-gradient(#00e676 1px, transparent 1px), linear-gradient(90deg, #00e676 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
           />
           
           <div className="relative z-10 flex items-center justify-between mb-8">
              <h3 className="text-xl font-black text-white tracking-widest uppercase flex items-center gap-3">
                 <div className="p-2 rounded-xl bg-[#00e676]/10 border border-[#00e676]/30">
                   <Activity className="w-5 h-5 text-[#00e676]" />
                 </div>
                 Performance Trends
              </h3>
              <button className="px-5 py-2.5 text-xs font-black tracking-widest uppercase rounded-xl bg-zinc-900 hover:bg-[#00e676] hover:text-black border border-zinc-700 hover:border-[#00e676] transition-all duration-300 text-white">
                Detailed View
              </button>
           </div>
           
           <div className="flex-1 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 rounded-full border border-dashed border-[#00e676]/50 flex items-center justify-center mb-6">
                 <Activity className="w-6 h-6 text-[#00e676]/50" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2 tracking-wide">AWAITING SUFFICIENT DATA</h4>
              <p className="text-sm font-medium text-zinc-500 max-w-md">
                Trend graphs will populate here automatically once enough academic signals have been logged into the SANKALP intelligence layer.
              </p>
           </div>
        </div>

      </div>
    </StitchDomainShell>
  )
}
