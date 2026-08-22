"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

const guideItems = [
  {
    question: "Need to organize your academic focus?",
    action: "Explore",
    href: "/explore"
  },
  {
    question: "Thinking about your career direction?",
    action: "Shape",
    href: "/shape"
  },
  {
    question: "Want to understand your academic signals?",
    action: "Insight",
    href: "/insight"
  },
  {
    question: "Concerned about digital safety?",
    action: "Secure",
    href: "/secure"
  },
  {
    question: "Want to check for scams or suspicious activity?",
    action: "Watch",
    href: "/watch"
  },
  {
    question: "Need to connect signals and relationships?",
    action: "Connect",
    href: "/connect"
  }
]

export function UserGuide() {
  return (
    <section id="guide" className="py-32 relative z-10 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
            Not sure where to start?
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
          {guideItems.map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors"
            >
              <h3 className="text-muted-foreground text-lg font-light">
                {item.question}
              </h3>
              <Link 
                href={item.href}
                className="group flex items-center gap-2 text-white font-medium whitespace-nowrap"
              >
                {item.action}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
