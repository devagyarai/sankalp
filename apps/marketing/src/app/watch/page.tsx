"use client"

import { DomainShell } from "@/components/domain/shell"
import { DomainHeader } from "@/components/domain/header"
import { LivingCard } from "@/components/ui/living-card"
import { AlertOctagon, Link as LinkIcon, AlertTriangle, Fingerprint, MessageSquareWarning } from "lucide-react"
import { motion } from "framer-motion"

export default function WatchPage() {
  return (
    <DomainShell domainId="watch">
      <DomainHeader 
        domainId="watch"
        title="Detect suspicious signals before they become problems."
        description="Monitor and analyze potentially fraudulent content, messages, and links through an intelligent detection pipeline."
      />
      
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Detection Workspace */}
        <div className="lg:col-span-2 space-y-6">
          <LivingCard glowColor="white" className="h-full flex flex-col">
            <h3 className="text-lg font-semibold text-white mb-6">Detection Workspace</h3>
            
            {/* Input Shell */}
            <div className="bg-background border border-white/10 rounded-xl p-4 mb-6">
               <textarea 
                 placeholder="Paste a suspicious link, email, or message here for analysis..."
                 className="w-full bg-transparent border-none outline-none resize-none text-white/90 placeholder:text-muted-foreground min-h-[100px]"
                 readOnly
                 value="http://login-security-update-alert-9128.com/verify-account"
               />
               <div className="flex justify-end mt-2">
                 <button className="px-6 py-2 rounded-full bg-rose-500 text-white font-medium hover:bg-rose-600 transition-colors">
                   Analyze Risk
                 </button>
               </div>
            </div>

            {/* Explainability / Breakdown */}
            <h4 className="text-sm font-semibold text-white/80 mb-4">Signal Breakdown</h4>
            <div className="space-y-3">
               <div className="p-4 rounded-xl border border-rose-500/30 bg-rose-500/5 flex items-start gap-4">
                 <div className="p-2 rounded-full bg-rose-500/20 text-rose-500 mt-0.5">
                   <LinkIcon className="w-4 h-4" />
                 </div>
                 <div>
                   <h5 className="text-rose-400 font-medium text-sm mb-1">Suspicious URL Structure</h5>
                   <p className="text-muted-foreground text-sm">
                     The domain uses excessive hyphens and attempts to mimic a security alert, which is a common phishing pattern. It is not associated with any known legitimate provider.
                   </p>
                 </div>
               </div>

               <div className="p-4 rounded-xl border border-amber-500/30 bg-amber-500/5 flex items-start gap-4">
                 <div className="p-2 rounded-full bg-amber-500/20 text-amber-500 mt-0.5">
                   <MessageSquareWarning className="w-4 h-4" />
                 </div>
                 <div>
                   <h5 className="text-amber-400 font-medium text-sm mb-1">Urgency Language</h5>
                   <p className="text-muted-foreground text-sm">
                     The URL slug "verify-account" implies an urgent action is required, attempting to bypass critical thinking.
                   </p>
                 </div>
               </div>
            </div>

          </LivingCard>
        </div>

        {/* Risk Assessment */}
        <div className="lg:col-span-1">
          <LivingCard 
            glowColor="rose" 
            className="h-full bg-rose-500/5 border-rose-500/20"
          >
             
             <motion.div 
               className="absolute -top-12 -right-12 w-48 h-48 bg-rose-500/10 blur-[40px] rounded-full pointer-events-none"
               animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
               transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
             />
             
             <div className="relative z-10">
                <div className="flex items-center gap-2 mb-6">
                  <motion.div
                    animate={{ rotate: [-5, 5, -5] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <AlertOctagon className="w-5 h-5 text-rose-500" />
                  </motion.div>
                  <h3 className="text-lg font-bold text-white">Risk Assessment</h3>
                </div>
                
                <div className="flex flex-col items-center justify-center py-6 mb-6 border-b border-rose-500/20">
                   <div className="text-5xl font-black text-rose-500 mb-2 drop-shadow-[0_0_15px_rgba(244,63,94,0.5)]">HIGH</div>
                   <div className="text-sm font-medium text-rose-400/80 tracking-widest uppercase">Risk Detected</div>
                </div>

                <div className="space-y-4">
                   <div className="flex justify-between items-center text-sm">
                     <span className="text-white/70">Confidence Score</span>
                     <span className="text-white font-mono font-medium">94%</span>
                   </div>
                   <div className="flex justify-between items-center text-sm">
                     <span className="text-white/70">Category</span>
                     <span className="text-white font-medium">Phishing Link</span>
                   </div>
                   <div className="flex justify-between items-center text-sm">
                     <span className="text-white/70">Known Threat</span>
                     <span className="text-white font-medium">No (Heuristic match)</span>
                   </div>
                </div>

                <div className="mt-8">
                  <h4 className="text-xs font-bold tracking-widest text-white/50 uppercase mb-3">Recommended Action</h4>
                  <p className="text-sm text-rose-300/90 font-medium">
                    Do not interact with this link. Do not provide any credentials. Delete the message containing this URL immediately.
                  </p>
                </div>
             </div>
          </LivingCard>
        </div>

      </div>
    </DomainShell>
  )
}
