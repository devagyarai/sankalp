import React from 'react';
import { StitchGlassCard } from '../stitch-glass-card';

export function StitchOverallHealthCard({ score }: { score: number }) {
    const isHealthy = score > 70;
    const isWarning = score <= 70 && score > 40;

    const glowColor = isHealthy ? "shadow-[0_0_30px_rgba(0,229,255,0.2)] border-[#00e5ff]/30" : isWarning ? "shadow-[0_0_30px_rgba(255,196,0,0.2)] border-[#ffc400]/30" : "shadow-[0_0_30px_rgba(239,68,68,0.2)] border-red-500/30";
    const textColor = isHealthy ? "text-[#00e5ff]" : isWarning ? "text-[#ffc400]" : "text-red-500";

    return (
        <StitchGlassCard className={`flex flex-col items-center justify-center p-8 h-full ${glowColor}`}>
            <h2 className="text-sm font-bold tracking-[0.2em] text-zinc-400 uppercase mb-6">SANKALP SYSTEM INTEGRITY</h2>
            
            <div className="relative">
                <div className={`absolute inset-0 blur-[30px] rounded-full opacity-50 ${isHealthy ? 'bg-[#00e5ff]' : isWarning ? 'bg-[#ffc400]' : 'bg-red-500'}`} />
                <div className="relative flex items-baseline gap-2 bg-black/50 px-8 py-4 rounded-3xl border border-zinc-800 backdrop-blur-md">
                    <span className={`text-6xl font-black tracking-tight ${textColor}`}>{score}</span>
                    <span className="text-xl text-zinc-500 font-bold">/ 100</span>
                </div>
            </div>
            
            {score === 0 ? (
                <p className="mt-6 text-sm font-medium text-zinc-500 uppercase tracking-widest text-center">Insufficient data for system health calculation.</p>
            ) : (
                <p className={`mt-6 text-sm font-bold tracking-widest uppercase text-center ${textColor}`}>
                    {isHealthy ? 'System Optimal' : isWarning ? 'Degraded Performance' : 'Critical Failure Imminent'}
                </p>
            )}
        </StitchGlassCard>
    );
}
