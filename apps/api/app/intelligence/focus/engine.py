
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.intelligence.common.models import IntelligenceMetric, IntelligenceOutput, IntelligenceRecommendation
from app.intelligence.common.scoring import assess_data_quality, calculate_confidence, normalize_score
from app.models.study import StudyPlan, StudySession
from app.models.user import User


def analyze_study_metrics(db: Session, user: User) -> IntelligenceOutput:
    # Fetch active plan
    plan = db.scalar(
        select(StudyPlan)
        .where(StudyPlan.user_id == user.id, StudyPlan.status == "active")
        .order_by(StudyPlan.created_at.desc())
    )
    
    # Fetch sessions
    sessions = db.scalars(
        select(StudySession)
        .where(StudySession.user_id == user.id)
        .order_by(StudySession.started_at.desc())
    ).all()
    
    if not plan:
        return IntelligenceOutput(
            score=0,
            metrics=[],
            issues=["No active study plan found."],
            recommendations=[],
            explanation=["Intelligence calculation requires an active study plan."],
            data_quality="insufficient"
        )
        
    goals = plan.goals
    
    if not goals:
        return IntelligenceOutput(
            score=0,
            metrics=[],
            issues=["Study plan has no goals."],
            recommendations=[],
            explanation=["Goals must be set to measure balance and consistency."],
            data_quality="insufficient"
        )

    # 1. Analyze Goals & Workload Imbalance
    total_target_minutes = sum(g.target_minutes or 0 for g in goals)
    total_completed_minutes = sum(g.completed_minutes or 0 for g in goals)
    
    issues = []
    explanation = []
    recommendations = []
    
    subject_completion_rates = []
    under_studied = []
    over_allocated = []
    
    for goal in goals:
        target = goal.target_minutes or 1
        completed = goal.completed_minutes or 0
        rate = completed / target
        
        subject_name = goal.subject.name if goal.subject else "Unknown Subject"
        subject_completion_rates.append((subject_name, rate))
        
        if rate < 0.2 and target > 60: # Less than 20% complete and target is > 1 hour
            under_studied.append(subject_name)
        elif rate > 1.2: # Over 120% complete
            over_allocated.append(subject_name)
            
    # Calculate balance score (variance in completion rates)
    rates = [r[1] for r in subject_completion_rates]
    avg_rate = sum(rates) / len(rates) if rates else 0
    variance = sum((r - avg_rate)**2 for r in rates) / len(rates) if rates else 0
    balance_score = normalize_score(1.0 - variance, 0.0, 1.0)
    
    # 2. Calculate Productivity / Consistency
    # Normally we'd look at session distribution over days, but for now we look at volume
    total_sessions = len(sessions)
    consistency_score = normalize_score(total_sessions, 0, 10) # Max consistency if >= 10 sessions recorded
    
    overall_completion_rate = total_completed_minutes / total_target_minutes if total_target_minutes > 0 else 0
    completion_score = normalize_score(overall_completion_rate, 0.0, 1.0)
    
    # 3. Overall Score
    overall_score = int((balance_score * 0.3) + (consistency_score * 0.3) + (completion_score * 0.4))
    
    # 4. Generate Explainability
    explanation.append(f"Overall completion is {overall_completion_rate*100:.1f}%.")
    
    if balance_score < 50:
        issues.append("High workload imbalance detected across subjects.")
        explanation.append("You are dedicating disproportionate time to some subjects while neglecting others.")
        
    if under_studied:
        issues.append(f"Under-studied subjects: {', '.join(under_studied)}")
        explanation.append(f"Subjects like {under_studied[0]} are lagging behind schedule.")
        recommendations.append(
            IntelligenceRecommendation(
                domain="study",
                priority="high",
                title=f"Focus on {under_studied[0]}",
                reason="This subject is significantly behind its target allocation.",
                evidence=["Completion rate is below 20%."],
                action_url="/study"
            )
        )
        
    if over_allocated:
        explanation.append(f"You have exceeded target allocation for {', '.join(over_allocated)}.")
        
    metrics = [
        IntelligenceMetric(name="Balance Score", value=balance_score, description="Workload distribution balance"),
        IntelligenceMetric(name="Consistency Score", value=consistency_score, description="Study session frequency"),
        IntelligenceMetric(name="Completion Rate", value=completion_score, description="Overall goal completion")
    ]
    
    confidence = calculate_confidence(total_sessions, 2, 10)
    
    return IntelligenceOutput(
        score=overall_score,
        metrics=metrics,
        issues=issues,
        recommendations=recommendations,
        explanation=explanation,
        data_quality=assess_data_quality(confidence),
        raw_data={"total_sessions": total_sessions, "variance": variance}
    )
