"use client"

import { StitchDomainShell } from "@/components/stitch/stitch-domain-shell"
import { StitchDomainHeader } from "@/components/stitch/stitch-domain-header"
import { StitchGlassCard } from "@/components/stitch/stitch-glass-card"
import { ShieldCheck, AlertCircle, CheckCircle2, Lock, MonitorSmartphone, Key } from "lucide-react"
import { motion } from "framer-motion"

export default function StitchSecurePage() {
  return (
    <StitchDomainShell domainId="secure">
      <StitchDomainHeader 
        domainId="secure"
        title="Know how protected your digital life is."
        description="Understand your digital safety posture and get prioritized recommendations to secure your online presence in the Cypherverse."
      />
      
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Security Overview */}
        <div className="lg:col-span-1 space-y-6">
          <StitchGlassCard className="text-center group border-[#f50057]/30 bg-[#f50057]/5 hover:border-[#f50057]/50 hover:shadow-[0_0_30px_rgba(245,0,87,0.2)]">
             <motion.div 
               className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[#f50057]/10 blur-[40px] rounded-full pointer-events-none" 
               animate={{ scale: [1, 1.1, 1], opacity: [0.6, 1, 0.6] }}
               transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
             />
             
             <div className="relative z-10 flex flex-col items-center">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className="p-4 rounded-2xl bg-[#f50057]/10 border border-[#f50057]/30 mb-6 shadow-[0_0_20px_rgba(245,0,87,0.3)]"
                >
                  <ShieldCheck className="w-10 h-10 text-[#f50057]" />
                </motion.div>
                <h3 className="text-sm font-black tracking-widest uppercase text-zinc-400 mb-2">Safety Posture</h3>
                <div className="text-6xl font-black text-[#f50057] mb-2 drop-shadow-[0_0_15px_rgba(245,0,87,0.5)]">85<span className="text-2xl text-[#f50057]/50">/100</span></div>
                <p className="text-[#f50057] font-bold tracking-widest uppercase text-xs px-3 py-1 rounded-full bg-[#f50057]/10 border border-[#f50057]/30 mt-2">Strong Protection</p>
             </div>
          </StitchGlassCard>
          
          <StitchGlassCard className="space-y-4 border-[#f50057]/20">
             <h4 className="text-xs font-black tracking-widest text-zinc-500 uppercase mb-4">Safety Categories</h4>
             
             <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-900/50 border border-zinc-800 hover:border-[#00e676]/30 transition-colors">
                <div className="flex items-center gap-3">
                  <Key className="w-4 h-4 text-[#00e676]" />
                  <span className="text-sm text-zinc-300 font-bold tracking-wide">Account Security</span>
                </div>
                <CheckCircle2 className="w-4 h-4 text-[#00e676]" />
             </div>

             <div className="flex items-center justify-between p-3 rounded-xl bg-[#ffc400]/5 border border-[#ffc400]/20 hover:border-[#ffc400]/40 transition-colors">
                <div className="flex items-center gap-3">
                  <Lock className="w-4 h-4 text-[#ffc400]" />
                  <span className="text-sm text-zinc-300 font-bold tracking-wide">Password Hygiene</span>
                </div>
                <span className="text-[10px] font-black tracking-widest text-[#ffc400] bg-[#ffc400]/10 px-2 py-1 rounded uppercase border border-[#ffc400]/30">Review</span>
             </div>

             <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-900/50 border border-zinc-800 hover:border-[#00e676]/30 transition-colors">
                <div className="flex items-center gap-3">
                  <MonitorSmartphone className="w-4 h-4 text-[#00e676]" />
                  <span className="text-sm text-zinc-300 font-bold tracking-wide">Device Safety</span>
                </div>
                <CheckCircle2 className="w-4 h-4 text-[#00e676]" />
             </div>
          </StitchGlassCard>
        </div>

        {/* Recommendations */}
        <div className="lg:col-span-2">
          <StitchGlassCard className="h-full border-[#f50057]/20">
            <h3 className="text-lg font-black tracking-widest text-white mb-6 uppercase flex items-center gap-3">
              <div className="p-2 rounded-xl bg-[#f50057]/10 border border-[#f50057]/30">
                <ShieldCheck className="w-5 h-5 text-[#f50057]" />
              </div>
              Prioritized Actions
            </h3>
            
            <div className="space-y-8">
              
              {/* High Priority */}
              <div className="space-y-4">
                <div className="text-[10px] font-black tracking-widest text-[#ffc400] uppercase flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  High Priority
                </div>
                
                <div className="p-5 rounded-2xl border border-zinc-800 bg-zinc-950 hover:bg-black hover:border-[#ffc400]/30 transition-all duration-300 cursor-pointer group">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="text-white font-bold text-lg">Enable 2FA on Primary Email</h4>
                    <button className="px-4 py-2 rounded-xl border border-zinc-700 bg-zinc-900 text-xs font-bold uppercase tracking-widest text-white group-hover:bg-[#ffc400] group-hover:text-black group-hover:border-[#ffc400] transition-colors">
                      Fix Now
                    </button>
                  </div>
                  <p className="text-sm text-zinc-500 font-medium leading-relaxed">
                    Your primary email is used for password recovery across 12 connected services in the Cypherverse. Securing it prevents a single point of failure.
                  </p>
                </div>
              </div>

              {/* Recommended */}
              <div className="space-y-4">
                <div className="text-[10px] font-black tracking-widest text-[#00e676] uppercase flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  Recommended
                </div>
                
                <div className="p-5 rounded-2xl border border-zinc-800 bg-zinc-950 hover:bg-black hover:border-[#00e676]/30 transition-all duration-300 cursor-pointer group">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="text-white font-bold text-lg">Review App Permissions</h4>
                    <button className="px-4 py-2 rounded-xl border border-zinc-700 bg-zinc-900 text-xs font-bold uppercase tracking-widest text-white group-hover:bg-[#00e676] group-hover:text-black group-hover:border-[#00e676] transition-colors">
                      Review
                    </button>
                  </div>
                  <p className="text-sm text-zinc-500 font-medium leading-relaxed">
                      If SANKALP detects any unusual patterns—like logins from a new quadrant or suspicious API access requests—the SECURE domain locks down the environment instantly. You&apos;ll be alerted immediately.
                  </p>
                </div>
              </div>

            </div>
          </StitchGlassCard>
        </div>

      </div>
    </StitchDomainShell>
  )
}
