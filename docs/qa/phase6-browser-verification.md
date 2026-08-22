# Phase 6: Browser Verification (QA)

## Objectives
Ensure the unified intelligence overview properly aggregates all domain signals.

## Test Matrix

### 1. Unified Intelligence Overview
- **Endpoint**: `GET /api/v1/intelligence/overview`
- **Expected**: HTTP 200.
- **Verify Payload**:
  - `overall_health`: Integer 0-100.
  - `domain_scores`: Dictionary mapping `Academic`, `Study`, `Career`, `Safety` to 0-100 integers.
  - `trends`: Array of `IntelligenceTrend` objects (direction = "IMPROVING", "STABLE", "DECLINING", "INSUFFICIENT_DATA").
  - `top_insights`: Array of `Insight` objects.
  - `top_recommendations`: Ranked array of actions.
  - `priority_actions`: Top 3 recommendation titles as strings.
  - `data_quality`: Map showing data quality per domain.

### 2. Manual Cross-Domain Rule Triggering
To manually verify an Academic Recovery Insight on the frontend:
1. Log some bad academic results (grades < 50%).
2. Log study sessions indicating < 20% target completion.
3. Fetch the overview endpoint.
4. Verify `top_insights` contains an insight of type `ACADEMIC_RECOVERY`.

### 3. Insufficient Data State
1. Register a fresh user.
2. Hit `GET /api/v1/intelligence/overview`.
3. Verify that `data_quality` keys all say `insufficient`.
4. Verify that `overall_health` is 0.

## Automated Verification
Full coverage is provided via `uv run pytest tests/test_cross_domain.py`. BrowserOS is currently unavailable due to private-network/security restrictions, so please rely on automated testing results.
