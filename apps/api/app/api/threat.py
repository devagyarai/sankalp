from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.auth import require_authenticated_user
from app.core.database import get_db
from app.models.user import User
from app.schemas.common import StandardResponse
from app.schemas.threat import ThreatAnalysisRequest, ThreatAnalysisResponse
from app.services import threat as threat_service

router = APIRouter()

@router.post("/analyze", response_model=StandardResponse[ThreatAnalysisResponse])
def analyze_threat(req: ThreatAnalysisRequest, db: Session = Depends(get_db), current_user: User = Depends(require_authenticated_user)):
    data = threat_service.analyze_threat(db, current_user, req)
    return {"data": data}
