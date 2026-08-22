"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { AlertTriangle, ArrowRight, Play } from "lucide-react"
import { IntelligenceRecommendationSchema } from "@/types/intelligence"
import { GlassCard } from "./ui/glass-card"
import { Button } from "./ui/Button"
import { Badge } from "./ui/Badge"

interface NBABannerProps {
  nba: IntelligenceRecommendationSchema | null
  onActionStart: (actionUrl: string) => void
}

export function NBABanner({ nba, onActionStart }: NBABannerProps) {
  if (!nba) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <GlassCard className="relative overflow-hidden border-primary/30 ring-1 ring-primary/20">
        {/* Glow Effect Background */}
        <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-primary/20 blur-[60px] pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 h-48 w-48 rounded-full bg-secondary/20 blur-[60px] pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
          <div className="space-y-4 flex-1">
            <div className="flex items-center gap-3">
              <Badge variant="destructive" className="animate-pulse">
                <AlertTriangle className="w-3 h-3 mr-1" />
                Next Best Action
              </Badge>
              <span className="text-sm text-muted-foreground font-medium uppercase tracking-wider">
                {nba.domain} Domain
              </span>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold glow-text text-primary-foreground mb-2">
                {nba.title}
              </h2>
              <p className="text-muted-foreground leading-relaxed max-w-2xl">
                {nba.reason}
              </p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto mt-4 md:mt-0">
            <Button 
              variant="glowing" 
              size="lg" 
              className="gap-2 w-full sm:w-auto"
              onClick={() => onActionStart(nba.action_url || "#")}
            >
              <Play className="w-4 h-4" fill="currentColor" />
              Start Action
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="gap-2 w-full sm:w-auto group"
            >
              Acknowledge
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  )
}
