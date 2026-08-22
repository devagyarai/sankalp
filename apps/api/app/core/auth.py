import jwt
from fastapi import Depends, HTTPException, Request, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.security import decode_access_token
from app.models.user import User


def get_token_from_cookie(request: Request) -> str | None:
    return request.cookies.get("access_token")

def get_current_user(
    request: Request,
    db: Session = Depends(get_db)
) -> User | None:
    token = get_token_from_cookie(request)
    if not token:
        return None
        
    try:
        payload = decode_access_token(token)
        user_id: str = payload.get("sub")
        if user_id is None:
            return None
    except jwt.InvalidTokenError:
        return None
        
    user = db.scalar(select(User).where(User.id == user_id))
    if not user:
        return None
        
    if not user.is_active:
        return None
        
    return user

def require_authenticated_user(
    current_user: User | None = Depends(get_current_user)
) -> User:
    if not current_user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not authenticated",
            headers={"WWW-Authenticate": "Cookie"},
        )
    return current_user

def require_admin(
    current_user: User = Depends(require_authenticated_user)
) -> User:
    if current_user.role != "ADMIN":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions",
        )
    return current_user
