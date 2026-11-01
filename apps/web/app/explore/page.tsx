"use client"

import { useState, useEffect } from "react"
import { StitchDomainShell } from "@/components/stitch/stitch-domain-shell"
import { StitchDomainHeader } from "@/components/stitch/stitch-domain-header"
import { StitchFocusWidget } from "@/components/stitch/stitch-focus-widget"
import { StitchNBABanner } from "@/components/stitch/stitch-nba-banner"
import { StitchGlassCard } from "@/components/stitch/stitch-glass-card"
import { PieChart, Play, Square, Pause, Users, Activity, Target } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useAuth } from "@/lib/auth-context"
import { fetchApi } from "@/lib/api-client"
import { IntelligenceRecommendationSchema } from "@/types/intelligence"

export default function StitchExplorePage() {
  const { currentUser, users } = useAuth()
  
  // Student State
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

  const handleToggleSession = async () => {
    if (sessionState === 'IDLE' || sessionState === 'PAUSED') {
      setSessionState('ACTIVE')
      try {
        await fetchApi('/intelligence/focus')
      } catch (err) {
        console.error("Failed to sync session:", err)
      }
    } else {
      setSessionState('PAUSED')
    }
  }

  const handleEndSession = () => {
    setSessionState('IDLE')
    setTimeElapsed(0)
  }

  const mockNba: IntelligenceRecommendationSchema = {
    title: "Deep Work Session Recommended",
    reason: "Graviton metrics suggest peak cognitive availability right now. Engage a 45-minute focus block on 'Advanced React Patterns'.",
    domain: "explore",
    priority: "high",
    confidence: 0.92,
    action_url: "#",
    evidence: ["Based on biometric telemetry and historical performance data."]
  }

  const mockRecommendations: IntelligenceRecommendationSchema[] = [
    {
      title: "Review Backend Architecture",
      reason: "You have upcoming project deadlines.",
      domain: "focus",
      priority: "high",
      confidence: 0.85,
      evidence: ["Historical trend indicates a need to revisit this topic before exams."],
      action_url: "/explore"
    },
    {
      title: "Complete UI/UX Module",
      reason: "Module is 80% complete.",
      domain: "focus",
      priority: "medium",
      confidence: 0.70,
      evidence: ["Finishing this will unlock the next career trajectory node."],
      action_url: "/shape"
    }
  ]

  // COMMANDER VIEW
  if (currentUser.role === 'COMMANDER') {
    const activeCadets = users.filter(u => u.role === 'STUDENT' && u.id !== 'stu-2') // Just mock some active
    return (
      <StitchDomainShell domainId="explore">
        <StitchDomainHeader 
          domainId="explore"
          title="Fleet Activity Monitor"
          description="Track active study sessions, cognitive load, and time allocation across all assigned cadets."
        />
        
        <div className="space-y-6 flex-1">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StitchGlassCard className="border-[#00e5ff]/30 bg-[#00e5ff]/5">
                 <div className="flex items-center gap-4 mb-4">
                     <div className="p-3 rounded-2xl bg-[#00e5ff]/10 border border-[#00e5ff]/30">
                         <Activity className="w-6 h-6 text-[#00e5ff] animate-pulse" />
                     </div>
                     <div>
                         <h3 className="text-sm font-black uppercase tracking-widest text-zinc-400">Active Protocols</h3>
                         <div className="text-4xl font-black text-white">{activeCadets.length} <span className="text-lg text-zinc-500">Engaged</span></div>
                     </div>
                 </div>
              </StitchGlassCard>
              
              <StitchGlassCard className="border-zinc-800">
                 <div className="flex items-center gap-4 mb-4">
                     <div className="p-3 rounded-2xl bg-zinc-900 border border-zinc-700">
                         <PieChart className="w-6 h-6 text-zinc-400" />
                     </div>
                     <div>
                         <h3 className="text-sm font-black uppercase tracking-widest text-zinc-400">Fleet Avg Focus Time</h3>
                         <div className="text-4xl font-black text-white">4.2 <span className="text-lg text-zinc-500">hrs/day</span></div>
                     </div>
                 </div>
              </StitchGlassCard>

              <StitchGlassCard className="border-zinc-800">
                 <div className="flex items-center gap-4 mb-4">
                     <div className="p-3 rounded-2xl bg-zinc-900 border border-zinc-700">
                         <Target className="w-6 h-6 text-zinc-400" />
                     </div>
                     <div>
                         <h3 className="text-sm font-black uppercase tracking-widest text-zinc-400">Top Focus Subject</h3>
                         <div className="text-2xl font-black text-white truncate">System Architecture</div>
                     </div>
                 </div>
              </StitchGlassCard>
           </div>

           <StitchGlassCard className="border-zinc-800 mt-6">
              <h3 className="text-lg font-black tracking-widest text-white uppercase mb-6 flex items-center gap-2">
                 <Users className="w-5 h-5 text-[#00e5ff]" /> Active Cadet Sessions
              </h3>
              
              <div className="space-y-4">
                 {activeCadets.map(cadet => (
                   <div key={cadet.id} className="p-4 rounded-xl border border-[#00e5ff]/20 bg-[#00e5ff]/5 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                         <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${cadet.avatarColor}/20 border border-[#00e5ff]/30 relative`}>
                            <motion.div 
                              className="absolute inset-0 rounded-full border border-[#00e5ff]"
                              animate={{ scale: [1, 1.3, 1], opacity: [0.8, 0, 0.8] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            />
                            <span className="text-sm font-bold text-white">{cadet.name[0]}</span>
                         </div>
                         <div>
                            <h4 className="font-bold text-white">{cadet.name}</h4>
                            <p className="text-xs text-zinc-400 font-medium tracking-wide">Deep Work Protocol Active</p>
                         </div>
                      </div>
                      <div className="text-right">
                         <div className="text-[#00e5ff] font-mono font-bold">01:42:15</div>
                         <div className="text-[10px] uppercase tracking-widest text-zinc-500">Elapsed</div>
                      </div>
                   </div>
                 ))}
                 
                 <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/50 flex items-center justify-between opacity-60">
                      <div className="flex items-center gap-4">
                         <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-zinc-800 border border-zinc-700">
                            <span className="text-sm font-bold text-zinc-400">B</span>
                         </div>
                         <div>
                            <h4 className="font-bold text-zinc-400">Student Beta</h4>
                            <p className="text-xs text-zinc-500 font-medium tracking-wide">Session Paused</p>
                         </div>
                      </div>
                      <div className="text-right">
                         <div className="text-zinc-500 font-mono font-bold">00:15:00</div>
                         <div className="text-[10px] uppercase tracking-widest text-zinc-600">Paused</div>
                      </div>
                 </div>
              </div>
           </StitchGlassCard>
        </div>
      </StitchDomainShell>
    )
  }

  // STUDENT VIEW
  return (
    <StitchDomainShell domainId="explore">
      <StitchDomainHeader 
        domainId="explore"
        title="Focus your academic effort where it matters."
        description="Organize, prioritize, and optimize your study schedule based on cosmic signals, rather than just checking off tasks."
      />
      
      <div className="space-y-8 flex-1">
        {/* Prioritized Insight Action */}
        <StitchNBABanner nba={mockNba} onActionStart={handleToggleSession} />

        {/* Study Planning Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
             {/* Note: StitchFocusWidget filters for domain === 'focus' */}
            <StitchFocusWidget recommendations={mockRecommendations} />
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
