from fastapi import APIRouter

from app.schemas.academic import AcademicAssessmentRequest, AcademicInsight, AcademicOverview, AcademicRisk
from app.schemas.common import StandardListResponse, StandardResponse
from app.services import academic as academic_service

router = APIRouter()

@router.get("/overview", response_model=StandardResponse[AcademicOverview])
def get_academic_overview():
    data = academic_service.get_mock_academic_overview()
    return {"data": data}

@router.post("/assessment", response_model=StandardResponse[AcademicRisk])
def submit_academic_assessment(req: AcademicAssessmentRequest):
    data = academic_service.mock_academic_assessment(req)
    return {"data": data}

@router.get("/risk", response_model=StandardResponse[AcademicRisk])
def get_academic_risk():
    data = academic_service.get_mock_academic_overview().risk_profile
    return {"data": data}

@router.get("/insights", response_model=StandardListResponse[AcademicInsight])
def get_academic_insights():
    data = academic_service.get_mock_academic_overview().insights
    return {"data": data, "meta": {"page": 1, "page_size": 20, "total": len(data)}}
