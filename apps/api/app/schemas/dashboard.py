from pydantic import BaseModel


class DashboardSummary(BaseModel):
    total_study_hours: int
    overall_academic_risk: str
    active_skills_building: int

class Insight(BaseModel):
    id: str
    title: str
    description: str
    action_url: str | None = None

class ModuleStatus(BaseModel):
    name: str
    status: str
    last_active: str | None = None

class DashboardOverviewResponse(BaseModel):
    greeting: str
    summary: DashboardSummary
    insights: list[Insight]
    modules: list[ModuleStatus]
