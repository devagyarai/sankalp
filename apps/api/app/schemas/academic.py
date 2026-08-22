from pydantic import BaseModel


class AcademicAssessmentRequest(BaseModel):
    student_id: str
    recent_grades: list[float]
    attendance_rate: float

class AcademicInsight(BaseModel):
    factor: str
    impact: str

class AcademicRisk(BaseModel):
    risk_level: str
    score: int
    confidence: float
    factors: list[str]
    recommendations: list[str]

class AcademicOverview(BaseModel):
    gpa: float
    attendance_rate: float
    risk_profile: AcademicRisk
    insights: list[AcademicInsight]
