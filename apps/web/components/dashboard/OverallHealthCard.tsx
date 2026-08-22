import React from 'react';
import { Card, CardContent } from '@/components/ui/Card';

export function OverallHealthCard({ score }: { score: number }) {
    return (
        <Card className="bg-gray-900 text-white border-gray-800">
            <CardContent className="flex flex-col items-center justify-center p-8">
                <h2 className="text-sm font-semibold tracking-widest text-gray-400 uppercase">Sankalp Health</h2>
                <div className="mt-4 flex items-baseline gap-2">
                    <span className="text-6xl font-bold tracking-tight">{score}</span>
                    <span className="text-xl text-gray-500">/ 100</span>
                </div>
                {score === 0 && (
                    <p className="mt-4 text-sm text-gray-400">Insufficient data to calculate overall health.</p>
                )}
            </CardContent>
        </Card>
    );
}
