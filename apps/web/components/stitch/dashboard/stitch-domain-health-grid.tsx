import React from 'react';
import Link from 'next/link';
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
        { key: 'Study', name: 'EXPLORE', href: '/explore', color: 'text-[#00e5ff]', border: 'border-[#00e5ff]/30 hover:border-[#00e5ff]/60', bg: 'bg-[#00e5ff]/5' },
        { key: 'Academic', name: 'INSIGHT', href: '/insight', color: 'text-[#00e676]', border: 'border-[#00e676]/30 hover:border-[#00e676]/60', bg: 'bg-[#00e676]/5' },
        { key: 'Career', name: 'SHAPE', href: '/shape', color: 'text-[#ff3d00]', border: 'border-[#ff3d00]/30 hover:border-[#ff3d00]/60', bg: 'bg-[#ff3d00]/5' },
        { key: 'Safety', name: 'SECURE', href: '/secure', color: 'text-[#f50057]', border: 'border-[#f50057]/30 hover:border-[#f50057]/60', bg: 'bg-[#f50057]/5' },
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
                    <Link key={d.key} href={d.href} className="group block focus:outline-none focus:ring-1 focus:ring-[#00e5ff] rounded-2xl">
                        <StitchGlassCard className={`p-5 flex flex-col justify-between transition-all duration-300 group-hover:-translate-y-1 cursor-pointer ${!isInsufficient ? d.border : 'hover:border-zinc-700'} ${!isInsufficient ? d.bg : ''}`}>
                            <div className="flex justify-between items-start mb-4">
                                <h3 className={`text-xs font-black tracking-widest uppercase transition-colors flex items-center gap-1 ${d.color}`}>
                                    {d.name} <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
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
                    </Link>
                );
            })}
        </div>
    );
}
