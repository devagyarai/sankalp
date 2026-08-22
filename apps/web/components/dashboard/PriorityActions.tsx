import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { IntelligenceRecommendationSchema } from '@/types/intelligence';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export function PriorityActions({ recommendations }: { recommendations: IntelligenceRecommendationSchema[] }) {
    if (!recommendations || recommendations.length === 0) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Priority Actions</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-gray-500 text-sm">You&apos;re all caught up. No urgent actions required.</p>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Priority Actions</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                <ul className="divide-y divide-gray-100">
                    {recommendations.slice(0, 3).map((rec, i) => (
                        <li key={i} className="p-6 hover:bg-gray-50 transition-colors">
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <Badge variant={rec.priority === 'critical' ? 'error' : rec.priority === 'high' ? 'warning' : 'default'}>
                                            {rec.priority} priority
                                        </Badge>
                                        <span className="text-xs text-gray-400 uppercase font-semibold">{rec.domain}</span>
                                    </div>
                                    <h4 className="text-base font-semibold text-gray-900">{rec.title}</h4>
                                    <p className="mt-1 text-sm text-gray-600">{rec.reason}</p>
                                </div>
                                {rec.action_url && (
                                    <Link href={rec.action_url}>
                                        <Button variant="secondary" className="text-xs">Take Action</Button>
                                    </Link>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
    );
}
