from sqlalchemy import select
from sqlalchemy.orm import Session

from app.intelligence.common.models import IntelligenceMetric, IntelligenceOutput, IntelligenceRecommendation
from app.intelligence.common.scoring import assess_data_quality, calculate_confidence, normalize_score
from app.models.safety import SafetyAnswer, SafetyAssessment
from app.models.user import User


def calculate_safety_score(db: Session, user: User) -> IntelligenceOutput:
    assessment = db.scalar(
        select(SafetyAssessment)
        .where(SafetyAssessment.user_id == user.id)
        .order_by(SafetyAssessment.created_at.desc())
    )
    
    if not assessment:
         return IntelligenceOutput(
            score=0,
            metrics=[],
            issues=["No safety assessment completed."],
            recommendations=[],
            explanation=["Please complete the safety assessment to generate a score."],
            data_quality="insufficient"
        )
        
    answers = db.scalars(
        select(SafetyAnswer)
        .where(SafetyAnswer.assessment_id == assessment.id)
    ).all()
    
    if not answers:
        return IntelligenceOutput(
            score=0,
            metrics=[],
            issues=["Assessment has no answers."],
            recommendations=[],
            explanation=["The assessment is empty. Score cannot be calculated."],
            data_quality="insufficient"
        )

    # Calculate category scores based on normalized_value
    category_totals = {}
    category_counts = {}
    
    for ans in answers:
        cat = ans.category
        val = ans.normalized_value or 0.0
        
        category_totals[cat] = category_totals.get(cat, 0.0) + val
        category_counts[cat] = category_counts.get(cat, 0) + 1
        
    category_scores = {}
    metrics = []
    weakest_categories = []
    
    for cat, total in category_totals.items():
        avg = total / category_counts[cat]
        score = normalize_score(avg, 0.0, 1.0)
        category_scores[cat] = score
        
        metrics.append(IntelligenceMetric(name=f"{cat.capitalize()} Score", value=score, description=f"Safety score for {cat}"))
        
        if score < 50:
            weakest_categories.append((cat, score))
            
    # Overall score
    if category_scores:
        overall_score = sum(category_scores.values()) // len(category_scores)
    else:
        overall_score = 0
        
    # Risk Tier
    if overall_score >= 80:
        risk_tier = "LOW"
    elif overall_score >= 50:
        risk_tier = "MODERATE"
    else:
        risk_tier = "HIGH"
        
    issues = []
    explanation = []
    recommendations = []
    
    explanation.append(f"Based on {len(answers)} responses across {len(category_scores)} categories, your risk tier is {risk_tier}.")
    
    if weakest_categories:
        weakest_categories.sort(key=lambda x: x[1])
        top_weak = weakest_categories[0]
        
        issues.append(f"Vulnerability identified in {top_weak[0]}")
        explanation.append(f"Your weakest safety dimension is {top_weak[0]} (score: {top_weak[1]}).")
        
        recommendations.append(
            IntelligenceRecommendation(
                domain="safety",
                priority="high",
                title=f"Improve {top_weak[0].capitalize()} hygiene",
                reason=f"Score of {top_weak[1]} indicates high risk.",
                evidence=["Review your answers for this section to identify specific failing practices."],
                action_url="/safety/review"
            )
        )
    elif overall_score < 100:
        explanation.append("You have good general safety, but minor improvements can still be made.")
        
    confidence = calculate_confidence(len(answers), 5, 15)
    
    return IntelligenceOutput(
        score=overall_score,
        metrics=metrics,
        issues=issues,
        recommendations=recommendations,
        explanation=explanation,
        data_quality=assess_data_quality(confidence),
        raw_data={"risk_tier": risk_tier}
    )
