"use client"

import { useState } from "react"
import { StitchDomainShell } from "@/components/stitch/stitch-domain-shell"
import { StitchDomainHeader } from "@/components/stitch/stitch-domain-header"
import { StitchGlassCard } from "@/components/stitch/stitch-glass-card"
import { motion, AnimatePresence } from "framer-motion"
import { Target, TrendingUp, Loader2, Sparkles } from "lucide-react"

type MappingState = 'IDLE' | 'SCANNING' | 'COMPLETE'

export default function ShapePage() {
  const [mappingState, setMappingState] = useState<MappingState>('IDLE')

  const handleMapSkills = () => {
    if (mappingState !== 'IDLE') return
    setMappingState('SCANNING')
    
    // Simulate complex analysis
    setTimeout(() => {
      setMappingState('COMPLETE')
    }, 3000)
  }

  const skills = [
    { name: 'Frontend Engineering', initial: 80, final: 85, level: 'Advanced' },
    { name: 'UI/UX Design', initial: 60, final: 72, level: 'Intermediate' },
    { name: 'Backend Architecture', initial: 30, final: 45, level: 'Developing' },
  ]

  const roadmap = [
    { time: "NOW", title: "Consolidate React & Next.js", desc: "Build 2 more complex vertical slices.", delay: 0.2 },
    { time: "NEXT", title: "System Design Principles", desc: "Understand large scale frontend architecture.", delay: 0.3 },
    { time: "LATER", title: "Full-Stack Transition", desc: "Deepen understanding of FastAPI and Postgres.", delay: 0.4 },
  ]

  return (
    <StitchDomainShell domainId="shape">
      <StitchDomainHeader 
        domainId="shape"
        title="Understand where your skills can take you."
        description="Map your current capabilities against potential career directions and discover what to learn next in the Cypherverse."
      />
      
      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Profile Snapshot */}
        <div className="md:col-span-1 space-y-6">
          <StitchGlassCard className={`h-full transition-colors duration-500 ${mappingState === 'SCANNING' ? 'border-[#ff3d00] shadow-[0_0_30px_rgba(255,61,0,0.4)]' : 'border-[#ff3d00]/30 hover:border-[#ff3d00]/50 hover:shadow-[0_0_30px_rgba(255,61,0,0.2)]'}`}>
            <h3 className="text-lg font-black text-white mb-6 flex items-center gap-3 uppercase tracking-widest">
               <div className="p-2 rounded-xl bg-[#ff3d00]/10 border border-[#ff3d00]/30">
                 <Target className="w-5 h-5 text-[#ff3d00]" />
               </div>
               Current Capabilities
            </h3>
            
            <div className="space-y-6 relative">
               {/* Scanning Overlay */}
               <AnimatePresence>
                 {mappingState === 'SCANNING' && (
                   <motion.div 
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     exit={{ opacity: 0 }}
                     className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm rounded-xl border border-[#ff3d00]/50"
                   >
                     <motion.div
                       animate={{ rotate: 360 }}
                       transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                       className="w-12 h-12 rounded-full border-2 border-transparent border-t-[#ff3d00] border-r-[#ff3d00] mb-4 shadow-[0_0_15px_#ff3d00]"
                     />
                     <span className="text-[#ff3d00] font-mono text-xs uppercase tracking-[0.3em] font-bold animate-pulse">
                       Analyzing Telemetry...
                     </span>
                   </motion.div>
                 )}
               </AnimatePresence>

               {/* Skills */}
               {skills.map((skill, idx) => (
                 <div key={skill.name} className="space-y-3 group cursor-default">
                   <div className="flex justify-between text-xs font-bold uppercase tracking-wider transition-transform duration-300 group-hover:translate-x-1">
                     <span className="text-zinc-400 group-hover:text-white transition-colors">{skill.name}</span>
                     <span className="text-[#ff3d00]/70 group-hover:text-[#ff3d00] transition-colors">{skill.level}</span>
                   </div>
                   <div className="h-2 w-full bg-zinc-900 rounded-full overflow-hidden border border-zinc-800 relative">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: mappingState === 'COMPLETE' ? `${skill.final}%` : `${skill.initial}%` }}
                        transition={{ duration: 1.5, delay: idx * 0.1, ease: "easeOut" }}
                        className="absolute top-0 left-0 h-full bg-[#ff3d00] shadow-[0_0_15px_rgba(255,61,0,0.8)]" 
                      />
                      {/* Highlight new progress */}
                      {mappingState === 'COMPLETE' && (
                        <motion.div 
                          initial={{ width: 0, left: `${skill.initial}%` }}
                          animate={{ width: `${skill.final - skill.initial}%` }}
                          transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                          className="absolute top-0 h-full bg-[#ffc400] opacity-80" 
                        />
                      )}
                   </div>
                 </div>
               ))}
            </div>

            <div className="mt-8 pt-6 border-t border-zinc-800 text-center relative overflow-hidden rounded-xl">
               <button 
                 onClick={handleMapSkills}
                 disabled={mappingState !== 'IDLE'}
                 className={`w-full relative px-4 py-3 text-xs font-black uppercase tracking-widest transition-all duration-300 overflow-hidden ${
                   mappingState === 'IDLE' 
                     ? 'bg-[#ff3d00]/10 hover:bg-[#ff3d00] hover:text-black border border-[#ff3d00]/30 text-[#ff3d00] hover:shadow-[0_0_20px_rgba(255,61,0,0.6)]' 
                     : mappingState === 'SCANNING'
                       ? 'bg-[#ff3d00]/5 border border-[#ff3d00]/20 text-[#ff3d00]/50 cursor-not-allowed'
                       : 'bg-[#ff3d00] text-black border border-[#ff3d00] shadow-[0_0_20px_rgba(255,61,0,0.4)]'
                 }`}
               >
                 {mappingState === 'IDLE' && 'Map My Skills'}
                 {mappingState === 'SCANNING' && 'Calibrating...'}
                 {mappingState === 'COMPLETE' && (
                   <span className="flex items-center justify-center gap-2">
                     <Sparkles className="w-4 h-4" /> Trajectory Updated
                   </span>
                 )}
               </button>
            </div>
          </StitchGlassCard>
        </div>

        {/* Career Roadmap / Trajectory */}
        <div className="md:col-span-2 space-y-6">
          <StitchGlassCard className="h-full border-[#ff3d00]/30 hover:border-[#ff3d00]/50 hover:shadow-[0_0_30px_rgba(255,61,0,0.2)]">
            <h3 className="text-lg font-black text-white mb-2 flex items-center gap-3 uppercase tracking-widest">
               <div className="p-2 rounded-xl bg-[#ff3d00]/10 border border-[#ff3d00]/30">
                 <TrendingUp className="w-5 h-5 text-[#ff3d00]" />
               </div>
               Career Trajectory
            </h3>
            <p className="text-sm text-zinc-400 font-medium mb-8">
              Based on your current skills, here are logical next steps in your development.
            </p>

            <div className="flex-1 relative flex flex-col justify-center gap-8 py-8 px-4">
               {/* Vertical Connecting Line */}
               <motion.div 
                 className="absolute left-10 top-12 bottom-12 w-0.5 bg-zinc-800 origin-top" 
                 animate={mappingState === 'SCANNING' ? { scaleY: [1, 1.05, 1], backgroundColor: ['#27272a', '#ff3d00', '#27272a'] } : {}}
                 transition={{ duration: 1.5, repeat: Infinity }}
               />
               
               {/* Roadmap Items */}
               {roadmap.map((item, i) => (
                 <motion.div 
                   key={item.time}
                   initial={{ opacity: 0, x: -10 }}
                   animate={{ opacity: 1, x: 0 }}
                   transition={{ delay: item.delay }}
                   className="relative pl-16 group"
                 >
                   <div className="absolute left-[-16px] top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-black border-2 border-[#ff3d00] flex items-center justify-center z-10 shadow-[0_0_10px_rgba(255,61,0,0.5)] group-hover:scale-125 transition-transform duration-300">
                     <motion.div 
                       className="w-1.5 h-1.5 bg-[#ff3d00] rounded-full"
                       animate={mappingState === 'SCANNING' ? { opacity: [0.3, 1, 0.3], scale: [1, 1.5, 1] } : {}}
                       transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                     />
                   </div>
                   
                   <span className="text-[10px] font-black tracking-[0.2em] text-[#ff3d00] mb-1 block">
                     {item.time}
                   </span>
                   <h4 className="text-white font-bold text-lg">{item.title}</h4>
                   <p className="text-sm text-zinc-500 font-medium">{item.desc}</p>
                 </motion.div>
               ))}

               {/* New Node Appears on Complete */}
               <AnimatePresence>
                 {mappingState === 'COMPLETE' && (
                   <motion.div 
                     initial={{ opacity: 0, height: 0, x: -20 }}
                     animate={{ opacity: 1, height: 'auto', x: 0 }}
                     transition={{ duration: 0.6, type: "spring" }}
                     className="relative pl-16 group mt-4 pt-4 border-t border-dashed border-[#ff3d00]/30"
                   >
                     <div className="absolute left-[-16px] top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-[#ff3d00]/20 border-2 border-[#ff3d00] flex items-center justify-center z-10 shadow-[0_0_20px_rgba(255,61,0,0.8)]">
                       <div className="w-2 h-2 bg-[#ff3d00] rounded-full animate-pulse" />
                     </div>
                     
                     <span className="text-[10px] font-black tracking-[0.2em] text-[#ffc400] mb-1 block flex items-center gap-2">
                       <Sparkles className="w-3 h-3" /> NEW PATHWAY UNLOCKED
                     </span>
                     <h4 className="text-white font-bold text-lg">AI & Data Integration</h4>
                     <p className="text-sm text-[#ff3d00]/80 font-medium">Your rapid frontend progress suggests readiness to integrate LLM endpoints into client applications.</p>
                   </motion.div>
                 )}
               </AnimatePresence>
            </div>
          </StitchGlassCard>
        </div>
      </div>
    </StitchDomainShell>
  )
}
