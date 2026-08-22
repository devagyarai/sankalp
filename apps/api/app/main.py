from fastapi import FastAPI, Request
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from starlette.exceptions import HTTPException as StarletteHTTPException

import app.core.logging
from app.api.router import api_router
from app.core.config import settings

app = FastAPI(
    title="Sankalp API",
    description="Sankalp backend foundation",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.exception_handler(StarletteHTTPException)
async def http_exception_handler(request: Request, exc: StarletteHTTPException):
    # Convert standard HTTP exceptions to our ErrorResponse format
    error_code = "NOT_FOUND" if exc.status_code == 404 else "INTERNAL_ERROR"
    if exc.status_code == 401: error_code = "UNAUTHORIZED"
    if exc.status_code == 403: error_code = "FORBIDDEN"
    if exc.status_code == 409: error_code = "CONFLICT"
    if exc.status_code == 429: error_code = "RATE_LIMITED"
    
    return JSONResponse(
        status_code=exc.status_code,
        content={"success": False, "error": {"code": error_code, "message": str(exc.detail), "details": {}}}
    )

@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    return JSONResponse(
        status_code=422,
        content={"success": False, "error": {"code": "VALIDATION_ERROR", "message": "Invalid request parameters", "details": {"errors": exc.errors()}}}
    )

@app.exception_handler(Exception)
async def unhandled_exception_handler(request: Request, exc: Exception):
    # Do not expose internal details in 500 errors
    return JSONResponse(
        status_code=500,
        content={"success": False, "error": {"code": "INTERNAL_ERROR", "message": "An unexpected error occurred", "details": {}}}
    )

app.include_router(api_router, prefix="/api/v1")
