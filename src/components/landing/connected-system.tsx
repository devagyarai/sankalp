"use client"

import { motion } from "framer-motion"

export function ConnectedSystem() {
  return (
    <section className="py-32 relative z-10 px-6 border-t border-white/5 bg-background">
      <div className="max-w-5xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-24"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6">
            Different signals. One bigger picture.
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-light">
            Each domain focuses on a different aspect of your academic and digital life. SANKALP connects these signals to help you make clearer decisions.
          </p>
        </motion.div>

        {/* Abstract Visualization */}
        <div className="relative max-w-3xl mx-auto py-12 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-0">
          
          {/* Domains Stack */}
          <div className="flex flex-col gap-4 relative z-10 w-full md:w-[200px]">
            {["EXPLORE", "SHAPE", "INSIGHT", "SECURE", "WATCH", "CONNECT"].map((domain, i) => (
              <motion.div
                key={domain}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
                className="px-4 py-2 border border-white/10 rounded bg-white/[0.02] text-sm font-medium tracking-widest text-white/70 text-center md:text-left shadow-sm"
              >
                {domain}
              </motion.div>
            ))}
          </div>

          {/* Connection Lines (Desktop) */}
          <div className="hidden md:flex flex-1 items-center justify-center relative h-full min-h-[300px]">
             {/* Dynamic lines drawing from domains to center */}
             <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-50" preserveAspectRatio="none">
               {[10, 30, 50, 70, 90].map((percent, i) => (
                  <motion.path
                    key={i}
                    d={`M 0 ${percent}% C 50% ${percent}%, 50% 50%, 100% 50%`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    className="text-white/20"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1.5, delay: i * 0.1, ease: "easeInOut" }}
                  />
               ))}
             </svg>
          </div>

          {/* Connection Icon (Mobile) */}
          <div className="md:hidden flex justify-center w-full py-4 text-white/20">
             <div className="w-[1px] h-16 bg-gradient-to-b from-white/20 to-primary/50" />
          </div>

          {/* Core System */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            className="relative z-10 flex flex-col items-center justify-center w-full md:w-auto"
          >
            <div className="w-32 h-32 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center relative shadow-[0_0_30px_rgba(255,255,255,0.05)]">
               {/* Pulsing ring */}
               <motion.div 
                 animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.1, 0.3] }}
                 transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                 className="absolute inset-0 rounded-full border border-primary/30" 
               />
               <span className="font-bold tracking-widest text-white text-lg relative z-10">
                 SANKALP
               </span>
            </div>
            
            <div className="mt-8 md:ml-8 text-center md:text-left flex items-center flex-col md:flex-row gap-4">
               <div className="hidden md:block w-8 h-[1px] bg-primary/30" />
               <span className="text-white/90 font-medium px-4 py-2 border border-primary/20 bg-primary/10 rounded-full">
                 Clearer decisions
               </span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
