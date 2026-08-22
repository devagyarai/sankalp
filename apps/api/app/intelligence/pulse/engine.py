from sqlalchemy import select
from sqlalchemy.orm import Session

from app.intelligence.common.models import IntelligenceMetric, IntelligenceOutput, IntelligenceRecommendation
from app.intelligence.common.scoring import assess_data_quality, calculate_confidence, normalize_score
from app.models.academic import AcademicAssessment, AcademicCourse, AcademicResult
from app.models.user import User

# Thresholds
LOW_MAX = 24
MODERATE_MAX = 49
HIGH_MAX = 74
# CRITICAL is 75+


def evaluate_academic_risk(db: Session, user: User) -> IntelligenceOutput:
    # Fetch recent results (up to 10)
    # Note: AcademicResult is linked to AcademicAssessment, which is linked to AcademicCourse, which is linked to User.
    results = db.scalars(
        select(AcademicResult)
        .join(AcademicResult.assessment)
        .join(AcademicAssessment.course)
        .where(AcademicCourse.user_id == user.id)
        .order_by(AcademicResult.created_at.desc())
        .limit(10)
    ).all()
    
    if not results:
        return IntelligenceOutput(
            score=0,
            metrics=[],
            issues=["No academic results found."],
            recommendations=[],
            explanation=["Insufficient data to calculate academic risk."],
            data_quality="insufficient"
        )
        
    # Reverse to chronological order
    results_chrono = list(reversed(results))
    
    total_percentage = 0.0
    valid_results = 0
    
    for r in results_chrono:
        if r.percentage is not None:
            total_percentage += r.percentage
            valid_results += 1
            
    if valid_results == 0:
        return IntelligenceOutput(
            score=0,
            metrics=[],
            issues=["Academic results lack percentage data."],
            recommendations=[],
            explanation=["Scores must be numeric (percentage) to calculate risk."],
            data_quality="insufficient"
        )
        
    avg_performance = total_percentage / valid_results
    
    # Calculate trend (difference between average of first half and second half)
    trend = 0.0
    if valid_results >= 2:
        mid = valid_results // 2
        first_half = sum(r.percentage for r in results_chrono[:mid] if r.percentage is not None) / mid
        second_half = sum(r.percentage for r in results_chrono[mid:] if r.percentage is not None) / (valid_results - mid)
        trend = second_half - first_half # Negative means performance is dropping
        
    # Risk calculation
    # High performance -> low risk. E.g. avg 90% -> base risk 10
    base_risk = 100 - avg_performance
    
    # Apply trend penalty/bonus (up to 20 points)
    # e.g., trend is -10 (dropped 10%), risk increases by 10
    trend_penalty = -trend
    
    raw_risk = base_risk + trend_penalty
    risk_score = normalize_score(raw_risk, 0, 100)
    
    # Classify Risk
    if risk_score <= LOW_MAX:
        risk_level = "LOW"
    elif risk_score <= MODERATE_MAX:
        risk_level = "MODERATE"
    elif risk_score <= HIGH_MAX:
        risk_level = "HIGH"
    else:
        risk_level = "CRITICAL"
        
    issues = []
    explanation = []
    recommendations = []
    
    explanation.append(f"Risk is evaluated based on your {valid_results} most recent assessments.")
    explanation.append(f"Your average performance is {avg_performance:.1f}%.")
    
    if trend < -5:
        issues.append(f"Declining performance trend detected ({trend:+.1f}%).")
        explanation.append("Your recent assessments are significantly lower than your earlier ones.")
    elif trend > 5:
        explanation.append(f"You have a positive performance trend ({trend:+.1f}%). Keep it up!")
        
    if risk_score > HIGH_MAX:
        issues.append("CRITICAL Academic Risk")
        explanation.append("Your performance indicates an immediate risk of failing.")
        recommendations.append(
            IntelligenceRecommendation(
                domain="academic",
                priority="high",
                title="Immediate Intervention Required",
                reason="Your risk score has entered the critical tier.",
                evidence=[f"Average performance is {avg_performance:.1f}%", f"Trend is {trend:+.1f}%"],
                action_url="/academic/support"
            )
        )
    elif risk_score > MODERATE_MAX:
        issues.append("HIGH Academic Risk")
        explanation.append("Your performance is borderline; please review your study habits.")
        
    metrics = [
        IntelligenceMetric(name="Recent Average", value=f"{avg_performance:.1f}%", description="Average of recent assessments"),
        IntelligenceMetric(name="Performance Trend", value=f"{trend:+.1f}%", description="Change in recent performance"),
    ]
    
    confidence = calculate_confidence(valid_results, 1, 5)
    
    return IntelligenceOutput(
        score=risk_score,
        metrics=metrics,
        issues=issues,
        recommendations=recommendations,
        explanation=explanation,
        data_quality=assess_data_quality(confidence),
        raw_data={"risk_level": risk_level, "trend": trend}
    )
