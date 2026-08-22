"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { DOMAINS, DOMAIN_LIST, DomainId } from "@/lib/domains"
import { ArrowLeft } from "lucide-react"
import { ChatWidget } from "@/components/chatbot/ChatWidget"

export function DomainShell({
  domainId,
  children,
}: {
  domainId: DomainId
  children: React.ReactNode
}) {
  const domain = DOMAINS[domainId]

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Global Navigation */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-white/5 py-4 px-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-muted-foreground hover:text-white transition-colors flex items-center gap-2 text-sm font-medium">
            <ArrowLeft className="w-4 h-4" />
            SANKALP
          </Link>
          <span className="text-white/20">/</span>
          <span className={`text-sm font-medium tracking-wide ${domain.colorClass}`}>
            {domain.name}
          </span>
        </div>
        
        {/* Domain Switcher */}
        <DomainSwitcher currentDomainId={domainId} />
      </nav>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-12 flex flex-col relative z-0">
        {/* Subtle Domain Background Glow */}
        <motion.div 
          className="fixed top-0 left-1/2 -translate-x-1/2 w-[100vw] h-[50vw] max-w-[1200px] max-h-[800px] pointer-events-none z-[-1] opacity-20 blur-[150px] mix-blend-screen rounded-full"
          style={{ backgroundColor: `var(--tw-colors-${domain.colorClass.split('-')[1]}-500)` }}
          animate={{ 
            scale: [1, 1.05, 1],
            opacity: [0.15, 0.25, 0.15]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
        />
        
        <motion.div
          key={domainId}
          initial={{ opacity: 0, y: 15, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex-1 flex flex-col"
        >
          {children}
        </motion.div>
      </main>
      <ChatWidget />
    </div>
  )
}

function DomainSwitcher({ currentDomainId }: { currentDomainId: DomainId }) {
  return (
    <div className="hidden md:flex items-center gap-2 bg-white/[0.02] border border-white/5 p-1 rounded-full">
      {DOMAIN_LIST.map((d) => {
        const isActive = d.id === currentDomainId
        return (
          <Link
            key={d.id}
            href={d.path}
            className={`
              relative px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest transition-colors duration-300
              ${isActive ? d.colorClass : "text-muted-foreground hover:text-white"}
            `}
          >
            {isActive && (
              <motion.div
                layoutId="domain-active-pill"
                className={`absolute inset-0 rounded-full border ${d.borderClass} ${d.bgLightClass}`}
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
