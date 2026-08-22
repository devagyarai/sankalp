from sqlalchemy import Column, Float, ForeignKey, String
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship

from app.models.base import Base, TimestampMixin, generate_uuid


class ThreatAnalysis(Base, TimestampMixin):
    __tablename__ = "threat_analyses"

    id = Column(UUID(as_uuid=False), primary_key=True, default=generate_uuid)
    user_id = Column(UUID(as_uuid=False), ForeignKey("users.id", ondelete="CASCADE"), index=True, nullable=False)
    input_type = Column(String(50), nullable=False) # SMS, URL, TEXT
    content = Column(String, nullable=False) # Untrusted raw content
    risk_score = Column(Float, nullable=True)
    classification = Column(String(100), nullable=True)

    signals = relationship("ThreatSignal", back_populates="analysis", cascade="all, delete")
    # A single analysis can result in multiple indicators via a join table if needed, or loosely linked.

class ThreatSignal(Base, TimestampMixin):
    __tablename__ = "threat_signals"

    id = Column(UUID(as_uuid=False), primary_key=True, default=generate_uuid)
    analysis_id = Column(UUID(as_uuid=False), ForeignKey("threat_analyses.id", ondelete="CASCADE"), index=True, nullable=False)
    signal_type = Column(String(100), nullable=False)
    description = Column(String(1000), nullable=True)
    confidence = Column(Float, nullable=True)

    analysis = relationship("ThreatAnalysis", back_populates="signals")

class ThreatIndicator(Base, TimestampMixin):
    __tablename__ = "threat_indicators"

    id = Column(UUID(as_uuid=False), primary_key=True, default=generate_uuid)
    indicator_type = Column(String(50), nullable=False) # phone, url, domain, email
    value = Column(String(500), unique=True, index=True, nullable=False)
    first_seen_at = Column(String(255), nullable=True)

class ThreatCampaign(Base, TimestampMixin):
    __tablename__ = "threat_campaigns"

    id = Column(UUID(as_uuid=False), primary_key=True, default=generate_uuid)
    name = Column(String(255), nullable=True)
    risk_score = Column(Float, nullable=True)
    confidence = Column(Float, nullable=True)
    status = Column(String(50), nullable=False, default="active")

class CampaignIndicator(Base, TimestampMixin):
    __tablename__ = "campaign_indicators"

    id = Column(UUID(as_uuid=False), primary_key=True, default=generate_uuid)
    campaign_id = Column(UUID(as_uuid=False), ForeignKey("threat_campaigns.id", ondelete="CASCADE"), index=True, nullable=False)
    indicator_id = Column(UUID(as_uuid=False), ForeignKey("threat_indicators.id", ondelete="CASCADE"), index=True, nullable=False)
    relationship_type = Column(String(100), nullable=True)
    confidence = Column(Float, nullable=True)

    campaign = relationship("ThreatCampaign")
    indicator = relationship("ThreatIndicator")
