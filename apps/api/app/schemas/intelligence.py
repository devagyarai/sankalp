from typing import Any

from pydantic import BaseModel


class IntelligenceMetricSchema(BaseModel):
    name: str
    value: Any
    description: str | None = None


class IntelligenceRecommendationSchema(BaseModel):
    domain: str
    priority: str
    title: str
    reason: str
    evidence: list[str]
    action_url: str | None = None
    confidence: float


class IntelligenceOutputSchema(BaseModel):
    score: int
    metrics: list[IntelligenceMetricSchema]
    issues: list[str]
    recommendations: list[IntelligenceRecommendationSchema]
    explanation: list[str]
    data_quality: str
    raw_data: dict[str, Any] | None = None
