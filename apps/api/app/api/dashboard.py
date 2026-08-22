from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.auth import require_authenticated_user
from app.core.database import get_db
from app.models.user import User
from app.schemas.common import StandardResponse
from app.schemas.dashboard import DashboardOverviewResponse
from app.services import dashboard as dashboard_service

router = APIRouter()

@router.get("/overview", response_model=StandardResponse[DashboardOverviewResponse])
def get_dashboard_overview(db: Session = Depends(get_db), current_user: User = Depends(require_authenticated_user)):
    data = dashboard_service.get_dashboard_overview(db, current_user)
    return {"data": data}
