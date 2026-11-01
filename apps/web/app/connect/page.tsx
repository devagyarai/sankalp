"use client"

import { useState } from "react"
import { StitchDomainShell } from "@/components/stitch/stitch-domain-shell"
import { StitchDomainHeader } from "@/components/stitch/stitch-domain-header"
import { StitchGlassCard } from "@/components/stitch/stitch-glass-card"
import { Search, Link as LinkIcon, Database, Filter, Loader2, Network, Server, Zap, AlertTriangle } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useAuth } from "@/lib/auth-context"
import { fetchApi } from "@/lib/api-client"

export default function ConnectPage() {
  const { currentUser } = useAuth()
  
  // Student State
  const [isInitialized, setIsInitialized] = useState(false)
  const [isInitializing, setIsInitializing] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const handleInitialize = async () => {
    setIsInitializing(true)
    try {
      await fetchApi('/intelligence/overview')
    } catch (err) {
      console.error(err)
    }
    setIsInitializing(false)
    setIsInitialized(true)
  }

  const nodes = [
    { id: 1, label: "Core Academic DB", type: "primary", x: "50%", y: "50%" },
    { id: 2, label: "GitHub Commits", type: "secondary", x: "20%", y: "30%" },
    { id: 3, label: "LeetCode Stats", type: "secondary", x: "80%", y: "40%" },
    { id: 4, label: "Browsing Habits", type: "tertiary", x: "30%", y: "70%" },
    { id: 5, label: "Focus Timer Logs", type: "tertiary", x: "70%", y: "80%" },
  ]

  const edges = [
    { from: 1, to: 2 },
    { from: 1, to: 3 },
    { from: 1, to: 4 },
    { from: 1, to: 5 },
    { from: 2, to: 4 },
    { from: 3, to: 5 },
  ]

  const entities = [
    { name: "Academic Portfolio", status: "Active" },
    { name: "Code Repositories", status: "Active" },
    { name: "Time Tracking", status: "Active" },
    { name: "Security Audits", status: "Dormant" },
  ]

  const filteredEntities = entities.filter(e => e.name.toLowerCase().includes(searchQuery.toLowerCase()))

  // COMMANDER VIEW
  if (currentUser.role === 'COMMANDER') {
    return (
      <StitchDomainShell domainId="connect">
        <StitchDomainHeader 
          domainId="connect"
          title="System Integration Health"
          description="Monitor fleet-wide data pipelines, API health, and node synchronization across Graviton."
        />
        
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <StitchGlassCard className="h-full min-h-[500px] flex flex-col relative overflow-hidden border-[#7c4dff]/40 shadow-[0_0_40px_rgba(124,77,255,0.15)]">
              <div className="absolute inset-0 bg-[#7c4dff]/5 pointer-events-none" />
              <div className="absolute inset-0 pointer-events-none opacity-10" 
                   style={{ backgroundImage: 'linear-gradient(#7c4dff 1px, transparent 1px), linear-gradient(90deg, #7c4dff 1px, transparent 1px)', backgroundSize: '50px 50px' }} 
              />

              <div className="flex items-center justify-between mb-8 relative z-10 p-2">
                <h3 className="text-lg font-black tracking-widest text-white uppercase flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-[#7c4dff]/10 border border-[#7c4dff]/30">
                    <Server className="w-5 h-5 text-[#7c4dff]" />
                  </div>
                  Global Infrastructure Topology
                </h3>
                
                <div className="px-5 py-2.5 rounded-xl border border-[#00e676]/30 bg-[#00e676]/10 text-[#00e676] text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#00e676] animate-pulse" /> Grid Operational
                </div>
              </div>
              
              <div className="flex-1 relative w-full h-full min-h-[400px] z-10 flex items-center justify-center">
                 <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    {edges.map((edge, i) => {
                      const fromNode = nodes.find(n => n.id === edge.from)
                      const toNode = nodes.find(n => n.id === edge.to)
                      if (!fromNode || !toNode) return null
                      return (
                        <motion.line 
                          key={`edge-${edge.from}-${edge.to}`}
                          initial={{ pathLength: 0, opacity: 0 }}
                          animate={{ pathLength: 1, opacity: 1 }}
                          transition={{ duration: 1, delay: i * 0.2, ease: "easeInOut" }}
                          x1={fromNode.x} y1={fromNode.y} 
                          x2={toNode.x} y2={toNode.y} 
                          stroke="#7c4dff" 
                          strokeWidth="2" 
                          strokeDasharray="4 4"
                          className="opacity-60"
                        />
                      )
                    })}
                 </svg>

                 {nodes.map((node, i) => (
                   <motion.div
                     key={`node-${node.id}`}
                     initial={{ opacity: 0, scale: 0 }}
                     animate={{ opacity: 1, scale: 1 }}
                     transition={{ type: "spring", stiffness: 200, damping: 15, delay: i * 0.15 }}
                     className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer"
                     style={{ left: node.x, top: node.y }}
                   >
                     <motion.div 
                       className="absolute w-full h-full bg-[#7c4dff]/20 rounded-full blur-md"
                       animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0.2, 0.5] }}
                       transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                     />
                     
                     <div className={`relative z-10 flex items-center justify-center rounded-full border-2 border-[#7c4dff] shadow-[0_0_15px_rgba(124,77,255,0.6)] bg-black transition-transform group-hover:scale-125 ${
                       node.type === 'primary' ? 'w-16 h-16' : node.type === 'secondary' ? 'w-10 h-10' : 'w-6 h-6'
                     }`}>
                       {node.type === 'primary' && <Database className="w-6 h-6 text-[#7c4dff]" />}
                       {node.type === 'secondary' && <Server className="w-4 h-4 text-[#7c4dff]" />}
                     </div>
                     
                     <div className="mt-3 text-[10px] font-black tracking-widest uppercase text-white bg-black/80 px-2 py-1 rounded border border-[#7c4dff]/30 opacity-100 whitespace-nowrap">
                       {node.id === 1 ? 'Central DB Cluster' : node.id === 2 ? 'Auth Gateway' : node.id === 3 ? 'Telemetry Sync' : 'Edge Node'}
                     </div>
                   </motion.div>
                 ))}
              </div>
            </StitchGlassCard>
          </div>

          <div className="lg:col-span-1 space-y-6">
            <StitchGlassCard className="border-[#00e676]/30 bg-[#00e676]/5 text-center">
               <h3 className="text-sm font-black tracking-widest uppercase text-[#00e676] mb-2 flex items-center justify-center gap-2">
                 <Zap className="w-4 h-4" /> API Latency
               </h3>
               <div className="text-5xl font-black text-white drop-shadow-[0_0_15px_rgba(0,230,118,0.5)] mb-2">42ms</div>
               <p className="text-xs font-bold text-[#00e676]/80 uppercase tracking-widest">P99 Optimal</p>
            </StitchGlassCard>

            <StitchGlassCard className="border-[#ffc400]/30 bg-[#ffc400]/5 h-full flex flex-col">
               <h3 className="text-sm font-black tracking-widest uppercase text-[#ffc400] mb-4 flex items-center gap-2">
                 <AlertTriangle className="w-4 h-4" /> Sync Warnings
               </h3>
               <div className="flex-1 space-y-3">
                 <div className="p-3 bg-black border border-[#ffc400]/20 rounded-lg">
                    <h4 className="text-white font-bold text-xs mb-1">GitHub API Rate Limit</h4>
                    <p className="text-[10px] text-zinc-400 font-medium uppercase tracking-widest">Approaching quota. 85% used.</p>
                 </div>
                 <div className="p-3 bg-black border border-[#ffc400]/20 rounded-lg">
                    <h4 className="text-white font-bold text-xs mb-1">Stale Cache: LeetCode</h4>
                    <p className="text-[10px] text-zinc-400 font-medium uppercase tracking-widest">Node sync delayed by 15m.</p>
                 </div>
               </div>
            </StitchGlassCard>
          </div>
        </div>
      </StitchDomainShell>
    )
  }


  // STUDENT VIEW
  return (
    <StitchDomainShell domainId="connect">
      <StitchDomainHeader 
        domainId="connect"
        title="Map the relationships between your digital identities."
        description="Visualize and query the interconnected nodes of your data across Graviton."
      />
      
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Intelligence Graph Workspace */}
        <div className="lg:col-span-3">
          <StitchGlassCard className={`h-full min-h-[500px] flex flex-col relative overflow-hidden transition-colors duration-1000 ${isInitialized ? 'border-[#7c4dff]/40 shadow-[0_0_40px_rgba(124,77,255,0.15)]' : 'border-[#7c4dff]/20'}`}>
            
            <div className="absolute inset-0 bg-[#7c4dff]/5 pointer-events-none" />
            <div className="absolute inset-0 pointer-events-none opacity-10" 
                 style={{ backgroundImage: 'linear-gradient(#7c4dff 1px, transparent 1px), linear-gradient(90deg, #7c4dff 1px, transparent 1px)', backgroundSize: '50px 50px' }} 
            />

            <div className="flex items-center justify-between mb-8 relative z-10 p-2">
              <h3 className="text-lg font-black tracking-widest text-white uppercase flex items-center gap-3">
                <div className="p-2 rounded-xl bg-[#7c4dff]/10 border border-[#7c4dff]/30">
                  <Network className={`w-5 h-5 text-[#7c4dff] ${isInitialized ? 'animate-pulse' : ''}`} />
                </div>
                Intelligence Graph
              </h3>

              {!isInitialized ? (
                <button 
                  onClick={handleInitialize}
                  disabled={isInitializing}
                  className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all duration-300 flex items-center gap-2 ${
                    isInitializing 
                      ? 'bg-[#7c4dff]/10 border border-[#7c4dff]/30 text-[#7c4dff] cursor-wait' 
                      : 'bg-[#7c4dff] text-black hover:bg-white border border-[#7c4dff] shadow-[0_0_20px_rgba(124,77,255,0.4)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]'
                  }`}
                >
                  {isInitializing ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Synchronizing...</>
                  ) : (
                    <><Database className="w-4 h-4" /> Initialize Data Source</>
                  )}
                </button>
              ) : (
                <div className="px-5 py-2.5 rounded-xl border border-[#00e676]/30 bg-[#00e676]/10 text-[#00e676] text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#00e676] animate-pulse" /> Nodes Active
                </div>
              )}
            </div>
            
            {/* Graph Visualization */}
            <div className="flex-1 relative w-full h-full min-h-[400px] z-10 flex items-center justify-center">
               
               {!isInitialized && !isInitializing && (
                 <div className="text-center text-zinc-500 font-mono text-sm">
                   Awaiting initialization...
                 </div>
               )}

               {isInitializing && (
                 <motion.div 
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   className="relative w-32 h-32 flex items-center justify-center"
                 >
                    <motion.div 
                      animate={{ rotate: 360 }} 
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 rounded-full border border-dashed border-[#7c4dff]"
                    />
                    <motion.div 
                      animate={{ rotate: -360 }} 
                      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-4 rounded-full border-t-2 border-r-2 border-[#7c4dff]/50"
                    />
                    <Network className="w-8 h-8 text-[#7c4dff]" />
                 </motion.div>
               )}

               {isInitialized && (
                 <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    {/* Render Edges */}
                    {edges.map((edge, i) => {
                      const fromNode = nodes.find(n => n.id === edge.from)
                      const toNode = nodes.find(n => n.id === edge.to)
                      if (!fromNode || !toNode) return null
                      return (
                        <motion.line 
                          key={`edge-${edge.from}-${edge.to}`}
                          initial={{ pathLength: 0, opacity: 0 }}
                          animate={{ pathLength: 1, opacity: 1 }}
                          transition={{ duration: 1, delay: 0.5 + (i * 0.2), ease: "easeInOut" }}
                          x1={fromNode.x} y1={fromNode.y} 
                          x2={toNode.x} y2={toNode.y} 
                          stroke="#7c4dff" 
                          strokeWidth="1.5" 
                          strokeDasharray="4 4"
                          className="opacity-40"
                        />
                      )
                    })}
                 </svg>
               )}

               {/* Render Nodes */}
               <AnimatePresence>
                 {isInitialized && nodes.map((node, i) => (
                   <motion.div
                     key={`node-${node.id}`}
                     initial={{ opacity: 0, scale: 0 }}
                     animate={{ opacity: 1, scale: 1 }}
                     transition={{ type: "spring", stiffness: 200, damping: 15, delay: i * 0.15 }}
                     className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer"
                     style={{ left: node.x, top: node.y }}
                   >
                     {/* Pulse behind node */}
                     <motion.div 
                       className="absolute w-full h-full bg-[#7c4dff]/20 rounded-full blur-md"
                       animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0.2, 0.5] }}
                       transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                     />
                     
                     <div className={`relative z-10 flex items-center justify-center rounded-full border-2 border-[#7c4dff] shadow-[0_0_15px_rgba(124,77,255,0.6)] bg-black transition-transform group-hover:scale-125 ${
                       node.type === 'primary' ? 'w-16 h-16' : node.type === 'secondary' ? 'w-10 h-10' : 'w-6 h-6'
                     }`}>
                       {node.type === 'primary' && <Database className="w-6 h-6 text-[#7c4dff]" />}
                       {node.type === 'secondary' && <LinkIcon className="w-4 h-4 text-[#7c4dff]" />}
                     </div>
                     
                     <div className="mt-3 text-[10px] font-black tracking-widest uppercase text-white bg-black/80 px-2 py-1 rounded border border-[#7c4dff]/30 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                       {node.label}
                     </div>
                   </motion.div>
                 ))}
               </AnimatePresence>
            </div>
          </StitchGlassCard>
        </div>

        {/* Entity Search & Filtering */}
        <div className="lg:col-span-1 space-y-6">
          <StitchGlassCard className="h-full border-[#7c4dff]/20">
             <h3 className="text-sm font-black tracking-widest text-zinc-400 uppercase mb-4">Entity Search</h3>
             
             <div className="relative mb-6">
               <input 
                 type="text" 
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
                 placeholder="Search nodes..." 
                 className="w-full bg-black border border-zinc-800 rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-[#7c4dff]/50 focus:shadow-[0_0_15px_rgba(124,77,255,0.2)] transition-all"
               />
               <Search className="w-4 h-4 text-zinc-500 absolute left-4 top-1/2 -translate-y-1/2" />
             </div>

             <div className="flex items-center gap-2 mb-4 text-xs font-bold uppercase tracking-widest text-zinc-500">
               <Filter className="w-3 h-3" /> Filtered Results
             </div>

             <div className="space-y-2">
               {isInitialized ? (
                 filteredEntities.map((entity, i) => (
                   <motion.div 
                     key={entity.name}
                     initial={{ opacity: 0, x: -10 }}
                     animate={{ opacity: 1, x: 0 }}
                     transition={{ delay: i * 0.1 }}
                     className="p-3 rounded-lg border border-zinc-800 bg-zinc-950/50 flex items-center justify-between hover:border-[#7c4dff]/30 transition-colors cursor-pointer group"
                   >
                     <span className="text-sm font-bold text-zinc-300 group-hover:text-white transition-colors">{entity.name}</span>
                     <span className={`w-2 h-2 rounded-full ${entity.status === 'Active' ? 'bg-[#00e676]' : 'bg-zinc-600'}`} />
                   </motion.div>
                 ))
               ) : (
                 <div className="text-center py-8 text-zinc-600 text-xs font-bold uppercase tracking-widest border border-dashed border-zinc-800 rounded-lg">
                   Initialize graph first
                 </div>
               )}
               
               {isInitialized && filteredEntities.length === 0 && (
                 <div className="text-center py-4 text-zinc-600 text-xs font-medium">
                   No entities found.
                 </div>
               )}
             </div>

          </StitchGlassCard>
        </div>

      </div>
    </StitchDomainShell>
  )
}
