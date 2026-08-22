"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus } from "lucide-react"

const questions = [
  {
    q: "What is SANKALP?",
    a: "SANKALP is an intelligent ecosystem that brings multiple intelligence domains together—academic performance, career trajectory, digital safety, and threat correlation—into one connected cosmic platform."
  },
  {
    q: "What are the six domains?",
    a: "Explore (Focus), Shape (Trajectory), Insight (Pulse), Secure (Shield), Watch (Sentinel), and Connect (Nexus). Each domain is a specialized environment designed for a specific set of signals."
  },
  {
    q: "Which domain should I start with?",
    a: "Choose based on what you currently need. If you need to manage study planning, start with Explore. If you're looking at career direction, start with Shape."
  },
  {
    q: "Are the six domains connected?",
    a: "Yes. While each domain focuses on a different aspect, SANKALP brings those perspectives together into a shared intelligence layer (Cypherverse) to help you make clearer decisions."
  },
  {
    q: "Do I need technical knowledge to use SANKALP?",
    a: "Not at all. The interface is designed to be playful, intuitive, and progressively disclosed. You interact with clear signals without needing to understand the underlying data infrastructure."
  },
  {
    q: "Can I move between domains?",
    a: "Yes. The navigation experience is seamless, allowing you to easily switch between your academic focus, digital security, and career insights."
  },
  {
    q: "Is SANKALP only for students?",
    a: "SANKALP is designed to support students and early-career individuals in navigating their academic journey, skill development, and digital safety securely."
  }
]

export function StitchFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleOpen = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx)
  }

  return (
    <section id="faq" className="py-32 relative z-10 px-6 bg-black">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 text-center"
        >
          <div className="flex flex-col items-center mb-8">
            <span className="text-xs font-semibold tracking-[0.2em] text-[#ff4281] uppercase mb-4">
              Knowledge Base
            </span>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#ff4281]/50 to-transparent" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">
            Frequently Asked Queries
          </h2>
        </motion.div>

        <div className="flex flex-col gap-4">
          {questions.map((faq, idx) => {
            const isOpen = openIndex === idx

            return (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`group rounded-2xl border transition-all duration-300 ${isOpen ? 'bg-zinc-950 border-[#00e5ff]/30 shadow-[0_0_20px_rgba(0,229,255,0.1)]' : 'bg-zinc-950/50 border-zinc-800 hover:border-[#00e5ff]/20 hover:bg-zinc-950'}`}
              >
                <button
                  onClick={() => toggleOpen(idx)}
                  className="w-full text-left py-5 px-6 flex items-center justify-between focus-visible:outline-none rounded-2xl"
                  aria-expanded={isOpen}
                >
                  <span className={`text-lg font-semibold transition-colors ${isOpen ? 'text-[#00e5ff]' : 'text-zinc-300 group-hover:text-white'}`}>
                    {faq.q}
                  </span>
                  <div className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all duration-300 ${isOpen ? 'rotate-45 bg-[#00e5ff]/10 border-[#00e5ff]/30 text-[#00e5ff]' : 'bg-zinc-800/50 border-zinc-700 text-zinc-400 group-hover:text-[#00e5ff] group-hover:bg-[#00e5ff]/5 group-hover:border-[#00e5ff]/20'}`}>
                    <Plus className="w-5 h-5" />
                  </div>
                </button>
                <AnimatePresence>
                  {isOpen && (
                     <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pb-6 px-6 pt-2">
                        <div className="w-full h-[1px] bg-gradient-to-r from-[#00e5ff]/20 to-transparent mb-6" />
                        <p className="text-zinc-400 font-medium leading-relaxed">
                          {faq.a}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
