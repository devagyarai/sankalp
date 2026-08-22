"use client"

import { StitchDomainShell } from "@/components/stitch/stitch-domain-shell"
import { StitchDomainHeader } from "@/components/stitch/stitch-domain-header"
import { StitchGlassCard } from "@/components/stitch/stitch-glass-card"
import { Share2, Server, Globe, Search, Database } from "lucide-react"
import { motion } from "framer-motion"

export default function StitchConnectPage() {
  return (
    <StitchDomainShell domainId="connect">
      <StitchDomainHeader 
        domainId="connect"
        title="See the hidden connections."
        description="Correlate seemingly unrelated signals, domains, and entities to uncover broader scam networks and campaigns in the Cypherverse."
      />
      
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Network Graph Visualization (Placeholder) */}
        <div className="lg:col-span-2 space-y-6">
          <StitchGlassCard className="min-h-[500px] h-full flex flex-col justify-between overflow-hidden relative border-[#7c4dff]/30 hover:border-[#7c4dff]/50 hover:shadow-[0_0_40px_rgba(124,77,255,0.15)]">
            <h3 className="text-lg font-black tracking-widest text-white mb-6 flex items-center gap-3 uppercase relative z-10">
              <div className="p-2 rounded-xl bg-[#7c4dff]/10 border border-[#7c4dff]/30">
                <Share2 className="w-5 h-5 text-[#7c4dff]" />
              </div>
              Intelligence Graph
            </h3>
            
            <div className="flex-1 flex items-center justify-center relative">
               {/* Decorative Abstract Graph Lines */}
               <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" preserveAspectRatio="none">
                 <path d="M 20% 30% L 50% 50% L 80% 40% L 60% 70% Z" fill="none" stroke="#7c4dff" strokeWidth="2" strokeDasharray="4 4" />
                 <path d="M 50% 50% L 30% 80%" fill="none" stroke="#00e5ff" strokeWidth="1.5" />
                 <path d="M 80% 40% L 90% 20%" fill="none" stroke="#f50057" strokeWidth="1.5" />
               </svg>
               
               {/* Nodes */}
               <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }} transition={{ duration: 3, repeat: Infinity }} className="absolute top-[30%] left-[20%] w-3 h-3 bg-[#7c4dff] rounded-full shadow-[0_0_15px_#7c4dff]" />
               <motion.div animate={{ scale: [1, 1.1, 1], boxShadow: ["0 0 20px rgba(124,77,255,0.3)", "0 0 40px #7c4dff", "0 0 20px rgba(124,77,255,0.3)"] }} transition={{ duration: 4, repeat: Infinity }} className="absolute top-[50%] left-[50%] w-5 h-5 bg-black rounded-full border-[3px] border-[#7c4dff] cursor-pointer" />
               <motion.div animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }} transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }} className="absolute top-[40%] left-[80%] w-3 h-3 bg-[#f50057] rounded-full shadow-[0_0_15px_#f50057]" />
               <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }} transition={{ duration: 2, repeat: Infinity, delay: 1 }} className="absolute top-[70%] left-[60%] w-3 h-3 bg-red-500 rounded-full shadow-[0_0_15px_#ef4444]" />
               <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }} transition={{ duration: 3.5, repeat: Infinity, delay: 1.5 }} className="absolute top-[80%] left-[30%] w-3 h-3 bg-[#00e5ff] rounded-full shadow-[0_0_15px_#00e5ff]" />
               <div className="absolute top-[20%] left-[90%] w-2 h-2 bg-white/20 rounded-full" />

               <div className="text-center relative z-10 bg-black/60 backdrop-blur-md p-8 rounded-2xl border border-[#7c4dff]/20 max-w-sm shadow-[0_0_30px_rgba(0,0,0,0.8)]">
                 <div className="w-16 h-16 rounded-full bg-[#7c4dff]/10 border border-[#7c4dff]/30 flex items-center justify-center mx-auto mb-6">
                   <Server className="w-8 h-8 text-[#7c4dff]" />
                 </div>
                 <h4 className="text-white font-black text-xl mb-2 tracking-wide uppercase">Awaiting Telemetry</h4>
                 <p className="text-sm text-zinc-400 font-medium leading-relaxed mb-8">
                   Connect a data source or feed to begin correlating threat entities and mapping relationships in the nexus.
                 </p>
                 <button className="px-6 py-3 text-xs font-black uppercase tracking-widest rounded-xl bg-[#7c4dff]/10 text-[#7c4dff] border border-[#7c4dff]/40 hover:bg-[#7c4dff] hover:text-black transition-all duration-300 shadow-[0_0_15px_rgba(124,77,255,0.2)]">
                   Initialize Data Source
                 </button>
               </div>
            </div>
          </StitchGlassCard>
        </div>

        {/* Entity Search & Details */}
        <div className="lg:col-span-1 space-y-6">
          <StitchGlassCard className="h-full flex flex-col border-[#7c4dff]/20">
            <h3 className="text-lg font-black tracking-widest text-white mb-6 uppercase flex items-center gap-3">
              <div className="p-2 rounded-xl bg-[#7c4dff]/10 border border-[#7c4dff]/30">
                <Search className="w-5 h-5 text-[#7c4dff]" />
              </div>
              Entity Context
            </h3>
            
            <div className="space-y-8">
              
              {/* Search */}
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-[#7c4dff] transition-colors" />
                <input 
                  type="text" 
                  placeholder="Scan entities..." 
                  className="w-full bg-black/60 border border-zinc-800 rounded-xl pl-11 pr-4 py-3 text-sm font-medium text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#7c4dff]/50 focus:shadow-[0_0_20px_rgba(124,77,255,0.15)] transition-all"
                />
              </div>

              {/* Sample Data */}
              <div className="space-y-4">
                 <div className="text-[10px] font-black tracking-widest text-zinc-500 uppercase flex items-center gap-2 mb-3">
                   Selected Node
                 </div>
                 
                 <div className="p-5 rounded-2xl border border-red-500/30 bg-red-500/5 relative overflow-hidden">
                   <div className="absolute top-0 left-0 w-1 h-full bg-red-500" />
                   <div className="flex items-center gap-3 mb-3 ml-2">
                     <Globe className="w-4 h-4 text-red-500" />
                     <span className="text-red-400 font-bold text-sm font-mono truncate">login-security-update...</span>
                   </div>
                   <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest text-zinc-500 ml-2">
                     <span>Type: Domain</span>
                     <span className="text-red-500 bg-red-500/10 px-2 py-1 rounded border border-red-500/20">Risk: High</span>
                   </div>
                 </div>

                 <div className="text-[10px] font-black tracking-widest text-zinc-500 uppercase mt-8 mb-3 flex items-center gap-2">
                   Correlated Evidence
                 </div>

                 <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/50 flex items-center gap-4 hover:border-[#7c4dff]/30 transition-colors cursor-pointer">
                   <div className="p-2 rounded-lg bg-[#00e5ff]/10 border border-[#00e5ff]/30">
                     <Database className="w-4 h-4 text-[#00e5ff]" />
                   </div>
                   <div>
                     <div className="text-sm text-white font-bold mb-1">Known Phishing IP</div>
                     <div className="text-xs font-medium text-zinc-500">Connected 2 days ago</div>
                   </div>
                 </div>
              </div>

            </div>
          </StitchGlassCard>
        </div>

      </div>
    </StitchDomainShell>
  )
}
