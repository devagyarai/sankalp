from fastapi import APIRouter

from app.schemas.career import CareerInsight, RoadmapItem, SkillGap, SkillProfile
from app.schemas.common import StandardListResponse, StandardResponse
from app.services import career as career_service

router = APIRouter()

@router.get("/profile", response_model=StandardResponse[SkillProfile])
def get_career_profile():
    data = career_service.get_mock_career_profile()
    return {"data": data}

@router.post("/profile", response_model=StandardResponse[SkillProfile])
def create_career_profile():
    data = career_service.get_mock_career_profile()
    return {"data": data}

@router.get("/gaps", response_model=StandardListResponse[SkillGap])
def get_career_gaps():
    data = career_service.get_mock_career_profile().gaps
    return {"data": data, "meta": {"page": 1, "page_size": 20, "total": len(data)}}

@router.get("/roadmap", response_model=StandardListResponse[RoadmapItem])
def get_career_roadmap():
    return {"data": [], "meta": {"page": 1, "page_size": 20, "total": 0}}

@router.get("/insights", response_model=StandardListResponse[CareerInsight])
def get_career_insights():
    return {"data": [], "meta": {"page": 1, "page_size": 20, "total": 0}}
