from fastapi import APIRouter

from app.schemas.common import StandardListResponse, StandardResponse
from app.schemas.study import StudyInsight, StudyPerformance, StudyPlan
from app.services import study as study_service

router = APIRouter()

@router.get("/plan", response_model=StandardResponse[StudyPlan])
def get_study_plan():
    data = study_service.get_mock_study_plan()
    return {"data": data}

@router.post("/plan", response_model=StandardResponse[StudyPlan])
def create_study_plan():
    data = study_service.get_mock_study_plan()
    return {"data": data}

@router.patch("/plan/{plan_id}", response_model=StandardResponse[StudyPlan])
def update_study_plan(plan_id: str):
    data = study_service.get_mock_study_plan()
    return {"data": data}

@router.post("/sessions", response_model=StandardResponse[dict])
def log_study_session():
    return {"data": {"status": "session_logged"}}

@router.get("/performance", response_model=StandardResponse[StudyPerformance])
def get_study_performance():
    data = study_service.get_mock_performance()
    return {"data": data}

@router.post("/insights", response_model=StandardListResponse[StudyInsight])
def generate_study_insights():
    return {"data": [], "meta": {"page": 1, "page_size": 20, "total": 0}}
