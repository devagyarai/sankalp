"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function StitchFinalCTA() {
  return (
    <section className="py-32 relative z-10 px-6 border-t border-[#00e5ff]/10 overflow-hidden bg-black">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] max-w-[800px] h-[80vw] max-h-[800px] rounded-full pointer-events-none opacity-20"
           style={{
             background: 'radial-gradient(circle, #00e5ff 0%, #b042ff 50%, transparent 100%)',
             filter: 'blur(80px)'
           }}
      />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" 
           style={{ backgroundImage: 'linear-gradient(#00e5ff 1px, transparent 1px), linear-gradient(90deg, #00e5ff 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
      />

      <div className="max-w-4xl mx-auto text-center relative z-10 bg-zinc-950/60 backdrop-blur-xl p-12 md:p-20 rounded-3xl border border-zinc-700/50 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center"
        >
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#00e5ff] to-[#b042ff] flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(0,229,255,0.4)]">
             <Rocket className="w-10 h-10 text-white" />
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6 leading-tight">
            Understand what matters. <br className="hidden md:block" /> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00e5ff] to-[#b042ff]">Move with velocity.</span>
          </h2>
          <p className="text-xl md:text-2xl text-zinc-400 mb-12 font-medium">
            Engage the hyperdrive and start with the domain that matters most.
          </p>

          <Link 
            href="/dashboard"
            className="inline-flex items-center justify-center gap-3 px-10 py-5 rounded-2xl bg-[#00e5ff] hover:bg-[#00c9e0] text-[black] font-bold text-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_30px_rgba(0,229,255,0.4)] hover:shadow-[0_0_50px_rgba(0,229,255,0.6)] group w-full sm:w-auto"
          >
            Enter Workspace 
            <ArrowRight className="w-6 h-6 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

// Ensure Rocket is imported if used
import { Rocket } from "lucide-react";

