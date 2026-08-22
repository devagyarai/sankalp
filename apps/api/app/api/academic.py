from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.auth import require_authenticated_user
from app.core.database import get_db
from app.models.user import User
from app.schemas.academic import AcademicAssessmentRequest, AcademicInsight, AcademicOverview, AcademicRisk
from app.schemas.common import StandardListResponse, StandardResponse
from app.services import academic as academic_service

router = APIRouter()

@router.get("/overview", response_model=StandardResponse[AcademicOverview])
def get_academic_overview(db: Session = Depends(get_db), current_user: User = Depends(require_authenticated_user)):
    data = academic_service.get_academic_overview(db, current_user)
    return {"data": data}

@router.post("/assessment", response_model=StandardResponse[AcademicRisk])
def submit_academic_assessment(req: AcademicAssessmentRequest, db: Session = Depends(get_db), current_user: User = Depends(require_authenticated_user)):
    data = academic_service.submit_academic_assessment(db, current_user, req)
    return {"data": data}

@router.get("/risk", response_model=StandardResponse[AcademicRisk])
def get_academic_risk(db: Session = Depends(get_db), current_user: User = Depends(require_authenticated_user)):
    data = academic_service.get_academic_overview(db, current_user).risk_profile
    return {"data": data}

@router.get("/insights", response_model=StandardListResponse[AcademicInsight])
def get_academic_insights(db: Session = Depends(get_db), current_user: User = Depends(require_authenticated_user)):
    data = academic_service.get_academic_overview(db, current_user).insights
    return {"data": data, "meta": {"page": 1, "page_size": 20, "total": len(data)}}
