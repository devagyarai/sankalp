
import pytest

from app.intelligence.cross_domain.models import DomainSignal
from app.intelligence.cross_domain.recommendations import aggregate_and_rank_recommendations
from app.intelligence.cross_domain.rules import (
    evaluate_academic_recovery,
    evaluate_security_vulnerability,
)
from app.intelligence.cross_domain.signals import (
    extract_focus_signals,
    extract_pulse_signals,
)
from app.schemas.intelligence import (
    IntelligenceMetricSchema,
    IntelligenceOutputSchema,
    IntelligenceRecommendationSchema,
)


def test_empty_user_insufficient_data():
    out = IntelligenceOutputSchema(score=0, metrics=[], issues=[], recommendations=[], explanation=[], data_quality="insufficient")
    assert len(extract_focus_signals(out)) == 0
    assert len(extract_pulse_signals(out)) == 0


def test_single_domain_data():
    out = IntelligenceOutputSchema(
        score=20,
        metrics=[IntelligenceMetricSchema(name="Completion Rate", value=0.1)],
        issues=[],
        recommendations=[],
        explanation=[],
        data_quality="sufficient"
    )
    signals = extract_focus_signals(out)
    assert len(signals) == 1
    assert signals[0].signal_type == "LOW_STUDY_CONSISTENCY"


def test_multi_domain_data_academic_recovery():
    pulse_sig = DomainSignal(domain="PULSE", signal_type="ACADEMIC_RISK", severity=80, confidence=0.9, evidence=["Bad GPA"])
    focus_sig = DomainSignal(domain="FOCUS", signal_type="LOW_STUDY_CONSISTENCY", severity=70, confidence=0.8, evidence=["Low completion"])
    
    insights = evaluate_academic_recovery([pulse_sig, focus_sig])
    assert len(insights) == 1
    assert insights[0].type == "ACADEMIC_RECOVERY"
    assert insights[0].severity == 80
    assert insights[0].confidence == pytest.approx(0.72)  # 0.9 * 0.8
    assert len(insights[0].recommended_actions) == 1
    assert insights[0].recommended_actions[0].priority == "high"


def test_conflicting_signals():
    # If a user has HIGH study capacity, but is at academic risk, academic recovery does NOT trigger
    pulse_sig = DomainSignal(domain="PULSE", signal_type="ACADEMIC_RISK", severity=80, confidence=0.9, evidence=["Bad GPA"])
    focus_sig = DomainSignal(domain="FOCUS", signal_type="HIGH_STUDY_CAPACITY", severity=10, confidence=0.8, evidence=["Good completion"])
    
    insights = evaluate_academic_recovery([pulse_sig, focus_sig])
    assert len(insights) == 0


def test_high_severity_signal():
    shield_sig = DomainSignal(domain="SHIELD", signal_type="SECURITY_WEAKNESS", severity=90, confidence=0.9, evidence=["No 2FA"])
    sent_sig = DomainSignal(domain="SENTINEL", signal_type="SCAM_EXPOSURE", severity=100, confidence=1.0, evidence=["Phishing attempt"])
    
    insights = evaluate_security_vulnerability([shield_sig, sent_sig])
    assert len(insights) == 1
    assert insights[0].severity == 100
    assert insights[0].recommended_actions[0].priority == "critical"


def test_low_confidence_signal():
    pulse_sig = DomainSignal(domain="PULSE", signal_type="ACADEMIC_RISK", severity=80, confidence=0.1, evidence=["Maybe bad GPA"])
    focus_sig = DomainSignal(domain="FOCUS", signal_type="LOW_STUDY_CONSISTENCY", severity=70, confidence=0.1, evidence=["Maybe low completion"])
    
    insights = evaluate_academic_recovery([pulse_sig, focus_sig])
    assert len(insights) == 1
    assert insights[0].confidence == pytest.approx(0.01)  # Extremely low confidence


def test_duplicate_recommendations():
    rec1 = IntelligenceRecommendationSchema(domain="study", priority="high", title="Study More", reason="A", evidence=[], confidence=0.5)
    rec2 = IntelligenceRecommendationSchema(domain="study", priority="high", title="Study More", reason="B", evidence=[], confidence=0.9)
    
    ranked = aggregate_and_rank_recommendations([rec1, rec2], [])
    assert len(ranked) == 1
    assert ranked[0].confidence == 0.9  # Kept the higher confidence one


def test_prioritization():
    rec1 = IntelligenceRecommendationSchema(domain="study", priority="low", title="Study More", reason="", evidence=[], confidence=1.0)
    rec2 = IntelligenceRecommendationSchema(domain="safety", priority="critical", title="Fix 2FA", reason="", evidence=[], confidence=0.8)
    rec3 = IntelligenceRecommendationSchema(domain="career", priority="high", title="Learn Python", reason="", evidence=[], confidence=0.9)
    
    ranked = aggregate_and_rank_recommendations([rec1, rec2, rec3], [])
    assert len(ranked) == 3
    assert ranked[0].title == "Fix 2FA"
    assert ranked[1].title == "Learn Python"
    assert ranked[2].title == "Study More"


def test_deterministic_repeatability():
    rec1 = IntelligenceRecommendationSchema(domain="study", priority="high", title="Study More", reason="", evidence=[], confidence=0.9)
    rec2 = IntelligenceRecommendationSchema(domain="safety", priority="critical", title="Fix 2FA", reason="", evidence=[], confidence=0.8)
    
    ranked1 = aggregate_and_rank_recommendations([rec1, rec2], [])
    ranked2 = aggregate_and_rank_recommendations([rec1, rec2], [])
    
    assert [r.title for r in ranked1] == [r.title for r in ranked2]
