import * as React from "react"
import { cn } from "@/lib/utils"

const StitchGlassCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-2xl p-6 bg-[#0d172a]/60 backdrop-blur-xl border border-zinc-900 shadow-[0_0_20px_rgba(0,0,0,0.5)] transition-all duration-300 hover:border-[#00e5ff]/20 hover:shadow-[0_0_30px_rgba(0,229,255,0.1)] text-slate-200 relative overflow-hidden",
      className
    )}
    {...props}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
    <div className="relative z-10">
      {props.children}
    </div>
  </div>
))
StitchGlassCard.displayName = "StitchGlassCard"

export { StitchGlassCard }
