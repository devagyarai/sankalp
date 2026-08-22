from pydantic import BaseModel


class StudyGoal(BaseModel):
    id: str
    title: str
    target_hours: int
    completed_hours: int

class StudyPlan(BaseModel):
    id: str
    title: str
    goals: list[StudyGoal]

class StudySession(BaseModel):
    id: str
    plan_id: str
    duration_minutes: int
    focus_score: int

class StudyPerformance(BaseModel):
    average_focus: int
    total_sessions: int
    total_minutes: int

class StudyInsight(BaseModel):
    id: str
    message: str
    confidence: float
