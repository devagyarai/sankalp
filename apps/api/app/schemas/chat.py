from typing import Literal

from pydantic import BaseModel


class ChatQueryRequest(BaseModel):
    message: str

class ChatFallback(BaseModel):
    type: str
    message: str

class ChatQueryResponse(BaseModel):
    answer: str | None = None
    source: Literal["faq", "fallback", "llm"]
    confidence: float
    matched_faq_id: str | None = None
    fallback: ChatFallback | None = None
