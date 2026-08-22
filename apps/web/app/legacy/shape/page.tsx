"use client"

import { DomainShell } from "@/components/domain/shell"
import { DomainHeader } from "@/components/domain/header"
import { LivingCard } from "@/components/ui/living-card"
import { motion } from "framer-motion"
import { Target, TrendingUp } from "lucide-react"

export default function ShapePage() {
  return (
    <DomainShell domainId="shape">
      <DomainHeader 
        domainId="shape"
        title="Understand where your skills can take you."
        description="Map your current capabilities against potential career directions and discover what to learn next."
      />
      
      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Profile Snapshot */}
        <div className="md:col-span-1 space-y-6">
          <LivingCard glowColor="violet" className="h-full">
            <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
               <Target className="w-5 h-5 text-violet-400" />
               Current Capabilities
            </h3>
            
            <div className="space-y-4">
               {/* Empty/Placeholder States for Skills */}
               <div className="space-y-3 group cursor-default">
                 <div className="flex justify-between text-sm transition-transform duration-300 group-hover:translate-x-1">
                   <span className="text-white/80 group-hover:text-white transition-colors">Frontend Engineering</span>
                   <span className="text-violet-400/80 group-hover:text-violet-400 transition-colors">Advanced</span>
                 </div>
                 <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: "80%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.1, ease: "easeOut" }}
                      className="h-full bg-violet-500 shadow-[0_0_10px_rgba(139,92,246,0.5)]" 
                    />
                 </div>
               </div>
               
               <div className="space-y-3 group cursor-default">
                 <div className="flex justify-between text-sm transition-transform duration-300 group-hover:translate-x-1">
                   <span className="text-white/80 group-hover:text-white transition-colors">UI/UX Design</span>
                   <span className="text-violet-400/80 group-hover:text-violet-400 transition-colors">Intermediate</span>
                 </div>
                 <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: "60%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                      className="h-full bg-violet-500 shadow-[0_0_10px_rgba(139,92,246,0.5)]" 
                    />
                 </div>
               </div>

               <div className="space-y-3 group cursor-default">
                 <div className="flex justify-between text-sm transition-transform duration-300 group-hover:translate-x-1">
                   <span className="text-white/80 group-hover:text-white transition-colors">Backend Architecture</span>
                   <span className="text-violet-400/80 group-hover:text-violet-400 transition-colors">Developing</span>
                 </div>
                 <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: "30%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                      className="h-full bg-violet-500 shadow-[0_0_10px_rgba(139,92,246,0.5)]" 
                    />
                 </div>
               </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/5 text-center">
               <button className="px-4 py-2 text-sm font-medium rounded-full bg-white/5 hover:bg-white/10 transition-colors text-white">
                 Map My Skills
               </button>
            </div>
          </LivingCard>
        </div>

        {/* Career Roadmap / Trajectory */}
        <div className="md:col-span-2 space-y-6">
          <LivingCard glowColor="violet" className="h-full">
            <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
               <TrendingUp className="w-5 h-5 text-violet-400" />
               Career Trajectory
            </h3>
            <p className="text-sm text-muted-foreground mb-8">
              Based on your current skills, here are logical next steps in your development.
            </p>

            <div className="flex-1 relative flex flex-col justify-center gap-8 py-8 px-4">
               {/* Vertical Connecting Line */}
               <div className="absolute left-10 top-12 bottom-12 w-0.5 bg-white/5" />
               
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
                   className="relative pl-16"
                 >
                   <div className="absolute left-[-16px] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-background border-2 border-violet-500/50 flex items-center justify-center z-10">
                     <div className="w-1 h-1 bg-violet-400 rounded-full" />
                   </div>
                   
                   <span className="text-xs font-bold tracking-widest text-violet-400/70 mb-1 block">
                     {item.time}
                   </span>
                   <h4 className="text-white font-medium">{item.title}</h4>
                   <p className="text-sm text-muted-foreground">{item.desc}</p>
                 </motion.div>
               ))}
            </div>
          </LivingCard>
        </div>
      </div>
    </DomainShell>
  )
}
