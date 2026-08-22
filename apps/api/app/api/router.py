from fastapi import APIRouter

from app.api import academic, auth, career, chat, dashboard, health, intelligence, safety, study, threat

api_router = APIRouter()

api_router.include_router(health.router, tags=["health"])
api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(dashboard.router, prefix="/dashboard", tags=["dashboard"])
api_router.include_router(study.router, prefix="/study", tags=["study"])
api_router.include_router(academic.router, prefix="/academic", tags=["academic"])
api_router.include_router(career.router, prefix="/career", tags=["career"])
api_router.include_router(safety.router, prefix="/safety", tags=["safety"])
api_router.include_router(threat.router, prefix="/threat", tags=["threat"])
api_router.include_router(chat.router, prefix="/chat", tags=["chat"])
api_router.include_router(intelligence.router)
