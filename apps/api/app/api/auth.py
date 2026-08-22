from datetime import UTC, datetime, timedelta

from fastapi import APIRouter, Depends, HTTPException, Response, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.core.auth import require_authenticated_user
from app.core.config import settings
from app.core.database import get_db
from app.core.security import create_access_token, get_password_hash, verify_password
from app.models.user import User, UserProfile
from app.schemas.auth import UserCreate, UserLogin, UserResponse
from app.schemas.common import StandardResponse

router = APIRouter()

ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24 * 7 # 7 days for MVP

@router.post("/register", response_model=StandardResponse[UserResponse], status_code=status.HTTP_201_CREATED)
def register(user_in: UserCreate, db: Session = Depends(get_db)):
    email_norm = user_in.email.lower()
    
    # Check duplicate
    existing_user = db.scalar(select(User).where(User.email == email_norm))
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
        
    user = User(
        email=email_norm,
        password_hash=get_password_hash(user_in.password),
        role="USER",
        is_active=True
    )
    db.add(user)
    db.flush() # get user.id
    
    profile = UserProfile(
        user_id=user.id,
        display_name=user_in.display_name
    )
    db.add(profile)
    db.commit()
    db.refresh(user)
    
    return StandardResponse(
        success=True,
        data=UserResponse.model_validate(user)
    )

@router.post("/login", response_model=StandardResponse[UserResponse])
def login(user_in: UserLogin, response: Response, db: Session = Depends(get_db)):
    email_norm = user_in.email.lower()
    user = db.scalar(select(User).where(User.email == email_norm))
    
    if not user or not user.password_hash:
        raise HTTPException(status_code=400, detail="Incorrect email or password")
        
    if not verify_password(user_in.password, user.password_hash):
        raise HTTPException(status_code=400, detail="Incorrect email or password")
        
    if not user.is_active:
        raise HTTPException(status_code=400, detail="Inactive user")
        
    # Update last login
    user.last_login_at = datetime.now(UTC)
    db.commit()
    db.refresh(user)
    
    # Set cookie
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        subject=user.id, expires_delta=access_token_expires
    )
    
    response.set_cookie(
        key="access_token",
        value=access_token,
        httponly=True,
        max_age=int(access_token_expires.total_seconds()),
        expires=int(access_token_expires.total_seconds()),
        samesite="lax",
        secure=settings.APP_ENV == "production",
    )
    
    return StandardResponse(
        success=True,
        data=UserResponse.model_validate(user)
    )

@router.post("/logout", response_model=StandardResponse[None])
def logout(response: Response):
    response.delete_cookie(
        key="access_token",
        httponly=True,
        samesite="lax",
        secure=settings.APP_ENV == "production",
    )
    return StandardResponse(success=True, data=None)

@router.get("/me", response_model=StandardResponse[UserResponse])
def read_users_me(current_user: User = Depends(require_authenticated_user)):
    return StandardResponse(
        success=True,
        data=UserResponse.model_validate(current_user)
    )
