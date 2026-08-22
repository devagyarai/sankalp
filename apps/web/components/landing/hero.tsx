"use client"

import { motion, Variants } from "framer-motion"
import Link from "next/link"
import { ArrowRight, ArrowDown } from "lucide-react"

export function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      
      {/* Subtle Living Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Subtle gradient field */}
        <div className="absolute top-[20%] left-[50%] -translate-x-1/2 w-[80vw] h-[80vw] md:w-[40vw] md:h-[40vw] rounded-full bg-primary/5 blur-[120px] mix-blend-screen opacity-50 animate-pulse" style={{ animationDuration: '8s' }} />
        
        {/* Barely visible grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_10%,transparent_100%)]" />

        {/* Slow light movement element */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vw] bg-[conic-gradient(from_0deg,transparent_0_340deg,rgba(255,255,255,0.03)_360deg)] rounded-full"
        />
      </div>

      <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center"
        >
          {/* Eyebrow */}
          <motion.div variants={itemVariants} className="mb-8">
            <span className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-medium tracking-widest text-muted-foreground uppercase backdrop-blur-md">
              Introducing SANKALP
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1 variants={itemVariants} className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
            <span className="block opacity-90">See what matters.</span>
            <span className="block mt-2">Know what to do next.</span>
          </motion.h1>

          {/* Supporting Text */}
          <motion.p variants={itemVariants} className="max-w-2xl text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed font-light">
            SANKALP brings multiple intelligence domains together to help you understand your academic direction, career trajectory, digital safety and the signals that matter around you.
          </motion.p>

          {/* CTA Group */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-4">
            <Link 
              href="#explore"
              className="group flex items-center gap-2 px-8 py-4 rounded-full bg-white text-black font-medium transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
            >
              Explore SANKALP 
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
            
            <Link 
              href="#how-it-works"
              className="group flex items-center gap-2 px-8 py-4 rounded-full border border-white/10 text-white/80 font-medium transition-all duration-300 hover:bg-white/5 hover:text-white"
            >
              See How It Works
              <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-1" />
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Fade out to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none" />
    </section>
  )
}
