from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.auth import require_authenticated_user
from app.core.database import get_db
from app.models.user import User
from app.schemas.common import StandardResponse
from app.schemas.safety import SafetyAssessmentRequest, SafetyAssessmentResponse
from app.services import safety as safety_service

router = APIRouter()

@router.post("/assessment", response_model=StandardResponse[SafetyAssessmentResponse])
def submit_safety_assessment(req: SafetyAssessmentRequest, db: Session = Depends(get_db), current_user: User = Depends(require_authenticated_user)):
    data = safety_service.submit_safety_assessment(db, current_user, req)
    return {"data": data}
