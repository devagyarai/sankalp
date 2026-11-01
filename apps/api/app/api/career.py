from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.auth import require_authenticated_user
from app.core.database import get_db
from app.models.user import User
from app.schemas.career import SkillProfile, AddSkillRequest
from app.schemas.common import StandardResponse
from app.services import career as career_service

router = APIRouter()

@router.get("/profile", response_model=StandardResponse[SkillProfile])
def get_career_profile(db: Session = Depends(get_db), current_user: User = Depends(require_authenticated_user)):
    data = career_service.get_career_profile(db, current_user)
    return {"data": data}

@router.post("/profile/skills", response_model=StandardResponse[SkillProfile])
def add_skill(request: AddSkillRequest, db: Session = Depends(get_db), current_user: User = Depends(require_authenticated_user)):
    data = career_service.add_skill_to_profile(db, current_user, request.name)
    return {"data": data}
