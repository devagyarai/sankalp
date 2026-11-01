"use client"

import { StitchNavbar } from "@/components/stitch/stitch-navbar"
import { StitchHero } from "@/components/stitch/stitch-hero"
import { StitchFieldExplorer } from "@/components/stitch/stitch-field-explorer"
import { StitchConnectedSystem } from "@/components/stitch/stitch-connected-system"
import { StitchHowItWorks } from "@/components/stitch/stitch-how-it-works"
import { StitchUserGuide } from "@/components/stitch/stitch-user-guide"
import { StitchFAQ } from "@/components/stitch/stitch-faq"
import { StitchFinalCTA } from "@/components/stitch/stitch-final-cta"
import { StitchFooter } from "@/components/stitch/stitch-footer"

export default function StitchLandingPage() {
  return (
    <div className="min-h-screen bg-black text-slate-100 font-sans relative overflow-x-hidden selection:bg-[#00e5ff]/30 selection:text-white">
      <StitchNavbar />
      
      <main>
        <StitchHero />
        <StitchFieldExplorer />
        <StitchConnectedSystem />
        <StitchHowItWorks />
        <StitchUserGuide />
        <StitchFAQ />
        <StitchFinalCTA />
      </main>

      <StitchFooter />
    </div>
  )
}
