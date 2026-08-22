from fastapi import APIRouter

from app.schemas.common import StandardListResponse, StandardResponse
from app.schemas.safety import SafetyAssessmentRequest, SafetyAssessmentResponse, SafetyRecommendation, SafetyScore
from app.services import safety as safety_service

router = APIRouter()

@router.post("/assessment", response_model=StandardResponse[SafetyAssessmentResponse])
def submit_safety_assessment(req: SafetyAssessmentRequest):
    data = safety_service.mock_safety_assessment(req)
    return {"data": data}

@router.get("/score", response_model=StandardResponse[SafetyScore])
def get_safety_score():
    data = safety_service.mock_safety_assessment(SafetyAssessmentRequest(answers={})).score
    return {"data": data}

@router.get("/recommendations", response_model=StandardListResponse[SafetyRecommendation])
def get_safety_recommendations():
    data = safety_service.mock_safety_assessment(SafetyAssessmentRequest(answers={})).recommendations
    return {"data": data, "meta": {"page": 1, "page_size": 20, "total": len(data)}}
