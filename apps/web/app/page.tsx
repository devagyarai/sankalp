import { Navbar } from "@/components/landing/navbar"
import { Hero } from "@/components/landing/hero"
import { FieldExplorer } from "@/components/landing/field-explorer"
import { ConnectedSystem } from "@/components/landing/connected-system"
import { HowItWorks } from "@/components/landing/how-it-works"
import { UserGuide } from "@/components/landing/user-guide"
import { FAQ } from "@/components/landing/faq"
import { FinalCTA } from "@/components/landing/final-cta"
import { Footer } from "@/components/landing/footer"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary/30 selection:text-white">
      <Navbar />
      
      <main>
        <Hero />
        <FieldExplorer />
        <ConnectedSystem />
        <HowItWorks />
        <UserGuide />
        <FAQ />
        <FinalCTA />
      </main>

      <Footer />
    </div>
  )
}
