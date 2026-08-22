
from fastapi import APIRouter

from app.schemas.common import StandardResponse

router = APIRouter()

@router.get("/health", response_model=StandardResponse[dict])
def health_check():
    """
    Check if the API is running.
    """
    return {"data": {"status": "ok", "service": "sankalp-api"}}

@router.get("/health/db", response_model=StandardResponse[dict])
def db_health_check():
    """
    Check database connectivity.
    """
    # TODO: Implement actual DB check using SQLAlchemy session
    return {"data": {"status": "ok", "service": "database"}}
