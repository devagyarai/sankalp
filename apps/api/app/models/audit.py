from sqlalchemy import Column, ForeignKey, String
from sqlalchemy import JSON as JSONB, Uuid as UUID

from app.models.base import Base, TimestampMixin, generate_uuid


class AuditEvent(Base, TimestampMixin):
    __tablename__ = "audit_events"

    id = Column(UUID(as_uuid=False), primary_key=True, default=generate_uuid)
    user_id = Column(UUID(as_uuid=False), ForeignKey("users.id", ondelete="SET NULL"), index=True, nullable=True)
    event_type = Column(String(100), nullable=False, index=True)
    entity_type = Column(String(100), nullable=True)
    entity_id = Column(UUID(as_uuid=False), nullable=True)
    metadata_json = Column(JSONB, nullable=True)
    request_id = Column(String(255), nullable=True)

    # Privacy constraint: metadata_json must NOT contain passwords, API keys, or raw threat input.
