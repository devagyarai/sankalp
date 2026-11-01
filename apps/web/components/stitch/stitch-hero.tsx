"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, BarChart3 } from "lucide-react"

export function StitchHero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  }

  const itemVariants: any = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-12">
      
      {/* "Shader" Background Effect */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'radial-gradient(circle at center, #00e5ff 1px, transparent 1px)',
            backgroundSize: '32px 32px',
            maskImage: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0,0,0,1) 10%, rgba(0,0,0,0) 80%)',
            WebkitMaskImage: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0,0,0,1) 10%, rgba(0,0,0,0) 80%)',
          }}
        />
        
        {/* Cosmic glowing orbs */}
        <div className="absolute top-[20%] left-[50%] -translate-x-1/2 w-[80vw] h-[80vw] md:w-[40vw] md:h-[40vw] rounded-full bg-[#00e5ff] blur-[150px] mix-blend-screen opacity-[0.15] animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-[10%] left-[20%] w-[60vw] h-[60vw] md:w-[30vw] md:h-[30vw] rounded-full bg-[#b042ff] blur-[150px] mix-blend-screen opacity-[0.1] animate-pulse" style={{ animationDuration: '10s', animationDelay: '2s' }} />
      </div>

      <div className="max-w-5xl mx-auto px-6 relative z-10 w-full">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center text-center"
        >
          {/* System Online Badge */}
          <motion.div variants={itemVariants} className="mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#00e5ff]/10 border border-[#00e5ff]/20 text-[#00e5ff] text-xs font-semibold tracking-widest uppercase shadow-[0_0_15px_rgba(0,229,255,0.15)]">
              <span className="w-2 h-2 rounded-full bg-[#00e5ff] animate-pulse" />
              System Online
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
            SANKALP: Your <br className="hidden md:block" />
            <span className="text-[#00e5ff] drop-shadow-[0_0_20px_rgba(0,229,255,0.4)]">Cosmic</span> <br className="hidden md:block" />
            Intelligence Hub
          </motion.h1>

          {/* Supporting Text */}
          <motion.p variants={itemVariants} className="max-w-2xl text-lg md:text-xl text-zinc-400 mb-10 leading-relaxed">
            Navigate the vast expanse of your professional journey with precision data and intuitive guidance. SANKALP brings multiple intelligence domains together.
          </motion.p>

          {/* CTA Group */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-4 mb-20 w-full sm:w-auto">
            <Link 
              href="/dashboard"
              className="w-full sm:w-auto group flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#00e5ff] hover:bg-[#00c9e0] text-[black] font-semibold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_30px_rgba(0,229,255,0.3)] hover:shadow-[0_0_40px_rgba(0,229,255,0.5)]"
            >
              Enter Workspace
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
            
            <Link 
              href="#how-it-works"
              className="w-full sm:w-auto group flex items-center justify-center gap-2 px-8 py-4 rounded-xl border border-zinc-700 bg-zinc-900/50 hover:bg-zinc-800 text-white font-semibold transition-all duration-300 hover:scale-[1.02]"
            >
              Explore Protocols
            </Link>
          </motion.div>

          {/* Productivity Score Card widget (matching design) */}
          <motion.div 
            variants={itemVariants}
            className="w-full max-w-sm relative p-8 rounded-3xl bg-zinc-950/80 backdrop-blur-xl border border-[#1e293b] overflow-hidden group shadow-2xl"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-[#00e5ff]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-2xl bg-[#00e5ff]/10 border border-[#00e5ff]/20 flex items-center justify-center mb-4 shadow-[0_0_15px_rgba(0,229,255,0.1)]">
                <BarChart3 className="w-7 h-7 text-[#00e5ff]" />
              </div>
              <div className="text-xs font-semibold tracking-[0.2em] text-zinc-400 uppercase mb-2">
                Productivity Score
              </div>
              <div className="text-7xl font-bold text-white flex items-baseline gap-1 drop-shadow-lg">
                88<span className="text-3xl text-[#00e5ff]">%</span>
              </div>
              <div className="w-full h-1.5 bg-zinc-800 rounded-full mt-6 overflow-hidden relative">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "88%" }}
                  transition={{ duration: 2, delay: 1, ease: "easeOut" }}
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#00e5ff] via-[#00e5ff] to-[#b042ff] shadow-[0_0_10px_rgba(0,229,255,0.8)]"
                />
              </div>
            </div>
          </motion.div>

        </motion.div>
      </div>

      {/* Fade out to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[black] to-transparent z-10 pointer-events-none" />
    </section>
  )
}

