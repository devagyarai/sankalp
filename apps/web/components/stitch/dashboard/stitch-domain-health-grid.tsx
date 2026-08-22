import React from 'react';
import { StitchGlassCard } from '../stitch-glass-card';
import { IntelligenceTrend } from '@/types/intelligence';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

interface DomainHealthGridProps {
    scores: Record<string, number>;
    trends: IntelligenceTrend[];
    dataQuality: Record<string, "sufficient" | "limited" | "insufficient">;
}

export function StitchDomainHealthGrid({ scores, trends, dataQuality }: DomainHealthGridProps) {
    const domains = [
        { key: 'Study', name: 'EXPLORE', color: 'text-[#00e5ff]', border: 'border-[#00e5ff]/30', bg: 'bg-[#00e5ff]/5' },
        { key: 'Academic', name: 'INSIGHT', color: 'text-[#00e676]', border: 'border-[#00e676]/30', bg: 'bg-[#00e676]/5' },
        { key: 'Career', name: 'SHAPE', color: 'text-[#ff3d00]', border: 'border-[#ff3d00]/30', bg: 'bg-[#ff3d00]/5' },
        { key: 'Safety', name: 'SECURE', color: 'text-[#f50057]', border: 'border-[#f50057]/30', bg: 'bg-[#f50057]/5' },
    ];

    const getTrend = (key: string) => trends.find(t => t.domain === key);

    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 h-full">
            {domains.map(d => {
                const score = scores[d.key];
                const quality = dataQuality[d.key.toLowerCase()] || 'insufficient';
                const trend = getTrend(d.key);
                const isInsufficient = quality === 'insufficient';

                return (
                    <StitchGlassCard key={d.key} className={`p-5 flex flex-col justify-between ${!isInsufficient ? d.border : ''} ${!isInsufficient ? d.bg : ''}`}>
                        <div className="flex justify-between items-start mb-4">
                            <h3 className={`text-xs font-black tracking-widest uppercase ${d.color}`}>
                                {d.name}
                            </h3>
                            {trend && trend.direction !== "INSUFFICIENT_DATA" && (
                                <div className={`flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md border ${
                                    trend.direction === "IMPROVING" ? "text-[#00e676] border-[#00e676]/30 bg-[#00e676]/10" : 
                                    trend.direction === "DECLINING" ? "text-red-400 border-red-500/30 bg-red-500/10" : 
                                    "text-zinc-400 border-zinc-700 bg-zinc-800"
                                }`}>
                                    {trend.direction === "IMPROVING" ? <ArrowUpRight className="w-3 h-3" /> : 
                                     trend.direction === "DECLINING" ? <ArrowDownRight className="w-3 h-3" /> : 
                                     <Minus className="w-3 h-3" />}
                                    {trend.direction}
                                </div>
                            )}
                        </div>
                        
                        <div>
                            <div className="flex items-baseline gap-2">
                                <span className={`text-4xl font-black tracking-tight ${isInsufficient ? 'text-zinc-700' : 'text-white'}`}>
                                    {isInsufficient ? '--' : score}
                                </span>
                                {!isInsufficient && <span className="text-sm font-bold text-zinc-600">/ 100</span>}
                            </div>
                            
                            {isInsufficient && (
                                <p className="mt-2 text-[10px] font-bold tracking-widest uppercase text-zinc-600">Telemetry Offline</p>
                            )}
                        </div>
                    </StitchGlassCard>
                );
            })}
        </div>
    );
}
