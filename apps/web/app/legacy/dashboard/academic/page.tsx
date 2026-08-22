"use client";

import { useEffect, useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { intelligenceApi } from '@/lib/api/intelligence';
import { IntelligenceOutputSchema } from '@/types/intelligence';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';
import { PriorityActions } from '@/components/dashboard/PriorityActions';
import { Badge } from '@/components/ui/Badge';

export default function EduPulsePage() {
    const [data, setData] = useState<IntelligenceOutputSchema | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await intelligenceApi.getPulse();
                setData(result);
            } catch (err: unknown) {
                const error = err as Error;
                setError(error.message || "Failed to load EduPulse intelligence");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <AppLayout>
                <div className="space-y-8 animate-pulse">
                    <Skeleton className="h-32 w-full rounded-xl" />
                    <Skeleton className="h-64 w-full rounded-xl" />
                </div>
            </AppLayout>
        );
    }

    if (error) {
        return (
            <AppLayout>
                <div className="rounded-md bg-red-50 p-4 border border-red-200">
                    <h3 className="text-sm font-medium text-red-800">API Connection Failed</h3>
                    <p className="mt-2 text-sm text-red-700">{error}</p>
                </div>
            </AppLayout>
        );
    }

    if (!data) return null;

    return (
        <AppLayout>
            <div className="space-y-8 max-w-7xl mx-auto">
                <header className="flex justify-between items-end">
                    <div>
                        <Badge variant="default" className="mb-2">PULSE DOMAIN</Badge>
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900">EduPulse Intelligence</h1>
                    </div>
                    {data.data_quality === "sufficient" && (
                        <div className="text-right">
                            <span className="text-sm text-gray-500 uppercase tracking-wider font-semibold">Risk Score</span>
                            <div className={`text-4xl font-bold ${data.score > 50 ? 'text-red-600' : 'text-green-600'}`}>
                                {data.score}<span className="text-xl text-gray-400">/100</span>
                            </div>
                        </div>
                    )}
                </header>

                {data.data_quality === "insufficient" ? (
                    <Card className="bg-gray-50 border-dashed">
                        <CardContent className="p-12 text-center">
                            <h3 className="text-lg font-medium text-gray-900">Insufficient Academic Data</h3>
                            <p className="mt-2 text-sm text-gray-500 max-w-md mx-auto">
                                Not enough academic data yet. Add your first assessment to start tracking your academic trajectory.
                            </p>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-8">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Intelligence Explanation</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {data.explanation.map((text, i) => (
                                            <p key={i} className="text-sm text-gray-700">{text}</p>
                                        ))}
                                    </div>
                                    {data.issues.length > 0 && (
                                        <div className="mt-6 pt-6 border-t border-gray-100">
                                            <h4 className="text-sm font-medium text-red-800 mb-2">Early Warning Signals</h4>
                                            <ul className="list-disc list-inside text-sm text-red-700 space-y-1">
                                                {data.issues.map((issue, i) => (
                                                    <li key={i}>{issue}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Academic Metrics</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {data.metrics.map((metric, i) => (
                                            <div key={i} className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                                                <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">{metric.name}</p>
                                                <p className="mt-1 text-2xl font-semibold text-gray-900">{metric.value}</p>
                                                <p className="mt-1 text-xs text-gray-400">{metric.description}</p>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                        
                        <div>
                            <PriorityActions recommendations={data.recommendations} />
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
