from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.auth import require_authenticated_user
from app.core.database import get_db
from app.models.user import User
from app.schemas.career import SkillProfile
from app.schemas.common import StandardResponse
from app.services import career as career_service

router = APIRouter()

@router.get("/profile", response_model=StandardResponse[SkillProfile])
def get_career_profile(db: Session = Depends(get_db), current_user: User = Depends(require_authenticated_user)):
    data = career_service.get_career_profile(db, current_user)
    return {"data": data}
