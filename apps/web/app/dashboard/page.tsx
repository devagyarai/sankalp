"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { StitchAppLayout } from '@/components/stitch/stitch-app-layout';
import { UnifiedOverview } from '@/types/intelligence';
import { StitchNBABanner } from '@/components/stitch/stitch-nba-banner';
import { StitchFocusWidget } from '@/components/stitch/stitch-focus-widget';
import { StitchGlassCard } from '@/components/stitch/stitch-glass-card';
import { AlertTriangle, BookOpen, Rocket, Users, Activity, ShieldCheck, User } from 'lucide-react';
import { StitchOverallHealthCard } from '@/components/stitch/dashboard/stitch-overall-health-card';
import { StitchDomainHealthGrid } from '@/components/stitch/dashboard/stitch-domain-health-grid';
import { StitchCrossDomainInsightCard } from '@/components/stitch/dashboard/stitch-cross-domain-insight-card';
import { StitchPriorityActions } from '@/components/stitch/dashboard/stitch-priority-actions';
import { useAuth } from '@/lib/auth-context';

export default function StitchDashboardPage() {
    const { currentUser, users, setCurrentUser } = useAuth();
    const [overview, setOverview] = useState<UnifiedOverview | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        // Mock data tailored slightly to the currentUser if it's a student
        let healthScore = 88;
        if (currentUser.role === 'STUDENT' && currentUser.metrics) {
            healthScore = currentUser.metrics.overallHealth;
        }

        const mockData: UnifiedOverview = {
            overall_health: healthScore,
            domain_scores: {
                Study: Math.min(100, healthScore + 4),
                Academic: Math.max(0, healthScore - 10),
                Career: Math.min(100, healthScore - 3),
                Safety: currentUser.metrics?.safetyScore || 95
            },
            trends: [
                { domain: 'Study', direction: 'IMPROVING', description: '+5% over 7d' },
                { domain: 'Academic', direction: 'DECLINING', description: '-12% over 7d' },
                { domain: 'Career', direction: 'STABLE', description: '0% over 7d' },
                { domain: 'Safety', direction: 'IMPROVING', description: '+2% over 7d' }
            ],
            data_quality: {
                study: 'sufficient',
                academic: 'sufficient',
                career: 'sufficient',
                safety: 'sufficient'
            },
            top_recommendations: currentUser.role === 'COMMANDER' ? [] : [
                {
                    title: "Optimize Study Schedule",
                    reason: "Graviton metrics indicate high fatigue during late-night coding sessions.",
                    domain: "FOCUS",
                    priority: "critical",
                    confidence: 0.94,
                    evidence: [],
                    action_url: "/explore"
                },
                {
                    title: "Review App Permissions",
                    reason: "3 third-party integrations have stale security tokens.",
                    domain: "SECURE",
                    priority: "high",
                    confidence: 0.85,
                    evidence: [],
                    action_url: "/secure"
                }
            ],
            top_insights: currentUser.role === 'COMMANDER' ? [] : [
                {
                    id: "insight-1",
                    title: "Fatigue-induced Security Risk",
                    summary: "Late night study sessions correlate with increased likelihood of falling for phishing attempts.",
                    domain: "CROSS-DOMAIN",
                    type: "correlation",
                    severity: 85,
                    confidence: 0.9,
                    evidence: ["Study hours logged post 2AM", "Failed simulated phishing test at 2:30AM"],
                    recommended_actions: [
                        {
                            domain: "focus",
                            priority: "high",
                            title: "Enforce sleep schedule lockdown",
                            reason: "Mitigates late-night cognitive fatigue and phishing vulnerability",
                            evidence: [],
                            action_url: "/explore",
                            confidence: 0.9
                        }
                    ],
                    created_at: new Date().toISOString()
                }
            ],
            priority_actions: ["Optimize Study Schedule", "Review App Permissions"]
        };
        setTimeout(() => {
            setOverview(mockData);
            setLoading(false);
        }, 800);
    }, [currentUser]);

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

    if (!overview) return null;

    // --- COMMANDER VIEW ---
    if (currentUser.role === 'COMMANDER') {
        const students = users.filter(u => u.role === 'STUDENT');
        const avgHealth = Math.round(students.reduce((acc, s) => acc + (s.metrics?.overallHealth || 0), 0) / students.length);

        return (
            <StitchAppLayout>
                <div className="space-y-8 max-w-7xl mx-auto">
                    <header>
                        <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-2">Fleet Command</h1>
                        <p className="text-sm font-medium tracking-widest text-zinc-500 uppercase">Aggregated Overview of all assigned cadets.</p>
                    </header>

                    {/* Fleet Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <StitchGlassCard className="border-[#00e5ff]/30 bg-[#00e5ff]/5">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="p-3 rounded-2xl bg-[#00e5ff]/10 border border-[#00e5ff]/30">
                                    <Users className="w-6 h-6 text-[#00e5ff]" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-black uppercase tracking-widest text-zinc-400">Total Active</h3>
                                    <div className="text-4xl font-black text-white">{students.length}</div>
                                </div>
                            </div>
                        </StitchGlassCard>

                        <StitchGlassCard className="border-[#00e676]/30 bg-[#00e676]/5">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="p-3 rounded-2xl bg-[#00e676]/10 border border-[#00e676]/30">
                                    <Activity className="w-6 h-6 text-[#00e676]" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-black uppercase tracking-widest text-zinc-400">Avg Fleet Health</h3>
                                    <div className="text-4xl font-black text-[#00e676]">{avgHealth}</div>
                                </div>
                            </div>
                        </StitchGlassCard>

                        <StitchGlassCard className="border-[#ffc400]/30 bg-[#ffc400]/5">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="p-3 rounded-2xl bg-[#ffc400]/10 border border-[#ffc400]/30">
                                    <AlertTriangle className="w-6 h-6 text-[#ffc400]" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-black uppercase tracking-widest text-zinc-400">Total Anomalies</h3>
                                    <div className="text-4xl font-black text-[#ffc400]">
                                        {students.reduce((acc, s) => acc + (s.metrics?.activeAnomalies || 0), 0)}
                                    </div>
                                </div>
                            </div>
                        </StitchGlassCard>
                    </div>

                    {/* Students Grid */}
                    <h2 className="text-xl font-black tracking-widest uppercase text-white mt-12 mb-6">Assigned Cadets</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {students.map(student => (
                            <StitchGlassCard key={student.id} className="group hover:border-white transition-colors cursor-pointer" onClick={() => setCurrentUser(student)}>
                                <div className="flex items-center gap-4 mb-6 border-b border-zinc-800 pb-4">
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${student.avatarColor}/20 border border-transparent`}>
                                        <User className={`w-6 h-6 ${student.avatarColor.replace('bg-', 'text-')}`} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg text-white group-hover:text-[#00e5ff] transition-colors">{student.name}</h3>
                                        <span className="text-[10px] font-black tracking-widest uppercase text-zinc-500">Student Profile</span>
                                    </div>
                                </div>
                                
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-zinc-400 font-bold uppercase tracking-wider text-xs">Overall Health</span>
                                        <span className={`font-mono font-black ${(student.metrics?.overallHealth || 0) < 80 ? 'text-[#ffc400]' : 'text-[#00e676]'}`}>{student.metrics?.overallHealth}%</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-zinc-400 font-bold uppercase tracking-wider text-xs">Safety Posture</span>
                                        <span className={`font-mono font-black ${(student.metrics?.safetyScore || 0) < 90 ? 'text-[#f50057]' : 'text-[#00e676]'}`}>{student.metrics?.safetyScore}/100</span>
                                    </div>
                                </div>

                                <div className="mt-6 pt-4 border-t border-zinc-800 text-center">
                                    <span className="text-[#00e5ff] text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                                        Switch to Profile →
                                    </span>
                                </div>
                            </StitchGlassCard>
                        ))}
                    </div>
                </div>
            </StitchAppLayout>
        );
    }

    // --- STUDENT VIEW ---
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
                        {currentUser.metrics?.activeAnomalies ? (
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
                        ) : (
                            <StitchGlassCard className="border-[#00e676]/30 shadow-[0_0_20px_rgba(0,230,118,0.1)] bg-[#00e676]/5">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-2 rounded-xl bg-[#00e676]/10 border border-[#00e676]/30">
                                        <ShieldCheck className="w-5 h-5 text-[#00e676]" />
                                    </div>
                                    <h3 className="font-black text-lg text-white tracking-widest uppercase">PULSE STABLE</h3>
                                </div>
                                <p className="text-sm font-medium text-[#00e676] leading-relaxed">
                                    No active anomalies detected in your academic telemetry. Keep up the good work.
                                </p>
                            </StitchGlassCard>
                        )}

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
