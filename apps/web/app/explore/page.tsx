"use client"

import { StitchDomainShell } from "@/components/stitch/stitch-domain-shell"
import { StitchDomainHeader } from "@/components/stitch/stitch-domain-header"
import { StitchFocusWidget } from "@/components/stitch/stitch-focus-widget"
import { StitchNBABanner } from "@/components/stitch/stitch-nba-banner"
import { StitchGlassCard } from "@/components/stitch/stitch-glass-card"
import { PieChart, Rocket } from "lucide-react"

export default function StitchExplorePage() {
  const nba = null; // mocked

  return (
    <StitchDomainShell domainId="explore">
      <StitchDomainHeader 
        domainId="explore"
        title="Focus your academic effort where it matters."
        description="Organize, prioritize, and optimize your study schedule based on cosmic signals, rather than just checking off tasks."
      />
      
      <div className="space-y-8 flex-1">
        {/* Prioritized Insight Action */}
        <StitchNBABanner nba={nba} onActionStart={(url) => console.log('Started', url)} />

        {/* Study Planning Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <StitchFocusWidget recommendations={[]} />
          </div>
          
          <div className="space-y-6">
             <StitchGlassCard className="h-full min-h-[400px] border-[#00e5ff]/20">
                <div className="flex flex-col items-center justify-center h-full text-center space-y-4 pt-10">
                  <div className="p-4 rounded-full bg-[#00e5ff]/10 border border-[#00e5ff]/30 shadow-[0_0_20px_rgba(0,229,255,0.2)]">
                    <PieChart className="w-8 h-8 text-[#00e5ff]" />
                  </div>
                  <h3 className="text-xl font-black text-white tracking-widest uppercase">Focus Distribution</h3>
                  <p className="text-sm font-medium text-zinc-500 leading-relaxed max-w-[250px]">
                    Time allocation insights will appear here once more study sessions are logged to the Cypherverse.
                  </p>
                </div>
             </StitchGlassCard>
          </div>
        </div>
      </div>
    </StitchDomainShell>
  )
}
