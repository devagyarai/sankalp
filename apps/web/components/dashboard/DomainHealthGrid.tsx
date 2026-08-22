import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { IntelligenceTrend } from '@/types/intelligence';

interface DomainHealthGridProps {
    scores: Record<string, number>;
    trends: IntelligenceTrend[];
    dataQuality: Record<string, "sufficient" | "limited" | "insufficient">;
}

export function DomainHealthGrid({ scores, trends, dataQuality }: DomainHealthGridProps) {
    const domains = [
        { key: 'Study', name: 'FOCUS' },
        { key: 'Academic', name: 'PULSE' },
        { key: 'Career', name: 'TRAJECTORY' },
        { key: 'Safety', name: 'SHIELD' },
    ]; // Sentinel/Nexus don't have straightforward 0-100 scores in this view, typically threat levels.

    const getTrend = (key: string) => trends.find(t => t.domain === key);

    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {domains.map(d => {
                const score = scores[d.key];
                const quality = dataQuality[d.key.toLowerCase()];
                const trend = getTrend(d.key);
                const isInsufficient = quality === 'insufficient';

                return (
                    <Card key={d.key}>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm uppercase tracking-wider text-gray-500 flex justify-between items-center">
                                {d.name}
                                {trend && trend.direction !== "INSUFFICIENT_DATA" && (
                                    <Badge variant={trend.direction === "IMPROVING" ? "success" : trend.direction === "DECLINING" ? "destructive" : "secondary"}>
                                        {trend.direction}
                                    </Badge>
                                )}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-baseline gap-2">
                                <span className={`text-3xl font-bold ${isInsufficient ? 'text-gray-300' : 'text-gray-900'}`}>
                                    {isInsufficient ? '--' : score}
                                </span>
                                {!isInsufficient && <span className="text-sm text-gray-500">/ 100</span>}
                            </div>
                            {isInsufficient && (
                                <p className="mt-1 text-xs text-gray-400">Limited data</p>
                            )}
                        </CardContent>
                    </Card>
                );
            })}
        </div>
    );
}
