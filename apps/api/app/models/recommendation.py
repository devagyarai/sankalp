from sqlalchemy import Column, DateTime, ForeignKey, String
from sqlalchemy import Uuid as UUID
from sqlalchemy.orm import relationship

from app.models.base import Base, TimestampMixin, generate_uuid


class Recommendation(Base, TimestampMixin):
    __tablename__ = "recommendations"

    id = Column(UUID(as_uuid=False), primary_key=True, default=generate_uuid)
    user_id = Column(UUID(as_uuid=False), ForeignKey("users.id", ondelete="CASCADE"), index=True, nullable=False)
    domain = Column(String(50), nullable=False) # study, academic, career, safety, threat
    title = Column(String(255), nullable=False)
    description = Column(String(1000), nullable=True)
    priority = Column(String(50), nullable=True)
    status = Column(String(50), nullable=False, default="pending")
    source_type = Column(String(100), nullable=True)
    source_reference = Column(String(255), nullable=True)
    expires_at = Column(DateTime(timezone=True), nullable=True)

    user = relationship("User")
