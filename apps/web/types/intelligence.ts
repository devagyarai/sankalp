export interface IntelligenceRecommendationSchema {
    domain: string;
    priority: "critical" | "high" | "medium" | "low";
    title: string;
    reason: string;
    evidence: string[];
    action_url: string | null;
    confidence: number;
}

export interface IntelligenceMetricSchema {
    name: string;
    value: number | string | boolean;
    description: string;
}

export interface IntelligenceOutputSchema {
    score: number;
    metrics: IntelligenceMetricSchema[];
    issues: string[];
    recommendations: IntelligenceRecommendationSchema[];
    explanation: string[];
    data_quality: "sufficient" | "limited" | "insufficient";
    raw_data?: Record<string, unknown>;
}

export interface DomainSignal {
    domain: string;
    signal_type: string;
    severity: number;
    confidence: number;
    evidence: string[];
    timestamp: string;
}

export interface Insight {
    id: string;
    domain: string;
    type: string;
    title: string;
    summary: string;
    severity: number;
    confidence: number;
    evidence: string[];
    recommended_actions: IntelligenceRecommendationSchema[];
    created_at: string;
}

export interface IntelligenceTrend {
    domain: string;
    direction: "IMPROVING" | "STABLE" | "DECLINING" | "INSUFFICIENT_DATA";
    description: string;
}

export interface UnifiedOverview {
    overall_health: number;
    domain_scores: Record<string, number>;
    trends: IntelligenceTrend[];
    top_insights: Insight[];
    top_recommendations: IntelligenceRecommendationSchema[];
    priority_actions: string[];
    data_quality: Record<string, "sufficient" | "limited" | "insufficient">;
}
