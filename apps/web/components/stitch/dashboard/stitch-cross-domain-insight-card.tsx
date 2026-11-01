import React from 'react';
import { StitchGlassCard } from '../stitch-glass-card';
import { Insight } from '@/types/intelligence';
import { Network } from 'lucide-react';

export function StitchCrossDomainInsightCard({ insight }: { insight: Insight }) {
    const getSeverityStyles = (severity: number) => {
        if (severity >= 80) return "bg-red-500/10 text-red-400 border-red-500/30";
        if (severity >= 60) return "bg-[#ffc400]/10 text-[#ffc400] border-[#ffc400]/30";
        if (severity >= 40) return "bg-[#b042ff]/10 text-[#b042ff] border-[#b042ff]/30";
        return "bg-[#00e5ff]/10 text-[#00e5ff] border-[#00e5ff]/30";
    };

    const getSeverityLabel = (severity: number) => {
        if (severity >= 80) return "Critical";
        if (severity >= 60) return "High";
        if (severity >= 40) return "Medium";
        return "Low";
    };

    return (
        <StitchGlassCard className="border-l-[3px] border-l-[#7c4dff] hover:border-l-[#00e5ff]">
            <div className="flex items-start justify-between mb-4">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <Network className="w-4 h-4 text-[#7c4dff]" />
                        <span className="text-[10px] font-black tracking-[0.2em] uppercase text-[#7c4dff]">
                            Cross-Domain Correlation
                        </span>
                    </div>
                    <h3 className="text-lg font-bold text-white">{insight.title}</h3>
                </div>
                <span className={`px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-widest border ${getSeverityStyles(insight.severity)}`}>
                    {getSeverityLabel(insight.severity)}
                </span>
            </div>
            
            <p className="text-zinc-400 font-medium text-sm leading-relaxed mb-5">
                {insight.summary}
            </p>
            
            <div className="space-y-3 bg-black/40 p-4 rounded-xl border border-zinc-900/50">
                <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Telemetry Evidence</h4>
                <ul className="space-y-2">
                    {insight.evidence.map((ev, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs font-medium text-zinc-400">
                            <span className="text-[#00e5ff] mt-0.5 opacity-70">▹</span>
                            {ev}
                        </li>
                    ))}
                </ul>
            </div>
            
            {insight.recommended_actions.length > 0 && (
                <div className="mt-5 pt-4 border-t border-zinc-900/80">
                    <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Recommended Course</h4>
                    <div className="text-sm font-bold text-[#00e5ff] flex items-center gap-2 hover:text-[#00c9e0] cursor-pointer transition-colors w-fit">
                        <span className="text-[#b042ff]">↳</span> {insight.recommended_actions[0].title}
                    </div>
                </div>
            )}
        </StitchGlassCard>
    );
}
