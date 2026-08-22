"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Compass, Shapes, LineChart, Shield, Radar, Link as LinkIcon } from "lucide-react"

const fields = [
  {
    id: "explore",
    title: "EXPLORE",
    originalDomain: "Focus",
    description: "Study planning, organization and optimization.",
    icon: Compass,
    href: "/explore",
    color: "group-hover:text-[#00e5ff]",
    bgGlow: "group-hover:shadow-[0_0_30px_rgba(0,229,255,0.2)]",
    borderGlow: "group-hover:border-[#00e5ff]/50"
  },
  {
    id: "shape",
    title: "SHAPE",
    originalDomain: "Trajectory",
    description: "Career and skill direction.",
    icon: Shapes,
    href: "/shape",
    color: "group-hover:text-[#ff3d00]",
    bgGlow: "group-hover:shadow-[0_0_30px_rgba(255,61,0,0.2)]",
    borderGlow: "group-hover:border-[#ff3d00]/50"
  },
  {
    id: "insight",
    title: "INSIGHT",
    originalDomain: "Pulse",
    description: "Academic performance and early-warning signals.",
    icon: LineChart,
    href: "/insight",
    color: "group-hover:text-[#00e676]",
    bgGlow: "group-hover:shadow-[0_0_30px_rgba(0,230,118,0.2)]",
    borderGlow: "group-hover:border-[#00e676]/50"
  },
  {
    id: "secure",
    title: "SECURE",
    originalDomain: "Shield",
    description: "Personal digital safety.",
    icon: Shield,
    href: "/secure",
    color: "group-hover:text-[#f50057]",
    bgGlow: "group-hover:shadow-[0_0_30px_rgba(245,0,87,0.2)]",
    borderGlow: "group-hover:border-[#f50057]/50"
  },
  {
    id: "watch",
    title: "WATCH",
    originalDomain: "Sentinel",
    description: "Scam and fraud detection.",
    icon: Radar,
    href: "/watch",
    color: "group-hover:text-[#ffc400]",
    bgGlow: "group-hover:shadow-[0_0_30px_rgba(255,196,0,0.2)]",
    borderGlow: "group-hover:border-[#ffc400]/50"
  },
  {
    id: "connect",
    title: "CONNECT",
    originalDomain: "Nexus",
    description: "Threat correlation and intelligence.",
    icon: LinkIcon,
    href: "/connect",
    color: "group-hover:text-[#7c4dff]",
    bgGlow: "group-hover:shadow-[0_0_30px_rgba(124,77,255,0.2)]",
    borderGlow: "group-hover:border-[#7c4dff]/50"
  }
]

export function StitchFieldExplorer() {
  const [hoveredField, setHoveredField] = useState<string | null>(null)

  return (
    <section id="explore" className="py-32 relative z-10 px-6 bg-black">
      <div className="max-w-5xl mx-auto">
        
        {/* Intro */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <div className="flex flex-col items-center mb-8">
            <span className="text-xs font-semibold tracking-[0.2em] text-[#00e5ff] uppercase mb-4">
              Intelligence Domains
            </span>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#00e5ff]/50 to-transparent" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">
            One system. Six cosmic domains.
          </h2>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto font-medium">
            Different anomalies require different perspectives. SANKALP brings six specialized domains together into one connected galactic experience.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative"
             onMouseLeave={() => setHoveredField(null)}>
          {fields.map((field, idx) => {
            const isHovered = hoveredField === field.id
            const isOtherHovered = hoveredField !== null && !isHovered

            return (
              <motion.div
                key={field.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                onMouseEnter={() => setHoveredField(field.id)}
                className={`transition-all duration-500 ease-out ${isOtherHovered ? 'opacity-40 scale-[0.98]' : 'opacity-100 scale-100'}`}
              >
                <Link href={field.href} className="block h-full outline-none focus-visible:ring-2 focus-visible:ring-[#00e5ff] rounded-2xl">
                  <div className={`
                    group relative h-full flex flex-col p-8 rounded-2xl
                    bg-zinc-950/80 backdrop-blur-md border border-[#1e293b]
                    transition-all duration-300
                    hover:bg-[#111e36] ${field.borderGlow} ${field.bgGlow}
                    hover:-translate-y-2 overflow-hidden
                  `}>
                    
                    <div className="relative z-10 flex flex-col h-full">
                      <div className="flex items-center justify-between mb-8">
                        <div className={`w-12 h-12 rounded-xl bg-zinc-800/80 border border-zinc-700 flex items-center justify-center transition-colors duration-300 group-hover:bg-zinc-800`}>
                          <field.icon className={`w-6 h-6 text-zinc-400 transition-colors duration-300 ${field.color}`} />
                        </div>
                        <div className="w-8 h-8 rounded-full border border-zinc-700 flex items-center justify-center bg-zinc-800/50 transition-all duration-300 group-hover:bg-zinc-700 group-hover:border-zinc-500">
                          <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:text-white transition-all duration-300 group-hover:translate-x-0.5" />
                        </div>
                      </div>
                      
                      <div className="mt-auto transform transition-transform duration-300 group-hover:translate-x-1">
                        <h3 className="text-xl font-bold tracking-wide text-white mb-1">
                          {field.title}
                        </h3>
                        <p className="text-xs font-semibold tracking-[0.2em] text-zinc-500 uppercase mb-4 group-hover:text-zinc-300 transition-colors">
                          {field.originalDomain}
                        </p>
                        <p className="text-zinc-400 font-medium group-hover:text-slate-200 transition-colors duration-300">
                          {field.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

