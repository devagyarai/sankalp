# API Contract V1

This document defines the strictly enforced boundaries between the frontend and backend of the Sankalp platform.

## Communication Boundary
The Sankalp frontend and backend **MUST** communicate exclusively through HTTP APIs.

**Frontend MUST NOT:**
- Connect directly to PostgreSQL.
- Import backend Python modules.
- Contain database credentials.
- Implement database queries.
- Duplicate backend business logic.

Collection Response:
```json
{
  "success": true,
  "data": [],
  "meta": {
    "page": 1,
    "page_size": 20,
    "total": 0
  }
}
```

Error Response:
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable message",
    "details": {}
  }
}
```

### Common Error Codes
- `VALIDATION_ERROR`
- `UNAUTHORIZED`
- `FORBIDDEN`
- `NOT_FOUND`
- `CONFLICT`
- `RATE_LIMITED`
- `INTERNAL_ERROR`
- `SERVICE_UNAVAILABLE`
- `LOW_CONFIDENCE`

## Endpoints

### Health
**GET** `/api/v1/health`
- **Purpose**: Check if API is running
- **Request**: None
- **Response**: `{"status": "ok", "service": "sankalp-api"}`
- **Errors**: `INTERNAL_ERROR`
- **Auth**: None

**GET** `/api/v1/health/db`
- **Purpose**: Check database connectivity
- **Request**: None
- **Response**: `{"status": "ok", "service": "database"}`
- **Errors**: `SERVICE_UNAVAILABLE` (503)
- **Auth**: None

### Dashboard
**GET** `/api/v1/dashboard/overview`
- **Purpose**: Dashboard summary and modules
- **Request**: None
- **Response**: `DashboardOverviewResponse`
- **Errors**: `UNAUTHORIZED`
- **Auth**: Required

### Study
**GET** `/api/v1/study/plan`
- **Purpose**: Get current study plan
- **Request**: None
- **Response**: `StudyPlan`
- **Errors**: `UNAUTHORIZED`, `NOT_FOUND`
- **Auth**: Required

**POST** `/api/v1/study/plan`
- **Purpose**: Create a new study plan
- **Request**: `StudyPlan`
- **Response**: `StudyPlan`
- **Errors**: `UNAUTHORIZED`, `VALIDATION_ERROR`
- **Auth**: Required

**PATCH** `/api/v1/study/plan/{id}`
- **Purpose**: Update a study plan
- **Request**: Partial `StudyPlan`
- **Response**: `StudyPlan`
- **Errors**: `UNAUTHORIZED`, `NOT_FOUND`, `VALIDATION_ERROR`
- **Auth**: Required

**POST** `/api/v1/study/sessions`
- **Purpose**: Log a completed study session
- **Request**: `StudySession` (partial)
- **Response**: Status
- **Errors**: `UNAUTHORIZED`, `VALIDATION_ERROR`
- **Auth**: Required

**GET** `/api/v1/study/performance`
- **Purpose**: Overall study performance
- **Request**: None
- **Response**: `StudyPerformance`
- **Errors**: `UNAUTHORIZED`
- **Auth**: Required

**POST** `/api/v1/study/insights`
- **Purpose**: Generate AI insights for studying
- **Request**: None
- **Response**: List of `StudyInsight`
- **Errors**: `UNAUTHORIZED`, `INTERNAL_ERROR`
- **Auth**: Required

### Academic
**GET** `/api/v1/academic/overview`
- **Purpose**: Student overview & GPA
- **Request**: None
- **Response**: `AcademicOverview`
- **Errors**: `UNAUTHORIZED`
- **Auth**: Required

**POST** `/api/v1/academic/assessment`
- **Purpose**: Submit grades for risk analysis
- **Request**: `AcademicAssessmentRequest`
- **Response**: `AcademicRisk`
- **Errors**: `UNAUTHORIZED`, `VALIDATION_ERROR`
- **Auth**: Required

**GET** `/api/v1/academic/risk`
- **Purpose**: Get calculated academic risk profile
- **Request**: None
- **Response**: `AcademicRisk`
- **Errors**: `UNAUTHORIZED`, `NOT_FOUND`
- **Auth**: Required

**GET** `/api/v1/academic/insights`
- **Purpose**: Get academic recommendations
- **Request**: None
- **Response**: List of `AcademicInsight`
- **Errors**: `UNAUTHORIZED`
- **Auth**: Required

### Career
**GET** `/api/v1/career/profile`
- **Purpose**: User's skill profile
- **Request**: None
- **Response**: `SkillProfile`
- **Errors**: `UNAUTHORIZED`, `NOT_FOUND`
- **Auth**: Required

**POST** `/api/v1/career/profile`
- **Purpose**: Update user's skill profile
- **Request**: `SkillProfile`
- **Response**: `SkillProfile`
- **Errors**: `UNAUTHORIZED`, `VALIDATION_ERROR`
- **Auth**: Required

**GET** `/api/v1/career/gaps`
- **Purpose**: Identified skill gaps vs target role
- **Request**: None
- **Response**: List of `SkillGap`
- **Errors**: `UNAUTHORIZED`
- **Auth**: Required

**GET** `/api/v1/career/roadmap`
- **Purpose**: Actionable career roadmap
- **Request**: None
- **Response**: List of `RoadmapItem`
- **Errors**: `UNAUTHORIZED`
- **Auth**: Required

**GET** `/api/v1/career/insights`
- **Purpose**: Career transition recommendations
- **Request**: None
- **Response**: List of `CareerInsight`
- **Errors**: `UNAUTHORIZED`
- **Auth**: Required

### Safety
**POST** `/api/v1/safety/assessment`
- **Purpose**: Submit safety questionnaire
- **Request**: `SafetyAssessmentRequest`
- **Response**: `SafetyAssessmentResponse`
- **Errors**: `UNAUTHORIZED`, `VALIDATION_ERROR`
- **Auth**: Required

**GET** `/api/v1/safety/score`
- **Purpose**: Overall digital safety score
- **Request**: None
- **Response**: `SafetyScore`
- **Errors**: `UNAUTHORIZED`, `NOT_FOUND`
- **Auth**: Required

**GET** `/api/v1/safety/recommendations`
- **Purpose**: Digital safety findings/actions
- **Request**: None
- **Response**: List of `SafetyRecommendation`
- **Errors**: `UNAUTHORIZED`
- **Auth**: Required

### Threat
**POST** `/api/v1/threat/analyze`
- **Purpose**: Analyze text/URL for scam signals
- **Request**: `ThreatAnalysisRequest` (content, content_type)
- **Response**: `ThreatAnalysisResponse`
- **Errors**: `UNAUTHORIZED`, `VALIDATION_ERROR` (Strictly enforced content types)
- **Auth**: Required

### Intelligence
**GET** `/api/v1/intelligence/overview`
- **Purpose**: Get a unified cross-domain intelligence overview combining signals from all 6 engines.
- **Request**: None
- **Response**: `UnifiedOverview` (overall_health, domain_scores, trends, top_insights, top_recommendations, priority_actions, data_quality)
- **Errors**: `UNAUTHORIZED`
- **Auth**: Required

**GET** `/api/v1/intelligence/focus`
- **Purpose**: Get StudySync intelligence and recommendations
- **Request**: None
- **Response**: `IntelligenceOutput`
- **Errors**: `UNAUTHORIZED`
- **Auth**: Required

**GET** `/api/v1/intelligence/trajectory`
- **Purpose**: Get SkillMap gap analysis and recommendations
- **Request**: None
- **Response**: `IntelligenceOutput`
- **Errors**: `UNAUTHORIZED`
- **Auth**: Required

**GET** `/api/v1/intelligence/pulse`
- **Purpose**: Get EduPulse academic risk analysis
- **Request**: None
- **Response**: `IntelligenceOutput`
- **Errors**: `UNAUTHORIZED`
- **Auth**: Required

**GET** `/api/v1/intelligence/shield`
- **Purpose**: Get Digital Safety vulnerabilities and score
- **Request**: None
- **Response**: `IntelligenceOutput`
- **Errors**: `UNAUTHORIZED`
- **Auth**: Required

**GET** `/api/v1/intelligence/nexus/{analysis_id}`
- **Purpose**: Correlate a threat analysis with historical threats
- **Request**: Path param `analysis_id`
- **Response**: `IntelligenceOutput`
- **Errors**: `UNAUTHORIZED`, `NOT_FOUND`
- **Auth**: Required

### Chat
**POST** `/api/v1/chat/query`
- **Purpose**: Send query to Cypherverse CHAT-1
- **Request**: `ChatQueryRequest` (message)
- **Response**: `ChatQueryResponse` (answer OR fallback, confidence)
- **Errors**: `UNAUTHORIZED`, `VALIDATION_ERROR`
- **Auth**: Required
