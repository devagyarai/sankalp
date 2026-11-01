"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

const guideItems = [
  {
    question: "Need to organize your academic focus?",
    action: "Explore",
    href: "/explore",
    color: "from-[#00e5ff] to-[#00b3cc]"
  },
  {
    question: "Thinking about your career direction?",
    action: "Shape",
    href: "/shape",
    color: "from-[#ff3d00] to-[#d84315]"
  },
  {
    question: "Want to understand your academic signals?",
    action: "Insight",
    href: "/insight",
    color: "from-[#00e676] to-[#00c853]"
  },
  {
    question: "Concerned about digital safety?",
    action: "Secure",
    href: "/secure",
    color: "from-[#f50057] to-[#c51162]"
  },
  {
    question: "Want to check for scams or suspicious activity?",
    action: "Watch",
    href: "/watch",
    color: "from-[#ffc400] to-[#ffab00]"
  },
  {
    question: "Need to connect signals and relationships?",
    action: "Connect",
    href: "/connect",
    color: "from-[#7c4dff] to-[#651fff]"
  }
]

export function StitchUserGuide() {
  return (
    <section id="guide" className="py-32 relative z-10 px-6 bg-black">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
            Not sure where to start?
          </h2>
          <p className="text-zinc-400 font-medium">Select a trajectory to begin your journey.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {guideItems.map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                href={item.href}
                className="group relative block p-1 rounded-2xl bg-gradient-to-b from-[#1e293b] to-[#0f172a] hover:from-zinc-700 hover:to-zinc-800 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#00e5ff] cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl pointer-events-none" />
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-xl bg-zinc-950 h-full">
                  <h3 className="text-zinc-300 group-hover:text-white font-medium text-lg pr-4 leading-snug transition-colors">
                    {item.question}
                  </h3>
                  <span
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r ${item.color} text-white font-semibold whitespace-nowrap shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105 active:scale-95 shrink-0`}
                  >
                    {item.action}
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
