"use client"

import { motion } from "framer-motion"

export function StitchConnectedSystem() {
  return (
    <section className="py-32 relative z-10 px-6 border-t border-[#00e5ff]/10 bg-black overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00e5ff]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-24"
        >
          <div className="flex flex-col items-center mb-8">
            <span className="text-xs font-semibold tracking-[0.2em] text-[#b042ff] uppercase mb-4">
              System Architecture
            </span>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#b042ff]/50 to-transparent" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">
            Different signals. One cosmic picture.
          </h2>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto font-medium">
            Each domain focuses on a different aspect of your academic and digital life. SANKALP connects these signals through Graviton to help you make clearer decisions.
          </p>
        </motion.div>

        {/* Abstract Visualization */}
        <div className="relative max-w-4xl mx-auto py-12 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-0">
          
          {/* Domains Stack */}
          <div className="flex flex-col gap-4 relative z-10 w-full md:w-[220px]">
            {["EXPLORE", "SHAPE", "INSIGHT", "SECURE", "WATCH", "CONNECT"].map((domain, i) => (
              <motion.div
                key={domain}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
                className="px-6 py-3 border border-zinc-800 bg-zinc-950/80 backdrop-blur-md rounded-xl text-sm font-semibold tracking-widest text-zinc-300 text-center md:text-left shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:border-[#00e5ff]/50 hover:text-[#00e5ff] transition-colors"
              >
                {domain}
              </motion.div>
            ))}
          </div>

          {/* Connection Lines (Desktop) */}
          <div className="hidden md:flex flex-1 items-center justify-center relative h-full min-h-[400px]">
             {/* Dynamic lines drawing from domains to center */}
             <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
               {[10, 26, 42, 58, 74, 90].map((percent, i) => (
                  <motion.path
                    key={i}
                    d={`M 0 ${percent}% C 50% ${percent}%, 50% 50%, 100% 50%`}
                    fill="none"
                    stroke="url(#cyan-gradient)"
                    strokeWidth="2"
                    className="opacity-60"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 0.6 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 2, delay: i * 0.15, ease: "easeInOut" }}
                  />
               ))}
               <defs>
                 <linearGradient id="cyan-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                   <stop offset="0%" stopColor="#09090b" />
                   <stop offset="50%" stopColor="#00e5ff" />
                   <stop offset="100%" stopColor="#b042ff" />
                 </linearGradient>
               </defs>
             </svg>
          </div>

          {/* Connection Icon (Mobile) */}
          <div className="md:hidden flex justify-center w-full py-8">
             <div className="w-[2px] h-24 bg-gradient-to-b from-[#00e5ff]/10 via-[#00e5ff] to-[#b042ff]/10" />
          </div>

          {/* Core System */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.8, type: "spring" }}
            className="relative z-10 flex flex-col items-center justify-center w-full md:w-auto"
          >
            <div className="w-40 h-40 rounded-full bg-zinc-950 border-2 border-[#00e5ff]/50 flex items-center justify-center relative shadow-[0_0_50px_rgba(0,229,255,0.2)] backdrop-blur-xl">
               {/* Pulsing rings */}
               <motion.div 
                 animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                 transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                 className="absolute inset-0 rounded-full border-2 border-[#00e5ff]" 
               />
               <motion.div 
                 animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
                 transition={{ duration: 3, delay: 1, repeat: Infinity, ease: "easeInOut" }}
                 className="absolute inset-0 rounded-full border border-[#b042ff]" 
               />
               <span className="font-bold tracking-[0.3em] text-white text-xl relative z-10 drop-shadow-[0_0_10px_rgba(0,229,255,0.8)]">
                 SANKALP
               </span>
            </div>
            
            <div className="mt-8 md:ml-8 text-center md:text-left flex items-center flex-col md:flex-row gap-4">
               <div className="hidden md:block w-12 h-[2px] bg-gradient-to-r from-[#b042ff] to-transparent" />
               <span className="text-white font-semibold tracking-widest uppercase px-6 py-3 border border-[#b042ff]/30 bg-[#b042ff]/10 rounded-full shadow-[0_0_20px_rgba(176,66,255,0.2)]">
                 Clearer decisions
               </span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
