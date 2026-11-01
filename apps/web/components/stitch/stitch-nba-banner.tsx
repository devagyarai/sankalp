"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { AlertTriangle, ArrowRight, Play } from "lucide-react"
import { IntelligenceRecommendationSchema } from "@/types/intelligence"
import { StitchGlassCard } from "./stitch-glass-card"

interface StitchNBABannerProps {
  nba: IntelligenceRecommendationSchema | null
  onActionStart: (actionUrl: string) => void
}

export function StitchNBABanner({ nba, onActionStart }: StitchNBABannerProps) {
  const [dismissed, setDismissed] = React.useState(false);

  if (!nba || dismissed) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <StitchGlassCard className="border-[#00e5ff]/50 ring-1 ring-[#00e5ff]/20">
        {/* Glow Effect Background */}
        <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-[#00e5ff]/20 blur-[60px] pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 h-48 w-48 rounded-full bg-[#b042ff]/20 blur-[60px] pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
          <div className="space-y-4 flex-1">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/50 text-red-400 text-xs font-bold uppercase tracking-widest animate-pulse">
                <AlertTriangle className="w-3 h-3" />
                Critical Priority
              </span>
              <span className="text-sm text-zinc-500 font-bold uppercase tracking-widest">
                {nba.domain} Domain
              </span>
            </div>
            
            <div>
              <h2 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#00e5ff] to-[#b042ff] mb-2 drop-shadow-[0_0_10px_rgba(0,229,255,0.3)]">
                {nba.title}
              </h2>
              <p className="text-zinc-400 font-medium leading-relaxed max-w-2xl">
                {nba.reason}
              </p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto mt-4 md:mt-0">
            <button 
              onClick={() => onActionStart(nba.action_url || "#")}
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#00e5ff] hover:bg-[#00c9e0] text-black font-black uppercase tracking-wider transition-all duration-300 hover:scale-[1.02] shadow-[0_0_20px_rgba(0,229,255,0.4)] hover:shadow-[0_0_30px_rgba(0,229,255,0.6)] cursor-pointer"
            >
              <Play className="w-4 h-4" fill="currentColor" />
              Engage Protocol
            </button>
            <button 
              onClick={() => setDismissed(true)}
              className="group flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-zinc-700 bg-zinc-900/50 hover:bg-zinc-800 text-zinc-300 font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer"
            >
              Acknowledge
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#00e5ff]" />
            </button>
          </div>
        </div>
      </StitchGlassCard>
    </motion.div>
  )
}
