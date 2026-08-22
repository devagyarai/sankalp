# Authentication & Security Strategy

## Overview
Sankalp uses a stateless JSON Web Token (JWT) architecture backed by secure HTTP-only cookies. This design avoids storing access tokens in `localStorage` or memory where they can be vulnerable to XSS.

## Session Lifecycle & Cookie Strategy
1. **Login**: User submits credentials to `/api/v1/auth/login`. Upon success, the backend generates a signed JWT and issues an `access_token` cookie.
2. **Cookie Configuration**:
   - `HttpOnly=True`: JavaScript cannot access the cookie.
   - `Secure=True` (in production): Cookie is only transmitted over HTTPS.
   - `SameSite=Lax`: Provides robust CSRF protection against cross-origin post requests.
   - `Max-Age`: Currently set to 7 days.
3. **Logout**: User calls `/api/v1/auth/logout`. The backend clears the `access_token` cookie.
4. **Revocation**: For Phase 3 MVP, revocation relies purely on expiration. Future phases will introduce a Token Denylist (Redis/DB) for immediate revocation.

## Password Handling
- Passwords are strictly hashed using `bcrypt` (via `passlib`).
- Plaintext passwords are never logged, stored, or returned via the API.
- Password complexity requirements are enforced at the API boundary via Pydantic (`min_length=8`).

## RBAC Foundation
Role-Based Access Control is managed through the `User.role` field.
- **USER**: Standard default access.
- **ADMIN**: Privileged access (checked via the `require_admin` FastAPI dependency).

## CSRF Strategy
Because authentication is cookie-based, CSRF is mitigated via:
1. **SameSite=Lax**: Prevents cookies from being attached to cross-origin POST/PUT/DELETE requests initiated by malicious sites.
2. **Strict CORS**: `CORS_ORIGINS` strictly controls which origins the browser is permitted to talk to via AJAX, backed by FastAPI's `allow_credentials=True` enforcement.

## Threat Model & Limitations
- **Current Limitation**: No dedicated refresh token rotation. The JWT simply expires after 7 days.
- **Current Limitation**: No active session revocation map. If a JWT is captured, it is valid until expiration.
- **Future Improvement**: Add an external rate-limiting layer (Redis-based) to `/login` to mitigate credential stuffing.
