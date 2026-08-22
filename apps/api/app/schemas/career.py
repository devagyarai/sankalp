from pydantic import BaseModel


class AddSkillRequest(BaseModel):
    name: str

class Skill(BaseModel):
    name: str
    proficiency: int # 0-100

class TargetRole(BaseModel):
    title: str
    required_skills: list[str]

class SkillGap(BaseModel):
    skill_name: str
    current_level: int
    required_level: int

class RoadmapItem(BaseModel):
    id: str
    title: str
    description: str
    estimated_days: int

class CareerInsight(BaseModel):
    insight_type: str
    description: str

class SkillProfile(BaseModel):
    id: str
    current_skills: list[Skill]
    target_role: TargetRole | None = None
    gaps: list[SkillGap]
