from sqlalchemy import Column, DateTime, ForeignKey, Integer, String
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship

from app.models.base import Base, TimestampMixin, generate_uuid


class StudySubject(Base, TimestampMixin):
    __tablename__ = "study_subjects"

    id = Column(UUID(as_uuid=False), primary_key=True, default=generate_uuid)
    user_id = Column(UUID(as_uuid=False), ForeignKey("users.id", ondelete="CASCADE"), index=True, nullable=False)
    name = Column(String(255), nullable=False)
    code = Column(String(50), nullable=True)
    difficulty = Column(String(50), nullable=True)
    target_score = Column(Integer, nullable=True)

class StudyPlan(Base, TimestampMixin):
    __tablename__ = "study_plans"

    id = Column(UUID(as_uuid=False), primary_key=True, default=generate_uuid)
    user_id = Column(UUID(as_uuid=False), ForeignKey("users.id", ondelete="CASCADE"), index=True, nullable=False)
    name = Column(String(255), nullable=False)
    start_date = Column(DateTime(timezone=True), nullable=True)
    end_date = Column(DateTime(timezone=True), nullable=True)
    status = Column(String(50), default="active", nullable=False)

    goals = relationship("StudyGoal", back_populates="plan", cascade="all, delete")

class StudyGoal(Base, TimestampMixin):
    __tablename__ = "study_goals"

    id = Column(UUID(as_uuid=False), primary_key=True, default=generate_uuid)
    study_plan_id = Column(UUID(as_uuid=False), ForeignKey("study_plans.id", ondelete="CASCADE"), index=True, nullable=False)
    subject_id = Column(UUID(as_uuid=False), ForeignKey("study_subjects.id", ondelete="CASCADE"), index=True, nullable=False)
    target_minutes = Column(Integer, nullable=False, default=0)
    completed_minutes = Column(Integer, nullable=False, default=0)
    priority = Column(String(50), nullable=True)
    status = Column(String(50), default="pending", nullable=False)

    plan = relationship("StudyPlan", back_populates="goals")
    subject = relationship("StudySubject")

class StudySession(Base, TimestampMixin):
    __tablename__ = "study_sessions"

    id = Column(UUID(as_uuid=False), primary_key=True, default=generate_uuid)
    user_id = Column(UUID(as_uuid=False), ForeignKey("users.id", ondelete="CASCADE"), index=True, nullable=False)
    subject_id = Column(UUID(as_uuid=False), ForeignKey("study_subjects.id", ondelete="CASCADE"), index=True, nullable=False)
    study_plan_id = Column(UUID(as_uuid=False), ForeignKey("study_plans.id", ondelete="SET NULL"), index=True, nullable=True)
    started_at = Column(DateTime(timezone=True), nullable=False)
    ended_at = Column(DateTime(timezone=True), nullable=True)
    duration_minutes = Column(Integer, nullable=True)
    completion_status = Column(String(50), nullable=True)
    notes = Column(String(1000), nullable=True)

    subject = relationship("StudySubject")
