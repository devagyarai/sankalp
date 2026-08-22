from sqlalchemy import Column, Float, ForeignKey, Integer, String
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship

from app.models.base import Base, TimestampMixin, generate_uuid


class CareerProfile(Base, TimestampMixin):
    __tablename__ = "career_profiles"

    id = Column(UUID(as_uuid=False), primary_key=True, default=generate_uuid)
    user_id = Column(UUID(as_uuid=False), ForeignKey("users.id", ondelete="CASCADE"), unique=True, index=True, nullable=False)
    current_role = Column(String(255), nullable=True)
    years_experience = Column(Float, nullable=True)

class Skill(Base, TimestampMixin):
    __tablename__ = "skills"

    id = Column(UUID(as_uuid=False), primary_key=True, default=generate_uuid)
    name = Column(String(255), unique=True, index=True, nullable=False)
    category = Column(String(255), nullable=True)

class UserSkill(Base, TimestampMixin):
    __tablename__ = "user_skills"

    id = Column(UUID(as_uuid=False), primary_key=True, default=generate_uuid)
    user_id = Column(UUID(as_uuid=False), ForeignKey("users.id", ondelete="CASCADE"), index=True, nullable=False)
    skill_id = Column(UUID(as_uuid=False), ForeignKey("skills.id", ondelete="CASCADE"), index=True, nullable=False)
    proficiency_level = Column(Integer, nullable=False, default=1)
    evidence = Column(String(1000), nullable=True)

    skill = relationship("Skill")

class TargetRole(Base, TimestampMixin):
    __tablename__ = "target_roles"

    id = Column(UUID(as_uuid=False), primary_key=True, default=generate_uuid)
    title = Column(String(255), nullable=False)
    industry = Column(String(255), nullable=True)

class RoleSkillRequirement(Base, TimestampMixin):
    __tablename__ = "role_skill_requirements"

    id = Column(UUID(as_uuid=False), primary_key=True, default=generate_uuid)
    role_id = Column(UUID(as_uuid=False), ForeignKey("target_roles.id", ondelete="CASCADE"), index=True, nullable=False)
    skill_id = Column(UUID(as_uuid=False), ForeignKey("skills.id", ondelete="CASCADE"), index=True, nullable=False)
    required_proficiency = Column(Integer, nullable=False, default=1)
    weight = Column(Float, nullable=True)

class CareerRoadmap(Base, TimestampMixin):
    __tablename__ = "career_roadmaps"

    id = Column(UUID(as_uuid=False), primary_key=True, default=generate_uuid)
    user_id = Column(UUID(as_uuid=False), ForeignKey("users.id", ondelete="CASCADE"), index=True, nullable=False)
    target_role_id = Column(UUID(as_uuid=False), ForeignKey("target_roles.id", ondelete="CASCADE"), nullable=False)
    title = Column(String(255), nullable=False)

    items = relationship("RoadmapItem", back_populates="roadmap", cascade="all, delete")

class RoadmapItem(Base, TimestampMixin):
    __tablename__ = "roadmap_items"

    id = Column(UUID(as_uuid=False), primary_key=True, default=generate_uuid)
    roadmap_id = Column(UUID(as_uuid=False), ForeignKey("career_roadmaps.id", ondelete="CASCADE"), index=True, nullable=False)
    title = Column(String(255), nullable=False)
    description = Column(String(1000), nullable=True)
    status = Column(String(50), nullable=False, default="pending")

    roadmap = relationship("CareerRoadmap", back_populates="items")
