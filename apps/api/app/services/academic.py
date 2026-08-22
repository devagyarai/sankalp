
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.academic import AcademicSnapshot
from app.models.user import User
from app.schemas.academic import AcademicAssessmentRequest, AcademicInsight, AcademicOverview, AcademicRisk


def get_academic_overview(db: Session, user: User) -> AcademicOverview:
    snapshot = db.scalar(
        select(AcademicSnapshot)
        .where(AcademicSnapshot.user_id == user.id)
        .order_by(AcademicSnapshot.created_at.desc())
    )
    
    if not snapshot:
        # Default deterministic state if no assessments submitted
        return AcademicOverview(
            gpa=0.0,
            attendance_rate=0.0,
            risk_profile=AcademicRisk(
                risk_level="unknown",
                score=0,
                confidence=0.0,
                factors=[],
                recommendations=["Submit an academic assessment to get insights."]
            ),
            insights=[]
        )
        
    metrics = snapshot.metrics or {}
    
    return AcademicOverview(
        gpa=metrics.get("gpa", 0.0),
        attendance_rate=metrics.get("attendance_rate", 0.0),
        risk_profile=AcademicRisk(
            risk_level=metrics.get("risk_level", "unknown"),
            score=int(snapshot.risk_score or 0),
            confidence=snapshot.confidence or 0.0,
            factors=metrics.get("factors", []),
            recommendations=metrics.get("recommendations", [])
        ),
        insights=[
            AcademicInsight(factor="Attendance", impact="Positive" if metrics.get("attendance_rate", 0) > 0.8 else "Negative")
        ]
    )


def submit_academic_assessment(db: Session, user: User, req: AcademicAssessmentRequest) -> AcademicRisk:
    # Deterministic Academic Risk Calculation
    avg_grade = sum(req.recent_grades) / len(req.recent_grades) if req.recent_grades else 0
    attendance = req.attendance_rate
    
    score = (avg_grade * 0.7) + (attendance * 100 * 0.3)
    
    if score < 50:
        risk_level = "high"
        factors = ["Low recent grades", "Poor attendance"]
        recommendations = ["Schedule tutoring sessions", "Improve attendance immediately"]
    elif score < 75:
        risk_level = "moderate"
        factors = ["Inconsistent grades"]
        recommendations = ["Review study habits", "Attend office hours"]
    else:
        risk_level = "low"
        factors = ["Strong academic performance"]
        recommendations = ["Maintain current trajectory"]
        
    metrics = {
        "gpa": avg_grade / 25, # Scale 100 to 4.0 roughly
        "attendance_rate": attendance,
        "risk_level": risk_level,
        "factors": factors,
        "recommendations": recommendations
    }
    
    snapshot = AcademicSnapshot(
        user_id=user.id,
        model_version="deterministic_v1",
        confidence=0.85,
        risk_score=score,
        metrics=metrics
    )
    
    db.add(snapshot)
    db.commit()
    db.refresh(snapshot)
    
    return AcademicRisk(
        risk_level=risk_level,
        score=int(score),
        confidence=0.85,
        factors=factors,
        recommendations=recommendations
    )
