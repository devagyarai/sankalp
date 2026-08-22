from app.schemas.safety import (
    SafetyAssessmentRequest,
    SafetyAssessmentResponse,
    SafetyCategory,
    SafetyFinding,
    SafetyRecommendation,
    SafetyScore,
)


def mock_safety_assessment(req: SafetyAssessmentRequest) -> SafetyAssessmentResponse:
    return SafetyAssessmentResponse(
        score=SafetyScore(
            overall_score=85,
            categories=[
                SafetyCategory(
                    name="password",
                    score=90,
                    findings=[SafetyFinding(id="f-1", severity="low", description="No recent password changes")]
                )
            ]
        ),
        recommendations=[
            SafetyRecommendation(id="r-1", action="Enable 2FA on primary email", priority="high")
        ]
    )
