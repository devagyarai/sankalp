from sqlalchemy import select
from sqlalchemy.orm import Session

from app.intelligence.common.models import IntelligenceMetric, IntelligenceOutput, IntelligenceRecommendation
from app.intelligence.common.scoring import normalize_score
from app.models.threat import ThreatAnalysis, ThreatIndicator


def correlate_threats(db: Session, analysis_id: str) -> IntelligenceOutput:
    # We want to find correlations for a specific analysis
    analysis = db.scalar(
        select(ThreatAnalysis)
        .where(ThreatAnalysis.id == analysis_id)
    )
    
    if not analysis:
        return IntelligenceOutput(
            score=0,
            metrics=[],
            issues=["Analysis not found."],
            recommendations=[],
            explanation=["Cannot correlate a non-existent threat analysis."],
            data_quality="insufficient"
        )
        
    indicators = db.scalars(
        select(ThreatIndicator)
        .where(ThreatIndicator.analysis_id == analysis.id)
    ).all()
    
    if not indicators:
        return IntelligenceOutput(
            score=0,
            metrics=[],
            issues=["No indicators found."],
            recommendations=[],
            explanation=["This analysis has no extractable indicators to correlate."],
            data_quality="insufficient"
        )
        
    issues = []
    explanation = []
    recommendations = []
    
    related_analyses = set()
    indicator_matches = {}
    
    for ind in indicators:
        # Find other indicators with the same value and type
        matches = db.scalars(
            select(ThreatIndicator)
            .where(
                ThreatIndicator.type == ind.type,
                ThreatIndicator.value == ind.value,
                ThreatIndicator.analysis_id != analysis.id
            )
        ).all()
        
        if matches:
            indicator_matches[ind.value] = len(matches)
            for m in matches:
                related_analyses.add(m.analysis_id)
                
    correlation_count = len(related_analyses)
    
    if correlation_count > 0:
        base_score = min(correlation_count * 20, 100)
        issues.append(f"Found {correlation_count} correlated threats.")
        explanation.append(f"This threat shares indicators with {correlation_count} other known threats.")
        
        for val, count in indicator_matches.items():
            explanation.append(f"Indicator '{val}' was seen in {count} other analyses.")
            
        recommendations.append(
            IntelligenceRecommendation(
                domain="threat",
                priority="high",
                title="Pattern Recognized",
                reason="This is part of a broader campaign or repeated pattern.",
                evidence=[f"Correlated with {correlation_count} historical records."],
            )
        )
    else:
        base_score = 0
        explanation.append("No historical correlations found for these indicators. This appears to be an isolated or novel threat.")
        
    score = normalize_score(base_score, 0, 100)
    
    metrics = [
        IntelligenceMetric(name="Correlated Threats", value=correlation_count, description="Number of related threat reports"),
        IntelligenceMetric(name="Shared Indicators", value=len(indicator_matches), description="Number of distinct matched indicators")
    ]
    
    return IntelligenceOutput(
        score=score,
        metrics=metrics,
        issues=issues,
        recommendations=recommendations,
        explanation=explanation,
        data_quality="high",
        raw_data={"related_analyses": list(related_analyses)}
    )
