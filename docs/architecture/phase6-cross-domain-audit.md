# Phase 6: Cross-Domain Intelligence Audit

## Current Engine Outputs
Each of the 6 engines (FOCUS, TRAJECTORY, PULSE, SHIELD, SENTINEL, NEXUS) outputs a normalized `IntelligenceOutputSchema` containing:
- `score` (0-100)
- `metrics` (List of name, value, description)
- `issues` (List of strings describing detected problems)
- `recommendations` (Domain, priority, title, reason, evidence, confidence, action_url)
- `explanation` (Human-readable text explaining the score)
- `data_quality` (sufficient, limited, insufficient)
- `raw_data` (Optional JSON blob for rule matching)

## Available Cross-Domain Relationships (Evidence-Backed)
Based on the existing data architecture and engine returns:
1. **PULSE + FOCUS -> Academic Recovery Insight**
   - *Condition*: PULSE risk score > 50 (High/Critical) AND FOCUS completion rate < 0.5 (or score < 50).
   - *Evidence*: Low study consistency and declining academic performance independently detected.
   - *Action*: Increase structured study time.
2. **TRAJECTORY + FOCUS -> Career Skill Priority Insight**
   - *Condition*: TRAJECTORY has critical skill gaps AND FOCUS has active study capacity.
   - *Evidence*: High-weight career skills missing.
   - *Action*: Allocate study time to specific target skills.
3. **PULSE (Trend) + FOCUS (Trend)**
   - *Condition*: PULSE trend is negative (declining performance) AND FOCUS consistency/balance is low.
   - *Evidence*: Downward trend in both study execution and academic results.
4. **SHIELD + SENTINEL -> Vulnerability Insight**
   - *Condition*: SHIELD score < 50 (Poor security) AND SENTINEL returns a scam/critical threat.
   - *Evidence*: Poor account security makes user more vulnerable to recent scam attempts.
   - *Action*: Fix security settings (e.g. 2FA) immediately.
5. **SENTINEL + NEXUS -> Threat Correlation Insight**
   - *Condition*: SENTINEL threat_level == "CRITICAL" AND NEXUS finds repeated indicators.
   - *Evidence*: Repeated threat indicators.

## Existing Recommendation Model
Recommendations are currently generated per-domain (e.g., Focus generates "Focus on [Subject]"). Phase 6 will unify these, deduplicating them and ranking them by severity x confidence.

## Dashboard Architecture
Currently, there is an overview endpoint (`/api/v1/dashboard/overview`) which returns basic summary stats. 
A new `GET /api/v1/intelligence/overview` will provide unified cross-domain insights.

## Missing Cross-Domain Abstractions
- **Cross-Domain Insight**: A model/schema to represent a derived insight combining multiple domains. 
- **Unified Recommendation Ranking**: Logic to aggregate, rank, and group recommendations from all 6 engines.
- **Signal Normalization**: A schema for standardizing signals before feeding them into the rule engine.

## Ownership Boundaries & Data Leakage Risks
- **Threat Privacy**: SENTINEL/NEXUS correlations must NOT expose other users' threat data (PII, raw texts). Aggregates (e.g., "This URL has been seen 5 times across the platform") are acceptable, but raw content is isolated.
- **Database Scope**: All queries must strict-filter by `user_id == current_user.id` to prevent cross-account leakage.

## Performance Risks
- Re-running all 6 engines synchronously on every API request could cause N+1 query patterns or slow response times.
- **Mitigation**: Ensure each engine's SQL queries are bounded (e.g., limit to recent 10 sessions/results). We will not introduce Redis; we will rely on efficient DB queries.

## Proposed Unified Intelligence Architecture
- Directory: `apps/api/app/intelligence/cross_domain/`
  - `models.py`: Pydantic models for `Insight`, `Signal`, `UnifiedOverview`.
  - `engine.py`: Orchestrator that calls all 6 engines, extracts signals, runs rules, and builds the `UnifiedOverview`.
  - `rules.py`: Deterministic functions combining signals into `Insight` objects.
  - `recommendations.py`: Aggregation and ranking logic.
- API Endpoint: `GET /api/v1/intelligence/overview`
- No new SQL models required for Insights (they will be dynamically derived).
