"use client"

import { StitchDomainShell } from "@/components/stitch/stitch-domain-shell"
import { StitchDomainHeader } from "@/components/stitch/stitch-domain-header"
import { StitchGlassCard } from "@/components/stitch/stitch-glass-card"
import { motion } from "framer-motion"
import { Target, TrendingUp } from "lucide-react"

export default function StitchShapePage() {
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
          <StitchGlassCard className="h-full border-[#ff3d00]/30 hover:border-[#ff3d00]/50 hover:shadow-[0_0_30px_rgba(255,61,0,0.2)]">
            <h3 className="text-lg font-black text-white mb-6 flex items-center gap-3 uppercase tracking-widest">
               <div className="p-2 rounded-xl bg-[#ff3d00]/10 border border-[#ff3d00]/30">
                 <Target className="w-5 h-5 text-[#ff3d00]" />
               </div>
               Current Capabilities
            </h3>
            
            <div className="space-y-6">
               {/* Skills */}
               <div className="space-y-3 group cursor-default">
                 <div className="flex justify-between text-xs font-bold uppercase tracking-wider transition-transform duration-300 group-hover:translate-x-1">
                   <span className="text-zinc-400 group-hover:text-white transition-colors">Frontend Engineering</span>
                   <span className="text-[#ff3d00]/70 group-hover:text-[#ff3d00] transition-colors">Advanced</span>
                 </div>
                 <div className="h-2 w-full bg-zinc-900 rounded-full overflow-hidden border border-zinc-800">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: "80%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, delay: 0.1, ease: "easeOut" }}
                      className="h-full bg-[#ff3d00] shadow-[0_0_15px_rgba(255,61,0,0.8)]" 
                    />
                 </div>
               </div>
               
               <div className="space-y-3 group cursor-default">
                 <div className="flex justify-between text-xs font-bold uppercase tracking-wider transition-transform duration-300 group-hover:translate-x-1">
                   <span className="text-zinc-400 group-hover:text-white transition-colors">UI/UX Design</span>
                   <span className="text-[#ff3d00]/70 group-hover:text-[#ff3d00] transition-colors">Intermediate</span>
                 </div>
                 <div className="h-2 w-full bg-zinc-900 rounded-full overflow-hidden border border-zinc-800">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: "60%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
                      className="h-full bg-[#ff3d00] shadow-[0_0_15px_rgba(255,61,0,0.8)]" 
                    />
                 </div>
               </div>

               <div className="space-y-3 group cursor-default">
                 <div className="flex justify-between text-xs font-bold uppercase tracking-wider transition-transform duration-300 group-hover:translate-x-1">
                   <span className="text-zinc-400 group-hover:text-white transition-colors">Backend Architecture</span>
                   <span className="text-[#ff3d00]/70 group-hover:text-[#ff3d00] transition-colors">Developing</span>
                 </div>
                 <div className="h-2 w-full bg-zinc-900 rounded-full overflow-hidden border border-zinc-800">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: "30%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
                      className="h-full bg-[#ff3d00] shadow-[0_0_15px_rgba(255,61,0,0.8)]" 
                    />
                 </div>
               </div>
            </div>

            <div className="mt-8 pt-6 border-t border-zinc-800 text-center">
               <button className="w-full px-4 py-3 text-xs font-black uppercase tracking-widest rounded-xl bg-[#ff3d00]/10 hover:bg-[#ff3d00] hover:text-black border border-[#ff3d00]/30 transition-all duration-300 text-[#ff3d00]">
                 Map My Skills
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
               <div className="absolute left-10 top-12 bottom-12 w-0.5 bg-zinc-800" />
               
               {/* Roadmap Items */}
               {[
                 { time: "NOW", title: "Consolidate React & Next.js", desc: "Build 2 more complex vertical slices." },
                 { time: "NEXT", title: "System Design Principles", desc: "Understand large scale frontend architecture." },
                 { time: "LATER", title: "Full-Stack Transition", desc: "Deepen understanding of FastAPI and Postgres." },
               ].map((item, i) => (
                 <motion.div 
                   key={item.time}
                   initial={{ opacity: 0, x: -10 }}
                   animate={{ opacity: 1, x: 0 }}
                   transition={{ delay: 0.2 + (i * 0.1) }}
                   className="relative pl-16 group"
                 >
                   <div className="absolute left-[-16px] top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-black border-2 border-[#ff3d00] flex items-center justify-center z-10 shadow-[0_0_10px_rgba(255,61,0,0.5)] group-hover:scale-125 transition-transform duration-300">
                     <div className="w-1.5 h-1.5 bg-[#ff3d00] rounded-full" />
                   </div>
                   
                   <span className="text-[10px] font-black tracking-[0.2em] text-[#ff3d00] mb-1 block">
                     {item.time}
                   </span>
                   <h4 className="text-white font-bold text-lg">{item.title}</h4>
                   <p className="text-sm text-zinc-500 font-medium">{item.desc}</p>
                 </motion.div>
               ))}
            </div>
          </StitchGlassCard>
        </div>
      </div>
    </StitchDomainShell>
  )
}
