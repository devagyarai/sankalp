import os
import sys
import uuid

# Add apps/api to sys.path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from app.core.database import SessionLocal
from app.models.academic import AcademicAssessment, AcademicCourse, AcademicResult, AcademicSnapshot
from app.models.career import CareerProfile, Skill
from app.models.safety import SafetyAssessment, SafetyRecommendation, SafetyScore
from app.models.study import StudyPlan, StudySession
from app.models.user import User


def seed():
    db = SessionLocal()
    
    # Check if user exists
    user = db.query(User).filter(User.email == "test@example.com").first()
    if not user:
        user = User(
            id=str(uuid.uuid4()),
            email="test@example.com",
            password_hash="hashed_password",
            role="student"
        )
        db.add(user)
        db.commit()
        db.refresh(user)
        print(f"Created user: {user.id}")
    else:
        print(f"User already exists: {user.id}")

    # Seed Focus (Study)
    if not db.query(StudyPlan).filter(StudyPlan.user_id == user.id).first():
        plan = StudyPlan(
            id=str(uuid.uuid4()),
            user_id=user.id,
            name="Core Subjects Study Plan",
            status="active"
        )
        db.add(plan)
        db.commit()
        
        session = StudySession(
            id=str(uuid.uuid4()),
            user_id=user.id,
            study_plan_id=plan.id,
            subject_id=str(uuid.uuid4()),  # dummy subject
            duration_minutes=60,
            completion_status="completed",
            notes="Completed calculus section"
        )
        db.add(session)
        db.commit()
        print("Seeded Focus (Study) data")
        
    # Seed Pulse (Academic)
    if not db.query(AcademicSnapshot).filter(AcademicSnapshot.user_id == user.id).first():
        snapshot = AcademicSnapshot(
            id=str(uuid.uuid4()),
            user_id=user.id,
            model_version="1.0",
            confidence=0.9,
            input_period="Spring 2026",
            risk_score=0.15,
            metrics={"attendance": 95, "participation": 88}
        )
        db.add(snapshot)
        
        course = AcademicCourse(
            id=str(uuid.uuid4()),
            user_id=user.id,
            name="Computer Science 101"
        )
        db.add(course)
        db.commit()
        
        assessment = AcademicAssessment(
            id=str(uuid.uuid4()),
            course_id=course.id,
            type="exam",
            title="Midterm"
        )
        db.add(assessment)
        db.commit()
        
        result = AcademicResult(
            id=str(uuid.uuid4()),
            assessment_id=assessment.id,
            score=92.5,
            percentage=92.5,
            grade="A"
        )
        db.add(result)
        db.commit()
        print("Seeded Pulse (Academic) data")
        
    # Seed Trajectory (Career)
    if not db.query(CareerProfile).filter(CareerProfile.user_id == user.id).first():
        profile = CareerProfile(
            id=str(uuid.uuid4()),
            user_id=user.id,
            current_role="Software Engineering Student",
            years_experience=1.5
        )
        db.add(profile)
        db.commit()
        
        skill = Skill(
            id=str(uuid.uuid4()),
            name="Python",
            category="Programming"
        )
        db.add(skill)
        db.commit()
        print("Seeded Trajectory (Career) data")
        
    # Seed Shield (Safety)
    if not db.query(SafetyAssessment).filter(SafetyAssessment.user_id == user.id).first():
        assessment = SafetyAssessment(
            id=str(uuid.uuid4()),
            user_id=user.id,
            status="completed"
        )
        db.add(assessment)
        db.commit()
        
        score = SafetyScore(
            id=str(uuid.uuid4()),
            assessment_id=assessment.id,
            overall_score=95.0,
            password_security=90.0,
            account_security=100.0,
            device_security=95.0,
            browsing_safety=95.0,
            scoring_version="v1"
        )
        db.add(score)
        
        rec = SafetyRecommendation(
            id=str(uuid.uuid4()),
            assessment_id=assessment.id,
            category="Password",
            action_item="Enable 2FA on all accounts",
            priority="high",
            status="pending"
        )
        db.add(rec)
        db.commit()
        print("Seeded Shield (Safety) data")

    print("Seeding complete!")

if __name__ == "__main__":
    seed()
