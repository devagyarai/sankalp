from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.auth import require_authenticated_user
from app.core.database import get_db
from app.models.user import User
from app.schemas.chat import ChatQueryRequest, ChatQueryResponse
from app.schemas.common import StandardResponse
from app.services import chat as chat_service

router = APIRouter()

@router.post("/query", response_model=StandardResponse[ChatQueryResponse])
def chat_query(req: ChatQueryRequest, db: Session = Depends(get_db), current_user: User = Depends(require_authenticated_user)):
    data = chat_service.process_chat_query(req)
    return {"data": data}
