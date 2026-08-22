from sqlalchemy.orm import Session

from app.models.safety import SafetyAnswer, SafetyAssessment
from app.models.safety import SafetyRecommendation as SafetyRecModel
from app.models.safety import SafetyScore as SafetyScoreModel
from app.models.user import User
from app.schemas.safety import (
    SafetyAssessmentRequest,
    SafetyAssessmentResponse,
    SafetyCategory,
    SafetyFinding,
    SafetyRecommendation,
    SafetyScore,
)


def submit_safety_assessment(db: Session, user: User, req: SafetyAssessmentRequest) -> SafetyAssessmentResponse:
    assessment = SafetyAssessment(user_id=user.id, status="completed")
    db.add(assessment)
    db.flush()

    for key, value in req.answers.items():
        ans = SafetyAnswer(
            assessment_id=assessment.id,
            question_key=key,
            normalized_value=value
        )
        db.add(ans)

    # Deterministic scoring
    password_score = 90.0 if req.answers.get("password_reused") == "no" else 40.0
    account_score = 100.0 if req.answers.get("2fa_enabled") == "yes" else 50.0
    device_score = 80.0
    browsing_score = 85.0
    
    overall = (password_score + account_score + device_score + browsing_score) / 4.0

    score_model = SafetyScoreModel(
        assessment_id=assessment.id,
        overall_score=overall,
        password_security=password_score,
        account_security=account_score,
        device_security=device_score,
        browsing_safety=browsing_score,
        scoring_version="1.0"
    )
    db.add(score_model)
    
    # Recommendations
    recs_model = []
    if account_score < 100:
        r = SafetyRecModel(assessment_id=assessment.id, category="account", action_item="Enable 2FA on primary email", priority="high")
        db.add(r)
        recs_model.append(r)
        
    if password_score < 80:
        r = SafetyRecModel(assessment_id=assessment.id, category="password", action_item="Use a password manager", priority="high")
        db.add(r)
        recs_model.append(r)
        
    db.commit()
    db.refresh(assessment)
    db.refresh(score_model)
    for r in recs_model:
        db.refresh(r)

    categories = []
    categories.append(
        SafetyCategory(
            name="password",
            score=int(score_model.password_security),
            findings=[SafetyFinding(id="f-pass", severity="high" if score_model.password_security < 80 else "low", description="Password hygiene")]
        )
    )
    categories.append(
        SafetyCategory(
            name="account",
            score=int(score_model.account_security),
            findings=[SafetyFinding(id="f-acc", severity="high" if score_model.account_security < 100 else "low", description="Account protection level")]
        )
    )

    return SafetyAssessmentResponse(
        score=SafetyScore(
            overall_score=int(score_model.overall_score),
            categories=categories
        ),
        recommendations=[
            SafetyRecommendation(id=str(r.id), action=r.action_item, priority=r.priority) for r in recs_model
        ]
    )
