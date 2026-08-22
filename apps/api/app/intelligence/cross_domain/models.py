from datetime import UTC, datetime

from pydantic import BaseModel, Field

from app.schemas.intelligence import IntelligenceRecommendationSchema


class DomainSignal(BaseModel):
    domain: str
    signal_type: str
    severity: int  # 0 to 100
    confidence: float # 0.0 to 1.0
    evidence: list[str]
    timestamp: datetime = Field(default_factory=lambda: datetime.now(UTC))


class Insight(BaseModel):
    id: str
    domain: str
    type: str
    title: str
    summary: str
    severity: int
    confidence: float
    evidence: list[str]
    recommended_actions: list[IntelligenceRecommendationSchema]
    created_at: datetime = Field(default_factory=lambda: datetime.now(UTC))


class IntelligenceTrend(BaseModel):
    domain: str
    direction: str  # "IMPROVING", "STABLE", "DECLINING", "INSUFFICIENT_DATA"
    description: str


class UnifiedOverview(BaseModel):
    overall_health: int
    domain_scores: dict[str, int]
    trends: list[IntelligenceTrend]
    top_insights: list[Insight]
    top_recommendations: list[IntelligenceRecommendationSchema]
    priority_actions: list[str]
    data_quality: dict[str, str]
