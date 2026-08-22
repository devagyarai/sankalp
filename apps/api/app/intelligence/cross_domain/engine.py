from sqlalchemy import select
from sqlalchemy.orm import Session

from app.intelligence.cross_domain.models import DomainSignal, IntelligenceTrend, UnifiedOverview
from app.intelligence.cross_domain.recommendations import aggregate_and_rank_recommendations, get_priority_actions
from app.intelligence.cross_domain.rules import apply_all_rules
from app.intelligence.cross_domain.signals import (
    extract_focus_signals,
    extract_nexus_signals,
    extract_pulse_signals,
    extract_sentinel_signals,
    extract_shield_signals,
    extract_trajectory_signals,
)
from app.intelligence.focus.engine import analyze_study_metrics
from app.intelligence.nexus.engine import correlate_threats
from app.intelligence.pulse.engine import evaluate_academic_risk
from app.intelligence.sentinel.engine import analyze_threat_content
from app.intelligence.shield.engine import calculate_safety_score
from app.intelligence.trajectory.engine import calculate_skill_gaps
from app.models.threat import ThreatAnalysis
from app.models.user import User
from app.schemas.intelligence import IntelligenceOutputSchema


def generate_unified_intelligence(db: Session, user: User) -> UnifiedOverview:
    # 1. Execute Domain Engines
    focus_out = analyze_study_metrics(db, user)
    traj_out = calculate_skill_gaps(db, user)
    pulse_out = evaluate_academic_risk(db, user)
    shield_out = calculate_safety_score(db, user)
    
    # For Sentinel & Nexus, get the latest ThreatAnalysis
    latest_threat = db.scalar(
        select(ThreatAnalysis)
        .where(ThreatAnalysis.user_id == user.id)
        .order_by(ThreatAnalysis.created_at.desc())
    )
    
    if latest_threat and latest_threat.content:
        sentinel_out = analyze_threat_content(latest_threat.content)
        nexus_out = correlate_threats(db, latest_threat.id)
    else:
        empty_out = IntelligenceOutputSchema(
            score=0, metrics=[], issues=[], recommendations=[], explanation=[], data_quality="insufficient"
        )
        sentinel_out = empty_out
        nexus_out = empty_out

    # 2. Extract Signals
    signals: list[DomainSignal] = []
    signals.extend(extract_focus_signals(focus_out))
    signals.extend(extract_trajectory_signals(traj_out))
    signals.extend(extract_pulse_signals(pulse_out))
    signals.extend(extract_shield_signals(shield_out))
    signals.extend(extract_sentinel_signals(sentinel_out))
    signals.extend(extract_nexus_signals(nexus_out))
    
    # 3. Apply Cross-Domain Rules
    insights = apply_all_rules(signals)
    
    # 4. Aggregate Recommendations
    all_domain_recs = []
    for out in [focus_out, traj_out, pulse_out, shield_out, sentinel_out, nexus_out]:
        all_domain_recs.extend(out.recommendations)
        
    ranked_recs = aggregate_and_rank_recommendations(all_domain_recs, insights)
    priority_actions = get_priority_actions(ranked_recs, max_actions=3)
    
    # 5. Calculate Overall Health & Domain Scores
    domain_scores = {
        "Academic": pulse_out.score, # Wait, for academic, lower risk is better health? No, risk is score. Let's invert risk.
        "Study": focus_out.score,
        "Career": traj_out.score,
        "Safety": shield_out.score
    }
    
    # Invert Pulse and Shield if they are risk-based (Shield is 0-100 safety, Pulse is 0-100 risk)
    # Let's normalize everything so higher = better health for the dashboard overview.
    # Pulse score is Risk (higher = worse). Shield score is Safety (higher = better).
    health_scores = [
        100 - pulse_out.score if pulse_out.data_quality != "insufficient" else None,
        focus_out.score if focus_out.data_quality != "insufficient" else None,
        traj_out.score if traj_out.data_quality != "insufficient" else None,
        shield_out.score if shield_out.data_quality != "insufficient" else None
    ]
    
    valid_scores = [s for s in health_scores if s is not None]
    overall_health = int(sum(valid_scores) / len(valid_scores)) if valid_scores else 0
    
    # 6. Determine Trends
    trends = []
    if pulse_out.raw_data and "trend" in pulse_out.raw_data:
        t_val = pulse_out.raw_data["trend"]
        if t_val > 5:
            trends.append(IntelligenceTrend(domain="Academic", direction="IMPROVING", description="Academic performance is trending up."))
        elif t_val < -5:
            trends.append(IntelligenceTrend(domain="Academic", direction="DECLINING", description="Academic performance is declining."))
        else:
            trends.append(IntelligenceTrend(domain="Academic", direction="STABLE", description="Academic performance is stable."))
            
    if shield_out.raw_data and "trend" in shield_out.raw_data: # Assume shield might have trend in future
        pass 
        
    if not trends:
        trends.append(IntelligenceTrend(domain="Overall", direction="INSUFFICIENT_DATA", description="Not enough data to calculate trends."))

    # 7. Collect Data Quality
    data_quality = {
        "focus": focus_out.data_quality,
        "trajectory": traj_out.data_quality,
        "pulse": pulse_out.data_quality,
        "shield": shield_out.data_quality,
        "sentinel": sentinel_out.data_quality,
        "nexus": nexus_out.data_quality
    }
    
    return UnifiedOverview(
        overall_health=overall_health,
        domain_scores=domain_scores,
        trends=trends,
        top_insights=insights[:5], # Return top 5 insights
        top_recommendations=ranked_recs[:5],
        priority_actions=priority_actions,
        data_quality=data_quality
    )
