# Sankalp Phase 4 — Repository Audit

## 1. Current Architecture & Implementation Status
The current repository architecture separates the backend (FastAPI, SQLAlchemy, PostgreSQL) and frontend (Next.js, React). Phase 1-3 established a secure auth context, environment separation, and basic database models.

Currently, all domain routers (`study`, `academic`, `career`, `safety`, `threat`, `dashboard`) rely entirely on mock implementations inside the `app/services/` layer. The HTTP API contract is stable but is not backed by persistence. 

## 2. Schema and Model Mismatches
There are several mismatches between the Pydantic schemas (the API contract) and the SQLAlchemy ORM models (the persistent data structure) that need to be resolved via translation in the service layer:

### FOCUS (StudySync)
- **StudyPlan/StudyGoal**: 
  - API expects `title`. ORM uses `name`.
  - API expects `target_hours`, `completed_hours`. ORM stores `target_minutes`, `completed_minutes`.
- **StudySession**:
  - API expects `focus_score`. ORM has `completion_status` and `duration_minutes`.

### PULSE (EduPulse)
- **AcademicRisk**:
  - API expects `risk_level`, `score`, `factors` (list), `recommendations` (list).
  - ORM `AcademicSnapshot` has `risk_score`, `metrics` (JSONB). Factors and recommendations must be stored/extracted from the `metrics` JSONB field or derived deterministically.

### SHIELD (Digital Safety)
- **SafetyScore**:
  - API expects `categories` (array of `SafetyCategory` with findings).
  - ORM stores `password_security`, `account_security`, etc. as explicit float columns. The service must map these scalar columns to the nested `categories` array.

### SENTINEL (ScamMap)
- **ThreatAnalysisResponse**:
  - API expects `signals` with `type`, `severity`, `explanation`.
  - ORM `ThreatSignal` has `signal_type`, `description`, `confidence`.

## 3. Database Access and Transactions
- The routers currently lack the `db: Session = Depends(get_db)` injection.
- The `current_user: User = Depends(require_authenticated_user)` must be added to all protected domain routes.
- Transactions are not yet established. The service layer must explicitly handle `db.add()`, `db.commit()`, and `db.rollback()` on exceptions.

## 4. Frontend Integration
- The frontend `ApiClient` (in `apps/web/lib/api/client.ts`) respects a `NEXT_PUBLIC_USE_MOCK_API` toggle.
- We will incrementally switch this to `false` for testing as backend domains are implemented.

## 5. Explicit Out of Scope
- Actual AI/ML orchestration, LLM inference, embedding generation, or real external threat APIs.
- Real web scraping or URL domain classification.
- Complex data graph queries for ScamNetwork.
- We will use deterministic, rule-based logic to fill the intelligence placeholders.
