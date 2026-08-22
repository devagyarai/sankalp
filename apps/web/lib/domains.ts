import { Compass, Shapes, LineChart, Shield, Radar, Link as LinkIcon, LucideIcon } from "lucide-react"

export type DomainId = "explore" | "shape" | "insight" | "secure" | "watch" | "connect"

export interface DomainConfig {
  id: DomainId
  name: string
  originalName: string
  path: string
  description: string
  colorClass: string // Tailwind text color
  bgLightClass: string // Tailwind subtle bg color
  borderClass: string // Tailwind border color
  icon: LucideIcon
}

export const DOMAINS: Record<DomainId, DomainConfig> = {
  explore: {
    id: "explore",
    name: "EXPLORE",
    originalName: "Focus",
    path: "/explore",
    description: "Study planning, organization and optimization.",
    colorClass: "text-blue-500",
    bgLightClass: "bg-blue-500/10",
    borderClass: "border-blue-500/20",
    icon: Compass
  },
  shape: {
    id: "shape",
    name: "SHAPE",
    originalName: "Trajectory",
    path: "/shape",
    description: "Career and skill intelligence.",
    colorClass: "text-violet-500",
    bgLightClass: "bg-violet-500/10",
    borderClass: "border-violet-500/20",
    icon: Shapes
  },
  insight: {
    id: "insight",
    name: "INSIGHT",
    originalName: "Pulse",
    path: "/insight",
    description: "Academic performance and early-warning signals.",
    colorClass: "text-amber-500",
    bgLightClass: "bg-amber-500/10",
    borderClass: "border-amber-500/20",
    icon: LineChart
  },
  secure: {
    id: "secure",
    name: "SECURE",
    originalName: "Shield",
    path: "/secure",
    description: "Personal digital safety.",
    colorClass: "text-emerald-500",
    bgLightClass: "bg-emerald-500/10",
    borderClass: "border-emerald-500/20",
    icon: Shield
  },
  watch: {
    id: "watch",
    name: "WATCH",
    originalName: "Sentinel",
    path: "/watch",
    description: "Scam, fraud and suspicious-activity detection.",
    colorClass: "text-rose-500",
    bgLightClass: "bg-rose-500/10",
    borderClass: "border-rose-500/20",
    icon: Radar
  },
  connect: {
    id: "connect",
    name: "CONNECT",
    originalName: "Nexus",
    path: "/connect",
    description: "Threat correlation and intelligence.",
    colorClass: "text-cyan-500",
    bgLightClass: "bg-cyan-500/10",
    borderClass: "border-cyan-500/20",
    icon: LinkIcon
  }
}

export const DOMAIN_LIST = Object.values(DOMAINS)
