from typing import Literal

from pydantic import BaseModel


class ThreatAnalysisRequest(BaseModel):
    content: str
    content_type: Literal["sms", "email", "url", "message", "payment_message", "text"]

class ThreatSignal(BaseModel):
    type: str
    severity: str
    explanation: str

class ThreatAnalysisResponse(BaseModel):
    classification: Literal["safe", "suspicious", "scam", "unknown"]
    risk_score: int
    confidence: float
    signals: list[ThreatSignal]
    recommendations: list[str]
