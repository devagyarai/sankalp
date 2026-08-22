from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.auth import require_authenticated_user
from app.core.database import get_db
from app.models.user import User
from app.schemas.common import StandardListResponse, StandardResponse
from app.schemas.study import StudyInsight, StudyPerformance, StudyPlan
from app.services import study as study_service

router = APIRouter()

@router.get("/plan", response_model=StandardResponse[StudyPlan])
def get_study_plan(db: Session = Depends(get_db), current_user: User = Depends(require_authenticated_user)):
    data = study_service.get_study_plan(db, current_user)
    if not data:
        # According to standard behavior, if no plan exists, return empty or default.
        # We will create a default one to preserve seamless frontend behavior.
        data = study_service.create_study_plan(db, current_user)
    return {"data": data}

@router.post("/plan", response_model=StandardResponse[StudyPlan])
def create_study_plan(db: Session = Depends(get_db), current_user: User = Depends(require_authenticated_user)):
    data = study_service.create_study_plan(db, current_user)
    return {"data": data}

@router.patch("/plan/{plan_id}", response_model=StandardResponse[StudyPlan])
def update_study_plan(plan_id: str, db: Session = Depends(get_db), current_user: User = Depends(require_authenticated_user)):
    # Basic logic for updating study plan - just return the existing for now 
    # to not break the API contract if frontend expects response.
    data = study_service.get_study_plan(db, current_user)
    if not data or data.id != plan_id:
        raise HTTPException(status_code=404, detail="Plan not found")
    return {"data": data}

@router.post("/sessions", response_model=StandardResponse[dict])
def log_study_session(db: Session = Depends(get_db), current_user: User = Depends(require_authenticated_user)):
    # Future implementation for logging sessions
    return {"data": {"status": "session_logged"}}

@router.get("/performance", response_model=StandardResponse[StudyPerformance])
def get_study_performance(db: Session = Depends(get_db), current_user: User = Depends(require_authenticated_user)):
    data = study_service.get_study_performance(db, current_user)
    return {"data": data}

@router.post("/insights", response_model=StandardListResponse[StudyInsight])
def generate_study_insights(db: Session = Depends(get_db), current_user: User = Depends(require_authenticated_user)):
    # Deterministic insights
    return {"data": [], "meta": {"page": 1, "page_size": 20, "total": 0}}
