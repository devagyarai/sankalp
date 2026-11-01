
from app.intelligence.cross_domain.models import Insight
from app.schemas.intelligence import IntelligenceRecommendationSchema


def _to_schema(rec) -> IntelligenceRecommendationSchema:
    if isinstance(rec, IntelligenceRecommendationSchema):
        return rec
    return IntelligenceRecommendationSchema(
        domain=getattr(rec, "domain", "general"),
        priority=getattr(rec, "priority", "medium"),
        title=getattr(rec, "title", ""),
        reason=getattr(rec, "reason", ""),
        evidence=getattr(rec, "evidence", []),
        action_url=getattr(rec, "action_url", None),
        confidence=getattr(rec, "confidence", 1.0),
    )


def aggregate_and_rank_recommendations(
    domain_recs: list, 
    insights: list[Insight]
) -> list[IntelligenceRecommendationSchema]:
    """
    Deduplicates, scores, and ranks all recommendations from domains and cross-domain insights.
    """
    all_recs: list[IntelligenceRecommendationSchema] = [_to_schema(r) for r in domain_recs]
    
    # Extract recommendations from insights
    for insight in insights:
        all_recs.extend([_to_schema(r) for r in insight.recommended_actions])
        
    # Deduplicate by title (simple dedup)
    unique_recs = {}
    for rec in all_recs:
        if rec.title not in unique_recs:
            unique_recs[rec.title] = rec
        else:
            # Keep the one with higher confidence
            if rec.confidence > unique_recs[rec.title].confidence:
                unique_recs[rec.title] = rec
                
    deduped = list(unique_recs.values())
    
    # Priority mapping for scoring
    priority_weights = {
        "critical": 100,
        "high": 75,
        "medium": 50,
        "low": 25
    }
    
    # Rank by priority weight * confidence
    deduped.sort(
        key=lambda r: priority_weights.get(r.priority.lower(), 0) * r.confidence, 
        reverse=True
    )
    
    return deduped


def get_priority_actions(ranked_recs: list[IntelligenceRecommendationSchema], max_actions: int = 3) -> list[str]:
    """
    Extracts the highest priority actions as simple string directives.
    """
    return [rec.title for rec in ranked_recs[:max_actions]]
