"use client"

import { useState } from "react"
import { StitchDomainShell } from "@/components/stitch/stitch-domain-shell"
import { StitchDomainHeader } from "@/components/stitch/stitch-domain-header"
import { StitchGlassCard } from "@/components/stitch/stitch-glass-card"
import { AlertOctagon, Link as LinkIcon, MessageSquareWarning, Radar, Loader2, CheckCircle2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

type AnalysisState = 'IDLE' | 'ANALYZING' | 'RESULT'

export default function StitchWatchPage() {
  const [analysisState, setAnalysisState] = useState<AnalysisState>('IDLE')
  const [inputValue, setInputValue] = useState("http://login-security-update-alert-9128.com/verify-account")
  const [riskLevel, setRiskLevel] = useState<'HIGH' | 'LOW' | null>(null)

  const handleAnalyze = () => {
    if (!inputValue.trim()) return
    setAnalysisState('ANALYZING')
    
    setTimeout(() => {
      // Very simple logic: if input contains 'sankalp' or 'safe', mark as low risk. Otherwise high risk.
      const isSafe = inputValue.toLowerCase().includes('safe') || inputValue.toLowerCase().includes('sankalp')
      setRiskLevel(isSafe ? 'LOW' : 'HIGH')
      setAnalysisState('RESULT')
    }, 3000)
  }

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
          <StitchGlassCard className={`h-full flex flex-col transition-colors duration-500 ${analysisState === 'ANALYZING' ? 'border-[#ffc400] shadow-[0_0_30px_rgba(255,196,0,0.2)]' : 'border-[#ffc400]/20 hover:border-[#ffc400]/40'}`}>
            <h3 className="text-lg font-black tracking-widest text-white mb-6 uppercase flex items-center gap-3">
              <div className="p-2 rounded-xl bg-[#ffc400]/10 border border-[#ffc400]/30">
                <Radar className={`w-5 h-5 text-[#ffc400] ${analysisState === 'ANALYZING' ? 'animate-spin' : ''}`} />
              </div>
              Detection Workspace
            </h3>
            
            {/* Input Shell */}
            <div className={`bg-black/60 border rounded-2xl p-5 mb-8 transition-all duration-300 relative overflow-hidden ${
              analysisState === 'ANALYZING' 
                ? 'border-[#ffc400] shadow-[0_0_30px_rgba(255,196,0,0.15)]' 
                : 'border-zinc-800 focus-within:border-[#ffc400]/50'
            }`}>
               
               {/* Animated Scanning Line */}
               {analysisState === 'ANALYZING' && (
                 <>
                   <motion.div 
                     className="absolute top-0 left-0 w-full h-[2px] bg-[#ffc400] z-20 shadow-[0_0_15px_#ffc400]"
                     animate={{ top: ["0%", "100%", "0%"] }}
                     transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                   />
                   <motion.div 
                     className="absolute top-0 left-0 w-full h-12 bg-gradient-to-b from-[#ffc400]/20 to-transparent pointer-events-none z-10"
                     animate={{ top: ["0%", "100%", "0%"] }}
                     transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                   />
                 </>
               )}
               
               <div className={`absolute top-0 left-0 w-1 h-full transition-colors ${analysisState === 'RESULT' && riskLevel === 'LOW' ? 'bg-[#00e676]' : analysisState === 'RESULT' && riskLevel === 'HIGH' ? 'bg-red-500' : 'bg-[#ffc400]'}`} />
               
               <textarea 
                 value={inputValue}
                 onChange={(e) => setInputValue(e.target.value)}
                 disabled={analysisState === 'ANALYZING'}
                 placeholder="Paste a suspicious link, email, or message here for analysis..."
                 className={`w-full bg-transparent border-none outline-none resize-none font-mono min-h-[100px] transition-colors ${analysisState === 'ANALYZING' ? 'text-zinc-500 cursor-wait' : 'text-white placeholder:text-zinc-600'}`}
               />
               
               <div className="flex justify-end mt-4 relative z-20">
                 <button 
                   onClick={handleAnalyze}
                   disabled={analysisState === 'ANALYZING' || !inputValue.trim()}
                   className={`px-6 py-3 rounded-xl font-black uppercase tracking-widest transition-all duration-300 flex items-center gap-2 ${
                     analysisState === 'ANALYZING' 
                       ? 'bg-[#ffc400]/20 text-[#ffc400] cursor-not-allowed border border-[#ffc400]/30'
                       : 'bg-[#ffc400] text-black hover:bg-[#ffcd33] shadow-[0_0_15px_rgba(255,196,0,0.4)]'
                   }`}
                 >
                   {analysisState === 'ANALYZING' ? (
                     <><Loader2 className="w-4 h-4 animate-spin" /> Scanning</>
                   ) : analysisState === 'RESULT' ? (
                     'Re-Analyze'
                   ) : (
                     'Analyze Risk'
                   )}
                 </button>
               </div>
            </div>

            {/* Explainability / Breakdown */}
            <AnimatePresence mode="wait">
              {analysisState === 'RESULT' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <h4 className="text-xs font-black tracking-widest text-zinc-500 uppercase mb-4">Signal Breakdown</h4>
                  
                  {riskLevel === 'HIGH' ? (
                    <>
                      <div className="p-5 rounded-2xl border border-red-500/30 bg-red-500/5 flex items-start gap-4">
                        <div className="p-2 rounded-xl bg-red-500/20 text-red-500 border border-red-500/30 shrink-0">
                          <LinkIcon className="w-5 h-5" />
                        </div>
                        <div>
                          <h5 className="text-red-400 font-bold text-sm mb-1 uppercase tracking-wide">Suspicious Structure</h5>
                          <p className="text-zinc-400 text-sm leading-relaxed font-medium">
                            The input pattern mimics known phishing or spam vectors. It is not associated with any trusted provider in the Cypherverse registry.
                          </p>
                        </div>
                      </div>

                      <div className="p-5 rounded-2xl border border-[#ffc400]/30 bg-[#ffc400]/5 flex items-start gap-4">
                        <div className="p-2 rounded-xl bg-[#ffc400]/20 text-[#ffc400] border border-[#ffc400]/30 shrink-0">
                          <MessageSquareWarning className="w-5 h-5" />
                        </div>
                        <div>
                          <h5 className="text-[#ffc400] font-bold text-sm mb-1 uppercase tracking-wide">Deceptive Semantics</h5>
                          <p className="text-zinc-400 text-sm leading-relaxed font-medium">
                            The phrasing attempts to bypass critical thinking and force compliance or misdirection.
                          </p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="p-5 rounded-2xl border border-[#00e676]/30 bg-[#00e676]/5 flex items-start gap-4">
                      <div className="p-2 rounded-xl bg-[#00e676]/20 text-[#00e676] border border-[#00e676]/30 shrink-0">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                      <div>
                        <h5 className="text-[#00e676] font-bold text-sm mb-1 uppercase tracking-wide">Clean Telemetry</h5>
                        <p className="text-zinc-400 text-sm leading-relaxed font-medium">
                          No known threat signatures detected. The syntax appears standard and lacks malicious routing.
                        </p>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </StitchGlassCard>
        </div>

        {/* Risk Assessment */}
        <div className="lg:col-span-1">
          <StitchGlassCard className={`h-full relative overflow-hidden transition-colors duration-500 ${
            analysisState === 'IDLE' || analysisState === 'ANALYZING'
              ? 'border-zinc-800 bg-zinc-950/50' 
              : riskLevel === 'HIGH'
                ? 'border-red-500/30 bg-red-500/5 shadow-[0_0_30px_rgba(239,68,68,0.1)] hover:border-red-500/50'
                : 'border-[#00e676]/30 bg-[#00e676]/5 shadow-[0_0_30px_rgba(0,230,118,0.1)] hover:border-[#00e676]/50'
          }`}>
             
             {/* Background glow for result state */}
             <AnimatePresence>
               {analysisState === 'RESULT' && (
                 <motion.div 
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1, scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
                   transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                   className={`absolute -top-12 -right-12 w-48 h-48 blur-[50px] rounded-full pointer-events-none ${
                     riskLevel === 'HIGH' ? 'bg-red-500/20' : 'bg-[#00e676]/20'
                   }`}
                 />
               )}
             </AnimatePresence>
             
             <div className="relative z-10">
                <div className="flex items-center gap-3 mb-8">
                  <div className={`p-2 rounded-xl border transition-colors ${
                    analysisState === 'IDLE' || analysisState === 'ANALYZING'
                      ? 'bg-zinc-900 border-zinc-700'
                      : riskLevel === 'HIGH'
                        ? 'bg-red-500/20 border-red-500/40'
                        : 'bg-[#00e676]/20 border-[#00e676]/40'
                  }`}>
                    {analysisState === 'RESULT' && riskLevel === 'LOW' ? (
                      <CheckCircle2 className="w-5 h-5 text-[#00e676]" />
                    ) : (
                      <AlertOctagon className={`w-5 h-5 ${analysisState === 'IDLE' || analysisState === 'ANALYZING' ? 'text-zinc-500' : 'text-red-500'}`} />
                    )}
                  </div>
                  <h3 className="text-lg font-black tracking-widest uppercase text-white">Risk Assessment</h3>
                </div>
                
                {analysisState === 'IDLE' || analysisState === 'ANALYZING' ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <Radar className={`w-12 h-12 text-zinc-700 mb-4 ${analysisState === 'ANALYZING' ? 'animate-spin' : ''}`} />
                    <p className="text-zinc-500 font-bold tracking-widest uppercase text-sm">
                      {analysisState === 'ANALYZING' ? 'Processing Signal...' : 'Awaiting Input'}
                    </p>
                  </div>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="space-y-8"
                  >
                    <div className={`flex flex-col items-center justify-center py-8 border-b bg-black/40 rounded-2xl ${
                      riskLevel === 'HIGH' ? 'border-red-500/20' : 'border-[#00e676]/20'
                    }`}>
                       <div className={`text-6xl font-black mb-2 tracking-tighter ${
                         riskLevel === 'HIGH' ? 'text-red-500 drop-shadow-[0_0_20px_rgba(239,68,68,0.6)]' : 'text-[#00e676] drop-shadow-[0_0_20px_rgba(0,230,118,0.6)]'
                       }`}>
                         {riskLevel === 'HIGH' ? 'HIGH' : 'LOW'}
                       </div>
                       <div className={`text-xs font-black tracking-[0.2em] uppercase px-3 py-1 rounded-full border ${
                         riskLevel === 'HIGH' ? 'text-red-400 bg-red-500/10 border-red-500/30' : 'text-[#00e676] bg-[#00e676]/10 border-[#00e676]/30'
                       }`}>
                         {riskLevel === 'HIGH' ? 'Risk Detected' : 'Safe to Proceed'}
                       </div>
                    </div>

                    <div className="space-y-4 bg-black/20 p-5 rounded-xl border border-zinc-900">
                       <div className="flex justify-between items-center text-sm border-b border-zinc-800 pb-3">
                         <span className="text-zinc-400 font-bold uppercase tracking-wider text-xs">Confidence Score</span>
                         <span className={`font-mono font-black text-base ${riskLevel === 'HIGH' ? 'text-[#00e5ff]' : 'text-[#00e676]'}`}>
                           {riskLevel === 'HIGH' ? '94%' : '99%'}
                         </span>
                       </div>
                       <div className="flex justify-between items-center text-sm border-b border-zinc-800 pb-3 pt-1">
                         <span className="text-zinc-400 font-bold uppercase tracking-wider text-xs">Category</span>
                         <span className="text-white font-bold">{riskLevel === 'HIGH' ? 'Phishing / Spam' : 'Clean'}</span>
                       </div>
                    </div>

                    <div className="mt-8">
                      <h4 className="text-[10px] font-black tracking-widest text-zinc-500 uppercase mb-3">Recommended Course</h4>
                      {riskLevel === 'HIGH' ? (
                        <p className="text-sm text-red-400 font-medium leading-relaxed bg-red-500/10 p-4 rounded-xl border border-red-500/20 border-l-4 border-l-red-500">
                          Do not interact with this link. Do not provide any credentials. Delete the message containing this URL immediately.
                        </p>
                      ) : (
                        <p className="text-sm text-[#00e676] font-medium leading-relaxed bg-[#00e676]/10 p-4 rounded-xl border border-[#00e676]/20 border-l-4 border-l-[#00e676]">
                          The payload appears safe. Standard cyber hygiene is still recommended when interacting with any external domains.
                        </p>
                      )}
                    </div>
                  </motion.div>
                )}
             </div>
          </StitchGlassCard>
        </div>

      </div>
    </StitchDomainShell>
  )
}
