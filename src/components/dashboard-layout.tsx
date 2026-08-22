"use client"

import * as React from "react"
import { Activity, Bell, Compass, LayoutDashboard, Shield, ShieldAlert, Settings, User } from "lucide-react"
import { cn } from "@/lib/utils"

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col md:flex-row overflow-hidden relative">
      {/* Background gradients for futuristic vibe */}
      <div className="absolute top-0 left-0 w-full h-screen overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-secondary/10 blur-[100px]" />
      </div>

      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 border-r border-border/40 bg-card/20 backdrop-blur-xl z-10 flex flex-col h-16 md:h-screen">
        <div className="p-4 md:p-6 flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-primary flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.5)]">
            <Activity className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-bold text-xl tracking-wider glow-text">SANKALP</span>
        </div>
        
        <nav className="flex-1 hidden md:flex flex-col gap-2 px-4 mt-6">
          <NavItem icon={<LayoutDashboard />} label="Dashboard" active />
          <NavItem icon={<Compass />} label="Trajectory" />
          <NavItem icon={<Activity />} label="Pulse" />
          <NavItem icon={<Shield />} label="Shield" />
          <NavItem icon={<ShieldAlert />} label="Sentinel" />
        </nav>

        <div className="hidden md:flex p-4 mt-auto border-t border-border/40">
          <div className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-white/5 cursor-pointer transition-colors">
            <div className="w-8 h-8 rounded-full bg-secondary/50 flex items-center justify-center">
              <User className="w-4 h-4" />
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-medium truncate">Alex</p>
              <p className="text-xs text-muted-foreground truncate">Computer Science</p>
            </div>
            <Settings className="w-4 h-4 text-muted-foreground hover:text-foreground" />
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-[calc(100vh-4rem)] md:h-screen overflow-hidden z-10">
        {/* Topbar */}
        <header className="h-16 border-b border-border/40 bg-background/50 backdrop-blur-md flex items-center justify-between px-6 shrink-0">
          <h1 className="text-lg font-semibold text-foreground/80">Command Center</h1>
          <div className="flex items-center gap-4">
            <div className="relative cursor-pointer hover:bg-white/5 p-2 rounded-full transition-colors">
              <Bell className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full shadow-[0_0_5px_rgba(239,68,68,0.8)]"></span>
            </div>
          </div>
        </header>
        
        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth">
          {children}
        </div>
      </main>
    </div>
  )
}

function NavItem({ icon, label, active }: { icon: React.ReactElement<{ className?: string }>; label: string; active?: boolean }) {
  return (
    <div className={cn(
      "flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-all duration-200 group",
      active ? "bg-primary/10 text-primary border border-primary/20" : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
    )}>
      {React.cloneElement(icon, {
        className: cn(icon.props.className, "w-5 h-5", active ? "text-primary shadow-[0_0_10px_rgba(59,130,246,0.3)]" : "text-muted-foreground group-hover:text-foreground transition-colors")
      })}
      <span className="font-medium text-sm">{label}</span>
      {active && (
        <div className="ml-auto w-1 h-1 rounded-full bg-primary shadow-[0_0_5px_rgba(59,130,246,0.8)]" />
      )}
    </div>
  )
}
