from app.schemas.threat import ThreatAnalysisRequest, ThreatAnalysisResponse, ThreatSignal


def analyze_threat(req: ThreatAnalysisRequest) -> ThreatAnalysisResponse:
    if "urgent" in req.content.lower() or "password" in req.content.lower():
        return ThreatAnalysisResponse(
            classification="suspicious",
            risk_score=75,
            confidence=0.85,
            signals=[
                ThreatSignal(type="urgency_language", severity="high", explanation="The message attempts to create urgency.")
            ],
            recommendations=["Do not click any links", "Verify sender identity"]
        )
    return ThreatAnalysisResponse(
        classification="safe",
        risk_score=10,
        confidence=0.90,
        signals=[],
        recommendations=[]
    )
