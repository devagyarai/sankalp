from app.intelligence.cross_domain.models import DomainSignal
from app.schemas.intelligence import IntelligenceOutputSchema


def extract_focus_signals(output: IntelligenceOutputSchema) -> list[DomainSignal]:
    signals = []
    if output.data_quality != "insufficient":
        # Check completion rate metric
        completion = next((m.value for m in output.metrics if m.name == "Completion Rate"), 0.0)
        
        # If completion is low, score is low
        if completion < 0.5:
            severity = 100 - output.score
            signals.append(DomainSignal(
                domain="FOCUS",
                signal_type="LOW_STUDY_CONSISTENCY",
                severity=severity,
                confidence=0.8,
                evidence=[f"Study completion rate is only {completion*100:.1f}%"]
            ))
        elif completion >= 0.8:
            signals.append(DomainSignal(
                domain="FOCUS",
                signal_type="HIGH_STUDY_CAPACITY",
                severity=10, # Severity is inverse of positive signal, or we just use 0
                confidence=0.8,
                evidence=[f"Study completion rate is strong at {completion*100:.1f}%"]
            ))
            
    return signals


def extract_trajectory_signals(output: IntelligenceOutputSchema) -> list[DomainSignal]:
    signals = []
    if output.data_quality != "insufficient":
        # Trajectory has issues like "Critical skill missing: Python (gap: 40%)"
        for issue in output.issues:
            if "Critical skill missing" in issue:
                signals.append(DomainSignal(
                    domain="TRAJECTORY",
                    signal_type="HIGH_PRIORITY_SKILL_GAP",
                    severity=80,
                    confidence=0.9,
                    evidence=[issue]
                ))
    return signals


def extract_pulse_signals(output: IntelligenceOutputSchema) -> list[DomainSignal]:
    signals = []
    if output.data_quality != "insufficient":
        # Pulse risk score > 50 means high risk
        if output.score > 50:
            signals.append(DomainSignal(
                domain="PULSE",
                signal_type="ACADEMIC_RISK",
                severity=output.score,
                confidence=0.85,
                evidence=["High academic risk detected based on recent assessments."]
            ))
        
        # Pulse trend
        trend_val = output.raw_data.get("trend", 0.0) if output.raw_data else 0.0
        if trend_val < -5:
            signals.append(DomainSignal(
                domain="PULSE",
                signal_type="DECLINING_PERFORMANCE",
                severity=min(100, int(abs(trend_val) * 5)), # E.g. -10 -> 50
                confidence=0.8,
                evidence=[f"Academic trend is declining by {trend_val:.1f}%"]
            ))
    return signals


def extract_shield_signals(output: IntelligenceOutputSchema) -> list[DomainSignal]:
    signals = []
    if output.data_quality != "insufficient" and output.score < 50:
        signals.append(DomainSignal(
            domain="SHIELD",
            signal_type="SECURITY_WEAKNESS",
            severity=100 - output.score,
            confidence=0.9,
            evidence=["Digital safety score indicates critical vulnerabilities."]
        ))
    return signals


def extract_sentinel_signals(output: IntelligenceOutputSchema) -> list[DomainSignal]:
    signals = []
    if output.data_quality != "insufficient":
        threat_level = output.raw_data.get("threat_level", "SAFE") if output.raw_data else "SAFE"
        if threat_level in ["CRITICAL", "SUSPICIOUS"]:
            signals.append(DomainSignal(
                domain="SENTINEL",
                signal_type="SCAM_EXPOSURE",
                severity=output.score,
                confidence=0.95,
                evidence=["Recent threat analysis flagged suspicious or critical content."]
            ))
    return signals


def extract_nexus_signals(output: IntelligenceOutputSchema) -> list[DomainSignal]:
    signals = []
    if output.data_quality != "insufficient" and output.score > 50:
        signals.append(DomainSignal(
            domain="NEXUS",
            signal_type="REPEATED_THREAT_INDICATOR",
            severity=output.score,
            confidence=0.9,
            evidence=["Nexus correlation identified previously seen threat indicators."]
        ))
    return signals
