"use client"

import { useState, useEffect } from "react"
import { StitchDomainShell } from "@/components/stitch/stitch-domain-shell"
import { StitchDomainHeader } from "@/components/stitch/stitch-domain-header"
import { StitchFocusWidget } from "@/components/stitch/stitch-focus-widget"
import { StitchNBABanner } from "@/components/stitch/stitch-nba-banner"
import { StitchGlassCard } from "@/components/stitch/stitch-glass-card"
import { PieChart, Play, Square, Pause, Loader2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function StitchExplorePage() {
  const [sessionState, setSessionState] = useState<'IDLE' | 'ACTIVE' | 'PAUSED'>('IDLE')
  const [timeElapsed, setTimeElapsed] = useState(0)

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (sessionState === 'ACTIVE') {
      interval = setInterval(() => {
        setTimeElapsed(prev => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [sessionState])

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  }

  const handleToggleSession = () => {
    if (sessionState === 'IDLE' || sessionState === 'PAUSED') {
      setSessionState('ACTIVE')
    } else {
      setSessionState('PAUSED')
    }
  }

  const handleEndSession = () => {
    setSessionState('IDLE')
    setTimeElapsed(0)
  }

  const mockNba = {
    id: "explore-nba",
    title: "Deep Work Session Recommended",
    description: "Cypherverse metrics suggest peak cognitive availability right now. Engage a 45-minute focus block on 'Advanced React Patterns'.",
    domain: "explore",
    priority: "high",
    confidence: 0.92,
    action_url: "#",
    reason: "Based on biometric telemetry and historical performance data."
  }

  const mockRecommendations = [
    {
      title: "Review Backend Architecture",
      description: "You have upcoming project deadlines.",
      domain: "focus",
      priority: "high",
      confidence: 0.85,
      reason: "Historical trend indicates a need to revisit this topic before exams."
    },
    {
      title: "Complete UI/UX Module",
      description: "Module is 80% complete.",
      domain: "focus",
      priority: "medium",
      confidence: 0.70,
      reason: "Finishing this will unlock the next career trajectory node."
    }
  ]

  return (
    <StitchDomainShell domainId="explore">
      <StitchDomainHeader 
        domainId="explore"
        title="Focus your academic effort where it matters."
        description="Organize, prioritize, and optimize your study schedule based on cosmic signals, rather than just checking off tasks."
      />
      
      <div className="space-y-8 flex-1">
        {/* Prioritized Insight Action */}
        <StitchNBABanner nba={mockNba as any} onActionStart={handleToggleSession} />

        {/* Study Planning Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
             {/* Note: StitchFocusWidget filters for domain === 'focus' */}
            <StitchFocusWidget recommendations={mockRecommendations as any} />
          </div>
          
          <div className="space-y-6">
             <StitchGlassCard className={`h-full min-h-[400px] transition-colors duration-500 ${sessionState === 'ACTIVE' ? 'border-[#00e5ff] shadow-[0_0_30px_rgba(0,229,255,0.2)]' : 'border-[#00e5ff]/20'}`}>
                <div className="flex flex-col items-center justify-center h-full text-center space-y-8 py-10 relative">
                  
                  {/* Background Pulse when active */}
                  <AnimatePresence>
                    {sessionState === 'ACTIVE' && (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.2, 1] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[#00e5ff]/10 rounded-full blur-[40px] pointer-events-none"
                      />
                    )}
                  </AnimatePresence>

                  <h3 className="text-xl font-black text-white tracking-widest uppercase relative z-10">Deep Work Protocol</h3>
                  
                  {/* Timer Display */}
                  <div className="relative z-10">
                    <div className={`text-6xl font-black font-mono tracking-tighter transition-colors duration-300 ${sessionState === 'ACTIVE' ? 'text-[#00e5ff] drop-shadow-[0_0_15px_rgba(0,229,255,0.8)]' : 'text-zinc-500'}`}>
                      {formatTime(timeElapsed)}
                    </div>
                    <div className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 mt-2">
                      {sessionState === 'IDLE' ? 'Ready to engage' : sessionState === 'PAUSED' ? 'Protocol Paused' : 'Protocol Active'}
                    </div>
                  </div>

                  {/* Controls */}
                  <div className="flex items-center gap-4 relative z-10 mt-8">
                     <button 
                       onClick={handleToggleSession}
                       className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 border ${
                         sessionState === 'ACTIVE'
                           ? 'bg-zinc-900 border-zinc-700 hover:border-zinc-500 text-white'
                           : 'bg-[#00e5ff] border-[#00e5ff] text-black hover:bg-[#00b3cc] shadow-[0_0_20px_rgba(0,229,255,0.4)]'
                       }`}
                     >
                       {sessionState === 'ACTIVE' ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current translate-x-0.5" />}
                     </button>
                     
                     {(sessionState === 'ACTIVE' || sessionState === 'PAUSED') && (
                       <button 
                         onClick={handleEndSession}
                         className="w-14 h-14 rounded-full flex items-center justify-center bg-red-500/10 border border-red-500/30 text-red-500 hover:bg-red-500 hover:text-black transition-all duration-300 shadow-[0_0_15px_rgba(239,68,68,0.2)]"
                       >
                         <Square className="w-5 h-5 fill-current" />
                       </button>
                     )}
                  </div>
                </div>
             </StitchGlassCard>
          </div>
        </div>
      </div>
    </StitchDomainShell>
  )
}
