"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus } from "lucide-react"

const questions = [
  {
    q: "What is SANKALP?",
    a: "SANKALP is an intelligent ecosystem that brings multiple intelligence domains together—academic performance, career trajectory, digital safety, and threat correlation—into one connected platform."
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
    a: "Yes. While each domain focuses on a different aspect, SANKALP brings those perspectives together into a shared intelligence layer to help you make clearer decisions."
  },
  {
    q: "Do I need technical knowledge to use SANKALP?",
    a: "Not at all. The interface is designed to be calm, intuitive, and progressively disclosed. You interact with clear signals without needing to understand the underlying data infrastructure."
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

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleOpen = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx)
  }

  return (
    <section id="faq" className="py-32 relative z-10 px-6 bg-white/[0.01]">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6">
            Frequently asked questions
          </h2>
        </motion.div>

        <div className="divide-y divide-white/5 border-y border-white/5">
          {questions.map((faq, idx) => {
            const isOpen = openIndex === idx

            return (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group"
              >
                <button
                  onClick={() => toggleOpen(idx)}
                  className="w-full text-left py-6 flex items-center justify-between focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm transition-colors hover:bg-white/[0.02] px-4 -mx-4"
                  aria-expanded={isOpen}
                >
                  <span className="text-lg font-medium text-white/90 group-hover:text-white transition-colors">
                    {faq.q}
                  </span>
                  <div className={`w-8 h-8 rounded-full border border-white/10 flex items-center justify-center bg-white/5 transition-transform duration-300 ease-[0.16,1,0.3,1] ${isOpen ? 'rotate-45 bg-white/10' : 'group-hover:bg-white/10'}`}>
                    <Plus className="w-4 h-4 text-muted-foreground group-hover:text-white transition-colors" />
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
                      <p className="pb-6 text-muted-foreground font-light leading-relaxed px-4 -mx-4">
                        {faq.a}
                      </p>
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
