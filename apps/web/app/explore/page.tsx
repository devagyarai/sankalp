"use client"

import { useEffect, useState } from "react"
import { DomainShell } from "@/components/domain/shell"
import { DomainHeader } from "@/components/domain/header"
import { FocusWidget } from "@/components/focus-widget"
import { NBABanner } from "@/components/nba-banner"
import { LivingCard } from "@/components/ui/living-card"
import { EmptyState } from "@/components/ui/empty-state"
import { PieChart, Loader2 } from "lucide-react"
import { intelligenceApi } from "@/lib/api/intelligence"
import { IntelligenceOutputSchema } from "@/types/intelligence"

export default function ExplorePage() {
  const [data, setData] = useState<IntelligenceOutputSchema | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    intelligenceApi.getFocus()
      .then(setData)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const nba = data?.recommendations?.[0] || null;

  return (
    <DomainShell domainId="explore">
      <DomainHeader 
        domainId="explore"
        title="Focus your academic effort where it matters."
        description="Organize, prioritize, and optimize your study schedule based on intelligent signals, rather than just checking off tasks."
      />
      
      <div className="space-y-8 flex-1">
        {loading ? (
          <div className="flex items-center justify-center p-12">
            <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
          </div>
        ) : (
          <>
            {nba && <NBABanner nba={nba} onActionStart={(url) => console.log('Started', url)} />}

            {/* Study Planning Workspace */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <FocusWidget recommendations={data?.recommendations || []} />
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
          </>
        )}
      </div>
    </DomainShell>
  )
}
