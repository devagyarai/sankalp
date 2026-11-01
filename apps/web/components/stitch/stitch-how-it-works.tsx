"use client"

import { motion } from "framer-motion"

const steps = [
  {
    number: "01",
    title: "Choose",
    description: "Enter the domain that matches what you need."
  },
  {
    number: "02",
    title: "Understand",
    description: "Work with the information and signals relevant to that domain."
  },
  {
    number: "03",
    title: "Connect",
    description: "SANKALP helps bring meaningful context together."
  },
  {
    number: "04",
    title: "Act",
    description: "Use the resulting insight to decide what to do next."
  }
]

export function StitchHowItWorks() {
  return (
    <section id="how-it-works" className="py-32 relative z-10 px-6 bg-black">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-24"
        >
          <div className="flex flex-col items-center mb-8">
            <span className="text-xs font-semibold tracking-[0.2em] text-[#00e5ff] uppercase mb-4">
              Operation Protocol
            </span>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#00e5ff]/50 to-transparent" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
            From cosmic signal <br className="md:hidden" /> to action.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 relative">
          
          {/* Horizontal line connecting steps on Desktop */}
          <div className="hidden lg:block absolute top-8 left-12 right-12 h-[2px] bg-zinc-800 z-0">
             <motion.div 
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#00e5ff] to-[#b042ff] origin-left shadow-[0_0_15px_rgba(0,229,255,0.8)]"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 2, ease: "easeInOut" }}
             />
          </div>

          {steps.map((step, idx) => (
            <motion.div 
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 flex flex-col items-center text-center p-6 rounded-2xl bg-zinc-950/60 backdrop-blur-sm border border-zinc-800/50 hover:bg-zinc-950 hover:border-[#00e5ff]/30 transition-colors group"
            >
              <div className="w-16 h-16 rounded-full bg-black border-2 border-zinc-700 flex items-center justify-center mb-6 relative shadow-lg group-hover:border-[#00e5ff] transition-colors duration-300">
                 <div className="absolute inset-0 bg-[#00e5ff]/5 rounded-full group-hover:bg-[#00e5ff]/10 transition-colors duration-300" />
                 <span className="text-lg font-bold tracking-widest text-[#00e5ff]">{step.number}</span>
              </div>
              
              <h3 className="text-2xl font-bold tracking-wide text-white mb-3">
                {step.title}
              </h3>
              <p className="text-zinc-400 font-medium leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
