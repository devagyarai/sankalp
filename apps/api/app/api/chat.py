from fastapi import APIRouter

from app.schemas.chat import ChatQueryRequest, ChatQueryResponse
from app.schemas.common import StandardResponse
from app.services import chat as chat_service

router = APIRouter()

@router.post("/query", response_model=StandardResponse[ChatQueryResponse])
def chat_query(req: ChatQueryRequest):
    data = chat_service.process_chat_query(req)
    return {"data": data}
