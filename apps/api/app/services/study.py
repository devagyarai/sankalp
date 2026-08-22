from datetime import UTC, datetime

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.study import StudyGoal, StudyPlan, StudySession, StudySubject
from app.models.user import User
from app.schemas.study import StudyGoal as StudyGoalSchema
from app.schemas.study import StudyPerformance
from app.schemas.study import StudyPlan as StudyPlanSchema


def map_study_plan(plan: StudyPlan) -> StudyPlanSchema:
    goals = []
    for goal in plan.goals:
        goals.append(
            StudyGoalSchema(
                id=str(goal.id),
                title=goal.subject.name if goal.subject else "Unknown",
                target_hours=goal.target_minutes // 60,
                completed_hours=goal.completed_minutes // 60,
            )
        )
    return StudyPlanSchema(
        id=str(plan.id),
        title=plan.name,
        goals=goals,
    )


def get_study_plan(db: Session, user: User) -> StudyPlanSchema | None:
    plan = db.scalar(
        select(StudyPlan)
        .where(StudyPlan.user_id == user.id, StudyPlan.status == "active")
        .order_by(StudyPlan.created_at.desc())
    )
    if not plan:
        return None
    return map_study_plan(plan)


def create_study_plan(db: Session, user: User) -> StudyPlanSchema:
    # Deterministic default plan generation
    
    # 1. Create subjects if they don't exist
    subject1 = db.scalar(select(StudySubject).where(StudySubject.user_id == user.id, StudySubject.name == "Data Structures"))
    if not subject1:
        subject1 = StudySubject(user_id=user.id, name="Data Structures", difficulty="Hard", target_score=90)
        db.add(subject1)
        
    subject2 = db.scalar(select(StudySubject).where(StudySubject.user_id == user.id, StudySubject.name == "Algorithms"))
    if not subject2:
        subject2 = StudySubject(user_id=user.id, name="Algorithms", difficulty="Hard", target_score=90)
        db.add(subject2)
        
    db.flush()

    # 2. Create the plan
    plan = StudyPlan(
        user_id=user.id,
        name="Midterm Prep",
        start_date=datetime.now(UTC),
        status="active"
    )
    db.add(plan)
    db.flush()

    # 3. Create goals
    goal1 = StudyGoal(
        study_plan_id=plan.id,
        subject_id=subject1.id,
        target_minutes=10 * 60, # 10 hours
        completed_minutes=0
    )
    goal2 = StudyGoal(
        study_plan_id=plan.id,
        subject_id=subject2.id,
        target_minutes=15 * 60, # 15 hours
        completed_minutes=0
    )
    
    db.add(goal1)
    db.add(goal2)
    db.commit()
    
    db.refresh(plan)
    return map_study_plan(plan)


def get_study_performance(db: Session, user: User) -> StudyPerformance:
    # Deterministic calculation from DB
    sessions = db.scalars(
        select(StudySession).where(StudySession.user_id == user.id)
    ).all()
    
    total_sessions = len(sessions)
    total_minutes = sum(s.duration_minutes or 0 for s in sessions)
    
    # Deterministic fallback logic
    if total_sessions == 0:
        return StudyPerformance(
            average_focus=0,
            total_sessions=0,
            total_minutes=0
        )
        
    # In a real intelligence engine, focus_score would be calculated from real telemetry.
    # For now, deterministic 85.
    return StudyPerformance(
        average_focus=85,
        total_sessions=total_sessions,
        total_minutes=total_minutes
    )
