"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Calendar, CheckCircle, Clock, BookOpen } from "lucide-react"
import { Task } from "@/lib/nba-engine"
import { LivingCard } from "./ui/living-card"
import { Badge } from "./ui/badge"
import { cn } from "@/lib/utils"

interface FocusWidgetProps {
  tasks: Task[]
}

export function FocusWidget({ tasks }: FocusWidgetProps) {
  // Sort tasks by risk score descending
  const sortedTasks = [...tasks].sort((a, b) => b.riskScore - a.riskScore)

  return (
    <LivingCard glowColor="blue" className="h-full border-border/50">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-lg text-card-foreground tracking-wide">FOCUS DOMAIN</h3>
        </div>
        <Badge variant="outline" className="bg-primary/10 border-primary/20 text-primary">
          Study Execution
        </Badge>
      </div>

      <div className="space-y-4">
        {sortedTasks.map((task, idx) => {
          const isCritical = task.riskScore > 80;
          const progress = (task.completedHours / task.estimatedHours) * 100;
          
          return (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.4 }}
              className="p-4 rounded-xl bg-background/40 border border-white/5 hover:bg-white/[0.04] hover:border-blue-500/30 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(59,130,246,0.1)] hover:-translate-y-0.5 group relative overflow-hidden cursor-default"
            >
              {isCritical && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500/80 rounded-l-lg shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
              )}
              
              <div className="flex justify-between items-start mb-2 ml-1">
                <h4 className={cn("font-medium text-sm", isCritical ? "text-red-100" : "text-foreground")}>
                  {task.title}
                </h4>
                <Badge 
                  variant={isCritical ? "destructive" : task.urgencyLevel === "medium" ? "warning" : "default"}
                  className="text-[10px] uppercase h-5"
                >
                  {task.urgencyLevel} Priority
                </Badge>
              </div>
              
              <div className="flex items-center gap-4 text-xs text-muted-foreground ml-1">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <span>{task.dueDate.split('T')[0]}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{task.estimatedHours - task.completedHours}h left</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-4 ml-1 h-1.5 w-full bg-white/5 rounded-full overflow-hidden relative">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: `${progress}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: "easeOut", delay: 0.2 + (idx * 0.1) }}
                  className={cn(
                    "absolute top-0 left-0 h-full rounded-full",
                    isCritical ? "bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]" : "bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                  )}
                />
              </div>
            </motion.div>
          )
        })}
      </div>
    </LivingCard>
  )
}
