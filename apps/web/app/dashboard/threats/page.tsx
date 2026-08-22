"use client";

import { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { apiClient } from '@/lib/api/client';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ThreatAnalysisResponse } from '@/lib/api/types';

export default function ThreatsPage() {
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<ThreatAnalysisResponse | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleAnalyze = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!content.trim()) return;

        setLoading(true);
        setError(null);
        try {
            const res = await apiClient.analyzeThreat(content, 'text');
            if (res.success && res.data) {
                setResult(res.data);
            } else {
                setError("Failed to analyze threat content.");
            }
        } catch (err: unknown) {
            const error = err as Error;
            setError(error.message || "An error occurred during analysis.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AppLayout>
            <div className="space-y-8 max-w-7xl mx-auto">
                <header className="flex justify-between items-end">
                    <div>
                        <Badge variant="default" className="mb-2">SENTINEL DOMAIN</Badge>
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Threat Analysis</h1>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Submit Content for Analysis</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleAnalyze} className="space-y-4">
                                <div>
                                    <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                                        Suspicious text, email, or message
                                    </label>
                                    <textarea
                                        id="content"
                                        name="content"
                                        rows={6}
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900 sm:text-sm p-3 border"
                                        placeholder="Paste the suspicious content here..."
                                        disabled={loading}
                                    />
                                    <p className="mt-2 text-xs text-gray-500">
                                        Content is securely analyzed and cross-referenced with NEXUS threat indicators.
                                    </p>
                                </div>
                                {error && (
                                    <div className="text-sm text-red-600 font-medium">{error}</div>
                                )}
                                <Button type="submit" disabled={loading || !content.trim()} className="w-full">
                                    {loading ? 'Analyzing...' : 'Analyze Threat'}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>

                    <div>
                        {result ? (
                            <Card className={result.classification === 'scam' ? 'border-red-500' : 'border-green-500'}>
                                <CardHeader>
                                    <div className="flex justify-between items-center">
                                        <CardTitle>Analysis Result</CardTitle>
                                        <Badge variant={result.classification === 'scam' ? 'error' : result.classification === 'suspicious' ? 'warning' : 'default'}>
                                            {result.classification.toUpperCase()}
                                        </Badge>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div>
                                        <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Classification</h4>
                                        <p className="text-lg font-medium text-gray-900">{result.classification.toUpperCase()}</p>
                                    </div>
                                    
                                    <div>
                                        <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Signals Detected</h4>
                                        {result.signals.length > 0 ? (
                                            <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                                                {result.signals.map((sig, i) => (
                                                    <li key={i}>{sig.type}: {sig.explanation}</li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <p className="text-sm text-gray-500">No known threat signals detected.</p>
                                        )}
                                    </div>

                                    <div>
                                        <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Risk Score</h4>
                                        <div className="flex items-center gap-4">
                                            <div className="flex-1 bg-gray-200 rounded-full h-2">
                                                <div 
                                                    className={`h-2 rounded-full ${result.risk_score > 50 ? 'bg-red-500' : 'bg-green-500'}`} 
                                                    style={{ width: `${result.risk_score}%` }}
                                                ></div>
                                            </div>
                                            <span className="text-sm font-medium text-gray-900">{result.risk_score}/100</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ) : (
                            <Card className="bg-gray-50 border-dashed h-full">
                                <CardContent className="p-12 text-center h-full flex flex-col justify-center">
                                    <h3 className="text-lg font-medium text-gray-900">Ready to Analyze</h3>
                                    <p className="mt-2 text-sm text-gray-500 max-w-sm mx-auto">
                                        Submit content to receive a deterministic, privacy-preserving threat analysis.
                                    </p>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
