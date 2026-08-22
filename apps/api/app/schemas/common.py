from typing import Any, Generic, TypeVar

from pydantic import BaseModel, Field

T = TypeVar("T")

class ErrorDetails(BaseModel):
    code: str = Field(..., description="Stable error code (e.g., VALIDATION_ERROR, NOT_FOUND)")
    message: str = Field(..., description="Human-readable error message")
    details: dict[str, Any] | None = Field(default=None, description="Additional context or validation details")

class ErrorResponse(BaseModel):
    error: ErrorDetails

class StandardResponse(BaseModel, Generic[T]):
    success: bool = True
    data: T
    meta: dict[str, Any] | None = Field(default=None)

class PaginationMeta(BaseModel):
    page: int
    page_size: int
    total: int

class StandardListResponse(BaseModel, Generic[T]):
    success: bool = True
    data: list[T]
    meta: PaginationMeta
