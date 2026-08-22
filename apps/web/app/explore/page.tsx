"use client"

import { DomainShell } from "@/components/domain/shell"
import { DomainHeader } from "@/components/domain/header"
import { FocusWidget } from "@/components/focus-widget"
import { NBABanner } from "@/components/nba-banner"
import { LivingCard } from "@/components/ui/living-card"
import { EmptyState } from "@/components/ui/empty-state"
import { determineNextBestAction } from "@/lib/nba-engine"
import mockData from "@/data/focus-mock.json"
import { PieChart } from "lucide-react"

export default function ExplorePage() {
  const nba = null; // mocked

  return (
    <DomainShell domainId="explore">
      <DomainHeader 
        domainId="explore"
        title="Focus your academic effort where it matters."
        description="Organize, prioritize, and optimize your study schedule based on intelligent signals, rather than just checking off tasks."
      />
      
      <div className="space-y-8 flex-1">
        {/* Prioritized Insight Action */}
        <NBABanner nba={nba} onActionStart={(url) => console.log('Started', url)} />

        {/* Study Planning Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <FocusWidget recommendations={[]} />
          </div>
          
          <div className="space-y-6">
             <LivingCard glowColor="blue" className="h-full min-h-[400px]">
                <EmptyState
                  icon={PieChart}
                  title="Focus Distribution"
                  description="Time allocation insights will appear here once more study sessions are logged."
                  domainColorClass="text-blue-500"
                  className="p-0 border-none"
                />
             </LivingCard>
          </div>
        </div>
      </div>
    </DomainShell>
  )
}
