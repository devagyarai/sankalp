from dataclasses import dataclass
from typing import Any


@dataclass
class IntelligenceMetric:
    name: str
    value: float | int | str
    description: str | None = None


@dataclass
class IntelligenceRecommendation:
    domain: str
    priority: str # "high", "medium", "low"
    title: str
    reason: str
    evidence: list[str]
    action_url: str | None = None
    confidence: float = 1.0


@dataclass
class IntelligenceOutput:
    score: int # 0-100
    metrics: list[IntelligenceMetric]
    issues: list[str]
    recommendations: list[IntelligenceRecommendation]
    explanation: list[str]
    data_quality: str # "high", "medium", "low", "insufficient"
    raw_data: dict[str, Any] | None = None
