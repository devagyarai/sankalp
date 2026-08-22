from app.schemas.academic import AcademicAssessmentRequest, AcademicInsight, AcademicOverview, AcademicRisk


def get_mock_academic_overview() -> AcademicOverview:
    return AcademicOverview(
        gpa=3.8,
        attendance_rate=0.92,
        risk_profile=AcademicRisk(
            risk_level="low",
            score=91,
            confidence=0.87,
            factors=["Consistent attendance", "High quiz scores"],
            recommendations=["Maintain current study habits"]
        ),
        insights=[
            AcademicInsight(factor="Attendance", impact="Positive")
        ]
    )

def mock_academic_assessment(req: AcademicAssessmentRequest) -> AcademicRisk:
    return AcademicRisk(
        risk_level="low",
        score=95,
        confidence=0.90,
        factors=["Strong recent grades"],
        recommendations=["Continue current trajectory"]
    )
