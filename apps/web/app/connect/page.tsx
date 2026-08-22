"use client"

import { DomainShell } from "@/components/domain/shell"
import { DomainHeader } from "@/components/domain/header"
import { LivingCard } from "@/components/ui/living-card"
import { Share2, Server, Globe, Search, Database } from "lucide-react"
import { motion } from "framer-motion"

export default function ConnectPage() {
  return (
    <DomainShell domainId="connect">
      <DomainHeader 
        domainId="connect"
        title="See the hidden connections."
        description="Correlate seemingly unrelated signals, domains, and entities to uncover broader scam networks and campaigns."
      />
      
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Network Graph Visualization (Placeholder) */}
        <div className="lg:col-span-2 space-y-6">
          <LivingCard glowColor="cyan" className="min-h-[500px] h-full flex flex-col justify-between overflow-hidden relative">
            <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2 relative z-10">
              <Share2 className="w-5 h-5 text-cyan-400" />
              Intelligence Graph
            </h3>
            
            <div className="flex-1 flex items-center justify-center relative">
               {/* Decorative Abstract Graph Lines */}
               <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" preserveAspectRatio="none">
                 <path d="M 20% 30% L 50% 50% L 80% 40% L 60% 70% Z" fill="none" stroke="#22d3ee" strokeWidth="1" strokeDasharray="4 4" />
                 <path d="M 50% 50% L 30% 80%" fill="none" stroke="#22d3ee" strokeWidth="1" />
                 <path d="M 80% 40% L 90% 20%" fill="none" stroke="#22d3ee" strokeWidth="1" />
               </svg>
               
               {/* Nodes */}
               <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }} transition={{ duration: 3, repeat: Infinity }} className="absolute top-[30%] left-[20%] w-3 h-3 bg-cyan-400 rounded-full shadow-[0_0_15px_#22d3ee]" />
               <motion.div animate={{ scale: [1, 1.1, 1], boxShadow: ["0 0 20px #fff", "0 0 30px #22d3ee", "0 0 20px #fff"] }} transition={{ duration: 4, repeat: Infinity }} className="absolute top-[50%] left-[50%] w-4 h-4 bg-white rounded-full border-2 border-cyan-500 cursor-pointer" />
               <motion.div animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }} transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }} className="absolute top-[40%] left-[80%] w-3 h-3 bg-cyan-400 rounded-full shadow-[0_0_15px_#22d3ee]" />
               <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }} transition={{ duration: 2, repeat: Infinity, delay: 1 }} className="absolute top-[70%] left-[60%] w-3 h-3 bg-rose-500 rounded-full shadow-[0_0_15px_#f43f5e]" />
               <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }} transition={{ duration: 3.5, repeat: Infinity, delay: 1.5 }} className="absolute top-[80%] left-[30%] w-3 h-3 bg-cyan-400 rounded-full shadow-[0_0_15px_#22d3ee]" />
               <div className="absolute top-[20%] left-[90%] w-2 h-2 bg-white/50 rounded-full" />

               <div className="text-center relative z-10 bg-background/80 backdrop-blur-sm p-4 rounded-xl border border-white/10 max-w-sm">
                 <Server className="w-8 h-8 text-cyan-500/50 mx-auto mb-3" />
                 <h4 className="text-white font-medium mb-1">Awaiting Entity Data</h4>
                 <p className="text-sm text-muted-foreground">
                   Connect a data source or feed to begin correlating threat entities and mapping relationships.
                 </p>
                 <button className="mt-4 px-4 py-2 text-sm font-medium rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 hover:bg-cyan-500/20 transition-colors">
                   Add Data Source
                 </button>
               </div>
            </div>
          </LivingCard>
        </div>

        {/* Entity Search & Details */}
        <div className="lg:col-span-1 space-y-6">
          <LivingCard glowColor="white" className="h-full flex flex-col">
            <h3 className="text-lg font-semibold text-white mb-6">Entity Context</h3>
            
            <div className="space-y-6">
              
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input 
                  type="text" 
                  placeholder="Search entities..." 
                  className="w-full bg-black/40 border border-white/10 rounded-lg pl-9 pr-4 py-2 text-sm text-white placeholder:text-muted-foreground focus:outline-none focus:border-cyan-500/50 transition-colors"
                />
              </div>

              {/* Sample Data */}
              <div className="space-y-3">
                 <div className="text-xs font-bold tracking-widest text-white/40 uppercase mb-2">Selected Node</div>
                 
                 <div className="p-4 rounded-xl border border-rose-500/30 bg-rose-500/5">
                   <div className="flex items-center gap-2 mb-2">
                     <Globe className="w-4 h-4 text-rose-500" />
                     <span className="text-rose-400 font-medium text-sm font-mono truncate">login-security-update...</span>
                   </div>
                   <div className="flex justify-between items-center text-xs text-muted-foreground">
                     <span>Type: Domain</span>
                     <span className="text-rose-400 font-medium">Risk: High</span>
                   </div>
                 </div>

                 <div className="text-xs font-bold tracking-widest text-white/40 uppercase mb-2 mt-6">Correlated Evidence</div>

                 <div className="p-3 rounded-lg border border-white/5 bg-white/5 flex items-center gap-3">
                   <Database className="w-4 h-4 text-cyan-400" />
                   <div>
                     <div className="text-sm text-white font-medium">Known Phishing IP</div>
                     <div className="text-xs text-muted-foreground">Connected 2 days ago</div>
                   </div>
                 </div>
              </div>

            </div>
          </LivingCard>
        </div>

      </div>
    </DomainShell>
  )
}
