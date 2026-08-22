"use client"

import { StitchDomainShell } from "@/components/stitch/stitch-domain-shell"
import { StitchDomainHeader } from "@/components/stitch/stitch-domain-header"
import { StitchGlassCard } from "@/components/stitch/stitch-glass-card"
import { AlertOctagon, Link as LinkIcon, MessageSquareWarning, Radar } from "lucide-react"
import { motion } from "framer-motion"

export default function StitchWatchPage() {
  return (
    <StitchDomainShell domainId="watch">
      <StitchDomainHeader 
        domainId="watch"
        title="Detect suspicious signals before they become problems."
        description="Monitor and analyze potentially fraudulent content, messages, and links through an intelligent detection pipeline."
      />
      
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Detection Workspace */}
        <div className="lg:col-span-2 space-y-6">
          <StitchGlassCard className="h-full flex flex-col border-[#ffc400]/20">
            <h3 className="text-lg font-black tracking-widest text-white mb-6 uppercase flex items-center gap-3">
              <div className="p-2 rounded-xl bg-[#ffc400]/10 border border-[#ffc400]/30">
                <Radar className="w-5 h-5 text-[#ffc400]" />
              </div>
              Detection Workspace
            </h3>
            
            {/* Input Shell */}
            <div className="bg-black/60 border border-zinc-800 rounded-2xl p-5 mb-8 focus-within:border-[#ffc400]/50 focus-within:shadow-[0_0_20px_rgba(255,196,0,0.1)] transition-all duration-300 relative overflow-hidden">
               {/* Animated Scanning Line */}
               <motion.div 
                 className="absolute top-0 left-0 w-full h-[2px] bg-[#ffc400] z-20 shadow-[0_0_15px_#ffc400]"
                 animate={{ top: ["0%", "100%", "0%"] }}
                 transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
               />
               <motion.div 
                 className="absolute top-0 left-0 w-full h-12 bg-gradient-to-b from-[#ffc400]/20 to-transparent pointer-events-none z-10"
                 animate={{ top: ["0%", "100%", "0%"] }}
                 transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
               />
               <div className="absolute top-0 left-0 w-1 h-full bg-[#ffc400]" />
               <textarea 
                 placeholder="Paste a suspicious link, email, or message here for analysis..."
                 className="w-full bg-transparent border-none outline-none resize-none text-white font-mono placeholder:text-zinc-600 min-h-[100px]"
                 readOnly
                 value="http://login-security-update-alert-9128.com/verify-account"
               />
               <div className="flex justify-end mt-4">
                 <button className="px-6 py-3 rounded-xl bg-[#ffc400] text-black font-black uppercase tracking-widest hover:bg-[#ffcd33] transition-colors shadow-[0_0_15px_rgba(255,196,0,0.4)]">
                   Analyze Risk
                 </button>
               </div>
            </div>

            {/* Explainability / Breakdown */}
            <h4 className="text-xs font-black tracking-widest text-zinc-500 uppercase mb-4">Signal Breakdown</h4>
            <div className="space-y-4">
               <div className="p-5 rounded-2xl border border-red-500/30 bg-red-500/5 flex items-start gap-4">
                 <div className="p-2 rounded-xl bg-red-500/20 text-red-500 border border-red-500/30 shrink-0">
                   <LinkIcon className="w-5 h-5" />
                 </div>
                 <div>
                   <h5 className="text-red-400 font-bold text-sm mb-1 uppercase tracking-wide">Suspicious URL Structure</h5>
                   <p className="text-zinc-400 text-sm leading-relaxed font-medium">
                     The domain uses excessive hyphens and attempts to mimic a security alert, which is a common phishing pattern. It is not associated with any known legitimate provider in the Cypherverse registry.
                   </p>
                 </div>
               </div>

               <div className="p-5 rounded-2xl border border-[#ffc400]/30 bg-[#ffc400]/5 flex items-start gap-4">
                 <div className="p-2 rounded-xl bg-[#ffc400]/20 text-[#ffc400] border border-[#ffc400]/30 shrink-0">
                   <MessageSquareWarning className="w-5 h-5" />
                 </div>
                 <div>
                   <h5 className="text-[#ffc400] font-bold text-sm mb-1 uppercase tracking-wide">Urgency Language</h5>
                   <p className="text-zinc-400 text-sm leading-relaxed font-medium">
                     The URL slug "verify-account" implies an urgent action is required, attempting to bypass critical thinking and force immediate compliance.
                   </p>
                 </div>
               </div>
            </div>
          </StitchGlassCard>
        </div>

        {/* Risk Assessment */}
        <div className="lg:col-span-1">
          <StitchGlassCard className="h-full border-red-500/30 bg-red-500/5 shadow-[0_0_30px_rgba(239,68,68,0.1)] hover:border-red-500/50 hover:shadow-[0_0_40px_rgba(239,68,68,0.2)] relative overflow-hidden">
             
             <motion.div 
               className="absolute -top-12 -right-12 w-48 h-48 bg-red-500/20 blur-[50px] rounded-full pointer-events-none"
               animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
               transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
             />
             
             <div className="relative z-10">
                <div className="flex items-center gap-3 mb-8">
                  <motion.div
                    animate={{ rotate: [-5, 5, -5] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="p-2 rounded-xl bg-red-500/20 border border-red-500/40"
                  >
                    <AlertOctagon className="w-5 h-5 text-red-500" />
                  </motion.div>
                  <h3 className="text-lg font-black tracking-widest uppercase text-white">Risk Assessment</h3>
                </div>
                
                <div className="flex flex-col items-center justify-center py-8 mb-8 border-b border-red-500/20 bg-black/40 rounded-2xl">
                   <div className="text-6xl font-black text-red-500 mb-2 drop-shadow-[0_0_20px_rgba(239,68,68,0.6)] tracking-tighter">HIGH</div>
                   <div className="text-xs font-black text-red-400 tracking-[0.2em] uppercase px-3 py-1 bg-red-500/10 rounded-full border border-red-500/30">Risk Detected</div>
                </div>

                <div className="space-y-4 bg-black/20 p-5 rounded-xl border border-zinc-900">
                   <div className="flex justify-between items-center text-sm border-b border-zinc-800 pb-3">
                     <span className="text-zinc-400 font-bold uppercase tracking-wider text-xs">Confidence Score</span>
                     <span className="text-[#00e5ff] font-mono font-black text-base">94%</span>
                   </div>
                   <div className="flex justify-between items-center text-sm border-b border-zinc-800 pb-3 pt-1">
                     <span className="text-zinc-400 font-bold uppercase tracking-wider text-xs">Category</span>
                     <span className="text-white font-bold">Phishing Link</span>
                   </div>
                   <div className="flex justify-between items-center text-sm pt-1">
                     <span className="text-zinc-400 font-bold uppercase tracking-wider text-xs">Known Threat</span>
                     <span className="text-white font-bold">No <span className="text-zinc-500 text-xs ml-1">(Heuristic match)</span></span>
                   </div>
                </div>

                <div className="mt-8">
                  <h4 className="text-[10px] font-black tracking-widest text-zinc-500 uppercase mb-3">Recommended Course</h4>
                  <p className="text-sm text-red-400 font-medium leading-relaxed bg-red-500/10 p-4 rounded-xl border border-red-500/20 border-l-4 border-l-red-500">
                    Do not interact with this link. Do not provide any credentials. Delete the message containing this URL immediately.
                  </p>
                </div>
             </div>
          </StitchGlassCard>
        </div>

      </div>
    </StitchDomainShell>
  )
}
