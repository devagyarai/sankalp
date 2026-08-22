# Phase 7 Frontend Security

## Data Handling & Exposure
- **JWT Protection**: The frontend architecture relies entirely on the HTTP-only, Secure (in production) cookies established in Phase 3. No token parsing occurs on the client, and `localStorage` is free of sensitive material.
- **Cross-Site Scripting (XSS)**: 
  - All data returned from the Intelligence endpoints (e.g., Threat explanations, Scam indicators) is rendered as safe text via React.
  - The `Sentinel` threat analysis tool explicitly treats user input as plain text and posts it via JSON payload (`content: string`) rather than dangerously setting inner HTML.
- **Cross-Site Request Forgery (CSRF)**: 
  - Regulated via `credentials: 'include'` and strict CORS origin validation at the FastAPI boundary.

## Authorization
- The Next.js frontend uses client-side routing protection `authClient.getMe()` inside the `AppLayout` and dashboard pages to verify the active session before rendering intelligence data. Unauthorized users are immediately redirected to `/login` before rendering insights.
- Fallback: The API enforces RBAC, so even if the client-side route is bypassed, the `/api/v1/intelligence/*` endpoints will throw a 401 Unauthorized.

## Input Validation
- Forms (such as the Threat Analysis input in `app/dashboard/threats/page.tsx`) perform basic structural validation (preventing empty submissions) before hitting the API. The API is expected to handle deep sanitization and Pydantic validation.
