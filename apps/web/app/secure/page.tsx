"use client"

import { DomainShell } from "@/components/domain/shell"
import { DomainHeader } from "@/components/domain/header"
import { LivingCard } from "@/components/ui/living-card"
import { ShieldCheck, AlertCircle, CheckCircle2, Lock, MonitorSmartphone, Key } from "lucide-react"
import { motion } from "framer-motion"

export default function SecurePage() {
  return (
    <DomainShell domainId="secure">
      <DomainHeader 
        domainId="secure"
        title="Know how protected your digital life is."
        description="Understand your digital safety posture and get prioritized recommendations to secure your online presence."
      />
      
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Security Overview */}
        <div className="lg:col-span-1 space-y-6">
          <LivingCard glowColor="emerald" className="text-center group bg-emerald-500/5 border-emerald-500/20">
             <motion.div 
               className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-emerald-500/10 blur-[40px] rounded-full pointer-events-none" 
               animate={{ scale: [1, 1.1, 1], opacity: [0.6, 1, 0.6] }}
               transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
             />
             
             <div className="relative z-10 flex flex-col items-center">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <ShieldCheck className="w-12 h-12 text-emerald-400 mb-4" />
                </motion.div>
                <h3 className="text-xl font-bold text-white mb-1">Safety Posture</h3>
                <div className="text-5xl font-bold text-emerald-400 mb-2">85<span className="text-2xl text-emerald-500/50">/100</span></div>
                <p className="text-emerald-400/80 font-medium">Strong Protection</p>
             </div>
          </LivingCard>
          
          <LivingCard glowColor="white" className="space-y-4">
             <h4 className="text-sm font-semibold text-white/80 mb-4">Safety Categories</h4>
             
             <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5">
                <div className="flex items-center gap-3">
                  <Key className="w-4 h-4 text-emerald-400" />
                  <span className="text-sm text-white font-medium">Account Security</span>
                </div>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
             </div>

             <div className="flex items-center justify-between p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
                <div className="flex items-center gap-3">
                  <Lock className="w-4 h-4 text-amber-500" />
                  <span className="text-sm text-white font-medium">Password Hygiene</span>
                </div>
                <span className="text-xs font-bold text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded uppercase">Review</span>
             </div>

             <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5">
                <div className="flex items-center gap-3">
                  <MonitorSmartphone className="w-4 h-4 text-emerald-400" />
                  <span className="text-sm text-white font-medium">Device Safety</span>
                </div>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
             </div>
          </LivingCard>
        </div>

        {/* Recommendations */}
        <div className="lg:col-span-2">
          <LivingCard glowColor="emerald" className="h-full">
            <h3 className="text-lg font-semibold text-white mb-6">Prioritized Actions</h3>
            
            <div className="space-y-8">
              
              {/* High Priority */}
              <div className="space-y-4">
                <div className="text-xs font-bold tracking-widest text-amber-500 uppercase flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  High Priority
                </div>
                
                <div className="p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-white font-medium">Enable 2FA on Primary Email</h4>
                    <button className="px-3 py-1 rounded-full bg-white/10 text-xs font-medium text-white group-hover:bg-white/20 transition-colors">
                      Fix Now
                    </button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Your primary email is used for password recovery across 12 connected services. Securing it prevents a single point of failure.
                  </p>
                </div>
              </div>

              {/* Recommended */}
              <div className="space-y-4">
                <div className="text-xs font-bold tracking-widest text-emerald-500 uppercase flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  Recommended
                </div>
                
                <div className="p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-white font-medium">Review App Permissions</h4>
                    <button className="px-3 py-1 rounded-full bg-white/10 text-xs font-medium text-white group-hover:bg-white/20 transition-colors">
                      Review
                    </button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                      If SANKALP detects any unusual patterns—like logins from a new country or suspicious API access requests—the SHIELD domain locks down the environment instantly. You&apos;ll be alerted immediately.
                  </p>
                </div>
              </div>

            </div>
          </LivingCard>
        </div>

      </div>
    </DomainShell>
  )
}
