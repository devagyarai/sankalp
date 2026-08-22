from sqlalchemy.orm import Session

from app.intelligence.sentinel.engine import analyze_threat_content
from app.models.threat import ThreatAnalysis, ThreatIndicator
from app.models.threat import ThreatSignal as ThreatSignalModel
from app.models.user import User
from app.schemas.threat import ThreatAnalysisRequest, ThreatAnalysisResponse, ThreatSignal


def analyze_threat(db: Session, user: User, req: ThreatAnalysisRequest) -> ThreatAnalysisResponse:
    # 1. Intelligence Engine Boundary
    intel_output = analyze_threat_content(req.content)
    
    # 2. Translate IntelligenceOutput to ThreatAnalysisResponse
    signals = []
    for issue in intel_output.issues:
        signals.append(ThreatSignal(type="detected_pattern", severity="high", explanation=issue))
        
    raw_level = intel_output.raw_data.get("threat_level", "unknown").lower() if intel_output.raw_data else "unknown"
    if raw_level == "critical":
        classification = "scam"
    elif raw_level == "suspicious":
        classification = "suspicious"
    elif raw_level == "safe":
        classification = "safe"
    else:
        classification = "unknown"
        
    result = ThreatAnalysisResponse(
        classification=classification,
        risk_score=intel_output.score,
        confidence=1.0,
        signals=signals,
        recommendations=[r.title for r in intel_output.recommendations]
    )
    
    # 3. Persist Untrusted Request and Engine Result
    analysis = ThreatAnalysis(
        user_id=user.id,
        input_type=req.content_type,
        content=req.content,
        risk_score=result.risk_score,
        classification=result.classification
    )
    db.add(analysis)
    db.flush()
    
    # 4. Persist Signals
    for sig in result.signals:
        sig_model = ThreatSignalModel(
            analysis_id=analysis.id,
            signal_type=sig.type,
            description=sig.explanation,
            confidence=0.9
        )
        db.add(sig_model)
        
    # 5. Persist Indicators (for Nexus)
    if intel_output.raw_data:
        for url in intel_output.raw_data.get("urls", []):
            db.add(ThreatIndicator(analysis_id=analysis.id, type="url", value=url))
        for email in intel_output.raw_data.get("emails", []):
            db.add(ThreatIndicator(analysis_id=analysis.id, type="email", value=email))
        for phone in intel_output.raw_data.get("phones", []):
            db.add(ThreatIndicator(analysis_id=analysis.id, type="phone", value=phone))
            
    db.commit()
    
    return result
