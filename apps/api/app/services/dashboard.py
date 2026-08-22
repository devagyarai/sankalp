from sqlalchemy.orm import Session

from app.models.user import User
from app.schemas.dashboard import DashboardOverviewResponse, DashboardSummary, Insight, ModuleStatus
from app.services.academic import get_academic_overview
from app.services.career import get_career_profile
from app.services.study import get_study_performance


def get_dashboard_overview(db: Session, user: User) -> DashboardOverviewResponse:
    # 1. Fetch real aggregations from other domains
    study_perf = get_study_performance(db, user)
    academic_overview = get_academic_overview(db, user)
    career_profile = get_career_profile(db, user)
    
    # 2. Derive Dashboard Summary
    total_study_hours = study_perf.total_minutes // 60 if study_perf.total_minutes else 0
    academic_risk = academic_overview.risk_profile.risk_level
    
    # Count skills user has that are > 0 proficiency
    active_skills = len([s for s in career_profile.current_skills if s.proficiency > 0])
    
    # 3. Construct Insights dynamically
    insights = []
    
    if academic_risk == "high":
        insights.append(Insight(
            id="ins-acad-risk",
            title="Academic Alert",
            description="Your academic risk is high. Please check your EduPulse recommendations.",
            action_url="/academic"
        ))
        
    if study_perf.total_sessions == 0:
        insights.append(Insight(
            id="ins-study-0",
            title="Start Studying",
            description="You haven't logged any study sessions yet. Start tracking to build focus.",
            action_url="/study"
        ))
    else:
        insights.append(Insight(
            id="ins-study-streak",
            title="Keep it up!",
            description=f"You have logged {study_perf.total_sessions} study sessions.",
            action_url="/study"
        ))
        
    if career_profile.gaps:
        insights.append(Insight(
            id="ins-career-gap",
            title="Skill Gaps Detected",
            description=f"You have {len(career_profile.gaps)} skill gaps for your target role.",
            action_url="/career"
        ))

    return DashboardOverviewResponse(
        greeting=f"Welcome back, {user.profile.display_name if user.profile else 'Student'}",
        summary=DashboardSummary(
            total_study_hours=total_study_hours,
            overall_academic_risk=academic_risk,
            active_skills_building=active_skills
        ),
        insights=insights,
        modules=[
            ModuleStatus(name="EduPulse", status="active" if academic_risk == "low" else "needs_attention"),
            ModuleStatus(name="StudySync", status="active" if study_perf.total_sessions > 0 else "inactive"),
            ModuleStatus(name="SkillMap", status="active" if active_skills > 0 else "inactive")
        ]
    )
