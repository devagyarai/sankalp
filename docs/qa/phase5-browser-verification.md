# Phase 5: Browser Verification (QA)

## Objectives
Validate that the deterministic Intelligence endpoints function correctly when accessed via HTTP requests.

## Test Matrix

### 1. FOCUS (StudySync)
- **Endpoint**: `GET /api/v1/intelligence/focus`
- **Expected**: HTTP 200 with an `IntelligenceOutputSchema`. `score` should reflect the user's study pacing.

### 2. TRAJECTORY (SkillMap)
- **Endpoint**: `GET /api/v1/intelligence/trajectory`
- **Expected**: HTTP 200 with `score` based on user's target skills vs current skills. `recommendations` should highlight any critical skill gaps (e.g., Python gap > 40).

### 3. PULSE (EduPulse)
- **Endpoint**: `GET /api/v1/intelligence/pulse`
- **Expected**: HTTP 200. Should return risk metrics like `GPA Trend` and `Absence Rate`.

### 4. SHIELD (Digital Safety)
- **Endpoint**: `GET /api/v1/intelligence/shield`
- **Expected**: HTTP 200. Should return safety recommendations based on missing 2FA or weak passwords.

### 5. SENTINEL (Threat Analysis)
- **Endpoint**: `POST /api/v1/threat/analyze`
- **Payload**: `{"content": "URGENT reset your password here", "content_type": "sms"}`
- **Expected**: HTTP 200. Classification should be `scam` due to Urgency + Credential keywords.

### 6. NEXUS (Threat Correlation)
- **Endpoint**: `GET /api/v1/intelligence/nexus/{analysis_id}`
- **Expected**: HTTP 200. Will return correlated threats if identical indicators (URLs, Emails) were seen before.

## Automated Equivalents
All QA paths are fully covered by unit tests in `apps/api/tests/test_intelligence.py` and `apps/api/tests/test_api_contract.py`.
