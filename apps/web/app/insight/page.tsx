"use client"

import { useState } from "react"
import { StitchDomainShell } from "@/components/stitch/stitch-domain-shell"
import { StitchDomainHeader } from "@/components/stitch/stitch-domain-header"
import { StitchGlassCard } from "@/components/stitch/stitch-glass-card"
import { Activity, ArrowDownRight, ArrowUpRight, Loader2, BarChart2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

type TrendState = 'AWAITING' | 'FETCHING' | 'VISIBLE'

export default function InsightPage() {
  const [trendState, setTrendState] = useState<TrendState>('AWAITING')

  const handleFetchTrends = () => {
    if (trendState !== 'AWAITING') return
    setTrendState('FETCHING')
    setTimeout(() => {
      setTrendState('VISIBLE')
    }, 2500)
  }

  // Mock data for the chart
  const chartData = [
    { label: "W1", value: 40 },
    { label: "W2", value: 55 },
    { label: "W3", value: 45 },
    { label: "W4", value: 70 },
    { label: "W5", value: 65 },
    { label: "W6", value: 85 },
    { label: "W7", value: 92 },
  ]

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
        <div className={`p-8 rounded-2xl bg-zinc-950/50 border min-h-[400px] flex flex-col relative overflow-hidden transition-colors duration-500 ${trendState === 'VISIBLE' ? 'border-[#00e676]/50 shadow-[0_0_40px_rgba(0,230,118,0.15)]' : 'border-zinc-900'}`}>
           {/* Grid Pattern overlay */}
           <div className="absolute inset-0 pointer-events-none opacity-5 z-0" 
                style={{ backgroundImage: 'linear-gradient(#00e676 1px, transparent 1px), linear-gradient(90deg, #00e676 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
           />
           
           <div className="relative z-10 flex items-center justify-between mb-8">
              <h3 className="text-xl font-black text-white tracking-widest uppercase flex items-center gap-3">
                 <div className="p-2 rounded-xl bg-[#00e676]/10 border border-[#00e676]/30">
                   {trendState === 'VISIBLE' ? <BarChart2 className="w-5 h-5 text-[#00e676]" /> : <Activity className="w-5 h-5 text-[#00e676]" />}
                 </div>
                 Performance Trends
              </h3>
              <button 
                onClick={handleFetchTrends}
                disabled={trendState !== 'AWAITING'}
                className={`px-5 py-2.5 text-xs font-black tracking-widest uppercase rounded-xl transition-all duration-300 ${
                  trendState === 'AWAITING' 
                    ? 'bg-zinc-900 hover:bg-[#00e676] hover:text-black border border-zinc-700 hover:border-[#00e676] text-white' 
                    : trendState === 'FETCHING'
                      ? 'bg-[#00e676]/10 border border-[#00e676]/30 text-[#00e676] cursor-wait'
                      : 'bg-[#00e676] text-black border border-[#00e676] shadow-[0_0_15px_rgba(0,230,118,0.5)] cursor-default'
                }`}
              >
                {trendState === 'AWAITING' && 'Fetch Telemetry'}
                {trendState === 'FETCHING' && <span className="flex items-center gap-2"><Loader2 className="w-4 h-4 animate-spin" /> Syncing...</span>}
                {trendState === 'VISIBLE' && 'Live Connection'}
              </button>
           </div>
           
           <div className="flex-1 flex flex-col items-center justify-center text-center relative z-10 w-full">
              
              <AnimatePresence mode="wait">
                {trendState === 'AWAITING' && (
                  <motion.div 
                    key="awaiting"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="flex flex-col items-center"
                  >
                    <div className="w-16 h-16 rounded-full border border-dashed border-[#00e676]/50 flex items-center justify-center mb-6">
                       <Activity className="w-6 h-6 text-[#00e676]/50" />
                    </div>
                    <h4 className="text-lg font-bold text-white mb-2 tracking-wide">AWAITING SUFFICIENT DATA</h4>
                    <p className="text-sm font-medium text-zinc-500 max-w-md">
                      Trend graphs will populate here automatically once enough academic signals have been logged into the SANKALP intelligence layer.
                    </p>
                  </motion.div>
                )}

                {trendState === 'FETCHING' && (
                  <motion.div 
                    key="fetching"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.1 }}
                    className="flex flex-col items-center"
                  >
                    <div className="relative w-24 h-24 flex items-center justify-center">
                       <motion.div 
                         animate={{ rotate: 360 }} 
                         transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                         className="absolute inset-0 rounded-full border-b-2 border-l-2 border-[#00e676]"
                       />
                       <motion.div 
                         animate={{ rotate: -360 }} 
                         transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                         className="absolute inset-4 rounded-full border-t-2 border-r-2 border-[#00e676]/50"
                       />
                       <span className="text-[#00e676] font-mono font-bold">...</span>
                    </div>
                  </motion.div>
                )}

                {trendState === 'VISIBLE' && (
                  <motion.div 
                    key="visible"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full h-full flex flex-col justify-end pt-10"
                  >
                    <div className="flex items-end justify-between h-[250px] w-full px-4 gap-2">
                      {chartData.map((d, i) => (
                        <div key={d.label} className="flex flex-col items-center flex-1 group">
                          {/* Value Tooltip */}
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity mb-2 text-[#00e676] font-mono font-bold text-xs bg-[#00e676]/10 px-2 py-1 rounded border border-[#00e676]/30">
                            {d.value}%
                          </div>
                          {/* Bar */}
                          <div className="w-full max-w-[60px] bg-zinc-900 rounded-t-lg border-t border-l border-r border-[#00e676]/20 relative overflow-hidden group-hover:border-[#00e676]/60 transition-colors">
                            <motion.div 
                              initial={{ height: 0 }}
                              animate={{ height: `${d.value}%` }}
                              transition={{ duration: 1, delay: i * 0.1, ease: "easeOut" }}
                              className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-[#00e676]/20 to-[#00e676] shadow-[0_0_15px_rgba(0,230,118,0.5)]"
                            />
                          </div>
                          {/* Label */}
                          <div className="mt-4 text-xs font-bold text-zinc-500 uppercase tracking-widest group-hover:text-white transition-colors">
                            {d.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

           </div>
        </div>

      </div>
    </StitchDomainShell>
  )
}
