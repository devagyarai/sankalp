"use client"

import * as React from "react"
import { motion, HTMLMotionProps } from "framer-motion"
import { cn } from "@/lib/utils"

interface LivingCardProps extends HTMLMotionProps<"div"> {
  glowColor?: "blue" | "violet" | "amber" | "emerald" | "rose" | "cyan" | "white"
  children: React.ReactNode
}

const glowMap = {
  blue: "rgba(59,130,246,0.15)",
  violet: "rgba(139,92,246,0.15)",
  amber: "rgba(245,158,11,0.15)",
  emerald: "rgba(16,185,129,0.15)",
  rose: "rgba(244,63,94,0.15)",
  cyan: "rgba(34,211,238,0.15)",
  white: "rgba(255,255,255,0.05)"
}

const borderMap = {
  blue: "hover:border-blue-500/30",
  violet: "hover:border-violet-500/30",
  amber: "hover:border-amber-500/30",
  emerald: "hover:border-emerald-500/30",
  rose: "hover:border-rose-500/30",
  cyan: "hover:border-cyan-500/30",
  white: "hover:border-white/10"
}

export const LivingCard = React.forwardRef<HTMLDivElement, LivingCardProps>(
  ({ className, glowColor = "white", children, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        whileHover={{ 
          y: -2, 
          boxShadow: `0 10px 40px -10px ${glowMap[glowColor]}`
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className={cn(
          "p-6 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col relative overflow-hidden transition-colors hover:bg-white/[0.04]",
          borderMap[glowColor],
          className
        )}
        {...props}
      >
        {children}
      </motion.div>
    )
  }
)

LivingCard.displayName = "LivingCard"
