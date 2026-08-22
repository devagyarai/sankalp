# Phase 7 Browser Verification

## Environment Constraint
**BrowserOS Availability:** NOT AVAILABLE — environment/private-network restriction.

Due to environment restrictions, we cannot use a headless browser agent to take visual screenshots or click through the UI.

## QA Validation Strategy

Because of the BrowserOS limitation, we validate the frontend implementation using rigorous automated testing and API-level assurance:

1. **Static Analysis & Typing**
   - Run `pnpm tsc --noEmit` and `pnpm lint` in `apps/web/`.
   - Result: 0 Errors. The Next.js frontend strictly maps to the Phase 6 FastAPI backend contracts.
2. **Automated Unit Tests**
   - Run `pnpm test --run` in `apps/web/`.
   - Result: Passes cleanly. The `dashboard.test.tsx` specifically verifies that the dashboard renders the intelligence insights natively when mocked backend data is returned, and renders appropriate skeletons/error boundaries.
3. **Production Build Integrity**
   - Run `pnpm build` in `apps/web/`.
   - Result: Static Generation successful across all `/dashboard/*` routes. No dynamic route errors or missing export constraints.
4. **Backend Assurances**
   - Run `uv run ruff check .` and `uv run pytest` in `apps/api/` to ensure the integration endpoints (Phase 6) were not disrupted.

## Manual QA Steps (For Human Operator)

When running the application locally (`pnpm dev`), a human operator should verify the following:

1. **Authentication Flow**
   - Navigate to `/login` and authenticate.
   - Verify redirection to `/dashboard`.
   - Ensure the token is not visible in `localStorage`.
2. **Dashboard Overview**
   - Verify the `OverallHealthCard` renders a score based on backend logic.
   - Verify `DomainHealthGrid` shows the 4 primary domain scores with improvement trends.
   - Verify the `PriorityActions` block lists the top 3 critical actions.
3. **Domain Pages**
   - Navigate to `/dashboard/study`. Verify the explanation blocks and metrics array display.
   - Navigate to `/dashboard/threats`. Paste a text snippet and ensure the form submission safely displays the deterministic Threat Analysis response (Safe, Suspicious, or Scam) with indicators.
