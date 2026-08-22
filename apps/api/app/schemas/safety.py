from pydantic import BaseModel


class SafetyFinding(BaseModel):
    id: str
    severity: str
    description: str

class SafetyRecommendation(BaseModel):
    id: str
    action: str
    priority: str

class SafetyCategory(BaseModel):
    name: str
    score: int
    findings: list[SafetyFinding]

class SafetyScore(BaseModel):
    overall_score: int
    categories: list[SafetyCategory]

class SafetyAssessmentRequest(BaseModel):
    answers: dict[str, str]

class SafetyAssessmentResponse(BaseModel):
    score: SafetyScore
    recommendations: list[SafetyRecommendation]
