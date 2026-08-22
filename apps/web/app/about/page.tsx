"use client"

import { StitchNavbar } from "@/components/stitch/stitch-navbar"
import { StitchFooter } from "@/components/stitch/stitch-footer"
import { motion } from "framer-motion"
import { Rocket, Shield, Globe, Cpu } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black selection:bg-[#00e5ff]/30 text-white font-sans overflow-x-hidden flex flex-col">
      <StitchNavbar />
      
      <main className="flex-1 pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-3xl bg-[#00e5ff]/10 border border-[#00e5ff]/30 flex items-center justify-center shadow-[0_0_30px_rgba(0,229,255,0.2)]">
                <Rocket className="w-10 h-10 text-[#00e5ff]" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-6 uppercase">
              About <span className="text-[#00e5ff]">SANKALP</span>
            </h1>
            <p className="text-lg text-zinc-400 font-medium max-w-2xl mx-auto leading-relaxed">
              SANKALP is a next-generation intelligence hub designed to seamlessly weave together study optimization, career trajectory tracking, and digital security in the Cypherverse.
            </p>
          </motion.div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-8 rounded-3xl bg-zinc-950/80 border border-zinc-800 hover:border-[#00e5ff]/50 transition-colors"
            >
              <Cpu className="w-8 h-8 text-[#00e5ff] mb-6" />
              <h3 className="text-xl font-bold text-white mb-3 tracking-wide">Intelligent Processing</h3>
              <p className="text-zinc-400 font-medium leading-relaxed">
                We process complex data streams to give you the exact insight you need, exactly when you need it. From academic signals to scam detection, it's all connected.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-8 rounded-3xl bg-zinc-950/80 border border-zinc-800 hover:border-[#b042ff]/50 transition-colors"
            >
              <Shield className="w-8 h-8 text-[#b042ff] mb-6" />
              <h3 className="text-xl font-bold text-white mb-3 tracking-wide">Absolute Security</h3>
              <p className="text-zinc-400 font-medium leading-relaxed">
                With domains like SECURE and WATCH, your digital footprint is monitored for threats, ensuring you navigate the cosmic web safely.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-8 rounded-3xl bg-zinc-950/80 border border-zinc-800 hover:border-[#ff3d00]/50 transition-colors md:col-span-2"
            >
              <Globe className="w-8 h-8 text-[#ff3d00] mb-6" />
              <h3 className="text-xl font-bold text-white mb-3 tracking-wide">The Unified Vision</h3>
              <p className="text-zinc-400 font-medium leading-relaxed max-w-2xl">
                SANKALP wasn't built to be just another dashboard. It was built to be a command center. A place where you don't just view data, but where you gain the intelligence necessary to make the next best action in your career and life.
              </p>
            </motion.div>
          </div>
        </div>
      </main>

      <StitchFooter />
    </div>
  )
}
