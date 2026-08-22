import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Insight } from '@/types/intelligence';

export function CrossDomainInsightCard({ insight }: { insight: Insight }) {
    const getSeverityBadge = (severity: number) => {
        if (severity >= 80) return <Badge variant="destructive">Critical</Badge>;
        if (severity >= 60) return <Badge variant="warning">High</Badge>;
        if (severity >= 40) return <Badge variant="secondary">Medium</Badge>;
        return <Badge variant="default">Low</Badge>;
    };

    return (
        <Card className="border-l-4 border-l-blue-600">
            <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                    <div>
                        <Badge variant="default" className="mb-2">Cross-Domain Insight</Badge>
                        <CardTitle>{insight.title}</CardTitle>
                    </div>
                    {getSeverityBadge(insight.severity)}
                </div>
            </CardHeader>
            <CardContent>
                <p className="text-gray-700 font-medium mb-4">{insight.summary}</p>
                <div className="space-y-2">
                    <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Evidence</h4>
                    <ul className="list-disc list-inside text-sm text-gray-600">
                        {insight.evidence.map((ev, i) => (
                            <li key={i}>{ev}</li>
                        ))}
                    </ul>
                </div>
                {insight.recommended_actions.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                        <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Recommended Action</h4>
                        <div className="text-sm font-medium text-blue-700">
                            → {insight.recommended_actions[0].title}
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
