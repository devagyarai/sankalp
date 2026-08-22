# Phase 4 - Browser Verification Guide

This document outlines how to manually verify the Phase 4 implementation (Core Domain Service Layer + Real Database Integration) in the browser.

## 1. Environment Setup

1. **Start the Database**
   Ensure your PostgreSQL 17 server is running on port 5432 and the `sankalp` database exists.

2. **Start the Backend**
   ```bash
   cd apps/api
   uv run fastapi dev app/main.py --port 8000
   ```

3. **Start the Frontend**
   Before starting the frontend, ensure that `NEXT_PUBLIC_USE_MOCK_API` is set to `false` to point the frontend to the real backend.
   
   ```bash
   cd apps/web
   pnpm dev
   ```

## 2. Verification Steps

### Step 1: Authentication & Dashboard Aggregation
- Navigate to `http://localhost:3000/register`. Register a new account.
- Navigate to `http://localhost:3000/login` and log in.
- **Expected Result**: You are redirected to `/dashboard`.
- **Verify**: The dashboard should display a "Start Studying" alert because you have 0 sessions logged. All backend requests to `/api/v1/dashboard/overview` should return HTTP 200 using your `access_token` cookie.

### Step 2: EduPulse (PULSE) Domain
- (Assuming the frontend has the UI to submit assessments). If not, make a raw cURL request to `/api/v1/academic/assessment`.
- **Expected Result**: An `AcademicSnapshot` is created in the database and the deterministic risk score is returned.

### Step 3: SkillMap (TRAJECTORY) Domain
- Call the `/api/v1/career/profile` endpoint.
- **Expected Result**: A default "ML Engineer" profile is automatically generated in the database. 
- **Verify Database**: Check the `career_profiles`, `skills`, and `user_skills` tables to see the initialized entities.

### Step 4: Security & Isolation
- Open a private/incognito window.
- Attempt to navigate to `http://localhost:3000/dashboard` directly.
- **Expected Result**: You should be redirected back to the login page.
- Attempt to access `http://localhost:8000/api/v1/dashboard/overview` in the browser directly (without a cookie).
- **Expected Result**: Returns `{"detail": "Not authenticated"}` with a `401 Unauthorized` status.

## 3. Database Check
After running through the frontend flow, open `psql` or pgAdmin:
```sql
SELECT * FROM users;
SELECT * FROM career_profiles;
SELECT * FROM study_plans;
```
Verify that the `user_id` matches across all these domain tables to ensure ownership boundary enforcement was successful.
