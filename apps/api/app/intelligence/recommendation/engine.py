from sqlalchemy import delete, select
from sqlalchemy.orm import Session

from app.intelligence.common.models import IntelligenceRecommendation
from app.models.recommendation import Recommendation
from app.models.user import User


def sync_recommendations(db: Session, user: User, domain: str, recs: list[IntelligenceRecommendation]):
    """
    Syncs the latest intelligence recommendations to the database.
    This replaces the existing pending recommendations for this domain.
    """
    # Remove existing pending recommendations for this domain
    db.execute(
        delete(Recommendation)
        .where(Recommendation.user_id == user.id, Recommendation.domain == domain, Recommendation.status == "pending")
    )
    
    # Insert new ones
    for rec in recs:
        db_rec = Recommendation(
            user_id=user.id,
            domain=rec.domain,
            title=rec.title,
            description=rec.reason,
            priority=rec.priority,
            status="pending",
            source_type="intelligence_engine",
            source_reference=rec.action_url
        )
        db.add(db_rec)
        
    db.commit()


def get_active_recommendations(db: Session, user: User) -> list[Recommendation]:
    """Retrieve all active recommendations for a user across all domains."""
    return db.scalars(
        select(Recommendation)
        .where(Recommendation.user_id == user.id, Recommendation.status == "pending")
        .order_by(Recommendation.created_at.desc())
    ).all()
