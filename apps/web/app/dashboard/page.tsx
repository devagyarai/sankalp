"use client";

import { useEffect, useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { intelligenceApi } from '@/lib/api/intelligence';
import { UnifiedOverview } from '@/types/intelligence';
import { OverallHealthCard } from '@/components/dashboard/OverallHealthCard';
import { DomainHealthGrid } from '@/components/dashboard/DomainHealthGrid';
import { CrossDomainInsightCard } from '@/components/dashboard/CrossDomainInsightCard';
import { PriorityActions } from '@/components/dashboard/PriorityActions';
import { Skeleton } from '@/components/ui/Skeleton';

export default function DashboardPage() {
    const [overview, setOverview] = useState<UnifiedOverview | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchOverview = async () => {
            try {
                const data = await intelligenceApi.getOverview();
                setOverview(data);
            } catch (err: unknown) {
                const error = err as Error;
                setError(error.message || "Failed to load intelligence overview");
            } finally {
                setLoading(false);
            }
        };

        fetchOverview();
    }, []);

    if (loading) {
        return (
            <AppLayout>
                <div className="space-y-8 animate-pulse">
                    <Skeleton className="h-48 w-full max-w-sm rounded-xl" />
                    <Skeleton className="h-32 w-full rounded-xl" />
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <Skeleton className="h-64 rounded-xl" />
                        <Skeleton className="h-64 rounded-xl" />
                    </div>
                </div>
            </AppLayout>
        );
    }

    if (error) {
        return (
            <AppLayout>
                <div className="rounded-md bg-red-50 p-4 border border-red-200">
                    <h3 className="text-sm font-medium text-red-800">API Connection Failed</h3>
                    <div className="mt-2 text-sm text-red-700">
                        <p>{error}</p>
                    </div>
                </div>
            </AppLayout>
        );
    }

    if (!overview) return null;

    return (
        <AppLayout>
            <div className="space-y-8 max-w-7xl mx-auto">
                <header>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Intelligence Overview</h1>
                    <p className="text-sm text-gray-500 mt-1">Unified insights across all SANKALP domains.</p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-1">
                        <OverallHealthCard score={overview.overall_health} />
                    </div>
                    <div className="lg:col-span-2">
                        <DomainHealthGrid 
                            scores={overview.domain_scores} 
                            trends={overview.trends} 
                            dataQuality={overview.data_quality} 
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <h2 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-2">Cross-Domain Insights</h2>
                        {overview.top_insights.length === 0 ? (
                            <div className="rounded-xl border border-gray-200 bg-gray-50 p-8 text-center">
                                <p className="text-sm text-gray-500">No active cross-domain insights detected.</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {overview.top_insights.map(insight => (
                                    <CrossDomainInsightCard key={insight.id} insight={insight} />
                                ))}
                            </div>
                        )}
                    </div>

                    <div>
                        <PriorityActions recommendations={overview.top_recommendations} />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
