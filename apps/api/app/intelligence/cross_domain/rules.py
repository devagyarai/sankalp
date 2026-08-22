import uuid

from app.intelligence.cross_domain.models import DomainSignal, Insight
from app.schemas.intelligence import IntelligenceRecommendationSchema


def evaluate_academic_recovery(signals: list[DomainSignal]) -> list[Insight]:
    insights = []
    has_academic_risk = any(s for s in signals if s.signal_type == "ACADEMIC_RISK")
    has_low_consistency = any(s for s in signals if s.signal_type == "LOW_STUDY_CONSISTENCY")
    
    if has_academic_risk and has_low_consistency:
        risk_sig = next(s for s in signals if s.signal_type == "ACADEMIC_RISK")
        cons_sig = next(s for s in signals if s.signal_type == "LOW_STUDY_CONSISTENCY")
        
        insights.append(Insight(
            id=str(uuid.uuid4()),
            domain="CROSS_DOMAIN",
            type="ACADEMIC_RECOVERY",
            title="Academic Recovery Opportunity",
            summary="Academic risk is high while study completion is low.",
            severity=max(risk_sig.severity, cons_sig.severity),
            confidence=risk_sig.confidence * cons_sig.confidence,
            evidence=[risk_sig.evidence[0], cons_sig.evidence[0]],
            recommended_actions=[
                IntelligenceRecommendationSchema(
                    domain="study",
                    priority="high",
                    title="Increase Structured Study Allocation",
                    reason="Better study consistency is needed to address academic risks.",
                    evidence=[],
                    action_url="/study",
                    confidence=0.9
                )
            ]
        ))
    return insights


def evaluate_career_skill_priority(signals: list[DomainSignal]) -> list[Insight]:
    insights = []
    has_skill_gap = any(s for s in signals if s.signal_type == "HIGH_PRIORITY_SKILL_GAP")
    has_study_capacity = any(s for s in signals if s.signal_type == "HIGH_STUDY_CAPACITY")
    
    if has_skill_gap and has_study_capacity:
        gap_sig = next(s for s in signals if s.signal_type == "HIGH_PRIORITY_SKILL_GAP")
        cap_sig = next(s for s in signals if s.signal_type == "HIGH_STUDY_CAPACITY")
        
        insights.append(Insight(
            id=str(uuid.uuid4()),
            domain="CROSS_DOMAIN",
            type="CAREER_SKILL_PRIORITY",
            title="Career Skill Priority",
            summary="You have available study capacity to address critical career skill gaps.",
            severity=gap_sig.severity,
            confidence=gap_sig.confidence * cap_sig.confidence,
            evidence=[gap_sig.evidence[0], cap_sig.evidence[0]],
            recommended_actions=[
                IntelligenceRecommendationSchema(
                    domain="career",
                    priority="high",
                    title="Allocate Study Time to Missing Skills",
                    reason="You have the capacity to work on high-weight target role requirements.",
                    evidence=[],
                    action_url="/career",
                    confidence=0.9
                )
            ]
        ))
    return insights


def evaluate_performance_deterioration(signals: list[DomainSignal]) -> list[Insight]:
    insights = []
    has_declining_pulse = any(s for s in signals if s.signal_type == "DECLINING_PERFORMANCE")
    has_low_consistency = any(s for s in signals if s.signal_type == "LOW_STUDY_CONSISTENCY")
    
    if has_declining_pulse and has_low_consistency:
        pulse_sig = next(s for s in signals if s.signal_type == "DECLINING_PERFORMANCE")
        focus_sig = next(s for s in signals if s.signal_type == "LOW_STUDY_CONSISTENCY")
        
        insights.append(Insight(
            id=str(uuid.uuid4()),
            domain="CROSS_DOMAIN",
            type="PERFORMANCE_DETERIORATION",
            title="Performance Deterioration",
            summary="Both study execution and academic performance are trending downwards.",
            severity=max(pulse_sig.severity, focus_sig.severity),
            confidence=pulse_sig.confidence * focus_sig.confidence,
            evidence=[pulse_sig.evidence[0], focus_sig.evidence[0]],
            recommended_actions=[]
        ))
    return insights


def evaluate_security_vulnerability(signals: list[DomainSignal]) -> list[Insight]:
    insights = []
    has_weakness = any(s for s in signals if s.signal_type == "SECURITY_WEAKNESS")
    has_exposure = any(s for s in signals if s.signal_type == "SCAM_EXPOSURE")
    
    if has_weakness and has_exposure:
        weak_sig = next(s for s in signals if s.signal_type == "SECURITY_WEAKNESS")
        exp_sig = next(s for s in signals if s.signal_type == "SCAM_EXPOSURE")
        
        insights.append(Insight(
            id=str(uuid.uuid4()),
            domain="CROSS_DOMAIN",
            type="SECURITY_VULNERABILITY",
            title="Security Vulnerability",
            summary="Poor account security makes you highly vulnerable to recent scam attempts.",
            severity=max(weak_sig.severity, exp_sig.severity),
            confidence=weak_sig.confidence * exp_sig.confidence,
            evidence=[weak_sig.evidence[0], exp_sig.evidence[0]],
            recommended_actions=[
                IntelligenceRecommendationSchema(
                    domain="safety",
                    priority="critical",
                    title="Enable 2FA and Fix Privacy Settings",
                    reason="Recent threat exposure requires a hardened security posture.",
                    evidence=[],
                    action_url="/safety",
                    confidence=0.95
                )
            ]
        ))
    return insights


def evaluate_repeated_threat(signals: list[DomainSignal]) -> list[Insight]:
    insights = []
    has_exposure = any(s for s in signals if s.signal_type == "SCAM_EXPOSURE")
    has_repeated = any(s for s in signals if s.signal_type == "REPEATED_THREAT_INDICATOR")
    
    if has_exposure and has_repeated:
        exp_sig = next(s for s in signals if s.signal_type == "SCAM_EXPOSURE")
        rep_sig = next(s for s in signals if s.signal_type == "REPEATED_THREAT_INDICATOR")
        
        insights.append(Insight(
            id=str(uuid.uuid4()),
            domain="CROSS_DOMAIN",
            type="REPEATED_THREAT_EXPOSURE",
            title="Repeated Threat Exposure",
            summary="You are exposed to threat indicators that have been previously observed.",
            severity=max(exp_sig.severity, rep_sig.severity),
            confidence=min(1.0, exp_sig.confidence + 0.1), # Nexus increases Sentinel confidence
            evidence=[exp_sig.evidence[0], rep_sig.evidence[0]],
            recommended_actions=[]
        ))
    return insights


def apply_all_rules(signals: list[DomainSignal]) -> list[Insight]:
    insights = []
    insights.extend(evaluate_academic_recovery(signals))
    insights.extend(evaluate_career_skill_priority(signals))
    insights.extend(evaluate_performance_deterioration(signals))
    insights.extend(evaluate_security_vulnerability(signals))
    insights.extend(evaluate_repeated_threat(signals))
    
    # Sort insights by severity * confidence descending
    insights.sort(key=lambda x: x.severity * x.confidence, reverse=True)
    return insights
