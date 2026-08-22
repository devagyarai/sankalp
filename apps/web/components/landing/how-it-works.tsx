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

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-32 relative z-10 px-6 border-t border-white/5 bg-white/[0.01]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-24"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
            From signal to action.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 relative">
          
          {/* Horizontal line connecting steps on Desktop */}
          <div className="hidden lg:block absolute top-6 left-12 right-12 h-[1px] bg-white/10 z-0">
             <motion.div 
              className="absolute top-0 left-0 h-full bg-white/40 origin-left"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
             />
          </div>

          {steps.map((step, idx) => (
            <motion.div 
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 flex flex-col items-center md:items-start text-center md:text-left"
            >
              <div className="w-12 h-12 rounded-full bg-background border border-white/10 flex items-center justify-center mb-8 relative shadow-sm">
                 <div className="absolute inset-0 bg-white/5 rounded-full" />
                 <span className="text-sm font-mono text-white/80">{step.number}</span>
              </div>
              
              <h3 className="text-xl md:text-2xl font-semibold text-white mb-3">
                {step.title}
              </h3>
              <p className="text-muted-foreground font-light leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
