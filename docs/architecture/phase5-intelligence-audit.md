# Sankalp Phase 5 — Intelligence Engine Audit

## 1. Existing Architecture
The system uses FastAPI, SQLAlchemy, and PostgreSQL. Domain logic currently resides in `app/services/*`, directly manipulating ORM objects. 
To preserve modularity and deterministic intelligence principles, the new Intelligence Engine layer (`app/intelligence/*`) will sit conceptually between the Service layer and ORM/Algorithms. 

The architecture flow will be:
`HTTP API -> Router -> Domain Service -> Intelligence Engine (e.g. focus_engine.py) -> ORM`

## 2. Available Data Sources & Missing Data

### A. FOCUS (StudySync)
- **Available**: `StudyPlan`, `StudyGoal` (target_minutes, completed_minutes), `StudySession` (duration_minutes), `StudySubject`.
- **Opportunities**: Detect workload imbalance (e.g. comparing goal ratio to session ratio), study consistency, and basic productivity indicators.
- **Missing Data**: Session timestamps are just `created_at` in TimestampMixin. We can use this to establish session frequency/consistency. 

### B. TRAJECTORY (SkillMap)
- **Available**: `CareerProfile`, `Skill`, `UserSkill` (proficiency_level), `TargetRole`, `RoleSkillRequirement` (required_proficiency, weight).
- **Opportunities**: Current skill coverage, weighted skill gap (using `weight` * gap size), identify critical missing skills.
- **Missing Data**: No historical progression, but a snapshot-in-time calculation is sufficient.

### C. PULSE (EduPulse)
- **Available**: `AcademicCourse`, `AcademicAssessment`, `AcademicResult`, `AcademicSnapshot`.
- **Opportunities**: Recent performance (averaging recent results), deterioration detection (trending scores over time), academic risk score calculation based on precise, documented thresholds.
- **Missing Data**: Attendance tracking is not explicitly an entity except in `metrics` JSONB; we will rely on academic results (grades/percentages).

### D. SHIELD (Digital Safety)
- **Available**: `SafetyAssessment`, `SafetyAnswer` (normalized_value), `SafetyScore`, `SafetyRecommendation`.
- **Opportunities**: Calculate category scores, identify weakest safety categories, and derive risk tier purely from provided answers.

### E. SENTINEL (ScamMap)
- **Available**: `ThreatAnalysis`, `ThreatSignal`.
- **Opportunities**: Detect URLs, keywords, urgency signals, and impersonation indicators deterministically. Treat all text as untrusted.

### F. NEXUS (Threat Network)
- **Available**: `ThreatAnalysis`, `ThreatSignal`, `ThreatIndicator`, `ThreatCampaign`, `CampaignIndicator`.
- **Opportunities**: Identify shared indicators (e.g., matching URLs or phone numbers) across analyses to cluster campaigns.

## 3. Proposed Engine Boundaries
- `intelligence/common/`: Scoring normalizers, confidence calculators, shared data contracts.
- `intelligence/focus/`: `analyze_study_metrics(user_id, db)` returning score, metrics, and recommendations.
- `intelligence/trajectory/`: `calculate_skill_gaps(user_id, db)` returning weighted gaps and roadmap priorities.
- `intelligence/pulse/`: `evaluate_academic_risk(user_id, db)` calculating performance trends.
- `intelligence/shield/`: `calculate_safety_score(answers)` extracting security dimensions.
- `intelligence/sentinel/`: `analyze_threat_content(text)` extracting strings, links, keywords.
- `intelligence/nexus/`: `correlate_threats(analysis_id, db)` finding matching indicators.

## 4. Security Concerns & Explainability
- **Security**: Sentinel module must never execute code, follow URLs, or parse text as instructions. Threat texts are strictly data inputs for Regex/Substring matching. Recommendations must not leak PII across users. 
- **Explainability**: Every output must have an `explanation` array mapping directly to calculated features (e.g. "Risk is High because gap in Machine Learning is 60 with a weight of 1.5").

## 5. Computational Assumptions & ML Extension Points
- Calculations are deterministic and linear. No heavy ML models (LLMs, neural networks) are required for MVP.
- All algorithms are $O(N)$ or $O(N \log N)$ running directly in Python. 
- **Future ML points**: Sentinel string analysis can be replaced by NLP classifiers. Focus engine can be replaced by regression models.

## 6. Recommended Implementation Order
1. Common Utilities (`common/`)
2. Trajectory (`trajectory/`) - simplest weighted math
3. Focus (`focus/`) - relies on goal ratio math
4. Shield (`shield/`) - deterministic survey scoring
5. Pulse (`pulse/`) - trend detection across rows
6. Sentinel (`sentinel/`) - untrusted string extraction
7. Nexus (`nexus/`) - relational matching
8. Central Recommendation Aggregator (`recommendation.py`)
