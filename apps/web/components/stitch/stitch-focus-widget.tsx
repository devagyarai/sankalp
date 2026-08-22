"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { BookOpen } from "lucide-react"
import { IntelligenceRecommendationSchema } from "@/types/intelligence"
import { StitchGlassCard } from "./stitch-glass-card"
import { cn } from "@/lib/utils"

interface FocusWidgetProps {
  recommendations: IntelligenceRecommendationSchema[]
}

export function StitchFocusWidget({ recommendations }: FocusWidgetProps) {
  const focusRecs = recommendations
    .filter(r => r.domain.toLowerCase() === 'focus')
    .sort((a, b) => b.confidence - a.confidence)

  return (
    <StitchGlassCard className="h-full border-[#00e5ff]/20">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-[#00e5ff]/10 border border-[#00e5ff]/30 shadow-[0_0_15px_rgba(0,229,255,0.2)]">
            <BookOpen className="w-5 h-5 text-[#00e5ff]" />
          </div>
          <h3 className="font-black text-lg text-white tracking-widest uppercase">EXPLORE DOMAIN</h3>
        </div>
        <span className="px-3 py-1 rounded-full bg-[#00e5ff]/10 border border-[#00e5ff]/30 text-[#00e5ff] text-xs font-bold uppercase tracking-widest">
          Study Execution
        </span>
      </div>

      <div className="space-y-4">
        {focusRecs.length === 0 ? (
          <div className="text-sm text-zinc-500 font-medium p-4 text-center border border-dashed border-zinc-800 rounded-xl">No cosmic anomalies detected in this sector.</div>
        ) : focusRecs.map((rec, idx) => {
          const isCritical = rec.priority === "critical";
          const progress = rec.confidence * 100;
          
          return (
            <motion.div
              key={rec.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.4 }}
              className="p-5 rounded-2xl bg-zinc-950/50 border border-zinc-800 hover:bg-black hover:border-[#00e5ff]/30 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,229,255,0.1)] hover:-translate-y-1 group relative overflow-hidden"
            >
              {isCritical && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500/80 shadow-[0_0_15px_rgba(239,68,68,0.8)]" />
              )}
              
              <div className="flex justify-between items-start mb-3 ml-2">
                <h4 className={cn("font-bold text-base", isCritical ? "text-red-400" : "text-white")}>
                  {rec.title}
                </h4>
                <span className={cn(
                  "px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-widest border",
                  isCritical ? "bg-red-500/10 text-red-400 border-red-500/30" : 
                  rec.priority === "high" ? "bg-[#ffc400]/10 text-[#ffc400] border-[#ffc400]/30" : 
                  "bg-[#00e5ff]/10 text-[#00e5ff] border-[#00e5ff]/30"
                )}>
                  {rec.priority} Priority
                </span>
              </div>
              
              <div className="text-xs text-zinc-400 font-medium ml-2 mb-4 leading-relaxed">
                {rec.reason}
              </div>

              {/* Progress Bar (mapped to confidence) */}
              <div className="ml-2 h-2 w-full bg-zinc-900 rounded-full overflow-hidden relative border border-zinc-800">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: `${progress}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 + (idx * 0.1) }}
                  className={cn(
                    "absolute top-0 left-0 h-full rounded-full",
                    isCritical ? "bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.8)]" : "bg-[#00e5ff] shadow-[0_0_15px_rgba(0,229,255,0.8)]"
                  )}
                />
              </div>
            </motion.div>
          )
        })}
      </div>
    </StitchGlassCard>
  )
}
