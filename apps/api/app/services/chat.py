from app.schemas.chat import ChatFallback, ChatQueryRequest, ChatQueryResponse


def process_chat_query(req: ChatQueryRequest) -> ChatQueryResponse:
    query = req.message.lower()
    
    # Mock FAQ matching
    if "suspicious sms" in query:
        return ChatQueryResponse(
            answer="To analyze a suspicious SMS, use the Threat Intelligence module and paste the message content.",
            source="faq",
            confidence=0.95,
            matched_faq_id="faq-threat-01"
        )
    
    # Low confidence fallback
    return ChatQueryResponse(
        answer=None,
        source="fallback",
        confidence=0.21,
        fallback=ChatFallback(
            type="support",
            message="I couldn't confidently understand that question. Could you rephrase?"
        )
    )
