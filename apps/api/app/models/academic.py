from sqlalchemy import Column, Float, ForeignKey, String
from sqlalchemy import JSON as JSONB, Uuid as UUID
from sqlalchemy.orm import relationship

from app.models.base import Base, TimestampMixin, generate_uuid


class AcademicCourse(Base, TimestampMixin):
    __tablename__ = "academic_courses"

    id = Column(UUID(as_uuid=False), primary_key=True, default=generate_uuid)
    user_id = Column(UUID(as_uuid=False), ForeignKey("users.id", ondelete="CASCADE"), index=True, nullable=False)
    name = Column(String(255), nullable=False)
    code = Column(String(100), nullable=True)
    credits = Column(Float, nullable=True)
    target_grade = Column(String(50), nullable=True)

    assessments = relationship("AcademicAssessment", back_populates="course", cascade="all, delete")

class AcademicAssessment(Base, TimestampMixin):
    __tablename__ = "academic_assessments"

    id = Column(UUID(as_uuid=False), primary_key=True, default=generate_uuid)
    course_id = Column(UUID(as_uuid=False), ForeignKey("academic_courses.id", ondelete="CASCADE"), index=True, nullable=False)
    type = Column(String(100), nullable=False)
    title = Column(String(255), nullable=False)
    assessment_date = Column(String(255), nullable=True) # Could be Date type
    max_score = Column(Float, nullable=True)

    course = relationship("AcademicCourse", back_populates="assessments")
    result = relationship("AcademicResult", back_populates="assessment", uselist=False, cascade="all, delete")

class AcademicResult(Base, TimestampMixin):
    __tablename__ = "academic_results"

    id = Column(UUID(as_uuid=False), primary_key=True, default=generate_uuid)
    assessment_id = Column(UUID(as_uuid=False), ForeignKey("academic_assessments.id", ondelete="CASCADE"), unique=True, index=True, nullable=False)
    score = Column(Float, nullable=True)
    percentage = Column(Float, nullable=True)
    grade = Column(String(50), nullable=True)

    assessment = relationship("AcademicAssessment", back_populates="result")

class AcademicSnapshot(Base, TimestampMixin):
    __tablename__ = "academic_snapshots"

    id = Column(UUID(as_uuid=False), primary_key=True, default=generate_uuid)
    user_id = Column(UUID(as_uuid=False), ForeignKey("users.id", ondelete="CASCADE"), index=True, nullable=False)
    model_version = Column(String(100), nullable=True)
    confidence = Column(Float, nullable=True)
    input_period = Column(String(255), nullable=True)
    risk_score = Column(Float, nullable=True)
    metrics = Column(JSONB, nullable=True)
