"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { StitchAppLayout } from '@/components/stitch/stitch-app-layout';
import { intelligenceApi } from '@/lib/api/intelligence';
import { UnifiedOverview } from '@/types/intelligence';
import { StitchNBABanner } from '@/components/stitch/stitch-nba-banner';
import { StitchFocusWidget } from '@/components/stitch/stitch-focus-widget';
import { StitchGlassCard } from '@/components/stitch/stitch-glass-card';
import { AlertTriangle, BookOpen, Rocket } from 'lucide-react';
import { StitchOverallHealthCard } from '@/components/stitch/dashboard/stitch-overall-health-card';
import { StitchDomainHealthGrid } from '@/components/stitch/dashboard/stitch-domain-health-grid';
import { StitchCrossDomainInsightCard } from '@/components/stitch/dashboard/stitch-cross-domain-insight-card';
import { StitchPriorityActions } from '@/components/stitch/dashboard/stitch-priority-actions';
import { Skeleton } from '@/components/ui/Skeleton';

export default function StitchDashboardPage() {
    const [overview, setOverview] = useState<UnifiedOverview | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchOverview = async () => {
            // Mock data for the dummy dashboard
            const mockData: UnifiedOverview = {
                overall_health: 88,
                domain_scores: {
                    Study: 92,
                    Academic: 78,
                    Career: 85,
                    Safety: 95
                },
                trends: [
                    { domain: 'Study', direction: 'IMPROVING', value: 5, timeframe: '7d' },
                    { domain: 'Academic', direction: 'DECLINING', value: 12, timeframe: '7d' },
                    { domain: 'Career', direction: 'STABLE', value: 0, timeframe: '7d' },
                    { domain: 'Safety', direction: 'IMPROVING', value: 2, timeframe: '7d' }
                ],
                data_quality: {
                    study: 'sufficient',
                    academic: 'sufficient',
                    career: 'sufficient',
                    safety: 'sufficient'
                },
                top_recommendations: [
                    {
                        title: "Optimize Study Schedule",
                        reason: "Cypherverse metrics indicate high fatigue during late-night coding sessions.",
                        domain: "FOCUS",
                        priority: "critical",
                        confidence: 0.94,
                        action_url: "/explore"
                    },
                    {
                        title: "Review App Permissions",
                        reason: "3 third-party integrations have stale security tokens.",
                        domain: "SECURE",
                        priority: "high",
                        confidence: 0.85,
                        action_url: "/secure"
                    },
                    {
                        title: "System Design Concepts",
                        reason: "Your career trajectory indicates a gap in distributed system design knowledge.",
                        domain: "SHAPE",
                        priority: "medium",
                        confidence: 0.72,
                        action_url: "/shape"
                    }
                ],
                top_insights: [
                    {
                        id: "insight-1",
                        title: "Fatigue-induced Security Risk",
                        summary: "Late night study sessions correlate with increased likelihood of falling for phishing attempts.",
                        domain: "CROSS-DOMAIN",
                        type: "correlation",
                        severity: 85,
                        evidence: ["Study hours logged post 2AM", "Failed simulated phishing test at 2:30AM"],
                        recommended_actions: [
                            { title: "Enforce sleep schedule lockdown", type: "system_policy" }
                        ],
                        metadata: {}
                    }
                ]
            };

            // Simulate slight network delay for the cool loading animation
            setTimeout(() => {
                setOverview(mockData);
                setLoading(false);
            }, 1500);
        };

        fetchOverview();
    }, []);

    if (loading) {
        return (
            <StitchAppLayout>
                <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
                    <Rocket className="w-12 h-12 text-[#00e5ff] animate-bounce" />
                    <p className="text-[#00e5ff] font-bold tracking-[0.2em] uppercase text-sm animate-pulse">Syncing Telemetry...</p>
                </div>
            </StitchAppLayout>
        );
    }

    if (error) {
        return (
            <StitchAppLayout>
                <div className="rounded-xl bg-red-500/10 p-6 border border-red-500/30">
                    <h3 className="text-lg font-black text-red-400 uppercase tracking-widest flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5" />
                        Uplink Failed
                    </h3>
                    <div className="mt-2 text-sm font-medium text-red-300">
                        <p>{error}</p>
                    </div>
                </div>
            </StitchAppLayout>
        );
    }

    if (!overview) return null;

    const nba = overview.top_recommendations.length > 0 ? overview.top_recommendations[0] : null;

    return (
        <StitchAppLayout>
            <div className="space-y-8 max-w-7xl mx-auto">
                <header>
                    <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-2">Situation Overview</h1>
                    <p className="text-sm font-medium tracking-widest text-zinc-500 uppercase">Unified telemetry across all SANKALP domains.</p>
                </header>

                {nba && (
                    <StitchNBABanner nba={nba} onActionStart={(url) => router.push(url)} />
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
                    {/* FOCUS Domain */}
                    <div className="lg:col-span-2">
                        <StitchFocusWidget recommendations={overview.top_recommendations} />
                    </div>

                    {/* Placeholder for PULSE / NEXUS */}
                    <div className="space-y-6">
                        <StitchGlassCard className="border-[#ffc400]/30 shadow-[0_0_20px_rgba(255,196,0,0.1)]">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 rounded-xl bg-[#ffc400]/10 border border-[#ffc400]/30 shadow-[0_0_15px_rgba(255,196,0,0.2)]">
                                    <AlertTriangle className="w-5 h-5 text-[#ffc400]" />
                                </div>
                                <h3 className="font-black text-lg text-white tracking-widest uppercase">PULSE WARNING</h3>
                            </div>
                            <p className="text-sm font-medium text-zinc-400 leading-relaxed">
                                System detecting slight performance degradation in DBMS over the last 2 weeks. Coupled with upcoming exams, this represents the highest academic risk vector.
                            </p>
                        </StitchGlassCard>

                        <StitchGlassCard className="border-zinc-800 bg-zinc-950/30 opacity-60">
                            <div className="flex flex-col items-center justify-center py-8 text-center">
                                <div className="w-12 h-12 rounded-full border border-dashed border-zinc-700 flex items-center justify-center mb-4">
                                    <BookOpen className="w-5 h-5 text-zinc-600" />
                                </div>
                                <h3 className="font-bold text-sm tracking-widest uppercase text-zinc-400">Trajectory Domain</h3>
                                <p className="text-xs font-medium text-zinc-600 mt-2 tracking-wide uppercase">Awaiting telemetry</p>
                            </div>
                        </StitchGlassCard>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
                    <div className="lg:col-span-1">
                        <StitchOverallHealthCard score={overview.overall_health} />
                    </div>
                    <div className="lg:col-span-2">
                        <StitchDomainHealthGrid 
                            scores={overview.domain_scores} 
                            trends={overview.trends} 
                            dataQuality={overview.data_quality} 
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
                    <div className="space-y-6">
                        <h2 className="text-xl font-black tracking-widest uppercase text-white border-b border-zinc-900 pb-4">Cross-Domain Telemetry</h2>
                        {overview.top_insights.length === 0 ? (
                            <div className="rounded-2xl border border-dashed border-zinc-800 bg-zinc-950/50 p-8 text-center">
                                <p className="text-sm font-bold tracking-widest uppercase text-zinc-600">No active cross-domain signals detected.</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {overview.top_insights.map(insight => (
                                    <StitchCrossDomainInsightCard key={insight.id} insight={insight} />
                                ))}
                            </div>
                        )}
                    </div>

                    <div>
                        <StitchPriorityActions recommendations={overview.top_recommendations} />
                    </div>
                </div>
            </div>
        </StitchAppLayout>
    );
}

