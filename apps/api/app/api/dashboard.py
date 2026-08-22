from fastapi import APIRouter

from app.schemas.common import StandardResponse
from app.schemas.dashboard import DashboardOverviewResponse
from app.services import dashboard as dashboard_service

router = APIRouter()

@router.get("/overview", response_model=StandardResponse[DashboardOverviewResponse])
def get_dashboard_overview():
    data = dashboard_service.get_mock_overview()
    return {"data": data}
