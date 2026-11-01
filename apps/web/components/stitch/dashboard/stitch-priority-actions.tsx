import React from 'react';
import { StitchGlassCard } from '../stitch-glass-card';
import { IntelligenceRecommendationSchema } from '@/types/intelligence';
import Link from 'next/link';
import { ArrowRight, ShieldAlert } from 'lucide-react';
import { cn } from '@/lib/utils';

export function StitchPriorityActions({ recommendations }: { recommendations: IntelligenceRecommendationSchema[] }) {
    if (!recommendations || recommendations.length === 0) {
        return (
            <StitchGlassCard>
                <div className="flex items-center gap-3 mb-6">
                    <ShieldAlert className="w-5 h-5 text-zinc-500" />
                    <h3 className="text-lg font-black tracking-widest uppercase text-white">Priority Actions</h3>
                </div>
                <div className="p-8 text-center border border-dashed border-zinc-800 rounded-xl bg-black/20">
                    <p className="text-zinc-500 font-medium text-sm">All systems nominal. No urgent actions required.</p>
                </div>
            </StitchGlassCard>
        );
    }

    return (
        <StitchGlassCard className="p-0 overflow-hidden">
            <div className="p-6 border-b border-zinc-900 bg-zinc-950/80">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#b042ff]/10 border border-[#b042ff]/30 flex items-center justify-center">
                        <ShieldAlert className="w-4 h-4 text-[#b042ff]" />
                    </div>
                    <h3 className="text-lg font-black tracking-widest uppercase text-white">Priority Actions</h3>
                </div>
            </div>
            
            <ul className="divide-y divide-zinc-900 bg-black/20">
                {recommendations.slice(0, 3).map((rec, i) => {
                    const isCritical = rec.priority === 'critical';
                    
                    return (
                        <li key={i} className="group relative p-6 hover:bg-zinc-900/30 transition-colors">
                            {isCritical && (
                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
                            )}
                            <div className="flex items-start justify-between gap-6 pl-2">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className={cn(
                                            "px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest border",
                                            isCritical ? "bg-red-500/10 text-red-400 border-red-500/30" : 
                                            rec.priority === 'high' ? "bg-[#ffc400]/10 text-[#ffc400] border-[#ffc400]/30" : 
                                            "bg-[#00e5ff]/10 text-[#00e5ff] border-[#00e5ff]/30"
                                        )}>
                                            {rec.priority} Priority
                                        </span>
                                        <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{rec.domain}</span>
                                    </div>
                                    <h4 className="text-base font-bold text-zinc-200 group-hover:text-white transition-colors">{rec.title}</h4>
                                    <p className="mt-1 text-sm font-medium text-zinc-500 leading-relaxed">{rec.reason}</p>
                                </div>
                                {rec.action_url && (
                                    <Link href={rec.action_url} className="shrink-0">
                                        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-900 border border-zinc-700 text-xs font-bold uppercase tracking-widest text-zinc-300 hover:bg-[#00e5ff] hover:border-[#00e5ff] hover:text-black transition-all duration-300">
                                            Engage
                                            <ArrowRight className="w-3 h-3" />
                                        </button>
                                    </Link>
                                )}
                            </div>
                        </li>
                    );
                })}
            </ul>
        </StitchGlassCard>
    );
}
