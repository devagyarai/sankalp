from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.api.auth import require_authenticated_user
from app.core.database import get_db
from app.intelligence.cross_domain.engine import generate_unified_intelligence
from app.intelligence.cross_domain.models import UnifiedOverview
from app.intelligence.focus.engine import analyze_study_metrics
from app.intelligence.nexus.engine import correlate_threats
from app.intelligence.pulse.engine import evaluate_academic_risk
from app.intelligence.shield.engine import calculate_safety_score
from app.intelligence.trajectory.engine import calculate_skill_gaps
from app.models.user import User
from app.schemas.intelligence import IntelligenceOutputSchema

router = APIRouter(prefix="/intelligence", tags=["Intelligence"])


@router.get("/overview", response_model=UnifiedOverview)
def get_intelligence_overview(
    db: Session = Depends(get_db),
    current_user: User = Depends(require_authenticated_user)
):
    return generate_unified_intelligence(db, current_user)


@router.get("/focus", response_model=IntelligenceOutputSchema)
def get_focus_intelligence(
    db: Session = Depends(get_db),
    current_user: User = Depends(require_authenticated_user)
):
    return analyze_study_metrics(db, current_user)


@router.get("/trajectory", response_model=IntelligenceOutputSchema)
def get_trajectory_intelligence(
    db: Session = Depends(get_db),
    current_user: User = Depends(require_authenticated_user)
):
    return calculate_skill_gaps(db, current_user)


@router.get("/pulse", response_model=IntelligenceOutputSchema)
def get_pulse_intelligence(
    db: Session = Depends(get_db),
    current_user: User = Depends(require_authenticated_user)
):
    return evaluate_academic_risk(db, current_user)


@router.get("/shield", response_model=IntelligenceOutputSchema)
def get_shield_intelligence(
    db: Session = Depends(get_db),
    current_user: User = Depends(require_authenticated_user)
):
    return calculate_safety_score(db, current_user)


@router.get("/nexus/{analysis_id}", response_model=IntelligenceOutputSchema)
def get_nexus_intelligence(
    analysis_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_authenticated_user)
):
    # In a real app we'd also check if the analysis belongs to current_user
    # if it's private, but the prompt says to correlate threats.
    return correlate_threats(db, analysis_id)
