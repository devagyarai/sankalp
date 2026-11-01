"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { DomainId } from "@/lib/domains"
import { ArrowLeft, Compass, Shapes, LineChart, Shield, Radar, Link as LinkIcon } from "lucide-react"

export interface StitchDomainConfig {
  id: string;
  name: string;
  originalName: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  border: string;
  bg: string;
  shadow: string;
  path: string;
}

export const STITCH_DOMAINS: Record<DomainId, StitchDomainConfig> = {
  explore: { id: "explore", name: "EXPLORE", originalName: "Focus", icon: Compass, color: "text-[#00E5FF]", border: "border-[#00E5FF]/50", bg: "bg-[#00E5FF]/10", shadow: "shadow-[0_0_20px_rgba(0,229,255,0.4)]", path: "/explore" },
  shape: { id: "shape", name: "SHAPE", originalName: "Trajectory", icon: Shapes, color: "text-[#FF3D00]", border: "border-[#FF3D00]/50", bg: "bg-[#FF3D00]/10", shadow: "shadow-[0_0_20px_rgba(255,61,0,0.4)]", path: "/shape" },
  insight: { id: "insight", name: "INSIGHT", originalName: "Pulse", icon: LineChart, color: "text-[#00E676]", border: "border-[#00E676]/50", bg: "bg-[#00E676]/10", shadow: "shadow-[0_0_20px_rgba(0,230,118,0.4)]", path: "/insight" },
  secure: { id: "secure", name: "SECURE", originalName: "Shield", icon: Shield, color: "text-[#F50057]", border: "border-[#F50057]/50", bg: "bg-[#F50057]/10", shadow: "shadow-[0_0_20px_rgba(245,0,87,0.4)]", path: "/secure" },
  watch: { id: "watch", name: "WATCH", originalName: "Sentinel", icon: Radar, color: "text-[#FFC400]", border: "border-[#FFC400]/50", bg: "bg-[#FFC400]/10", shadow: "shadow-[0_0_20px_rgba(255,196,0,0.4)]", path: "/watch" },
  connect: { id: "connect", name: "CONNECT", originalName: "Nexus", icon: LinkIcon, color: "text-[#7C4DFF]", border: "border-[#7C4DFF]/50", bg: "bg-[#7C4DFF]/10", shadow: "shadow-[0_0_20px_rgba(124,77,255,0.4)]", path: "/connect" },
}
const DOMAIN_LIST = Object.values(STITCH_DOMAINS)

export function StitchDomainShell({
  domainId,
  children,
}: {
  domainId: DomainId
  children: React.ReactNode
}) {
  const domain = STITCH_DOMAINS[domainId]

  return (
    <div className="min-h-screen bg-black text-slate-100 flex flex-col font-sans selection:bg-[#00e5ff]/30 selection:text-white">
      {/* Global Navigation */}
      <nav className="sticky top-0 z-50 bg-black/60 backdrop-blur-xl border-b border-zinc-900 py-4 px-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-zinc-400 hover:text-white transition-colors flex items-center gap-2 text-sm font-bold uppercase tracking-wider">
            <ArrowLeft className="w-4 h-4" />
            SANKALP
          </Link>
          <span className="text-zinc-700">/</span>
          <span className={`text-sm font-bold tracking-widest uppercase ${domain.color}`}>
            {domain.name}
          </span>
        </div>
        
        {/* Domain Switcher */}
        <DomainSwitcher currentDomainId={domainId} />
      </nav>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-12 flex flex-col relative z-0">
        
        <motion.div
          key={domainId}
          initial={{ opacity: 0, y: 15, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex-1 flex flex-col relative"
        >
          {/* Grid Pattern overlay for content area */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.02] z-0" 
               style={{ backgroundImage: 'linear-gradient(#00e5ff 1px, transparent 1px), linear-gradient(90deg, #00e5ff 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
          />
          <div className="relative z-10">
            {children}
          </div>
        </motion.div>
      </main>
    </div>
  )
}

function DomainSwitcher({ currentDomainId }: { currentDomainId: DomainId }) {

  return (
    <div className="hidden md:flex items-center gap-2 bg-zinc-950/50 border border-zinc-900 p-1 rounded-2xl">
      {DOMAIN_LIST.map((d) => {
        const isActive = d.id === currentDomainId
        return (
          <Link
            key={d.id}
            href={d.path}
            className={`
              relative px-4 py-2 rounded-xl text-xs font-bold tracking-widest uppercase transition-colors duration-300
              ${isActive ? d.color : "text-zinc-500 hover:text-white"}
            `}
          >
            {isActive && (
              <motion.div
                layoutId="stitch-domain-active-pill"
                className={`absolute inset-0 rounded-xl border ${d.border} ${d.bg} ${d.shadow}`}
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span className="relative z-10">{d.name}</span>
          </Link>
        )
      })}
    </div>
  )
}

