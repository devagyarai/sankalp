from sqlalchemy import Column, Float, ForeignKey, String
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship

from app.models.base import Base, TimestampMixin, generate_uuid


class SafetyAssessment(Base, TimestampMixin):
    __tablename__ = "safety_assessments"

    id = Column(UUID(as_uuid=False), primary_key=True, default=generate_uuid)
    user_id = Column(UUID(as_uuid=False), ForeignKey("users.id", ondelete="CASCADE"), index=True, nullable=False)
    status = Column(String(50), nullable=False, default="completed")

    answers = relationship("SafetyAnswer", back_populates="assessment", cascade="all, delete")
    score = relationship("SafetyScore", back_populates="assessment", uselist=False, cascade="all, delete")
    recommendations = relationship("SafetyRecommendation", back_populates="assessment", cascade="all, delete")

class SafetyAnswer(Base, TimestampMixin):
    __tablename__ = "safety_answers"

    id = Column(UUID(as_uuid=False), primary_key=True, default=generate_uuid)
    assessment_id = Column(UUID(as_uuid=False), ForeignKey("safety_assessments.id", ondelete="CASCADE"), index=True, nullable=False)
    question_key = Column(String(255), nullable=False)
    normalized_value = Column(String(1000), nullable=True) # Normalized structured value rather than raw PII

    assessment = relationship("SafetyAssessment", back_populates="answers")

class SafetyScore(Base, TimestampMixin):
    __tablename__ = "safety_scores"

    id = Column(UUID(as_uuid=False), primary_key=True, default=generate_uuid)
    assessment_id = Column(UUID(as_uuid=False), ForeignKey("safety_assessments.id", ondelete="CASCADE"), unique=True, index=True, nullable=False)
    overall_score = Column(Float, nullable=True)
    password_security = Column(Float, nullable=True)
    account_security = Column(Float, nullable=True)
    device_security = Column(Float, nullable=True)
    browsing_safety = Column(Float, nullable=True)
    scoring_version = Column(String(50), nullable=True)

    assessment = relationship("SafetyAssessment", back_populates="score")

class SafetyRecommendation(Base, TimestampMixin):
    __tablename__ = "safety_recommendations"

    id = Column(UUID(as_uuid=False), primary_key=True, default=generate_uuid)
    assessment_id = Column(UUID(as_uuid=False), ForeignKey("safety_assessments.id", ondelete="CASCADE"), index=True, nullable=False)
    category = Column(String(100), nullable=True)
    action_item = Column(String(1000), nullable=False)
    priority = Column(String(50), nullable=True)
    status = Column(String(50), nullable=False, default="pending")

    assessment = relationship("SafetyAssessment", back_populates="recommendations")
