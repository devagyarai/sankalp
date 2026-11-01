"use client"

import { useState } from "react"
import { StitchDomainShell } from "@/components/stitch/stitch-domain-shell"
import { StitchDomainHeader } from "@/components/stitch/stitch-domain-header"
import { StitchGlassCard } from "@/components/stitch/stitch-glass-card"
import { ShieldCheck, AlertCircle, CheckCircle2, Lock, MonitorSmartphone, Key, Loader2, Shield } from "lucide-react"
import { motion } from "framer-motion"
import { useAuth } from "@/lib/auth-context"
import { fetchApi } from "@/lib/api-client"

export default function SecurePage() {
  const { currentUser, users } = useAuth()
  
  // Student State
  const [score, setScore] = useState(85)
  const [action1State, setAction1State] = useState<'IDLE' | 'PROCESSING' | 'RESOLVED'>('IDLE')
  const [action2State, setAction2State] = useState<'IDLE' | 'PROCESSING' | 'RESOLVED'>('IDLE')

  const handleFixAction1 = async () => {
    setAction1State('PROCESSING')
    try {
      await fetchApi('/intelligence/shield')
    } catch (err) {
      console.error(err)
    }
    setAction1State('RESOLVED')
    setScore(prev => prev + 9) // 85 -> 94
  }

  const handleFixAction2 = () => {
    setAction2State('PROCESSING')
    setTimeout(() => {
      setAction2State('RESOLVED')
      setScore(prev => prev + 6) // Score boost
    }, 1500)
  }

  // COMMANDER VIEW
  if (currentUser.role === 'COMMANDER') {
    const students = users.filter(u => u.role === 'STUDENT')
    const avgSafetyScore = Math.round(students.reduce((acc, s) => acc + (s.metrics?.safetyScore || 0), 0) / students.length)
    const criticalVulnerabilities = students.filter(u => u.metrics && u.metrics.safetyScore < 90)

    return (
      <StitchDomainShell domainId="secure">
        <StitchDomainHeader 
          domainId="secure"
          title="System Vulnerability Scanner"
          description="Monitor fleet-wide digital safety posture and identify critical security vulnerabilities across assigned cadets."
        />
        
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <StitchGlassCard className={`text-center transition-colors duration-700 ${avgSafetyScore > 90 ? 'border-[#00e676]/30 bg-[#00e676]/5' : 'border-[#ffc400]/30 bg-[#ffc400]/5'} relative overflow-hidden`}>
               <div className="relative z-10 flex flex-col items-center">
                  <div className={`p-4 rounded-2xl border mb-6 ${avgSafetyScore > 90 ? 'bg-[#00e676]/10 border-[#00e676]/30 text-[#00e676]' : 'bg-[#ffc400]/10 border-[#ffc400]/30 text-[#ffc400]'}`}>
                    <Shield className="w-10 h-10" />
                  </div>
                  <h3 className="text-sm font-black tracking-widest uppercase text-zinc-400 mb-2">Fleet Safety Posture</h3>
                  <div className={`text-6xl font-black mb-2 ${avgSafetyScore > 90 ? 'text-[#00e676]' : 'text-[#ffc400]'}`}>
                    {avgSafetyScore}<span className="text-2xl opacity-50">/100</span>
                  </div>
                  <p className={`font-bold tracking-widest uppercase text-xs px-3 py-1 rounded-full border mt-2 ${avgSafetyScore > 90 ? 'text-[#00e676] border-[#00e676]/30 bg-[#00e676]/10' : 'text-[#ffc400] border-[#ffc400]/30 bg-[#ffc400]/10'}`}>
                    {avgSafetyScore > 90 ? 'Secure' : 'Needs Review'}
                  </p>
               </div>
            </StitchGlassCard>

            <StitchGlassCard className="space-y-4 border-zinc-800">
               <h4 className="text-xs font-black tracking-widest text-zinc-500 uppercase mb-4 flex items-center gap-2">
                 <ShieldCheck className="w-4 h-4" /> Global Policies
               </h4>
               
               {[
                 { name: "Enforce 2FA", status: "Active", color: "text-[#00e676]" },
                 { name: "Phishing Simulations", status: "Running", color: "text-[#00e5ff]" },
                 { name: "Password Rotation (90d)", status: "Failing", color: "text-red-500" },
               ].map(policy => (
                 <div key={policy.name} className="flex items-center justify-between p-3 rounded-xl bg-zinc-900/50 border border-zinc-800">
                    <span className="text-sm text-zinc-300 font-bold tracking-wide">{policy.name}</span>
                    <span className={`text-[10px] font-black uppercase tracking-widest ${policy.color}`}>{policy.status}</span>
                 </div>
               ))}
            </StitchGlassCard>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <StitchGlassCard className="h-full border-[#ffc400]/30 hover:border-[#ffc400]/50">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-black tracking-widest text-white uppercase flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-[#ffc400]/10 border border-[#ffc400]/30">
                    <AlertCircle className="w-5 h-5 text-[#ffc400]" />
                  </div>
                  Cadet Vulnerability Log
                </h3>
              </div>
              
              <div className="space-y-4">
                {criticalVulnerabilities.map(cadet => (
                  <div key={cadet.id} className="p-4 rounded-xl border border-red-500/30 bg-red-500/5 flex items-center justify-between">
                     <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${cadet.avatarColor}/20 border border-red-500/50 text-red-500 font-bold`}>
                           {cadet.name[0]}
                        </div>
                        <div>
                           <h4 className="font-bold text-white text-sm">{cadet.name}</h4>
                           <p className="text-xs text-red-400 font-medium tracking-wide">Critical: No 2FA Enabled</p>
                        </div>
                     </div>
                     <div className="flex items-center gap-4">
                        <div className="text-right">
                           <div className="text-red-500 font-mono font-bold text-lg">{cadet.metrics?.safetyScore}</div>
                           <div className="text-[10px] uppercase tracking-widest text-zinc-500">Score</div>
                        </div>
                        <button className="px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/30 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-colors">
                          Enforce
                        </button>
                     </div>
                  </div>
                ))}
                
                {/* Mock a resolved log */}
                <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/50 flex items-center justify-between opacity-60">
                     <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-zinc-800 border border-zinc-700 text-zinc-400 font-bold">
                           A
                        </div>
                        <div>
                           <h4 className="font-bold text-zinc-400 text-sm">Student Alpha</h4>
                           <p className="text-xs text-zinc-500 font-medium tracking-wide">Resolved: Suspicious Login</p>
                        </div>
                     </div>
                     <div className="flex items-center gap-4">
                        <div className="text-right">
                           <div className="text-[#00e676] font-mono font-bold text-lg">99</div>
                           <div className="text-[10px] uppercase tracking-widest text-zinc-600">Score</div>
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

  // STUDENT VIEW
  return (
    <StitchDomainShell domainId="secure">
      <StitchDomainHeader 
        domainId="secure"
        title="Know how protected your digital life is."
        description="Understand your digital safety posture and get prioritized recommendations to secure your online presence in Graviton."
      />
      
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Security Overview */}
        <div className="lg:col-span-1 space-y-6">
          <StitchGlassCard className={`text-center group transition-colors duration-700 ${score > 90 ? 'border-[#00e676]/30 bg-[#00e676]/5 hover:border-[#00e676]/50' : 'border-[#f50057]/30 bg-[#f50057]/5 hover:border-[#f50057]/50'} hover:shadow-[0_0_30px_rgba(245,0,87,0.2)] relative overflow-hidden`}>
             <motion.div 
               className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 blur-[40px] rounded-full pointer-events-none transition-colors duration-1000 ${score > 90 ? 'bg-[#00e676]/20' : 'bg-[#f50057]/10'}`} 
               animate={{ scale: [1, 1.1, 1], opacity: [0.6, 1, 0.6] }}
               transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
             />
             
             <div className="relative z-10 flex flex-col items-center">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className={`p-4 rounded-2xl border mb-6 transition-colors duration-700 ${score > 90 ? 'bg-[#00e676]/10 border-[#00e676]/30 shadow-[0_0_20px_rgba(0,230,118,0.3)]' : 'bg-[#f50057]/10 border-[#f50057]/30 shadow-[0_0_20px_rgba(245,0,87,0.3)]'}`}
                >
                  {score > 90 ? <Shield className="w-10 h-10 text-[#00e676]" /> : <ShieldCheck className="w-10 h-10 text-[#f50057]" />}
                </motion.div>
                <h3 className="text-sm font-black tracking-widest uppercase text-zinc-400 mb-2">Safety Posture</h3>
                
                {/* Animated Score */}
                <div className={`text-6xl font-black mb-2 transition-colors duration-700 ${score > 90 ? 'text-[#00e676] drop-shadow-[0_0_15px_rgba(0,230,118,0.5)]' : 'text-[#f50057] drop-shadow-[0_0_15px_rgba(245,0,87,0.5)]'}`}>
                  <motion.span
                    key={score}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  >
                    {score}
                  </motion.span>
                  <span className={`text-2xl transition-colors duration-700 ${score > 90 ? 'text-[#00e676]/50' : 'text-[#f50057]/50'}`}>/100</span>
                </div>
                
                <p className={`font-bold tracking-widest uppercase text-xs px-3 py-1 rounded-full border mt-2 transition-colors duration-700 ${score > 90 ? 'text-[#00e676] bg-[#00e676]/10 border-[#00e676]/30' : 'text-[#f50057] bg-[#f50057]/10 border-[#f50057]/30'}`}>
                  {score > 90 ? 'Maximum Protection' : 'Strong Protection'}
                </p>
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

             <div className={`flex items-center justify-between p-3 rounded-xl border transition-colors duration-500 ${action2State === 'RESOLVED' ? 'bg-zinc-900/50 border-zinc-800 hover:border-[#00e676]/30' : 'bg-[#ffc400]/5 border-[#ffc400]/20 hover:border-[#ffc400]/40'}`}>
                <div className="flex items-center gap-3">
                  <Lock className={`w-4 h-4 transition-colors ${action2State === 'RESOLVED' ? 'text-[#00e676]' : 'text-[#ffc400]'}`} />
                  <span className="text-sm text-zinc-300 font-bold tracking-wide">Password Hygiene</span>
                </div>
                {action2State === 'RESOLVED' ? (
                  <CheckCircle2 className="w-4 h-4 text-[#00e676]" />
                ) : (
                  <span className="text-[10px] font-black tracking-widest text-[#ffc400] bg-[#ffc400]/10 px-2 py-1 rounded uppercase border border-[#ffc400]/30">Review</span>
                )}
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
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-black tracking-widest text-white uppercase flex items-center gap-3">
                <div className="p-2 rounded-xl bg-[#f50057]/10 border border-[#f50057]/30">
                  <ShieldCheck className="w-5 h-5 text-[#f50057]" />
                </div>
                Prioritized Actions
              </h3>
              {score > 90 && (
                <span className="text-xs font-bold text-[#00e676] bg-[#00e676]/10 px-3 py-1 rounded-full border border-[#00e676]/30">All systems secure</span>
              )}
            </div>
            
            <div className="space-y-8">
              
              {/* High Priority Action 1 */}
              <div className="space-y-4">
                <div className={`text-[10px] font-black tracking-widest uppercase flex items-center gap-2 transition-colors ${action1State === 'RESOLVED' ? 'text-[#00e676]' : 'text-[#ffc400]'}`}>
                  {action1State === 'RESOLVED' ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                  {action1State === 'RESOLVED' ? 'Resolved' : 'High Priority'}
                </div>
                
                <motion.div 
                  layout
                  className={`p-5 rounded-2xl border transition-all duration-300 relative overflow-hidden ${
                    action1State === 'RESOLVED'
                      ? 'border-[#00e676]/30 bg-zinc-950/50 opacity-50'
                      : 'border-zinc-800 bg-zinc-950 hover:bg-black hover:border-[#ffc400]/30 cursor-pointer group'
                  }`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <h4 className={`font-bold text-lg transition-colors ${action1State === 'RESOLVED' ? 'text-zinc-500' : 'text-white'}`}>
                      Enable 2FA on Primary Email
                    </h4>
                    
                    {action1State === 'IDLE' && (
                      <button 
                        onClick={handleFixAction1}
                        className="px-4 py-2 rounded-xl border border-zinc-700 bg-zinc-900 text-xs font-bold uppercase tracking-widest text-white group-hover:bg-[#ffc400] group-hover:text-black group-hover:border-[#ffc400] transition-colors"
                      >
                        Fix Now
                      </button>
                    )}
                    {action1State === 'PROCESSING' && (
                      <button disabled className="px-4 py-2 rounded-xl border border-[#ffc400]/30 bg-[#ffc400]/10 text-xs font-bold uppercase tracking-widest text-[#ffc400] flex items-center gap-2">
                        <Loader2 className="w-3 h-3 animate-spin" /> Securing...
                      </button>
                    )}
                    {action1State === 'RESOLVED' && (
                      <div className="px-4 py-2 rounded-xl bg-[#00e676]/10 text-[#00e676] text-xs font-bold uppercase tracking-widest border border-[#00e676]/30">
                        Secured
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-zinc-500 font-medium leading-relaxed">
                    Your primary email is used for password recovery across 12 connected services in Graviton. Securing it prevents a single point of failure.
                  </p>
                </motion.div>
              </div>

              {/* Recommended Action 2 */}
              <div className="space-y-4">
                <div className={`text-[10px] font-black tracking-widest uppercase flex items-center gap-2 transition-colors ${action2State === 'RESOLVED' ? 'text-[#00e676]' : 'text-zinc-400'}`}>
                  <CheckCircle2 className="w-4 h-4" />
                  {action2State === 'RESOLVED' ? 'Resolved' : 'Recommended'}
                </div>
                
                <motion.div 
                  layout
                  className={`p-5 rounded-2xl border transition-all duration-300 relative overflow-hidden ${
                    action2State === 'RESOLVED'
                      ? 'border-[#00e676]/30 bg-zinc-950/50 opacity-50'
                      : 'border-zinc-800 bg-zinc-950 hover:bg-black hover:border-zinc-600 cursor-pointer group'
                  }`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <h4 className={`font-bold text-lg transition-colors ${action2State === 'RESOLVED' ? 'text-zinc-500' : 'text-white'}`}>
                      Review App Permissions
                    </h4>
                    
                    {action2State === 'IDLE' && (
                      <button 
                        onClick={handleFixAction2}
                        className="px-4 py-2 rounded-xl border border-zinc-700 bg-zinc-900 text-xs font-bold uppercase tracking-widest text-white group-hover:bg-white group-hover:text-black group-hover:border-white transition-colors"
                      >
                        Review
                      </button>
                    )}
                    {action2State === 'PROCESSING' && (
                      <button disabled className="px-4 py-2 rounded-xl border border-zinc-500 bg-zinc-800 text-xs font-bold uppercase tracking-widest text-zinc-300 flex items-center gap-2">
                        <Loader2 className="w-3 h-3 animate-spin" /> Auditing...
                      </button>
                    )}
                    {action2State === 'RESOLVED' && (
                      <div className="px-4 py-2 rounded-xl bg-[#00e676]/10 text-[#00e676] text-xs font-bold uppercase tracking-widest border border-[#00e676]/30">
                        Audited
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-zinc-500 font-medium leading-relaxed">
                      If SANKALP detects any unusual patterns—like logins from a new quadrant or suspicious API access requests—the SECURE domain locks down the environment instantly.
                  </p>
                </motion.div>
              </div>

            </div>
          </StitchGlassCard>
        </div>

      </div>
    </StitchDomainShell>
  )
}
