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
    color: "group-hover:text-blue-400"
  },
  {
    id: "shape",
    title: "SHAPE",
    originalDomain: "Trajectory",
    description: "Career and skill direction.",
    icon: Shapes,
    href: "/shape",
    color: "group-hover:text-purple-400"
  },
  {
    id: "insight",
    title: "INSIGHT",
    originalDomain: "Pulse",
    description: "Academic performance and early-warning signals.",
    icon: LineChart,
    href: "/insight",
    color: "group-hover:text-emerald-400"
  },
  {
    id: "secure",
    title: "SECURE",
    originalDomain: "Shield",
    description: "Personal digital safety.",
    icon: Shield,
    href: "/secure",
    color: "group-hover:text-red-400"
  },
  {
    id: "watch",
    title: "WATCH",
    originalDomain: "Sentinel",
    description: "Scam and fraud detection.",
    icon: Radar,
    href: "/watch",
    color: "group-hover:text-amber-400"
  },
  {
    id: "connect",
    title: "CONNECT",
    originalDomain: "Nexus",
    description: "Threat correlation and intelligence.",
    icon: LinkIcon,
    href: "/connect",
    color: "group-hover:text-cyan-400"
  }
]

export function FieldExplorer() {
  const [hoveredField, setHoveredField] = useState<string | null>(null)

  return (
    <section id="explore" className="py-32 relative z-10 px-6">
      <div className="max-w-5xl mx-auto">
        
        {/* Intro */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6">
            One system. Six intelligence domains.
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-light">
            Different problems require different perspectives. SANKALP brings six specialized domains together into one connected experience.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 relative"
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
                <Link href={field.href} className="block h-full outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-2xl">
                  <div className={`
                    group relative h-full flex flex-col p-8 md:p-10 rounded-2xl
                    bg-white/[0.02] border border-white/5
                    transition-all duration-300
                    hover:bg-white/[0.04] hover:border-white/10 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]
                    hover:-translate-y-1 overflow-hidden
                  `}>
                    
                    {/* Hover Glow Background */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                      <div className="absolute -top-24 -right-24 w-48 h-48 bg-white/5 blur-[50px] rounded-full" />
                    </div>

                    <div className="relative z-10 flex flex-col h-full">
                      <div className="flex items-center justify-between mb-8">
                        <field.icon className={`w-8 h-8 text-white/40 transition-colors duration-300 ${field.color}`} />
                        <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center bg-white/5 transition-all duration-300 group-hover:bg-white/10 group-hover:border-white/20">
                          <ArrowRight className="w-4 h-4 text-white/50 group-hover:text-white transition-all duration-300 group-hover:translate-x-0.5" />
                        </div>
                      </div>
                      
                      <div className="mt-auto transform transition-transform duration-300 group-hover:translate-x-1">
                        <h3 className="text-xl font-bold tracking-wide text-white mb-1">
                          {field.title}
                        </h3>
                        <p className="text-sm font-medium tracking-widest text-muted-foreground/60 uppercase mb-4">
                          {field.originalDomain}
                        </p>
                        <p className="text-muted-foreground font-light group-hover:text-white/70 transition-colors duration-300">
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
