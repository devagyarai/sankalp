from fastapi import APIRouter

from app.schemas.common import StandardResponse
from app.schemas.threat import ThreatAnalysisRequest, ThreatAnalysisResponse
from app.services import threat as threat_service

router = APIRouter()

@router.post("/analyze", response_model=StandardResponse[ThreatAnalysisResponse])
def analyze_threat(req: ThreatAnalysisRequest):
    data = threat_service.analyze_threat(req)
    return {"data": data}
